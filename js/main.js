

var map = L.map('map', {
    center: L.latLng(8.465677, -13.231722),
    zoom: 7
});

/* Example from Leaflet Quick Start Guide*/
/*var map = L.map('map', {
    center: L.latLng(8.465677, -13.231722),
    zoom: 6.35
});

//add tile layer...replace project id and accessToken with your own
//L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
   //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   //}).addTo(map);

var basemap0 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 28
        });
        basemap0.addTo(map);

	var basemap1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 28
        });
        basemap1.addTo(map);

	var basemap2 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            maxZoom: 28
        });
        basemap2.addTo(map);

var baseMaps = {'OSM': basemap0, 'OSM B&W': basemap1, 'Stamen Toner': basemap2};

L.control.layers(baseMaps).addTo(map);

/*map.addControl(new L.Control.Search({
            layer: 'C:\wamp64\www\Geog575Lab1\data\geoJSON\guinea_ebola',
            initial: false,
            hideMarkerOnCollapse: true,
            propertyName: 'NAME_2'}));*/
var legend = null;

 function createLegend(map, attribute){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            //var container = L.DomUtil.create('div', 'legend-control-container');

			var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 50, 100, 500, 1000, 2000],
			labels = [];

			div.innerHTML += '<h4>' + attribute + '</h4>';

			// loop through our density intervals and generate a label with a colored square for each interval
			for (var i = 0; i < grades.length; i++) {
				div.innerHTML +=
					'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
					grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			}

			return div;

			//onAdd: function (map) {
            // create the control container div with a particular class name
            //var container = L.DomUtil.create('div', 'sequence-control-container');

            //create range input element (slider)
            //$(container).append('<input class="range-slider" type="range">');

            //return container;
        //}

			//legend.addTo(map);

            //return container;
        }
    });

	if(legend != null) {
		map.removeControl(legend);
	}
	legend = new LegendControl();
    map.addControl(legend);
};
/*var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 50, 100, 500, 1000, 2000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);*/

//function createSequenceControls(map, attributes){
    //var SequenceControl = L.Control.extend({
       // options: {
          //  position: 'bottomright'
        //},
		//onAdd: function (map) {
            // create the control container div with a particular class name
            //var container = L.DomUtil.create('div', 'sequence-control-container');

            //create range input element (slider)
            //$(container).append('<input class="range-slider" type="range">');

            //return container;
       // }
   // });

  //  map.addControl(new SequenceControl());

function onEachFeature(feature, layer) {
	//no property named popupContent; instead, create html string with all properties
	//var popupContent = "";
	//if (feature.properties) {
		//loop to add feature property names and values to html string
	//	for (var property in feature.properties){
	//		popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
	//	}
	//	layer.bindPopup(popupContent);
	//};

	layer.bindPopup(L.Util.template('<b>District</b>: {District}<br> <b>Confirmed Cases</b>: {Jan_2014}', feature.properties));
  console.log(feature.properties);
    //event listeners to open popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        },
        click: function(){
            $("#map").html(L.Util.template('<b>District</b>: {District}<br> <b>Confirmed Cases</b>: {Jan_2014}', feature.properties));
        }
    });

};
function getColor(Jan_2014) {
    return Jan_2014 == 0    ? '#FFFFE5' :
           Jan_2014 < 10   ? '#FED976' :
           Jan_2014 < 50   ? '#FEB24C' :
           Jan_2014 < 100  ? '#FD8D3C' :
           Jan_2014 < 500  ? '#FC4E2A' :
           Jan_2014 < 1000 ? '#E31A1C' :
           Jan_2014 < 2000 ? '#BD0026' :
           Jan_2014 > 2001 ? '#800026' :
							'#8B0000';
}
function style(attribute) {
    return {
        fillColor: getColor(attribute),
        weight: 1.5,
        opacity: 1,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.7
    };
}
//function highlight(feature, layer) {
    //layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        //click: zoomToFeature
   // });
//}

function createSequenceControls(map){

		/*onAdd: function (map) {
					// create the control container div with a particular class name
					var container = L.DomUtil.create('div', 'sequence-control-container');

					//create range input element (slider)
					$(container).append('<input class="range-slider" type="range">');

					return container;
				}*/

    //create range input element (slider)
    $('#map').append('<input class="range-slider" type="range">');
	$('.skip').click(function(){
        //sequence
    });

    //Step 5: input listener for slider
    $('.range-slider').on('input', function(){
        //sequence
		var index = $('.range-slider').val();
		//Step 6: increment or decrement depending on button clicked
        if ($(this).attr('id') == 'forward'){
            index++;
            //Step 7: if past the last attribute, wrap around to first attribute
            index = index > 9 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse'){
            index--;
            //Step 7: if past the first attribute, wrap around to last attribute
            index = index < 0 ? 9 : index;
        };

        //Step 8: update slider
        $('.range-slider').val(index);
		function updatePolygons(map, attribute){
		map.eachLayer(function(response){
        if (response.feature && response.feature.properties[attribute]){
            //update the layer style and popup
        };
    });
};
    });
};
	$('.range-slider').attr({
			max: 8,
			min: 0,
			value: 0,
			step: 1
		});
	$('#panel').append('<button class="skip" id="reverse">Reverse</button>');
	$('#panel').append('<button class="skip" id="forward">Skip</button>');
	$('#reverse').click(function() {
		alert("You clicked!");
	});
	$('#forward').click(function() {
		alert("Please stop clicking!");
	});

	$('#panel').append('<input class="range-slider" onchange="updateSlider(this.value)" type="range">');


    //set slider attributes
    $('.range-slider').attr({
        max: 8,
        min: 0,
        value: 0,
        step: 1
    });

	$('#reverse').html('<img src="img/rewind.jpg">');
    $('#forward').html('<img src="img/fastforward.jpg">');
	//Initialize polys on map onLoad


	updateSlider(0);

function processData(response){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = response.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("_20") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};
var countryStyle = {
    "color": "#000000",
    "weight": 1.5,
    "opacity": 5
};

//var searchLayer = L.layerGroup().addTo(map);
//... adding data in searchLayer ...
//map.addControl( new L.Control.Search({response: searchLayer}) );

var guineaLayer = L.layerGroup().addTo(map);
var sierraLeoneLayer = L.layerGroup().addTo(map);
var liberiaLayer = L.layerGroup().addTo(map);

	function updateSlider(sliderValue){

	    $.ajax("data/geoJSON/guinea_ebola.geojson", {
        dataType: "json",
        success: function(response){
			map.removeLayer(guineaLayer);

			 var attributes = processData(response);
			createLegend(map, attributes[sliderValue]);
			 console.log(response);
            //create a Leaflet GeoJSON layer and add it to the map
            guineaLayer = L.geoJson(response, {
						onEachFeature: onEachFeature,
			style: function(feature){
				return style(feature.properties[attributes[sliderValue]]);
			}
			}).addTo(map);
        }
    });


	    $.ajax("data/geoJSON/sierraleone_ebola.geojson", {
        dataType: "json",
        success: function(response){
			map.removeLayer(sierraLeoneLayer);

			 var attributes = processData(response);
			createLegend(map, attributes[sliderValue]);
			 console.log(response);
            //create a Leaflet GeoJSON layer and add it to the map
            sierraLeoneLayer = L.geoJson(response, {
						onEachFeature: onEachFeature,
			style: function(feature){
				return style(feature.properties[attributes[sliderValue]]);
			}
			}).addTo(map);
        }
    });

	    $.ajax("data/geoJSON/liberia_ebola.geojson", {
        dataType: "json",
        success: function(response){
			map.removeLayer(liberiaLayer);

			 var attributes = processData(response);
			createLegend(map, attributes[sliderValue]);
			 console.log(response);
            //create a Leaflet GeoJSON layer and add it to the map
            liberiaLayer = L.geoJson(response, {
						onEachFeature: onEachFeature,
			style: function(feature){
				return style(feature.properties[attributes[sliderValue]]);
			}
			}).addTo(map);
        }
    });
};
    //$.ajax("data/geoJSON/liberia_admin0.geojson", {
       // dataType: "json",
        //success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           // L.geoJson(response, {style: countryStyle}).addTo(map);

       // }
    //});
   //$.ajax("data/geoJSON/sierraleone_admin0.geojson", {
        //dataType: "json",
       // success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           // L.geoJson(response, {style: countryStyle}).addTo(map);

        //}
    //});
    //$.ajax("data/geoJSON/guinea_admin0.geojson", {
        //dataType: "json",
        //success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           //L.geoJson(response, {style: countryStyle}).addTo(map);

       // }
  //  });

//add tile layer...replace project id and accessToken with your own
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);*/
