# Server Mod Help Chat

Offer help on server mods via a chat bot.  Chat is available in the game lobby and in game.  In the lobby, it will greet new players in order tell them about the !topics command.

## Chat Commands

- `!commands`: list commands
- `!topics`: list topics
- `?<topic>`: print the text associated with the given topic

## Providing Chat Help

This mod attempts to load a file named `<server mod idenfier>/mod_help.json`.  The directory name *must* be the same identifier which appears in your `modinfo.json`.  Example: `com.wondible.pa.my_awesome_mod/mod_help.json`. The JSON file should contain a `topics` object with simple topic-text pairs.

    {
      "topics": {
        "mod name": "Brief overview",
        "another topic": "...",
        "mymod tips": "..."
      }
    }

All chat topics are merged, so please try to choose topic names which are unlikely to collide with other mods (such as `tips`)
