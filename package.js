Package.describe({
  name: 'pawkadeploy:mocker',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Collaborative 3D Mockup Tool',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/PawkaHub/Mocker',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4');
  api.use(['coffeescript']);

  //System
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
  api.addFiles('libs/ui.js','client');
  api.addFiles('libs/ui.three.js','client');
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
  //api.addFiles('editor/Menubar.Status.js','client');

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
  //api.addFiles('editor/Toolbar.js','client');
  api.addFiles('editor/Viewport.js','client');
  //api.addFiles('editor/Viewport.Info.js','client');

  //Editor Initialization
  api.addFiles('init.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('pawkadeploy:mocker');
  api.addFiles('editor-tests.js');
});
