function googlegeocoder() {

 var form = new Ext.FormPanel({
        id: _FORM_BUSCAR_ESCUELA,
        frame:false,
        bodyStyle:'padding:5px 5px 0',
        width: 629,
        items: [
                 {
		        id: 'valor',
				//ref: '../valor',
		        xtype:'textfield',
                fieldLabel: 'Buscar un lugar',
				anchor: '100%',
                name: 'valor',
                allowBlank:false
				
			   },
              //   PresidentListingWindow
           
        ], //,comboNivMod,boxNombre
        buttons: [{
            text: 'Buscar',
			handler: function(){
			    submitForm();
			}

        }]
    }); 

var alturaVentana = 120;

return new Ext.Window({
					title: 'Buscar un lugar',
					height: alturaVentana, // antigo 300 para a versao nao completa 500 para a completa
					width: 400,
					layout: 'fit',
					resizable: true, 
				//	iconCls: 'gxp-icon-find',
					items: [ form ]
		      });

 /*




 var map = null;
var geocoder = null;
var large3dcontrol = null;
var small3dcontrol = null;
var gmapcontrol = null;
var gmenucontrol = null;
var lastClickTime = null;
var clckTimeOut = null
var html = [];
var markers = [];
var addresses = [];
var ui = null;
var marker = [];
var html = [];
var http = null;
var response=null;
var latlng = [];

function initialize()
{
	http=GetXmlHttpObject();
	if (GBrowserIsCompatible())
	{
		map = new GMap2(document.getElementById('map_canvas'));

		map.setMapType(G_HYBRID_MAP);
		map.setCenter(new GLatLng(40, 0), 1);

		large3dcontrol = new GLargeMapControl3D();
		small3dcontrol = new GSmallZoomControl3D();
		gmapcontrol = new GMapTypeControl();
		gmenucontrol = new GMenuMapTypeControl();

		map.addControl(large3dcontrol);
		map.addControl(gmapcontrol);

		GEvent.addListener(map, 'click', mapClick);

		geocoder = new GClientGeocoder();
	}
}

function mapClick(overlay, clickedPoint, shape_id)
{
	//catches the second click from the map listener when the shape listener fires a click
	var d = new Date();
	var clickTime = d.getTime();
	var clickInterval = clickTime - lastClickTime;
	if(clickInterval<10)
	{
		return 0;
	}
	else lastClickTime=clickTime;

	//stops a single click if there is a double click
	if (clckTimeOut)
	{
			window.clearTimeout(clckTimeOut);
			clckTimeOut = null;
			//doubleclick
	}
	else
	{
			clckTimeOut = window.setTimeout(function(){singleClick(clickedPoint)},500);
	}
 }


function singleClick(clickedPoint)
{
	map.setCenter(clickedPoint);
	var marker = new GMarker(clickedPoint,{draggable: true});
	var i = markers.length
	markers[i] = marker;
	map.addOverlay(markers[i]);

	var location = marker.getLatLng();

	var lat=location.lat();
	var lng=location.lng();

	addresses[i] = "";
	setHtml(i);

	GEvent.addListener(markers[i], 'click', function() {markers[i].openInfoWindowHtml(html[i]);});
	GEvent.addListener(markers[i], 'dragstart', function() {markers[i].closeInfoWindow();});
	GEvent.addListener(markers[i], 'dragend', function() {setHtml(i);markers[i].openInfoWindowHtml(html[i]);});

}

function convertToDegrees(num, type)
{
	var sign = ""
	if(type == 'lat')
	{
		if(num<0)sign = "S ";
		else sign = "N ";
	}
	else if(type == 'lng')
	{
		if(num<0)sign = "W ";
		else sign = "E ";
	}

	num = Math.abs(num);

	var degree_num = Math.floor(num);
	var minute_num = (num - degree_num)*60;
	var second_num = (minute_num - Math.floor(minute_num))*60;

	second_num=Math.round(second_num*10000)/10000;
	minute_num = Math.floor(minute_num);

	return sign + degree_num + "&#176; " + minute_num + "' " + second_num + "''";
}

*/

function setHtml(i) {

	var location = markers[i].getLatLng();
	var lat=location.lat();
	var lng=location.lng();

	lat=Math.round(lat*1000000)/1000000;
	lng=Math.round(lng*1000000)/1000000;

	document.getElementById('marker_lat').innerHTML = lat;
	document.getElementById('marker_lng').innerHTML = lng;

	html[i]= addresses[i] + "<br/><table><tr><td colspan=2><b>Decimal Values</b></td></tr><tr><td>Latitude = </td><td>"
	html[i]+= lat + "</td></tr><tr><td>Longitude = </td><td>" + lng + "</td></tr>";
	html[i]+= "<tr><td colspan=2><b>Degree Values</b></td></tr><tr><td>Latitude = </td><td>" + convertToDegrees(lat, 'lat');
	html[i]+= "</td></tr><tr><td>Longitude = </td><td>" + convertToDegrees(lng, 'lng') + "</td></tr></table>";

}

function submitForm() {
  if (geocoder) {
  	var address=document.getElementById("valor").value;
alert(address);
	geocoder.getLatLng(
	  address,
	  function(point) {
		if (!point) {
		  alert(address + " not found, please be more specific");
		} else {
		  map.setCenter(point);
		  map.setZoom(17);
		  var marker = new GMarker(point,{draggable: true});
		  var i = markers.length
		  markers[i] = marker;
		  map.addOverlay(markers[i]);

		  var location = marker.getLatLng();

		  var lat=location.lat();
		  var lng=location.lng();

		  addresses[i] = address
		  setHtml(i);

		  GEvent.addListener(markers[i], 'click', function() {markers[i].openInfoWindowHtml(html[i]);});
		  GEvent.addListener(markers[i], 'dragstart', function() {markers[i].closeInfoWindow();});
		  GEvent.addListener(markers[i], 'dragend', function() {setHtml(i)});

		  document.getElementById("marker_lat").value= lat;
		  document.getElementById("marker_lng").value= lng;


		}
	  }
	);
  }
}
/*
function centerPoints()
{
  var latlngbounds = new GLatLngBounds( );
  for ( var i = 0; i < latlng.length; i++ )
  {
    	if(latlng[ i ])latlngbounds.extend( latlng[ i ] );
  }
  map.setCenter( latlngbounds.getCenter( ), map.getBoundsZoomLevel( latlngbounds ) );
}

function goToEmbed()
{


}

*/
}