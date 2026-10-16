// src/eventService.js
const { store, generateId } = require('./store');

function createEvent(name) {
  const event = { id: generateId('event'), name };
  store.events.set(event.id, event);
  return event;
}

function addSeat(eventId, seatId) {
  if (!store.events.has(eventId)) {
    throw new Error('EVENT_NOT_FOUND');
  }
  if (store.seats.has(seatId)) {
    throw new Error('SEAT_ALREADY_EXISTS');
  }
  const seat = { id: seatId, eventId, status: 'AVAILABLE' };
  store.seats.set(seatId, seat);
  return seat;
}

function addSeats(eventId, seatIds) {
  return seatIds.map((seatId) => addSeat(eventId, seatId));
}

module.exports = { createEvent, addSeat, addSeats };