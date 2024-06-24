
let map;
async function initMap() {
  const position = { lat: 32.089923, lng: 34.802476 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();

window.onload = () => {
  fetch("../data/data.json")
      .then(response => response.json())
      .then(data => initList(data))
}


function initList(data) {
  let ul = document.getElementById("ListReports");
  for (const report of data.LostPets){
    let section = document.createElement("section");
    section.classList.add("report");
    let sectionUser= document.createElement("section");
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
    let aArrowIcon= document.createElement("a");
    aArrowIcon.classList.add("arrow");
    aArrowIcon.href= "#"
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

function LastUpdat(day, month, year){
  let date = new Date();
  let dayNow = date.getDate();
  let monthNow = date.getMonth()+1;
  let yearNow = date.getFullYear();
  let lastUpdate = "";
  if (yearNow - year > 0){
    lastUpdate = `${yearNow - year} years ago`;
  } else if (monthNow - month > 0){
    lastUpdate = `${monthNow - month} months ago`;
  } else if (dayNow - day > 0){
    lastUpdate = `${dayNow - day} days ago`;
  } else {
    lastUpdate = "Today";
  }
  return lastUpdate;
}