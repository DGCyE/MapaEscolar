var layers = [{
        source: "me_dev",
        name: "v_otros_org",
        visibility: false,
        cql_filter: "idtipoorganizacion IN ('IC')",
        title: "Organismos de Educacion descentralizados",
        group: "cie"
    },{
        source: "me_dev",
        name: "v_otros_org",
        visibility: false,
        cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '4'",
        title: "Jefatura de Región Privada",
        group: "jef"
    },{
        source: "me_dev",
        name: "v_otros_org",
        visibility: false,
        cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '0'",
        title: "Jefatura de Región Estatal",
        group: "jef"
    },{
        source: "me_dev",
        name: "v_otros_org",
        visibility: false,
        cql_filter: "idtipoorganizacion IN ('TH')  and iddependencia = '0'",
        title: "Jefatura Distrital Estatal",
        group: "jef"
    },
    {
        source: "ol",
        type: "OpenLayers.Layer.WMS",
        visibility: false,
        args: ["Predios", "http://192.168.54.20/geoserver/carto_base/wms", {layers: 'predios',transparent:true}],
        title: "Predios",
        group: "predios"
    },
    {
        source: "me",
        name: "partidos",
        visibility: true,
        title: "Partidos",
        type: "OpenLayers.Layer",
        group: "util"
    },{
        source: "me_dev",
        name: "v_escuelas_geoserver",
        visibility: false,
        title: "Escuelas Filtradas",
        type: "OpenLayers.Layer",
        group: "consulta",
        cql_filter: "sector = 5 AND capa IN (1)"
    },{
        source: "me_dev",
        name: "v_indi_distrito",
        visibility: false,
        title: "Consulta Indicadores",
        type: "OpenLayers.Layer",
        group: "consulta",
        cql_filter: ""
    },
    // Capas Base
    // {   
    //     source: "me",
    //     name: "carto_base",
    //     title: "Capa Base",
    //     group: "background"
    // },
    // Capas Base ///////////////////////////////////////////////////////////////////////////////
    {
         source: "ol",
         type: "OpenLayers.Layer.WMS",
         args: ["Capa Base", "http://192.168.54.20/geoserver/carto_base/wms", {layers: 'carto_base'}],
         title: "Capa Base",
         group: "background"
    },{
        source: "google",
        name: "HYBRID",
        title: "Google Hibrido",
        group: "background"
    },{
        source: "google",
        name: "SATELLITE",
        title: "Google Satelite",
        group: "background"
    },{
        source: "bing",
        name: "Aerial",
        title: "Bing Satelite",
        group: "background"
    },{
        source: "osm",
        name: "mapnik",
        title: "Open Street Map",
        group: "background"
    },{
        source: "ol",
        group: "background",
        fixed: true,
        type: "OpenLayers.Layer.WMS",
        args: ["Sin Capa base", "http://192.168.54.20/geoserver/carto_base/wms", {layers: 'partidos'}]
    }
]