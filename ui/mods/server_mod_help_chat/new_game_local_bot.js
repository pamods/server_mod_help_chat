require([
  'server_mod_help_chat/chat'
], function(Bot) {
  var bot = new Bot()
  bot.commands = {
    '/commands': bot.commands['!commands'],
  }

  bot.say = function(message) {
    model.chatMessages.push({
      username: ko.observable('smhc'),
      type: 'server',
      payload: ko.observable(message),
    })
  }

  var newGameSendChat = model.sendChat
  model.sendChat = function() {
    try {
      if (bot.hear({message: $(".input_chat_text").val()})) {
        $(".input_chat_text").val("");
        return
      }
    } catch(e) {
      //throw e
      console.error(e)
    }

    newGameSendChat()
  }

  return bot
})
