function createWindow(titulo, itens, bottomItens){

	return Ext.create('Ext.window.Window', {
			title: titulo,
			collapsible: true,
			animCollapse: true,
			maximizable: true,
			width: 750,
			height: 500,
			minWidth: 300,
			minHeight: 200,
			layout: 'fit',
			items: itens,
			dockedItems: [bottomItens]
	});

		
		/*{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		layout: {
			pack: 'center'
		},
		items: [{
			minWidth: 80,
			text: 'Send'
		},{
			minWidth: 80,
			text: 'Cancel'
		} */


}

function downloadLayer(wfsURL, tipo, arrayParameters, outputFormat){
        
    var form = document.createElement("form"); 
	form.method = "POST"; 
	form.action = wfsURL;
	    
	for(var i = 0; i < arrayParameters.length; i++){
		var input   = document.createElement("input"); 
		input.type  = "hidden"; 
		input.name  = arrayParameters[i][0];
		input.value = arrayParameters[i][1];
		form.appendChild(input); 
	}
	
	// adiciona o formato aos parametros
	var input   = document.createElement("input"); 
	input.type  = "hidden"; 
	if( tipo == 'WFS' || tipo == 'wfs' ){
	    input.name  = "outputFormat";
	}
	if( tipo == 'WMS' || tipo == 'wms' ){
	    input.name  = "format";
	}
	input.value = outputFormat;
	form.appendChild(input); 
	
	// adiciona o servi�o aos parametros
	var input   = document.createElement("input"); 
	input.type  = "hidden"; 
	input.name  = "SERVICE";
	input.value = tipo;
	form.appendChild(input); 
	
	document.body.appendChild(form); 
	form.submit(); 

}

/*
	// Classe Hexadecimal - Est�tico
	// Danilo Trindade
	
	Direitos autorais do calculo:
	http://www.designerwiz.com/mf.htm?http&&&www.designerwiz.com/generator/color_convertor_hex_decimal.htm
	
	Direitos autorais do resto, meu... inclusive dos ajustes!!!
*/

Hexadecimal = {
	versao: "1.0"
}

Hexadecimal.obterDecimal = function(hexa) {
	if(hexa == 'A') {
		valor = 10;
	} else if(hexa == 'B') {
		valor = 11;
	} else if(hexa == 'C') {
		valor = 12;
	} else if(hexa == 'D') {
		valor = 13;
	} else if(hexa == 'E') {
		valor = 14;
	} else if(hexa == 'F') {
		valor = 15;
	} else {
		valor = eval(hexa);
	}
	
	return valor;
}

Hexadecimal.obterHexa = function(decimal) {
	if(decimal == 10) {
		valor = 'A';
	} else if(decimal == 11) {
		valor = 'B';
	} else if(decimal == 12) {
		valor = 'C';
	} else if(decimal == 13) {
		valor = 'D';
	} else if(decimal == 14) {
		valor = 'E';
	} else if(decimal == 15) {
		valor = 'F';
	} else {
		valor = '' + decimal;
	}
	
	return valor;
}

Hexadecimal.hexaParaDecimal = function(hexa) {
	retorno = [];
	hexa    = hexa.toUpperCase();
	
	a = Hexadecimal.obterDecimal(hexa.substring(0, 1));
	b = Hexadecimal.obterDecimal(hexa.substring(1, 2));
	c = Hexadecimal.obterDecimal(hexa.substring(2, 3));
	d = Hexadecimal.obterDecimal(hexa.substring(3, 4));
	e = Hexadecimal.obterDecimal(hexa.substring(4, 5));
	f = Hexadecimal.obterDecimal(hexa.substring(5, 6));
	
	retorno[0] = (a * 16) + b;
	retorno[1] = (c * 16) + d;
	retorno[2] = (e * 16) + f;
	
	return retorno;
}

Hexadecimal.decimalParaHexa = function(decimal) {
	R = decimal[0];
	G = decimal[1];
	B = decimal[2];
	
	a = Hexadecimal.obterHexa(Math.floor(R / 16));
	b = Hexadecimal.obterHexa(R % 16);
	c = Hexadecimal.obterHexa(Math.floor(G / 16));
	d = Hexadecimal.obterHexa(G % 16);
	e = Hexadecimal.obterHexa(Math.floor(B / 16));
	f = Hexadecimal.obterHexa(B % 16);
	z = a + b + c + d + e + f;
	
	return z;
}

// gera um array contendo cores em Hexa variando de acordo com o incremento
// hexaInicial = Cor inicial em hexadecimal
// hexaFinal   = Cor final   em hexadecimal
// incremento  = estipula o incremento de varia��o da cor (se n�o for 0 o incremento sera feito de acordo com a quantidade)
// quantidade  = quantidade de cores a serem geradas
function generateArrayPallete( hexaInicial, hexaFinal, incremento, quantidade ){

   var cores = new Array();
   
   var R1 = Hexadecimal.hexaParaDecimal(hexaInicial)[0];
   var G1 = Hexadecimal.hexaParaDecimal(hexaInicial)[1];
   var B1 = Hexadecimal.hexaParaDecimal(hexaInicial)[2];
   var rgb1 = R1 + '' + G1 + '' + B1;
   var a_rgb1 = [R1, G1, B1];
   
   var R2 = Hexadecimal.hexaParaDecimal(hexaFinal)[0];
   var G2 = Hexadecimal.hexaParaDecimal(hexaFinal)[1];
   var B2 = Hexadecimal.hexaParaDecimal(hexaFinal)[2];
   var rgb2 = R2 + '' + G2 + '' + B2;
   var a_rgb2 = [R2, G2, B2];
   
   rgb1 = parseInt(rgb1);
   rgb2 = parseInt(rgb2);
   
   if( rgb1 < rgb2 ){
     var aux = a_rgb1;
     a_rgb1 = a_rgb2;
     a_rgb2 = aux;	 
   }
   
   //calcula o valor do incremento baseando-se no total de cores e a quantidade
   if( incremento == 0 ){
      var rgb1 = a_rgb1[2] + (a_rgb1[1] * 256) + (a_rgb1[0] * 256 * 256);
	  var rgb2 = a_rgb2[2] + (a_rgb2[1] * 256) + (a_rgb2[0] * 256 * 256);
	  incremento = Math.floor((rgb1 - rgb2) / quantidade);
   }
   
   // cria o array de cores
   var rgb = a_rgb2;
   var total;
   for( var i = 1; i <= quantidade; i++){
       // usando rbg0 e rgb1 para evitar multiplica��o por 0
	   var a1 = rgb[0] == 0 ? 0 : rgb[0]*256*256;
	   var a2 = rgb[1] == 0 ? 0 : rgb[1]*256;
	   total = a1 + a2 + rgb[2] + incremento;
	   var tt = total/(256*256);
	   rgb[0] = (tt - (tt % 1));
	   total = total - (rgb[0] == 0 ? 0 : (rgb[0]*(256*256)));
	   tt = total/256;
	   rgb[1] = (tt - (tt % 1));
	   total = total - (rgb[1] == 0 ? 0 : (rgb[1]*256));
	   rgb[2] = total;
	   cores.push("#"+Hexadecimal.decimalParaHexa(rgb));
   }	

   return cores;   

}

function incrementaCorRGB( rgb, incremento ){
   var R = rgb[0];
   var G = rgb[1];
   var B = rgb[2];
   while(1==1){
       
       if( incremento > (255- B) ){
	      incremento = incremento - (255-B);
		  B = 0;
	   }
   }
}


var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");	
	
function degrade( color_inicio, color_fin, pasos ){

   color_inicio = Hexadecimal.hexaParaDecimal(color_inicio);
   color_fin    = Hexadecimal.hexaParaDecimal(color_fin);

   var cores = new Array();
   var iteracion = 0
   var color_actual = new Array(3);
   
   var diferencia = new Array(3);
   for (i=0;i<3;i++){ 
	  diferencia[i] = (color_fin[i] - color_inicio[i]) / pasos;
   }
   
   for(var iteracion = 1; iteracion <= pasos; iteracion++){
      if (iteracion < pasos) {
		for (i=0;i<3;i++){
			color_actual[i] = (iteracion * diferencia[i]) + color_inicio[i];
		}
	  }else{
		for (i=0;i<3;i++){
			color_actual[i] = color_fin[i] - ((iteracion - pasos) * diferencia[i]);
		}	
	  }
	  cores.push("#"+convierteHexadecimal(Math.round(color_actual[0])) + convierteHexadecimal(Math.round(color_actual[1])) + convierteHexadecimal(Math.round(color_actual[2])));
   }
   
   return cores
   
}	

function convierteHexadecimal(num){
	var hexaDec = Math.floor(num/16);
	var hexaUni = num - (hexaDec * 16);
	return hexadecimal[hexaDec] + hexadecimal[hexaUni];
}


function getQuerystring(key, default_){

  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
	
}

function removeElementById( elementId ){
   var Node1 = document.getElementById(elementId); 
   if(!Node1) return;
   Node1.parentElement.removeChild(Node1);
}

function importJS(src){
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',src);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

// import with a random query parameter to avoid caching
function importJSNoCache(src){
  var ms = new Date().getTime().toString();
  var seed = "?" + ms; 
  importJS(src + seed);
}

// Navega por todas as layers do mapPanel, para corrigir um bug do LegendPanel
// que n�o apresenta as legendas para Layers com TILED = true (cacheadas)
function ajustaLayersTiled( mapPanel ){
	var LayerRec;
	for(var l = 0; l < map.layers.length; l++)
	{
		if( !map.layers[l].isBaseLayer && map.layers[l].params){
		   LayerRec = mapPanel.layers.getAt(l);
		   LayerRec.set("legendURL",wmsUrl + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fgif&LAYER=" + map.layers[l].params["LAYERS"]);
		}
	}	
}	



function saveMap(map){

    /*var arrayReturn = [];
   
    for(var i = 0; i < map.layers.length; i++){
     	var layer = map.layers[i]; 
		if( layer.isBaseLayer || !layer.params ) continue;
   
		//trata as layers do usu�rio
		if( layer.params["ISWMSPOST"] ){
		  var tmpLayer = [];
		  //tmpLayer["PARAMS"] = layer.params;
		  tmpLayer["NAME"]   = layer.name;
		  arrayReturn["LAYER"] = tmpLayer;
		  var ss = array2json( arrayReturn );
		  var test = Ext.decode(ss);
		  var i = 0;
		} 
   
   }   */
   
   

}

/* function procurarMunicipio(municipio){
   
   //map.zoomToExtent(extent);

   var teste = new OpenLayers.Layer.Vector("WFS", {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.WFS({
                    url:  wfsUrl,
                    featureType: "municipios",
                    featureNS: "http://somabrasil.cnpm.embrapa.br/geodb"
                }),
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: 3,
                    strokeColor: "#333333"
                }),
                filter: new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: [
                        new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "nome",
                            value: municipio
                        })
                    ]
                })
            });
			
	map.addLayer(teste);		
			
	teste.events.register("loadend", teste, function(t){
	    var geographic = new OpenLayers.Projection("EPSG:4326");
        var mercator = new OpenLayers.Projection("EPSG:900913");
	    var zoom = t.object.getDataExtent().transform(geographic, mercator);
		if( zoom ){
          map.zoomToExtent(zoom); 
		}  
		map.removeLayer(t.object);
		t.object.destroy();
	});		

} */

function procurarMunicipio(distrito){
   
  var teste = new OpenLayers.Layer.Vector("WFS", {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.WFS({
                    url:  urlWFS,
                    featureType: "partidos",
                    featureNS: "http://postgis.org"
                }),
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: 3,
                    strokeColor: "#333333"
                }),
                filter: new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: [
                        new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "nuevo",
                            value: distrito
                        })
                    ]
                })
            });
			
	map.addLayer(teste);		

	var lon = -58.0169084361554;
	var lat = -35.0060996205433;
	var zoom = 12;
	  var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
            map.setCenter (lonLat, zoom);
	//"POINT(-58.0169084361554 -35.0060996205433)"
	//  map.setCenter(new OpenLayers.LonLat(-58.0169084361554, -35.0060996205433), 8);
/********************************************************************************************	
    var lonLat = new OpenLayers.LonLat(-2.620239, 43.034768)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            mapControl.getProjectionObject() // to Spherical Mercator Projection
          );
 
    var zoom = 8;
    mapControl.setCenter(lonLat, zoom);


	  var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
            map.setCenter (lonLat, zoom);
/////////////////////////////////////////////////////////

	teste.events.register("loadend", teste, function(t){
	    var geographic = new OpenLayers.Projection("EPSG:4326");
        var mercator = new OpenLayers.Projection("EPSG:900913");
	  //  var zoom = t.object.getDataExtent().transform(geographic, mercator);
		var zoom = t.object.getDataExtent();
		if( zoom ){
          map.zoomToExtent(zoom); 
		}  
		map.removeLayer(t.object);
		t.object.destroy();
	});		
*/

}


function visualizarBusquedaDist(punto){



    var url = 'visualizarXML.php';
    url += '?punto='+punto;
  //  activada(idserv,oferta); 
//	Ext.onReady(function() {
//		   Ext.Msg.alert('Recuerde','Para visualizar la escuela debe tildar la capa '+ oferta +' en el arbol (Panel derecho)');});

//	alert(url);
	 OpenLayers.loadURL(url,
        null,//OpenLayers.Util.getParameterString(params),
        null,
        displayDist);
        
}

function displayDist(response){


	if (response && response.responseXML) {
		// parse the features
			
        var points = response.responseXML.getElementsByTagName('point');
         for (var i = 0; i < points.length; i++) {
            
            var parser = new OpenLayers.Format.WKT();
			
			
      var lon = (points[i].getElementsByTagName('lon')[0].childNodes[0].nodeValue);
        // alert(lon);  

          var lat = (points[i].getElementsByTagName('lat')[0].childNodes[0].nodeValue);
        // alert(lat); 

          var zoom = 12;

	         var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
            map.setCenter (lonLat, zoom);

          // var geometry = parser.read(wkt);
		
           // busqueda.addFeatures([geometry]);
       
         //	map.setCenter(new OpenLayers.LonLat(points[i].getElementsByTagName('lon')[0].childNodes[0].nodeValue, points[i].getElementsByTagName('lat')[0].childNodes[0].nodeValue), 12);

}

}
}


/**
 * Converts the given data structure to a JSON string.
 * Argument: arr - The data structure that must be converted to JSON
 * Example: var json_string = array2json(['e', {pluribus: 'unum'}]);
 * 			var json = array2json({"success":"Sweet","failure":false,"empty_array":[],"numbers":[1,2,3],"info":{"name":"Binny","site":"http:\/\/www.openjs.com\/"}});
 * http://www.openjs.com/scripts/data/json_encode.php
 */
function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts[key] = array2json(value); /* :RECURSION: */
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';

            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + value + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)

            parts.push(str);
        }
    }
    var json = parts.join(",");
    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}

function encodeUTF(string){

var escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };

    
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';

}

// ajusta cores de um range (dataList) de valores, baseando-se na varia��o estatistica chamada de Jenks Breaks
function getJenksBreaks(dataList, numClasses, sql_jenks) {

    var numElements = dataList.length;

	var mat1 = [];
	for(var i=0; i<=numElements; i++) {
		var temp = []
		for(var j=0; j<=numClasses; j++) {
			temp.push[0];
		}
		mat1.push(temp);
	}
	
	var mat2 = [];
	for(var i=0; i<=numElements; i++) {
		var temp = []
		for(var j=0; j<=numClasses; j++) {
			temp.push[0];
		}
		mat2.push(temp);
	}
	
	for(var i=1; i<=numClasses; i++) {
		mat1[1][i] = 1;
		mat2[1][i] = 0;
		for(var j=2; j<=numElements; j++) {
			mat2[j][i] = Infinity
		}
	}

	v = 0.0 
	for(var l=2; l<=numElements; l++) {
		var s1 = 0.0;
		var s2 = 0.0;
		var w = 0.0 
		for(var m=1; m<=l; m++) {
			var i3 = l - m + 1;
			var val = parseFloat(dataList[i3-1]);
			s2 += val * val;
			s1 += val;
			w += 1;
			v = s2 - (s1 * s1) / w;
			var i4 = i3 - 1;
			if (i4 != 0) {
				for(var j=2; j<=numClasses; j++) {
					if (mat2[l][j] >= (v + mat2[i4][j - 1])) {
						mat1[l][j] = i3
						mat2[l][j] = v + mat2[i4][j - 1]
					}
				}
			}
		}
		mat1[l][1] = 1
		mat2[l][1] = v
	}
	
	k = numElements;
	var kclass = [];
	for(var j=0; j<=numClasses; j++) {
		kclass.push(0);
	}
	
	kclass[numClasses] = parseFloat(dataList[numElements - 1]);
	kclass[0] = parseFloat(dataList[0])
	var countNum = numClasses;
	
	while (countNum >= 2) {
		var id = parseInt((mat1[k][countNum]) - 2);
		kclass[countNum - 1] = dataList[id];
		k = parseInt((mat1[k][countNum] - 1));
		if( !k ) k = 0;
		countNum -= 1;
	}
	
	kclass.sort( function(a,b){
	    if( a == b ){
		   return 0;
		}
		return a > b ? 1 : -1;
	});
	
	return kclass;  
        
}

function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}

// gera um cookie para n minutos
function setCookie(pLabel, pVal, pMinutes){
	var tExpDate=new Date();
	tExpDate.setTime( tExpDate.getTime()+(pMinutes*60*1000) );
	document.cookie= pLabel + "=" +escape(pVal)+( (pMinutes==null) ? "" : ";expires="+ tExpDate.toGMTString() );
}	

// recupera um cookie pelo nome
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name){
		return unescape(y);
	  }
	}
}

function msg_aviso_consulta_muito_grande(handler){
   Ext.MessageBox.buttonText.yes = "Sim"; 
   Ext.MessageBox.buttonText.no  = "N�o"; 
   return Ext.MessageBox.confirm("Confirma��o", "ATEN��O: Esta consulta retorna um n�mero muito elevado de registros a serem processados devido a quantidade de anos escolhida. \nUm algoritmo de classifica��o ser� disparado podendo demorar alguns minutos, \nDeseja continuar ?", handler);
}   

function msg_aviso_sem_dados(){
   alert("Esta consulta n�o apresenta resultados. \nAltere os par�metros de busca.");
}   

// checa o valor de uma variavel � numerico
function isNumeric(input){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}