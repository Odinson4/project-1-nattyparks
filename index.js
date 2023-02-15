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

  const parkItem = document.createElement("div");
  parkItem.classList.add("card");
  parkItem.innerHTML = `<div class="flip-card">
    <div class="flip-card-inner">
    <div class="flip-card-front">
    <div class="carousel-container">
    <img id="park-image-${park.id}" src="${park.images[0].url}">
    </div>
    <h2>${park.fullName}</h2>
    </div>
    <div class="flip-card-back">
    <p class="card-text">
    Address: ${address.line1} ${address.city}, ${address.stateCode} ${address.postalCode}
    <br>
    Entrance Fees: $${entranceFees?.cost}
    <br>
    </p>
    <a href="${park.url}" class="website">WEBSITE</a>
    </div>
    </div>
  </div>`;

  // Set up the carousel of images
  const imageElement = parkItem.querySelector(`#park-image-${park.id}`);
  let imageIndex = 0;
  setInterval(() => {
    imageIndex = (imageIndex + 1) % park.images.length;
    imageElement.src = park.images[imageIndex].url;
  }, 3000);

  return parkItem;
}

const randomParkButton = document.getElementById("random-park-button");

// Add an event listener to the button element
randomParkButton.addEventListener("click", getRandomPark);

// Define the getRandomPark function
function getRandomPark() {
  fetch("https://developer.nps.gov/api/v1/parks?api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.data.length);
      const park = data.data[randomIndex];
      const parkCard = createParkCard(park);
      parksList.innerHTML = "";
      parksList.appendChild(parkCard);
    })
    .catch((error) => {
      console.error("Error fetching parks:", error);
    });
}
