(function() {
  console.log('help chat')

  var help = ko.observable({})
  var topics = ko.computed(function() {
    return Object.keys(help())
  })
  var addTopics = function(t) {
    help(_.extend(help(), t))
    console.log(help())
  }

  var success = function(data) {
    //console.log(data)
    try {
      var ext = JSON.parse(data)
      if (ext && ext.topics) {
        addTopics(ext.topics)
      } else {
        console.log('no help topics found in', this.url)
      }
    } catch(e) {
      console.log('json parsing error in file', this.url, e.message)
    }
  }
  var failure = function() {
    //console.log('no help found for', this.url)
  }
  var loadModHelp = function(mod) {
    var url = 'coui://'+mod.identifier+'/server_mod_help.json'
    $.ajax({
      url: url,
      success: success,
      error: failure
    });
  }

  var mounted = function(mods) {
    mods.forEach(loadModHelp)
  }

  api.mods.getMountedMods('client', mounted)
  api.mods.getMountedMods('server', mounted)

  var base_mount_mod_file_data = handlers.mount_mod_file_data
  handlers.mount_mod_file_data = function() {
    base_mount_mod_file_data.apply(this, arguments)
    api.mods.getMountedMods('server', mounted)
  }
})()
