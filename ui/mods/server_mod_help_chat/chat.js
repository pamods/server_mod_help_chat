define(function() {
  var Bot = function() {}

  var knownCommand = function(payload) {
    var command = this.lookup(this.commands, payload.message)
    if (command) {
      command.call(this, payload)
      return true
    }
  }

  var unknownCommand = function(payload) {
    if (payload.message[0] == '!') {
      this.say("Sorry, I don't know " + payload.message + "  Type !commands for tricks I do know.")
      return true
    }
  }

  Bot.prototype = {
    constructor: Bot,
    say: function(message) {
      var msg = {message: "> " + message}
      model.send_message("chat_message", msg)
    },
    hear: function(payload) {
      //console.log(payload)
      for (var i = 0;i < this.listeners.length;i++) {
        if (this.listeners[i].call(this, payload)) {
          return true
        }
      }
    },
    listeners: [knownCommand, unknownCommand],
    lookup: function(object, key) {
      key = key.toLowerCase()
      if (object[key]) {
        return object[key]
      }

      if (key.length < 1) return undefined
      var candidates = Object.keys(object).filter(function(c) {
        return c.startsWith(key)
      })
      if (candidates.length == 1) {
        return object[candidates[0]]
      } else if (candidates.length > 1) {
        this.say(key + ' has multiple matches: ' + candidates.join(', '))
        return undefined
      }

      var rkey = new RegExp(key.replace(/[^\w\s!\/]/g, ''))
      if (''.match(rkey)) return undefined
      var candidates = Object.keys(object).filter(function(c) {
        return c.match(rkey)
      })
      if (candidates.length == 1) {
        return object[candidates[0]]
      } else if (candidates.length > 1) {
        this.say(key + ' has multiple matches: ' + candidates.join(', '))
        return undefined
      }

      return undefined
    },
    commands: {
      '!commands': function(payload) {
        topics = Object.keys(this.commands).join(', ')
        this.say("commands are: " + topics)
      },
    },
  }

  return Bot
})
