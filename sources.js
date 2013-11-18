var sources = {
    me_dev: {
        url: "http://192.168.54.20/geoserver/mariano/wms",
        title: "Mapa Escolar :: A Prueba",
        ptype: "gxp_wmssource"
    },
    me: {
        url: "http://192.168.54.20/geoserver/carto_base/wms",
        title: "Mapa Escolar :: Cartografia Estable",
        ptype: "gxp_wmssource"
    },
    ign: {
        url: "http://wms.ign.gob.ar/geoserver/wms?",
        title: "Instituto Geográfico Nacional ",
        ptype: "gxp_wmscsource"
    },
    hidraulica: {
        url: "http://www.mosp.gba.gov.ar/wms_hidraulica/cgi-bin/mapserv.exe?map=/ms4w/apps/m/wms.map",
        title: "Buenos Aires - Dccion. Hidraulica",
        ptype: "gxp_wmscsource"
    },
    bing: {
        ptype: "gxp_bingsource"
    },
    google: {
        ptype: "gxp_googlesource"
    },
    osm:{
        ptype: "gxp_osmsource"
    },
    ol: {
        ptype: "gxp_olsource"
    },
    idera_csw: {
        ptype: "gxp_cataloguesource",
        url: "http://www.idera.gob.ar/catalogo/srv/es/csw?request=GetCapabilities&service=CSW",
        //url: "http://ide.se.gov.ar/geonetwork/srv/en/csw",
        title: "Catalogo IDERA"
    }
}