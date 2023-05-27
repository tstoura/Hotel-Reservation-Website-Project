import {User, Reservation,Room, ReservationRoom} from "./model.mjs"

async function showReservations(){
    try{
        const bookings = await Reservation.findAll( {
            include:[
                {model:Room,
                attributes:['roomID','number'],
                through:{
                    model:ReservationRoom,
                }}
            ],
            
              raw: true
            })
        
        console.log("Booking: ",bookings[0])
        // console.log("Room Number:", bookings.Rooms.number[0])
        return bookings
    }catch(error){
        throw error
    }
}
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

export {showReservations,addReservation, deleteReservation, addUser, deleteUser}