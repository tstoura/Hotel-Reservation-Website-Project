import {Reservation} from "./model.mjs"

async function addReservation(newReservation){
    try{
        // console.log(newReservation)
        const reservation = await Reservation.create(newReservation)
        console.log("New Reservation:", reservation.toJSON())
    }catch(error) {
        throw error
    }
}

export {addReservation}