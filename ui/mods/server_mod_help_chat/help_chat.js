define(['server_mod_help_chat/chat'], function(Bot) {
  var listTopics = function(payload) {
    topics = Object.keys(this.topics()).map(function(t) { return '?' + t }).join(', ')
    this.say("topics are: " + topics)
  }

  var hearTopic = function(payload) {
    if (payload.message[0] == '?') {
      topic = payload.message.substr(1)
      if (this.topics()[topic]) {
        this.say(this.topics()[topic])
      } else {
        this.say("Sorry, I don't know about " + payload.message)
      }
    }
  }

  Bot.prototype.commands['!topics'] = listTopics
  Bot.prototype.listeners.push(hearTopic)

  return Bot
})
