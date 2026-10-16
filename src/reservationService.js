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
  
  for(const seatId of seatIds) {
    const seat = store.seats.get(seatId);
    if (!seat) {
      throw new Error(`Seat with ID ${seatId} does not exist.`);
    }   
    if (seat.eventId !== eventId) {
      throw new Error(`Seat with ID ${seatId} does not belong to event with ID ${eventId}.`);
    }   
    if (seat.status !== 'available') {
      throw new Error(`Seat with ID ${seatId} is not available.`);
    }   
  }
  
  const reservation = {
    id: generateId('res'),
    eventId,
    userId,
    seatIds: [...seatIds],
    status: 'ACTIVE',
  };

  for (const seatId of seatIds) {
    store.seats.get(seatId).status = 'RESERVED';
  }

  store.reservations.set(reservation.id, reservation);
  return reservation;

  function cancelReservation(reservationId, userId) {
  const reservation = store.reservations.get(reservationId);

  if (!reservation) {
    throw new Error('RESERVATION_NOT_FOUND');
  }
  if (reservation.userId !== userId) {
    throw new Error('NOT_RESERVATION_OWNER');
  }
  if (reservation.status !== 'ACTIVE') {
    throw new Error('RESERVATION_NOT_ACTIVE');
  }

  // 5B go  for (const seatId of reservation.seatIds) {
    const seat = store.seats.get(seatId);
    if (seat) {
      seat.status = 'AVAILABLE';
    }
  }

  reservation.status = 'CANCELLED';
  return reservation;
  
module.exports = { reserveSeats, cancelReservation };   