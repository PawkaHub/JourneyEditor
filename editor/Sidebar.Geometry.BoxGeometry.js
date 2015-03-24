/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.BoxGeometry = function ( signals, object ) {

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

	// depth

	var depthRow = new Interface.Panel();
	var depth = new Interface.Number( parameters.depth ).onChange( update );

	depthRow.add( new Interface.Text( 'Depth' ).setWidth( '90px' ) );
	depthRow.add( depth );

	container.add( depthRow );

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

	// depthSegments

	var depthSegmentsRow = new Interface.Panel();
	var depthSegments = new Interface.Integer( parameters.depthSegments ).setRange( 1, Infinity ).onChange( update );

	depthSegmentsRow.add( new Interface.Text( 'Height segments' ).setWidth( '90px' ) );
	depthSegmentsRow.add( depthSegments );

	container.add( depthSegmentsRow );

	//

	function update() {

		object.geometry.dispose();

		object.geometry = new THREE.BoxGeometry(
			width.getValue(),
			height.getValue(),
			depth.getValue(),
			widthSegments.getValue(),
			heightSegments.getValue(),
			depthSegments.getValue()
		);

		object.geometry.computeBoundingSphere();

		signals.geometryChanged.dispatch( object );

	}

	return container;

}
