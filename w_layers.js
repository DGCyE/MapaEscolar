
var bingKey = "Arg5tKlOc0yVrWhW8i7X3krTpcG8n-QHY6FFnG-ewK79sUbkW-6cBPOPGwstJetK";

var _layersParams = new Array();


function formatLonlats(lonLat) {
	 var lat = lonLat.lat;
	 var lg  = lonLat.lon;
	 var ns = OpenLayers.Util.getFormattedLonLat(lat);
	 var ew = OpenLayers.Util.getFormattedLonLat(lg,'lon');
	 //return ns + ', ' + ew + ' (' + (Math.round(lat * 10000) / 10000) + ', ' + (Math.round(long * 10000) / 10000) + ')';
	 return ns + ', ' + ew;
}

function creaMapaPrincipal(){

   var minZoomLevel = 6;
   var maxResolution='156543.0339';
   var numZoomLevel = 19;
   var scales = [5000000, 2500000, 1750000, 1000000, 750000, 500000, 350000, 200000, 100000, 50000, 10000, 5000, 2500, 1000, 500, 250, 100, 50, 7];
   var minScale= [7];
   var maxScale= [5000000];
   var maxExtent = new OpenLayers.Bounds(-7356953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602);
   var restrictedExtent= new OpenLayers.Bounds(-7356953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602);

   if( !baseMap ){
      var minZoomLevel = 6;
      var numZoomLevel = 19;
	  var maxExtent = new OpenLayers.Bounds(-7356953.73642308, -5017120.45690587, -6308031.45840665, -3929585.58862602);
   }

    var options = {
      projection: "EPSG:900913",
      displayProjection: "EPSG:4326",
      units: "meters",
      controls:[],
      maxExtent: maxExtent,
      restrictedExtent: restrictedExtent,
      maxResolution: maxResolution,
      scales: scales,
      minScale: minScale,
      maxScale: maxScale,
     // minZoomLevel: minZoomLevel,
      numZoomLevels: numZoomLevel
   };

	// cria��o e defini��o do mapa principal
	var map = new OpenLayers.Map( 'mapa' , options );
	map.id = 'mapa_principal';

	map.addControl(new OpenLayers.Control.Scale($('Escala')));
	map.addControl(new OpenLayers.Control.Navigation({
						dragPanOptions: {
							enableKinetic: true
						}
				   }));
    map.addControl(new OpenLayers.Control.Attribution());
    map.addControl(new OpenLayers.Control.Zoom());
	map.addControl(new OpenLayers.Control.MousePosition({element: $('Localizacion'), formatOutput: formatLonlats}));
	map.addControl(new OpenLayers.Control.ScaleLine());

	return map;

}


function criaLayersGoogle(){

/*
 // se nenhum dos mapas estiver habilitado seta baseMap false
    if( !useGoogle && !useYahoo && !useVirtualEarth ){
	   baseMap = false;
	}

    // se o parametro de querystring for basemap=false n�o carrega os mapas
    if( !baseMap ) return new Array();
	*/

	var layers = new Array();

//////////////// Base ///////////////////////////////

	// Google ///////////////////////////////////////

   layers.push( new OpenLayers.Layer.OSM("Sin capa base",[""]));

    if( useGoogle ){
	    layers.push(new OpenLayers.Layer.Google(
			"Google Terrain",
			{type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 12}
		));
		layers.push(new OpenLayers.Layer.Google(
			"Google Streets", // the default
			{numZoomLevels: 20}
		));
		layers.push(new OpenLayers.Layer.Google(
			"Google Hybrid",
			{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
		));
		layers.push(new OpenLayers.Layer.Google(
			"Google Satellite",
			{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
		));

	}


	// Bing (Openlayers 2.12)

	if( useVirtualEarth ){

		layers.push(new OpenLayers.Layer.Bing(
		{
           name: "Bing Roads",
           type: "Road",
           key: bingKey,
		   metadataParams: {mapVersion: "v1"},
		   sphericalMercator: true,
		   maxZoomLevel:19
		}));
		layers.push(new OpenLayers.Layer.Bing(
		{
           name: "Bing Aerial",
           type: "Aerial",
           key: bingKey,
		   sphericalMercator: true,
		   maxZoomLevel:19
		}));
		layers.push(new OpenLayers.Layer.Bing(
		{
           name: "Bing Hybrid",
           type: "AerialWithLabels",
           key: bingKey,
		       sphericalMercator: true,
		       maxZoomLevel:19
		}));

 }

 layers.push( new OpenLayers.Layer.OSM() );

  options = { isBaseLayer: false,
              format: "image/png",
               buttonOpacity: true,
               displayOutsideMaxExtent:true,
               visibility: false
   };

layers.push( new OpenLayers.Layer.WMS("Partidos","http://192.168.54.20/geoserver/carto_base/wms?",
                    {
                        LAYERS: 'carto_base:partidos',
                        transparent:true
                    },
                  {isBaseLayer: false, visibility: true, ratio: 1,displayInLayerSwitcher: false, singleTile: true}
                ));

layers.push( new OpenLayers.Layer.WMS("Capa Base", "http://192.168.54.20/geoserver/carto_base/wms?", {layers: 'carto_base:carto_base', format: "image/png"},
             {isBaseLayer: true, numZoomLevels: 19 }));


   return layers;

}

function criaLayersPrincipal(){

 //  alert('criaLayersPrincipal');

   var layers = new Array();

////////  LAYERS //////////////////////////////////////////////////////////////////////////////////////////////////////////

  // layers.push(new OpenLayers.Layer.WMS("Base", "http://192.168.54.20/geoserver/carto_base/wms?", {
  //           layers: "carto_base:carto_base",transparent:true, format: 'image/png'},
  //           {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "comun",singleTile: true
  //         }
  //   ));


 layers.push(new OpenLayers.Layer.WMS("CCIIE", "http://192.168.54.20/geoserver/mariano/wms", {
            layers: "mariano:v_otros_org",transparent:true, cql_filter: "idtipoorganizacion IN ('IC')",
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "cie",singleTile: true
          }
    ));

 layers.push(new OpenLayers.Layer.WMS("Jefatura de Región Privada", "http://192.168.54.20/geoserver/mariano/wms", {
            layers: "mariano:v_otros_org",transparent:true, cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '4'",
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "jef",singleTile: true
          }
    ));

 layers.push(new OpenLayers.Layer.WMS("Jefatura de Región Estatal", "http://192.168.54.20/geoserver/mariano/wms", {
            layers: "mariano:v_otros_org",transparent:true, cql_filter: "idtipoorganizacion IN ('TJ')  and iddependencia = '0'",
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "jef",singleTile: true
          }
    ));

 layers.push(new OpenLayers.Layer.WMS("Jefatura Distrital Estatal", "http://192.168.54.20/geoserver/mariano/wms", {
            layers: "mariano:v_otros_org",transparent:true, cql_filter: "idtipoorganizacion IN ('TH')  and iddependencia = '0'",
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "jef",singleTile: true
          }
    ));

 layers.push(new OpenLayers.Layer.WMS("Predios", "http://192.168.54.20/geoserver/carto_base/wms", {
            layers: "carto_base:predios",transparent:true,
            format: 'image/png'},
            {isBaseLayer: false, visibility: false, ratio: 1,displayInLayerSwitcher: false,  group: "predios",singleTile: true
          }
    ));

layers.push(layerEscuelasCql);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*************
   var paramsCache  = { transparent: "true",
                    tileSize: new OpenLayers.Size(256,256),
                    tiled: true
                  };

   var params  = { transparent: "true"
             };

   options = { isBaseLayer: false,
              format: "image/jpeg",
            singleTile: false, ratio: 1,
               buttonOpacity: true,
               displayOutsideMaxExtent:true,
               visibility: false
   };

   var link_geoserver = "http://192.168.54.20/geoserver/mariano/wfs";

   var wms = new OpenLayers.Layer.WMS("Base Arba", link_geoserver, paramsCache, options);
   wms.params["LAYERS"] = "carto_base:carto_base";
  // wms.params["EXPORT-MENU"] = false;
   wms.singleTile = false;
   wms.group = "comun";
   layers.push(wms);

   options = { isBaseLayer: true,
              format: "image/png",
               buttonOpacity: true,
               displayOutsideMaxExtent:true,
               visibility: true
   };
   /*/////////////////////////////////////////////////////////////////////////////////////

 return layers;

}

function criaGradeLatLong(){

   return graticuleMap = new OpenLayers.Control.Graticule({
					   numPoints: 1,
					   labelled: true,
					   lineSymbolizer:{strokeColor: this.Color, strokeWidth: 0.4, strokeOpacity: 0.3},
					   labelSymbolizer: new OpenLayers. Symbolizer.Text({fontSize:10}),
					   visible: true,
					   displayInLayerSwitcher: false
   });


}
