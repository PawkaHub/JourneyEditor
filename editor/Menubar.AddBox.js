/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddBox = function ( editor ) {
	var container = new Interface.Panel();
	container.setClass( 'menu box' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// Box
	container.onClick( function () {
		var width = 100;
		var height = 100;
		var depth = 100;

		var widthSegments = 1;
		var heightSegments = 1;
		var depthSegments = 1;

		var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		mesh.name = 'Box ' + ( ++ meshCount );

		editor.addObject( mesh );
		editor.select( mesh );
	} );

	return container;
}
