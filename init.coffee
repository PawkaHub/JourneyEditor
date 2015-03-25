# Write your package code here!
console.log 'initing'
Meteor.startup ->
  window.URL = window.URL or window.webkitURL
  window.BlobBuilder = window.BlobBuilder or window.WebKitBlobBuilder or window.MozBlobBuilder

  Number::format = ->
    @toString().replace /(\d)(?=(\d{3})+(?!\d))/g, '$1,'

  #
  editor = new Editor
  signals = editor.signals
  viewport = new Viewport(editor)
  document.body.appendChild viewport.dom
  script = new Script(editor)
  document.body.appendChild script.dom
  player = new Player(editor)
  document.body.appendChild player.dom

  ###var toolbar = new Toolbar( editor );
  document.body.appendChild( toolbar.dom );
  ###

  menubar = new Menubar(editor)
  document.body.appendChild menubar.dom
  sidebar = new Sidebar(editor)
  document.body.appendChild sidebar.dom
  dialog = new (Interface.Dialog)
  document.body.appendChild dialog.dom
  #
  editor.setTheme editor.config.getKey('theme')
  editor.storage.init ->
    editor.storage.get (state) ->
      if state != undefined
        editor.fromJSON state
      selected = editor.config.getKey('selected')
      if selected != undefined
        editor.selectByUuid selected
      return
    #
    timeout = undefined

    saveState = (scene) ->
      if editor.config.getKey('autosave') == false
        return
      clearTimeout timeout
      timeout = setTimeout((->
        editor.signals.savingStarted.dispatch()
        timeout = setTimeout((->
          editor.storage.set editor.toJSON()
          editor.signals.savingFinished.dispatch()
          return
        ), 100)
        return
      ), 1000)
      return

    signals.editorCleared.add saveState
    signals.geometryChanged.add saveState
    signals.objectAdded.add saveState
    signals.objectChanged.add saveState
    signals.objectRemoved.add saveState
    signals.materialChanged.add saveState
    signals.sceneGraphChanged.add saveState
    signals.scriptChanged.add saveState
    return
  #
  document.addEventListener 'dragover', ((event) ->
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    return
  ), false
  document.addEventListener 'drop', ((event) ->
    event.preventDefault()
    if event.dataTransfer.files.length > 0
      editor.loader.loadFile event.dataTransfer.files[0]
    return
  ), false
  isPlaying = false
  isSnapped = false
  isWireframe = false
  sidebarHidden = true
  document.addEventListener 'keydown', ((event) ->
    `var object`
    `var object`
    `var object`
    `var object`
    console.log 'event', event.keyCode
    switch event.keyCode
      when 8
        # prevent browser back
        event.preventDefault()
        object = editor.selected
        parent = object.parent
        editor.removeObject object
        editor.select parent
      when 80
        if event.ctrlKey
          if isPlaying == false
            isPlaying = true
            signals.startPlayer.dispatch()
          else
            isPlaying = false
            signals.stopPlayer.dispatch()
      when 83
        if event.ctrlKey
          if isSnapped == false
            isSnapped = true
            signals.snapChanged.dispatch 25
          else
            isSnapped = false
            signals.snapChanged.dispatch 0
      when 79
        object = editor.selected
        if !object
          return
        geometry = object.geometry
        material = object.material
        if event.ctrlKey
          if material
            if material.wireframe != undefined
              if isWireframe == false
                isWireframe = true
                material.wireframe = true
              else
                isWireframe = false
                material.wireframe = false
            signals.materialChanged.dispatch material
      when 81
        object = editor.selected
        if !object
          return
        signals.transformModeChanged.dispatch 'translate'
      when 87
        object = editor.selected
        if !object
          return
        signals.transformModeChanged.dispatch 'rotate'
      when 69
        object = editor.selected
        if !object
          return
        signals.transformModeChanged.dispatch 'scale'
      when 73
      	#Trigger Inspector
      	menubar = document.querySelector '#menubar'
      	sidebar = document.querySelector '#sidebar'
      	if sidebarHidden == false
      		sidebarHidden = true
      		menubar.classList.add 'hidden'
      		sidebar.classList.add 'hidden'
      	else
      		sidebarHidden = false
      		menubar.classList.remove 'hidden'
      		sidebar.classList.remove 'hidden'
    return
  ), false

  onWindowResize = (event) ->
    editor.signals.windowResize.dispatch()
    return

  window.addEventListener 'resize', onWindowResize, false
  onWindowResize()
  #
  file = null
  hash = window.location.hash
  if hash.substr(1, 4) == 'app='
    file = hash.substr(5)
  if hash.substr(1, 6) == 'scene='
    file = hash.substr(7)
  if file != null
    if confirm('Any unsaved data will be lost. Are you sure?')
      loader = new (THREE.XHRLoader)
      loader.crossOrigin = ''
      loader.load file, (text) ->
        json = JSON.parse(text)
        editor.clear()
        editor.fromJSON json
        return
  return