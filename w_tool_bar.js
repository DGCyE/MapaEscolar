// armazena o bot�o do usu�rio
var buttonUsuario;
// armazena o bot�o do logout
var buttonLogout;
// armazena o bot�o de alterar senha
var buttonAlterarSenha;
// armazena o bot�o de alterar senha

var buttonQueryIBGE;

function criaMapaPrint(){

	var options = {
		projection: "EPSG:4326",
		units: "meters",
		maxExtent: extent,
		controls:[],
		numZoomLevels: 13
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
	mmap.addControl(new OpenLayers.Control.MousePosition({element: $('Localización'), formatOutput: formatLonlats}));
	mmap.addControl(new OpenLayers.Control.ScaleLine());

	return mmap;

}
function createToolbar() {
	
	var htmlHelp = '';
/********************************************************************************
    var store =  createStoreAnos();	
	store.load({callback:function(){  
	                                  htmlHelp +=    '<h1> Ajuda para a consulta de dados do IBGE </h1><br><br>'; 
									  htmlHelp +=    '<b>Os campos dispon�veis para a cunsulta s�o :</b> \n';
									  htmlHelp +=    'ano, cultura, regiao, uf, mesoregiao, microregiao e municipio\n';
									  htmlHelp +=    'area_plantada, area_colhida, quantidade_produzida, valor_producao e produtividade<br><br>';
									  htmlHelp +=    '<b>Os anos dispon�veis s�o :</b>\n';
	                                  for(var i = 0; i < store.data.length; i++){
										 var uf  = store.getAt(i).get('ano');
										 htmlHelp += uf;
										 if( (i + 1) < store.data.length ){
										    htmlHelp += ', ';
										 }
									  } 
                                   }
	});
	
	
	var store2 = createStoreCulturas();
	store2.load({callback:function(){  
	                                  htmlHelp +=    '<br><br><b>As culturas dispon�veis s�o :</b>\n';
	                                  for(var i = 0; i < store2.data.length; i++){
										 var uf  = store2.getAt(i).get('cultura');
										 htmlHelp += uf;
										 if( (i + 1) < store2.data.length ){
										    htmlHelp += ', ';
										 }
									  } 
									  htmlHelp +=    '<br><br><b>As regi�es dispon�veis s�o :</b>\n';
									  htmlHelp +=    'Centro-Oeste, Nordeste, Norte, Sudeste e Sul<br><br>';
									  htmlHelp +=    '<b>As UFs s�o todas as unidades da federa��o em letras mai�sculas</b><br><br>';
									  htmlHelp +=    '<b>As mesoregi�es, microregi�es e munic�pios dispon�veis podem ser acessados dentro das janelas de consulta</b><br><br>';
									  
									  htmlHelp += "<br><br><b>Exemplos de clausulas:</b><br><br><br>";
									  htmlHelp += "cultura = 'Soja' and ano = 2005 and area_plantada > 15000 and regiao = 'Sul' <br><br>";
									  htmlHelp += "cultura like 'laranja' and ano = 2008 and produtividade > 10 and uf='SP' <br><br>";
									  htmlHelp += "cultura like 'mandioca' and ano = 2002 and area_colhida > 80 and produtividade < 30 <br><br>";
									  
                                   }
	});
	
	var htmlPadrao = '<b>Dispon�vel em breve ...</b>';
///////////////////////////////////////////
		{
            ptype: "gxp_googlegeocoder", 
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Buscar un lugar ..."
            }
        }
*/


 var Geocoder =  {
                xtype: "gx_geocodercombo", // anda
                emptyText: "Buscar distrito,calle altura,localidad,etc.",
                map: this.map,
                width: 250
 };

 var buttonArbol = {
          xtype: 'tbbutton',
          text: 'Arbol Escuelas',
          iconCls: "gxp-arbol",
                  handler: function( item, event ){
                             windowArbolCapas = createWindowArbol();  
                             windowArbolCapas.show();
                           }
           };
  var buscarEscuela = {
          xtype: 'tbbutton',
          text: 'Buscar Escuelas',
          iconCls: 'gxp-icon-find',
                  handler: function( item, event ){
                             windowBuscarEscuelas = createWindowBuscarEscuelas();
                             windowBuscarEscuelas.show();
                                     }
                
         };     

   var buttonProcurar =  new Ext.Button({
	                          iconCls: 'bt-procurar',
							  text: 'Buscar Distrito',
							  enableToggle: false,
							  handler: function(button,event) {
								 createWindowProcurarMunicipio().show();					     
							  }
	}); 

   var consultaIndi = new Ext.Button({
	                          iconCls: 'bt-query-avancada',
							  text: 'Consultas',
							  enableToggle: false,
							  handler: function(button,event) {
								  windowQuerieBasic = createWindowQueryIndi();
								  windowQuerieBasic.show();				     
							  }
	});  

    var posicion = new Ext.Button({
	                          iconCls: 'bt-localizacion',
							  text: 'Localización',
							  enableToggle: false,
							  handler: function(button,event) {
								 posicioname().show();					     
							  }
	});  

	var buttonFeatureInfo =  new Ext.Button({
	                             iconCls: 'bt-information',
							     text: '',
							     enableToggle: true,
							     handler: function(button,event) {
								     if (button.pressed){
									    var s = Ext.util.CSS.updateRule('div.olMap', 'cursor', 'help'); 
								        info.activate();
									 }	
									 else {
									    Ext.util.CSS.updateRule('div.olMap', 'cursor', 'default'); 
										// remove as popups que estiverem abertas
										for( var i = map.popups.length - 1; i >= 0; i-- ) { 
											map.removePopup(map.popups[i]); 
										};
                                        info.deactivate(); 									 
									 }	
						         }
	});

   // variavel que armazena a lista de itens a serem colocados no toolbar principal do webgis 
    var itemsToolbar = new Array();
	itemsToolbar.push( createTools() );
	itemsToolbar.push( { xtype: 'tbseparator' } );

	itemsToolbar.push( buttonFeatureInfo );
	//itemsToolbar.push( { xtype: 'tbseparator' } );
	
	
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buttonArbol );
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buscarEscuela );
	
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push(Geocoder);
	//itemsToolbar.push( buttonProcurar );

    itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( consultaIndi );

    itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( posicion );



	/*******************************************************************************
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( {xtype: 'tbfill'} );
	itemsToolbar.push( buttonUsuario );
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buttonSaveMap );
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buttonMeusMapas );
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buttonAlterarSenha );
	itemsToolbar.push( { xtype: 'tbseparator' } );
	itemsToolbar.push( buttonLogout );
	
	//itemsToolbar.push( buttonImprimir );
	//itemsToolbar.push( { xtype: 'tbseparator' } );
	//itemsToolbar.push( buttonSaveMap );
	//itemsToolbar.push( { xtype: 'tbseparator' } );
	//itemsToolbar.push( buttonOpacity );
*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

    return new Ext.Toolbar({
             xtype: "toolbar",
             region: "north",
             disabled: false,
             items: itemsToolbar
    });
}



function createTools() {


	var toolGroup = "toolGroup";

	// create a navigation control
	var navAction = new GeoExt.Action({
		tooltip: "Paneo",
		iconCls: "icon-pan",
		enableToggle: true,
		pressed: true,
		allowDepress: false,
		control: new OpenLayers.Control.Navigation(),
		map: this.map,
		toggleGroup: toolGroup
	});

	// create a navigation history control
	var historyControl = new OpenLayers.Control.NavigationHistory();
	map.addControl(historyControl);

	// create actions for previous and next
	var navPreviousAction = new GeoExt.Action({
		tooltip: "Zoom vista anterior",
		iconCls: "icon-zoom-previous",
		disabled: true,
		control: historyControl.previous
	});
	
	var navNextAction = new GeoExt.Action({
		tooltip: "Zoom próxima vista",
		iconCls: "icon-zoom-next",
		disabled: true,
		control: historyControl.next
	});
	
	// create split button for measure controls
	var activeIndex = 0;
	var measureSplit = new Ext.SplitButton({
		iconCls: "icon-measure-length",
		tooltip: "Medidas",
		enableToggle: true,
		toggleGroup: toolGroup, // Ext doesn't respect this, registered with ButtonToggleMgr below
		allowDepress: false, // Ext doesn't respect this, handler deals with it
		handler: function(button, event) {
			// allowDepress should deal with this first condition
			if(!button.pressed) {
				button.toggle();
			} else {
				button.menu.items.itemAt(activeIndex).setChecked(true);
			}
		},
		listeners: {
			toggle: function(button, pressed) {
				// toggleGroup should handle this
				if(!pressed) {
					button.menu.items.each(function(i) {
						i.setChecked(false);
					});
				}
			},
			render: function(button) {
				// toggleGroup should handle this
				Ext.ButtonToggleMgr.register(button);
			}
		},
		menu: new Ext.menu.Menu({
			items: [
				new Ext.menu.CheckItem(
					new GeoExt.Action({
						text: "Longitud",
						iconCls: "menuicon-measure-length",
						toggleGroup: toolGroup,
						group: toolGroup,
						allowDepress: false,
						map: this.map,
						control: this.createMeasureControl(
							OpenLayers.Handler.Path, "Dist�ncias"
						)
					})
				),
				new Ext.menu.CheckItem(
					new GeoExt.Action({
						text: "Area",
						iconCls: "icon-measure-area",
						toggleGroup: toolGroup,
						group: toolGroup,
						allowDepress: false,
						map: this.map,
						control: this.createMeasureControl(
							OpenLayers.Handler.Polygon, "Area"
						)
					})
				)
			]
		})
	});
	measureSplit.menu.items.each(function(item, index) {
		item.on({checkchange: function(item, checked) {
			measureSplit.toggle(checked);
			if(checked) {
				activeIndex = index;
				measureSplit.setIconClass(item.iconCls);
			}
		}});
	});
/*
	var printProvider = new GeoExt.data.PrintProvider({
		method: "POST", // "POST" recommended for production use
		capabilities: printCapabilities, // from the info.json script in the html
		customParams: {
			mapTitle: "SOMA Brasil - Impress�o de Mapas",
			comment: "Embrapa Monitoramento por Sat�lite - SOMA Brasil"
		},
		listeners: {
			printException: function(cmp, response) {
				alert(cmp);
				alert(response);
			}
		}
	});

	function isPrintable() {
		var printLayers = new Array();
		printLayers.push( new OpenLayers.Layer.Google(
			"Google Terrain",
			{type: google.maps.MapTypeId.TERRAIN}
		));
		for(var i=0; i<this.map.layers.length; i++) {
			if(this.map.layers[i].params && this.map.layers[i].getVisibility() === true){
				if(this.map.layers[i].params['ISWMSPOST'] || this.map.layers[i].params.LAYERS === "geodb:estados") {
					printLayers.push(this.map.layers[i].clone());
				}
			}
		}
		return printLayers;
	}
*/
	var tools = [
		navAction,
		measureSplit,
		"-",
		new Ext.Button({
			handler: function(){
				this.map.zoomIn();
			},
			tooltip: "Zoom In",
			iconCls: "icon-zoom-in",
			scope: this
		}),
		new Ext.Button({
			tooltip: "Zoom Out",
			handler: function(){
				this.map.zoomOut();
			},
			iconCls: "icon-zoom-out",
			scope: this
		}),
		navPreviousAction,
		navNextAction,
		new Ext.Button({
			tooltip: "Zoom para extensión máxima",
			iconCls: "icon-zoom-visible",
			handler: function() {
			
			    map.zoomToExtent(extent);
				
			},
			scope: this
		}),
		new Ext.Button({
			tooltip: "Imprimir",
			handler: function(){
				var printMap = criaMapaPrint();
				printMap.addLayers(isPrintable());
				for(var i=0; i<printMap.layers.length; i++) {
					printMap.layers[i].map = printMap;
				}
				if(printMap.layers.length > 2) {
					var legendPrint = new GeoExt.LegendPanel({
					preferredTypes: ["gx_vectorlegend"],
						width: sizeLegends,
						layerStore: new GeoExt.data.LayerStore({
							layers: printMap.layers
						})
					});
					new Ext.Window({
						title: this.previewText,
						modal: true,
						border: false,
						autoHeight: true,
						resizable: false,
						width: 360,
						items: [
							new GeoExt.ux.PrintPreview({
								minWidth: 336,
								mapTitle: this.about && this.about["title"],
								comment: this.about && this.about["abstract"],
								printMapPanel: {
									autoWidth: true,
									height: Math.min(420, Ext.get(document.body).getHeight()-150),
									limitScales: true,
									map: printMap,
									items: [{
										xtype: "gx_zoomslider",
										vertical: true,
										height: 100,
										aggressive: false
									}]
								},
								printProvider: printProvider,
								includeLegend: true,
								legend: legendPrint,
								sourceMap: printMap
							})
						]
					}).show();
				} else alert('A impress�o est� dispon�vel apenas para consultas selecionadas. Por favor, crie ou selecione um aconsulta!');
			},
			iconCls: "gxp-icon-print",
			scope: this
		})
	];

	return tools;
}
