define(function() {
  var Bot = function(topics) {
    this.topics = topics
  }

  Bot.prototype = {
    constructor: Bot,
    say: function(message) {
      model.send_message("chat_message", {message: message})
    },
    greet: function(player) {
      this.say("Hello " + player + ".  Type !topics for server mod help.")
    },
  }

  return Bot
})
