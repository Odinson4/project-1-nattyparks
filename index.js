
let stateUrl = `https://developer.nps.gov/api/v1/parks?parkCode=&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`
let results = document.querySelector('#results')
let park;
function handleDropdownClick(event) {
  const dropdownContent = document.querySelector('#myDropdown');
  dropdownContent.classList.toggle('show');
}
const dropdownButton = document.querySelector('.dropbtn');
dropdownButton.addEventListener('click', handleDropdownClick);


fetch(stateUrl)
  .then(res => res.json())
  .then(data => {
    renderStates(data);
  })

// function renderStates(data) {
//   data.data.forEach(park => {
//     const statePark = document.createElement('article');
//     const stateBtn = document.createElement('button');
//     stateBtn.textContent = park.fullName;
//     const stateDetails = document.createElement('div');
//     stateDetails.className = 'state-details';
//     stateDetails.textContent = park.description;
//     statePark.append(stateBtn, stateDetails);
//     document.querySelector('#myDropdown').append(statePark);

//     stateBtn.addEventListener('click', () => {
//       console.log(`You clicked on ${park.states}`);

//     });
//   });
// }

// function renderParks(data) {

// }

function filterParksByState(state, data) {
  const parksByState = data.data.filter(park => park.states === state);
  renderParksByState(parksByState);
}


function renderStates(data) {
  const allStates = [...new Set(data.data.map(park => park.states))];

  allStates.forEach(state => {
    const stateBtn = document.createElement('button');
    stateBtn.textContent = state;
    stateBtn.addEventListener('click', () => {
      filterParksByState(state, data);
    });
    document.querySelector('#myDropdown').append(stateBtn);
  });
}

function renderParksByState(parksByState) {
  document.querySelector('#park-section').innerHTML = '';
  parksByState.forEach(park => {
    const statePark = document.createElement('card');
    const parkName = document.createElement('h3');
    parkName.textContent = park.fullName;
    const parkDescription = document.createElement('p');
    parkDescription.textContent = park.description;
    statePark.append(parkName, parkDescription);
    document.querySelector('#park-section').append(statePark);
  });
}
