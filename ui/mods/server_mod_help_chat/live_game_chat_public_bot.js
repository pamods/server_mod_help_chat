define([
  'server_mod_help_chat/info',
  'server_mod_help_chat/help_chat'
], function(info, Bot) {
  var bot = new Bot()
  bot.topics = info.topics

  bot.say = function(message) {
    var msg = {message: "> " + message}
    model.send_message("chat_message", msg)
  }

  if (handlers.chat_message) {
    var base_chat_message = handlers.chat_message
    handlers.chat_message = function(payload) {
      base_chat_message.apply(this, arguments)
      console.log(payload)
      bot.hear(payload)
    }
  }

  //var print = function(data) {console.log(data)}
  //info.specs.subscribe(print)
  //info.help.subscribe(print)
  //info.topics.subscribe(print)

  return bot
})
