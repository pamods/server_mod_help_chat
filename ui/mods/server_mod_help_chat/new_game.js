console.log('help chat');

(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_help_chat = 'coui://ui/mods/server_mod_help_chat'
})()

require([
  'server_mod_help_chat/new_game_public_bot',
  'server_mod_help_chat/new_game_local_bot',
], function(publicBot, localBot) {
  localBot.commands['/on'] = function() {
    publicBot.enabled = true;
    this.say('public chat enabled')
  }
  localBot.commands['/off'] = function() {
    publicBot.enabled = false;
    this.say('public chat enabled')
  }
})
