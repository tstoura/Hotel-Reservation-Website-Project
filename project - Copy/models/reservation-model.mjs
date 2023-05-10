//synarthseis tou senariou reservation
import {Reservation} from "./model.mjs"

async function addReservation(newReservation){
    console.log(newReservation);
    console.log(newReservation.check_in_date)
    try{
        const createdReservation  = await Reservation.create(newReservation)
        console.log("Reservation created:", createdReservation.toJSON())
    }catch (error) {
        throw error
    }
}

export {addReservation}