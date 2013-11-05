var urlJSP = ""; // retirar qndo passar para a nova vers�o do soma

// array que armazena os dados dos formul�rios das layers de consulta do usuario
var arrayForms = new Array();
// armazena o nome do mapa atual que o usu�rio est� usando, se este foi carregado
var _mapaAtual;
// armazena a window do formulario de salvar o mapa
var windowSaveMapa;
// armazena a window do formulario de Meus Mapas
var windowMeusMapas;


// exclui uma layer da arvore se ela ja existir
function resetLayer( layerName ){

   if( !layerName ){
     return;
   }	 
  
   if( existsLayerName( layerName ) ){
       
	   // navega pela arvore procurando pela layer para remover
	   layerRoot.cascade(function(node){
           if( node.layer && node.layer.id == layerName ){
		      if(node.layer.params["ISTEMPORAL"]){
				  // remove as layer filhas de uma layer temporal
				  controlLayersTemporal( node.layer, 2 );
			  }
			  node.layer.map.removeLayer(node.layer);
			  return;
		   }
       });
   }

}

// exclui todas as layers do usu�rio da �rvore
function limpaLayersTree(){

   // array que armazena as layers que devem ser excluidas, para evitar de excluir uma layer e faltar outra dentro do m�todo layerRoot.cascade
   var arrayTemp = new Array();

   // navega pela arvore procurando pela layer para remover
   layerRoot.cascade(function(node){
           //if( node.layer && node.layers && node.layers.params && node.layer.params["ISWMSPOST"] ){
           if( node.layer && node.layer.params && node.layer.params["ISWMSPOST"] ){
		      if(node.layer.params["ISTEMPORAL"]){
				  // remove as layer filhas de uma layer temporal
				  controlLayersTemporal( node.layer, 2 );
			  }
			  arrayTemp.push(node.layer);
		   }
   });
   
   for(var i = 0; i < arrayTemp.length; i++ ){
      arrayTemp[i].map.removeLayer(arrayTemp[i]);   
   }

}

// exclui a layer da arrayForms
function removeLayerArrayForms( layerName ){
   for( var i = 0; i < arrayForms.length; i++){
   	  if( arrayForms[i].layerName == layerName ){
	      arrayForms.splice(i,1);
	  }
   }
}



// salva um form em arrayForms
function saveForm( layerName, form ){

   var aValores = new Array();
   
   // preenche o array com o nome do componente do foruml�rio e seu valor
   for( var i = 0; i < form.form.items.items.length; i++ ){
      var id = form.form.items.items[i].id;
	  var value = form.findById(id).getValue();
	  // pega o valor de ref para verificar se o campo � normal (no caso da grid da consulta avan�ada, s�o incluidos itens fora do form que come�am o id com ext) para filtrar
	  var ref = id.substring(0,3) == 'ext' ? false : true;
	  if( ref ){
	     aValores.push( { id: id, value: value} );
	  }	 
   }
   
   // verifica se encontra um grid para gravar a store
   var grid = form.findById('grid');
   if( grid ){
	   var arrayGrid = new Array();
	   for(var i = 0; i < grid.store.data.length; i++){
	        var values = {label: grid.store.getAt(i).get('label'), titulo : grid.store.getAt(i).get('titulo'), criterio: grid.store.getAt(i).get('criterio'), cor: grid.store.getAt(i).get('cor')};
			arrayGrid.push(values);
	   }	
	   aValores.push( { id: 'grid', value: arrayGrid} );
   }	   

   var aPrincipal = { layerName: layerName, formId: form.id, valores: aValores };
   
   if( existsLayerName( layerName ) ){
      arrayForms[ layerName ] = aPrincipal;
   } else {
      arrayForms.push( aPrincipal );
   }	  

}

// restaura os valores guardados no arrayForms para um form especifico
function restauraForm( layerName, form ){

   // procura pela layerName no array de forms
   for( var i = 0; i < arrayForms.length; i++){
   	  if( arrayForms[i].layerName == layerName ){
	     for( var x = 0; x < arrayForms[i].valores.length; x++ ){
		     var id = arrayForms[i].valores[x].id;
			 var value = arrayForms[i].valores[x].value;
			 if( id == 'grid' ){
				 // para id == grid restaura o store do grid
				 var grid = form.findById('grid');
				 MyRecordType = Ext.data.Record.create(['titulo', 'criterio', 'cor', 'label']);
				 for(var y = 0; y < value.length; y++){
					var criterio = value[y]['criterio'];
					var titulo   = value[y]['titulo'];
					var label    = value[y]['label'];
					var cor      = value[y]['cor'];
					var myrec = new MyRecordType({"titulo":titulo, "criterio":criterio, "cor":cor, "label":label});
					grid.store.add(myrec);
				 }
			 } else {
		         form.findById(id).setValue(value); 
			 } 	 
		 }
	  }
   
   }
 
}

// usado ao usuario clicar com o botao direito na layer, para restaurar o formulario correspondente
function executaRestaurarForm( layerName ){

   for( var i = 0; i < arrayForms.length; i++){
   	  if( arrayForms[i].layerName == layerName ){
	  
	     if ( arrayForms[i].formId == _FORM_IBGE_BASICA ){
		    windowQuerieBasic = createWindowQuerieIBGEBasica( layerName );
			windowQuerieBasic.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_IBGE_RANKING ){
		    windowQuerieRanking = createWindowQuerieIBGERanking( layerName );
			windowQuerieRanking.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_BASICA_REBANHOS ){
		    windowQuerieRebanhos = createWindowQuerieRebanhos( layerName );
			windowQuerieRebanhos.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_AGRICULTURA_FAMILIAR ){
		    windowQuerieAgriculturaFamiliar = createWindowQuerieAgriculturaFamiliar( layerName );
			windowQuerieAgriculturaFamiliar.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_SQL ){
		    windowQuerieSQL = createWindowQuerieSQL( layerName );
			windowQuerieSQL.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_IBGE_AVANCADA ){
		    windowQuerieAvancada = createWindowQuerieIBGEAvancada( layerName );
			windowQuerieAvancada.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_BASICA_CREDITO ){
		    windowQuerieCreditoAgricola = createWindowQuerieCreditoAgricola( layerName );
			windowQuerieCreditoAgricola.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_BASICA_CREDITO_ABC ){
		    windowQuerieCreditoABC = createWindowQuerieCreditoABC( layerName );
			windowQuerieCreditoABC.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_ABC_RANKING ){
		    windowQuerieRankingABC = createWindowQuerieRankingABC( layerName );
			windowQuerieRankingABC.show();
		 }
		 
		 if ( arrayForms[i].formId == _FORM_CREDITO_RANKING ){
		    windowQuerieRankingCredito = createWindowQuerieRankingCredito( layerName );
			windowQuerieRankingCredito.show();
		 }
	  
	  } 
   }	  

}

function carregarMapa(nameMapa, layers){

    // atribui o nome do mapa ao mapa atual
	_mapaAtual = nameMapa;

   arrayForms = layers;
   for( var i = 0; i < layers.length; i++){
      if ( layers[i].formId == _FORM_IBGE_BASICA ){
	     var form = createWindowQuerieIBGEBasica( layers[i].layerName, true );
		 form_IBGE_Basica_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_IBGE_RANKING ){
	     var form = createWindowQuerieIBGERanking( layers[i].layerName, true );
		 form_IBGE_Ranking_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_BASICA_REBANHOS ){
	     var form = createWindowQuerieRebanhos( layers[i].layerName, true );
		 form_basica_rebanhos_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_AGRICULTURA_FAMILIAR ){
	     var form = createWindowQuerieAgriculturaFamiliar( layers[i].layerName, true );
		 form_agricultura_familiar_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_SQL ){
	     var form = createWindowQuerieSQL( layers[i].layerName, true );
		 form_SQL_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_IBGE_AVANCADA ){
	     var form = createWindowQuerieIBGEAvancada( layers[i].layerName, true );
		 form_IBGE_avancada_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_BASICA_CREDITO ){
	     var form = createWindowQuerieCreditoAgricola( layers[i].layerName, true );
		 form_basica_credito_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_BASICA_CREDITO_ABC ){
	     var form = createWindowQuerieCreditoABC( layers[i].layerName, true );
		 form_basica_credito_abc_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_ABC_RANKING ){
	     var form = createWindowQuerieRankingABC( layers[i].layerName, true );
		 form_ABC_Ranking_handler(form, layers[i].layerName, true);
	  }
	  if ( layers[i].formId == _FORM_CREDITO_RANKING ){
	     var form = createWindowQuerieRankingCredito( layers[i].layerName, true );
		 form_Credito_Ranking_handler(form, layers[i].layerName, true);
	  }
   }
}

// verifica se determinada layerName existe em arrayForms
function existsLayerName( layerName ){
   for( var i = 0; i < arrayForms.length; i++){
   	  if( arrayForms[i].layerName == layerName ){
          return true;
	  }
   }
   return false;   
}



// monta o formul�rio de salvar mapas
function form_SalvarMapa(){

   if( arrayForms && arrayForms.length == 0 ){
      alert("N�o existe nenhuma layer dispon�vel para salvar no mapa !!!");
	  return;
   }	  

   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ 
		       {
		        id: 'nomemapa',
				ref: '../nomemapa',
		        xtype:'textfield',
                fieldLabel: 'Nome do Mapa',
				anchor: '100%',
                name: 'nomemapa',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   }	
			   ],
		buttons: []
    }); 
	
	if( _mapaAtual ){
	
	    var nomeMapa = form.findById('nomemapa');
	    nomeMapa.setValue(_mapaAtual);
		nomeMapa.setDisabled(true);
		
		var buttonExistente =  new Ext.Button({ 
		                          id: 'button_existente',
								  text: 'Substituir mapa existente',
								  handler: function(){
								     if( form.findById('nomemapa').getValue() == "" ){
									    alert("O nome do mapa n�o pode estar em branco !");
										return;
									 }
								     aplicaSalvar(_mapaAtual, true);
 								  }
							   } 	  
	    );
		
		var buttonSalvar =  new Ext.Button({
											id: "button_salvar", 
											text: 'Salvar em novo mapa',
											handler: function(){
											   if( form.findById('nomemapa').getValue() == "" ){
												   alert("O nome do mapa n�o pode estar em branco !");
												   return;
											   }
											   if( buttonExistente.isVisible() ){
												   buttonExistente.setVisible(false); 
												   nomeMapa.setDisabled(false);
												   nomeMapa.setValue("");
												   buttonSalvar.setText("Salvar mapa");
											   } else {
												   aplicaSalvar(nomeMapa.getValue());
											   }							   
											}
						    }	  
	    );
		
	    form.addButton( buttonExistente );
		form.addButton( buttonSalvar );
		                    

	} else {
	    var nomeMapa = form.findById('nomemapa');
	    var buttonSalvar =  new Ext.Button({
											text: 'Salvar mapa',
											handler: function(){
											   if( form.findById('nomemapa').getValue() == "" ){
												  alert("O nome do mapa n�o pode estar em branco !");
												  return;
											   }
											   aplicaSalvar(nomeMapa.getValue());
											}
						    }  
			
	    ); 
	    form.addButton( buttonSalvar );
	}
	
	var buttonCancelar =  new Ext.Button({
											text: 'Cancelar',
											handler: function(){
											   windowSaveMapa.close();
							 			 }
						  }
	); 
	
	form.addButton( buttonCancelar );
	
	windowSaveMapa = new Ext.Window({
						  title: 'Salvar Mapa',
						  height: 140, 
						  width: 360,
						  layout: 'fit',
						  resizable: false, 
						  closable: false,
						  modal: true,
						  iconCls: 'bt-savemap',
						  items: [ form ]
	 });
	 windowSaveMapa.show();

}

function aplicaSalvar(nameMap, semVerificar){

    // n�o verifica se o mapa ja existe
    if( semVerificar ){
	    _salvarEfetivo(nameMap);
		return;
	} 	

    // verifica se o mapa ja existe
	var varUrl = urlJSP + "sql_autentica.jsp?opt=existmap&user=" + _usuario + "&sist=" + _sistema + "&map=" + nameMap;
	var store = new Ext.data.JsonStore({
							autoDestroy: true,
							proxy : new Ext.data.HttpProxy({
								method: 'POST',
								url: varUrl
							}),
							storeId: 'myStore',
							autoLoad: false,
							root: 'raiz',
							fields: [
									  {name: 'usuario'},
									  {name: 'perfil'},
									  {name: 'nome'}
									]
	});
	store.load( {callback:function(r, options, sucess){
					   if( store.getTotalCount() > 0 ){ 
						   Ext.MessageBox.show({
							   title:'Mapa Ja Existe!',
							   msg: 'Ja existe um mapa com este nome gravado. Deseja substituir ?',
							   buttons: Ext.MessageBox.YESNO,
							   fn: function(btn){
							      if( btn == 'yes' ){
								      _salvarEfetivo(nameMap);
								  } else {
								      windowSaveMapa.close();
								  }
							   },
							   icon: Ext.MessageBox.QUESTION
					       });
					   } else {
						   _salvarEfetivo(nameMap);
					   }
				} }
	);
	
}

function _salvarEfetivo(nameMap){	

	var myLayers = Ext.util.JSON.encode( arrayForms );
	var varUrl = urlJSP + "sql_autentica.jsp";
	var store = new Ext.data.JsonStore({
							autoDestroy: true,
							proxy : new Ext.data.HttpProxy({
								method: 'POST',
								url: varUrl
							}),
							baseParams: {  
								opt: 'save',
								user: _usuario,
								sist: _sistema,
								map:  nameMap,
								layers: myLayers
							},
							storeId: 'myStore',
							autoLoad: false,
							root: 'raiz',
							fields: [
									  {name: 'usuario'},
									  {name: 'perfil'},
									  {name: 'nome'}
									]
	});
	store.load( {callback:function(r, options, sucess){
					   if( store.getTotalCount() > 0 ){ 
						   _mapaAtual = nameMap;
						   Ext.example.msg('Aviso', 'Mapa salvo com sucesso !');
						   windowSaveMapa.close();
					   } else {
						   alert('Problema ao salvar o mapa! Ja existe um mapa com este nome !');
					   }
				} }
	);

}

// implementa o formul�rio para o usu�rio escolher entre os mapas salvos
function formMeusMapas(){
   
   var storeMapas = createStoreMapas();
   var comboMapas = new Ext.form.ComboBox({
		id: 'comboMapas',
		store: storeMapas,
		displayField: 'mapa',
		valueField: 'layers',
		typeAhead: true,
		mode: 'remote',
		editable: false,
		allowBlank: false,
		blankText: '� obrigat�rio escolher um mapa',
		fieldLabel: 'Mapas',
		anchor: '100%',
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione um mapa ...',
		selectOnFocus:true
   });
	 

   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ comboMapas ],
		buttons: [ {
						text: 'Carregar Mapa',
						handler: function(){
						   limpaLayersTree();
						   carregarMapa(comboMapas.getRawValue(), comboMapas.getValue());
						   Ext.example.msg('Mapa carregando ...', 'Aguarde um momento. Processando as camadas do mapa...');
						   windowMeusMapas.close();
						}
				   },
                   {
						text: 'Cancelar',
						handler: function(){
						   windowMeusMapas.close();
						}
				   }  				   
		]
    }); 
	
	windowMeusMapas = new Ext.Window({
						  title: 'Meus Mapas',
						  height: 140, 
						  width: 360,
						  layout: 'fit',
						  resizable: false, 
						  closable: false,
						  modal: true,
						  iconCls: 'bt-savemap',
						  items: [ form ]
	 });
	 windowMeusMapas.show();

}

// cria o store respons�vel por fornecer os dados dos mapas gravados do usu�rio
function createStoreMapas(){

    // le os culturas do banco de dados
	var store = new Ext.data.JsonStore({
		autoDestroy: true,
		autoLoad:true,
		url: urlJSP + "sql_autentica.jsp?opt=maps&user=" + _usuario + "&sist=" + _sistema,
		storeId: 'myStore',
		root: 'raiz',
		idProperty: 'mapa',
		fields: [ {name: 'mapa'},
				  {name: 'layers'}
				],					  
		sortInfo: {
                    field: 'mapa',
                    direction: 'ASC' 
                  }
	});
	
	return store;
	
}	


