/**
 * @author mrdoob / http://mrdoob.com/
 */

window.Sidebar = function ( editor ) {

	var container = new Interface.Panel();
	container.setId( 'sidebar' );
	container.setClass( 'Panel hidden' );

	//container.add( new Sidebar.Project( editor ) );
	container.add( new Sidebar.Scene( editor ) );
	container.add( new Sidebar.Material( editor ) );
	container.add( new Sidebar.Object3D( editor ) );
	container.add( new Sidebar.Geometry( editor ) );
	//container.add( new Sidebar.Animation( editor ) );
	container.add( new Sidebar.Script( editor ) );

	return container;

};
