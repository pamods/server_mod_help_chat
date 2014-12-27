console.log('help chat');

(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_help_chat = 'coui://ui/mods/server_mod_help_chat'
})()

require(['server_mod_help_chat/info'], function(info) {
  var print = function(data) {console.log(data)}
  info.specs.subscribe(print)
  info.help.subscribe(print)
  info.topics.subscribe(print)
})
