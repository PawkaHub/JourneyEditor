/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.CylinderGeometry = function ( signals, object ) {

	var container = new Interface.Panel();

	var parameters = object.geometry.parameters;

	// radiusTop

	var radiusTopRow = new Interface.Panel();
	var radiusTop = new Interface.Number( parameters.radiusTop ).onChange( update );

	radiusTopRow.add( new Interface.Text( 'Radius top' ).setWidth( '90px' ) );
	radiusTopRow.add( radiusTop );

	container.add( radiusTopRow );

	// radiusBottom

	var radiusBottomRow = new Interface.Panel();
	var radiusBottom = new Interface.Number( parameters.radiusBottom ).onChange( update );

	radiusBottomRow.add( new Interface.Text( 'Radius bottom' ).setWidth( '90px' ) );
	radiusBottomRow.add( radiusBottom );

	container.add( radiusBottomRow );

	// height

	var heightRow = new Interface.Panel();
	var height = new Interface.Number( parameters.height ).onChange( update );

	heightRow.add( new Interface.Text( 'Height' ).setWidth( '90px' ) );
	heightRow.add( height );

	container.add( heightRow );

	// radialSegments

	var radialSegmentsRow = new Interface.Panel();
	var radialSegments = new Interface.Integer( parameters.radialSegments ).setRange( 1, Infinity ).onChange( update );

	radialSegmentsRow.add( new Interface.Text( 'Radial segments' ).setWidth( '90px' ) );
	radialSegmentsRow.add( radialSegments );

	container.add( radialSegmentsRow );

	// heightSegments

	var heightSegmentsRow = new Interface.Panel();
	var heightSegments = new Interface.Integer( parameters.heightSegments ).setRange( 1, Infinity ).onChange( update );

	heightSegmentsRow.add( new Interface.Text( 'Height segments' ).setWidth( '90px' ) );
	heightSegmentsRow.add( heightSegments );

	container.add( heightSegmentsRow );

	// openEnded

	/*var openEndedRow = new Interface.Panel();
	var openEnded = new Interface.Checkbox( parameters.openEnded ).onChange( update );

	openEndedRow.add( new Interface.Text( 'Open ended' ).setWidth( '90px' ) );
	openEndedRow.add( openEnded );

	container.add( openEndedRow );*/

	//

	function update() {

		object.geometry.dispose();

		object.geometry = new THREE.CylinderGeometry(
			radiusTop.getValue(),
			radiusBottom.getValue(),
			height.getValue(),
			radialSegments.getValue(),
			heightSegments.getValue()/*,
			openEnded.getValue()*/
		);

		object.geometry.computeBoundingSphere();

		signals.geometryChanged.dispatch( object );

	}

	return container;

}
