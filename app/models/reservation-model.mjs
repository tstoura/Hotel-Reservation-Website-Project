//synarthseis tou senariou reservation
import {Reservation,Room,User,Room_Type} from "./model.mjs"
import faker from 'faker' 
import {Op, Model, DataTypes} from 'sequelize'

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

async function getRooms(data){

    try {
      
      const rooms = await Room.findAll({ raw: true })

      // const rooms = await Room.findAll({attributes: ['roomID'],
      //                                   include: {                                                                                    
      //                                     model: Room_Type,
      //                                     attributes: ['typeName'],
      //                                     where: {
      //                                       capacity: {
      //                                         [Op.gte]: data.guests
      //                                       }
      //                                     }
      //                                   },
      //                                   raw: true})
      
      // console.log("MODEL: ",rooms)
      return rooms
    } catch (error) {
        throw error
  }
}

// Users
function generateUsers(numUsers) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber(),
        role:"member"
      }
      users.push(user)
    }
    return users
  }

// Reservations
function generateBookingDate(checkInDate,Pmathod,userID) {
  const checkOutDate = faker.date.future()
  if (checkOutDate <= checkInDate) {
    
    return generateBookingDate(checkInDate,Pmathod,userID)
  }

  const booking = {
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    total_price: 250,
    paymentMethod: Pmathod,
    UserUserID: userID 
  }
  
  return booking
}
  

function generateBookings(numBookings, users) {
const bookings = []
const userID = [users[0].dataValues.userID,users[0].dataValues.userID,users[1].dataValues.userID,users[1].dataValues.userID,users[2].dataValues.userID,users[2].dataValues.userID,users[3].dataValues.userID,users[4].dataValues.userID]

for (let i = 0; i < numBookings-2; i++) {
    const checkInDate = faker.date.future()
    const booking = generateBookingDate(checkInDate,"card",userID[i])
    bookings.push(booking)

}

for (let i = numBookings-2; i < numBookings; i++) {
    const checkInDate = faker.date.future()
    const booking = generateBookingDate(checkInDate,"cash",userID[i])
    bookings.push(booking)
}
return bookings
}

//RoomTypes
function generateRoomTypes() {
  const roomTypes = [];
  const Typenames=['Single Room','Double Room','Triple Room','Deluxe Suite']
  const prices = [50,80,150,200]
  const cap = [1,2,3,2]


  for (let i = 0; i < Typenames.length; i++) {
      
      const roomType = {
      typeName: Typenames[i],
      pricePerNight: prices[i],
      capacity: cap[i]
      // Generate other room fields as needed
      }
      roomTypes.push(roomType)
  }
    return roomTypes
    }

// Rooms
const unavRooms=[]
function generateRooms(numRooms,types,bookings) {
const rooms = [];

for (let i = 0; i < 2; i++) {
    const room = {
    number: 10+i,
    status:"unavailable",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[0].dataValues.roomTypeID,
    ReservationReservationID: faker.random.arrayElement(bookings).dataValues.reservationID
    }
    
    rooms.push(room)
    unavRooms.push(room)
 }

for (let i = 0; i < 2; i++) {
    const room = {
    number: 12+i,
    status:"available",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[0].dataValues.roomTypeID
    }
    rooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 20+i,
    status:"unavailable",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[1].dataValues.roomTypeID,
    ReservationReservationID: faker.random.arrayElement(bookings).dataValues.reservationID
    }
    rooms.push(room)
    unavRooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 22+i,
    status:"available",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[1].dataValues.roomTypeID
    }
    rooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 30+i,
    status:"unavailable",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[2].dataValues.roomTypeID,
    ReservationReservationID: faker.random.arrayElement(bookings).dataValues.reservationID
    }
    rooms.push(room)
    unavRooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 32+i,
    status:"available",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[2].dataValues.roomTypeID,
    }
    rooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 40+i,
    status:"unavailable",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[3].dataValues.roomTypeID,
    ReservationReservationID: faker.random.arrayElement(bookings).dataValues.reservationID
    }
    rooms.push(room)
    unavRooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 42+i,
    status:"available",
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[3].dataValues.roomTypeID,
    }
    rooms.push(room)
    
}

return rooms
}

//Create initial DB data
async function createdata(){   
   console.log("OK2")
    
  try {
    // Generate users
    const numUsers = 5 
    const users = generateUsers(numUsers)
    await User.bulkCreate(users)    
    console.log("OK3")

    // Generate bookings
    const numBookings = 8 
    const usersArray = await User.findAll()
    // const userid = usersArray[0].dataValues.userID

    const bookings = generateBookings(numBookings, usersArray)
    await Reservation.bulkCreate(bookings)
    console.log("OK4")

    // Generate room_types
    const roomtypes = generateRoomTypes()
    await Room_Type.bulkCreate(roomtypes)
    console.log("OK5")

    // Generate rooms
    const numRooms = 16 
    const bookingsArray = await Reservation.findAll()
    const roomTypesArray = await Room_Type.findAll()
    const rooms = generateRooms(numRooms,roomTypesArray,bookingsArray)
    await Room.bulkCreate(rooms)
    console.log("OK6")       
    

    console.log('Dummy data generated successfully!')
  } catch (error) {
    console.error('Error generating dummy data:', error);
  }
    
    
    
}

export {addReservation,createdata,getRooms}
