import { sequelize, connectDB } from "./models/db-config.mjs";
import faker from 'faker'
// import { createData } from "./models/reservation-model.mjs"

connectDB(sequelize) 

//initialize pinakes 
import {Op, Model, DataTypes} from 'sequelize'

const User = sequelize.define('User',{
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    firstName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    gender:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    nationality:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    address:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    role:{
        type: DataTypes.TEXT,
        allowNull: false
    }
    
})


const Reservation = sequelize.define('Reservation',{
    reservationID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
    },
    check_in_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    check_out_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    guests_count:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethod:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Review = sequelize.define('Review',{
    reviewID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    rate:{
        type: DataTypes.TEXT
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})

const Room = sequelize.define('Room',{
    roomID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    number:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    breakfast:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    view:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    smoking:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    freeCancelation:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

const Room_Type = sequelize.define('Room_Type',{
    roomTypeID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerNight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    typeName:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})


User.hasMany(Reservation)
Reservation.belongsTo(User)

Reservation.hasMany(Review)
Review.belongsTo(Reservation)

Room_Type.hasMany(Room)
Room.belongsTo(Room_Type)

Room.hasMany(Reservation)
Reservation.belongsTo(Room)

await sequelize.sync({alter:true})

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
const randomUsers = generateUsers(5)
await User.bulkCreate(randomUsers);

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
const roomtypes = generateRoomTypes()
await Room_Type.bulkCreate(roomtypes)

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

// const numRooms = 16;
const roomTypesArray = await Room_Type.findAll();
const rooms = generateRooms(16,roomTypesArray);
await Room.bulkCreate(rooms)


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

// const rooms = Room.findAll()
const bookings = generateBookings(5, randomUsers, rooms)
await Reservation.bulkCreate(bookings)
// console.log("OK4")

// export {User, Room, Room_Type, Review, Reservation}


// createData()


  