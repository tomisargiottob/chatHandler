import Chat from "../models/chat";
import { v4 as uuid } from 'uuid'

class Chats{
  constructor(db) {
    this.db = db;
    this.collection= this.db.collection('chats')
  }

  async getAll() {
    const chats = await this.collection.find({}).toArray();
    return chats.map((chat) => new Chat(this.collection, chat))
  }

  async getById(id) {
    const chat = await this.collection.findOne({_id:id});
    if(chat) {
      return new Chat(this.collection, chat)
    } else {
      return null
    }
  }

  async create(chatData) {
    chatData.createdAt = Date.now()
    const chat = await this.collection.insertOne({_id: uuid(), ...chatData});
    return this.getById(chat.insertedId)
  }
}

export default Chats