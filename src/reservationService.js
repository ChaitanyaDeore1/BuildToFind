const {store, generateId} = require('./store');

function reserveSeats(eventId, userId, seatIds) {
  // Check if the event exists
  if (!store.events.has(eventId)) {
    throw new Error(`Event with ID ${eventId} does not exist.`);
  } 

  if(!Array.isArray(seatIds) || seatIds.length === 0) {
    throw new Error('seatIds must be a non-empty array.');
  }             

  if (new Set(seatIds).size !== seatIds.length) {
    throw new Error('seatIds must be unique.');
  } 

}

module.exports = { reserveSeats };  