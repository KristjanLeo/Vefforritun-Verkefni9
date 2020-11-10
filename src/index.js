import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes.js';
import { init, createPopup, Popup } from './lib/map.js';

/**
 * Displays the data (as text)
 * @param {json} DisplayData the data to display
 * */
async function DisplayData(DisplayData){

	const Earthquakes = document.querySelector('.earthquakes');
	let Fjoldi = DisplayData.features.length;
	let links = new Array(Fjoldi);
	let button = new Array(Fjoldi);
	let buttons = new Array(Fjoldi);
	let Timi = new Array(Fjoldi);
	let Dates = new Array(Fjoldi);
	let Styrkur = new Array(Fjoldi);
	let Richter = new Array(Fjoldi);
	let Nanar = new Array(Fjoldi);
	let LinkurNanar = new Array(Fjoldi);
	let Upplysingar = new Array(Fjoldi);
	let Location = new Array(Fjoldi);
	let Divs = new Array(Fjoldi);
	let lis = new Array(Fjoldi);

	for(let i = 0; i < Fjoldi; i++){
		links[i] = element('a', {'href': `${DisplayData.features[i].properties.url}`}, {}, 'Skoða nánar');
		button[i] = element('button', {'id': `marker-${i}`}, {click: (e) => {Popup(e.target.id)}}, 'Sjá á korti');
		buttons[i] = element('div', {'class': 'buttons'}, {}, button[i], links[i]);
		Timi[i] = element('dt', {}, {}, 'Tími');
		Dates[i] = element('dd', {}, {}, `${formatDate(DisplayData.features[i].properties.time)}`);
		Styrkur[i] = element('dt', {}, {}, 'Styrkur');
		Richter[i] = element('dd', {}, {}, `${DisplayData.features[i].properties.mag} á richter`);
		Nanar[i] = element('dt', {}, {}, 'Nánar');
		LinkurNanar[i] = element('dd', {}, {}, `${DisplayData.features[i].properties.url}`);
		Upplysingar[i] = element('dl', {}, {}, Timi[i], Dates[i], Styrkur[i], Richter[i], Nanar[i], LinkurNanar[i]);
		Location[i] = element('h2', {}, {}, `M ${DisplayData.features[i].properties.mag} - ${DisplayData.features[i].properties.place}`);
		Divs[i] = element('div', {}, {}, Location[i], Upplysingar[i], buttons[i]);
		lis[i] = element('li', {}, {}, Divs[i]);
		Earthquakes.appendChild(lis[i]);
	}

}

async function DisplayOnMap(DisplayData){
	let Info = new Array(DisplayData.features.length);
	let Title = new Array(DisplayData.features.length);
	let DateAndTime = new Array(DisplayData.features.length);
	let theLink = new Array(DisplayData.features.length);
	let breaks = new Array(DisplayData.features.length*2);
	for(let i = 0; i < DisplayData.features.length; i++){
		Title[i] = element('h2', {}, {}, `M ${DisplayData.features[i].properties.mag} - ${DisplayData.features[i].properties.place}`);
		DateAndTime[i] = element('div', {}, {}, `${formatDate(DisplayData.features[i].properties.time)}`);
		theLink[i] = element('a', {'href': `${DisplayData.features[i].properties.url}`}, {}, 'Skoða nánar');
		breaks[i] = element('br', {}, {},'');
		breaks[i+DisplayData.features.length] = element('br', {}, {},'');
		Info[i] = element('div', {}, {}, Title[i], breaks[i], DateAndTime[i], breaks[i + DisplayData.features.length], theLink[i]);
	}
	createPopup(DisplayData, Info);

}


document.addEventListener('DOMContentLoaded', async () => {	
	const theMap = document.querySelector('.map');
	init(theMap);
	await fetchEarthquakes().then((data) => {
		DisplayData(data);
		DisplayOnMap(data);
		console.log(data);
	});
});
