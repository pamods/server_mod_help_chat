if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

require({baseUrl: '../ui/mods'}, [
  'server_mod_help_chat/help_chat',
], function(Bot) {
  Bot.prototype.say = function(message) {
    this.messages.push(message)
  }
  var bot = new Bot()
  QUnit.test( "simple string", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value'}, 'key'), 'value')
    assert.equal(bot.messages.length, 0)
  });
  QUnit.test( "no match", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value'}, 'foo'), undefined)
    assert.equal(bot.messages.length, 0)
  });
  QUnit.test( "partial match", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value'}, 'k'), 'value')
    assert.equal(bot.messages.length, 0)
  });
  QUnit.test( "candidate match", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value', 'key2': 'value2'}, 'k'), undefined)
    assert.equal(bot.messages.length, 1)
  });
  QUnit.test( "empty string", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value'}, ''), undefined)
    assert.equal(bot.messages.length, 0)
  });
  QUnit.test( "^^^", function( assert ) {
    bot.messages = []
    assert.equal(bot.lookup({'key': 'value'}, '^^^'), undefined)
    assert.equal(bot.messages.length, 0)
  });
});
