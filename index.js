
const stateSelect = document.querySelector("select");
const parksList = document.querySelector("#parks-list");
const parkSection = document.querySelector("#park-section");

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
  parkSection.innerHTML = "";

  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
    .then((response) => response.json())
    .then((data) => {
      const parks = data.data;
      parks.forEach((park) => {
        const parkItem = document.createElement("card");
        const address = park.addresses[0];
        const entranceFees = park.entranceFees[0];
        const [activity1, activity2, activity3, activity4] = park.activities;

        parkItem.innerHTML = `
          <img src="${park.images[0].url}"<br><br>
          <a href="#">${park.fullName}</a>
          <br>Address: ${address.line1} ${address.city}, ${address.stateCode} ${address.postalCode}
          <br>Entrance Fees: $${entranceFees.cost}
          <br>Activities: ${activity1?.name}, ${activity2?.name}, ${activity3?.name}, ${activity4?.name}
          <br>${park.description}
        `;
        parksList.appendChild(parkItem);
      });
    });
});


// let stateUrl = `https://developer.nps.gov/api/v1/parks?parkCode=&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`
// const stateSelect = document.querySelector('select');
// const parksList = document.querySelector('#parks-list');
// const parkSection = document.querySelector('#park-section');
// let park;

// function handleDropdownClick() {
//   const dropdownContent = document.querySelector('#state');
//   dropdownContent.classList.toggle('show');
// }
// const dropdownButton = document.querySelector('.dropbtn');
// dropdownButton.addEventListener('click', handleDropdownClick);

// parksList.addEventListener('click', (event) => {
//   const parkId = event.target.dataset.parkId;
//   if (!parkId) {
//     return;
//   }

// })

// // This function allows the user to select a state from the dropdown.
// // The change event is triggered when the user selects a new state.
// stateSelect.addEventListener('change', (event) => {
//   const selectedState = event.target.value;
//   // This resets the list of parks instead of adding the parks onto the list.
//   parksList.innerHTML = '';
//   parkSection.innerHTML = '';
//   console.log(selectedState);

//   // A fetch that is grabbing the data for the selected state.
//   fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
//     .then(response => response.json())
//     .then(data => {
//       const parks = data.data;
//       parks.forEach(park => {
//         console.log(park);
//         const parkItem = document.createElement('li.card');
//         // It's grabbing the data for the selected state and displays full name of that park from the array (API)
//         let address = park.addresses[0];
//         let entranceFees = park.entranceFees[0]
//         let activity1 = park.activities[0];
//         let activity2 = park.activities[1];
//         let activity3 = park.activities[2];
//         let activity4 = park.activities[3];
//         parkItem.innerHTML = `<img src="${park.images[0].url}"<br> <a href="#">${park.fullName}</a> <br>Address: ${address.line1} ${address.city}, ${address.stateCode} ${address.postalCode}<br> Entrance Fees: $${entranceFees.cost}<br>Activities: ${activity1?.name}, ${activity2?.name}, ${activity3?.name}, ${activity4?.name} <br>${park.description}`;
//         // Appending the park item to the parkSection.
//         parksList.appendChild(parkItem);
//       });
//     });
// });

