Package.describe({
  name: 'pawkadeploy:mocker',
  version: '0.0.2',
  summary: 'Collaborative 3D Mockup Tool',
  git: 'https://github.com/PawkaHub/Mocker',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4');
  api.use(['stylus']);
  api.use(['coffeescript']);

  //Lib
  api.addFiles('build/three.min.js','client');
  api.addFiles('build/system.min.js','client');

  //Controls
  api.addFiles('controls/EditorControls.js','client');
  api.addFiles('controls/TransformControls.js','client');

  //Code Mirror
  api.addFiles('libs/codemirror/codemirror.js','client');
  api.addFiles('libs/codemirror/mode/javascript.js','client');

  //Libs
  api.addFiles('libs/esprima.js','client');
  api.addFiles('libs/jszip.min.js','client');
  api.addFiles('libs/sortable.min.js','client');
  api.addFiles('libs/signals.min.js','client');
  api.addFiles('libs/interface.js','client');
  api.addFiles('libs/interface.three.js','client');
  api.addFiles('libs/app.js','client');

  //Editor
  api.addFiles('editor/Player.js','client');
  api.addFiles('editor/Script.js','client');
  api.addFiles('editor/Storage.js','client');
  api.addFiles('editor/Editor.js','client');
  api.addFiles('editor/Config.js','client');
  api.addFiles('editor/Loader.js','client');

  //Menubar
  api.addFiles('editor/Menubar.js','client');
  api.addFiles('editor/Menubar.File.js','client');
  api.addFiles('editor/Menubar.Add.js','client');

  //Sidebar
  api.addFiles('editor/Sidebar.js','client');
  api.addFiles('editor/Sidebar.Scene.js','client');
  api.addFiles('editor/Sidebar.Object3D.js','client');
  api.addFiles('editor/Sidebar.Geometry.js','client');
  api.addFiles('editor/Sidebar.Geometry.Geometry.js','client');
  api.addFiles('editor/Sidebar.Geometry.BoxGeometry.js','client');
  api.addFiles('editor/Sidebar.Geometry.CylinderGeometry.js','client');
  api.addFiles('editor/Sidebar.Geometry.PlaneGeometry.js','client');
  api.addFiles('editor/Sidebar.Material.js','client');
  api.addFiles('editor/Sidebar.Script.js','client');

  //Viewport
  api.addFiles('editor/Viewport.js','client');

  //Styles
  api.addFiles('editor.styl');

  //Editor Initialization
  api.addFiles('init.js','client');
});