var arrayTemp;
var arrayTempSpot;
 
function createSliderTemporalSpot(layerTemporal, idLayer, labelLayer, titleSlider){

    arrayTempSpot = new Array();
	var mapa = layerTemporal.map;
    for( x = 0; x < mapa.layers.length; x++ ){
	   if( mapa.layers[x].params && mapa.layers[x].params[idLayer] ){
 	       mapa.layers[x].setOpacity(0);
		   arrayTempSpot.push( mapa.layers[x] );
	   }
	}

	// reordena o array inverso
    var newArrayTemp = new Array();
	for(var i = arrayTempSpot.length - 1; i >= 0; i--){
	   newArrayTemp.push(arrayTempSpot[i]);
	}
	arrayTempSpot = newArrayTemp;
	
	arrayTempSpot[0].setOpacity(1);
	
    var tip = new Ext.slider.Tip({
        getText: function(thumb){
		    var ano = arrayTempSpot[ Math.floor(thumb.value/9) ].params[labelLayer]; 
            return String.format('<b>Imagem {0}', ano);
        }
    });
	
    var sliderSpot = 
	    new Ext.Slider({
        width: 150,
        increment: 1,
        minValue: 1,
        maxValue: (arrayTempSpot.length*9)-1,
        plugins: tip,
		listeners: {
						change: function( slider, newValue, thumb){
						       if(!thumb.dragStartValue ) { return; }    
						       var seletor = Math.floor(newValue/9); 
								   if (seletor != 0) {arrayTempSpot[0].displayInLayerSwitcher = false; }
								   else {arrayTempSpot[0].displayInLayerSwitcher = true; }
							   for(var i = 0; i < arrayTempSpot.length; i++){
							       if( i != seletor ){
								      arrayTempSpot[i].setOpacity(0);
									  // só desabilita a visibilidade se não for a primeira imagem da sequencia
									  if( i != 0 ){ arrayTempSpot[i].setVisibility(false); }
								   }
							   }
							   sliderTemporalSpot.setTitle(titleSlider + " - " + arrayTempSpot[seletor].params[labelLayer]);
							   arrayTempSpot[seletor].setVisibility(true);
							   arrayTempSpot[seletor].setOpacity(0.9);
						}										 
                   }
    });
	
	return sliderSpot;

}

function desabilitaLayersTemporalSpot(){

   for(var i = 0; i < arrayTempSpot.length; i++){
      arrayTempSpot[i].setOpacity(0);
   }
   arrayTempSpot[0].setOpacity(1);
   sliderTemporalSpot = null;

}

function releaseWindowSliderTemporalSpot(){

   desabilitaLayersTemporalSpot(); 
   windowSliderTemporal.close();

}

function createSliderTemporal(layerTemporal){

    arrayTemp = montaArrayLayerTemporal( layerTemporal );
	
	var indexAnoInicial = arrayTemporal.indexOf(layerTemporal.params["ANOINICIAL"]);

    var tip = new Ext.slider.Tip({
        getText: function(thumb){
		    var ano = arrayTemporal[ indexAnoInicial + Math.floor(thumb.value/9) ]; 
            return String.format('<b>Ano {0}', ano);
        }
    });

    var slider = 
	    new Ext.Slider({
        width: 150,
        increment: 1,
        minValue: 1,
        maxValue: (arrayTemp.length*9)-1,
        plugins: tip,
		listeners: {
						change: function( slider, newValue, thumb){
						       if(!thumb.dragStartValue ) { return; }    
						       var seletor = Math.floor(newValue/9); 
							   for(var i = 0; i < arrayTemp.length; i++){
							       if( i != seletor ){
								      arrayTemp[i].setOpacity(0);
								   }
							   }
							   sliderTemporal.setTitle("Ano " + arrayTemporal[ indexAnoInicial + Math.floor(thumb.value/9) ] );
							   arrayTemp[seletor].setOpacity(0.9);
						}										 
                   }
    });
	
	return slider;

}

function montaArrayLayerTemporal( layerTemporal ){

   var arrayTemp = new Array();
   var mapa = layerTemporal.map;
   var indexAnoInicial = arrayTemporal.indexOf(layerTemporal.params["ANOINICIAL"]);
   var indexAnoFinal   = arrayTemporal.indexOf(layerTemporal.params["ANOFINAL"]);
   for( var i = indexAnoInicial; i <= indexAnoFinal; i++){
       for( x = 0; x < mapa.layers.length; x++ ){
	       if( mapa.layers[x].params && arrayTemporal[i] == mapa.layers[x].params["REF"] ){
		       if( mapa.layers[x].params["ISTEMPORAL"] ){
			       if( mapa.layers[x] == layerTemporal ){
				      mapa.layers[x].setOpacity(0.9);
				      arrayTemp.push( mapa.layers[x] );
				   }
			   } else if(mapa.layers[x].params["PARENTLAYER"]){
			       if( mapa.layers[x].params["PARENTLAYER"] == layerTemporal ){
				      mapa.layers[x].setOpacity(0);
				      arrayTemp.push( mapa.layers[x] ); 
                   } 				   
			   }
		   }
	   }
   }
   
   return arrayTemp;

}

function controlLayersTemporal( layerTemporal, command ){

   var mapa = layerTemporal.map;
   var posLeft = viewPort.getWidth() - 500;
   var posTop  = 150;
   
   // cria um array para armazenar todas as janelas comando 3
   var arrayWindows = new Array();
   
   if( command == 3 ){
	   // cria a primeira janela referente a layerTemporal
	   var win = createWindowMapFromLayer( layerTemporal );
	   win.show();
	   win.setPosition(posLeft, posTop);
	   arrayWindows.push(win);
   }  	   
      
   for( var i = 0; i < mapa.layers.length; i++){
        if(mapa.layers[i].params && mapa.layers[i].params["PARENTLAYER"]){
		   if( mapa.layers[i].params["PARENTLAYER"] == layerTemporal && mapa.layers[i] != layerTemporal){
		       // seta a visibility para false
			   if( command == 0 ){
			      mapa.layers[i].setVisibility(false);
			   }
			   // seta a visibility para true
			   if( command == 1 ){
			      mapa.layers[i].setVisibility(true);
				  mapa.layers[i].setOpacity(0);
			   }
			   // remove a layer
			   if( command == 2 ){
			      mapa.removeLayer(mapa.layers[i]);
			   }
			   
			   // gera janelas para as layers
			   if( command == 3 ){
			      posLeft -= 20;
				  posTop  += 20;
			      var win = createWindowMapFromLayer( mapa.layers[i] );
				  arrayWindows.push(win);
				  win.setPosition(posLeft, posTop);
				  win.show();
			   }
			   
	       } 				   
	    }
   }
   
   if( command = 3 ){
	   // armazena o array de windows dentro do atributo ARRAYWINDOWS do params da layer temporal
	   // servira para implementar a função de fechar todas as janelas de uma layer temporal
	   layerTemporal.mergeNewParams({ARRAYWINDOWS: arrayWindows});
	   
	   // passa por todas as janelas criadas, registrando o evento para o extent sincronizado
	   for(var i = 0; i < arrayWindows.length; i++){
		   var mapPanel = arrayWindows[i].getComponent(0);
		   var map = mapPanel.map;
		   // encontra a primeira layer sem ser baseLayer para fazer o mergeNewParams nela
		   // e armazenar o array de janelas
		   for(var x = 0; x < map.layers.length; x++){
			  if( !map.layers[x].isBaseLayer ){
				 map.layers[x].mergeNewParams({MAPAS: arrayWindows});
			  }	 
		   }
		   map.events.register("moveend", null, function() {
								// encontra a primeira layer sem ser baseLayer para pegar a lista de windows
								// a sincronizar o extent
								var winds;
								for(var x = 0; x < this.layers.length; x++){
								   if( !this.layers[x].isBaseLayer ){
									  winds = this.layers[x].params["MAPAS"];
									  break;
								   }	 
								}
								
								for(var i = 0; i < winds.length; i++){
								   var omap = arrayWindows[i].getComponent(0).map;
								   if( omap != this ){
								      if( this.getExtent() && syncJanelasExclusivas ){
									     omap.zoomToExtent(this.getExtent());
									  }	 
								   }	  
								}
		   });
	   }
  }	   

}

function createWindowTemporalSpot( layerTemporal, idLayer, labelLayer, titleSlider ){
   
   if( sliderTemporalSpot ){
      return;
   }
   
   sliderTemporalSpot = new Ext.Window({
					title: titleSlider,
					height: 60,
					width: 300,
					resizable: false,
					layout: 'fit',
					iconCls: 'bt-opacity',
					items: [ createSliderTemporalSpot( layerTemporal, idLayer, labelLayer, titleSlider ) ],
					listeners: {
					    close:function(panel){
						    desabilitaLayersTemporalSpot();
						}
					}
	           });				

   sliderTemporalSpot.show();

}

function createWindowTemporal( layerTemporal ){
   
   if( sliderTemporal ){
      sliderTemporal.close();
   }
   
   sliderTemporal = new Ext.Window({
					title: 'Analise Temporal',
					height: 60,
					width: 300,
					resizable: false,
					layout: 'fit',
					iconCls: 'bt-opacity',
					items: [ createSliderTemporal( layerTemporal ) ]
	           });				

   sliderTemporal.show();

}

function createLayerRanking(criterio, label, titulo, camada, sql, sql2, ranking, valores, variavel, nameLayer, atributos){

   if( !valores ){
     return;
   }	 
   
   var regras = new Array();
   
   // cria as regras baseado na numeração do ranking
   // var cores = generateArrayPallete("000AAA","000BBB", 0, ranking);
   
   // garante que quando o numero do ranking vier maior do que o que realmente a consulta retornou do banco, o ranking seja igual ao valor real
   ranking = valores.length;
   
   var cores = degrade("000AAA", "0FFFFF", ranking);
   for(var i = 1; i <= ranking; i++){
       var vTitulo   = "" + i + " " + valores[i-1].data.municipio + "(" + valores[i-1].data.uf + ")";
	   var vCriterio = "linha = " + i;
       regras.push( criaRule( vTitulo, vCriterio, cores[i-1], label ) ); 
   }
   
   var style = new OpenLayers.Style("", {rules: regras});	
   var sld = new OpenLayers.Format.SLD().write({
								namedLayers: [{
								    name: nameLayer,
									userStyles: [style]
								}]
							  });	
   
   options = { isBaseLayer: false,
	               format: "image/png",
                   group:"Ranking",
                   buttonOpacity: true,
				   EPSG:4326,
                   displayOutsideMaxExtent:true,
				   unsupportedBrowsers: [], 
                   visibility: true,
				   styleMap: new OpenLayers.StyleMap(style),
				   singleTile:true, tileOptions: {maxGetUrlLength: 2048}
   };				
   var wms = new OpenLayers.Layer.WMS.Post(camada, wmsUrl,{layers: nameLayer, format: 'image/jpeg', transparent: "true"}, options);   
   
   wms.params["EXPORT-MENU"] = true;		
   
   wms.mergeNewParams({  
	                     VIEWPARAMS: "sql:" + sql,
						 LAYERS: nameLayer,
						 SQL: sql2,
						 ISWMSPOST: true,
						 VARIAVEL: variavel,
						 ATRIBUTOS: atributos,
						 SLD_BODY: sld,
						 styles: [style],
						 FILTER_CQL: criterio
   });
      				  
   return wms;		  			  

}

function criaRule( titulo, cql, corPolygon, label){

   var rule = new OpenLayers.Rule({
        title : titulo, 
		filter: cqlFormat.read(cql)
   });
 
   rule.symbolizer["Polygon"] = {
		fillColor: corPolygon,
		fillOpacity: 0.8,
		strokeColor: "#000000",
		strokeWidth: 0.1
   };

   rule.symbolizer["Text"] = {
		label: label,
		labelAlign: "cc",
		fontColor: "#FFFFFF",
		//fontOpacity: 0.9,
		fontSize: 18
   };
   
   return rule;

}

function aplicaStyleCamada( wmsCamada, nameWms, rulesArray ){

   var style = new OpenLayers.Style("", {rules: rulesArray});	
   var sld = new OpenLayers.Format.SLD().write({
								namedLayers: [{
									name: nameWms,
									userStyles: [style]
								}]
							  });
   wmsCamada.mergeNewParams({SLD_BODY: sld,
							styles: style}); 
   
} 



var arrayTemporal = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
var arrayColor    = ["#993300","#008080","#FFFF00","#800080","#339966","#FFCC00","#333399","#FF9900","#CCFFCC","#33CCCC"];

