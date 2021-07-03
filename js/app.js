'use strict';
 
function createTable() {
  let divContainer = document.getElementById('container');
  let table = document.createElement('table');
  table.id = 'shopsTable';
  divContainer.appendChild(table);
}

createTable();

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function createHoursHeader() {
  let table = document.getElementById('shopsTable');

  let tr = document.createElement('tr');
  let th = document.createElement('th');
  tr.appendChild(th);

  for(let i = 0; i < hours.length; i++) {
    th = document.createElement('td');
    th.innerText = hours[i];
    tr.appendChild(th);
  }

  th = document.createElement('td');
  th.innerText = 'Daily Location Total';
  tr.appendChild(th);

  table.appendChild(tr);
}

createHoursHeader();

function Shop(shopName, minCust, maxCust, avgCookies) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.randCust = [];
  this.avgCookiesPerH = [];
  this.total = 0;

  this.prepareAndAdd = function() {
    calcRandCustPerH(this);
    calAvgCookiesPerH(this);
    render(this);
  };
}

let seattle = new Shop('seattle', 23, 65, 6.4);
let Tokyo = new Shop('Tokyo', 3, 24, 1.2);
let Dubai = new Shop('Dubai', 11, 38, 3.7);
let Paris = new Shop('Paris', 20, 38, 2.4);
let Lima = new Shop('Lima', 2, 16, 4.6);

let shops = [seattle, Tokyo, Dubai, Paris, Lima];

let addForm = document.getElementById('addForm');

console.log('addForm = ' + addForm);
addForm.addEventListener('submit',addShop);
function addShop(event) {
  event.preventDefault();
  let shopNameInput = event.target.shopName.value;
  let minCustInput = event.target.minCust.value;
  let maxCustInput = event.target.maxCust.value;
  let avgCookiesInput = event.target.avgCookies.value;

  if(shopNameInput !== undefined && shopNameInput !== null && shopNameInput.length > 0 &&
    minCustInput !== undefined && minCustInput !== null && minCustInput.length > 0 &&
    maxCustInput !== undefined && maxCustInput !== null && maxCustInput.length > 0 &&
    avgCookiesInput !== undefined && avgCookiesInput !== null && avgCookiesInput.length > 0) {
    let newShop = new Shop(shopNameInput, minCustInput, maxCustInput, avgCookiesInput);
    shops.push(newShop);
    newShop.prepareAndAdd();
  }
}

function calcRandCustPerH(shop) {
  for (let i = 0; i < hours.length; i++) {
    let min = Math.ceil(shop.minCust);
    let max = Math.floor(shop.maxCust);
    let randCust = Math.floor(Math.random() * (max - min + 1) + min);
    shop.randCust.push(randCust);
  }
}

function calAvgCookiesPerH(shop) {
  for (let i = 0; i < hours.length; i++) {
    shop.avgCookiesPerH[i] = Math.ceil(shop.randCust[i] * shop.avgCookies);
    shop.total = shop.total + shop.avgCookiesPerH[i];
  }
}

function render(shop) {
  let table = document.getElementById('shopsTable');
  let tr = document.createElement('tr');
  table.appendChild(tr);

  let td = document.createElement('td');
  td.innerText = shop.shopName;
  tr.appendChild(td);

  for (let i = 0; i < hours.length; i++) {
    td = document.createElement('td');
    td.innerText = shop.avgCookiesPerH[i];
    tr.appendChild(td);
    shop.total += shop.avgCookiesPerH[i];
  }

  td = document.createElement('td');
  td.innerText = shop.total;
  tr.appendChild(td);
}

for(let i = 0; i < shops.length; i++) {
  console.log(shops[i]);
  calcRandCustPerH(shops[i]);
  calAvgCookiesPerH(shops[i]);
  render(shops[i]);
}

function calcHourTotals() {
  let table = document.getElementById('shopsTable');
  let tr = document.createElement('tr');
  table.appendChild(tr);

  let td = document.createElement('td');
  td.innerText = 'Totals';
  tr.appendChild(td);

  for(let i = 0; i <hours.length; i++) {
    let hourTotal = 0;
    for(let j = 0; j < shops.length; j++) {
      hourTotal += shops[j].avgCookiesPerH[i];
    }
    td = document.createElement('td');
    td.innerText = hourTotal;
    tr.appendChild(td);
  }

  let dailyTotals = 0;
  for(let i = 0; i < shops.length; i++) {
    dailyTotals += shops[i].total;
  }
  td = document.createElement('td');
  td.innerText = dailyTotals;
  tr.appendChild(td);
}

calcHourTotals();
