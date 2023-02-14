const stateSelect = document.querySelector("select");
const parksList = document.querySelector("#parks-list");

const dropdownButton = document.querySelector(".dropbtn");
dropdownButton.addEventListener("click", () => {
  document.querySelector("#state").classList.toggle("show");
});

parksList.addEventListener("click", (event) => {
  const parkId = event.target.dataset.parkId;
  if (!parkId) return;
});

stateSelect.addEventListener("change", (event) => {
  const selectedState = event.target.value;
  parksList.innerHTML = "";

  renderParks(selectedState)
    .then((parks) => {
      parks.forEach((park) => {
        const parkItem = createParkCard(park);
        parksList.appendChild(parkItem);
        const card = parkItem.querySelector('.card');
        const cardDescription = parkItem.querySelector('.card-text');
        addCardEventListeners(card, cardDescription);
      });
    });
});

function renderParks(stateCode) {
  return fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
    .then((response) => response.json())
    .then((data) => data.data);
}

function createParkCard(park) {
  const address = park.addresses[0];
  const entranceFees = park.entranceFees[0];

  const parkItem = document.createElement("card");
  parkItem.innerHTML = `<div class="card">
    <img src="${park.images[0].url}">
    <h2>${park.fullName}</h2>
    <p class="card-text hide">
      <a href="${park.url}" class="website">Website</a>
      <br>
      Address: ${address.line1} ${address.city}, ${address.stateCode} ${address.postalCode}
      <br>
      Entrance Fees: $${entranceFees?.cost}
      <br>
      Description: ${park.description}
    </p>
  </div>`;

  return parkItem;
}

function addCardEventListeners(card, cardDescription) {
  card.addEventListener('mouseover', () => {
    cardDescription.classList.remove('hide');
  });
  card.addEventListener('mouseout', () => {
    cardDescription.classList.add('hide');
  });
}
