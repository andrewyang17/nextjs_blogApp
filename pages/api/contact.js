import {MongoClient} from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {email, name, message} = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({message: 'invalid input'});
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };

    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.lru61.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({message: 'could not connect to database'});
    }

    try {
      const db = client.db();
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({message: 'storing message failed'});
      return
    }

    client.close();
    res.status(201).json({message: 'successfully stored message'});
  }
}
