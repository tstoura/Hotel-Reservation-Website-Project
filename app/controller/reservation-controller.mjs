import * as Reservation from "../models/reservation-model.mjs"
import * as User from "../models/user-model.mjs"
import * as seqObj from '../models/model.mjs'

const doAddReservation = async (req,res,next)=>{
    try {
        const roomTypesID = req.body.roomTypesID
        const roomsCount = req.body.roomsCount

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone_number: req.body.phone
        }
        
        const user = await User.addUser(userData)
        const userID = user.userID
        
        console.log("user: ", user)
        console.log("UserID: ",userID)
        
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = `${year}-${month}-${day}`

        const booking = await Reservation.addReservation({
            "check_in_date": req.body.check_in_date,
            "check_out_date": req.body.check_out_date,
            "total_price": parseInt(req.body.totalPrice),
            "room_count": parseInt(req.body.rooms),
            "guests_count": parseInt(req.body.guests),
            "date": currentDate,
            "status": "completed",
            "paymentMethod": req.body.paymentMethod,
            UserUserID: userID
        })

        const desiredData={
            dateIn : req.body.check_in_date,
            dateOut : req.body.check_out_date,
            guests: req.body.guests
        }

        const roomIDs = await Reservation.selectRooms(roomTypesID,roomsCount,desiredData)
        await Reservation.RoomsToReservation(booking,roomIDs)
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
        if(req.session.username){ //an o xristis exei logariasmo kai einai sindedemenos
        //pername sto selectRoom kai ta stoixeia tou xrhsth pou xreiazetai h forma, wste na einai automata
        //simplirwmena
        const user = await seqObj.User.findOne({where: {username : req.session.username}})
            res.render("selectRoom", {
                check_in_date: req.query.check_in_date,
                check_out_date: req.query.check_out_date,
                guests: req.query.guests_count,
                rooms: req.query.rooms_count,
                Avrooms: Avrooms,
                roomTypes: roomTypes,
                firstName: user.firstName,
                lastName: user.lastName,
                phone_number: user.phone_number,
                email: user.email
            })
        }
        else{
            res.render("selectRoom", {
                check_in_date: req.query.check_in_date,
                check_out_date: req.query.check_out_date,
                guests: req.query.guests_count,
                rooms: req.query.rooms_count,
                Avrooms: Avrooms,
                roomTypes: roomTypes 
            })
        }
       
        
    }
    catch (error) {
        next(error) 
    }
    
}

export {doAddReservation, availableRooms}