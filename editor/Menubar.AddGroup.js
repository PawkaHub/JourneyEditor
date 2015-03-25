/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddGroup = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu group' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// Group
	container.onClick( function () {
		var mesh = new THREE.Group();
		mesh.name = 'Group ' + ( ++ meshCount );

		editor.addObject( mesh );
		editor.select( mesh );
	} );

	return container;
}
