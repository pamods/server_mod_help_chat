define(function() {
  var topics = ko.observable({})
  var addTopics = function(t) {
    topics(_.extend(topics(), t))
  }
  var specs = ko.observable({})
  var addSpec = function(identifier, s) {
    specs()[identifier] = s
    specs(specs())
  }

  var record = function(identifier) {
    return function(data) {
      //console.log(data)
      try {
        var ext = JSON.parse(data)
        if (ext) {
          addSpec(identifier, ext)
          if (ext.topics) {
            addTopics(ext.topics)
          } else {
            console.log('no help topics found in', this.url)
          }
        } else {
          console.log('did not parse', this.url)
        }
      } catch(e) {
        console.log('json parsing error in file', this.url, e.message)
      }
    }
  }
  var failure = function() {
    //console.log('no help found for', this.url)
  }
  var loadModHelp = function(mod) {
    var url = 'coui://'+mod.identifier+'/server_mod_help.json'
    $.ajax({
      url: url,
      success: record(mod.identifier),
      error: failure
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
    specs: specs,
    topics: topics,
  }
})
