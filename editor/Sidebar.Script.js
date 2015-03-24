/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Script = function ( editor ) {

	var signals = editor.signals;

	var container = new Interface.CollapsiblePanel();
	container.setCollapsed( editor.config.getKey( 'ui/sidebar/script/collapsed' ) );
	container.onCollapsedChange( function ( boolean ) {

		editor.config.setKey( 'ui/sidebar/script/collapsed', boolean );

	} );
	container.setDisplay( 'none' );

	container.addStatic( new Interface.Text( 'Script' ).setTextTransform( 'uppercase' ) );
	container.add( new Interface.Break() );

	//

	var scriptsContainer = new Interface.Panel();
	container.add( scriptsContainer );

	var newScript = new Interface.Button( 'New' );
	newScript.onClick( function () {

		var script = { name: '', source: 'function update( event ) {}' };
		editor.addScript( editor.selected, script );

	} );
	container.add( newScript );

	/*
	var loadScript = new Interface.Button( 'Load' );
	loadScript.setMarginLeft( '4px' );
	container.add( loadScript );
	*/

	//

	function update() {

		scriptsContainer.clear();

		var object = editor.selected;
		var scripts = editor.scripts[ object.uuid ];

		if ( scripts !== undefined ) {

			for ( var i = 0; i < scripts.length; i ++ ) {

				( function ( object, script ) {

					var name = new Interface.Input( script.name ).setWidth( '130px' ).setFontSize( '12px' );
					name.onChange( function () {

						script.name = this.getValue();

						signals.scriptChanged.dispatch();

					} );
					scriptsContainer.add( name );

					var edit = new Interface.Button( 'Edit' );
					edit.setMarginLeft( '4px' );
					edit.onClick( function () {

						signals.editScript.dispatch( object, script );

					} );
					scriptsContainer.add( edit );

					var remove = new Interface.Button( 'Remove' );
					remove.setMarginLeft( '4px' );
					remove.onClick( function () {

						if ( confirm( 'Are you sure?' ) ) {

							editor.removeScript( editor.selected, script );

						}

					} );
					scriptsContainer.add( remove );

					scriptsContainer.add( new Interface.Break() );

				} )( object, scripts[ i ] )

			}

		}

	}

	// signals

	signals.objectSelected.add( function ( object ) {

		if ( object !== null ) {

			container.setDisplay( 'block' );

			update();

		} else {

			container.setDisplay( 'none' );

		}

	} );

	signals.scriptAdded.add( update );
	signals.scriptRemoved.add( update );

	return container;

};
