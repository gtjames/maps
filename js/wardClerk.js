import { standardizeNames } from './wardList.js';
import { whoWhatWhere } from './whoWhatWhere.js';
import { units, colors } from './data.js';

let theWard = [];
let wardMap = {};
let map;
let clickMarker;
let savedGPS = [];
let distances = [];
let wardMembers = [];
let popup = L.popup();
let popups = [], markers = [];
let onDisplay = [];
let buildings;
let currentWard;

let northOf, southOf, eastOf, westOf, northEastOf, northWestOf, southWestOf, southEastOf;
let compass = [];
let wardCenter = [(32.596108 + 33.5250081) / 2, (-95.20825 + -97.10875730317615) / 2];

let outline;
let results = [];
let wardBoundary;

let cbSis        = document.querySelector("#Sis");
let cbBro        = document.querySelector("#Bro");
let cbYW         = document.querySelector("#YW");
let cbAP         = document.querySelector("#AP");
let cbPrimary    = document.querySelector("#Primary");

let txtName      = document.querySelector("#Name");
let txtAddress1  = document.querySelector("#Address1");
let txtZip       = document.querySelector("#Zip");
let txtCity      = document.querySelector("#City");

let popAddress   = document.querySelector("#popAddress");
let popContact   = document.querySelector("#popContact");
let updates      = document.querySelector("#updates");
let cbTags       = document.querySelector("#nameTags");

document.querySelector('#plot'        ).addEventListener('click', plotMembers);
document.querySelector('#remove'      ).addEventListener('click', removeAllPoints);
document.querySelector('#include'     ).addEventListener('click', includeAll);
document.querySelector("#distList"    ).addEventListener('click', newDistances);

updates   .addEventListener('click', popupName);

var broIcon    = L.icon({ iconUrl: 'images/bro.png',    iconSize: [15, 10] });
var sisIcon    = L.icon({ iconUrl: 'images/sis.png',    iconSize: [10, 15] });
var chapelIcon = L.icon({ iconUrl: 'images/chapel.png', iconSize: [25, 25] });
var noIcon     = L.icon({ iconUrl: 'images/bro.png',    iconSize: [1, 1] });

window.navigator.geolocation.getCurrentPosition(setLocation);

//  put the map behind the updates list
document.getElementById("map").style.zIndex = "10";

loadData();

function loadData() {
    initPage(standardizeNames(whoWhatWhere.members), whoWhatWhere.ward);
}

function initPage(data, ward) {
    theWard = data;
    results = theWard;
    currentWard = ward;
    savedGPS = JSON.parse(localStorage.getItem('gps-' + currentWard));
    if (savedGPS === null) savedGPS = fallback;

    removeAllPoints();
    wardBoundary = findBoundary(theWard);
    buildings = addBuildings([])
    theWard = addBuildings(theWard);
    document.getElementById("count").innerText = `${theWard.length} Members`;
}

function removeAllPoints() {
    clearUpdate();
    popup.remove();
    wardMembers.forEach(e => e.remove())
    popups.forEach(p => p.popup.remove());
    markers.forEach(m => m.marker.remove());
    wardMembers = [];
    popups = [];
    markers = [];
}

function clearUpdate() {
    updates.innerHTML = "";
    document.getElementById('collapse').classList.remove('show');
    document.getElementById('shrink').classList.add('collapsed');
    document.getElementById("count").innerText = '0 found';
    if (outline) outline.remove();
}

function addBuildings(list) {
    let defaults = { address2: '', age: '', email: '' };

    let zeros = theWard.filter(m => m.lat === 0).length;
    let avgLat = theWard.reduce((tot, w) => w.lat + tot, 0) / (theWard.length - zeros);
    let avgLng = theWard.reduce((tot, w) => w.long + tot, 0) / (theWard.length - zeros);

    units.forEach((unit, id) =>
        list.unshift({
            ...{
                id: id + 10, first: unit.first, last: unit.last, name: unit.name, lat: unit.lat, long: unit.long,
                city: unit.city, address1: unit.address1, zip: unit.zip,
            }, ...defaults
        }));
    list.unshift({ ...{ id: 5, first: '5', last: 'Fort Worth Temple', name: "Ft Worth Temple", lat: 32.51653, long: -97.35912, city: 'Burleson',    address1: '1850 Greenridge Dr'      , }, ...defaults });
    list.unshift({ ...{ id: 4, first: '4', last: 'Dallas Temple'    , name: "Dallas Temple",   lat: 32.91442, long: -96.79653, city: 'Dallas',      address1: '6302 Willow Lane'        , }, ...defaults });
    list.unshift({ ...{ id: 3, first: '3', last: 'Institute'        , name: "Institute",       lat: 32.61441, long: -97.16883, city: 'Arlington',   address1: '3921 Turner Warnell Road', }, ...defaults });
    list.unshift({ ...{ id: 2, first: '2', last: 'Forest Hill'      , name: "Forest Hill",     lat: 32.66660, long: -97.26414, city: 'Forest Hill', address1: '6300 Crawford Lane West' , }, ...defaults });
    list.unshift({ ...{ id: 1, first: '1', last: 'Stake Center'     , name: "Stake Center",    lat: 32.68776, long: -97.16802, city: 'Arlington',   address1: '3809 Curt Drive'         , }, ...defaults });
    list.unshift({ ...{ id: 0, first: '0', last: 'California'       , name: "California",      lat: 32.69905, long: -97.13096, city: 'Arlington',   address1: '1500 California Lane'    , }, ...defaults });
    return list;
}


let lastLoc = [32.69905, -97.13096];
function setLocation(loc) {
    wardCenter[0] = loc.coords.latitude;
    wardCenter[1] = loc.coords.longitude;
    map = L.map('map').setView([loc.coords.latitude, loc.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    wardMap.center = { longitude: loc.coords.longitude, latitude: loc.coords.latitude };
    let b = map.getBounds();
    wardMap.extent = {
        minLng: b._northEast.lng, minLat: b._northEast.lat,
        maxLng: b._southWest.lng, maxLat: b._southWest.lat
    };

    clickMarker = L.marker([loc.coords.latitude, loc.coords.longitude]).addTo(map);
    var myIcon = L.icon({
        iconUrl: './images/chapel.png',
        iconSize: [25, 25],
        iconAnchor: [22, 24],
        shadowSize: [25, 25],
        shadowAnchor: [22, 24]
    });

    L.marker([32.66660, -97.26414], { icon: myIcon }).bindPopup('Forest Hill<br>2nd and 6th wards').addTo(map);     //  2nd and 6th wards
    L.marker([32.68776, -97.16802], { icon: myIcon }).bindPopup('Stake Center<br>3rd, 5th and Mansfield 3rd wards').addTo(map);     //  stake center
    L.marker([32.61441, -97.16883], { icon: myIcon }).bindPopup('Institiute').addTo(map);     //  Institute
    L.marker([32.69905, -97.13096], { icon: myIcon }).bindPopup('California<br>1st, Spanish, YSA wards').addTo(map);     //  YSA

    units.forEach((unit, id) => {
        myIcon.options.iconUrl = unit.iconUrl;
        L.marker([unit.lat, unit.long], { icon: myIcon }).bindPopup(unit.name).addTo(map)
    });

    myIcon.options.iconUrl = "./images/moroni.png"
    myIcon.options.iconSize = [25, 35];
    L.marker([32.91442, -96.79653], { icon: myIcon }).bindPopup('Dallas Temple').addTo(map);
    L.marker([32.51653, -97.35912], { icon: myIcon }).bindPopup('FW Temple').addTo(map);

    map.on('click', onMapClick);
    map.on('moveend', () => {
        let wholeMap = map.getBounds();
        // console.log(JSON.stringify(wholeMap));
        let loc = [];
        loc[0] = wholeMap._southWest.lat - ((wholeMap._southWest.lat - wholeMap._northEast.lat) / 10);
        loc[1] = wholeMap._southWest.lng - ((wholeMap._southWest.lng - wholeMap._northEast.lng) / 10);

        if (Math.abs(lastLoc[0] - loc[0]) / 10 < 0.001 && (Math.abs(lastLoc[1] - loc[1])) / 10 < 0.001)
            return;

        lastLoc = loc;
        popup.setLatLng(loc);
    });
}

function onMapClick(e) {
    let shortList = results.filter(m => +m.id > 100)
    wardCenter[0] = e.latlng.lat;
    wardCenter[1] = e.latlng.lng;
    northOf     = shortList.filter(w => w.lat  >= e.latlng.lat);
    southOf     = shortList.filter(w => w.lat  <= e.latlng.lat);
    eastOf      = shortList.filter(w => w.long >= e.latlng.lng);
    westOf      = shortList.filter(w => w.long <= e.latlng.lng);
    northEastOf = northOf  .filter(w => w.long >= e.latlng.lng);
    northWestOf = northOf  .filter(w => w.long <= e.latlng.lng);
    southWestOf = southOf  .filter(w => w.long <= e.latlng.lng);
    southEastOf = southOf  .filter(w => w.long >= e.latlng.lng);
    compass = [northWestOf, northOf, northEastOf,
        westOf, results, eastOf,
        southWestOf, southOf, southEastOf];

    wardMap.selectedPoint = { longitude: e.latlng.lng, latitude: e.latlng.lat };
    if (clickMarker) clickMarker.remove();

    let loc = [];
    if (outline) outline.remove();

    clickMarker = L.marker(e.latlng).addTo(map);
    let wholeMap = map.getBounds();
    loc[0] = wholeMap._southWest.lat - ((wholeMap._southWest.lat - wholeMap._northEast.lat) / 10);
    loc[1] = wholeMap._southWest.lng - ((wholeMap._southWest.lng - wholeMap._northEast.lng) / 10);
    popup
        .setLatLng(loc)      //      e.latlng
        .setContent(`${e.latlng.toString()}` +
            `<table id="compass">` +
            `<tr><td><button  type="button"  class="btn btn-info"     data-direction=0 >NW  Of: ${compass[0].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-primary"  data-direction=1 >N   Of: ${compass[1].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-info"     data-direction=2 >NE  Of: ${compass[2].length}  </button></td></tr>` +
            `<tr><td><button  type="button"  class="btn btn-primary"  data-direction=3 >W   Of: ${compass[3].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-info"     data-direction=4 >All:    ${compass[4].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-primary"  data-direction=5 >E   Of: ${compass[5].length}  </button></td></tr>` +
            `<tr><td><button  type="button"  class="btn btn-info"     data-direction=6 >SW  Of: ${compass[6].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-primary"  data-direction=7 >S   Of: ${compass[7].length}  </button></td>` +
            `    <td><button  type="button"  class="btn btn-info"     data-direction=8 >SE  Of: ${compass[8].length}  </button></td></tr>` +
            `<tr><td colspan="3">` +
                    `<button  type="button"  class="btn btn-success"  data-direction=-1 id="btnRadius">Radius</button> <input type="number" class="small" id="inRadius"  step=".1" data-direction=-1 ></td>` +
            `</tr></table>`)
        .openOn(map);
    document.getElementById("compass").addEventListener("click", whosThere);
    document.getElementById("inRadius").addEventListener("change", whosThere);
}

function whosThere(e) {
    let section, bounds, dist;

    let pos = +e.target.dataset.direction;
    if (isNaN(pos)) return;
    if (pos === -1) {
        dist = +document.getElementById("inRadius").value;
        var latlng1 = L.latLng(wardCenter[0], wardCenter[1]);
        section = results.filter(m => latlng1.distanceTo(L.latLng(m.lat, m.long)) / 1609 < dist);

        document.getElementById("btnRadius").innerText = `${section.length} w/i radius`;
    } else {
        section = compass[pos];
        bounds = findBoundary(section);
    }

    clearUpdate();
    onDisplay = [];
    section.forEach(e => plotAddress(e));
    document.getElementById("count").innerText = `${section.length} Found`;

    if (outline) outline.remove();

    let color = colors[Math.floor(Math.random() * colors.length)];

    if (pos === -1)
        outline = L.circle(wardCenter, { radius: dist * 1610, color: "red", weight: 5 }).addTo(map);
    else
        outline = L.rectangle(bounds, { color: color, weight: 5 }).on('click', e => console.info(e)).addTo(map);
}

function findBoundary(section) {
    let dim = { northLat: wardCenter[0], southLat: wardCenter[0], westLong: wardCenter[1], eastLong: wardCenter[1] };
    section.forEach(m => {
        if (m.id <= 100) return;
        if (m.lat  > dim.northLat) dim.northLat = m.lat;
        if (m.lat  < dim.southLat) dim.southLat = m.lat;
        if (m.long > dim.eastLong) dim.eastLong = m.long;
        if (m.long < dim.westLong) dim.westLong = m.long;
    });

    let bounds = [[dim.northLat, dim.westLong], [dim.southLat, dim.eastLong]];
    return bounds
}

function popupName(e) {
    if (e.target.dataset.id) {
        getDistances(e.target.dataset.id)
        return;
    }
    let name = e.target.innerText.substring(5);
    if (popSpeak.checked) talkToMe(name);
    let id = e.target.getAttribute('id');
    let mbr = theWard.filter(m => m.id == id);
    if (mbr.length == 0) return;
    mbr = mbr[0];
    L.popup()
        .setLatLng([mbr.lat, mbr.long])
        .setContent(`${name}<p>${mbr.phone}`).addTo(map);
}

//  plot Addresses
//      identify members of interest and plot their location
function plotMembers(event) {
    event.preventDefault();

    results = theWard;
    if (cbSis.checked       ) results = results.filter(r =>   r.gender === 'F' && r.age >= 18);
    if (cbBro.checked       ) results = results.filter(r =>   r.gender === 'M' && r.age >= 18);
    if (cbYW.checked        ) results = results.filter(r =>   r.gender === 'F' && r.age >= 11 && r.age < 18);
    if (cbAP.checked        ) results = results.filter(r =>   r.gender === 'M' && r.age >= 11 && r.age < 18);
    if (cbPrimary.checked   ) results = results.filter(r =>   r.age < 12);

    if (txtName     .value.length > 0) results = results.filter(r => matches(r.name, txtName));
    if (txtAddress1 .value.length > 0) results = results.filter(r => matches(r.address1, txtAddress1));
    if (txtCity     .value.length > 0) results = results.filter(r => matches(r.city, txtCity));
    if (txtZip      .value.length > 0) results = results.filter(r => r.zip.indexOf(txtZip.value) >= 0);

    clearUpdate();
    document.getElementById("count").innerText = `${results.length} Found`;
    onDisplay = [];
    results.forEach(e => plotAddress(e))
}
function matches(mbr, input) {
    return mbr.toLowerCase().indexOf(input.value.toLowerCase()) >= 0;
}

function calcDate(input) {
    let untilDate = new Date();
    untilDate.setDate(untilDate.getDate() + (input | 0));
    return untilDate;
}

function includeAll() {
    popAddress  .checked = ! popAddress.checked;
    popStats    .checked = ! popStats.checked
    popContact  .checked = ! popContact.checked
    popMbrInfo  .checked = ! popMbrInfo.checked
    popTemple   .checked = ! popTemple.checked
    popMinisters.checked = ! popMinisters.checked
    popLatLong  .checked = ! popLatLong.checked
}

//  displayUpdate
//      nice utility method to show message to user
function displayUpdate(text, who) {
    //  is this record already in the list?
    if (document.getElementById(who.id)) return;
    onDisplay.push(who);
    updates.innerHTML += `<li class="query" id=${who.id}>
       <button  data-id=${who.id} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" type="button") >Dist</button>
    ${text}</li>`;
}

// id=showDistance
// onclick=getDistances(${who.id}
// let pos = +e.target.dataset.direction;

function plotAddress(who) {
    // if (cblist.checked) 
    displayUpdate(`${who.first} ${who.last}`, who);

    let marker = L.marker([who.lat, who.long], { icon: who.gender == 'M' ? broIcon : who.gender == 'F' ? sisIcon : noIcon }).addTo(map);
    wardMembers.push(marker);
    marker.on("click", e => {
        // console.log(e.target._popup._content);
        // marker.openpopup(e.latlng);
    });

    marker.bindPopup(`${createPopup(who)}`);
    markers.push({ name: `${who.first} ${who.last}`, marker: marker });

    if (cbTags.checked) {
        var namePopup = L.popup()
            .setLatLng([who.lat, who.long])
            .setContent(`${who.first} ${who.last}<p>${who.phone}`).addTo(map);
        popups.push({ name: `${who.first} ${who.last}`, popup: namePopup });
    }
}

function createPopup(who) {
    const space = '<br>&nbsp;&nbsp;&nbsp;&nbsp;';
    let msg = `${who.first} ${who.last}<hr><p>`;
    if (who.id <= 100) return msg;
    if (popAddress  .checked) msg += `Address:${space}${who.address1} ${who.address2 ?? ""}, ${who.city}<p>`;
    if (popContact  .checked) msg += `Conact:${space}eMail: ${who.email}${space}Phn: ${who.phone}${space}`;

    return msg;
}

async function getLongLatFromAdrs(name, address, addToWard) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAbJ61G4U6LXjC9RK-SpxT9Pw7qOKKLD9A`;
    const response = await fetch(url);
    const gps = await response.json();
    getLatLong.innerText = `${name} GPS found`;
}

function newDistances(e) {
    getDistances(e.target.parentElement.attributes['name'].value);
}

function getDistances(id) {
    getDistancesFrom(id, onDisplay, false)
}

function getDistancesFrom(id, list, add) {
    let distModal = document.querySelector("#distList");
    let distTitle = document.querySelector("#modalTitle");

    let m1 = list.filter(m => m.id == id)[0];

    distTitle.innerHTML = `Distance from<br>${m1.first} ${m1.last}`;
    var latlng1 = L.latLng(m1.lat, m1.long);
    if (!add)
        distModal.innerHTML = "";
    let style = ["warning", "info"];
    let row = 0;
    let dist;
    let totalDist = 0;

    for (let m2 of list) {
        row++;
        dist = (latlng1.distanceTo(L.latLng(m2.lat, m2.long)) / 1609).toFixed(1);
        distModal.innerHTML += `<tr name='${m2.id}'><td>${m2.first}</td><td>${m2.last}</td><td>${dist}</td></tr>`;
        totalDist += +dist;
    }
    document.querySelector("#totalDist").innerText = `Average Distance: ${(totalDist / list.length).toFixed(2)}`;
}
