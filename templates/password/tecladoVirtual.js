function getTecladoVirtual() {

	return {

		inputPass : [],
		divsAesquivar : null,
		inputSelect : null,
		cActual : null,
		divId : null,
		contenedor : null,
		indice : 0,
		widthVK : 400
	};
}

function crear(_tecladoVirtual, _divId, _inputPass, _contenedor,
		activadorTeclado, tipoTeclado, caracteresEspeciales, claseDivsAesquivar) {
	_tecladoVirtual.divId = _divId;
	_tecladoVirtual.contenedor = _contenedor != null ? _contenedor : "body";
	_tecladoVirtual.inputPass = _inputPass;
	_tecladoVirtual.divsAesquivar = $(claseDivsAesquivar);
	var cInicial = _tecladoVirtual.inputPass[0];
	_tecladoVirtual.cActual = cInicial;
	var newLayout = new Array();
	var charEsp = caracteresEspeciales;
	if (tipoTeclado == 'NUM') {
		_tecladoVirtual.widthVK = 170;
		charEsp = null;
	}

	filtrarInvalidos(_tecladoVirtual);
	if (charEsp != null)
		newLayout[0] = charEsp;

	newLayout = newLayout.concat(eval("$.keypad." + tipoTeclado));

	_tecladoVirtual.inputSelect = $.isArray(_tecladoVirtual.inputPass) ? _tecladoVirtual.inputPass
			.join(',')
			: _tecladoVirtual.inputPass;

	$(_tecladoVirtual.divId).html("");

	$(_tecladoVirtual.divId)
			.keypad(
					{
						layout : newLayout,
						target : $(cInicial),
						randomiseAgain : false,
						randomiseNumeric : true,
						randomiseAlphabetic : true,
						randomiseOther : true,
						onKeypress : function(key, event) {
							if (key == $.keypad.EN) { //Si toco ACEPTAR
								//actualizarCampo
								_tecladoVirtual.indice++;
								_tecladoVirtual.cActual = _tecladoVirtual.inputPass[_tecladoVirtual.indice];
								if (_tecladoVirtual.cActual != null) {
									$(_tecladoVirtual.divId).keypad('change',
											'target', _tecladoVirtual.cActual);
									$(_tecladoVirtual.inputSelect).removeClass(
											'highlight');
									$(_tecladoVirtual.cActual).addClass(
											'highlight');
								} else {
									$(_tecladoVirtual.divId).keypad('change',
											'target', '#ocul');
									$(_tecladoVirtual.divId).hide();
									$(_tecladoVirtual.inputSelect).removeClass(
											'highlight');

								}
							}
							if (key == $.keypad.CL) { //Si toco close
								borrarCampos(_tecladoVirtual);
								$(_tecladoVirtual.inputSelect)
										.unbind('focusin');
								$(_tecladoVirtual.divId).hide();
								$(_tecladoVirtual.inputSelect).removeClass(
										'highlight');
								$(activadorTeclado).attr('checked', '');
								_tecladoVirtual.cActual = _tecladoVirtual.inputPass[0];
								habilitarCampos(_tecladoVirtual);
							}
						}
					});
	$(_tecladoVirtual.divId).css( {
		"width" : _tecladoVirtual.widthVK,
		"position" : "absolute"
	});

	$(_tecladoVirtual.divId).hide();
	$(_tecladoVirtual.divId).draggable( {
		containment : _tecladoVirtual.contenedor
	});
	randomPosition(_tecladoVirtual);

}

function activar(_tecladoVirtual) {
	randomPosition(_tecladoVirtual);
	$(_tecladoVirtual.divId).keypad('reset');
	$(_tecladoVirtual.divId)
			.keypad('change', 'target', _tecladoVirtual.cActual);
	habilitarFocusInputTeclado(_tecladoVirtual);
	borrarCampos(_tecladoVirtual);
	deshabilitarCampos(_tecladoVirtual);
	$(_tecladoVirtual.divId).show();
	$(_tecladoVirtual.cActual).addClass('highlight');
}

function desactivar(_tecladoVirtual) {
	borrarCampos(_tecladoVirtual);
	$(_tecladoVirtual.inputSelect).unbind('focusin');
	$(_tecladoVirtual.divId).keypad('hide');
	_tecladoVirtual.cActual = _tecladoVirtual.inputPass[0];
	_tecladoVirtual.indice = 0;
	habilitarCampos(_tecladoVirtual);
	$(_tecladoVirtual.divId).hide();
	$(_tecladoVirtual.inputSelect).removeClass('highlight');
}

function randomPosition(tecladoVirtual) {
	var contenedorVK = $(tecladoVirtual.contenedor);
	var heightVK = $(tecladoVirtual.divId).height();
	var pos = contenedorVK.position();
	var VK = $(tecladoVirtual.divId);

	var indiceIntentos = 0;
	var maxIntentos = 5;

	//LINK-BEE-4
	var contenedor = {
		x : pos == null? 0 : pos.left,
		y : pos == null? 0 : pos.top,
		width : contenedorVK.width(),
		height : contenedorVK.height()
	};
	var viewport = {
		x : $(window).scrollLeft(),
		y : $(window).scrollTop(),
		width : $(window).width(),
		height : $(window).height()
	};
	var cont;
	if (viewport.width < 1000 || viewport.height < 500) {
		//No cumple tamaño minimo por lo tanto lo restrijo al contenedor;
		cont = contenedor;
	} else {
		if (contenedor.x > (viewport.x + viewport.width)
				|| (contenedor.x + contenedor.width) < viewport.x
				|| contenedor.y > (viewport.y + viewport.height)
				|| (contenedor.y + contenedor.height) < viewport.y) {
			//El conenedor esta fuera del espacio visible, entonces lo restrinjo al contenedor
			cont = contenedor;
		} else {

			var x = contenedor.x > viewport.x ? contenedor.x : viewport.x;
			var y = contenedor.y > viewport.y ? contenedor.y : viewport.y;
			var width = contenedor.x + contenedor.width > viewport.width
					+ viewport.x ? (viewport.x + viewport.width) - contenedor.x
					: (contenedor.x + contenedor.width) - viewport.x;
			var height = contenedor.y + contenedor.height > viewport.height
					+ viewport.y ? (viewport.y + viewport.height)
					- contenedor.y : (contenedor.y + contenedor.height)
					- viewport.y;

			cont = {
				x : x,
				y : y,
				width : width,
				height : height
			};
		}
	}

	while (!noCubreInput(tecladoVirtual, cont, heightVK, VK)
			&& indiceIntentos < maxIntentos) {
		indiceIntentos++;
	}
}

function noCubreInput(tecladoVirtual, contenedor, heightVK, VK) {
	var noCubre = true;
	var left = Math.floor(Math.random() * (contenedor.width - contenedor.x));
	if (left + tecladoVirtual.widthVK > (contenedor.width + contenedor.x)) {
		left = left - tecladoVirtual.widthVK;
	}
	var top = Math.floor(Math.random() * (contenedor.height - contenedor.y));
	if (top + heightVK > (contenedor.height + contenedor.y)) {
		top = top - heightVK;
	}
	var VK = $(tecladoVirtual.divId);
	var iLength = 0;

	while (iLength < tecladoVirtual.inputPass.length) {
		var id = tecladoVirtual.inputPass[iLength];
		var contPos = $(id).offset();
		var x1 = contPos.left;
		var x2 = x1 + $(id).width();
		var y1 = contPos.top;
		var y2 = y1 + $(id).height();

		if (!(((VK.height() + top) < y1 || top > y2) || ((VK.width() + left) < x1 || (left > x2)))) {
			return false;
		}

		iLength++;
	}

	!$(tecladoVirtual.divsAesquivar).each(
			function(index) {
				if ($(this).css("display") == "block") {
					var id = '#' + $(this).attr('id');
					var contPos = $(id).position();
					var x1 = contPos.left;
					var x2 = x1 + $(id).width();
					var y1 = contPos.top;
					var y2 = y1 + $(id).height();

					if (!(((VK.height() + top) < y1 || top > y2) || ((VK
							.width() + left) < x1 || (left > x2)))) {
						noCubre = false;
					}
				}

			});

	$(tecladoVirtual.divId).css( {
		"left" : left,
		"top" : top
	});

	return noCubre;
}

function habilitarFocusInputTeclado(tecladoVirtual) {

	$(tecladoVirtual.inputSelect).unbind('focusin').focusin(function() {
		$(tecladoVirtual.divId).keypad('change', 'target', this);
		$(tecladoVirtual.divId).show();
		$(tecladoVirtual.inputSelect).removeClass('highlight');
		$(this).addClass('highlight');
		actualizarField(tecladoVirtual, '#' + $(this).attr('id'));
	});

	$('input:text').unbind('focusin').focusin(function() {
		$(tecladoVirtual.divId).hide();
		$(tecladoVirtual.inputSelect).removeClass('highlight');
	});

};

function actualizarField(tecladoVirtual, id) {
	for ( var i = 0; i < tecladoVirtual.inputPass.length; i++) {
		if (tecladoVirtual.inputPass[i] == id) {
			tecladoVirtual.cActual = id;
			tecladoVirtual.indice = i;
		}
	}
}

function borrarCampos(tecladoVirtual) {
	$(tecladoVirtual.inputSelect).val('');
}

function deshabilitarCampos(tecladoVirtual) {
	$(tecladoVirtual.inputSelect).attr('readonly', 'readonly');
}

function habilitarCampos(tecladoVirtual) {
	$(tecladoVirtual.inputSelect).attr('readonly', '');
}

function filtrarInvalidos(tecladoVirtual) {
	if ($.isArray(tecladoVirtual.inputPass)) {
		var validos = new Array();
		for ( var i = 0; i < tecladoVirtual.inputPass.length; i++) {
			if ($(tecladoVirtual.inputPass[i]).length > 0) {
				validos.push(tecladoVirtual.inputPass[i]);
			}
		}
		tecladoVirtual.inputPass = validos;
	}
}
