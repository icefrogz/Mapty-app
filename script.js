'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
class Workout {
  date = new Date();
  // id = (new Date.now() + '').slice(-10);
  constructor(date, coords, distance, duration) {
    this.date = date;
    this.coords = coords; // lat and lang
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
}

class Running extends Workout {
  constructor(coords, duration, distance, cadence) {
    super(coords, duration, distance);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, duration, distance, elevationGain) {
    super(coords, duration, distance);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
  }
}
const run = new Running([39, -12], 5.2, 24, 178);
const cycle = new Cycling([39, -12], 27, 95, 523);
console.log(run, cycle);
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Cant get your position');
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    this.#map = L.map('map').setView(
      [-37.82524364433162, 144.9636935573586],
      13
    );
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    var marker = L.marker([-37.82524364433162, 144.9636935573586])
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popoup. <br>easily customisable')
      .openPopup();

    this.#map.on('click', this._showForm.bind(this));
  }
  //handle clicks on map
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  //new workout
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    const form = document.querySelector('.form');
    const containerWorkouts = document.querySelector('.workouts');
    const inputType = document.querySelector('.form__input--type');
    const inputDistance = document.querySelector('.form__input--distance');
    const inputDuration = document.querySelector('.form__input--duration');
    const inputCadence = document.querySelector('.form__input--cadence');
    const inputElevation = document.querySelector('.form__input--elevation');

    //get data from form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type == 'running') {
      const cadence = +inputCadence.value;
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(cadence) ||
        // !Number.isFinite(duration)
        !validInputs(
          distance,
          cadence,
          duration || !allPositive(distance, duration, cadence)
        )
      )
        return alert('Inputs have to be positive numbers');
    }

    if (type == 'cycling') {
      const elevation = +inputElevation.value;
      if (!validInputs(distance, elevation, duration))
        return alert('Inputs have to be positive numbers');
    }
    //display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          maxHeight: 150,
          autoClose: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();

    //clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
        inputElevation.value('');
  }
}

const app = new App();
