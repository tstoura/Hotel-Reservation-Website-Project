import * as Reservation from "../models/reservation-model.mjs"

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
       
        const roomTypes = await Reservation.getRoomTypes()
        let Avrooms = await Reservation.checkAvailability(desiredData)
        
        // console.log("CONTROLLER-roomType[0]:", roomTypes[0])
        // console.log("CONTROLLER Avrooms.single[0] ",Avrooms.single[0])
        // console.log("CONTROLLER: ", Avrooms[0])

        //number of available rooms of each roomType
        // console.log("CONTROLLER: ", Avrooms)
        const addCountSingle = roomTypes[0]
        const addCountDouble = roomTypes[1]
        const addCountTriple = roomTypes[2]
        const addCountDeluxe = roomTypes[3]

        addCountSingle.roomsCount=Avrooms.single
        addCountDouble.roomsCount=Avrooms.double
        addCountTriple.roomsCount=Avrooms.triple
        addCountDeluxe.roomsCount=Avrooms.deluxe

        if(desiredData.guests<=2){
            addCountTriple.roomsCount=0            
        }
        else{
            addCountSingle.roomsCount=0
        }
        

        //roomTypes and their info
        // console.log("CONTROLLER: ", roomTypes)


        res.render("selectRoom", {
            check_in_date: req.query.check_in_date,
            check_out_date: req.query.check_out_date,
            guests: req.query.guests_count,
            rooms: req.query.rooms_count,
            Avrooms: Avrooms,
            roomTypes: roomTypes 
        })
        
    }
    catch (error) {
        next(error) 
    }
    
}

export {addReservation, availableRooms}
