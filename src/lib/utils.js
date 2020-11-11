/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 *
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 *
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function element(name, attributes = null, events = null, ...children) {
  const el = document.createElement(name);

  for (let i = 0; i < children.length; i += 1) {
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        el.setAttribute(key, attributes[key]);
      });
    }

    if (events) {
      Object.keys(events).forEach((key) => {
        el.addEventListener(key, events[key]);
      });
    }

    if (typeof children[i] === 'string') {
      el.appendChild(document.createTextNode(children[i]));
    } else {
      el.appendChild(children[i]);
    }
  }

  return el;
}

/**
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 *
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const Day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const Month = date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
  const Year = date.getYear() > 9 ? (1900 + date.getYear()) : `0${1900 + date.getYear()}`;
  const Hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const Minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  const Second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
  return `${Day}.${Month}.${Year} ${Hour}:${Minute}:${Second}`;
}
