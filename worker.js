const { MongoClient, ObjectId } = require("mongodb");
const { createCanvas, loadImage } = require("canvas");
const thumbnail = require("image-thumbnail");

const mongoClient = new MongoClient(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoClient.connect((err) => {
	if (err) throw err;

	const fileQueue = new Bull("fileQueue");

	fileQueue.process(async (job) => {
		const { fileId, userId } = job.data;

		if (!fileId) throw new Error("Missing fileId");
		if (!userId) throw new Error("Missing userId");

		const db = mongoClient.db(process.env.DB_NAME);
		const filesCollection = db.collection("files");

		const file = await filesCollection.findOne({
			_id: new ObjectId(fileId),
			userId: userId
		});

		if (!file) throw new Error("File not found");

		if (file.type === "image") {
			const thumbnailSizes = [500, 250, 100];
			for (let i = 0; i < thumbnailSizes.length; i++) {
				const size = thumbnailSizes[i];
				const thumb = await thumbnail(file.localPath, { width: size });
				const canvas = createCanvas(size, size);
				const ctx = canvas.getContext("2d");
				const img = await loadImage(thumb);
				ctx.drawImage(img, 0, 0, size, size);
				const thumbName = `${file.localPath}_${size}`;
				await new Promise((resolve, reject) => {
					canvas
						.createPNGStream()
						.pipe(require("fs").createWriteStream(thumbName))
						.on("finish", resolve)
						.on("error", reject);
				});
			}
		}
	});
});
