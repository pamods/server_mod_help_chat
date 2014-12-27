console.log('help chat');

(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_help_chat = 'coui://ui/mods/server_mod_help_chat'
})()

require([
  'server_mod_help_chat/info',
  'server_mod_help_chat/chat'
], function(info, Bot) {
  var bot = new Bot(info.topics)

  if (handlers.event_message) {
    var base_event_message = handlers.event_message
    handlers.event_message = function(payload) {
      base_event_message.apply(this, arguments)
      bot.hear(payload)
    }
  }

  if (handlers.chat_message) {
    var base_chat_message = handlers.chat_message
    handlers.chat_message = function(payload) {
      base_chat_message.apply(this, arguments)
      bot.hear(payload)
    }
  }

  //var print = function(data) {console.log(data)}
  //info.specs.subscribe(print)
  //info.help.subscribe(print)
  //info.topics.subscribe(print)

  //setTimeout(function() {
    //handlers.event_message({message: ' joined the lobby', target: 'somebody'})
  //}, 1000)
})
