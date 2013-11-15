var layerEscuelasCql = new OpenLayers.Layer.WMS("Escuelas Filtradas", "http://192.168.54.20/geoserver/mariano/wfs", {
    layers: "mariano:v_escuelas_geoserver",
    transparent:true,
    cql_filter: 'sector = 20',
    format: 'image/png'
  },{
    isBaseLayer: false, visibility: false, group: "consulta"
});
var addCQLlayer = function(cql,ambito){
  layerEscuelasCql.mergeNewParams({
    'cql_filter':cql,
    'styles': (ambito==false)?'':'Escuelas_A'
  });
  layerEscuelasCql.setVisibility('true');
}
