
//Test js for overdding text
//Version : 1.0 
//Autor: Ferdousi Afroz

require(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/geometry/Point", "esri/symbols/TextSymbol"], 
(Map, MapView, Graphic, Point, TextSymbol) => {
  var map = 
  new Map({  basemap: "oceans" });
 //const view = new MapView({ container: "viewDiv", map, center: [-130, 45], zoom: 5 });
 var view = new MapView({ 
 container: "viewDiv",
 map:map, 
 center: [-130, 45], 
 zoom:3 });

  // Create a text label at the Gulf's location
  var textSymbol = new TextSymbol({
    text: "Gulf of America",
    color: "navy",
    font: { size: 12, 
	family: "Arial" },
    haloColor: "white",
	//haloColor: "red",
    haloSize: 1
  });

  var point = new Point({ longitude: -90, latitude: 25 });
  var graphic = new Graphic({ geometry: point, symbol: textSymbol});

  view.graphics.add(graphic);
});
