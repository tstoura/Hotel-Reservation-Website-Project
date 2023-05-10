import * as Reservation from "../models/reservation-model.mjs"

const createDB = async(req,res,next)=>{
    Reservation.createdata()
    
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
        next(error) //αν έγινε σφάλμα, με το next(error) θα κληθεί το middleware με τις παραμέτρους (error, req, res, next)
    }
}

const availableRooms = async (req,res,next)=>{
    // try{
    //     const desiredData={
    //         desired_dateIn : req.query.check_in_date,
    //         desired_dateOut : req.query.check_out_date,
    //         guests: req.query.guests
    //     }
    //     const rooms = await getRooms(desiredData)
    //     next()
    // }
    // catch (error) {
    //     next(error) //αν έγινε σφάλμα, με το next(error) θα κληθεί το middleware με τις παραμέτρους (error, req, res, next)
    // }
    console.log("ok")
   const roomsTest="test"
    res.render("selectRoom", {
        check_in_date: req.query.check_in_date,
        check_out_date: req.query.check_out_date,
        guests: req.query.guests_count,
        rooms:roomsTest
    })
    
    // try {
    //     const myBooks = await BookList.loadBooks(req.session.username)
    //     res.render("booklist", { books: myBooks })
    // } catch (error) {
    //     next(error)
    // }
}

export {addReservation, availableRooms,createDB}
