const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
const Loading = document.querySelector('.loading');

/**
 * Sækir upplýsingar um jarðskjálta sem voru yfir 4,5 á richter seinustu 7 daga
 * @return {json} Gögnin sem voru sótt (GEOjson)
 */
async function fetchEarthquakes() {
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
    .catch(() => {
      Loading.innerText = 'Villa við að sækja gögn';
    });
  return TheData;
}

export default fetchEarthquakes;
