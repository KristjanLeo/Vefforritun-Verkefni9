import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes.js';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  fetchEarthquakes();
});
