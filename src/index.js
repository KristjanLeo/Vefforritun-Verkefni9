import { element, formatDate } from './lib/utils';
import fetchEarthquakes from './lib/earthquakes';
import { init, createPopup, Popup } from './lib/map';

/**
 * Displays the data (as text)
 * @param {json} DisplayData the data to display
 * */
async function DisplayData(TheDisplayData) {
  const Earthquakes = document.querySelector('.earthquakes');
  const Fjoldi = TheDisplayData.features.length;
  const links = new Array(Fjoldi);
  const button = new Array(Fjoldi);
  const buttons = new Array(Fjoldi);
  const Timi = new Array(Fjoldi);
  const Dates = new Array(Fjoldi);
  const Styrkur = new Array(Fjoldi);
  const Richter = new Array(Fjoldi);
  const Nanar = new Array(Fjoldi);
  const LinkurNanar = new Array(Fjoldi);
  const Upplysingar = new Array(Fjoldi);
  const Location = new Array(Fjoldi);
  const Divs = new Array(Fjoldi);
  const lis = new Array(Fjoldi);

  for (let i = 0; i < Fjoldi; i += 1) {
    links[i] = element('a', { href: `${TheDisplayData.features[i].properties.url}` }, {}, 'Skoða nánar');
    button[i] = element('button', { id: `marker-${i}` }, { click: (e) => { Popup(e.target.id); } }, 'Sjá á korti');
    buttons[i] = element('div', { class: 'buttons' }, {}, button[i], links[i]);
    Timi[i] = element('dt', {}, {}, 'Tími');
    Dates[i] = element('dd', {}, {}, `${formatDate(TheDisplayData.features[i].properties.time)}`);
    Styrkur[i] = element('dt', {}, {}, 'Styrkur');
    Richter[i] = element('dd', {}, {}, `${TheDisplayData.features[i].properties.mag} á richter`);
    Nanar[i] = element('dt', {}, {}, 'Nánar');
    LinkurNanar[i] = element('dd', {}, {}, `${TheDisplayData.features[i].properties.url}`);
    Upplysingar[i] = element('dl', {}, {}, Timi[i], Dates[i], Styrkur[i], Richter[i], Nanar[i], LinkurNanar[i]);
    Location[i] = element('h2', {}, {}, `M ${TheDisplayData.features[i].properties.mag} - ${TheDisplayData.features[i].properties.place}`);
    Divs[i] = element('div', {}, {}, Location[i], Upplysingar[i], buttons[i]);
    lis[i] = element('li', {}, {}, Divs[i]);
    Earthquakes.appendChild(lis[i]);
  }
}

async function DisplayOnMap(TheDisplayData) {
  const Info = new Array(TheDisplayData.features.length);
  const Title = new Array(TheDisplayData.features.length);
  const DateAndTime = new Array(TheDisplayData.features.length);
  const theLink = new Array(TheDisplayData.features.length);
  const breaks = new Array(TheDisplayData.features.length * 2);
  for (let i = 0; i < TheDisplayData.features.length; i += 1) {
    Title[i] = element('h2', {}, {}, `M ${TheDisplayData.features[i].properties.mag} - ${TheDisplayData.features[i].properties.place}`);
    DateAndTime[i] = element('div', {}, {}, `${formatDate(TheDisplayData.features[i].properties.time)}`);
    theLink[i] = element('a', { href: `${TheDisplayData.features[i].properties.url}` }, {}, 'Skoða nánar');
    breaks[i] = element('br', {}, {}, '');
    breaks[i + TheDisplayData.features.length] = element('br', {}, {}, '');
    Info[i] = element('div', {}, {}, Title[i], breaks[i], DateAndTime[i], breaks[i + TheDisplayData.features.length], theLink[i]);
  }
  createPopup(TheDisplayData, Info);
}

document.addEventListener('DOMContentLoaded', async () => {
  const theMap = document.querySelector('.map');
  init(theMap);
  await fetchEarthquakes().then((data) => {
    DisplayData(data);
    DisplayOnMap(data);
  });
});
