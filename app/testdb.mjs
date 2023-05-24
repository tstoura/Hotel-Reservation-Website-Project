import { sequelize, connectDB } from "./models/db-config.mjs";
import {Reservation} from "./models/model.mjs"

connectDB(sequelize) 

// await Reservation.create({
//     "check_in_date": '2023-05-29',
//     "check_out_date": '2023-06-02',
//     "total_price": '300',
//     "guests_count": '3',
//     "paymentMethod": 'cash',
//     "UserUserID": '4',
//     "RoomRoomID": '4'
// })

await Reservation.destroy({where: {reservationID : 5}})
