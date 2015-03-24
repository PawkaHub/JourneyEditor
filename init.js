// Write your package code here!
console.log('initing');
Meteor.startup(function(){
window.URL = window.URL || window.webkitURL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

Number.prototype.format = function (){
	return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

//

var editor = new Editor();
var signals = editor.signals;

var viewport = new Viewport( editor );
document.body.appendChild( viewport.dom );

var script = new Script( editor );
document.body.appendChild( script.dom );

var player = new Player( editor );
document.body.appendChild( player.dom );

/*var toolbar = new Toolbar( editor );
document.body.appendChild( toolbar.dom );*/

var menubar = new Menubar( editor );
document.body.appendChild( menubar.dom );

var sidebar = new Sidebar( editor );
document.body.appendChild( sidebar.dom );

var dialog = new Interface.Dialog();
document.body.appendChild( dialog.dom );

//

editor.setTheme( editor.config.getKey( 'theme' ) );

editor.storage.init( function () {

	editor.storage.get( function ( state ) {

		if ( state !== undefined ) {

			editor.fromJSON( state );

		}

		var selected = editor.config.getKey( 'selected' );

		if ( selected !== undefined ) {

			editor.selectByUuid( selected );

		}

	} );

	//

	var timeout;

	var saveState = function ( scene ) {

		if ( editor.config.getKey( 'autosave' ) === false ) {

			return;

		}

		clearTimeout( timeout );

		timeout = setTimeout( function () {

			editor.signals.savingStarted.dispatch();

			timeout = setTimeout( function () {

				editor.storage.set( editor.toJSON() );

				editor.signals.savingFinished.dispatch();

			}, 100 );

		}, 1000 );

	};

	signals.editorCleared.add( saveState );
	signals.geometryChanged.add( saveState );
	signals.objectAdded.add( saveState );
	signals.objectChanged.add( saveState );
	signals.objectRemoved.add( saveState );
	signals.materialChanged.add( saveState );
	signals.sceneGraphChanged.add( saveState );
	signals.scriptChanged.add( saveState );
} );

//

document.addEventListener( 'dragover', function ( event ) {

	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';

}, false );

document.addEventListener( 'drop', function ( event ) {

	event.preventDefault();

	if ( event.dataTransfer.files.length > 0 ) {

		editor.loader.loadFile( event.dataTransfer.files[ 0 ] );

	}

}, false );

var isPlaying = false;
var isSnapped = false;
var isWireframe = false;

document.addEventListener( 'keydown', function ( event ) {
	console.log('event',event.keyCode);
	switch ( event.keyCode ) {
		case 8: // prevent browser back
			event.preventDefault();
			var object = editor.selected;
			var parent = object.parent;
			editor.removeObject( object );
			editor.select( parent );
			break;
		case 80:
			if (event.ctrlKey) {
				if ( isPlaying === false ) {
					isPlaying = true;
					signals.startPlayer.dispatch();
				} else {
					isPlaying = false;
					signals.stopPlayer.dispatch();
				}
			}
			break;
		case 83:
			if (event.ctrlKey) {
				if ( isSnapped === false ) {
					isSnapped = true;
					signals.snapChanged.dispatch(25);
				} else {
					isSnapped = false;
					signals.snapChanged.dispatch(0);
				}
			}
			break;
		case 79:
			var object = editor.selected;
			if (!object) return;
			var geometry = object.geometry;
			var material = object.material;
			if (event.ctrlKey) {
				if ( material ) {
					if ( material.wireframe !== undefined ) {
						if ( isWireframe === false ) {
							isWireframe = true;
							material.wireframe = true;
						} else {
							isWireframe = false;
							material.wireframe = false;
						}
					}
					signals.materialChanged.dispatch( material );
				}
			}
			break;
		case 81:
			var object = editor.selected;
			if (!object) return;
			signals.transformModeChanged.dispatch( 'translate' );
			break;
		case 87:
			var object = editor.selected;
			if (!object) return;
			signals.transformModeChanged.dispatch( 'rotate' );
			break;
		case 69:
			var object = editor.selected;
			if (!object) return;
			signals.transformModeChanged.dispatch( 'scale' );
			break;

	}

}, false );

var onWindowResize = function ( event ) {

	editor.signals.windowResize.dispatch();

};

window.addEventListener( 'resize', onWindowResize, false );

onWindowResize();

//

var file = null;
var hash = window.location.hash;

if ( hash.substr( 1, 4 ) === 'app=' ) file = hash.substr( 5 );
if ( hash.substr( 1, 6 ) === 'scene=' ) file = hash.substr( 7 );

if ( file !== null ) {

	if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

		var loader = new THREE.XHRLoader();
		loader.crossOrigin = '';
		loader.load( file, function ( text ) {

			var json = JSON.parse( text );

			editor.clear();
			editor.fromJSON( json );

		} );

	}

}
});