function getWMSGeoExt(varUrl){



   var store = new GeoExt.data.WMSCapabilitiesStore({

                          url: varUrl + "?SERVICE=WMS&version=1.1.1&REQUEST=GetCapabilities",

                          autoLoad: true

               });

			   

   store.load({

        callback: function() {

		   for(var i = 0; i < map.layers.length; i++){

			  if( !map.layers[i].isBaseLayer){

				 for(var j = 0; j < store.data.items.length; j++){

				    if( map.layers[i].params ){

						if(map.layers[i].params["LAYERS"] == store.data.items[j].data.name){

							var box = store.data.items[j].data.llbbox;

							map.layers[i].mergeNewParams({

							     LAYEREXTENT: new OpenLayers.Bounds(box[0], box[1], box[2], box[3]).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"))

							});

						}	

					}	

				 } 

		      }   

           }			 

        }

   });

   

   return store;		   



}



function getLayerByName( mapa, nomeLayer ){



    for(var i = 0; i < mapa.layers.length; i++){

	    if( map.layers[i].name == nomeLayer ){

		    return map.layers[i];

		}

	}



}



