## 1.1.0

- Removed some cases where the bot accidentally spoke
- Extracted post to chat from core chat module

## 1.0.0

- Chat announcements on player entry.

## 0.3.0

- Interim version supports both mod_help.json and server_mod_help.json. server_mod_help will be removed in next version
- Matching is case-insensitive
- If a mod provides no topics, a default is provided with the mod description
- More general substring matching

## 0.2.0

- Fix greeting players.
- Disable greeting players when there are no topics.
- Simple prefix matching (!c matches !commands, and so on)
