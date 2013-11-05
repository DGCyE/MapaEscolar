function createStoreMunicipios(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'distritos.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'nuevo',
    fields: ['distrito','nuevo','punto'],
    sortInfo: {
                    field: 'nuevo',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
} 

function createStoreModNiv(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'mod_niv.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'idoferta',
    fields: ['descripcionoferta','idoferta'],
    sortInfo: {
                    field: 'idoferta',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
} 

function createStoreSector(){

    // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
   autoDestroy: true,
    autoLoad:true,
    url: 'sector.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'idsector',
    fields: ['descripcion','idsector'],
    sortInfo: {
                    field: 'idsector',
                    direction: 'DESC' 
                  }
  });
  
  return store;
  
} 

function createStoreDominio(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'dominio.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'dominio',
    fields: ['descripcion','dominio'],
    sortInfo: {
                    field: 'descripcion',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
} 

function createStoreIndicador(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'indi.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'nuevo',
    fields: ['descripcion','indicador'],
    sortInfo: {
                    field: 'descripcion',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
} 

function createStorePeriodos(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'periodos.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'nuevo',
    fields: ['descripcionperiodo','idperiodo'],
    sortInfo: {
                    field: 'descripcionperiodo',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
} 
         
function createStoreOfertas(){

  // le os culturas do banco de dados
  var store = new Ext.data.JsonStore({
    autoDestroy: true,
    autoLoad:true,
    url: 'ofertas.php',
  //  storeId: 'myStore',
    root: 'data',
    totalProperty: 'total',
    idProperty: 'descripcionoferta',
    fields: ['descripcionoferta','oferta'],
    sortInfo: {
                    field: 'descripcionoferta',
                    direction: 'ASC' 
                  }
  });
  
  return store;
  
}

function createStoreVariaveis(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'variavel'}
       ]
   });

   var array = new Array();
   array.push( ["�rea Plantada"] );
   array.push( ["�rea Colhida"] );
   array.push( ["Quantidade Produzida"] );
   array.push( ["Valor da Produ��o"] );
   array.push( ["Produtividade"] );
   
   store.loadData(array);
   
   return store;

}

function createStoreRelevos(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'relevo'}
       ]
   });

   var array = new Array();
   array.push( ["Plano"] );
   array.push( ["Ondulado Suave"] );
   array.push( ["Ondulado Moderado"] );
   array.push( ["Ondulado"] );
   array.push( ["Ondulado Forte"] );
   array.push( ["Montanhoso"] );
   
   store.loadData(array);
   
   return store;

}

function createStoreSimbolos(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'simbolo'}
       ]
   });

   var array = new Array();
   array.push( [">"] );
   array.push( [">="] );
   array.push( ["<"] );
   array.push( ["<="] );
   array.push( ["="] );
   array.push( ["<>"] );
   
   store.loadData(array);
   
   return store;

}

function createStoreRanking(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'ranking'}
       ]
   });

   var array = new Array();
   array.push( ["5"] );
   array.push( ["10"] );
   array.push( ["20"] );
   array.push( ["50"] );
   array.push( ["100"] );

   store.loadData(array);
   
   return store;

}




