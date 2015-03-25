/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddCylinder = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu cylinder' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// Cylinder
	container.onClick( function () {
		var radiusTop = 20;
		var radiusBottom = 20;
		var height = 100;
		var radiusSegments = 32;
		var heightSegments = 1;
		var openEnded = false;

		var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		mesh.name = 'Cylinder ' + ( ++ meshCount );

		editor.addObject( mesh );
		editor.select( mesh );
	} );

	return container;
}
