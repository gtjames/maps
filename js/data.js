export let searchForText = [
    { type: "text",   id: "Name",        name: "name",        placeholder: "Name",                  },
    { type: "text",   id: "Address1",    name: "address1",    placeholder: "Address",               },
    { type: "text",   id: "Zip",         name: "zip",         placeholder: "Zip",                   },
    { type: "text",   id: "City",        name: "city",        placeholder: "City",                  },
    { type: "text",   id: "Age",         name: "age",         placeholder: "Age",                   },
    { type: "text",   id: "BDay",        name: "bDay",        placeholder: "BDay",                  },
    { type: "text",   id: "Notes",       name: "notes",       placeholder: "Notes",                 },
    { type: "text",   id: "Callings",    name: "callings",    placeholder: "Callings",              },
    { type: "text",   id: "Priesthood",  name: "priesthood",  placeholder: "Priesthood",            },
    { type: "text",   id: "Recommend",   name: "recommend",   placeholder: "Recommend Status",      },
    { type: "text",   id: "RecType",     name: "recType",     placeholder: "Recommend Type",        },
    { type: "number", id: "RecExpire",   name: "recExpire",   placeholder: "Rec Expiring in x days" },
    { type: "number", id: "MovedIn",     name: "movedIn",     placeholder: "Moved In (days ago)",   },
    { type: "number", id: "Baptized",    name: "baptized",    placeholder: "Baptized (days ago)",   }
];

export let popupText = [
    { id: "popSpeak",     label: "popSpeak",     innerText: "Speak",     },
    { id: "popAddress",   label: "popAddress",   innerText: "Address",   },
    { id: "popStats",     label: "popStats",     innerText: "Stats",     },
    { id: "popContact",   label: "popContact",   innerText: "Contact",   },
    { id: "popMbrInfo",   label: "popMbrInfo",   innerText: "Member",    },
    { id: "popTemple",    label: "popTemple",    innerText: "Temple",    },
    { id: "popMinisters", label: "popMinisters", innerText: "Ministers", },
    { id: "popLatLong",   label: "popLatLong",   innerText: "Lat/Long",  },
];

export let checkForText = [
{ name: "",          id: "Sis",         innerText: "Sisters",                    },
{ name: "",          id: "Bro",         innerText: "Brothers",                   },
{ name: "",          id: "YW",          innerText: "Youth Women",                },
{ name: "",          id: "AP",          innerText: "Aaronic Priesthood",         },
{ name: "",          id: "Primary",     innerText: "Primary",                    },
{ name: "",          id: "Active",      innerText: "Active",           not: true },
{ name: "endowed",   id: "Endowed",     innerText: "Endowed",          not: true },
{ name: "convert",   id: "Convert",     innerText: "Convert",                    },
{ name: "RM",        id: "RM",          innerText: "RM",                         },
{ name: "institute", id: "Institute",   innerText: "Institute",                  },
{ name: "sealed",    id: "Sealed",      innerText: "Sealed",                     },
{ name: "",          id: "MinBro",      innerText: "Ministering Bro",  not: true },
{ name: "",          id: "MinSis",      innerText: "Ministering Sis",  not: true },
];


export let units = [
{ first: "Allen",       last: "Branch ",          name: "Branch President Johns",     address1: "1404 East Main Street",          city: "Allen",        zip: "75002",  lat: 33.099827, long: -96.635502, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Arlington",   last: "Ward ",            name: "Bishop James",               address1: "1500 California Lane",           city: "Arlington",    zip: "76015",  lat: 32.699089, long: -97.130974, phone: "817-266-3251", iconUrl: "./images/chapel.png",     },
{ first: "Carrollton",  last: "Ward ",            name: "Bishop Case",                address1: "615 North Macarthur Boulevard",  city: "Coppell",      zip: "75019",  lat: 32.980304, long: -96.969670, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Colleyville", last: "Ward ",            name: "Bishop Qureshi",             address1: "2001 Willis Lane",               city: "Keller",       zip: "76248",  lat: 32.899700, long: -97.246536, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Dallas 1st",  last: "Ward, Richardson", name: "Bishop Whitworth",           address1: "14740 Meandering Way",           city: "Dallas",       zip: "75254",  lat: 32.949462, long: -96.778406, phone: "972-392-1116", iconUrl: "./images/otherYSAs.png",   },
{ first: "Dallas 2nd",  last: "Ward, Dallas East",name: "Bishop Brady",               address1: "1800 Bennett Avenue",            city: "Dallas",       zip: "75206",  lat: 32.808412, long: -96.776277, phone: "469-341-0384", iconUrl: "./images/otherYSAs.png",   },
{ first: "Denton",      last: "Ward ",            name: "Bishop Nielsen",             address1: "1100 West Mulberry Street",      city: "Denton",       zip: "76201",  lat: 33.213885, long: -97.144477, phone: "940-387-8882", iconUrl: "./images/otherYSAs.png",   },
{ first: "Fort Worth",  last: "Ward ",            name: "Bishop Seethaler",           address1: "2520 8th Avenue",                city: "Ft Worth",     zip: "76110",  lat: 32.714746, long: -97.344366, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Frisco",      last: "Ward ",            name: "Bishop Parker",              address1: "11000 Eldorado Parkway",         city: "Frisco",       zip: "75035",  lat: 33.175234, long: -96.784828, phone: "469-362-6944", iconUrl: "./images/otherYSAs.png",   },
{ first: "Hurst",       last: "Ward ",            name: "Bishop Vimahi",              address1: "5312 Bransford Road",            city: "Colleyville",  zip: "76034",  lat: 32.885906, long: -97.162012, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Rockwall",    last: "Branch, Heath",    name: "Branch President Willman",   address1: "6819 South Fm 549",              city: "Heath",        zip: "75032",  lat: 32.860965, long: -96.444691, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
{ first: "Weatherford", last: "Branch ",          name: "Branch President Connelly",  address1: "2251 Bethel Road",               city: "Weatherford",  zip: "76087",  lat: 32.721649, long: -97.809414, phone: "            ", iconUrl: "./images/otherYSAs.png",   },
];

export let colors = [
  "Aqua"       , "Black"        ,   "Blue"            , "BlueViolet"      , "Brown"           , "CadetBlue"      , 
  "Chartreuse" , "Chocolate"    ,   "Coral"           , "CornflowerBlue"  , "Crimson"         , "Cyan"           ,
  "DarkBlue"   , "DarkCyan"     ,   "DarkGoldenRod"   , "DarkGreen"       , "DarkMagenta"     , "DarkOliveGreen" , 
  "DarkOrange" , "DarkOrchid"   ,   "DarkRed"         , "DarkSlateBlue"   , "DarkSlateGray"   , "DarkTurquoise"  , 
  "DarkViolet" , "DeepPink"     ,   "DeepSkyBlue"     , "DodgerBlue"      , "FireBrick"       , "ForestGreen"    ,
  "Fuchsia"    , "Gold"         ,   "GoldenRod"       , "Gray"            , "Green"           , "HotPink"        , 
  "IndianRed"  , "Indigo"       ,   "Lime"            , "LimeGreen"       , "Magenta"         , "Maroon"         , 
  "MediumBlue" , "MediumPurple" ,   "MediumSlateBlue" , "MediumTurquoise" , "MediumVioletRed" , "MidnightBlue"   , 
  "Navy"       , "Olive"        ,   "OliveDrab"       , "Orange"          , "OrangeRed"       , "Orchid"         , 
  "Peru"       , "Purple"       ,   "RebeccaPurple"   , "Red"             , "RoyalBlue"       , "SaddleBrown"    , 
  "Salmon"     , "SandyBrown"   ,   "SeaGreen"        , "Sienna"          , "SkyBlue"         , "SlateBlue"      , 
  "SlateGray"  , "SpringGreen"  ,   "SteelBlue"       , "Teal"            , "Tomato"          , "Violet"         , 
  "Yellow"     , "YellowGreen"  ,   
];

let checkFor = document.getElementById("checkFor");
checkForText.forEach(s => checkFor.innerHTML +=
    `<li class="query"><input type="checkbox" name="${name}" id="${s.id}" /><label for="${s.id}">${s.id}</label>` +
    (s.not != undefined ? `<input type="checkbox" id="Not${s.id}"/><label for="Not${s.id}">Not</label>` : '') + `</li>`);

let searchFor = document.getElementById("searchFor");
searchForText.forEach(p => searchFor.innerHTML += `<li class="query"><input class="dropdown-item" type="${p.text}" name="${p.name}" id="${p.id}" placeholder="${p.placeholder}" ></li>`)

let popupInfo = document.getElementById("popupInfo");
popupText.forEach(p => popupInfo.innerHTML += `<li class="query"><input type="checkbox" id="${p.id}"><label for="${p.id}">${p.innerText}</label></li>`)

