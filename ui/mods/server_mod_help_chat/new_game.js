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
  var print = function(data) {console.log(data)}
  //info.specs.subscribe(print)
  //info.help.subscribe(print)
  //info.topics.subscribe(print)
  var bot = new Bot(info.help)

  if (handlers.event_message) {
    var base_event_message = handlers.event_message
    handlers.event_message = function(payload) {
      base_event_message.apply(this, arguments)
      if (payload.message == ' joined the lobby' && payload.target) {
        bot.greet(payload.target)
      }
    }
  }

  setTimeout(function() {
    handlers.event_message({message: ' joined the lobby', target: 'somebody'})
  }, 1000)
})
