document.addEventListener("DOMContentLoaded", function () {
  // code to be executed when the DOM is fully loaded
  // Select DOM elements we will need to reference later
  const stateSelect = document.querySelector("select");
  const parksList = document.querySelector("#parks-list");

  // Add an event listener to the state select element to render parks for the selected state
  stateSelect.addEventListener("change", (event) => {
    const selectedState = event.target.value;
    // Clear the parks list element
    parksList.innerHTML = "";
    // Call the renderParks function with the selected state to fetch and display park data
    renderParks(selectedState)
      .then((parks) => {
        parks.forEach((park) => {
          const parkItem = createParkCard(park);
          parksList.appendChild(parkItem);
        });
      });
  });

  // Define a function to fetch park data for a given state code
  function renderParks(stateCode) {
    // Fetch park data from the NPS API using the provided state code and API key
    return fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
      .then((response) => response.json())
      .then((data) => data.data);
  }

  // Define a function to create a park card element for a given park object
  function createParkCard(park) {
    // Get the park's address and entrance fees data for display in the card
    const address = park.addresses[0];
    const entranceFees = park.entranceFees[0];
    const activity1 = park.activities[0];
    const activity2 = park.activities[1];
    const activity3 = park.activities[2];

    // Create a new div element to hold the park card
    const parkItem = document.createElement("div");
    // Add a "card" class to the park item element for styling
    parkItem.classList.add("card");
    parkItem.innerHTML = `<div class="flip-card">
    <div class="flip-card-inner">
    <div class="flip-card-front">
    <div class="carousel-container">
    <img id="park-image-${park.id}" src="${park.images[0].url}">
    </div>
    <h2>${park.fullName.toUpperCase()}</h2>
    </div>
    <div class="flip-card-back">
    <p class="card-text">
    Park Code: ${park.parkCode}
    <br>
    Address: ${address.line1} ${address.city}, ${address.stateCode} ${address.postalCode}
    <br>
    Entrance Fees: $${entranceFees?.cost}
    <br>
    Activites: ${activity1?.name}, ${activity2?.name}, ${activity3?.name}
    </p>
    <br>
    <br>
    <br>
    <br>
    <br>
    <a href="${park.url}" class="button-link">Visit Website</a>
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
  }
});