/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddPerspectiveCamera = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu camera' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// PerspectiveCamera
	container.onClick( function() {
		var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10000 );
		camera.name = 'PerspectiveCamera ' + ( ++ cameraCount );

		editor.addObject( camera );
		editor.select( camera );
	} );

	return container;
}
