/**
 * @author mrdoob / http://mrdoob.com/
 */

window.Interface = {};

Interface.Element = function ( dom ) {

	this.dom = dom;

};

Interface.Element.prototype = {

	setId: function ( id ) {

		this.dom.id = id;

		return this;

	},

	setClass: function ( name ) {

		this.dom.className = name;

		return this;

	},

	setStyle: function ( style, array ) {

		for ( var i = 0; i < array.length; i ++ ) {

			this.dom.style[ style ] = array[ i ];

		}

	},

	setDisabled: function ( value ) {

		this.dom.disabled = value;

		return this;

	},

	setTextContent: function ( value ) {

		this.dom.textContent = value;

		return this;

	}

}

// properties

var properties = [ 'position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border', 'borderLeft',
'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'color',
'backgroundColor', 'opacity', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'textTransform', 'cursor', 'zIndex' ];

properties.forEach( function ( property ) {

	var method = 'set' + property.substr( 0, 1 ).toUpperCase() + property.substr( 1, property.length );

	Interface.Element.prototype[ method ] = function () {

		this.setStyle( property, arguments );
		return this;

	};

} );

// events

var events = [ 'KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DblClick', 'Change' ];

events.forEach( function ( event ) {

	var method = 'on' + event;

	Interface.Element.prototype[ method ] = function ( callback ) {

		this.dom.addEventListener( event.toLowerCase(), callback.bind( this ), false );

		return this;

	};

} );


// Panel

Interface.Panel = function () {

	Interface.Element.call( this );

	var dom = document.createElement( 'div' );
	dom.className = 'Panel';

	this.dom = dom;

	return this;
};

Interface.Panel.prototype = Object.create( Interface.Element.prototype );
Interface.Panel.prototype.constructor = Interface.Panel;

Interface.Panel.prototype.add = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		var argument = arguments[ i ];

		if ( argument instanceof Interface.Element ) {

			this.dom.appendChild( argument.dom );

		} else {

			console.error( 'Interface.Panel:', argument, 'is not an instance of Interface.Element.' )

		}

	}

	return this;

};


Interface.Panel.prototype.remove = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		var argument = arguments[ i ];

		if ( argument instanceof Interface.Element ) {

			this.dom.removeChild( argument.dom );

		} else {

			console.error( 'Interface.Panel:', argument, 'is not an instance of Interface.Element.' )

		}

	}

	return this;

};

Interface.Panel.prototype.clear = function () {

	while ( this.dom.children.length ) {

		this.dom.removeChild( this.dom.lastChild );

	}

};


// Collapsible Panel

Interface.CollapsiblePanel = function () {

	Interface.Panel.call( this );

	this.setClass( 'Panel Collapsible' );

	var scope = this;

	this.static = new Interface.Panel();
	this.static.setClass( 'Static' );
	/*this.static.onClick( function () {
		scope.toggle();
	} );*/
	this.dom.appendChild( this.static.dom );

	this.contents = new Interface.Panel();
	this.contents.setClass( 'Content' );
	this.dom.appendChild( this.contents.dom );

	/*var button = new Interface.Panel();
	button.setClass( 'Button' );
	this.static.add( button );*/

	this.isCollapsed = false;

	return this;

};

Interface.CollapsiblePanel.prototype = Object.create( Interface.Panel.prototype );
Interface.CollapsiblePanel.prototype.constructor = Interface.CollapsiblePanel;

Interface.CollapsiblePanel.prototype.addStatic = function () {

	this.static.add.apply( this.static, arguments );
	return this;

};

Interface.CollapsiblePanel.prototype.removeStatic = function () {

	this.static.remove.apply( this.static, arguments );
	return this;

};

Interface.CollapsiblePanel.prototype.clearStatic = function () {

	this.static.clear();
	return this;

};

Interface.CollapsiblePanel.prototype.add = function () {

	this.contents.add.apply( this.contents, arguments );
	return this;

};

Interface.CollapsiblePanel.prototype.remove = function () {

	this.contents.remove.apply( this.contents, arguments );
	return this;

};

Interface.CollapsiblePanel.prototype.clear = function () {

	this.contents.clear();
	return this;

};

Interface.CollapsiblePanel.prototype.toggle = function() {

	this.setCollapsed( !this.isCollapsed );

};

Interface.CollapsiblePanel.prototype.collapse = function() {

	this.setCollapsed( true );

};

Interface.CollapsiblePanel.prototype.expand = function() {

	this.setCollapsed( false );

};

Interface.CollapsiblePanel.prototype.setCollapsed = function( boolean ) {

	if ( boolean ) {

		this.dom.classList.add( 'collapsed' );

	} else {

		this.dom.classList.remove( 'collapsed' );

	}

	this.isCollapsed = boolean;

	if ( this.onCollapsedChangeCallback !== undefined ) {

		this.onCollapsedChangeCallback( boolean );

	}

};

Interface.CollapsiblePanel.prototype.onCollapsedChange = function ( callback ) {

	this.onCollapsedChangeCallback = callback;

};

// Text

Interface.Text = function ( text ) {

	Interface.Element.call( this );

	var dom = document.createElement( 'span' );
	dom.className = 'Text';
	dom.style.cursor = 'default';
	dom.style.display = 'inline-block';
	dom.style.verticalAlign = 'middle';

	this.dom = dom;
	this.setValue( text );

	return this;

};

Interface.Text.prototype = Object.create( Interface.Element.prototype );
Interface.Text.prototype.constructor = Interface.Text;

Interface.Text.prototype.getValue = function () {

	return this.dom.textContent;

};

Interface.Text.prototype.setValue = function ( value ) {

	if ( value !== undefined ) {

		this.dom.textContent = value;

	}

	return this;

};


// Input

Interface.Input = function ( text ) {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'Input' );
	dom.className = 'Input';
	dom.style.height = '24px';
	dom.style.padding = '0 5px 0 5px';
	dom.style.border = '1px solid transparent';
	dom.placeholder = 'Name';

	dom.addEventListener( 'keydown', function ( event ) {

		event.stopPropagation();

	}, false );

	this.dom = dom;
	this.setValue( text );

	return this;

};

Interface.Input.prototype = Object.create( Interface.Element.prototype );
Interface.Input.prototype.constructor = Interface.Input;

Interface.Input.prototype.getValue = function () {

	return this.dom.value;

};

Interface.Input.prototype.setValue = function ( value ) {

	this.dom.value = value;

	return this;

};


// TextArea

Interface.TextArea = function () {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'textarea' );
	dom.className = 'TextArea';
	dom.style.padding = '2px';
	dom.spellcheck = false;

	dom.addEventListener( 'keydown', function ( event ) {

		event.stopPropagation();

		if ( event.keyCode === 9 ) {

			event.preventDefault();

			var cursor = dom.selectionStart;

			dom.value = dom.value.substring( 0, cursor ) + '\t' + dom.value.substring( cursor );
			dom.selectionStart = cursor + 1;
			dom.selectionEnd = dom.selectionStart;

		}

	}, false );

	this.dom = dom;

	return this;

};

Interface.TextArea.prototype = Object.create( Interface.Element.prototype );
Interface.TextArea.prototype.constructor = Interface.TextArea;

Interface.TextArea.prototype.getValue = function () {

	return this.dom.value;

};

Interface.TextArea.prototype.setValue = function ( value ) {

	this.dom.value = value;

	return this;

};


// Select

Interface.Select = function () {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'select' );
	dom.className = 'Select';
	dom.style.padding = '5px';

	this.dom = dom;

	return this;

};

Interface.Select.prototype = Object.create( Interface.Element.prototype );
Interface.Select.prototype.constructor = Interface.Select;

Interface.Select.prototype.setMultiple = function ( boolean ) {

	this.dom.multiple = boolean;

	return this;

};

Interface.Select.prototype.setOptions = function ( options ) {

	var selected = this.dom.value;

	while ( this.dom.children.length > 0 ) {

		this.dom.removeChild( this.dom.firstChild );

	}

	for ( var key in options ) {

		var option = document.createElement( 'option' );
		option.value = key;
		option.innerHTML = options[ key ];
		this.dom.appendChild( option );

	}

	this.dom.value = selected;

	return this;

};

Interface.Select.prototype.getValue = function () {

	return this.dom.value;

};

Interface.Select.prototype.setValue = function ( value ) {

	value = String( value );

	if ( this.dom.value !== value ) {

		this.dom.value = value;

	}

	return this;

};

// Checkbox

Interface.Checkbox = function ( boolean ) {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'input' );
	dom.className = 'Checkbox';
	dom.type = 'checkbox';

	this.dom = dom;
	this.setValue( boolean );

	return this;

};

Interface.Checkbox.prototype = Object.create( Interface.Element.prototype );
Interface.Checkbox.prototype.constructor = Interface.Checkbox;

Interface.Checkbox.prototype.getValue = function () {

	return this.dom.checked;

};

Interface.Checkbox.prototype.setValue = function ( value ) {

	if ( value !== undefined ) {

		this.dom.checked = value;

	}

	return this;

};


// Color

Interface.Color = function () {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'input' );
	dom.className = 'Color';
	dom.style.width = '100%';
	dom.style.height = '24px';
	dom.style.border = '0px';
	dom.style.padding = '0px';
	dom.style.backgroundColor = 'transparent';

	try {

		dom.type = 'color';
		dom.value = '#ffffff';

	} catch ( exception ) {}

	this.dom = dom;

	return this;

};

Interface.Color.prototype = Object.create( Interface.Element.prototype );
Interface.Color.prototype.constructor = Interface.Color;

Interface.Color.prototype.getValue = function () {

	return this.dom.value;

};

Interface.Color.prototype.getHexValue = function () {

	return parseInt( this.dom.value.substr( 1 ), 16 );

};

Interface.Color.prototype.setValue = function ( value ) {

	this.dom.value = value;

	return this;

};

Interface.Color.prototype.setHexValue = function ( hex ) {

	this.dom.value = '#' + ( '000000' + hex.toString( 16 ) ).slice( -6 );

	return this;

};


// Number

Interface.Number = function ( number ) {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'input' );
	dom.className = 'Number';
	dom.value = '0.00';

	dom.addEventListener( 'keydown', function ( event ) {

		event.stopPropagation();

		if ( event.keyCode === 13 ) dom.blur();

	}, false );

	this.min = - Infinity;
	this.max = Infinity;

	this.precision = 2;
	this.step = 1;

	this.dom = dom;
	this.setValue( number );

	var changeEvent = document.createEvent( 'HTMLEvents' );
	changeEvent.initEvent( 'change', true, true );

	var distance = 0;
	var onMouseDownValue = 0;

	var pointer = [ 0, 0 ];
	var prevPointer = [ 0, 0 ];

	var onMouseDown = function ( event ) {

		event.preventDefault();

		distance = 0;

		onMouseDownValue = parseFloat( dom.value );

		prevPointer = [ event.clientX, event.clientY ];

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup', onMouseUp, false );

	};

	var onMouseMove = function ( event ) {

		var currentValue = dom.value;

		pointer = [ event.clientX, event.clientY ];

		distance += ( pointer[ 0 ] - prevPointer[ 0 ] ) - ( pointer[ 1 ] - prevPointer[ 1 ] );

		var number = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;

		dom.value = Math.min( scope.max, Math.max( scope.min, number ) ).toFixed( scope.precision );

		if ( currentValue !== dom.value ) dom.dispatchEvent( changeEvent );

		prevPointer = [ event.clientX, event.clientY ];

	};

	var onMouseUp = function ( event ) {

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		if ( Math.abs( distance ) < 2 ) {

			dom.focus();
			dom.select();

		}

	};

	var onChange = function ( event ) {

		var value = 0;

		try {

			value = eval( dom.value );

		} catch ( error ) {

			console.error( error.message );

		}

		dom.value = parseFloat( value );

	};

	var onFocus = function ( event ) {

		dom.style.backgroundColor = '';
		dom.style.color = 'rgba(192, 197, 206, 1)';
		dom.style.cursor = '';

	};

	var onBlur = function ( event ) {

		dom.style.backgroundColor = 'transparent';
		dom.style.color = 'rgba(192, 197, 206, 0.5)';
		dom.style.cursor = 'col-resize';

	};

	dom.addEventListener( 'mousedown', onMouseDown, false );
	dom.addEventListener( 'change', onChange, false );
	dom.addEventListener( 'focus', onFocus, false );
	dom.addEventListener( 'blur', onBlur, false );

	return this;

};

Interface.Number.prototype = Object.create( Interface.Element.prototype );
Interface.Number.prototype.constructor = Interface.Number;

Interface.Number.prototype.getValue = function () {

	return parseFloat( this.dom.value );

};

Interface.Number.prototype.setValue = function ( value ) {

	if ( value !== undefined ) {

		this.dom.value = value.toFixed( this.precision );

	}

	return this;

};

Interface.Number.prototype.setRange = function ( min, max ) {

	this.min = min;
	this.max = max;

	return this;

};

Interface.Number.prototype.setPrecision = function ( precision ) {

	this.precision = precision;

	return this;

};


// Integer

Interface.Integer = function ( number ) {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'input' );
	dom.className = 'Number';
	dom.value = '0.00';

	dom.addEventListener( 'keydown', function ( event ) {

		event.stopPropagation();

	}, false );

	this.min = - Infinity;
	this.max = Infinity;

	this.step = 1;

	this.dom = dom;
	this.setValue( number );

	var changeEvent = document.createEvent( 'HTMLEvents' );
	changeEvent.initEvent( 'change', true, true );

	var distance = 0;
	var onMouseDownValue = 0;

	var pointer = [ 0, 0 ];
	var prevPointer = [ 0, 0 ];

	var onMouseDown = function ( event ) {

		event.preventDefault();

		distance = 0;

		onMouseDownValue = parseFloat( dom.value );

		prevPointer = [ event.clientX, event.clientY ];

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup', onMouseUp, false );

	};

	var onMouseMove = function ( event ) {

		var currentValue = dom.value;

		pointer = [ event.clientX, event.clientY ];

		distance += ( pointer[ 0 ] - prevPointer[ 0 ] ) - ( pointer[ 1 ] - prevPointer[ 1 ] );

		var number = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;

		dom.value = Math.min( scope.max, Math.max( scope.min, number ) ) | 0;

		if ( currentValue !== dom.value ) dom.dispatchEvent( changeEvent );

		prevPointer = [ event.clientX, event.clientY ];

	};

	var onMouseUp = function ( event ) {

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		if ( Math.abs( distance ) < 2 ) {

			dom.focus();
			dom.select();

		}

	};

	var onChange = function ( event ) {

		var value = 0;

		try {

			value = eval( dom.value );

		} catch ( error ) {

			console.error( error.message );

		}

		dom.value = parseInt( value );

	};

	var onFocus = function ( event ) {

		dom.style.backgroundColor = '';
		dom.style.borderColor = '#ccc';
		dom.style.cursor = '';

	};

	var onBlur = function ( event ) {

		dom.style.backgroundColor = 'transparent';
		dom.style.borderColor = 'transparent';
		dom.style.cursor = 'col-resize';

	};

	dom.addEventListener( 'mousedown', onMouseDown, false );
	dom.addEventListener( 'change', onChange, false );
	dom.addEventListener( 'focus', onFocus, false );
	dom.addEventListener( 'blur', onBlur, false );

	return this;

};

Interface.Integer.prototype = Object.create( Interface.Element.prototype );
Interface.Integer.prototype.constructor = Interface.Integer;

Interface.Integer.prototype.getValue = function () {

	return parseInt( this.dom.value );

};

Interface.Integer.prototype.setValue = function ( value ) {

	if ( value !== undefined ) {

		this.dom.value = value | 0;

	}

	return this;

};

Interface.Integer.prototype.setRange = function ( min, max ) {

	this.min = min;
	this.max = max;

	return this;

};


// Break

Interface.Break = function () {

	Interface.Element.call( this );

	var dom = document.createElement( 'br' );
	dom.className = 'Break';

	this.dom = dom;

	return this;

};

Interface.Break.prototype = Object.create( Interface.Element.prototype );
Interface.Break.prototype.constructor = Interface.Break;


// HorizontalRule

Interface.HorizontalRule = function () {

	Interface.Element.call( this );

	var dom = document.createElement( 'hr' );
	dom.className = 'HorizontalRule';

	this.dom = dom;

	return this;

};

Interface.HorizontalRule.prototype = Object.create( Interface.Element.prototype );
Interface.HorizontalRule.prototype.constructor = Interface.HorizontalRule;


// Button

Interface.Button = function ( value ) {

	Interface.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'button' );
	dom.className = 'Button';

	this.dom = dom;
	this.dom.textContent = value;

	return this;

};

Interface.Button.prototype = Object.create( Interface.Element.prototype );
Interface.Button.prototype.constructor = Interface.Button;

Interface.Button.prototype.setLabel = function ( value ) {

	this.dom.textContent = value;

	return this;

};


// Dialog

Interface.Dialog = function ( value ) {

	var scope = this;

	var dom = document.createElement( 'dialog' );

	if ( dom.showModal === undefined ) {

		// fallback

		dom = document.createElement( 'div' );
		dom.style.display = 'none';

		dom.showModal = function () {

			dom.style.position = 'absolute';
			dom.style.left = '100px';
			dom.style.top = '100px';
			dom.style.zIndex = 1;
			dom.style.display = '';

		};

	}

	dom.className = 'Dialog';

	this.dom = dom;

	return this;

};

Interface.Dialog.prototype = Object.create( Interface.Panel.prototype );
Interface.Dialog.prototype.constructor = Interface.Dialog;

Interface.Dialog.prototype.showModal = function () {

	this.dom.showModal();

	return this;

};
