var _FORM_IBGE_BASICA = 'form_ibge_basica';
var msg;

// criterios � um array que vai armazenar a lista de criterios que o usu�rio adicionar
var criterios = new Array();

function createWindowQueryIndi( layerName, notDisplay ){

    // cria o controle que apresenta cores para o usu�rio escolher - fallback true e false alteram o tipo apresentado
    var fb = new Ext.ux.ColorField({fieldLabel: 'Cor', value: '#FFFFFF', name: 'cor', msgTarget: 'qtip', fallback: true});

    // cria a store para armazenar o array de criterios
	var store = new Ext.data.ArrayStore({
	   fields: [
		  {name: 'titulo'},
		  {name: 'criterio' },
		  {name: 'cor'},
		  {name: 'label'}
	   ]
	});
	store.loadData(criterios);

    	// crea combo dominio
	var storeDominio = createStoreDominio();
	var comboDominio = new Ext.form.ComboBox({
		id: 'comboDominio',
		store: storeDominio,
		displayField: 'descripcion',
		valueField: 'dominio',
		typeAhead: true,
		mode: 'remote',
		editable: false,
		allowBlank: false,
		blankText: 'obligatorio ',
		fieldLabel: 'Dominio',
		anchor: '100%',
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione un dominio ...',
		selectOnFocus:true
	});

	// crea combo indicadores
	var storeIndi = createStoreIndicador();
	var comboIndi = new Ext.form.ComboBox({
		id: 'comboIndi',
		store: storeIndi,
		displayField: 'descripcion',
		valueField: 'indicador',
		typeAhead: true,
		mode: 'remote',
		editable: false,
		allowBlank: false,
		blankText: 'obligatorio ',
		fieldLabel: 'Indicador',
		anchor: '100%',
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione un indicador ...',
		selectOnFocus:true
	});

	// crea combo indicadores
	var storePer = createStorePeriodos();
	var comboPer = new Ext.form.ComboBox({
		id: 'comboPer',
		store: storePer,
		displayField: 'descripcionperiodo',
		valueField: 'idperiodo',
		typeAhead: true,
		mode: 'remote',
		editable: false,
		allowBlank: false,
		blankText: 'obligatorio ',
		fieldLabel: 'Periodo',
		anchor: '100%',
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione un periodo ...',
		selectOnFocus:true
	});

	// crea combo ofertas
	var storeOfertas = createStoreOfertas();
	var comboOfertas = new Ext.form.ComboBox({
		id: 'comboOfertas',
		store: storeOfertas,
		displayField: 'descripcionoferta',
		valueField: 'oferta',
		typeAhead: true,
		mode: 'remote',
		editable: false,
		allowBlank: false,
		blankText: 'obligatorio ',
		fieldLabel: 'Modalidad y Nivel',
		anchor: '100%',
		forceSelection: true,
		triggerAction: 'all',
		emptyText:'Selecione una oferta ...',
		selectOnFocus:true
	});


   var form = new Ext.FormPanel({
        id: _FORM_IBGE_BASICA,
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 629,
        items: [
		        comboDominio,comboIndi, comboPer, comboOfertas, /*, comboAnos2, comboUFs, comboVar, comboSimb, */

			   ],
        buttons: [{
            text: 'Generar Capa',
			handler: function(){
			   form_query_indi_handler(form);
			}
        }]
    });

	//var alturaJanela = isPerfilAdm() ? 520 : 300;
	var alturaJanela = 200;

	// tenta restaurar os valores do form
//	restauraForm( layerName, form );

	// quando a function for executada pelo carregamento de mapas do banco de dados, n�o executa a window


	return new Ext.Window({
					title: 'Consulta Indicadores',
					height: alturaJanela, // antigo 300 para a versao nao completa 500 para a completa
					width: 600,
					layout: 'fit',
					resizable: true,
					//iconCls: 'bt-query',
					items: [ form ]
		      });

}

function form_query_indi_handler(form){


 //  try {

  // var domi = form.findById('comboDominio').getValue();
   var indi = form.findById('comboIndi').getValue();
   var per = form.findById('comboPer').getValue();
   var ofer = form.findById('comboOfertas').getValue();


var cql = 'indicador = '+indi+' AND idperiodo ='+per+' AND oferta ='+ofer+' ';
var estilo = '';
 if(indi == 7.4 ){
          nom_capa = 'Total Establecimientos'+ofer+per;
          estilo = 'indi_estab_dist';
 }else if (indi == 6.1 ){
          nom_capa = 'Total Alumnos'+ofer+per;
          estilo = 'indi_alum_dist';
 }
 else if (indi == 12.1 ){
          nom_capa = 'Total Unidades Educativas'+ofer+per;
          estilo = 'indi_estab_dist';
 }
////////// agregado ////////////////////////////////////////////////////////////////////////////////////


 var wms = new OpenLayers.Layer.WMS.Post(nom_capa, "http://192.168.54.20/geoserver/mariano/wms",
		  {layers: "mariano:v_indi_distrito",transparent:true, styles: estilo, cql_filter: cql,
            format: 'image/png'},
          {isBaseLayer: false, visibility: true, ratio: 1,displayInLayerSwitcher: true,  group: "tematicos", singleTile: true
          }
    );
  this.map.addLayer(wms);


}




