function chatsController(logger, db) {
  return {
    get: async function createChat(req, res) {
      const log = logger.child({ module: 'chatsController', method: 'createchat' });
      log.info('Request to create an chat received')
      try {
        console.log(req.headers)
        const chatData = req.body;
        const chatQuery = req.query;
        // const chat = await db.chats.create(chatData)
        console.log(chatData, chatQuery)
        if(req.query['hub.verify_token'] !== 'testtoken') {
          throw new Error('Invalid token')
        }
        log.info('chat created')
        res.status(200).send(req.query['hub.challenge'])
      } catch (err){
        log.error({reason: err.message},'Could not start chat')
        res.status(500).send({
          message: err.message
        })
      }
    },
    post: async function createChat(req, res) {
      const log = logger.child({ module: 'chatsController', method: 'createchat' });
      log.info('Request to create an chat received')
      try {
        const chatData = req.body;
        const chatQuery = req.query;
        // const chat = await db.chats.create(chatData)
        console.log(JSON.stringify(chatData,null,2))
        log.info('chat created')
        res.status(200).send(
          {
            "message":"Success"
          }
        )
      } catch (err){
        log.error({reason: err.message},'Could not start chat')
        res.status(500).send({
          message: err.message
        })
      }
    }
  };
}

export default chatsController