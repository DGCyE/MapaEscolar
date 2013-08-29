addOverview = function() {
    var mapOptions = {
        maxExtent: new OpenLayers.Bounds(-7175626.9266567,-5141723.905941,-6304445.4046767,-3812835.624341),
        //numZoomLevels: 1,
        projection: new OpenLayers.Projection("EPSG:900913"),
        units: "m"
    };
    var controlOptions = {
        size: new OpenLayers.Size(328, 128),
        div: Ext.get('overviewmap'),
        mapOptions: mapOptions,
        destroy: function() {},
        layers: [
            new OpenLayers.Layer.WMS(
                "overview", 
                "http://wms.ign.gob.ar/geoserver/wms?", 
                {
                    layers: 'SIGN'
                }, {
                    buffer: 0, 
                    ratio: 1, 
                    singleTile: true
                }
            )
        ]
    };


    var overview = new OpenLayers.Control.OverviewMap(controlOptions);
    app.mapPanel.map.addControl(overview);
}

permalinkProvider = new GeoExt.state.PermalinkProvider({encodeType: false});
Ext.state.Manager.setProvider(permalinkProvider);
permalinkProvider.on({
    statechange: function(provider) {
        permalink = provider.getLink();
    }
});

