define(function() {
  var Bot = function(topics) {
    this.topics = topics
  }

  Bot.prototype = {
    constructor: Bot,
    say: function(message) {
      model.send_message("chat_message", {message: "> " + message})
    },
    greet: function(player) {
      this.say("Hello " + player + ".  Type !topics for server mod help.")
    },
    hear: function(payload) {
      //console.log(payload)
      if (this.commands[payload.message]) {
        this.commands[payload.message].call(this, payload)
      } else if (payload.message[0] == '!') {
        this.say("Sorry, I don't know " + payload.message + "  Type !commands for ticks I do know.")
      } else if (payload.message[0] == '?') {
        topic = payload.message.substr(1)
        if (this.topics()[topic]) {
          this.say(this.topics()[topic])
        } else {
          this.say("Sorry, I don't know about " + payload.message)
        }
      }
    },
    commands: {
      ' joined the lobby': function(payload) {
        if (payload.target) {
          this.greet(payload.target)
        }
      },
      '!commands': function(payload) {
        topics = Object.keys(this.commands).join(', ')
        this.say("commands are: " + topics)
      },
      '!topics': function(payload) {
        topics = Object.keys(this.topics()).map(function(t) { return '?' + t }).join(', ')
        this.say("topics are: " + topics)
      }
    },
  }

  return Bot
})
