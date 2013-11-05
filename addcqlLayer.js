var layerEscuelas;
var addCQLlayer = function(cql,ambito){
  layerEscuelas.mergeNewParams({
    'cql_filter':cql,
    'styles': (ambito==false)?'':'Escuelas_A'
  });
  layerEscuelas.setVisibility('true');
}

