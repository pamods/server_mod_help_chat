# Server Mod Help Chat

Offer help on server mods via a chat bot.  Chat is available in the game lobby and in game.  In the lobby, it will greet new players in order tell them about the !topics command.

## Chat Commands

- `!commands`: list commands
- `!topics`: list topics
- `?<topic>`: print the text associated with the given topic

## Providing Chat Help

This mod attempts to load a file named `<server mod idenfier>/mod_help.json`.  The directory name *must* be the same identifier which appears in your `modinfo.json`.  Example: `com.wondible.pa.my_awesome_mod/mod_help.json`.

### Chat Topics

The JSON file should contain a `topics` object with simple topic-text pairs.

    {
      "topics": {
        "my awesome mod": "Brief overview",
        "another topic": "...",
        "mymod tips": "..."
      }
    }

All chat topics are merged, so please try to choose topic names which are unlikely to collide with other mods (such as `tips`)

### Announcements

The JSON file may contain an `announcement` string.  Announcements occur when a player enters the lobby. The intended use is for mods that can offer additional lobby functionality by shadowing. Please use with restraint.

    {
      "announcement": "Extra lobby functionality is available.  If you don't see XXXX, refresh the UI (F5 by default).",
      "topics": {...}
    }
