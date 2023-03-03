import crypto from 'crypto';
import dbClient from '../utils/db';

function hashPassword(password) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(password);
  return sha1.digest('hex');
}

class UsersControllers {
  async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });
    const hashedPass = hashPassword(password);
    const newUser = await dbClient.db.collection('users').insertOne({ email, password: hashedPass });
    return res.status(200).send({ id: newUser.insertedId, email: newUser.ops[0].email });
  }
}

const userController = new UsersControllers();
export default userController;
