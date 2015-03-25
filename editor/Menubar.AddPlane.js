/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddPlane = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu plane' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// Plane
	container.onClick( function () {
		var width = 200;
		var height = 200;

		var widthSegments = 1;
		var heightSegments = 1;

		var geometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments );
		var material = new THREE.MeshPhongMaterial();
		var mesh = new THREE.Mesh( geometry, material );
		//Set Mesh rotation to be flat
		mesh.rotation.x = -Math.PI / 2;
		mesh.name = 'Plane ' + ( ++ meshCount );

		editor.addObject( mesh );
		//Zero out position
		mesh.position.y = 0
		editor.select( mesh );
	} );

	return container;
}