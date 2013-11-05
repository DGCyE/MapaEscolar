var _arrayCoresLength = 6; // armazena a quantidade de cores que o jenks dever� trabalhar
var _FORM_SQL = 'form_SQL';

function createWindowQuerieSQL(layerName, notDisplay){

   // cria o combo para apresentar os tipos de rebanhos
   var storeBases = createStoreBases();
   var comboBases = new Ext.form.ComboBox({
        id: 'comboBases',
        store: storeBases,
        displayField: 'base',
        typeAhead: true,
		allowBlank: false,
		blankText: '� obrigat�rio escolher o tipo de base ...',
        mode: 'local',
		editable: false,
        fieldLabel: 'Base',
        anchor: '100%',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Selecione uma base ...',
        selectOnFocus:true
   });
   
   var form = new Ext.FormPanel({
        id: _FORM_SQL,
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 629,
        items: [ 
		        {
		        id: 'criterio',
				ref: '../criterio',
		        xtype:'textarea',
                fieldLabel: 'Clausula SQL',
				anchor: '100%',
                name: 'criterio',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
               },
			   comboBases,
		       {
		        id: 'variavel',
				ref: '../variavel',
		        xtype:'textfield',
                fieldLabel: 'Variavel para a classifica��o Jenks',
				anchor: '100%',
                name: 'variavel',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			    {
				id: 'camada', 
				ref: '../camada',
				xtype:'textfield',
				fieldLabel: 'Titulo da Camada',
				anchor: '100%',
				name: 'camada',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
				}				
			   ],
        buttons: [{
            text: 'Gerar Camada',
			handler: function(){
			   form_SQL_handler(form, layerName); 
			}
        }]
    }); 
	
	// tenta restaurar os valores do form
	restauraForm( layerName, form );
	
	// quando a function for executada pelo carregamento de mapas do banco de dados, n�o executa a window
	if( notDisplay ){
	   return form;
	}
	
	return new Ext.Window({
					title: 'Consulta SQL',
					height: 300, 
					width: 600,
					layout: 'fit',
					resizable: true, 
					iconCls: 'bt-query',
					items: [ form ]
		      });

}

function form_SQL_handler(form, layerName, notDisplay){

   try{

   

   // faz a valida��o dos campos
   var criterio     = form.findById('criterio').getValue();
   var base         = form.findById('comboBases').getValue();
   var variavel     = form.findById('variavel').getValue();
   var camada       = form.findById('camada').getValue();
   
   
   
   if( !notDisplay && (criterio == '' || base == '' || variavel == '' || camada == '')){
	  alert("Verifique os campos acima que s�o de preenchimento obrigat�rio !!");
	  return;
   }
   
   // pega a string ap�s a clausula where para separar o criterio da sql
   var filtro = criterio.substring( criterio.indexOf("where") + 6, criterio.length );
   
   // guarda o criterio original para ser usado na consulta para o Jenks
   var criterioOriginal = criterio;
   
   // altera a ocorrencia da , (virgula) para o \\, resolvendo o problema ao submeter ao geoserver
   criterio = criterio.replace(/\,/g, "\\,");
   
   // define em qual view a consulta sera aplicada dependendo pela base escolhida pelo usuario
   var nomeLayer;
   if( base == "Censo IBGE" ){
	   base = "vw_pam_all_shapes";
	   nomeLayer = "geodb:view_censo";
   } else if( base == "Rebanhos" ){
	   base = "vw_ppm_efetivo_rebanho";
	   nomeLayer = "geodb:vw_ppm_efetivo_rebanho";
   } else if( base == "Creditos" ){
	   base = "vw_cred_shapes";
	   nomeLayer = "geodb:vw_cred";
   } else if( base == "Credito ABC" ){
	   base = "vw_abc_shapes";
	   nomeLayer = "geodb:vw_abc";
   }
   
   
   var label  = "${municipio} (${" + variavel + "})";
   
   // notDisplay diz para a function que ela esta sendo chamada pelo metodo de carregamento de mapas do banco de dados 	 
   if( !notDisplay  ){
	   var msg = Ext.MessageBox.show({
									   msg: 'Processando a consulta',
									   progressText: 'consultando...',
									   width:300,
									   wait:true,
									   waitConfig: {interval:50}
	   });  
   }	  

   criterioOriginal = criterioOriginal.replace("%", "\%");   
   
   var storeMinMax = new Ext.data.JsonStore({
								autoDestroy: true,
								proxy : new Ext.data.HttpProxy({
									method: 'POST',
									url: urlJSP + "sql_json.jsp?sql=" + criterioOriginal
								}),
								storeId: 'myStore',
								autoLoad: false,
								root: 'raiz',
								fields: [
										  {name: variavel}
										]
   });
   storeMinMax.load( {callback:function(r, options, sucess){
						   var valores = storeMinMax.getRange();
						   
						   // JENKS - restringe consultas > de 13000 valores
						   if( valores.length > 13000 ){
						      msg_aviso_consulta_muito_grande();
							  msg.hide();
							  return;
						   }
						   
						   MyRecordType = Ext.data.Record.create(['titulo', 'criterio', 'cor', 'label']); 			   
						   var arrayRange = generateLegendasCores( "" ,variavel, valores );
						   var store = new Ext.data.Store();
						   for( var i = 0; i < arrayRange.length; i++ ){
							  var myrec = new MyRecordType({"titulo":arrayRange[i][1], "criterio":arrayRange[i][2], "cor":arrayRange[i][0], "label":label});
							  store.add(myrec);
						   }
						   
						   // tenta excluir a layer da arvore se ela ja existir
						   resetLayer( layerName );
						   // tenta exluir a layer da lista arrayForms
						   removeLayerArrayForms( layerName );
						   
						   var wms = addLayerUserSQL(camada, store, false, 2000, 2000, filtro, criterio, nomeLayer, layerName, notDisplay);
						   if (msg) msg.hide();
						   
						   saveForm( wms.id, form );
						   
						   if( windowQuerieSQL ) windowQuerieSQL.close();
					  } }
   );
   
   } catch( e ) {
      if( msg ) msg.hide();
   }
   
   
} 

function generateLegendasCores( criterio, variavel, valores ){

    // faz o sort dos valores para criar os ranges corretos
	valores.sort( function(a,b){
	    if( parseInt(a.data[variavel]) == parseInt(b.data[variavel]) ){
		   return 0;
		}
		return parseInt(a.data[variavel]) > parseInt(b.data[variavel]) ? 1 : -1;
	});

	// prepara a lista de valores
	var lista = new Array();
	for(var i = 0; i < valores.length; i++){
	   lista.push( parseInt(valores[i].data[variavel]) );
	}
	
	var arrayCores = new Array();
	arrayCores.push("#FAF9C5");
	arrayCores.push("#FAF605");
	arrayCores.push("#FAD046");
	arrayCores.push("#FA9C05");
	arrayCores.push("#FA0505");

	// gera as classes entre os valores
	var maxClasses = valores.length >= arrayCores.length ? arrayCores.length : valores.length;
	var arrayCriterios = new Array();
	var classes = getJenksBreaks( lista, maxClasses );
	
	for(var i = 0; i <= classes.length - 2; i++){
	    if( !classes[i+1] ) continue;
	    var rangeInicial = classes[i];
		var rangeFinal   = classes[i+1];
		if( i == classes.length - 2 ) rangeFinal++;
		var simbolo1 = ">=";
		var simbolo2 = i == classes.length-2 ? "<=" : "<";
		var criterioEsp  = criterio + variavel + simbolo1 + rangeInicial + " and " + variavel + simbolo2 + rangeFinal;
	    arrayCriterios.push( [ arrayCores[i], '' + rangeInicial + ' - ' + rangeFinal, criterioEsp, rangeInicial, rangeFinal ] );
	}
	
	return arrayCriterios;

}


function generateLegendasCores_sql( criterio, variavel, lista ){
	
	var arrayCores = new Array();
	arrayCores.push("#FAF9C5");
	arrayCores.push("#FAF605");
	arrayCores.push("#FAD046");
	arrayCores.push("#FA9C05");
	arrayCores.push("#FA0505");
	
	var arrayCriterios = new Array();
		
	//arrayCriterios.push( [ arrayCores[0], ' < ' + lista[0], criterioEsp, 0, lista[0] ] );	
	for(var i = 0; i <= lista.length; i++){
		if( !lista[i+1] ) continue;
		var rangeInicial = lista[i];
		var rangeFinal   = lista[i+1];
		if( i == lista.length - 2 ) rangeFinal++;
		var simbolo1 = ">=";
		var simbolo2 = i == lista.length.length-2 ? "<=" : "<";
		var criterioEsp  = criterio + variavel + simbolo1 + rangeInicial + " and " + variavel + simbolo2 + rangeFinal;
		arrayCriterios.push( [ arrayCores[i], '' + rangeInicial + ' - ' + rangeFinal, criterioEsp, rangeInicial, rangeFinal ] );
	}
	//arrayCriterios.push( [ arrayCores[arrayCores.length-1], ' > ' + lista[lista.length-1], criterioEsp, lista[lista.length-1], 1000000*1000 ] );	
	
	return arrayCriterios;

}

    
function createStoreAnosRebanhos(){

	// le os anos do banco de dados
	var store = new Ext.data.JsonStore({
		autoDestroy: true,
		url: urlJSP + 'sql_json.jsp?sql=select distinct ano from vw_ppm_efetivo_rebanho order by ano',
		storeId: 'myStore',
		autoLoad:true,
		root: 'raiz',
		mode: 'local',
		idProperty: 'ano',
		fields: ['ano'],
		sortInfo: {
                    field: 'ano',
                    direction: 'ASC' 
                  }
	});
	
	return store;

}

function createStoreBases(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'base'}
       ]
   });

   var array = new Array();
   array.push( ["Censo IBGE"] );
   array.push( ["Rebanhos"] );
   array.push( ["Creditos"] );
   array.push( ["Credito ABC"] );
   store.loadData(array);
   
   return store;

}	


	
	
