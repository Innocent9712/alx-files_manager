import dbClient from '../utils/db';

class AppController {
//   constructor() {}

  getStatus(req, res) {
    if (dbClient.isAlive()) {
      return res.status(200).send({ redis: false, db: true });
    }
    return res.status(500).send({ redis: false, db: false });
  }

  async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    return res.status(200).send({ users: nbUsers, files: nbFiles });
  }
}
const appController = new AppController();
export default appController;
