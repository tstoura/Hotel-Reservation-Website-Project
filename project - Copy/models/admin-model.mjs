import {User, Reservation} from "./model.mjs"

async function addReservation(newReservation){
    try{
        // console.log(newReservation)
        const reservation = await Reservation.create(newReservation)
        // console.log("New Reservation:", reservation.toJSON())
    }catch(error) {
        throw error
    }
}

async function deleteReservation(reservationID){
    try{
        // console.log(reservationID)
        const reservationToBeDeleted = await Reservation.destroy({where: {reservationID: reservationID}})
    }catch(error){
        throw error
    }
}

async function addUser(newUser){
    try{
        const user = await User.create(newUser)
        console.log("New User:", user.toJSON())

    }catch(error){
        throw error
    }
}

async function deleteUser(userID){
    try{
        const userToBeDeleted = await User.destroy({where: {userID: userID}})
    }catch(error){
        throw error
    }
}

export {addReservation, deleteReservation, addUser, deleteUser}