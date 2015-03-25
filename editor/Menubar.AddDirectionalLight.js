/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.AddDirectionalLight = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu light' );

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {
		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;
	} );

	// DirectionalLight
	container.onClick( function () {
		var color = 0xffffff;
		var intensity = 1;

		var light = new THREE.DirectionalLight( color, intensity );
		light.name = 'DirectionalLight ' + ( ++ lightCount );
		light.target.name = 'DirectionalLight ' + ( lightCount ) + ' Target';

		light.position.set( 0.5, 1, 0.75 ).multiplyScalar( 200 );

		editor.addObject( light );
		editor.select( light );
	} );

	return container;
}
