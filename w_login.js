// armazena a store com os dados do usu�rio logado
var storeLogin;
// armazena a janela de login
var windowLogin;
// armazena a janela de cadastro do usu�rio
var windowCadastro;
// armazena a janela de lembrar senha
var windowLembrarSenha;
// armazena a janela do alterar senha
var windowAlterarSenha;
// armazena o usuario e perfil
var _usuario; 
var _nome;
var _perfil;

// armazena o nome do perfil padr�o para o cadastro de usu�rios
var _perfilPadrao      = "convidado";
var _perfilAdm         = "administrador";
var _perfilEmbrapaSede = "embrapasede";
var _perfilSPA         = "spa";

// armazena o numero de minutos que o cookie ser� v�lido
var _cookieTime = 180;

var _sistema = "somabrasil";


function login(usuario, senha){

    varUrl = urlJSP + "sql_autentica.jsp?opt=auth&user=" + usuario + "&pass=" + senha + "&sist=" + _sistema;

    storeLogin = new Ext.data.JsonStore({
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
    storeLogin.load( {callback:function(r, options, sucess){
	
					   if( storeLogin.getTotalCount() > 0 ){
					       _usuario = storeLogin.getAt(0).get('usuario'); 
					       _perfil  = storeLogin.getAt(0).get('perfil'); 
						   _nome = storeLogin.getAt(0).get('nome'); 
						   
						   setCookie("__somabrasilcnpm",[_usuario, _nome, _perfil], _cookieTime);
						   
						   // habilita o nome do usu�rio na toolbar
						   buttonUsuario.setText("Usuario : " + _usuario);
						   buttonLogout.setVisible(true);
						   buttonAlterarSenha.setVisible(true);

                           // faz a carga das layers   						   
						   carregarLayers();

						   Ext.example.msg('Login Efetuado com Sucesso', "Ol� " + _nome + " ! Bem Vindo ao SOMA Brasil CNPM !");
						   
					       windowLogin.close();
						   
						   verificaHabilitarRecursos();
						   
					   } else {
					   
					       Ext.example.msg('Problema ao efetuar o login', "O nome do usu�rio (email) ou a senha s�o inv�lidos !");
					   
					       /*Ext.MessageBox.show({
							   title: 'Informa��o',
							   msg: 'Usu�rio ou senha inv�lidos',
							   width:300,
							   buttons: Ext.MessageBox.OK,
							   icon: Ext.MessageBox.ERROR
						   });
					       */
					   }
					   
				} }
    );

}

function logout(){
   limpaLayersTree();
   arrayForms = [];
   _mapaAtual = null;
   setCookie("__somabrasilcnpm", _usuario, -1);
   geraFormLogin(); 
}

function salvaCadastro(nome, instituicao, segmento, telefone, usuario, senha){

    varUrl = urlJSP + "sql_autentica.jsp?opt=cad&nome=" + nome + "&instituicao=" + instituicao + "&segmento=" + segmento + "&telefone=" + telefone + "&user=" + usuario + "&pass=" + senha + "&perfil=" + _perfilPadrao + "&sist=" + _sistema;

    storeLogin = new Ext.data.JsonStore({
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
    storeLogin.load( {callback:function(r, options, sucess){
	
					   if( storeLogin.getTotalCount() > 0 ){
					       Ext.example.msg('Informa��o sobre o cadastro', "Cadastro efetuado com sucesso !");
					       windowCadastro.close();
					   } else {
					       Ext.example.msg('Problema com o cadastro', "N�o foi possivel efetuar o seu cadastro, por favor tente mais tarde !");
					   }
					   
				} }
    );

}

function geraFormLogin(){

   if( buttonUsuario ){
      buttonUsuario.setText("");
   }	
   if( buttonLogout ){   
      buttonLogout.setVisible(false);
   }	
   if( buttonAlterarSenha ){   
      buttonAlterarSenha.setVisible(false);
   }   

   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ 
		       {
		        id: 'usuario',
				ref: '../usuario',
		        xtype:'textfield',
                fieldLabel: 'Email',
				regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
				regexText: "O texto digitado n�o se parece com um email real !",
				anchor: '100%',
                name: 'usuario',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			   {
				id: 'senha', 
				ref: '../senha',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Senha',
				anchor: '100%',
				name: 'senha',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
				}				
			   ],
        buttons: [
		         {
					text: 'Login',
					handler: function(){
					   executaLogin(form);
					}
                 },
				 {
					text: 'Ainda n�o tenho cadastro',
					handler: function(){
					   geraFormCadastro();
					}
                 },
				 {
					text: 'Esqueci minha senha',
					handler: function(){
					   geraFormLembrarSenha();
					}
                 }
				 ],
		keys: [
            { key: [Ext.EventObject.ENTER], handler: function() {
                    executaLogin(form);
                }
            }
        ]
    }); 
	
	windowLogin = new Ext.Window({
				  title: 'Login',
				  height: 140, 
    			  width: 360,
				  layout: 'fit',
				  resizable: false, 
				  closable: false,
				  modal: true,
				  iconCls: 'bt-usuario',
				  items: [ form ],
  				  baseCls:'x-panel'
	 });
	 
	 windowLogin.show();

}

function geraFormAlterarSenha(){

   
   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ 
			   {
				id: 'senhaatual', 
				ref: '../senhaatual',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Senha Atual',
				anchor: '100%',
				name: 'senhaatual',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			   {
				id: 'novasenha1', 
				ref: '../novasenha1',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Nova Senha',
				anchor: '100%',
				name: 'novasenha1',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			   {
				id: 'novasenha2', 
				ref: '../novasenha2',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Repetir Nova Senha',
				anchor: '100%',
				name: 'novasenha2',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   }
			   ],
        buttons: [
		         {
					text: 'Alterar',
					handler: function(){
					   executaAlterarSenha(form);
					}
                 },
				 {
					text: 'Cancelar',
					handler: function(){
					   windowAlterarSenha.close();
					}
                 }
				 ],
		keys: [
            { key: [Ext.EventObject.ENTER], handler: function() {
                    executaAlterarSenha(form);
                }
            }
        ]
    }); 
	
	windowAlterarSenha = new Ext.Window({
				  title: 'Alterar Senha',
				  height: 180, 
    			  width: 360,
				  layout: 'fit',
				  resizable: false, 
				  closable: false,
				  modal: true,
				  iconCls: 'bt-usuario',
				  items: [ form ],
  				  baseCls:'x-panel'
	 });
	 
	 windowAlterarSenha.show();

}

function executaAlterarSenha( form ){

   var senhaatual  = form.findById('senhaatual').getValue();
   var novasenha1  = form.findById('novasenha1').getValue();
   var novasenha2  = form.findById('novasenha2').getValue();
   
   // valida os dados
   if( novasenha1 == novasenha2 && senhaatual == novasenha1){
      alert("As tres senhas est�o iguais. Por favor corrija !");
	  return;
   }
   
   if( novasenha1 != novasenha2 ){
      alert("As senha nova e a confirma��o de senha devem ser iguais !");
	  return;
   }
   
   alterarSenha( _usuario, _sistema, senhaatual, novasenha1 );

}

function alterarSenha( usuario, sistema, senhaatual, novasenha){

    varUrl = urlJSP + "sql_autentica.jsp?opt=altsenha&user=" + usuario + "&sist=" + sistema + "&senhaatual=" + senhaatual + "&novasenha=" + novasenha;

    store = new Ext.data.JsonStore({
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
					       Ext.example.msg('Senha Alterada', "Senha alterada com sucesso !");
					       windowAlterarSenha.close();
					   } else {
					       Ext.example.msg('Problema ao alterar a senha', "N�o foi possivel alterar sua senha. Por favor verifique os dados digitados !");
					   }
					   
				} }
    );

}



function executaLogin(form){
   var usuario      = form.findById('usuario').getValue();
   var senha        = form.findById('senha').getValue();
   login(usuario, senha);
}

function geraFormLembrarSenha(){

   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ 
		       {
		        id: 'usuario3',
				ref: '../usuario3',
		        xtype:'textfield',
                fieldLabel: 'Digite o Email',
				regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
				regexText: "O texto digitado n�o se parece com um email real !",
				anchor: '100%',
                name: 'usuario3',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
				}				
			   ],
        buttons: [
		         {
					text: 'Lembrar Senha',
					handler: function(){
					   enviarEmail(form.findById('usuario3').getValue());
					}
                 },
				 {
					text: 'Cancelar',
					handler: function(){
					   windowLembrarSenha.close();
					}
                 }
				 ],
		keys: [
            { key: [Ext.EventObject.ENTER], handler: function() {
			       enviarEmail(form.findById('usuario').getValue());
              }
            }
        ]
    }); 
	
	windowLembrarSenha = new Ext.Window({
				  title: 'Lembrar Senha',
				  height: 110, 
    			  width: 430,
				  layout: 'fit',
				  resizable: false, 
				  closable: false,
				  modal: true,
				  iconCls: 'bt-usuario',
				  items: [ form ],
				  baseCls:'x-panel'
	 });
	 
	 windowLembrarSenha.show();

}

function enviarEmail(email){

    varUrl = urlJSP + "sql_autentica.jsp?opt=mail&user=" + email + "&sist=" + _sistema;

    storeLogin = new Ext.data.JsonStore({
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
    storeLogin.load( {callback:function(r, options, sucess){
	
					   if( storeLogin.getTotalCount() > 0 ){
					       Ext.example.msg('Lembrar Senha', "Email de lembrar senha enviado com sucesso !");
					       windowLembrarSenha.close();
					   } else {
					       Ext.example.msg('Problema ao enviar email', "N�o foi possivel enviar o email de lembrar senha, o email fornecido n�o � de um usu�rio cadastrado !");
					   }
					   
				} }
    );

}


function geraFormCadastro(){

   var storeSegmentoInstituicao = createStoreSegmentoInstituicao();
   var comboSegmentos = new Ext.form.ComboBox({
		id: 'comboSeg',
		store: storeSegmentoInstituicao,
		displayField: 'seg',
		valueField: 'seg',
		typeAhead: true,
		mode: 'local',
		editable: false,
		fieldLabel: 'Segmento da Institui��o',
		anchor: '100%',
		allowBlank: true,
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione um segmento para a institui��o ...',
		selectOnFocus:true
   });

   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 359,
        items: [ 
		       {
		        id: 'nome',
				ref: '../nome',
		        xtype:'textfield',
                fieldLabel: 'Nome',
				anchor: '100%',
                name: 'nome',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			   {
		        id: 'instituicao',
				ref: '../instituicao',
		        xtype:'textfield',
                fieldLabel: 'Institui��o',
				anchor: '100%',
                name: 'instituicao',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   }, comboSegmentos,
			   {
		        id: 'telefone',
				ref: '../telefone',
		        xtype:'textfield',
                fieldLabel: 'Telefone',
				anchor: '100%',
                name: 'telefone',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
		       {
		        id: 'usuario2',
				ref: '../usuario2',
		        xtype:'textfield',
                fieldLabel: 'Email',
				regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
				regexText: "O texto digitado n�o se parece com um email real !",
				anchor: '100%',
                name: 'usuario2',
                allowBlank:false,
				blankText: 'campo obrigat�rio!'
			   },
			   {
				id: 'senha2', 
				ref: '../senha2',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Senha',
				anchor: '100%',
				name: 'senha2',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
				},
                {
				id: 'confsenha', 
				ref: '../confsenha',
				xtype:'textfield',
				inputType: 'password',
				fieldLabel: 'Confirmar Senha',
				anchor: '100%',
				name: 'confsenha',
				allowBlank:false,
				blankText: 'campo obrigat�rio!'
				}				
			   ],
        buttons: [
		         {
					text: 'Enviar',
					handler: function(){
					   executaSalvaCadastro(form);
					}
                 },
				 {
					text: 'Cancelar',
					handler: function(){
					   windowCadastro.close();
					}
                 }
				 ],
		keys: [
            { key: [Ext.EventObject.ENTER], handler: function() {
			          executaSalvaCadastro(form);
              }
            }
        ]
    }); 
	
	windowCadastro = new Ext.Window({
				  title: 'Cadastro Soma Brasil',
				  height: 290, 
    			  width: 360,
				  layout: 'fit',
				  resizable: false, 
				  closable: false,
				  modal: true,
				  iconCls: 'bt-usuario',
				  items: [ form ],
				  baseCls:'x-panel'
	 });
	 
	 windowCadastro.show();

}

function executaSalvaCadastro( form ){

   var nome        = form.findById('nome').getValue();
   var instituicao = form.findById('instituicao').getValue();
   var segmento    = form.findById('comboSeg').getValue();
   var telefone    = form.findById('telefone').getValue();
   var usuario     = form.findById('usuario2').getValue();
   var senha       = form.findById('senha2').getValue();
   var confsenha   = form.findById('confsenha').getValue();
   
   // valida os dados
   if( nome == "" || instituicao == "" || telefone == "" || usuario == "" || segmento == ""){
      alert("O cadastro n�o foi efetivado porque os campos nome, institui��o, segmento da institui��o, telefone e usu�rio s�o obrigat�rios!");
	  return;
   }
   
   // valida as senhas
   if( senha == "" || confsenha == ""){
      alert("O cadastro n�o foi efetivado porque uma das senhas esta em branco!");
	  return;
   }
   
   if( senha != confsenha ){
      alert('Senhas diferentes', "As senhas digitadas est�o diferentes !");
	  return;
   }
   
   salvaCadastro(nome, instituicao, segmento, telefone, usuario, senha);

}

function verificaCookie(){
    if( !getCookie("__somabrasilcnpm") ){
	    geraFormLogin();
	} else {
	
	      // faz a carga das layers 
	      carregarLayers(); 
		  
		  var cookies = getCookie("__somabrasilcnpm"); 
		  if( cookies ){	
		    var encodeCookies = cookies.split(",");
			_usuario = encodeCookies[0];
			_nome    = encodeCookies[1];
			_perfil  = encodeCookies[2];
			setCookie("__somabrasilcnpm",[cookies], _cookieTime);
		  }	
	}
	
}

function verificaHabilitarRecursos(){
   if( !_perfil ){
     return;
   }	 
   if( !isPerfilAdm() ){
     Ext.getCmp('menu_avancada').setVisible(false);
	 
	 Ext.getCmp('menu_agricultura_familiar').setVisible(false);
	 Ext.getCmp('menu_sql').setVisible(false);
	 
	 Ext.getCmp('menu_creditos').setVisible(false);
	 
	 
	 
	 // esconde os n�s
	 /*layerRoot.cascade(function() { 
		if(this.attributes['id'] == "no_monitoramento") { 
			this.getUI().hide() 
		}
	 });*/
	 	 
   } else {
     
	 Ext.getCmp('menu_avancada').setVisible(true);
	 Ext.getCmp('menu_agricultura_familiar').setVisible(true);
	 Ext.getCmp('menu_sql').setVisible(true);
	 
	 // mostra os n�s
	 /*layerRoot.cascade(function() { 
		if(this.attributes['id'] == "no_monitoramento") { 
			this.getUI().show(); 
		}
	 });*/
	 
   }
   
   if( !isPerfilAdm() && !isPerfilEmbrapaSede() ){  
      layerRoot.cascade(function() { 
		if(this.attributes['id'] == "no_embrapa") { 
			this.getUI().hide() 
		}
	  });
   }
}

function isPerfilAdm(){
   return _perfil == _perfilAdm;
}

function isPerfilEmbrapaSede(){
   return _perfil == _perfilEmbrapaSede;
}

function isPerfilSPA(){
   return _perfil == _perfilSPA;
}

function createStoreSegmentoInstituicao(){

   var store = new Ext.data.ArrayStore({
       fields: [
          {name: 'seg'}
       ]
   });

   var array = new Array();
   array.push( ["Agricultores, Associa��es, Cooperativas e Sindicatos Rurais"] ); 
   array.push( ["Bancos P�blicos e Privados"] );
   array.push( ["Consultores e Profissionais Liberais"] );
   array.push( ["Empresas Nacionais e Internacionais"] );
   array.push( ["Governo Federal, Estadual e Municipal"] );
   array.push( ["Institui��es de Pesquisa, Ensino, Desenvolvimento e Extens�o"] );
   array.push( ["Organiza��es N�o Governamentais"] );
   
   store.loadData(array);
   
   return store;

}

function carregarLayers(){

   // verifica se as layers ja n�o foram adicionadas
   var adicionar = true;
   for(var i = 0; i < layers.length; i++){
      // verifica se a layer dos estados ja foi adicionada 
      if(layers[i].params && layers[i].params.LAYERS == "geodb:estados"){
	     adicionar = false;
		 break;
	  }
   }
   if( adicionar ){
      layers = layers.concat( criaLayersPrincipal() );
	  map.addLayers(layers);
   } 	  

}