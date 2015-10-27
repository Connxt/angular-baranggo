var map = function() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiYm9yYnoiLCJhIjoiMmZhZThhZWIzMWJlMzBmMjlkMWEzZjNmNmQ4ZjU3MTMifQ.ZBxUELvSRu6SMeVxM5IyZw';
	var map = L.mapbox.map('map', 'borbz.mm8lf2pm',{
		maxZoom: 20
	}).setView([9.985, 122.818],17);

	var layers = {
		Sattelite: L.mapbox.tileLayer('borbz.mk8g2fk7'),
		Street: L.mapbox.tileLayer('borbz.mm8lf2pm')
	};

	var outdoor = L.mapbox.featureLayer().addTo(map);
	outdoor.setGeoJSON(geojson);
	var residencialHouses = L.layerGroup();
	var popup = L.popup();
	var lat;
	var lng;
	var prevLat;
	var prevLng;
	var marker;
	var markerLocation = null;
	var family;
	var memberCounter = 0;

	outdoor.eachLayer( function (locale) {
		var prop = locale.feature.properties;
		var coor = locale.feature.properties.coordinates;
		var family = locale.feature.properties.house;
		var member = locale.feature.properties.member;
		var street = locale.feature.properties.address.street;
		var brgy = locale.feature.properties.address.brgy;
		var city = locale.feature.properties.address.city;
		var memar = [];

		for(i = 0;i < member.length; i++){
			var person = member[i];
			$("#residents").append($("<option></option>").val(person).html(person));
		}

		for(i = 0;i < member.length; i++){
			var m = '<br/>' + member[i];
			memar.push(m);
		}

		var lat = coor[1];
		var lng = coor[0];
		var content = '<h3>' + family + '<br/></h3><div class="popup-content"><p>' + street + ' Brgy. ' + brgy + ' ' + city + '<br/> <strong>Member </strong>:'  + memar + '</p></div>';
		var m = residencialHouses.addLayer(L.marker([lat,lng]).bindPopup(content)).addTo(map);
		m.addTo(map);
	});

	layers.Street.addTo(map);
	L.control.layers(layers).addTo(map).addOverlay(residencialHouses, " Houses");

	$("#residents").select2({
		placeholder: "Select person ....",
		allowClear: true
	});

	$("#residents").change( function(){
		var search = $("#residents").val();
		var filter = L.geoJson(geojson, {
			filter: function ( feature, layer) {
				var member = feature.properties.member
				var index = member.indexOf(search);

				if(index !== -1){
					var coor  = feature.properties.coordinates;
					lat = coor[1];
					lng = coor[0];
					family = feature.properties.house;
					var street = feature.properties.address.street;
					var brgy = feature.properties.address.brgy;
					var city = feature.properties.address.city;

					var content = '<h3>' + family + '</h3><div class="popup-content"><p>' + street + ' Brgy. ' + brgy + ' ' + city + '</p></div>';
					if(markerLocation == null ) {
						prevLat = lat;
						prevLng = lng;
						markerLocation = new L.LatLng(lat,lng);
						marker = new L.Marker(markerLocation);
						map.addLayer(marker);
						marker.bindPopup(content);
						marker.openPopup();
					}  else{
						map.removeLayer(marker)
						markerLocation = new L.LatLng(lat,lng);
						marker = new L.Marker(markerLocation);
						map.addLayer(marker);
						marker.bindPopup(content);
						marker.openPopup();
					}
				}
			}
		});
	});
};

var waitForMapbox = function(attemptsLeft) {
	var tick = attemptsLeft || 30; 

	if(typeof(L) != "object") {
		setTimeout(function() {
			waitForMapbox(tick - 1);
		}, 100);
	}
	else {
		map();
		$(".leaflet-bottom, .leaflet-right").hide();
	}
};

waitForMapbox();