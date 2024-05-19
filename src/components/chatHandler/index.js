class ChatHandler {
  constructor({logger}) {
    this.activeChats = []
    this.logger = logger.child({module: 'ChatHandler'})
  }

  
}

export default ChatHandler