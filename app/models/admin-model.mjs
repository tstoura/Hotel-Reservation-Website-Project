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
        
        for(let i = 0; i<bookings.length; i++){
            bookings[i].Rooms_number = bookings[i]['Rooms.number']
        }
        return bookings
    }catch(error){
        throw error
    }
}

async function addReservation(newReservation, roomID) {
    try {
      console.log("mpike")
      console.log(newReservation)
      const reservation = await Reservation.create(newReservation);
    //   console.log(newReservation)
    //   console.log(reservation)
    // //   Associate the reservation with the room
      await ReservationRoom.create({
        ReservationReservationID: reservation.dataValues.reservationID,
        RoomRoomID: newReservation.RoomRoomID,
      });
      console.log(newReservation)
      console.log(reservation)
      return reservation;
   
    } catch (error) {
      throw error;
    }
  }

//   async function addReservationRoom(reservationID,roomID){

//   }
  

// async function deleteReservation(reservationID){
//     try{
//         // console.log(reservationID)
//         const reservationToBeDeleted = await Reservation.destroy({where: {reservationID: reservationID}})
//     }catch(error){
//         throw error
//     }
// }
async function deleteReservation(reservationID) {
    try {
      const reservationToBeDeleted = await Reservation.findByPk(reservationID);
    
      // Delete the associated ReservationRoom records
      await ReservationRoom.destroy({
        where: { ReservationReservationID: reservationID },
      });
  
      // Delete the reservation
      await reservationToBeDeleted.destroy();
  
      return reservationToBeDeleted;
    } catch (error) {
        throw error;
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

// async function getBookedRooms(){
//     const 
// }

export {showReservations,addReservation, deleteReservation, addUser, deleteUser}