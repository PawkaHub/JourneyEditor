/**
 * @author mrdoob / http://mrdoob.com/
 */

window.Menubar = function ( editor ) {

	var container = new Interface.Panel();
	container.setId( 'menubar' );
	container.setClass( 'Panel hidden' );

	container.add( new Menubar.Import( editor ) );
	container.add( new Menubar.ExportOBJ( editor) );
	container.add( new Menubar.AddGroup( editor ) );
	container.add( new Menubar.AddPlane( editor ) );
	container.add( new Menubar.AddBox( editor ) );
	container.add( new Menubar.AddCylinder( editor ) );
	container.add( new Menubar.AddDirectionalLight( editor ) );
	container.add( new Menubar.AddPerspectiveCamera( editor ) );

	return container;

};
