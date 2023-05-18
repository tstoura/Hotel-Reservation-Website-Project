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
      
      const overlappingReservations = await Reservation.findAll({ 
        where: {
          [Op.or]:[
            {
              check_in_date: {
                [Op.lte]: data.dateOut,
              },
              check_out_date: {
                [Op.gte]: data.dateIn,
              },
            },
            {
              check_in_date: {
                [Op.between]: [data.dateIn, data.dateOut],
              },
            },
            {
              check_out_date: {
                [Op.between]: [data.dateIn, data.dateOut],
              },
            },
          ],
        },
      });

      const roomIDs = overlappingReservations.map( (reservation) => reservation.roomID )

      const availableRooms = await Room.findAll({
        where: {
          roomID: {
            [Op.notIn]: roomIDs,
          },
        },
      });

      return availableRooms

    } catch (error) {
        throw error
  }
}

// async function getRooms(data){

//   try {
    
//     const rooms = await Room.findAll({ raw: true })

//     // const rooms = await Room.findAll({attributes: ['roomID'],
//     //                                   include: {                                                                                    
//     //                                     model: Room_Type,
//     //                                     attributes: ['typeName'],
//     //                                     where: {
//     //                                       capacity: {
//     //                                         [Op.gte]: data.guests
//     //                                       }
//     //                                     }
//     //                                   },
//     //                                   raw: true})
    
//     // console.log("MODEL: ",rooms)
//     return rooms
//   } catch (error) {
//       throw error
// }
// }

// Users
function generateUsers(numUsers) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      userID: i,
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

//RoomTypes
function generateRoomTypes() {
  const roomTypes = [];
  const Typenames=['Single Room','Double Room','Triple Room','Deluxe Suite']
  const prices = [50,80,150,200]
  const cap = [1,2,3,2]


  for (let i = 0; i < Typenames.length; i++) {
      
      const roomType = {
      roomTypeID: i,
      typeName: Typenames[i],
      pricePerNight: prices[i],
      capacity: cap[i]
      // Generate other room fields as needed
      }
      roomTypes.push(roomType)
  }
    return roomTypes
}

//Rooms
function generateRooms(numRooms, roomtypes){
  const rooms = [];

  for (let i = 0; i < numRooms; i++) {
    const room = {
      roomID: i,
      number: 10 + i,
      status: ( i % 3 == 0 ? 'unavailable' : 'available'),
      breakfast: true,
      view: true,
      smoking: false,
      freeCancelation: true,
      RoomTypeRoomTypeID: roomtypes[i % roomtypes.length].dataValues.roomTypeID,
    };
  
    rooms.push(room);
  }
  return rooms;
}


function generateBookingDate(checkInDate, paymentMethod, userID, roomID) {
  const checkOutDate = faker.date.future();
  if (checkOutDate <= checkInDate) {
      return generateBookingDate(checkInDate, paymentMethod, userID, roomID);
  }

  const booking = {
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      total_price: 250,
      paymentMethod: paymentMethod,
      UserUserID: userID,
      RoomRoomID: roomID,
  };

  return booking;
}

//Reservation
function generateBookings(numBookings, users, rooms) {
  const bookings = [];
  const userID = users.map((user) => user.userID);
  // console.log(rooms)
  for (let i = 0; i < numBookings; i++) {
    const checkInDate = faker.date.future();
    const room = rooms[i % rooms.length];
    const booking = generateBookingDate(
      checkInDate,
      i % 2 === 0 ? "card" : "cash",
      userID[i],
      room.roomID
    );
    bookings.push(booking);
  }

  return bookings;
}

    //Create initial DB data
async function createdata(){   
  //  console.log("OK2")
    
  try {

     // Generate users
    const numUsers = 10;
    const randomUsers = generateUsers(numUsers);
    await User.bulkCreate(randomUsers);
    // // console.log("OK3")

    
    // Generate room_types
    const roomtypes = generateRoomTypes()
    await Room_Type.bulkCreate(roomtypes)
    // console.log("OK5")

    // Generate rooms
    const numRooms = 16;
    const roomTypesArray = await Room_Type.findAll();
    const rooms = generateRooms(numRooms,roomTypesArray);
    await Room.bulkCreate(rooms)

    // Generate bookings
    const numBookings = 8 
    // const usersArray = await User.findAll()
    // const userid = usersArray[0].dataValues.userID

    const bookings = generateBookings(numBookings, randomUsers, rooms)
    await Reservation.bulkCreate(bookings)
    // // console.log("OK4")

    console.log('Dummy data generated successfully!')
  } catch (error) {
    console.error('Error generating dummy data:', error);
  }    
}

export {addReservation,createdata,getRooms}