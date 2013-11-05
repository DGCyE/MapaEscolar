var length;
var area;
var lengthButton;
var areaButton;
var navButton;
var tootleGroup;
var imgLocation = OpenLayers.Util.getImagesLocation();

function geraBotoesMedicao(map){
    length = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
        eventListeners: {
            measure: function(evt) {
			    new Ext.Window({
								height: 70,
								width:  300,
								resizable: false,
								title: "Medidor de Distancias",
								html: "A distancia e de " + evt.measure.toFixed(3) + " " + evt.units,
								modal: true
					}).show(); 
            }
        }
    });


    area = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
        eventListeners: {
            measure: function(evt) {
                new Ext.Window({
								height: 70,
								width:  300,
								resizable: false,
								title: "Medidor de Areas",
								html: "A area e de " + evt.measure.toFixed(3) + " " + evt.units + "2",
								modal: true
					}).show(); 
            }
        }
    });


    map.addControl(length);
    map.addControl(area);
    toggleGroup = "Controles de Medidas";
	Ext.QuickTips.init();


    lengthButton = new Ext.Button({
		tooltip: 'Medir Distancias',
		cls: 'length x-btn-icon filter-btn',
        enableToggle: true,
        toggleGroup: toggleGroup,
        handler: function(toggled){
            if (toggled) {
                area.deactivate();
                length.activate();
            } else {
                length.deactivate();
                area.deactivate();
                navigation.activate();
            }
        }
    });


    areaButton = new Ext.Button({
		tooltip: 'Medir Areas',
		cls: 'polygon x-btn-icon filter-btn',
        enableToggle: true,
        toggleGroup: toggleGroup,
        handler: function(toggled){
            if (toggled) {
                length.deactivate();
                area.activate();
            } else {
                area.deactivate();
                length.deactivate();
                navigation.activate();
            }
        }
    });



    navButton = new Ext.Button({
		tooltip: 'Navegacao',
		cls: 'navigation x-btn-icon filter-btn',
        enableToggle: true,
        toggleGroup: toggleGroup,
        handler: function(toggled){
            if (toggled) {
			    length.deactivate();
                area.deactivate();
                navigation.activate();
            }
        }
    });                                
	


}	


function createMeasureControl(handlerType, title) {
	
	var styleMap = new OpenLayers.StyleMap({
		"default": new OpenLayers.Style(null, {
			rules: [new OpenLayers.Rule({
				symbolizer: {
					"Point": {
						pointRadius: 4,
						graphicName: "square",
						fillColor: "white",
						fillOpacity: 1,
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#333333"
					},
					"Line": {
						strokeWidth: 3,
						strokeOpacity: 1,
						strokeColor: "#666666",
						strokeDashstyle: "dash"
					},
					"Polygon": {
						strokeWidth: 2,
						strokeOpacity: 1,
						strokeColor: "#666666",
						fillColor: "white",
						fillOpacity: 0.3
					}
				}
			})]
		})
	});

	var cleanup = function() {
		if (measureToolTip) {
			measureToolTip.destroy();
		}   
	};

	var makeString = function(metricData) {
		var metric = metricData.measure;
		var metricUnit = metricData.units;
		
		measureControl.displaySystem = "english";
		
		var englishData = metricData.geometry.CLASS_NAME.indexOf("LineString") > -1 ?
		measureControl.getBestLength(metricData.geometry) :
		measureControl.getBestArea(metricData.geometry);

		var english = englishData[0];
		var englishUnit = englishData[1];
		
		measureControl.displaySystem = "metric";
		var dim = metricData.order == 2 ? 
		'<sup>2</sup>' :
		'';
		
		// texto apresentado ao consultar uma medida de dist�ncia ou area
		// nas ferramentas de medi��o
		return metric.toFixed(2) + " " + metricUnit + dim; //+ "<br>" + 
			//english.toFixed(2) + " " + englishUnit + dim;
	};
	
	var measureToolTip; 
	var measureControl = new OpenLayers.Control.Measure(handlerType, {
		persist: true,
		handlerOptions: {layerOptions: {styleMap: styleMap}},
		eventListeners: {
			measurepartial: function(event) {
				cleanup();
				measureToolTip = new Ext.ToolTip({
					html: makeString(event),
					title: title,
					autoHide: false,
					closable: true,
					draggable: false,
					mouseOffset: [0, 0],
					showDelay: 1,
					listeners: {hide: cleanup}
				});
				if(event.measure > 0) {
					var px = measureControl.handler.lastUp;
					var p0 = this.mapPanel.getPosition();
					measureToolTip.targetXY = [p0[0] + px.x, p0[1] + px.y];
					measureToolTip.show();
				}
			},
			measure: function(event) {
				cleanup();                    
				measureToolTip = new Ext.ToolTip({
					target: Ext.getBody(),
					html: makeString(event),
					title: title,
					autoHide: false,
					closable: true,
					draggable: false,
					mouseOffset: [0, 0],
					showDelay: 1,
					listeners: {
						hide: function() {
							measureControl.cancel();
							cleanup();
						}
					}
				});
			},
			deactivate: cleanup,
			scope: this
		}
	});

	return measureControl;
}


function getLengthButton(){
    return lengthButton;
}


function getAreaButton(){
    return areaButton;
}


function getNavButton(){
    return navButton;
}

