import { v4 as uuid } from 'uuid'

const interactionToJson = (interaction) => ({
  id: interaction._id, 
  message: interaction.message, 
  response: interaction.response,
  externalId: interaction.externalId,
  createdAt: interaction.createdAt,
  sessionId: interaction.sessionId,
  source: interaction.source,
})

class Interactions{
  constructor(db) {
    this.db = db;
    this.collection= this.db.collection('chats')
  }

  async getAll(where) {
    if(where.sessionId) {
      queryParams.sessionId = where.sessionId
    }
    if(where.externalId) {
      queryParams.externalId = where.externalId
    }
    const interactions = await this.collection.find(queryParams).toArray();
    return interactions.map(interactionToJson)
  }

  async getById(id) {
    return this.collection.findOne({_id:id})
  }

  async create(interactionData) {
    interactionData.createdAt = Date.now()
    const interaction = await this.collection.insertOne({_id: uuid(), ...interactionData});
    return interactionToJson(this.getById(interaction.insertedId))
  }
}

export default Interactions