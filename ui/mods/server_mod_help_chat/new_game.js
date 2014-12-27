(function() {
  console.log('help chat')

  var success = function(data) {
    //console.log(data)
    try {
      console.log(JSON.parse(data))
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

})()
