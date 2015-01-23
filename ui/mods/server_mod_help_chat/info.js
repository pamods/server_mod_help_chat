define(function() {
  var topics = ko.observable({})
  var addTopics = function(t) {
    for (var k in t) {
      topics()[k.toLowerCase()] = t[k]
    }
    topics(topics())
  }
  var announcements = ko.observableArray([])
  var addAnnouncement = function(a) {
    announcements.push(a)
  }
  var specs = ko.observable({})
  var addSpec = function(identifier, s) {
    specs()[identifier] = s
    specs(specs())
  }
  var defaultTopic = function(mod) {
    var article = {}
    article[mod.display_name] = mod.description
    return article
  }

  var record = function(mod, notFound) {
    return function(data) {
      //console.log(data)
      try {
        var ext = JSON.parse(data)
      } catch(e) {
        console.error('json parsing error in file', this.url, e.message)
        notFound()
        return
      }
      if (ext) {
        addSpec(mod.identifier, ext)
        if (ext.topics) {
          addTopics(ext.topics)
        } else {
          console.log('no help topics found in', this.url)
          notFound()
        }
        if (ext.announcement) {
          addAnnouncement(ext.announcement)
        }
      } else {
        console.warn('did not parse', this.url)
        notFound()
      }
    }
  }
  var failure = function(notFound) {
    return function() {
      //console.log('no help found for', this.url)
      notFound()
    }
  }
  var loadModHelp = function(mod) {
    var url = 'coui://'+mod.identifier+'/mod_help.json'
    var notFound = function() {addTopics(defaultTopic(mod))}
    $.ajax({
      url: url,
      success: record(mod, notFound),
      error: failure(notFound)
    });
    var url0 = 'coui://'+mod.identifier+'/server_mod_help.json'
    var na = function() {}
    $.ajax({
      url: url0,
      success: record(mod, na),
      error: failure(na)
    });
  }

  var mounted = function(mods) {
    mods.forEach(loadModHelp)
  }

  //api.mods.getMountedMods('client', mounted)
  api.mods.getMountedMods('server', mounted)

  if (handlers.mount_mod_file_data) {
    var base_mount_mod_file_data = handlers.mount_mod_file_data
    handlers.mount_mod_file_data = function() {
      base_mount_mod_file_data.apply(this, arguments)
      api.mods.getMountedMods('server', mounted)
    }
  }

  return {
    announcements: announcements,
    specs: specs,
    topics: topics,
  }
})
