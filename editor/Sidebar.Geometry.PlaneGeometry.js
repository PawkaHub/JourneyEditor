/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.PlaneGeometry = function ( signals, object ) {

	var container = new Interface.Panel();

	var parameters = object.geometry.parameters;

	// width

	var widthRow = new Interface.Panel();
	var width = new Interface.Number( parameters.width ).onChange( update );

	widthRow.add( new Interface.Text( 'Width' ).setWidth( '90px' ) );
	widthRow.add( width );

	container.add( widthRow );

	// height

	var heightRow = new Interface.Panel();
	var height = new Interface.Number( parameters.height ).onChange( update );

	heightRow.add( new Interface.Text( 'Height' ).setWidth( '90px' ) );
	heightRow.add( height );

	container.add( heightRow );

	// widthSegments

	var widthSegmentsRow = new Interface.Panel();
	var widthSegments = new Interface.Integer( parameters.widthSegments ).setRange( 1, Infinity ).onChange( update );

	widthSegmentsRow.add( new Interface.Text( 'Width segments' ).setWidth( '90px' ) );
	widthSegmentsRow.add( widthSegments );

	container.add( widthSegmentsRow );

	// heightSegments

	var heightSegmentsRow = new Interface.Panel();
	var heightSegments = new Interface.Integer( parameters.heightSegments ).setRange( 1, Infinity ).onChange( update );

	heightSegmentsRow.add( new Interface.Text( 'Height segments' ).setWidth( '90px' ) );
	heightSegmentsRow.add( heightSegments );

	container.add( heightSegmentsRow );


	//

	function update() {

		object.geometry.dispose();

		object.geometry = new THREE.PlaneGeometry(
			width.getValue(),
			height.getValue(),
			widthSegments.getValue(),
			heightSegments.getValue()
		);

		object.geometry.computeBoundingSphere();

		signals.geometryChanged.dispatch( object );

	}

	return container;

}
