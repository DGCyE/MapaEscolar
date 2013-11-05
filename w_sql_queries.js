// especifica a lista de atributos que serão gerados ao usuário exportar shapes, csv e kml para as consultas do ibge - obs: os atributos não podem conter espaços entre as virgulas
var _atributos_ibge                 = "uf,municipio,geocodigo,cultura,ano,area_plantada,area_colhida,quantidade_produzida,valor_producao,produtividade,the_geom";
var _atributos_ibge_ranking         = "linha,uf,municipio,geocodigo,cultura,ano,area_plantada,area_colhida,quantidade_produzida,valor_producao,produtividade,the_geom";
var _atributos_rebanho              = "uf,municipio,geocodigo,rebanho,ano,cabecas,the_geom";
var _atributos_agricultura_familiar = "uf,municipio,geocodigo,nestab,arestab,proprod,ativfora,obtvreceit,valoreceit,outreceit,outreceitm,nprod,valorprodm,nobtvfinan,obtvfinanc,estabbov,cabecbov,estabsui,cabecsui,valorsuir,estabgal,cabecgal,duziaovos,valorovosr,litroleite,valorleitr,the_geom";
var _atributos_credito_agricola     = "uf,municipio,geocodigo,ano,tipo,modalidade,tipo_prop,contratos,valor,valor_medio,the_geom";
var _atributos_credigo_abc          = "uf,municipio,geocodigo,tipo,contratos,valor,valor_medio,the_geom";
var _atributos_credito_ranking      = "uf,municipio,geocodigo,linha,ano,the_geom";

var _all_atributos_ibge                 = "linha\\,ano\\,municipio\\,geocodigo\\,microregiao\\,mesoregiao\\,uf\\,regiao\\,cultura\\,area_plantada\\,area_colhida\\,quantidade_produzida\\,valor_producao\\,plano\\,suave_ondulado\\,mod_ondulado\\,ondulado\\,forte_ondulado\\,montanhoso\\,porc_desmat\\,produtividade\\,the_geom";
var _all_atributos_agricultura_familiar = "municipio\\,geocodigo\\,uf\\,nestab\\,arestab\\,proprod\\,ativfora\\,obtvreceit\\,valoreceit\\,outreceit\\,outreceitm\\,nprod\\,valorprodm\\,nobtvfinan\\,obtvfinanc\\,estabbov\\,cabecbov\\,estabsui\\,cabecsui\\,valorsuir\\,estabgal\\,cabecgal\\,duziaovos\\,valorovosr\\,litroleite\\,valorleitr\\,the_geom";
var _all_atributos_rebanhos             = "geocodigo\\,municipio\\,uf\\,regiao\\,microregiao\\,mesoregiao\\,the_geom\\,ano\\,cabecas\\,rebanho";
var _all_atributos_credito_agricola     = "geocodigo\\,municipio\\,uf\\,tipo\\,modalidade\\,tipo_prop\\,ano\\,contratos\\,valor\\,valor_medio\\,temp1\\,the_geom";
var _all_atributos_credito_abc              = "geocodigo\\,municipio\\,uf\\,tipo\\,contratos\\,valor\\,valor_medio\\,temp1\\,the_geom";


function addLayerUserSQL( tituloLayer, storeRules, temporal, anoInicial, anoFinal, criterioBasico, sql, layerName, id, atributos, notDisplay ){

   // atributos recebe a lista de atributos permitidos para o exportar shapes, csv e kml 

   // criterioBasico é usado para que a consulta basica passe um criterio sem a subdivisão em ranges
   // para que não haja problemas ao executar o WMSGetFeatureInfo com uma url muito grande

   // cria um array de rules baseando-se no array recebido
   // titulo, criterio, cor, label
   
   // armazena o criterio completo para guardar no param FILTER da layer
   var criterioFull = "";

   var rules = new Array();
   var indexAnoInicial = arrayTemporal.indexOf( anoInicial );
   var indexAnoFinal   = arrayTemporal.indexOf( anoFinal );
   var strSld = "";
   for(var i = 0; i < storeRules.data.length; i++){
	  var titulo    = storeRules.getAt(i).get('titulo');
	  var criterio  = storeRules.getAt(i).get('criterio');
	  var cor       = storeRules.getAt(i).get('cor');
	  var label     = storeRules.getAt(i).get('label');
	  
	  strSld += "t" + (i+1) + "=" + titulo + "&f" + (i+1) + "=" + cor.replace("#","") + "&";
	  	  
	  criterioFull += " (" + criterio + ")";
	  if( i != storeRules.data.length - 1 ){
	     criterioFull += " or ";
	  }
	  	  
	  rules.push( criaRule( titulo, criterio, cor, label ) ); 
   }
   
   strSld += "sld_title=" + layerName;
   
   // troca os espacos por %20 para o geoserver nao reclamar ao tentar acessar a url gerada
   strSld = strSld.replace(/ /g, "%20");
   
   
   //strSld += "label="+storeRules.getAt(storeRules.data.length-1).get('label');
   
   //var style = new OpenLayers.Style("", {rules: rules});	
   var style = new OpenLayers.StyleMap(new OpenLayers.Style({}, {rules: rules}));
   
   var grupo;
   if( temporal ){ 
       grupo = nomeTemporal;
   } else {
       grupo = nomeAnalise;
   }
   
   // ser for temporal acopla o ano inicial ao titulo da layer
   criterioBasico = criterioBasico ? criterioBasico : criterioFull;
   var tituloCamadaPrincipal = tituloLayer;
   if( temporal ){
       tituloCamadaPrincipal = tituloLayer + "(" + anoInicial + "-" + anoFinal + ")";
   }
     
   // cria a camada wms para abrigar a nova layer
   /*var wms = new OpenLayers.Layer.WMS.Post(tituloCamadaPrincipal, wmsUrl,
		  {format: "image/png", transparent: true}, {styleMap: style, visibility: true, unsupportedBrowsers: [], singleTile:true, group: grupo, tileOptions: {maxGetUrlLength: 2048} }
   );*/	
   
   var wms = new OpenLayers.Layer.WMS.Post(tituloCamadaPrincipal, wmsUrl,
		  {format: "image/png", transparent: true}, {visibility: true, unsupportedBrowsers: [], singleTile:true, group: grupo, tileOptions: {maxGetUrlLength: 2048} });
   
   wms.params["EXPORT-MENU"] = true;		
   
   var sql_viewparam = sql;
   if( temporal ){
      sql_viewparam = sql + " and ano = " + arrayTemporal[indexAnoInicial];
   } 	  
   
   var enderecoJSP = document.URL.substring(0,document.URL.search("somabrasil") + 10);
      
   // marca a layer com a informação de que ela é do tipo sld_body WMSPOST e que é temporal
   // marcam também o ano inicial e final da serie temporal da layer
   wms.mergeNewParams({  VIEWPARAMS: "sql:" + sql_viewparam,
                         ISWMSPOST: true,
						 SLD: enderecoJSP + "/jsps/sld_generator.jsp?"+strSld,
						 STYLES:null,
						 ANOINICIAL: anoInicial,
						 ANOFINAL: anoFinal,
						 LAYERS: layerName,
						 SQL: sql,
						 ATRIBUTOS: atributos,
						 FILTER_CQL: temporal ? criterioBasico + " and ano = " + arrayTemporal[indexAnoInicial] : criterioBasico,
						 REF: arrayTemporal[indexAnoInicial]
				  	 }); 
					 
   if( temporal ){
      wms.mergeNewParams({  ISTEMPORAL: true
				  	    }); 
   }					 
   
   //aplicaStyleCamada( wms, layerName, rules );
   
   // se for especificado o id é que a wms deverá receber o id, para garantir atribuir layers de mapas salvos
   if( id ) wms.id = id;  
   
   this.map.addLayer( wms );
   wms.setOpacity(1);
   
   if( temporal ){
      // cria as demais layers temporais partindo da segunda layer (i = 1)
	   for(var i = indexAnoInicial + 1; i <= indexAnoFinal; i++){
	   
		   var rules2 = new Array();
		   for(var x = 0; x < storeRules.data.length; x++){
			  var titulo    = storeRules.getAt(x).get('titulo');
			  var criterio  = storeRules.getAt(x).get('criterio');
			  var cor       = storeRules.getAt(x).get('cor');
			  var label     = storeRules.getAt(x).get('label');
			  
		      // adiciona a clausula do ano correspondente 
		      var nCrit = criterio + " and ano = " + arrayTemporal[i];
		      rules2.push( criaRule( titulo, nCrit, cor, label ) ); 
		   }	  
		   var style = new OpenLayers.Style("", {rules: rules2});
		   
		   // compoe o nome da layer
		   
		   var temp = new OpenLayers.Layer.WMS.Post(tituloLayer + " - " + arrayTemporal[i], wmsUrl,
			  {format: "image/png", transparent: true }, {visibility: true, unsupportedBrowsers: [], singleTile:true, group: "", displayInLayerSwitcher:false, tileOptions: {maxGetUrlLength: 2048} }
		   );	
		   
		   var enderecoJSP = document.URL.substring(0,document.URL.search("somabrasil") + 10);
		   
		   temp.mergeNewParams({ VIEWPARAMS: "sql:" + sql + " and ano = " + arrayTemporal[i],
		                         SLD: enderecoJSP + "/jsps/sld_generator.jsp?"+strSld,
						         STYLES:null,
								 PARENTLAYER: wms,
								 FILTER_CQL: criterioBasico + " and ano = " + arrayTemporal[i],
								 LAYERS: layerName,
								 ISWMSPOST: true,
								 REF: arrayTemporal[i]
							   });	 
							 
		   this.map.addLayer( temp );
		   temp.setOpacity(0);
		   //aplicaStyleCamada( temp, layerName, rules2 );
	   }
	   
   }
	if (temporal && !notDisplay) {
		createWindowTemporal(wms);
	}
   
   return wms;
   
}


