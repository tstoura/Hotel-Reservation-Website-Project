import {User, Reservation, Room, ReservationRoom} from "./model.mjs"
import {Op, Model, DataTypes} from 'sequelize'

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
async function showRooms(){
  try{
    const rooms = await Room.findAll({raw:true})
    return rooms
  }catch(error){
    throw error
  }
}
async function addReservation(newReservation) {
    try {
  
      const reservation = await Reservation.create(newReservation);
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

async function findReservation(reservationID){
  try{
    const resInfo = await Reservation.findByPk(reservationID);
    const roomID = await ReservationRoom.findByPk(reservationID);
    console.log("roomID:",roomID.dataValues)
    console.log("roomID.dataValues.RoomRoomID:", roomID.dataValues.RoomRoomID)
    console.log("resInfo", resInfo.dataValues)
    return {resInfo: resInfo.dataValues, roomID:roomID.dataValues.RoomRoomID}
  }catch(error){
    throw error
  }
}

async function updateReservation(updateData) {
  try {
  
    const reservation = await Reservation.findByPk(updateData.reservationID);
    // Update Reservation table
    await reservation.update(updateData);
    
    // Update ReservationRoom table
    const reservationRoom = await ReservationRoom.findByPk(updateData.reservationID);

    await reservationRoom.update({ RoomRoomID: updateData.RoomRoomID });
    
    return reservation;
  } catch (error) {
    throw error;
  }
}

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
        // console.log("New User:", user.toJSON())

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

async function getRooms() {
  try {

      const firstDates=['2023-01-01','2023-02-01','2023-03-01','2023-04-01','2023-05-01','2023-06-01','2023-07-01','2023-08-01','2023-09-01','2023-10-01','2023-11-01','2023-12-01']
      const lastDates=['2023-01-31','2023-02-28','2023-03-31','2023-04-30','2023-05-31','2023-06-30','2023-07-31','2023-08-31','2023-09-30','2023-10-31','2023-11-30','2023-12-31']
      
      const bookedRooms = []
      for(let i=0;i<12;i++){
          const roomsMonth = await Room.count({
              include:[
                  {model:Reservation,
                  where:{
                      [Op.or]:[
                          {check_in_date:{
                              [Op.between]:[firstDates[i],lastDates[i]]
                          }},
                          {check_out_date:{
                              [Op.between]:[firstDates[i],lastDates[i]]
                          }}
                      ],
                      
                      
                  },
                  fallbackValue: 0,
                  through: 
                    {model: ReservationRoom},
                  
                   }],
              raw:true})
              
              // console.log("count: ",bookedRooms)
              bookedRooms.push(roomsMonth)
      }


    return bookedRooms
  } catch (error) {
    console.log("Error:", error)
    throw error
  }
}
export {showReservations,addReservation, findReservation, updateReservation, deleteReservation, addUser, deleteUser, showRooms, getRooms}