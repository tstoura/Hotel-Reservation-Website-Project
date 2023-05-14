import * as Reservation from "../models/reservation-model.mjs"

const createDB = async(req,res,next)=>{
    Reservation.createdata()
    next()
    
}

const addReservation = async (req,res,next)=>{
    try {
        await Reservation.addReservation({
            "check_in_date": req.body["check_in_date"],
            "check_out_date": req.body["check_out_date"],
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
        next(error) 
    }
}

const availableRooms = async (req,res,next)=>{
    try{
        const desiredData={
            dateIn : req.query.check_in_date,
            dateOut : req.query.check_out_date,
            guests: req.query.guests_count
        }
       
        const Avrooms = await Reservation.getRooms(desiredData)
        
        // console.log("CONTROLLER:", Avrooms)
        // console.log("CONTROLLER:", Avrooms[0])
        const roomsTest="test"
        res.render("selectRoom", {
            check_in_date: req.query.check_in_date,
            check_out_date: req.query.check_out_date,
            guests: req.query.guests_count,
            rooms: Avrooms
    })
        // next()
    }
    catch (error) {
        next(error) 
    }
    
}

export {addReservation, availableRooms,createDB}
