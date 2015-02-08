define([
  'server_mod_help_chat/chat'
], function(Bot) {
  function ChatMessageModel(object) {
      var self = this;
      self.message = object.message ? object.message : "";
      self.player_name = object.player_name ? object.player_name : "";
      self.type = object.type ? object.type : "global";
      self.time_stamp = new Date().getTime();

      self.isGlobal = ko.computed(function () {
          return self.type === "global";
      });
      self.isTeam = ko.computed(function () {
          return self.type === "team";
      });
      self.isTwitch = ko.computed(function () {
          return self.type === "twitch";
      });
      self.isServer = ko.computed(function () {
          return self.type === "server";
      });
  }
  
  var bot = new Bot()
  bot.commands = {
    '/commands': bot.commands['!commands'],
  }
  bot.prefix = '/'

  bot.say = function(message) {
    var chat_message = new ChatMessageModel({
      message: message,
      player_name: 'smhc',
      type: 'server',
    });
    model.chatLog.push(chat_message);
    model.visibleChat.push(chat_message);
    $(".div_chat_feed").scrollTop($(".div_chat_feed")[0].scrollHeight);
    $(".div_chat_log_feed").scrollTop($(".div_chat_log_feed")[0].scrollHeight);
  }

  var liveGameSendChat = model.maybeSendChat
  model.maybeSendChat = function() {
    try {
      if (bot.hear({message: model.$input().val()})) {
        model.$input().val("");
        return
      }
    } catch(e) {
      //throw e
      console.error(e)
    }

    liveGameSendChat()
  }

  return bot
})
