import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes.js';
import { init } from './lib/map.js';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {	
	await fetchEarthquakes().then((data) => {
		console.log(data); /* Test */
	});
	const theMap = document.querySelector('.map');
	init(theMap);
});
