// armazena a tree principal
var layerRoot;
// armazena a o n� da tree do monitoramento
var noMonitoramento;

// variavel que define o nome do grupo de dados incluidos de fontes externas
var _groupDadosExternos = "external";

var _usernode = "user_node";

var _tipINPE = "Os mapeamentos marcados com (INPE/EMBRAPA), representam a distribui��o espacial da agricultura de larga escala no Brasil. Eles incluem as culturas de algod�o, arroz, milho e soja, cultivados em larga escala, para os anos/safra: 2002/2003, 2007/2008 e 2010/2011. O estudo foi realizado com o objetivo de retratar a din�mica de uso da terra por meio da agricultura de larga escala, particularmente nas regi�es de fronteira agr�cola do pa�s. Sua interpreta��o n�o pode ser aplicada � leitura fidedigna da agricultura anual e sim dever� ser focada na compreens�o dos processos como expans�o, transi��o e intensifica��o do uso agr�cola , onde � poss�vel observar as dimens�es espaciais e as intera��es nos cen�rios apresentados nos tr�s per�odos analisados. A metodologia utilizada envolve o desenvolvimento e aplica��o de algoritmos que processam s�ries temporais de imagens do sensor MODIS ( Moderate Resolution Imaging Spectroradiometer ), com resolu��o espacial de 250m, para a classifica��o das �reas agr�colas, identificando locais com uma ou duas safras anuais. A presen�a de ru�dos nas imagens foram minimizados, por�m n�o eliminados totalmente. A apresenta��o do mapeamento no SOMABRASIL (Sistema de Observa��o e Monitoramento da Agricultura no Brasil) est� limitada � escala 1:250.000, e a fase de verifica��o da acur�cia dos mapas se encontra em andamento, num esfor�o conjuto entre INPE e a Embrapa Monitoramento por Sat�lite.  Equipe: Instituto Nacional de Pesquisas Espacias (INPE) Divis�o de Sensoriamento Remoto / Laborat�rio de Agricultura e Floresta em Sensosriamento Remoto Marcos Adami, Joel Risso, Mois�s Salgado e Bernardo Rudorff; Empresa Brasileira de Pesquisa Agropecu�ria (Embrapa)/Embrapa Monitoramento por Sat�lite: Daniel Vict�ria, Gustavo Bayma S. da Silva, Osvaldo Oshiro, �dson Bolfe e Mateus Batistella.";
var _INPEstatus;

function remove_layer(node) {
	if(!node.layer){
		return;
	}
	// verifica se a layer � em branco, senao nao exclui
	if( node.layer.CLASS_NAME == "OpenLayers.Layer.OSM" && node.layer.url[0] == "" ){
		return;
	}

	if( node.layer.isBaseLayer && !node.attributes.checked){
		node.layer.map.removeLayer(node.layer);
		return;
	}

	// verifica se a layer esta dentro da pasta de dados externos, que s�o layers adicionadas pelo usu�rio
	if( node.parentNode.id == "user_node"){
	    node.layer.map.removeLayer(node.layer);
		return;
	}
	if(node.layer.params["ISTEMPORAL"]){
		if(arrayTemp[0].id === node.layer.id ) {
			sliderTemporal.close();
			for(var i = 0; i < arrayTemp.length; i++){
				arrayTemp[i].setOpacity(0);
				}
		}
		// remove as layer filhas de uma layer temporal
		controlLayersTemporal( node.layer, 2 );
	}
	// tenta remover a layer da lista de mapas salvos arrayForms
	removeLayerArrayForms( node.layer.id );
}

function criaTree(){
		
	layerRoot = new Ext.tree.TreeNode({
						  text: "Google",
						  expanded: false
	});
		
	// mapas google
	var googleMaps = new GeoExt.tree.BaseLayerContainer({
	                      id: _groupDadosExternos,
						  text: "Capas Base",
						  loader: {
                             baseAttrs: {
                                 iconCls: 'base-layer-icon'
                             }
							 /*filter: function(record) {
							  		    return record.get("layer").group == "background"
								     }	*/							 
                          },
						  leaf: false,
						  map: map,
						  expanded: false
	});
	layerRoot.appendChild(googleMaps); 
	
// Dados Externos
	var noDadosExternos = new GeoExt.tree.LayerContainer({
	                                        id: _usernode,
											text: 'Capas Externas',
											loader: {
											   baseAttrs: {
												   iconCls: 'layer-icon'
											   },
											   filter: function(record) {
												   return record.get("layer").group == _groupDadosExternos|| record.get("group") == _groupDadosExternos;
											   }									   
											},
											map: map,
											expanded: false
	});
	layerRoot.appendChild(noDadosExternos); 

	// Unidades educativas ////////////////////////////////////////////////////////////////////
	var uni_edu = new Ext.tree.TreeNode({
						  text: "Unidades Educativas",
						  expanded: false
	});
	layerRoot.appendChild(uni_edu);
	
	
	// Gestion Estatal
	var gestion_estatal = new GeoExt.tree.LayerContainer({
											text: 'Gestion Estatal',
											loader: {
											   baseAttrs: {
												   //iconCls: 'layer-icon'
											   },
											   filter: function(record) {
														  return record.get("layer").group == "comun"
											   }									   
											},
											map: map,
											expanded: false
		});
	uni_edu.appendChild(gestion_estatal); 

   // otros organismos ////////////////////////////////////////////////////////////////////
	var otros_org = new Ext.tree.TreeNode({
						  text: "Organismos de Educación Descentralizados",
						  expanded: false
	});
    layerRoot.appendChild(otros_org);
  

	// otros organismos
	var org = new GeoExt.tree.LayerContainer({
											text: 'Jefaturas',
											loader: {
											   baseAttrs: {
												   //iconCls: 'layer-icon'
											   },
											   filter: function(record) {
														  return record.get("layer").group == "jef"
											   }	
											   								   
											},
											map: map,
											expanded: false
		});
	otros_org.appendChild(org); 	

	// otros organismos
	var cie = new GeoExt.tree.LayerContainer({
											text: 'CIIE',
											loader: {
											   baseAttrs: {
												   //iconCls: 'layer-icon'
											   },
											   filter: function(record) {
														  return record.get("layer").group == "cie"
											   }	
											   								   
											},
											map: map,
											expanded: false
		});
	otros_org.appendChild(cie); 	

   //predios ////////////////////////////////////////////////////////////////////
	var predios = new Ext.tree.TreeNode({
						  text: "Predios",
						  expanded: false
	});
    layerRoot.appendChild(predios);
	
	// predios
	var parce = new GeoExt.tree.LayerContainer({
											text: 'Predios',
											loader: {
											   baseAttrs: {
												   //iconCls: 'layer-icon'
											   },
											   filter: function(record) {
														  return record.get("layer").group == "predios"
											   }									   
											},
											map: map,
											expanded: false
		});
	predios.appendChild(parce); 	
	
	// Mapas Temáticos
	var tematicos = new GeoExt.tree.LayerContainer({
	                                      	text: 'Mapas Temáticos',
											loader: {
											   baseAttrs: {
												   iconCls: 'layer-icon'
											   },
											  filter: function(record) {
														  return record.get("layer").group == "tematicos"
											   }									   
											},
											map: map,
											expanded: false
	});
	layerRoot.appendChild(tematicos); 
	
	
	// botoes da barra de titulo da TreePanel
	var buttonZoomCamada =  new Ext.Button({
	                          iconCls: 'menu-zoom-to-layer-icon',
							  tooltip: 'Aplicar Zoom na Camada',
							  handler: function(){
							     var node = treePrincipal.getSelectionModel().getSelectedNode();
								 if( node.layer.params["LAYEREXTENT"] ){
								     mapPanel.map.zoomToExtent(node.layer.params["LAYEREXTENT"]);
								 } else {
								     mapPanel.map.zoomToExtent(extent);
								 }
								 
							  }
	});
	
	var buttonRemoverCamada =  new Ext.Button({
	                          iconCls: 'menu-remove-layer-icon',
							  tooltip: 'Remover a Camada',
							  handler: function(){
							    var node = treePrincipal.getSelectionModel().getSelectedNode();
							        remove_layer(node);
							  }
	});
	
	var buttonTemporal =  new Ext.Button({
	                          iconCls: 'menu-temporal-layer-icon',
							  tooltip: 'An�lise Temporal',
							  handler: function(){
							     var node = treePrincipal.getSelectionModel().getSelectedNode();
								 if(!node.layer || node.layer.params["ISTEMPORAL"]){
								   return;
								 }
								 createWindowTemporal( node.layer );
							  }
	});
	
	var buttonOpacity =  new Ext.Button({
	                          iconCls: 'bt-opacity',
							  tooltip: 'Ajuste de Transparencia',
							  handler: function( item, event ){
							     createWindowSliderOpacity().show();
							  }
	});

	var buttonJanelaExclusiva =  new Ext.Button({
	                          iconCls: 'bt-janela-exclusiva',
							  tooltip: 'Janela Exclusiva',
							  handler: function( item, event ){
							     var node = treePrincipal.getSelectionModel().getSelectedNode();
								 if(node.layer.params["ISTEMPORAL"]){
								    controlLayersTemporal( node.layer, 3 );
                                 } else {
								    createWindowMapFromLayer( node.layer ).show(); 
                                 }											
							  }
	});

	var buttonAddLayer =  new Ext.Button({
	                          iconCls: 'menu-add-layer-icon',
							  tooltip: 'Adicionar Capas',
							  handler: function( item, event ){
									
							/*		
									
									var addLayers = new gxp.plugins.AddLayers_Embrapa();
									
									var source = new gxp.plugins.WMSSource({
										id: "local",
										url: "http://192.168.57.20/geoserver/mariano/wms"
									});
									
									//url: "http://132.156.10.87/cgi-bin/atlaswms_en?REQUEST=GetCapabilities"

									addLayers.init({
									 //   proxy: "http://ervamate.cnpm.embrapa.br:8080/geoserver",
									     proxy: " prox/prox.php?url=",
										tools: {},
										layerSources: {
										    "google": _googleSource,
											"bing": _bingSource,
											"ol" : _olSource,
											"osm" : _osmSource,
											"mapbox" : _mapBoxSource,
											"mapquest" : _mapQuestSource,
											"local": source
										},
										on: Ext.emptyFn,
										mapPanel: mapPanel
									});
									source.init({initialConfig: {map: map}, on: Ext.emptyFn, mapPanel: mapPanel});
									//source2.init({initialConfig: {map: map}, on: Ext.emptyFn, mapPanel: mapPanel});
									source.store.load();
									//source2.store.load();
									
								*/	
								    
									_viewer.mapPanel = mapPanel;
			                        _viewer.map = map;
									_viewer.tools.addLayers.showCapabilitiesGrid();
							  }
	});

	var buttonRestaurarForm =  new Ext.Button({
	                          iconCls: 'bt-janela-exclusiva',
							  tooltip: 'Restaurar o Formul�rio',
							  handler: function( item, event ){
							     var node = treePrincipal.getSelectionModel().getSelectedNode();
								 executaRestaurarForm( node.layer.id );
							  }
	});
	
	var buttonSyncJanelasExclusivas =  new Ext.Button({
	                          iconCls: 'bt-sync-maps',
							  tooltip: 'Habilita/Desabilita Sincronia em Janelas Exclusivas',
							  enableToggle: true,
							  toogled: true,
							  handler: function(button,event) {
								  syncJanelasExclusivas = !syncJanelasExclusivas;
							  }
	});
	// deixa o bot�o ajustado para o valor de syncJanelasExclusivas
	buttonSyncJanelasExclusivas.toggle( syncJanelasExclusivas );

	var sub_context_menu_exportar = new Ext.menu.Menu({
							items: [
									{
									   id: 'download-shape',
									   text: 'Exportar p/ Shapefile',
									   iconCls: 'menu-export-shape-layer-icon'
									},
									{
									   id: 'download-kml',
									   text: 'Exportar KML(Google)',
									   iconCls: 'menu-export-kml-layer-icon'
									},
									{
									   id: 'download-csv',
									   text: 'Exportar CSV(Excel)',
									   iconCls: 'menu-export-csv-layer-icon'
									}
							],
							listeners: {
							    beforeshow: function(menu){
								   var node = menu.parentMenu.contextNode;
								   //menu.getComponent("download-pdf").show();
								   menu.getComponent("download-shape").show();
								   menu.getComponent("download-kml").show();
								   menu.getComponent("download-csv").show();

								 
								   if( node.layer.params["DOWNLOAD-SHAPE"] && node.layer.params["DOWNLOAD-SHAPE"] == 'off' ){
								      menu.getComponent("download-shape").hide();
								   }
								  
								
								},
								itemclick: function(item) {
									switch (item.id) {
										case 'download-pdf':
										    var node = item.parentMenu.parentMenu.contextNode;
                                            var arr = new Array();
											arr.push(['request', 'getMap']);
											arr.push(['version', '1.1.0']);
											arr.push(['layers', node.layer.params["LAYERS"]]);
											arr.push(['bbox', '-73.991,-33.752,-28.836,5.272']);
											arr.push(['srsName', 'EPSG:4326']);
											arr.push(['width', '508']);
											arr.push(['height', '512']);
											arr.push(['maxFeatures', '4500']);
											if( node.layer.params["ISWMSPOST"] ){
											   arr.push(['sld_body', node.layer.params["SLD_BODY"]]);
											   arr.push(['cql_filter', node.layer.params["FILTER_CQL"] ]);
											}
											downloadLayer( owsUrl, "WMS", arr, "application/pdf" );
											break;	
										case 'download-shape':
										    var node = item.parentMenu.parentMenu.contextNode;
											var arr = new Array();
											arr.push(['request', 'getFeature']);
											arr.push(['typeName', node.layer.params["LAYERS"]]);
											arr.push(['request', 'getFeature']);
											arr.push(['srsName', 'EPSG:4326']);
											arr.push(['maxFeatures', '4500']);
											if( node.layer.params["ISWMSPOST"] ){
											   arr.push(['sld_body', node.layer.params["SLD_BODY"]]);
											   arr.push(['cql_filter',node.layer.params["FILTER_CQL"]]);
											   arr.push(['propertyName', node.layer.params['ATRIBUTOS']]);
											   arr.push(['viewparams', node.layer.params['VIEWPARAMS']]);
											}   
											downloadLayer( wmsUrl, "WFS", arr, "SHAPE-ZIP" );
											break;
                                        case 'download-kml':
										    var node = item.parentMenu.parentMenu.contextNode;
                                            var arr = new Array();
											arr.push(['request', 'getMap']);
											arr.push(['version', '1.1.0']);
											arr.push(['layers', node.layer.params["LAYERS"]]);
											arr.push(['bbox', '-73.991,-33.752,-28.836,5.272']);
											arr.push(['srsName', 'EPSG:900913']);
											arr.push(['width', '508']);
											arr.push(['height', '512']);
											arr.push(['maxFeatures', '4000']);
											if( node.layer.params["ISWMSPOST"] ){
											   arr.push(['sld_body', node.layer.params["SLD_BODY"]]);
											   arr.push(['cql_filter', node.layer.params["FILTER_CQL"] ]);
											   arr.push(['propertyName', node.layer.params['ATRIBUTOS']]);
											   arr.push(['viewparams', node.layer.params['VIEWPARAMS']]);
											}
											downloadLayer( owsUrl, "WMS", arr, "kml" );
											
											break;											
										case 'download-csv':
										    var node = item.parentMenu.parentMenu.contextNode;
											var arr = new Array();
											arr.push(['request', 'getFeature']);
											arr.push(['typeName', node.layer.params["LAYERS"]]);
											arr.push(['request', 'getFeature']);
											arr.push(['srsName', 'EPSG:900913']);
											arr.push(['maxFeatures', '4500']);
											if( node.layer.params["ISWMSPOST"] ){
											   arr.push(['sld_body', node.layer.params["SLD_BODY"]]);
											   arr.push(['cql_filter',node.layer.params["FILTER_CQL"]]);
											   arr.push(['viewparams', node.layer.params['VIEWPARAMS']]);
											   // retira o the_geom dos atributos
											   var atributos = node.layer.params['ATRIBUTOS'];
											   atributos = atributos.replace(",the_geom","");
											   atributos = atributos.replace("the_geom","");
											   arr.push(['propertyName', atributos]);
											}   
											downloadLayer( owsUrl, "WFS", arr, "CSV" );
											break;
											
									}
								}
							}
					 });

	var treePrincipal = new Ext.tree.TreePanel({
					 title: "Capas",
					 region: "north",
					 width: sizePanelEsquerdo - 1,
					 collapsible: false,
					 collapseMode: 'mini',
					 autoScroll:true,
					 enableDD: true,
					 lines: false,
					 rootVisible: false,
					 root: layerRoot,
					 tbar:[buttonZoomCamada, buttonAddLayer, buttonRemoverCamada, /*buttonTemporal,*/ buttonOpacity /*, buttonJanelaExclusiva, buttonSyncJanelasExclusivas*/],
					//  tbar:[buttonZoomCamada, buttonAddLayer, buttonRemoverCamada, /*buttonTemporal,*/ buttonOpacity, buttonJanelaExclusiva, buttonSyncJanelasExclusivas],
					 contextMenu: new Ext.menu.Menu({
							items: [
									{
									   id: 'metadados',
									   text: 'Visualizar Metadados',
									   iconCls: 'menu-export-csv-layer-icon'
                                    },	 
									{
									   id: 'zoom-node',
									   text: 'Aplicar Zoom a la Capa',
									   iconCls: 'menu-zoom-to-layer-icon'
									},
									{
									   id: 'remove-node',
									   text: 'Remover a Camada',
									   iconCls: 'menu-remove-layer-icon'
									},
									{
									   id: 'temporal-node',
									   text: 'An�lise Temporal',
									   iconCls: 'menu-temporal-layer-icon'
									},
									{
									   id: 'opacity-node',
									   text: 'Ajustar Transparencia',
									   iconCls: 'bt-opacity'
									},
									{
									   id: 'window-node',
									   text: 'Ventana Exclusiva',
									   iconCls: 'bt-janela-exclusiva'
									},
									{
									   id: 'window-close-node',
									   text: 'Fechar Janelas Exclusivas',
									   iconCls: 'bt-close-janela-exclusiva'
									},
									{
									   id: 'chart-ranking',
									   text: 'Ver gr�fico de barras do ranking',
									   iconCls: 'bt-chart'
									},
									{
									   id: 'restaurar-formulario',
									   text: 'Abrir Formul�rio Consulta',
									   iconCls: 'bt-form'
									},
									
									new Ext.menu.Item({
									         id: 'export-menu', 
									         iconCls: 'menu-export-layer-icon',   
		                                     text: 'Exportar para:'
		                                     //menu: sub_context_menu_exportar                    
			                        }) 
							],
							listeners: {
							    beforeshow: function(menu){
								   var node = menu.contextNode;
								   
								   if( !node.layer || !node.layer.params ){
								     return;
								   }	 
								   
								   menu.getComponent("temporal-node").hide();
								   menu.getComponent("zoom-node").hide();
								   menu.getComponent("opacity-node").hide();
								   menu.getComponent("window-node").hide();
								   menu.getComponent("window-close-node").hide();
								   menu.getComponent("export-menu").hide();
								   menu.getComponent("restaurar-formulario").hide();
								   menu.getComponent("chart-ranking").hide();
								   menu.getComponent("remove-node").show();
								   
								   menu.getComponent("metadados").hide();
								   if( _layersParams[node.layer.params["LAYERS"]] ){
								      menu.getComponent("metadados").show();
								   }

								   if( !(node.parentNode.id == _usernode || node.layer.params["ISWMSPOST"]) ){
								      menu.getComponent("remove-node").hide();
								   }
								   
								   if( node.isBaseLayer ){
								      menu.getComponent("remove-node").show();
								   }
								   								   
								   if( !node.layer.isBaseLayer ){
								      menu.getComponent("zoom-node").show();
								      menu.getComponent("opacity-node").show();
								      menu.getComponent("window-node").show();
								   }	  
								   
								   if(node.layer.params["ISTEMPORAL"]){
									   menu.getComponent("temporal-node").show();
								   } else {
									   menu.getComponent("temporal-node").hide();
									   if( node.layer.params["EXPORT-MENU"] ){
										  menu.getComponent("export-menu").show();
									   }
								   }
								   
								   if( node.layer.params["ISWMSPOST"] ){
									  menu.getComponent("restaurar-formulario").show();
								   }
								   
								   if(node.layer.params["ARRAYWINDOWS"] && node.layer.params["ARRAYWINDOWS"].length > 0){
									   menu.getComponent("window-close-node").show();
								   } else {
									   menu.getComponent("window-close-node").hide();
								   }
								   
								   if(node.layer.params["VARIAVEL"]){
									   menu.getComponent("chart-ranking").show();
								   }
								   
								},
								itemclick: function(item) {
									switch (item.id) {
									    case 'metadados':
										      var node = item.parentMenu.contextNode;
										      var id = _layersParams[node.layer.params["LAYERS"]].params["metadata"];
											  new Ext.Window({
												  title      : 'Metadados',
												  layout     : 'form',
												  width      : 1000,
												  height     : 500,
												  iconCls    : 'bt-help',
												  bodyStyle  : 'padding: 5px',
												  autoScroll : true,
												  autoLoad:{
															  url:'http://geoinfo.cnpm.embrapa.br/geonetwork/srv/por/metadata.show.embedded?uuid=' + id
														   }
											  }).show();
											  break;	   
										case 'zoom-node':
											var node = item.parentMenu.contextNode;
											if( !node.layer.params["LAYEREXTENT"] ){
											    mapPanel.map.zoomToExtent(extent);
												break;
											}
											mapPanel.map.zoomToExtent(node.layer.params["LAYEREXTENT"]);
											break;
										case 'remove-node':
											var node = treePrincipal.getSelectionModel().getSelectedNode();
											remove_layer(node);
											break;	
										case 'temporal-node':
										    var node = item.parentMenu.contextNode;
											if(!node.layer){
											   return;
											}
										    createWindowTemporal( node.layer );
											break;
										case 'opacity-node':
										    var node = item.parentMenu.contextNode;
											createWindowSliderOpacity(node.layer).show();
											break;
										case 'window-node':
										    var node = item.parentMenu.contextNode;
											if(node.layer.params["ISTEMPORAL"]){
											   controlLayersTemporal( node.layer, 3 );
                                            } else {
											   createWindowMapFromLayer( node.layer ).show(); 
                                            }											
											break;	
										case 'window-close-node':
										    var node = item.parentMenu.contextNode;
											if(node.layer.params["ARRAYWINDOWS"]){
											   var wind = node.layer.params["ARRAYWINDOWS"];
											   for(var i = 0; i < wind.length; i++){
											       if( wind[i] ){
											           wind[i].close();
												   }	   
											   }
											   node.layer.params["ARRAYWINDOWS"] = new Array();
                                            }											
											break;	
										case 'chart-ranking':
										    var node = item.parentMenu.contextNode;
											chartBarrasConsultaRanking( node.layer.params["SQL"], node.layer.params["VARIAVEL"] )
											break;	
										case 'restaurar-formulario':
										    var node = item.parentMenu.contextNode;
											executaRestaurarForm( node.layer.id );	
											break;	 
											
									}
								}
							}
					 }),
					 listeners: {
                                         click: function(node, event){
										        if( node.layer && node.layer.isBaseLayer ){
												   return;
                                                }
                                                sliderTreeImg.setLayer(node.layer); 
                                         },
										 checkchange: function(node, checked){
										 
										        // mostra uma mensagem com informa��es sobre a camada ... especifico para algumas layers do INPE
										        if( !_INPEstatus && (node.layer.params != undefined)){
												   if( node.layer.params.LAYERS == "geodb:agric_anual_br_1011_inpe" ||
												       node.layer.params.LAYERS == "geodb:agric_anual_br_0708_inpe" ||
													   node.layer.params.LAYERS == "geodb:agric_anual_br_0203_inpe" ){
													   _INPEstatus = Ext.MessageBox.show({
														   msg: _tipINPE,
														   width:600,
														   wait:false
													   });
												   }	   
											    } 
										 
										        if( node.layer.isBaseLayer ){
												   return;
                                                }  												
										        if( checked ) { 
												   node.select();
                                                   sliderTreeImg.setLayer(node.layer);
                                                   //mapPanel.map.zoomToExtent(layerExtentTo(node.layer, arrayBounds));																								   
												   
												   if(node.layer.params["ISTEMPORAL"]){
												      // seta a visibility das layers para true
												      controlLayersTemporal( node.layer, 1 );
												      // necessario pra colocar a layer temporal em seu estado inicial, pois ao fechar
												      // o slider n�o necessariamente o vetor de layers esta em sua posi��o inicial.
												      if(arrayTemp[0].id === node.layer.id) {arrayTemp[0].opacity = 0.9 }
												   }
												} else {
												   if(node.layer.params["ISTEMPORAL"]){
												      // seta a visibility das layers para false
												      controlLayersTemporal( node.layer, 0 );
												   if(arrayTemp[0].id === node.layer.id )
												      sliderTemporal.close();
												   }
												}
												if( node.layer.params["SPOT-ANIM"] ){ 
													if( checked ) { 
														createWindowTemporalSpot( node.layer, "SPOT-ANIM", "LABEL-ANIM", "Imagens IVP" );
													} else {
														for(var i = 1; i < arrayTempSpot.length; i++){
															if( arrayTempSpot[i].getVisibility() == true){
																arrayTempSpot[i].setVisibility(false);
																break;
															}
														}
														if (arrayTempSpot[0].displayInLayerSwitcher == false){
															arrayTempSpot[0].displayInLayerSwitcher = true;
														}
														if(sliderTemporalSpot) { sliderTemporalSpot.close(); }
													}
													
												}	
                                         },
                                         contextmenu: function(node, e) {
										        // n�o habilita o menu se for baseLayer e estiver selecionada
                                                if(node.layer.isBaseLayer && node.layer.visibility){
												   return;
												}   
										        node.select();
												var c = node.getOwnerTree().contextMenu;
												c.contextNode = node;
												c.showAt(e.getXY());
										} 										 
                     }
	});
	
	return treePrincipal;

}
