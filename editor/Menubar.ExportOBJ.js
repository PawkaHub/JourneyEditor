/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.ExportOBJ = function ( editor ) {

	var container = new Interface.Panel();
	container.setClass( 'menu export' );

	// Export OBJ
	container.onClick( function () {
		var object = editor.scene;
		console.log('object',object);
		if ( object === null ) {
			alert( 'No object selected.' );
			return;
		}
		var exporter = new THREE.OBJExporter();
		exportString( exporter.parse( object ), object.name + '.obj' );
	} );

	// Export String
	var exportString = function ( output, filename ) {
		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		var link = document.createElement( 'a' );
		link.href = objectURL;
		link.download = filename || 'data.json';
		link.target = '_blank';
		link.click();
	};

	return container;
};
