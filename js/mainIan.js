/* Example from Leaflet Quick Start Guide*/
var map = L.map('map', {
    center: L.latLng(8.465677, -13.231722),
    zoom: 7
});



//call in country boundary layers, do this first so the other layers are placed on top
  $.ajax("data/geoJSON/liberia_admin0.geojson", {
       dataType: "json",
       success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           L.geoJson(response, {style: countryStyle}).addTo(map);

        }
    });
   $.ajax("data/geoJSON/sierraleone_admin0.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {style: countryStyle}).addTo(map);

        }
    });
    $.ajax("data/geoJSON/guinea_admin0.geojson", {
        dataType: "json",
        success: function(response){
            //create a Leaflet GeoJSON layer and add it to the map
           L.geoJson(response, {style: countryStyle}).addTo(map);

        }
    });

var countryStyle = {
			fillColor: "#E3E3E3",
			weight: 10,
			opacity: 0.4,
			color: 'gray',
			fillOpacity: 0.3
		};

var guineaLayer = L.layerGroup().addTo(map);
var sierraLeoneLayer = L.layerGroup().addTo(map);
var liberiaLayer = L.layerGroup().addTo(map);


var basemap2 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            maxZoom: 28
        });


	var basemap1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 28
        });


	var basemap0 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 28
        });

/*This is going to be the default base map so we add it immediately here below. I changed it to Esri, because I was tired of the other one. :-)*/
basemap2.addTo(map);

//This creates a variable holding all of your base map layers.
var baseMaps = {'OSM B&W': basemap0, 'OSM': basemap1, 'ESRI Topomap': basemap2};




//This adds the layer control to your map.
L.control.layers(baseMaps).addTo(map);


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
        }
    });

	if(legend != null) {
		map.removeControl(legend);
	}
	legend = new LegendControl();
    map.addControl(legend);
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

function highlight(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
};


function createSequenceControls(map){

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


	$('#panel').append('<input class="range-slider" onchange="updateSlider(this.value)" type="range">');


    //set slider attributes
    $('.range-slider').attr({
        max: 7,
        min: 0,
        value: 0,
        step: 1
    });

	updateSlider(0);

function processData(response){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = response.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("20") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};


function updateSlider(sliderValue){

	$.ajax("data/geoJSON/guinea_ebola.geojson", {
	dataType: "json",
	success: function(response){
		map.removeLayer(guineaLayer);

		 var attributes = processData(response);
	//currentDate = attributes[sliderValue];
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

/*This and the ajax before it, where you actually refer to the sliderValue (line 319 above, for example, are the crux of your popup problems. If you can figure out how to write a loop that calls up the attributes for the right year, you'll be all set. You may be calling the wrong name, as there is a variable "attributes on line 312. However, it's working right now (though showing all of the data), so perhaps you just need to run a for loop below. */

function onEachFeature(feature, layer) {
  console.log(feature.properties);

	//no property named popupContent; instead, create html string with all properties
	var popupContent = "";
    if (feature.properties) {
		//loop to add feature property names and values to html string

        for (var property in feature.properties){
			popupContent += "<p>" + property + ": " + feature.properties + "</p>";
		}
		layer.bindPopup(popupContent);
	};


	layer.bindPopup(L.Util.template('<b>District</b>: {District}<br> <b>Confirmed Cases</b>:', feature.properties));

    //event listeners to open popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        },
        //There was something funky with your code here. I deleted it and mimicked the above //code. It works! It doesn't bring up the big external page.
        click: function(){
            this.openPopup();
        }
    });
};



	//layer.bindPopup(L.Util.template('<b>District</b>: {District}<br> <b>Confirmed Cases</b>: {Jan_2014}', feature.properties));

    //event listeners to open popup on hover
