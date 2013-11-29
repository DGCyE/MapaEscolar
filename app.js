var app, filtroEscuelas, buscadorEscuelas, consultarIndicadores, nomenclatura, buffer, sesion;
var permalink;

OpenLayers.ProxyHost = "../mapgit_ant/proxy/proxy.php?url=";

Ext.onReady(function() {
    GeoExt.Lang.set("es");
    app = new gxp.Viewer({
       // proxy: "/proxy/?url=",
       portalConfig: {
        header: true
       },
       proxy: "proxy/?url=",
        portalConfig: {
            layout: "border",

            items: [
                {
                id: "northpanel",
                xtype: "container",
                region: "north",
                border: false,
                height: 47,
                items: [{ html: '<div style="background-color:#F5812E;text-align:center"> <p>Mapa Escolar</p> </div>'}]
              },
              {
                id: "centerpanel",
                xtype: "tabpanel",
                //layout: "fit",
                region: "center",
                border: false,
                activeTab: 0,
                items: ["mymap",
                {
                    title: "Ayuda",
                    autoScroll: true,
                    html: "<iframe src='help.html'>"
                }, {
                    title: "Acerca de",
                    html: "<iframe src='about.html'>"
                }]
            }, {
                id: "westcontainer",
                xtype: "container",
                layout: "vbox",
                region: "west",
                width: 220,
                defaults: {
                    width: "100%",
                    layout: "fit"
                },
                items:
                [{
                    title: "Capas",
                    id: "layers_tree",
                    border: false,
                    flex: 1
                },

                 {
                    height: 250,
                    layout: "accordion",
                    title: "Herramientas",
                    items: [{
                        title: "Leyenda",
                        autoScroll: true,
                        id: "legend"
         //           }, {
         //               title: "Mapa de Referencia",
         //               listeners: {'afterlayout': {fn: addOverview, single: true}},
         //               html: "<div id='overviewmap' style='width:100%;height:100%;'></div>"
                    }, {
                        title: "Referencia de posición",
                        id: "position"
                    }]
                }]
            }]
        },
        // configuration of all tool plugins for this application
        tools: [
        {
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                autoScroll: true,
                tbar: []
            },
               outputTarget: "layers_tree",
         },

         {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar",
            search: {
                selectedSource: "idera_csw"
            }
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtolayerextent",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_layerproperties",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar",
            extent: new OpenLayers.Bounds(-111, -62, -16, -7)
        }, {
            ptype: "gxp_zoom",
            showZoomBoxAction: true,
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        }, {
            ptype: "gxp_wmsgetfeatureinfo",
            outputConfig: {
                width: 400,
                height: 400,
                draggable:true
            },
            actionTarget: "map.tbar",
            toggleGroup: "navegacion",
            layerParams: ["CQL_FILTER"]
        }, {
            ptype: "gxp_measure",
            outputConfig: {
                width: 400,
                height: "auto"
            },
            actionTarget: "map.tbar",
            toggleGroup: "navegacion"
        }, {
            ptype: "gxp_legend",
            outputTarget: "legend"
        }, {
            ptype: "gxp_print",
            outputTarget: "map.tbar"
        }, {
            ptype: "gxp_googlegeocoder",
            outputTarget: "map.tbar",
            outputConfig: {
                emptyText: "Buscar un lugar ...",
                 width: 300
            }
        }, {
            xtype: "gxp_scaleoverlay",
            actionTarget: "map.tbar"
        },
         {
            xtype: "tbbutton",
            actionTarget: "map.tbar",
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
        }, /*{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Cambiar a EPSG:900913',
                handler: function() {
                    window.location = 'index900913.html';
                }
            }]
        }*/

        {
            // not a useful tool - just a demo for additional items
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Arbol Escuelas',
                //iconCls: "gxp-arbol",
                handler: function() {
                    filtroEscuelas.mostrar();
                }
            }]
        },


        //{
        //     // not a useful tool - just a demo for additional items
        //     xtype: "tbbutton",
        //     actionTarget: "map.tbar",
        //     actions: [{
        //         text: 'Nomenclatura',
        //         handler: function() {
        //             nomenclatura.mostrar();
        //         }
        //     }]
        // },
        {
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Buscar de Escuelas',
                //iconCls: 'gxp-icon-find',
                handler: function() {
                    buscadorEscuelas.mostrar();
                }
            }]
        },{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Consultar Indicadores',
                //iconCls: 'bt-query-avancada',
                handler: function() {
                    consultarIndicadores.mostrar();
                }
            }]
        },{
            xtype: "tbbutton",
            actionTarget: "map.tbar",
            actions: [{
                text: 'Buffer',
                handler: function() {
                    buffer.mostrar();
                }
            }]
        }],

        // layer sources
        defaultSourceType: "gxp_wmssource",
        sources: sources,

        // map and layers
        map: {
            id: "mymap",
            title: "Mapa Escolar",
            projection: "EPSG:900913",
            displayProjection: "EPSG:4326",
            units: "m",
            restrictedExtent: [-7056953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602],
            center: [-6768040.2321373,-4401345.9230043],
            zoom: 6,
            numZoomLevels: 19,
            maxResolution: '156543.0339',
            stateId: "map",
            prettyStateKeys: true,
            layers: layers,
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }
    });

    app.mapPanel.map.events.register("mousemove", app.mapPanel.map, function (e) {
        position = app.mapPanel.map.getLonLatFromViewPortPx(e.xy);
        Ext.getCmp('position').update("<label>Latitud: " + position.lat + "</label><br/><label>Longitud: " + position.lon + "</label>");
    });

    filtroEscuelas = new FiltroEscuelas(app.mapPanel.map);
    buscadorEscuelas = new BuscadorEscuelas(this, app.mapPanel.map);
    consultarIndicadores = new ConsultarIndicadores(this, app.mapPanel.map);
    nomenclatura = new Nomenclatura(this);
    buffer = new Buffer(this);
    sesion = new Sesion(this);
});
