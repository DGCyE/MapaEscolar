var app;
var permalink;
var UrlMe="http://192.168.57.11/cgi-bin/mapaescolar2?";
//OpenLayers.ProxyHost = "prox/prox.php?url=";
Ext.onReady(function() {
     app = new gxp.Viewer({
         proxy: "prox/prox.php?url=",
        portalConfig: {
            layout: "border",
            region: "center",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container

            items: [{
                id: "northpanel",
                xtype: "container",
                region: "north",
                border: false,
                height: 56,
                items: [{ html: "<div id='topic-grid'></div>"}]
              },
              {
                id: "centerpanel",
                xtype: "tabpanel",
                region: "center",
                activeTab: 0,                 
                items: ["mymap",
                    {title: "Ayuda", autoScroll: true,
                      html: "<iframe src='help.html'>"
                    },
                    {title: "Acerca de",
                     html: "<iframe src='about.html'>"
                    }],
                bbar: {id: "mybbar"}
            }, 
             {
                id: "westcontainer",
                xtype: "tabpanel",
                region: "west",
                width: 200,
                activeTab: 0,                 
                items: [
                      {
                        title: "Capas",
                        id: "layers_tree",
                      //  collapsible: true,
                        layout: "fit"
                      },  
                      {
                        title: "Leyenda",
                        id: "legend",
                        autoScroll: true,
                        layout: "fit"
                      }  
                    ],
              //  bbar: {id: "mybbar"}
            },  

           ],
             bbar: {id: "mybbar"}
        },
        
  // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                autoScroll:true,
                border: true,
                tbar: [], // we will add buttons to "tree.bbar" later
            },
            outputTarget: "layers_tree"
        }, 
		{
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_zoomtolayerextent",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_layerproperties",
           // outputTarget: "layers_tree",            
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },{
            ptype: "gxp_navigation",
            actionTarget: "map.tbar"            
        },{
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar",
            extent: new OpenLayers.Bounds(-7175626.9266567,-5141723.905941,-6304445.4046767,-3812835.624341)
        },{
            ptype: "gxp_zoom",
            showZoomBoxAction: true,
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_wmsgetfeatureinfo",
            outputConfig: {
                width: 300,                
                draggable:true
            },
            format: "html",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_measure",
            outputConfig: {
                width: 400,
                height: "auto"
            },
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        },{
            ptype: "gxp_legend",
        		outputConfig: {
                autoScroll:true,
                border: true
              },
			outputTarget: "legend"
        },
		{
            ptype: "gxp_googlegeocoder",
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Buscar un lugar ..."
            }
        },{
            xtype: "gxp_scaleoverlay",
            actionTarget: "map.tbar"
        },
     /*
       {
            ptype: "gxp_geocodercombo",
            outputTarget: "map.tbar",
              outputConfig: {
            emptyText: "Search..."
               }
            },
      */
        /*{
        	ptype: "gxp_print",
        	actionTarget: "map.tbar",
        	customParams: {outputFilename: 'GeoExplorer-print'},
        	printService: "http://10.41.5.112:8080/print-servlet/pdf",
        	//printService: "http://200.85.153.133:8081/printurba/pdf",
        	showButtonText: true
        },*/{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Imprimir',
                iconCls: "gxp-icon-print",
                handler: function() {
                	window.print();
                }
            }]
        },{
            xtype: "tbbutton",
            outputTarget: "map.bbar",
            actions: [{
                text: 'Permalink',
                iconCls: "gxp-icon-permalink",
                handler: function() {
                    Ext.MessageBox.show({
                        title: 'Permalink', 
                        msg: 'Seleccione y copie el texto con Ctrl+C',
                        value: permalink,
                        multiline: true,
                        width: 500,
                        icon: Ext.MessageBox.INFO
                    });
                }
            }]

        },
       {
        xtype: 'tbbutton',
        //iconCls: 'bt-query-avancada',
        outputTarget: "map.bbar",
        actions: [{
           text: 'Arbol Escuelas',
            iconCls: "gxp-arbol",
               handler: function( item, event ){
                             windowArbolCapas = createWindowArbol();
                             windowArbolCapas.show();
                                     }
                 }]
         },

        /*
        {
            // not a useful tool - just a demo for additional items
                
            
            actionTarget: "mybbar", // ".bbar" would also work
            actions:[{
                text: 'coord.',
               

            }]
        }
      */
        ],
       


     // layer sources
        defaultSourceType: "gxp_wmssource",
        sources: sources,

       map: {
            id: "mymap",
            plugins: [
                {ptype: "gxp_loadingindicator"}
            ],
            title: "Mapa",
			projection: "EPSG:900913",
            displayProjection: "EPSG:4326",
            units: "m", 
           	restrictedExtent: [-7056953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602],
            center: [-6768040.2321373,-4401345.9230043],
            scales: [5000000, 2500000, 1750000, 1000000, 750000, 500000, 350000, 200000, 100000, 50000, 10000, 5000, 2500, 1000, 500, 250, 100, 50, 7], minScale:[7], maxScale:[5000000],
            zoom: 6,
            numZoomLevels: 19,
            maxResolution: '156543.0339',
            stateId: "map",
            prettyStateKeys: true,            
            layers: layers,
           
            items: [
             
            {
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }
              
            ]
        }
   
    });

       
       
});

