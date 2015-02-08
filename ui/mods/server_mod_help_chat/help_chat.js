define(['server_mod_help_chat/chat'], function(Bot) {
  var listTopics = function(payload) {
    topics = Object.keys(this.topics()).map(function(t) { return '?' + t }).join(', ')
    this.say("topics are: " + topics)
  }

  var hearTopic = function(payload) {
    if (payload.message[0] == '?') {
      var topic = payload.message.substr(1)
      if (topic.length < 1) return false
      var text = this.lookup(this.topics(), topic)
      if (text) {
        this.say(text)
      } else {
        this.say("Sorry, I don't know about " + payload.message)
      }
      return true
    }
  }

  var topicCount = function() {
    return Object.keys(this.topics()).length
  }

  Bot.prototype.topicCount = topicCount
  Bot.prototype.commands['!topics'] = listTopics
  Bot.prototype.listeners.push(hearTopic)

  return Bot
})
