import * as Admin from '../models/admin-model.mjs' // version 3 with ORM sequelize, postgress
import * as seqObj from '../models/model.mjs'


const findAllUsers = async (req, res, next) => {
    const users = await seqObj.User.findAll()
    const sanitized_users = users.map( entry => entry.dataValues)
    req.users = sanitized_users
    next()
}

const adminDoAddUser = async (req, res, next) => {
    try{
        console.log(req.body)

        await Admin.addUser({
            // "userID": req.body["userID"],
            "firstName": req.body["firstName"],
            "lastName": req.body["lastName"],
            "email":req.body["email"],
            "address": req.body["address"],
            "phone_number": req.body["phone_number"],
        })
        console.log("perase")
        res.locals.message = 'User Added!'
        // req.message = 'User Added!'
        next()
    } catch(error){
            res.locals.message = 'Failed to add User'
        // req.message = 'Failed to add User!'
    }
}

const adminDeleteUser = async(req, res, next) => {
    try{

        await Admin.deleteUser(req.query["userID"])
        req.message = 'User successfully deleted!'
        next()
    } catch(error){
        req.message = 'Failed to delete user!'

    }
}

const findAllBookings = async (req, res, next) => {
    const bookings = await Admin.showReservations()
    req.bookings = bookings
    next()
}

const adminDoAddBooking = async (req, res, next) => {
    try {
        await Admin.addReservation({
            "check_in_date": req.body["check_in_date"],
            "check_out_date": req.body["check_out_date"],
            "total_price": req.body["total_price"],
            "guests_count": req.body["guests_count"],
            "status": "completed",
            "paymentMethod": req.body["paymentMethod"],
            "UserUserID": req.body["userID"],
            "RoomRoomID":req.body["roomID"]
        })
        req.message = 'Booking Added!'
        next()
    } catch(error){
       
        // throw error
        req.message = 'Failed to add Booking!'
        next()
    }
}

const getBookingInfo = async (req, res, next) => {
    try{
        const reservationID = req.query.reservationID //pernoume to reservationID sto opoio 
        //o admin thelei na kanei kapoio edit 
        const bookingInfo = await Admin.findReservation(reservationID) //dinoume to reservationID gia na vroume 
        //ta upoloipa stoixeia tis kratisis kai to roomID sto opoio anaferetai 
        console.log("Booking Info after findReservation:", bookingInfo)

        const resInfo = {
            reservationID: bookingInfo.resInfo.reservationID,
            check_in_date: bookingInfo.resInfo.check_in_date,
            check_out_date: bookingInfo.resInfo.check_out_date,
            total_price: bookingInfo.resInfo.total_price,
            guests_count: bookingInfo.resInfo.guests_count,
            paymentMethod: bookingInfo.resInfo.paymentMethod,
            userID: bookingInfo.resInfo.UserUserID,
            roomID: bookingInfo.roomID
        }
        console.log("resInfo:",resInfo)
        req.bookingInfo = resInfo
        // return req.bookingInfo
        next()
    }catch(error){
        // req.message = 'Error'
        next(error)
    }
}

const adminDeleteBooking = async (req, res, next) => {
    try {
      const reservationID = req.query.reservationID;
      await Admin.deleteReservation(reservationID);
      req.message = 'Booking successfully deleted!';
      next();
    } catch (error) {
      req.message = 'Failed to delete booking!';
      next();
    }
  };
  
const adminDoEditBooking = async (req, res, next) =>{
    try {
        // console.log(req.query.reservationID)
     
        await Admin.updateReservation({
            "reservationID": req.query.reservationID,
            "check_in_date": req.body["check_in_date"],
            "check_out_date": req.body["check_out_date"],
            "total_price": req.body["total_price"],
            "guests_count": req.body["guests_count"],
            "paymentMethod": req.body["paymentMethod"],
            "UserUserID": req.body["userID"],
            "RoomRoomID":req.body["roomID"]
        })
    
        req.message = 'Booking Updated!'
        next()
    } catch(error){
       
        // throw error
        req.message = 'Failed to update Booking!'
        next()
    }
}

const checkIfAuthenticatedAdmin = async(req, res, next) => { //dinoume access ston admin gia tis selides tou
    
    if(req.session.username == 'admin'){
        next()
    }
    else{
        res.render("error", {message: "Wrong Credentials, access denied!"})
    }
}

//Rooms 

const findAllRooms = async(req, res, next) => {
    const rooms = await Admin.showRooms()
    req.rooms = rooms
    next()
}

async function getStatistics(req,res,next){
    try{
        const bookedRooms  = await Admin.getRooms() 

        // console.log("bookedRooms: ", bookedRooms)
        res.render("admin",{rooms:JSON.stringify(bookedRooms)})

    }catch(error){        
        next()
    }
}

export{findAllUsers, adminDoAddUser, adminDeleteUser, findAllBookings, adminDoAddBooking, getBookingInfo, adminDeleteBooking, adminDoEditBooking, checkIfAuthenticatedAdmin, findAllRooms, getStatistics}