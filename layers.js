
var layers = [
           {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_CEC", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=14',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Ed.Física", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=13',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Artística", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=12',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            }, 
          {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Especial_Form.Lab.", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=11',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Especial_Post-Pri", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=10',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Especial_Primario", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=9',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Especial_Inicial", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=8',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
          {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Adultos_Form.Prof.", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=7',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Adultos_Medio", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=6',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Adultos_Primario", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=5',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
          {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Comun_Superior", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=4',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
           {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Comun_Secundario", "http://192.168.57.20/geoserver/mariano/wms?",
                   {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=3',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
           {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Comun_Primario", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       cql_filter: 'sector = 6 and capa=2',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
          {
            source: "ol",
            group: "mapaescolar",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Estatal_Comun_Inicial", "http://192.168.57.20/geoserver/mariano/wms?",
                   {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                        cql_filter: 'sector = 6 and capa=1',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
            source: "ol",
            group: "ambito",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Rural", "http://192.168.57.20/geoserver/mariano/wms?",
                   {
                        LAYERS: 'mariano:v_ambito',
                       cql_filter: 'idubicacion IN (2,3,4) ',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },         
            {
            source: "ol",
            group: "ambito",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Urbano", "http://192.168.57.20/geoserver/mariano/wms?",
                   {
                        LAYERS: 'mariano:v_ambito',
                       cql_filter: 'idubicacion = 1',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
              source: "ol",
              group: "otros_org",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["CCIIE", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_otros_org',
                        cql_filter: "idtipoorganizacion IN ('IC') ", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
              source: "ol",
              group: "otros_org",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Jefatura de Región Privada", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_otros_org',
                        cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '4'", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
              source: "ol",
              group: "otros_org",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Jefatura de Región Estatal", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_otros_org',
                        cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '0'", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
              source: "ol",
              group: "otros_org",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Jefatura Distrital Estatal", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_otros_org',
                        cql_filter: "idtipoorganizacion IN ('TH')  and iddependencia = '0'", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
             {
              source: "ol",
              group: "limite_partidos",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Límite de Partido", "http://192.168.57.20/geoserver/carto_base/wms?",
                    {
                        LAYERS: 'carto_base:partidos',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
            {
              source: "ol",
              group: "limite_regiones",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Límite de Región", "http://192.168.57.20/geoserver/carto_base/wms?",
                    {
                        LAYERS: 'carto_base:regiones',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },
             {
              source: "ol",
              group: "predios",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Predios", "http://192.168.57.20/geoserver/carto_base/wms?",
                    {
                        LAYERS: 'carto_base:predios',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1, singleTile: true}
                ]
            },
            
             {
              source: "ol",
              group: "escuelas",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Escuelas", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                       // cql_filter: "idtipoorganizacion IN ('TH')  and iddependencia = '0'", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1/*, opacity: 0.5*/, singleTile: true}
                ]
            },

            /*
            {
            source: "ol",
            group: "Estatal_Comun_Inicial",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["radio 1000m", "http://192.168.57.20/geoserver/mariano/wms?",
                    {
                        LAYERS: 'mariano:v_escuelas_geoserver',
                        cql_filter: param, // 0.01=1 km=1000 Mts
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1, singleTile: true}
                ]
            },
            */
           
          /*
            {
            source: "ol",
            group: "Estatal_Comun_Inicial",
           // fixed: true,
            type: "OpenLayers.Layer.WMS",
            args: ["Región 1", "http://192.168.57.20/geoserver/Mapa/wms?",
           // request=GetFeatureInfo&service=WMS&version=1.1.1&layers=prueba:v_escuelas_geoserver&styles=&srs=EPSG:4326&format=image/png&bbox=-7056953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602&width=780&height=330&query_layers=prueba:v_escuelas_geoserver
                              {
                        LAYERS: 'Mapa:partidos_nuevo',
                        cql_filter: "nombre in ('LA PLATA','BERISSO','PTA. INDIO','CNEL BRANDSEN','MAGDALENA','ENSENADA')", 
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: false, ratio: 1, opacity: 0.2, singleTile: true}
                ]
            },
          */
            /*
          {
            source: "mapaescolar_wms",
            name: "Privado_Fisica",
            visibility: false,
            title: "Privado_Fisica",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Psicologia",
            visibility: false,
            title: "Privado_Psicologia",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Artistica",
            visibility: false,
            title: "Privado_Artistica",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Especial_Talleres",
            visibility: false,
            title: "Privado_Especial_Talleres",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Especial_Secundario",
            visibility: false,
            title: "Privado_Especial_Secundario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Especial_Primario",
            visibility: false,
            title: "Privado_Especial_Primario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Especial_Inicial",
            visibility: false,
            title: "Privado_Especial_Inicial",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Adultos_FP",
            visibility: false,
            title: "Privado_Adultos_FP",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Adultos_Medio",
            visibility: false,
            title: "Privado_Adultos_Medio",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Adultos_Primario",
            visibility: false,
            title: "Privado_Adultos_Primario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Comun_Superior",
            visibility: false,
            title: "Privado_Comun_Superior",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Comun_Secundario",
            visibility: false,
            title: "Privado_Comun_Secundario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Comun_Primario",
            visibility: false,
            title: "Privado_Comun_Primario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Privado_Comun_Inicial",
            visibility: false,
            title: "Privado_Comun_Inicial",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Fisica",
            visibility: false,
            title: "Estatal_Fisica",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Psicologia",
            visibility: false,
            title: "Estatal_Psicologia",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Artistica",
            visibility: false,
            title: "Estatal_Artistica",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Especial_Talleres",
            visibility: false,
            title: "Estatal_Especial_Talleres",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Especial_Secundario",
            visibility: false,
            title: "Estatal_Especial_Secundario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Especial_Primario",
            visibility: false,
            title: "Estatal_Especial_Primario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Especial_Inicial",
            visibility: false,
            title: "Estatal_Especial_Inicial",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Adultos_FP",
            visibility: false,
            title: "Estatal_Adultos_FP",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Adultos_Medio",
            visibility: false,
            title: "Estatal_Adultos_Medio",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Adultos_Primario",
            visibility: false,
            title: "Estatal_Adultos_Primario",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Comun_Superior",
            visibility: false,
            title: "Estatal_Comun_Superior",
            group: "mapaescolar"
        },
        {
            source: "mapaescolar_wms",
            name: "Estatal_Comun_Secundario",
            visibility: false,
            title: "Estatal_Comun_Secundario",
            group: "mapaescolar"
        },
        
        {
            source: "mapaescolar_wms",
            name: "Estatal_Comun_Primario",
            visibility: false,
            title: "Estatal_Comun_Primario",
            group: "Estatal_Comun_Primario"
        },
        
        {
            source: "mapaescolar_wms",
            name: "Estatal_Comun_Inicial",
            visibility: false,
            title: "Inicial_wms ",
            group: "Estatal_Comun_Inicial"
        },
           */
       
        //////////////////
        // Capas Base
        /*	
         {
            source: "ign",
            name: "SIGN",
            title: "Capa Base SIG 250 IGN",
            group: "background"
         },
         */
		 {                
            source: "google",
            name: "HYBRID",
            title: "Google Híbrido",
            group: "background"
        },{
            source: "google",
            name: "ROADMAP",
            title: "Google Callejero",
            group: "background"
        },{
            source: "google",
            name: "SATELLITE",
            title: "Google Satélite",
            group: "background"
        },{
            source: "google",
            name: "TERRAIN",
            title: "Google Físico",
            group: "background"
        },{
            source: "bing",
            name: "Road",
            title: "Bing Road",
            group: "background"
        },{
            source: "bing",
            name: "Aerial",
            title: "Bing Aerial",
            group: "background"
        },{
            source: "bing",
            name: "AerialWithLabels",
            title: "Bing Aerial Labels",
            group: "background"
        },
        
        {
            source: "ol",
            group: "background",
            type: "OpenLayers.Layer.WMS",
            args: ["Base", "http://192.168.57.20/geoserver/carto_base/wms?",
                    {LAYERS: 'carto_base:carto_base'}
                  ]
        },
        
        {
            source: "osm",
            name: "mapnik",
            title: "Open Street Map",
            selected: true,
            group: "background"
        },
       
        {
            source: "ol",
            group: "background",
            fixed: true,
            type: "OpenLayers.Layer",
            args: ["Sin capa base",
            {
                visibility: false
            }]
        },
        {
              source: "ol",
              group: "background",
              // fixed: true,
              type: "OpenLayers.Layer.WMS",
              args: ["Partidos", "http://192.168.57.20/geoserver/carto_base/wms?",
                    {
                        LAYERS: 'carto_base:partidos',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: true, ratio: 1,displayInLayerSwitcher: false/*, opacity: 0.5*/, singleTile: true}
                ]
            }
]
