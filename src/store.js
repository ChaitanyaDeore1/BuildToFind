// src/store.js
let nextId = 1;

const store = {
  events: new Map(),        // eventId -> { id, name }
  seats: new Map(),         // seatId -> { id, eventId, status }
  reservations: new Map(),  // reservationId -> { id, eventId, userId, seatIds, status }
};

function generateId(prefix) {
  return `${prefix}_${nextId++}`;
}

function resetStore() {
  store.events.clear();
  store.seats.clear();
  store.reservations.clear();
  nextId = 1;
}

module.exports = { store, generateId, resetStore };