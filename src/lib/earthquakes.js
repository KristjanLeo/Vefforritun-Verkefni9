/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 *
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 *
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
const Loading = document.querySelector('.loading');

export async function fetchEarthquakes() {
  const TheData = await fetch(URL)
    .then((result) => {
      if (!result.ok) {
        throw new Error('non 200 status');
      }

      return result.json();
    })
    .then((data) => {
      Loading.parentNode.removeChild(Loading);
      return data;
    })
    .catch((error) => {
      console.error('Villa', error);
      Loading.innerText = 'Villa við að sækja gögn';
    });
  return TheData;
}
