define(['server_mod_help_chat/chat'], function(Bot) {
  var listTopics = function(payload) {
    topics = Object.keys(this.topics()).map(function(t) { return '?' + t }).join(', ')
    this.say("topics are: " + topics)
  }

  var hearTopic = function(payload) {
    if (payload.message[0] == '?') {
      var topic = payload.message.substr(1)
      if (topic.length < 1) return false
      var text = this.lookup(this.topics(), topic) || fuzzyLookup(this.topics(), topic)
      if (text) {
        this.say(text)
      } else {
        this.say("Sorry, I don't know about " + payload.message)
      }
      return true
    }
  }

  var fuzzyLookup = function(object, key) {
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
  }

  var topicCount = function() {
    return Object.keys(this.topics()).length
  }

  Bot.prototype.topicCount = topicCount
  Bot.prototype.commands['!topics'] = listTopics
  Bot.prototype.listeners.push(hearTopic)

  return Bot
})
