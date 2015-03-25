/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Import = function ( editor ) {
	var container = new Interface.Panel();
	container.setClass( 'menu import' );

	// Import
	var fileInput = document.createElement( 'input' );
	fileInput.type = 'file';
	fileInput.addEventListener( 'change', function ( event ) {
		editor.loader.loadFile( fileInput.files[ 0 ] );
	} );

	container.onClick( function () {
		fileInput.click();
	} );

	return container;
};