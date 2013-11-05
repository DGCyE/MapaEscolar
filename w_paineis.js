function defineViewPort(){

/*
    var printProvider = new GeoExt.data.PrintProvider({
        method: "POST", // "POST" recommended for production use
       // capabilities: printCapabilities, // from the info.json script in the html
        customParams: {
            mapTitle: "SOMA Brasil - Impress�o de Mapas",
            comment: "Embrapa Monitoramento por Sat�lite - Webgis SOMA Brasil"
        }
		listeners: {
                  printException: function(cmp, response) {
                        alert(cmp);
						alert(response);
                    }
					
		}	
		
    });


	var printPage = new GeoExt.data.PrintPage({
        printProvider: printProvider
    }); 
	*/
    						  
   this.mapPanel = new GeoExt.MapPanel({
        id: "mapPanel",
		layout: "anchor",
		border: true,
		region: "center",
		map: this.map,
		layers: layers,
		items: [],
		listeners: {
		             render: function(c) {
					                       c.body.on('click', function() {
										       // verificaCookie();
										   });
										 },
                     scope: this
        }
        
   });			  
				  
   var titulo = {
					region: "north",
					contentEl: "title",
					height: 47
				};	
				
   this.painelEsquerdo = criaPainelEsquerdo();				

   var areaMapa = { 
					layout: "border",
					region: "center",
					tbar: createToolbar(),
					items: [ mapPanel, { xtype: 'tbseparator' }, this.painelEsquerdo ]
				  };				
   

   var view = new Ext.Viewport({
		layout: "border",
		hideBorders: true,
		items: [titulo, areaMapa]
	});
	
   return view;

}


function criaPainelEsquerdo(){

   var store = new GeoExt.data.LayerStore({
       map: this.map,
       layers: this.layers
   });


var legend = new GeoExt.LegendPanel({
                                      region: "east",
                                      id:'1',
                                      title: "Leyendas",
									  collapsible: false,
									  collapseMode: 'mini',
									  preferredTypes: ["gx_vectorlegend"],
                                      width: sizeLegends,
									  layerStore: mapPanel.layers,
                                      autoScroll: true
                });
	
    // cria a referencia na variavel global para ser acessada pelo objeto de impress�o do mapa	
  // legendPanel = legend;			
				
		   
     	tabPanel = new Ext.TabPanel({
				 activeTab : 0,
				 plain:true,
				 layoutOnTabChange : true,
				// defaults:{autoScroll:true},
				 region: "west",
				 border: true,
				 collapsible: true,
			     collapsed: false,
				 enableDD: true,
				 //collapseMode: 'mini',
				 items: [ criaTree(), legend, 
				 {
				   id:'2',
				   title:'Resultados',
				   contentEl:'resultados'
				 }
			],
				 width:250
	 });  

   painelEsquerdo = tabPanel;

return painelEsquerdo;	
				 
}


function rendererCorColuna( val ){
   return '<span style="background-color:' + val + '">' + val + '</span>';
}


function createWindowSliderOpacity(layer){

   if( layer ){
       sliderTreeImg.setLayer(layer);
   }
   
   // o parametro closeAction � importante ser hide
   // para que a sliderTreeImg n�o seja destruida quando
   // o usu�rio fechar a janela
   if( !windowLayerOpacity ){
      windowLayerOpacity = new Ext.Window({
					title: 'Transparencia Capa Actual',
					height: 60,
					width: 400,
					resizable: false,
					layout: 'fit',
					closeAction: 'hide',
					iconCls: 'bt-opacity',
					items: [ sliderTreeImg ]
	  });				
   }

   return windowLayerOpacity;

}

function createWindowMapFromLayer( layer, notCenter ){

    var options = {
		projection: "EPSG:900913",
        displayProjection: "EPSG: 4326",
		units: "meters",
		minZoomLevel: 6,
		controls:[],
		numZoomLevels: 19
   };

	// cria��o e defini��o do mapa principal 				
	var mmap = new OpenLayers.Map( 'mapa' , options );
	
	mmap.addControl(new OpenLayers.Control.Scale($('Escala')));
	mmap.addControl(new OpenLayers.Control.Navigation({
						dragPanOptions: {
							enableKinetic: true
						}
				   }));
    mmap.addControl(new OpenLayers.Control.Attribution());
    mmap.addControl(new OpenLayers.Control.Zoom());
	mmap.addControl(new OpenLayers.Control.MousePosition({element: $('Localizacion'), formatOutput: formatLonlats})); 
	mmap.addControl(new OpenLayers.Control.ScaleLine());
	
	var layers = new Array();
	var mLayer = layer.clone();
	mLayer.setVisibility(true);
	mLayer.setOpacity(1);
	
			
	layers = layers.concat( criaLayersGoogle(), mLayer);
	mmap.addLayers( layers );
	
	/*mmap.events.register("click", mmap , function(e){
        mmap.zoomToExtent(extent);
    }); */
			
	var win = new Ext.Window({
					title: 'Mapa - ' + layer.name,
					height: 500,
					width: 500,
					layout: 'fit',
					resizable: true, 
					iconCls: 'bt-query-avancada',
					items: [{
                               xtype: "gx_mappanel",
                               map: mmap
                    }]

	});
	
	win.on('show', function() {
       mmap.zoomToExtent(extent);
    });
	
	if( notCenter ){
	   win.setPosition( viewPort.getWidth()-500, 150 );
	}   
	
	return win;

}

function createWindowImprimir(){

	var options = {
		projection: new OpenLayers.Projection('EPSG:900913'),
		//displayProjection: new OpenLayers.Projection("EPSG:4326"),
		maxExtent: new OpenLayers.Bounds(-7175626.9266567,-5141723.905941,-6304445.4046767,-3812835.624341), 
		maxResolution: 'auto',
		units: "meters",
		minZoomLevel: 2,
		controls:[],
		numZoomLevels: 20
	};

	// cria��o e defini��o do mapa principal 				
	var mmap = new OpenLayers.Map( 'mapa' , options );
	mmap.addControl(new OpenLayers.Control.PanZoomBar({
					   position: new OpenLayers.Pixel(1, 15),
					   zoomWorldIcon: false
	})); 
	mmap.addControl(new OpenLayers.Control.Scale($('Escala')));
	mmap.addControl(new OpenLayers.Control.Navigation());
	mmap.addControl(new OpenLayers.Control.MousePosition({element: $('Localizacion'), formatOutput: formatLonlats})); 
	mmap.addControl(new OpenLayers.Control.ScaleLine());
	
	var myLayers = new Array();  
	
	//myLayers = myLayers.concat( criaLayersGoogle() );
	
	for(var i = 0; i < this.layers.length; i++){
	   if( !this.layers[i].isBaseLayer && this.layers[i].visibility ){
	      myLayers = myLayers.concat( this.layers[i] );
	   }
	}
	
	mmap.addLayers( myLayers );
	
    var printProvider = new GeoExt.data.PrintProvider({
        method: "POST", 
        capabilities: printCapabilities, // from the info.json script in the html
        customParams: {
            mapTitle: "Printing Demo",
            comment: "This is a map printed from GeoExt."
        }
    });

    var printExtent = new GeoExt.plugins.PrintExtent({
        printProvider: printProvider
    });
	
	var mp = new GeoExt.MapPanel({
	    layers: myLayers,
 	    plugins: [printExtent],
	    bbar: [{
		 	 text: "Gerar PDF",
			 handler: function() {
				 mp.plugins[0].print();
			 }
	    }]
    });
	
	var win = new Ext.Window({
					title: 'Impress�o do Mapa',
					height: 400,
					width: 500,
					layout: 'fit',
					resizable: true, 
					iconCls: 'bt-imprimir',
					items: [mp]
	});
	
    printExtent.addPage();
		
	win.setPosition( viewPort.getWidth()-500, 150 );
	   	
	return win;

}


