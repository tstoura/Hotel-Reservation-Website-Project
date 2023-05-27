import {Reservation,Room,User,Room_Type, Review, ReservationRoom} from "./model.mjs"
import faker from 'faker' 
import {Op, Model, DataTypes} from 'sequelize'
import bcrypt from "bcrypt"

// Users
async function generateUsers(numUsers) {
    const users = [];
    
    const hash = await bcrypt.hash('admin', 10)
    const pass = hash

    users.push({userID: 0,
      username: 'admin',
      password: pass,
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone_number: faker.phone.phoneNumber(),
    })

    for (let i = 1; i < numUsers; i++) {
      const user = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber()
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
function generateRooms(types) {
const rooms = [];

for (let i = 0; i < 2; i++) {
    const room = {
    number: 10+i,
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
    number: 12+i,
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
    number: 22+i,
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
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[2].dataValues.roomTypeID
    }
    rooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 32+i,
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
    breakfast: true,
    view: true,
    smoking: false,
    freeCancelation: true,
    RoomTypeRoomTypeID: types[3].dataValues.roomTypeID
    }
    rooms.push(room)
}
for (let i = 0; i < 2; i++) {
    const room = {
    number: 42+i,
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

//Booked Rooms
function generateReservationRooms(numRooms,rooms,bookings){
  const bookedRooms=[]
  for(let i=0;i<numRooms;i++){
    if(i%2===0){ 
      const bookedRoom = {
        ReservationReservationID: faker.random.arrayElement(bookings).dataValues.reservationID,
        RoomRoomID: rooms[i].roomID
        
        }
        bookedRooms.push(bookedRoom)
    }
  }
  return bookedRooms
  
}

//Create initial DB data
async function createdata(){   
  
  const userData = await User.count()
  const roomTypeData = await Room_Type.count()
  const bookingData = await Reservation.count()
  const roomData = await Room.count()
  const reviewData = await Review.count()
  const bookedRoomData = await ReservationRoom.count()

  try {
  // Generate users
  if (userData===0){
    const numUsers = 5 
    const users = await generateUsers(numUsers)
    await User.bulkCreate(users)    
  }

  // Generate bookings
  if (bookingData===0)
  {const numBookings = 8 
  const usersArray = await User.findAll()

  const bookings = generateBookings(numBookings, usersArray)
  await Reservation.bulkCreate(bookings)}

  // Generate room_types
  if(roomTypeData===0)
  {const roomtypes = generateRoomTypes()
  await Room_Type.bulkCreate(roomtypes)}

  // Generate rooms
  if(roomData===0)
  {const roomTypesArray = await Room_Type.findAll()
  const rooms = generateRooms(roomTypesArray)
  await Room.bulkCreate(rooms)   } 
  
  //Generate booked rooms
  if(bookedRoomData===0)
  {const numRooms = 16 
  const rooms = await Room.findAll({raw:true})
  const bookings = await Reservation.findAll()
  const reservationRooms = generateReservationRooms(numRooms,rooms,bookings)
  await ReservationRoom.bulkCreate(reservationRooms)

}

  console.log('Ramdom data generated successfully!')
} catch (error) {
  console.error('Error generating dummy data:', error);
  } 
   
}


export{createdata}