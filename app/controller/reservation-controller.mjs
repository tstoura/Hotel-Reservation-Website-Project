import * as Reservation from "../models/reservation-model.mjs"

//MW
const addReservation = async (req,res,next)=>{
    try {
        await Reservation.addReservation({
            "check_in_date": req.body["check-in-date"],
            "check_out_date": req.body["check-out-date"],
            "total_price": parseInt(req.body["total_price"]),
            "room_count": parseInt(req.body["room_count"]),
            "guests_count": parseInt(req.body["guests_count"]),
            "date": req.body["date"],
            "status": req.body["status"],
            "paymentMethod": req.body["paymentMethod"]
        })
        next()
    }
    catch (error) {
        next(error) //αν έγινε σφάλμα, με το next(error) θα κληθεί το middleware με τις παραμέτρους (error, req, res, next)
    }
}

export {addReservation}
