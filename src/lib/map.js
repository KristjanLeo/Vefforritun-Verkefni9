import L from 'leaflet';

let map;
let markers = [];

export function createPopup(geojson, content) {
  // TODO
  for(let i = 0; i < content.length; i++){
    let marker = L.geoJSON(geojson.features[i], {title: `marker-${i}`})
   		.bindPopup(content[i])
		  .addTo(map);
    markers.push(marker);
  }
}

export function init(el) {
  map = L.map(el).setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}

export function Popup(id){
  for (let i in markers){
    var marker_id = markers[i].options.title;
      if (marker_id == id){
        markers[i].openPopup();
    };
  }
}