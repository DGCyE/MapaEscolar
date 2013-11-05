function createWindowProcurarMunicipio(){
      
   // cria o combo para apresentar as municipios
   var storeMunicipios = createStoreMunicipios();
   var comboMunicipios = new Ext.form.ComboBox({
        id: 'comboMunicipios',
        store: storeMunicipios,
        displayField: 'nuevo',
        valueField: 'punto',
		fieldLabel: 'Distrito',
        typeAhead: true,
        mode: 'local',
        anchor: '100%',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Selecione un distrito ...',
        selectOnFocus:true,
		listeners: {
                    specialkey: function (f, e) {
                        if (e.getKey() == e.ENTER) { procurarMunicipio(comboMunicipios.value);}
                    }
        }
   });
   
   var form = new Ext.FormPanel({
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 629,
        items: [ 
		        comboMunicipios
			   ],
        buttons: [{
            text: 'Buscar',
			handler: function(){
			   // procurarMunicipio(comboMunicipios.value);
                visualizarBusquedaDist(comboMunicipios.value);
			}
        }]
    }); 
	
	return new Ext.Window({
					title: 'Buscar Distritos',
					height: 115,
					width: 600,
					layout: 'fit',
					resizable: false, 
				//	iconCls: 'bt-query',
					items: [ form ]
		      });

}

