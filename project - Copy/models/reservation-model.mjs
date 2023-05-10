//synarthseis tou senariou reservation
import {Reservation,Room,User,Room_Type} from "./model.mjs"
import faker from 'faker' 
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

// async function getRooms(data){
//     try {
        
//         const rooms = await user.getBooks({ raw: true }); //με raw επιστρέφεται το "καθαρό" αντικείμενο (ο πίνακας) χωρίς πληροφορίες που αφορούν τη sequelize  
//         return rooms
//     } catch (error) {
//         throw error
//     }
// }

// Function to generate random data for users
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
      users.push(user);
    }
    return users;
  }

 

  function generateRoomTypes() {
    const roomTypes = [];
    const Typenames=['Single Room','Double Room','Triple Room','Deluxe Suite']
    const prices = [50,80,150,200]
    const cap = [1,2,3,2]

    console.log("before")
    for (let i = 0; i < Typenames.length; i++) {
        console.log("I'm in");
        const roomType = {
        typeName: Typenames[i],
        pricePerNight: prices[i],
        capacity: cap[i]
        // Generate other room fields as needed
        }
        roomTypes.push(roomType);
    }
    return roomTypes;
    }


// Function to generate random data for rooms
const unavRooms=[]
function generateRooms(numRooms) {
const rooms = [];
for (let i = 0; i < 2; i++) {
    console.log("rooms!")
    const room = {
    number: 10+i,
    status:"unavailable",
    breakfast: true,
    view: true,
    smoking: false,
    FreeCancelation: true
   
    // Generate other room fields as needed
    }
    console.log("rooms1!")
    rooms.push(room)
    unavRooms.push(room)
}
console.log("rooms1")
for (let i = 0; i < 2; i++) {
    const room = {
    number: 12+i,
    status:"available",
    breakfast: true,
    view: true,
    smoking: false,
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
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
    FreeCancelation: true
    // Generate other room fields as needed
    };
    rooms.push(room);
}

return rooms;
}

function generateBooking(checkInDate,Pmathod) {
  const checkOutDate = faker.date.future();
  if (checkOutDate <= checkInDate) {
    // If checkOutDate is not later than checkInDate, generate a new checkOutDate
    return generateBooking(checkInDate,Pmathod);
  }

  const booking = {
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    total_price: 250,
    paymentMethod: Pmathod,
    UserUserId: faker.random.arrayElement(users).id // Assign a random room
  }
  return booking;
}
  
// Function to generate random data for bookings
function generateBookings(numBookings, users, rooms) {
const bookings = [];


for (let i = 0; i < numBookings-2; i++) {
    const checkInDate = faker.date.future()
    const booking = generateBooking(checkInDate,"card")
    bookings.push(booking)

}

for (let i = numBookings-2; i < numBookings; i++) {
    const checkInDate = faker.date.future()
    const booking = generateBooking(checkInDate,"cash")
    bookings.push(booking)
}
return bookings
}


async function createdata(){   
   console.log("OK2")
    
      try {
        // Generate users
        const numUsers = 3; // Set the desired number of users
        const users = generateUsers(numUsers);
        await User.bulkCreate(users);
        
        console.log("OK3")
        const roomtypes = generateRoomTypes()
        await Room_Type.bulkCreate(roomtypes)
        console.log("OK4")

        // Generate rooms
        const numRooms = 16; // Set the desired number of rooms
        const rooms = generateRooms(numRooms);
        await Room.bulkCreate(rooms);
        console.log("OK5")

        // Generate bookings
        const numBookings = 8; // Set the desired number of bookings
        const bookings = generateBookings(numBookings, users, unavRooms);
        await Reservation.bulkCreate(bookings);
    
        console.log('Dummy data generated successfully!');
      } catch (error) {
        console.error('Error generating dummy data:', error);
      }
    
    
    
}

export {addReservation,createdata}
