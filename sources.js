var sources = {	

      mapaescolar_wms:
        {
         url: "http://190.210.101.129/cgi-bin/mapaescolar",
         title: "Buenos Aires - Mapa Escolar",
		     ptype: "gxp_wmssource"
       },

       geoserver:
        {
         url: "http://25.161.221.52/geoserver/Mapa/wms",
         title: "Geoserver - Mapa",
         ptype: "gxp_wmssource"
       },
     geoserver_mariano:
        {
         url: "http://25.161.221.52/geoserver/mariano/wms?",
         title: "Geoserver - Mariano",
         ptype: "gxp_wmssource"
       },
       geoserver_cartobase:
        {
         url: "http://25.161.221.52/geoserver/carto_base/wms?",
         title: "Geoserver - CartoBase",
         ptype: "gxp_wmssource"
       },

       

 /*///////  WMS TERCEROS /////////////////////////////////////////////////////      
     hidraulica: {
            url: "http://www.mosp.gba.gov.ar/wms_hidraulica/cgi-bin/mapserv.exe?map=/ms4w/apps/m/wms.map",
            title: "Buenos Aires - Dccion. Hidraulica",
            ptype: "gxp_wmssource",
            version: "1.1.1"
           },
     salud: {
            url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/salud/wms?",
            title: "Buenos Aires - Salud",
            ptype: "gxp_wmscsource"
          }, 
     urbasig: {
        url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/urbasig/wms?",        
        title: "Buenos Aires - URBASIG",
        ptype: "gxp_wmscsource"
       },  
     ign: {
         url: "http://wms.ign.gob.ar/geoserver/ows",
       //  url: "ogc/ign2.xml",
         title: "Instituto Geografico Nacional",
         ptype: "gxp_wmscsource"
        },  
  *////////  WMS TERCEROS /////////////////////////////////////////////////////  

    ol: {
        ptype: "gxp_olsource"
    },
    bing: {
        ptype: "gxp_bingsource"
    },
    google: {
    	ptype: "gxp_googlesource"
    },
    bing: {
        ptype: "gxp_bingsource"
    },
    osm:{
        ptype: "gxp_osmsource"
    }
}