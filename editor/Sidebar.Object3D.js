/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Object3D = function ( editor ) {

	var signals = editor.signals;

	var container = new Interface.CollapsiblePanel();
	container.setCollapsed( editor.config.getKey( 'ui/sidebar/object3d/collapsed' ) );
	container.onCollapsedChange( function ( boolean ) {

		editor.config.setKey( 'ui/sidebar/object3d/collapsed', boolean );

	} );
	container.setDisplay( 'none' );
	container.dom.classList.add( 'Mesh' );

	var objectType = new Interface.Text().setTextTransform( 'uppercase' );
	//container.addStatic( objectType );

	// Actions

	/*var objectActions = new Interface.Select().setPosition('absolute').setRight( '8px' ).setFontSize( '11px' );
	objectActions.setOptions( {

		'Actions': 'Actions',
		'Reset Position': 'Reset Position',
		'Reset Rotation': 'Reset Rotation',
		'Reset Scale': 'Reset Scale'

	} );
	objectActions.onClick( function ( event ) {

		event.stopPropagation(); // Avoid panel collapsing

	} );
	objectActions.onChange( function ( event ) {

		var object = editor.selected;

		switch ( this.getValue() ) {

			case 'Reset Position':
				object.position.set( 0, 0, 0 );
				break;

			case 'Reset Rotation':
				object.rotation.set( 0, 0, 0 );
				break;

			case 'Reset Scale':
				object.scale.set( 1, 1, 1 );
				break;

		}

		this.setValue( 'Actions' );

		signals.objectChanged.dispatch( object );

	} );
	container.addStatic( objectActions );*/

	//container.add( new Interface.Break() );

	// uuid

	var objectUUIDRow = new Interface.Panel();
	var objectUUID = new Interface.Input().setWidth( '115px' ).setFontSize( '12px' ).setDisabled( true );
	var objectUUIDRenew = new Interface.Button( '⟳' ).setMarginLeft( '7px' ).onClick( function () {

		objectUUID.setValue( THREE.Math.generateUUID() );

		editor.selected.uuid = objectUUID.getValue();

	} );

	objectUUIDRow.add( new Interface.Text( 'UUID' ).setWidth( '90px' ) );
	objectUUIDRow.add( objectUUID );
	objectUUIDRow.add( objectUUIDRenew );

	//container.add( objectUUIDRow );

	// name

	var objectNameRow = new Interface.Panel();
	var objectName = new Interface.Input().setWidth( '100%' ).setFontSize( '12px' ).onChange( function () {

		editor.nameObject( editor.selected, objectName.getValue() );

	} );

	//objectNameRow.add( new Interface.Text( 'Name' ).setWidth( '90px' ) );
	objectNameRow.add( objectName );

	container.add( objectNameRow );

	// parent

	var objectParentRow = new Interface.Panel();
	var objectParent = new Interface.Select().setWidth( '100%' ).setFontSize( '12px' ).onChange( update );

	//objectParentRow.add( new Interface.Text( 'Parent' ).setWidth( '90px' ) );
	objectParentRow.add( objectParent );

	container.add( objectParentRow );

	// position

	var objectPositionRow = new Interface.Panel();
	var objectPositionX = new Interface.Number().setWidth( '50px' ).onChange( update );
	var objectPositionY = new Interface.Number().setWidth( '50px' ).onChange( update );
	var objectPositionZ = new Interface.Number().setWidth( '50px' ).onChange( update );

	objectPositionRow.add( new Interface.Text( 'Position' ).setWidth( '100%' ) );
	objectPositionRow.add( objectPositionX, objectPositionY, objectPositionZ );

	container.add( objectPositionRow );

	// rotation

	var objectRotationRow = new Interface.Panel();
	var objectRotationX = new Interface.Number().setWidth( '50px' ).onChange( update );
	var objectRotationY = new Interface.Number().setWidth( '50px' ).onChange( update );
	var objectRotationZ = new Interface.Number().setWidth( '50px' ).onChange( update );

	objectRotationRow.add( new Interface.Text( 'Rotation' ).setWidth( '100%' ) );
	objectRotationRow.add( objectRotationX, objectRotationY, objectRotationZ );

	container.add( objectRotationRow );

	// scale

	var objectScaleRow = new Interface.Panel();
	//var objectScaleLock = new Interface.Checkbox().setPosition( 'absolute' ).setLeft( '75px' );
	var objectScaleX = new Interface.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleX );
	var objectScaleY = new Interface.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleY );
	var objectScaleZ = new Interface.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleZ );

	objectScaleRow.add( new Interface.Text( 'Scale' ).setWidth( '100%' ) );
	//objectScaleRow.add( objectScaleLock );
	objectScaleRow.add( objectScaleX, objectScaleY, objectScaleZ );

	container.add( objectScaleRow );

	// fov

	var objectFovRow = new Interface.Panel();
	var objectFov = new Interface.Number().onChange( update );

	objectFovRow.add( new Interface.Text( 'Fov' ).setWidth( '90px' ) );
	objectFovRow.add( objectFov );

	container.add( objectFovRow );

	// near

	var objectNearRow = new Interface.Panel();
	var objectNear = new Interface.Number().onChange( update );

	objectNearRow.add( new Interface.Text( 'Near' ).setWidth( '90px' ) );
	objectNearRow.add( objectNear );

	container.add( objectNearRow );

	// far

	var objectFarRow = new Interface.Panel();
	var objectFar = new Interface.Number().onChange( update );

	objectFarRow.add( new Interface.Text( 'Far' ).setWidth( '90px' ) );
	objectFarRow.add( objectFar );

	container.add( objectFarRow );

	// intensity

	var objectIntensityRow = new Interface.Panel();
	var objectIntensity = new Interface.Number().setRange( 0, Infinity ).onChange( update );

	objectIntensityRow.add( new Interface.Text( 'Intensity' ).setWidth( '90px' ) );
	objectIntensityRow.add( objectIntensity );

	container.add( objectIntensityRow );

	// color

	var objectColorRow = new Interface.Panel();
	var objectColor = new Interface.Color().onChange( update );

	objectColorRow.add( new Interface.Text( 'Color' ).setWidth( '90px' ) );
	objectColorRow.add( objectColor );

	container.add( objectColorRow );

	// ground color

	/*var objectGroundColorRow = new Interface.Panel();
	var objectGroundColor = new Interface.Color().onChange( update );

	objectGroundColorRow.add( new Interface.Text( 'Ground color' ).setWidth( '90px' ) );
	objectGroundColorRow.add( objectGroundColor );

	container.add( objectGroundColorRow );

	// distance

	var objectDistanceRow = new Interface.Panel();
	var objectDistance = new Interface.Number().setRange( 0, Infinity ).onChange( update );

	objectDistanceRow.add( new Interface.Text( 'Distance' ).setWidth( '90px' ) );
	objectDistanceRow.add( objectDistance );

	container.add( objectDistanceRow );

	// angle

	var objectAngleRow = new Interface.Panel();
	var objectAngle = new Interface.Number().setPrecision( 3 ).setRange( 0, Math.PI / 2 ).onChange( update );

	objectAngleRow.add( new Interface.Text( 'Angle' ).setWidth( '90px' ) );
	objectAngleRow.add( objectAngle );

	container.add( objectAngleRow );

	// exponent

	var objectExponentRow = new Interface.Panel();
	var objectExponent = new Interface.Number().setRange( 0, Infinity ).onChange( update );

	objectExponentRow.add( new Interface.Text( 'Exponent' ).setWidth( '90px' ) );
	objectExponentRow.add( objectExponent );

	container.add( objectExponentRow );

	// decay

	var objectDecayRow = new Interface.Panel();
	var objectDecay = new Interface.Number().setRange( 0, Infinity ).onChange( update );

	objectDecayRow.add( new Interface.Text( 'Decay' ).setWidth( '90px' ) );
	objectDecayRow.add( objectDecay );

	container.add( objectDecayRow );

	// visible

	var objectVisibleRow = new Interface.Panel();
	var objectVisible = new Interface.Checkbox().onChange( update );

	objectVisibleRow.add( new Interface.Text( 'Visible' ).setWidth( '90px' ) );
	objectVisibleRow.add( objectVisible );

	container.add( objectVisibleRow );*/

	// user data

	/*var timeout;

	var objectUserDataRow = new Interface.Panel();
	var objectUserData = new Interface.TextArea().setWidth( '150px' ).setHeight( '40px' ).setFontSize( '12px' ).onChange( update );
	objectUserData.onKeyUp( function () {

		try {

			JSON.parse( objectUserData.getValue() );

			objectUserData.dom.classList.add( 'success' );
			objectUserData.dom.classList.remove( 'fail' );

		} catch ( error ) {

			objectUserData.dom.classList.remove( 'success' );
			objectUserData.dom.classList.add( 'fail' );

		}

	} );

	objectUserDataRow.add( new Interface.Text( 'User data' ).setWidth( '90px' ) );
	objectUserDataRow.add( objectUserData );

	container.add( objectUserDataRow );*/


	//

	function updateScaleX() {

		var object = editor.selected;

		/*if ( objectScaleLock.getValue() === true ) {

			var scale = objectScaleX.getValue() / object.scale.x;

			objectScaleY.setValue( objectScaleY.getValue() * scale );
			objectScaleZ.setValue( objectScaleZ.getValue() * scale );

		}*/

		update();

	}

	function updateScaleY() {

		var object = editor.selected;

		/*if ( objectScaleLock.getValue() === true ) {

			var scale = objectScaleY.getValue() / object.scale.y;

			objectScaleX.setValue( objectScaleX.getValue() * scale );
			objectScaleZ.setValue( objectScaleZ.getValue() * scale );

		}*/

		update();

	}

	function updateScaleZ() {

		var object = editor.selected;

		/*if ( objectScaleLock.getValue() === true ) {

			var scale = objectScaleZ.getValue() / object.scale.z;

			objectScaleX.setValue( objectScaleX.getValue() * scale );
			objectScaleY.setValue( objectScaleY.getValue() * scale );

		}*/

		update();

	}

	function update() {

		var object = editor.selected;

		if ( object !== null ) {

			if ( object.parent !== undefined ) {

				var newParentId = parseInt( objectParent.getValue() );

				if ( object.parent.id !== newParentId && object.id !== newParentId ) {

					editor.moveObject( object, editor.scene.getObjectById( newParentId ) );

				}

			}

			object.position.x = objectPositionX.getValue();
			object.position.y = objectPositionY.getValue();
			object.position.z = objectPositionZ.getValue();

			object.rotation.x = objectRotationX.getValue();
			object.rotation.y = objectRotationY.getValue();
			object.rotation.z = objectRotationZ.getValue();

			object.scale.x = objectScaleX.getValue();
			object.scale.y = objectScaleY.getValue();
			object.scale.z = objectScaleZ.getValue();

			if ( object.fov !== undefined ) {

				object.fov = objectFov.getValue();
				object.updateProjectionMatrix();

			}

			if ( object.near !== undefined ) {

				object.near = objectNear.getValue();

			}

			if ( object.far !== undefined ) {

				object.far = objectFar.getValue();

			}

			if ( object.intensity !== undefined ) {

				object.intensity = objectIntensity.getValue();

			}

			if ( object.color !== undefined ) {

				object.color.setHex( objectColor.getHexValue() );

			}

			/*if ( object.groundColor !== undefined ) {

				object.groundColor.setHex( objectGroundColor.getHexValue() );

			}

			if ( object.distance !== undefined ) {

				object.distance = objectDistance.getValue();

			}

			if ( object.angle !== undefined ) {

				object.angle = objectAngle.getValue();

			}

			if ( object.exponent !== undefined ) {

				object.exponent = objectExponent.getValue();

			}

			if ( object.decay !== undefined ) {

				object.decay = objectDecay.getValue();

			}

			object.visible = objectVisible.getValue();*/

			/*try {

				object.userData = JSON.parse( objectUserData.getValue() );

			} catch ( exception ) {

				console.warn( exception );

			}*/

			signals.objectChanged.dispatch( object );

		}

	}

	function updateRows( object ) {

		var properties = {
			'parent': objectParentRow,
			'fov': objectFovRow,
			'near': objectNearRow,
			'far': objectFarRow,
			'intensity': objectIntensityRow,
			'color': objectColorRow/*,
			'groundColor': objectGroundColorRow,
			'distance' : objectDistanceRow,
			'angle' : objectAngleRow,
			'exponent' : objectExponentRow,
			'decay' : objectDecayRow*/
		};

		for ( var property in properties ) {

			properties[ property ].setDisplay( object[ property ] !== undefined ? '' : 'none' );

		}

	}

	function updateTransformRows( object ) {

		if ( object instanceof THREE.Light ||
		   ( object instanceof THREE.Object3D && object.userData.targetInverse ) ) {

			objectRotationRow.setDisplay( 'none' );
			objectScaleRow.setDisplay( 'none' );

		} else {

			objectRotationRow.setDisplay( '' );
			objectScaleRow.setDisplay( '' );

		}

	}

	// events

	signals.objectSelected.add( function ( object ) {

		if ( object !== null ) {

			container.setDisplay( 'block' );

			updateRows( object );
			updateUI( object );

		} else {

			container.setDisplay( 'none' );

		}

	} );

	signals.sceneGraphChanged.add( function () {

		var scene = editor.scene;
		var options = {};

		scene.traverse( function ( object ) {

			options[ object.id ] = object.name;

		} );

		objectParent.setOptions( options );

	} );

	signals.objectChanged.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	function updateUI( object ) {

		objectType.setValue( object.type );

		objectUUID.setValue( object.uuid );
		objectName.setValue( object.name );

		if ( object.parent !== undefined ) {

			objectParent.setValue( object.parent.id );

		}

		objectPositionX.setValue( object.position.x );
		objectPositionY.setValue( object.position.y );
		objectPositionZ.setValue( object.position.z );

		objectRotationX.setValue( object.rotation.x );
		objectRotationY.setValue( object.rotation.y );
		objectRotationZ.setValue( object.rotation.z );

		objectScaleX.setValue( object.scale.x );
		objectScaleY.setValue( object.scale.y );
		objectScaleZ.setValue( object.scale.z );

		if ( object.fov !== undefined ) {

			objectFov.setValue( object.fov );

		}

		if ( object.near !== undefined ) {

			objectNear.setValue( object.near );

		}

		if ( object.far !== undefined ) {

			objectFar.setValue( object.far );

		}

		if ( object.intensity !== undefined ) {

			objectIntensity.setValue( object.intensity );

		}

		if ( object.color !== undefined ) {

			objectColor.setHexValue( object.color.getHexString() );

		}

		if ( object.groundColor !== undefined ) {

			objectGroundColor.setHexValue( object.groundColor.getHexString() );

		}

		if ( object.distance !== undefined ) {

			objectDistance.setValue( object.distance );

		}

		if ( object.angle !== undefined ) {

			objectAngle.setValue( object.angle );

		}

		if ( object.exponent !== undefined ) {

			objectExponent.setValue( object.exponent );

		}

		if ( object.decay !== undefined ) {

			objectDecay.setValue( object.decay );

		}

		//objectVisible.setValue( object.visible );

		/*try {

			objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );

		} catch ( error ) {

			console.log( error );

		}*/

		//objectUserData.setBorderColor( 'transparent' );
		//objectUserData.setBackgroundColor( '' );

		updateTransformRows( object );

	}

	return container;

}
