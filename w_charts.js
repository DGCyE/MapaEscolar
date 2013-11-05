function chartBarrasConsultaRanking( sql, variavel ){

    Ext.chart.Chart.CHART_URL = chartURL; 

    var store = new Ext.data.JsonStore({
					autoDestroy: true,
					proxy : new Ext.data.HttpProxy({
						method: 'GET',
						url: urlJSP + "sql_json.jsp?sql=" + sql
					}),
					storeId: 'myStore',
					autoLoad: false,
					root: 'raiz',
					fields: [
							  {name: 'linha'},
							  {name: 'municipio'},
							  {name: 'uf'},
							  {name: variavel, type: 'float'}
						    ]
  			   });
    store.load( {callback:function(r, options, sucess){
					
					var win = new Ext.Window({
									title: 'Gr�fico da Consulta de Ranking - (necess�rio plugin flash)',
									height: 400,
									width: 900,
									layout: 'fit',
									resizable: true, 
									iconCls: 'bt-chart',
									items: {
												xtype: 'columnchart',
												store: store,
												xField: 'municipio',
												yField: variavel,
												yAxis: new Ext.chart.NumericAxis({
													displayName: 'Valores'
												}),
												chartStyle: {
																padding: 10,
																animationEnabled: true,
																font: {
																	name: 'Tahoma',
																	color: 0x444444,
																	size: 11
																},
																dataTip: {
																	padding: 5,
																	border: {
																		color: 0x99bbe8,
																		size:1
																	},
																	background: {
																		color: 0xDAE7F6,
																		alpha: .9
																	},
																	font: {
																		name: 'Tahoma',
																		color: 0x15428B,
																		size: 10,
																		bold: true
																	}
																},
																xAxis: {
																	color: 0x69aBc8,
																	majorTicks: {color: 0x69aBc8, length: 4},
																	minorTicks: {color: 0x69aBc8, length: 2},
																	majorGridLines: {size: 1, color: 0xeeeeee}
																},
																yAxis: {
																	color: 0x69aBc8,
																	majorTicks: {color: 0x69aBc8, length: 4},
																	minorTicks: {color: 0x69aBc8, length: 2},
																	majorGridLines: {size: 1, color: 0xdfe8f6}
																}
												}
									}
					});
					//win.setPosition( viewPort.getWidth()-500, 150 );
					win.show();
						 
			    }}
    );

    

}