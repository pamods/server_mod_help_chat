## 1.2.1

- Bump build number for titans

## 1.2.0

- Fix issue with jQuery auto-parsing json
- Remove legacy support for `server_mod_help.json`

## 1.1.0

- Fix forum url
- Removed some cases where the bot accidentally spoke
- Extracted post to chat from core chat module
- Chatbots can be disabled
- Local commands to control public chat: /on /off
- Public chat is disabled by default, except for the host in the lobby

## 1.0.0

- Chat announcements on player entry.

## 0.3.0

- Interim version supports both `mod_help.json` and `server_mod_help.json`. `server_mod_help` will be removed in next version
- Matching is case-insensitive
- If a mod provides no topics, a default is provided with the mod description
- More general substring matching

## 0.2.0

- Fix greeting players.
- Disable greeting players when there are no topics.
- Simple prefix matching (!c matches !commands, and so on)
