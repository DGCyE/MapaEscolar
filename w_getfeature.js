function criaControleGetFeatureInfo(url, layers){
   // Controle de para habilitar a consulta dos atributos da layer ao clicar
   infoControls = {
   
		click: new OpenLayers.Control.WMSGetFeatureInfo({
			url: url,
			title: 'Identify features by clicking',
			layers: map.layers,
			queryVisible: true,
			infoFormat:'application/vnd.ogc.gml',
			eventListeners: {
				getfeatureinfo: function(event) {
					map.addPopup(new OpenLayers.Popup.FramedCloud(
						"chicken",
						map.getLonLatFromPixel(event.xy),
						null,
						GenPopText(event),
						null,
						true
					));
			}}
		}),
		hover: new OpenLayers.Control.WMSGetFeatureInfo({
			url: url,
			title: 'Identify features by clicking',
			layers: layers,
			hover: true,/*
			// defining a custom format options here
			formatOptions: {
				typeName: 'municipios',
				featureNS: 'http://geoserver.cnpm.embrapa.br/geodb'
			},*/
			queryVisible: true,
			infoFormat:'text/html'
			})
		};
		for (var i in infoControls) {
			infoControls[i].events.register("getfeatureinfo", this, showInfo);
			map.addControl(infoControls[i]);
		}
		return infoControls;
}

function showInfo(evt) {
	if (evt.features && evt.features.length) {
		 highlightLayer.destroyFeatures();
		 highlightLayer.addFeatures(evt.features);
		 highlightLayer.redraw();
	} else {
		$('nodelist').innerHTML = evt.text;
	}
}
		
function GenPopText(evt){
    var temstr= "<b><i>" + evt.features[0].gml.featureType + "</i></b><br/>";
	for(var key in evt.features[0].attributes)
	{
	   temstr += "<b>" + key + "</b>:" + evt.features[0].attributes[key] + "<br/>";
	}
	return temstr;
}