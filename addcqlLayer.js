var layer = new OpenLayers.Layer.WMS("CQL","http://25.161.221.52/geoserver/mariano/wms",
  {
    layers: 'mariano:v_escuelas_geoserver',
    cql_filter: "",
    transparent:true
   },
   {isBaseLayer: false, visibility: true, ratio: 1, singleTile: true}
);
var added = false;
var addCQLlayer = function(cql){
       if(!added){
          app.mapPanel.map.addLayer(layer);  
          added = true;
       };
       layer.mergeNewParams({'cql_filter':cql});
}

