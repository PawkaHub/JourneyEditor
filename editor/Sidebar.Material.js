/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Material = function ( editor ) {

	var signals = editor.signals;

	var materialClasses = {

		/*'LineBasicMaterial': THREE.LineBasicMaterial,
		'LineDashedMaterial': THREE.LineDashedMaterial,
		'MeshBasicMaterial': THREE.MeshBasicMaterial,
		'MeshDepthMaterial': THREE.MeshDepthMaterial,
		'MeshFaceMaterial': THREE.MeshFaceMaterial,
		'MeshLambertMaterial': THREE.MeshLambertMaterial,
		'MeshNormalMaterial': THREE.MeshNormalMaterial,*/
		'MeshPhongMaterial': THREE.MeshPhongMaterial/*,
		'PointCloudMaterial': THREE.PointCloudMaterial,
		'ShaderMaterial': THREE.ShaderMaterial,
		'SpriteMaterial': THREE.SpriteMaterial,
		'SpriteCanvasMaterial': THREE.SpriteCanvasMaterial,
		'Material': THREE.Material*/

	};

	var container = new Interface.CollapsiblePanel();
	container.setCollapsed( editor.config.getKey( 'ui/sidebar/material/collapsed' ) );
	container.onCollapsedChange( function ( boolean ) {

		editor.config.setKey( 'ui/sidebar/material/collapsed', boolean );

	} );
	container.setDisplay( 'none' );
	container.dom.classList.add( 'Material' );

	//container.addStatic( new Interface.Text().setValue( 'Color' ) );
	//container.add( new Interface.Break() );

	// uuid

	//var materialUUIDRow = new Interface.Panel();
	var materialUUID = new Interface.Input().setWidth( '115px' ).setFontSize( '12px' ).setDisabled( true );
	/*var materialUUIDRenew = new Interface.Button( '⟳' ).setMarginLeft( '7px' ).onClick( function () {

		materialUUID.setValue( THREE.Math.generateUUID() );
		update();

	} );*/

	//materialUUIDRow.add( new Interface.Text( 'UUID' ).setWidth( '90px' ) );
	//materialUUIDRow.add( materialUUID );
	//materialUUIDRow.add( materialUUIDRenew );

	//container.add( materialUUIDRow );

	// name

	/*var materialNameRow = new Interface.Panel();
	var materialName = new Interface.Input().onChange( function () {

		editor.setMaterialName( editor.selected.material, materialName.getValue() );

	} );

	materialNameRow.add( new Interface.Text( 'Name' ).setWidth( '90px' ) );
	materialNameRow.add( materialName );*/

	//container.add( materialNameRow );

	// class

	/*var materialClassRow = new Interface.Panel();
	var materialClass = new Interface.Select().setOptions( {

		'LineBasicMaterial': 'LineBasicMaterial',
		'LineDashedMaterial': 'LineDashedMaterial',
		'MeshBasicMaterial': 'MeshBasicMaterial',
		'MeshDepthMaterial': 'MeshDepthMaterial',
		'MeshFaceMaterial': 'MeshFaceMaterial',
		'MeshLambertMaterial': 'MeshLambertMaterial',
		'MeshNormalMaterial': 'MeshNormalMaterial',
		'MeshPhongMaterial': 'MeshPhongMaterial',
		'ShaderMaterial': 'ShaderMaterial',
		'SpriteMaterial': 'SpriteMaterial'

	} ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	materialClassRow.add( new Interface.Text( 'Type' ).setWidth( '90px' ) );
	materialClassRow.add( materialClass );*/

	//container.add( materialClassRow );

	// color

	var materialColorRow = new Interface.Panel();
	var materialColor = new Interface.Color().onChange( update );

	//materialColorRow.add( new Interface.Text( 'Color' ).setWidth( '90px' ) );
	materialColorRow.add( materialColor );

	container.add( materialColorRow );

	// emissive

	/*var materialEmissiveRow = new Interface.Panel();
	var materialEmissive = new Interface.Color().setHexValue( 0x000000 ).onChange( update );

	materialEmissiveRow.add( new Interface.Text( 'Emissive' ).setWidth( '90px' ) );
	materialEmissiveRow.add( materialEmissive );

	container.add( materialEmissiveRow );

	// specular

	var materialSpecularRow = new Interface.Panel();
	var materialSpecular = new Interface.Color().setHexValue( 0x111111 ).onChange( update );

	materialSpecularRow.add( new Interface.Text( 'Specular' ).setWidth( '90px' ) );
	materialSpecularRow.add( materialSpecular );

	container.add( materialSpecularRow );

	// shininess

	var materialShininessRow = new Interface.Panel();
	var materialShininess = new Interface.Number( 30 ).onChange( update );

	materialShininessRow.add( new Interface.Text( 'Shininess' ).setWidth( '90px' ) );
	materialShininessRow.add( materialShininess );

	container.add( materialShininessRow );

	// uniforms

	var materialUniformsRow = new Interface.Panel();
	var materialUniforms = new Interface.TextArea().setWidth( '150px' ).setHeight( '80px' );
	materialUniforms.setValue( '{\n  "uColor": {\n    "type": "3f",\n    "value": [1, 0, 0]\n  }\n}' ).onChange( update );

	materialUniformsRow.add( new Interface.Text( 'Uniforms' ).setWidth( '90px' ) );
	materialUniformsRow.add( materialUniforms );

	container.add( materialUniformsRow );

	// vertex shader

	var materialVertexShaderRow = new Interface.Panel();
	var materialVertexShader = new Interface.TextArea().setWidth( '150px' ).setHeight( '80px' );
	materialVertexShader.setValue( 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}' ).onChange( update );

	materialVertexShaderRow.add( new Interface.Text( 'Vertex Shader' ).setWidth( '90px' ) );
	materialVertexShaderRow.add( materialVertexShader );

	container.add( materialVertexShaderRow );

	// fragment shader

	var materialFragmentShaderRow = new Interface.Panel();
	var materialFragmentShader = new Interface.TextArea().setWidth( '150px' ).setHeight( '80px' );
	materialFragmentShader.setValue( 'uniform vec3 uColor;\n\nvoid main() {\n\tgl_FragColor = vec4( uColor, 1.0 );\n}' ).onChange( update );

	materialFragmentShaderRow.add( new Interface.Text( 'Fragment Shader' ).setWidth( '90px' ) );
	materialFragmentShaderRow.add( materialFragmentShader );

	container.add( materialFragmentShaderRow );

	// vertex colors

	var materialVertexColorsRow = new Interface.Panel();
	var materialVertexColors = new Interface.Select().setOptions( {

		0: 'No',
		1: 'Face',
		2: 'Vertex'

	} ).onChange( update );

	materialVertexColorsRow.add( new Interface.Text( 'Vertex Colors' ).setWidth( '90px' ) );
	materialVertexColorsRow.add( materialVertexColors );

	container.add( materialVertexColorsRow );

	// skinning

	var materialSkinningRow = new Interface.Panel();
	var materialSkinning = new Interface.Checkbox( false ).onChange( update );

	materialSkinningRow.add( new Interface.Text( 'Skinning' ).setWidth( '90px' ) );
	materialSkinningRow.add( materialSkinning );

	container.add( materialSkinningRow );

	// map

	var materialMapRow = new Interface.Panel();
	var materialMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialMap = new Interface.Texture().onChange( update );

	materialMapRow.add( new Interface.Text( 'Map' ).setWidth( '90px' ) );
	materialMapRow.add( materialMapEnabled );
	materialMapRow.add( materialMap );

	container.add( materialMapRow );

	// alpha map

	var materialAlphaMapRow = new Interface.Panel();
	var materialAlphaMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialAlphaMap = new Interface.Texture().onChange( update );

	materialAlphaMapRow.add( new Interface.Text( 'Alpha Map' ).setWidth( '90px' ) );
	materialAlphaMapRow.add( materialAlphaMapEnabled );
	materialAlphaMapRow.add( materialAlphaMap );

	container.add( materialAlphaMapRow );

	// light map

	var materialLightMapRow = new Interface.Panel();
	var materialLightMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialLightMap = new Interface.Texture().onChange( update );

	materialLightMapRow.add( new Interface.Text( 'Light Map' ).setWidth( '90px' ) );
	materialLightMapRow.add( materialLightMapEnabled );
	materialLightMapRow.add( materialLightMap );

	container.add( materialLightMapRow );

	// bump map

	var materialBumpMapRow = new Interface.Panel();
	var materialBumpMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialBumpMap = new Interface.Texture().onChange( update );
	var materialBumpScale = new Interface.Number( 1 ).setWidth( '30px' ).onChange( update );

	materialBumpMapRow.add( new Interface.Text( 'Bump Map' ).setWidth( '90px' ) );
	materialBumpMapRow.add( materialBumpMapEnabled );
	materialBumpMapRow.add( materialBumpMap );
	materialBumpMapRow.add( materialBumpScale );

	container.add( materialBumpMapRow );

	// normal map

	var materialNormalMapRow = new Interface.Panel();
	var materialNormalMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialNormalMap = new Interface.Texture().onChange( update );

	materialNormalMapRow.add( new Interface.Text( 'Normal Map' ).setWidth( '90px' ) );
	materialNormalMapRow.add( materialNormalMapEnabled );
	materialNormalMapRow.add( materialNormalMap );

	container.add( materialNormalMapRow );

	// specular map

	var materialSpecularMapRow = new Interface.Panel();
	var materialSpecularMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialSpecularMap = new Interface.Texture().onChange( update );

	materialSpecularMapRow.add( new Interface.Text( 'Specular Map' ).setWidth( '90px' ) );
	materialSpecularMapRow.add( materialSpecularMapEnabled );
	materialSpecularMapRow.add( materialSpecularMap );

	container.add( materialSpecularMapRow );

	// env map

	var materialEnvMapRow = new Interface.Panel();
	var materialEnvMapEnabled = new Interface.Checkbox( false ).onChange( update );
	var materialEnvMap = new Interface.Texture( THREE.SphericalReflectionMapping ).onChange( update );
	var materialReflectivity = new Interface.Number( 1 ).setWidth( '30px' ).onChange( update );

	materialEnvMapRow.add( new Interface.Text( 'Env Map' ).setWidth( '90px' ) );
	materialEnvMapRow.add( materialEnvMapEnabled );
	materialEnvMapRow.add( materialEnvMap );
	materialEnvMapRow.add( materialReflectivity );

	container.add( materialEnvMapRow );

	// side

	var materialSideRow = new Interface.Panel();
	var materialSide = new Interface.Select().setOptions( {

		0: 'Front',
		1: 'Back',
		2: 'Double'

	} ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	materialSideRow.add( new Interface.Text( 'Side' ).setWidth( '90px' ) );
	materialSideRow.add( materialSide );

	container.add( materialSideRow );

	// shading

	var materialShadingRow = new Interface.Panel();
	var materialShading = new Interface.Select().setOptions( {

		0: 'No',
		1: 'Flat',
		2: 'Smooth'

	} ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	materialShadingRow.add( new Interface.Text( 'Shading' ).setWidth( '90px' ) );
	materialShadingRow.add( materialShading );

	container.add( materialShadingRow );

	// blending

	var materialBlendingRow = new Interface.Panel();
	var materialBlending = new Interface.Select().setOptions( {

		0: 'No',
		1: 'Normal',
		2: 'Additive',
		3: 'Subtractive',
		4: 'Multiply',
		5: 'Custom'

	} ).setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	materialBlendingRow.add( new Interface.Text( 'Blending' ).setWidth( '90px' ) );
	materialBlendingRow.add( materialBlending );

	container.add( materialBlendingRow );

	// opacity

	var materialOpacityRow = new Interface.Panel();
	var materialOpacity = new Interface.Number().setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

	materialOpacityRow.add( new Interface.Text( 'Opacity' ).setWidth( '90px' ) );
	materialOpacityRow.add( materialOpacity );

	container.add( materialOpacityRow );

	// transparent

	var materialTransparentRow = new Interface.Panel();
	var materialTransparent = new Interface.Checkbox().setLeft( '100px' ).onChange( update );

	materialTransparentRow.add( new Interface.Text( 'Transparent' ).setWidth( '90px' ) );
	materialTransparentRow.add( materialTransparent );

	container.add( materialTransparentRow );*/

	// wireframe

	/*var materialWireframeRow = new Interface.Panel();
	var materialWireframe = new Interface.Checkbox( false ).onChange( update );
	var materialWireframeLinewidth = new Interface.Number( 1 ).setWidth( '60px' ).setRange( 0, 100 ).onChange( update );

	materialWireframeRow.add( new Interface.Text( 'Wireframe' ).setWidth( '90px' ) );
	materialWireframeRow.add( materialWireframe );
	//materialWireframeRow.add( materialWireframeLinewidth );

	container.add( materialWireframeRow );*/

	//

	function update() {

		var object = editor.selected;

		var geometry = object.geometry;
		var material = object.material;

		var textureWarning = false;
		var objectHasUvs = false;

		if ( object instanceof THREE.Sprite ) objectHasUvs = true;
		if ( geometry instanceof THREE.Geometry && geometry.faceVertexUvs[ 0 ].length > 0 ) objectHasUvs = true;
		if ( geometry instanceof THREE.BufferGeometry && geometry.attributes.uv !== undefined ) objectHasUvs = true;

		if ( material ) {

			if ( material.uuid !== undefined ) {

				material.uuid = materialUUID.getValue();

			}

			/*if ( material instanceof materialClasses[ materialClass.getValue() ] === false ) {

				material = new materialClasses[ materialClass.getValue() ]();
				object.material = material;

			}*/

			if ( material.color !== undefined ) {

				material.color.setHex( materialColor.getHexValue() );

			}

			/*if ( material.emissive !== undefined ) {

				material.emissive.setHex( materialEmissive.getHexValue() );

			}

			if ( material.specular !== undefined ) {

				material.specular.setHex( materialSpecular.getHexValue() );

			}

			if ( material.shininess !== undefined ) {

				material.shininess = materialShininess.getValue();

			}

			if ( material.uniforms !== undefined ) {

				material.uniforms = JSON.parse( materialUniforms.getValue() );

			}

			if ( material.vertexShader !== undefined ) {

				material.vertexShader = materialVertexShader.getValue();

			}

			if ( material.fragmentShader !== undefined ) {

				material.fragmentShader = materialFragmentShader.getValue();

			}

			if ( material.vertexColors !== undefined ) {

				var vertexColors = parseInt( materialVertexColors.getValue() );

				if ( material.vertexColors !== vertexColors ) {

					if ( geometry instanceof THREE.Geometry ) {

						geometry.groupsNeedUpdate = true;

					}

					material.vertexColors = vertexColors;
					material.needsUpdate = true;

				}

			}

			if ( material.skinning !== undefined ) {

				material.skinning = materialSkinning.getValue();

			}

			if ( material.map !== undefined ) {

				var mapEnabled = materialMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					material.map = mapEnabled ? materialMap.getValue() : null;
					material.needsUpdate = true;

				} else {

					if ( mapEnabled ) textureWarning = true;

				}

			}

			if ( material.alphaMap !== undefined ) {

				var mapEnabled = materialAlphaMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					material.alphaMap = mapEnabled ? materialAlphaMap.getValue() : null;
					material.needsUpdate = true;

				} else {

					if ( mapEnabled ) textureWarning = true;

				}

			}


			if ( material.lightMap !== undefined ) {

				var lightMapEnabled = materialLightMapEnabled.getValue() === true;

				if ( objectHasUvs )  {

					material.lightMap = lightMapEnabled ? materialLightMap.getValue() : null;
					material.needsUpdate = true;

				} else {

					if ( lightMapEnabled ) textureWarning = true;

				}

			}


			if ( material.bumpMap !== undefined ) {

				var bumpMapEnabled = materialBumpMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					material.bumpMap = bumpMapEnabled ? materialBumpMap.getValue() : null;
					material.bumpScale = materialBumpScale.getValue();
					material.needsUpdate = true;

				} else {

					if ( bumpMapEnabled ) textureWarning = true;

				}

			}

			if ( material.normalMap !== undefined ) {

				var normalMapEnabled = materialNormalMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					material.normalMap = normalMapEnabled ? materialNormalMap.getValue() : null;
					material.needsUpdate = true;

				} else {

					if ( normalMapEnabled ) textureWarning = true;

				}

			}

			if ( material.specularMap !== undefined ) {

				var specularMapEnabled = materialSpecularMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					material.specularMap = specularMapEnabled ? materialSpecularMap.getValue() : null;
					material.needsUpdate = true;

				} else {

					if ( specularMapEnabled ) textureWarning = true;

				}

			}

			if ( material.envMap !== undefined ) {

				var envMapEnabled = materialEnvMapEnabled.getValue() === true;

				material.envMap = envMapEnabled ? materialEnvMap.getValue() : null;
				material.reflectivity = materialReflectivity.getValue();
				material.needsUpdate = true;

			}

			if ( material.side !== undefined ) {

				material.side = parseInt( materialSide.getValue() );

			}

			if ( material.shading !== undefined ) {

				material.shading = parseInt( materialShading.getValue() );

			}

			if ( material.blending !== undefined ) {

				material.blending = parseInt( materialBlending.getValue() );

			}

			if ( material.opacity !== undefined ) {

				material.opacity = materialOpacity.getValue();

			}

			if ( material.transparent !== undefined ) {

				material.transparent = materialTransparent.getValue();

			}

			if ( material.wireframe !== undefined ) {

				material.wireframe = materialWireframe.getValue();

			}

			if ( material.wireframeLinewidth !== undefined ) {

				material.wireframeLinewidth = materialWireframeLinewidth.getValue();

			}*/

			updateRows();

			signals.materialChanged.dispatch( material );

		}

		if ( textureWarning ) {

			console.warn( "Can't set texture, model doesn't have texture coordinates" );

		}

	};

	function updateRows() {

		var properties = {
			//'name': materialNameRow,
			'color': materialColorRow,
			/*'emissive': materialEmissiveRow,
			'specular': materialSpecularRow,
			'shininess': materialShininessRow,
			'uniforms': materialUniformsRow,
			'vertexShader': materialVertexShaderRow,
			'fragmentShader': materialFragmentShaderRow,
			'vertexColors': materialVertexColorsRow,
			'skinning': materialSkinningRow,
			'map': materialMapRow,
			'alphaMap': materialAlphaMapRow,
			'lightMap': materialLightMapRow,
			'bumpMap': materialBumpMapRow,
			'normalMap': materialNormalMapRow,
			'specularMap': materialSpecularMapRow,
			'envMap': materialEnvMapRow,
			'side': materialSideRow,
			'shading': materialShadingRow,
			'blending': materialBlendingRow,
			'opacity': materialOpacityRow,
			'transparent': materialTransparentRow,
			'wireframe': materialWireframeRow*/
		};

		var material = editor.selected.material;

		for ( var property in properties ) {

			properties[ property ].setDisplay( material[ property ] !== undefined ? '' : 'none' );

		}

	};

	// events

	signals.objectSelected.add( function ( object ) {

		if ( object && object.material ) {

			container.setDisplay( '' );

			var material = object.material;

			if ( material.uuid !== undefined ) {

				materialUUID.setValue( material.uuid );

			}

			/*if ( material.name !== undefined ) {

				materialName.setValue( material.name );

			}

			materialClass.setValue( material.type );*/

			if ( material.color !== undefined ) {

				materialColor.setHexValue( material.color.getHexString() );

			}

			/*if ( material.emissive !== undefined ) {

				materialEmissive.setHexValue( material.emissive.getHexString() );

			}

			if ( material.specular !== undefined ) {

				materialSpecular.setHexValue( material.specular.getHexString() );

			}

			if ( material.shininess !== undefined ) {

				materialShininess.setValue( material.shininess );

			}

			if ( material.uniforms !== undefined ) {

				materialUniforms.setValue( JSON.stringify( material.uniforms, null, '  ' ) );

			}

			if ( material.vertexShader !== undefined ) {

				materialVertexShader.setValue( material.vertexShader );

			}

			if ( material.fragmentShader !== undefined ) {

				materialFragmentShader.setValue( material.fragmentShader );

			}

			if ( material.vertexColors !== undefined ) {

				materialVertexColors.setValue( material.vertexColors );

			}

			if ( material.skinning !== undefined ) {

				materialSkinning.setValue( material.skinning );

			}

			if ( material.map !== undefined ) {

				materialMapEnabled.setValue( material.map !== null );
				materialMap.setValue( material.map );

			}

			if ( material.alphaMap !== undefined ) {

				materialAlphaMapEnabled.setValue( material.alphaMap !== null );
				materialAlphaMap.setValue( material.alphaMap );

			}

			if ( material.lightMap !== undefined ) {

				materialLightMapEnabled.setValue( material.lightMap !== null );
				materialLightMap.setValue( material.lightMap );

			}


			if ( material.bumpMap !== undefined ) {

				materialBumpMapEnabled.setValue( material.bumpMap !== null );
				materialBumpMap.setValue( material.bumpMap );
				materialBumpScale.setValue( material.bumpScale );

			}

			if ( material.normalMap !== undefined ) {

				materialNormalMapEnabled.setValue( material.normalMap !== null );
				materialNormalMap.setValue( material.normalMap );

			}

			if ( material.specularMap !== undefined ) {

				materialSpecularMapEnabled.setValue( material.specularMap !== null );
				materialSpecularMap.setValue( material.specularMap );

			}

			if ( material.envMap !== undefined ) {

				materialEnvMapEnabled.setValue( material.envMap !== null );
				materialEnvMap.setValue( material.envMap );
				materialReflectivity.setValue( material.reflectivity );

			}

			if ( material.side !== undefined ) {

				materialSide.setValue( material.side );

			}

			if ( material.shading !== undefined ) {

				materialShading.setValue( material.shading );

			}

			if ( material.blending !== undefined ) {

				materialBlending.setValue( material.blending );

			}

			if ( material.opacity !== undefined ) {

				materialOpacity.setValue( material.opacity );

			}

			if ( material.transparent !== undefined ) {

				materialTransparent.setValue( material.transparent );

			}

			if ( material.wireframe !== undefined ) {

				materialWireframe.setValue( material.wireframe );

			}

			if ( material.wireframeLinewidth !== undefined ) {

				materialWireframeLinewidth.setValue( material.wireframeLinewidth );

			}*/

			updateRows();

		} else {

			container.setDisplay( 'none' );

		}

	} );

	return container;

}
