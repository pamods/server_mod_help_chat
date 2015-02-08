console.log('help chat');

(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_help_chat = 'coui://ui/mods/server_mod_help_chat'
})()

require([
  'server_mod_help_chat/live_game_chat_public_bot',
  'server_mod_help_chat/live_game_chat_local_bot'
], function(publicBot, localBot) {
  localBot.commands['/on'] = function() {
    publicBot.enabled(true)
  }
  localBot.commands['/off'] = function() {
    publicBot.enabled(false)
  }

  publicBot.enabled = ko.observable()

  publicBot.enabled.subscribe(function(value) {
    if (value) {
      localBot.say('public chat enabled')
    } else {
      localBot.say('public chat disabled')
    }
  })

  publicBot.enabled(false)
})
