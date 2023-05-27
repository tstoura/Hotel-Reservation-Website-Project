import { Review, Reservation, Room, Room_Type, User, ReservationRoom} from "./models/model.mjs";
import { sequelize, connectDB } from "./models/db-config.mjs";

connectDB(sequelize)

//drop tables 

await Review.drop();
console.log("Review table dropped!")

await ReservationRoom.drop();
console.log("Reservation table dropped!")

await Reservation.drop();
console.log("Reservation table dropped!")

await Room.drop();
console.log("Room table dropped!")

await Room_Type.drop();
console.log("Room_Type table dropped!")

await User.drop();
console.log("User table dropped!")

// await sequelize.sync({alter:true})