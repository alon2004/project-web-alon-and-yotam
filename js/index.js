



window.onload = () => {

  initMap();

  fetch("../data/data.json")
    .then(response => response.json())
    .then(data => initList(data))

  fetch("../data/data.json")
    .then(response => response.json())
    .then(data => InitMarkerOnMap(data))
}

let map;
async function initMap() {
  const position = { lat: 32.4764688287259, lng: 34.97601741898383 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: 'fa16877c291d0875',
  });

  //my location
  const myLocation = new google.maps.Marker({
    position: position,
    map: map,
    title: "My Location",
  });
}

function InitMarkerOnMap(data) {
  for (const report of data.Pets) {
    const position = { lat: report.lat, lng: report.lng };
    const iconMap =
    {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: checkCategory(report.category),
      fillOpacity: 0.8,
      strokeWeight: 0,
      rotation: 0,
      scale: 2

    };
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: report.userName,
      icon: iconMap,
      Animation: google.maps.Animation.DROP
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<a href=${report.id}><img src="${report.userImage}" alt="UserImage" class="roundImg"></a> <h3>${report.category}</h3>`
    });
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }

  function checkCategory(category) {
    if (category === "Lost Pet") {
      return "orange";
    }
    if (category === "Distress Pet") {
      return "red";
    }
  }
}



function initList(data) {
  let ul = document.getElementById("ListReports");
  for (const report of data.Pets) {
    let section = document.createElement("section");
    section.classList.add("report");
    let sectionUser = document.createElement("section");
    sectionUser.classList.add("user");
    let aUserImage = document.createElement("a");
    aUserImage.classList.add("userImage");
    aUserImage.href = "#";
    let userImage = `<img src="${report.userImage}" alt="userImage">`;
    aUserImage.innerHTML += userImage;
    sectionUser.appendChild(aUserImage);
    let divUserName = document.createElement("div");
    divUserName.classList.add("userName");
    let UserName = `<h3>${report.userName}</h3>`;
    divUserName.innerHTML += UserName;
    let divCategory = document.createElement("div");
    divCategory.classList.add("category");
    let reportCategory = `<p>${report.category}</p>`;
    divCategory.innerHTML += reportCategory;
    divUserName.appendChild(divCategory);
    sectionUser.appendChild(divUserName);
    let divLocation = document.createElement("div");
    divLocation.classList.add("location");
    let reportLocation = `<h3>${report.city}</h3>`;
    divLocation.innerHTML += reportLocation;
    let aArrowIcon = document.createElement("a");
    aArrowIcon.classList.add("arrow");
    aArrowIcon.href = "#"
    let aArrow = `<img src="../imges/arrowicon.png" alt="arrow">`;
    aArrowIcon.innerHTML += aArrow;
    let divLastUpdate = document.createElement("div");
    divLastUpdate.classList.add("lastUpdate");
    let reportLastUpdate = LastUpdat(report.UpdateDay, report.UpdateMonth, report.UpdateYear);
    let lastUpdate = `<h3>${reportLastUpdate}</h3>`;
    divLastUpdate.innerHTML += lastUpdate;
    section.appendChild(sectionUser);
    section.appendChild(divLastUpdate);
    section.appendChild(divLocation);
    section.appendChild(aArrowIcon);
    ul.appendChild(section);
  }
}

function LastUpdat(day, month, year) {
  let date = new Date();
  let dayNow = date.getDate();
  let monthNow = date.getMonth() + 1;
  let yearNow = date.getFullYear();
  let lastUpdate = "";
  if (yearNow - year > 0) {
    lastUpdate = `${yearNow - year} years ago`;
  } else if (monthNow - month > 0) {
    lastUpdate = `${monthNow - month} months ago`;
  } else if (dayNow - day > 0) {
    lastUpdate = `${dayNow - day} days ago`;
  } else {
    lastUpdate = "Today";
  }
  return lastUpdate;
}


