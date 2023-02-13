
let stateUrl = `https://developer.nps.gov/api/v1/parks?parkCode=&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`
let park;

function handleDropdownClick(event) {
  const dropdownContent = document.querySelector('#state');
  dropdownContent.classList.toggle('show');
}
const dropdownButton = document.querySelector('.dropbtn');
dropdownButton.addEventListener('click', handleDropdownClick);


function filterParksByState(state, data) {
  const parksByState = data.data.filter(park => park.states == state);
  renderParksByState(parksByState);
}


fetch(stateUrl)
  .then(res => res.json())
  .then(data => {
    renderStates(data);
  })

function renderStates(data) {
  const allStates = [...new Set(data.data.map(park => park.states))];

  allStates.forEach(state => {
    const stateBtn = document.createElement('button');
    stateBtn.textContent = state;
    stateBtn.addEventListener('click', () => {
      filterParksByState(state, data);
      console.log(`You clicked on ${data.data.states}`);
    });

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


const stateSelect = document.querySelector('select');
const parksList = document.getElementById('parks-list');
const parkSection = document.getElementById('park-section');

stateSelect.addEventListener('change', (event) => {
  const selectedState = event.target.value;
  parksList.innerHTML = '';
  parkSection.innerHTML = '';

  if (!selectedState) {
    return;
  }

  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
    .then(response => response.json())
    .then(data => {
      const parks = data.data;
      parks.forEach(park => {
        const parkItem = document.createElement('li');
        parkItem.innerHTML = `<a href="#" data-park-id="${park.id}">${park.fullName}</a>`;
        parksList.appendChild(parkItem);
      });
    });
});

parksList.addEventListener('click', (event) => {
  const parkId = event.target.dataset.parkId;
  if (!parkId) {
    return;
  }

  parkSection.innerHTML = '';

  //   fetch(`https://developer.nps.gov/api/v1/parks/${parkId}?api_key=feZhEue5BDxWEdkf9Uajlf4ervRQKQWzOswrWVoa&limit=500`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const park = data.data[0];
  //       const parkHeader = document.createElement('h3');
  //       parkHeader.innerText = park.fullName;
  //       parkSection.appendChild(parkHeader);

  //       const parkDescription = document.createElement('p');
  //       parkDescription.innerText = park.description;
  //       parkSection.appendChild(parkDescription);

  //       const parkUrl = document.createElement('a');
  //       parkUrl.innerText = 'Visit Website';
  //       parkUrl.href = park.url;
  //       parkSection.appendChild(parkUrl);
  //     });
});