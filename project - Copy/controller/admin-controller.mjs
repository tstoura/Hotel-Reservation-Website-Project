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
            "userID": req.body["userID"],
            "username": "theo",  //prosorino!!
            "password": "1234asd", //prosorino!!
            "firstName": req.body["firstName"],
            "lastName": req.body["lastName"],
            "email":req.body["email"],
            "gender": female, //prosorino!!
            "nationality": "Greek", //prosorino!
            "address": req.body["address"],
            "phone_number": req.body["phone_number"],
            "role": "member",
        })
        console.log("perase")
        req.message = 'User Added!'
        next()
    } catch(error){
        req.message = 'Failed to add User!'
    }
}

const adminDeleteUser = async(req, res, next) => {
    try{
        // await Admin.deleteReservation({
        //     "reservationID": req.body["reservationID"]
        // })
        // console.log(req.body["reservationID"])
        await Admin.deleteUser(req.query["userID"])
        req.message = 'User successfully deleted!'
        next()
    } catch(error){
        req.message = 'Failed to delete user!'

    }
}

const findAllBookings = async (req, res, next) => {
    const bookings = await seqObj.Reservation.findAll()
    const sanitized_bookings = bookings.map( entry => entry.dataValues)
    req.bookings = sanitized_bookings
    next()
}

const adminDoAddBooking = async (req, res, next) => {
    try {
        await Admin.addReservation({
            "check_in_date": req.body["check_in_date"],
            "check_out_date": req.body["check_out_date"],
            "total_price": req.body["total_price"],
            "guests_count": req.body["guests_count"],
            "paymentMethod": req.body["paymentMethod"],
            "UserUserID": req.body["userID"],
            "RoomRoomID": req.body["roomID"]
        })
        req.message = 'Booking Added!'
        next()
    } catch(error){
        req.message = 'Failed to add Booking!'
        next()
    }
}

const adminDeleteBooking = async(req, res, next) => {
    try{
        // await Admin.deleteReservation({
        //     "reservationID": req.body["reservationID"]
        // })
        // console.log(req.body["reservationID"])
        await Admin.deleteReservation(req.query["reservationID"])
        req.message = 'Booking successfully deleted!'
        next()
    } catch(error){
        req.message = 'Failed to delete booking!'

    }
}

export{findAllUsers, adminDoAddUser, adminDeleteUser, findAllBookings, adminDoAddBooking, adminDeleteBooking}