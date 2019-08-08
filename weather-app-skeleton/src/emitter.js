const EVENT_NAME = {
  LOCATION_ACQUIRED: "LOCATION_ACQUIRED",
  WEATHER_DATA_SAVED: "WEATHER_DATA_SAVED"
};

class Emitter {
  constructor() {
    this.eventTarget = new EventTarget();
  }
  fire(eventName) {
    console.log("Emitter firing event", eventName);
    this.eventTarget.dispatchEvent(new Event(eventName));
  }
  addListener(eventName, listener) {
    this.eventTarget.addEventListener(eventName, listener);
  }
}

const emitter = new Emitter();

export { emitter, EVENT_NAME };
