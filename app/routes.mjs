import express from 'express'
// import * as Validator from '../validator/validation.mjs'
import * as ResController from './controller/reservation-controller.mjs'
import * as UserController from './controller/user-controller.mjs'
import * as AdminController from './controller/admin-controller.mjs'
import {createdata} from "./models/data.mjs"

const router = express.Router()

createdata()

router.get("/",(req, res) => {
    UserController.checkIfAuthenticated,
    res.redirect("/home")
})

//------------Nav-Bar links------------//
router.get("/home", UserController.checkIfAuthenticated,
    (req, res)=>{
    res.render("home")
})

router.get("/roomsGallery",
    UserController.checkIfAuthenticated,
    (req, res)=>{
    res.render("roomsGallery")
})

router.get("/services",
    UserController.checkIfAuthenticated,
    (req, res)=>{
    res.render("services")
})

router.get("/reviews",
    UserController.checkIfAuthenticated,
    (req, res)=>{
    res.render("reviews")
})

//------------register-login------------//
router.get("/register", (req, res) => {
    res.render("registrationForm")
})

router.post("/doregister",
    UserController.doRegister,
    (req, res) => {
        req.session.username = req.body.username
        res.locals.username = req.session.username
        res.render("home")}
)

router.get("/login", (req, res) => {
    res.render("loginForm")
})

router.post("/dologin",
    UserController.doLogin,
    (req, res) => {
        req.session.username = req.body.username
        res.locals.username = req.session.username
        if(req.session.username === 'admin'){
            res.redirect("/admin")
        }
        res.render("home")
    }
)

router.get("/logout", UserController.doLogout, 
    (req, res) => {
    res.redirect("/")
})


//------------------------------------------//


//------------doReservation------------//
router.get("/bookNow", (req, res) => {
    res.render("bookingForm")
})

router.get("/doCheckAvailability", 
UserController.checkIfAuthenticated,
ResController.availableRooms)


router.get("/doBookRoom",
    UserController.checkIfAuthenticated,
    (req, res) => {
    const roomTypeID = req.query.roomTypeID
    const checkInDate = req.query.check_in_date
    const checkOutDate = req.query.check_out_date
    const guests = req.query.guests
    const roomsCountArray = req.query.roomsCount
    const priceForOneArray = req.query.price
    

    let roomsCount = 0
    let totalPrice = 0
    if( roomsCountArray.length > 1 ){
        for (let i=0;i<roomsCountArray.length;i++){
        roomsCount+=parseInt(roomsCountArray[i])
        totalPrice+=parseInt(roomsCountArray[i]*priceForOneArray[i])
        }
    }
    else{
        roomsCount = roomsCountArray
        totalPrice = priceForOneArray  
    }

    res.render("userDataBooking", {
        selectedID: roomTypeID,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        rooms: roomsCount,
        totalPrice: totalPrice,
        roomsCountArray: roomsCountArray,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        phone_number: req.query.phone_number,
        email: req.query.email
      })
  })


router.post("/doCompleteBooking", 
    UserController.checkIfAuthenticated,
    ResController.doAddReservation,(req,res)=>{
    res.render("completeBooking", {message: "Your reservation successfully completed. Thanks for your preference!"})
})


router.get("/cancel",
    UserController.checkIfAuthenticated,
    UserController.cancelReservation,
    UserController.removeRooms,
    UserController.userGetInfo,
    UserController.userShowBookings,
        (req,res, next) => {
        const bookingID = req.query.bookingID
})

//----------Admin----------//
//show, add & delete users (add not completed)

router.get("/admin", 
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.getStatistics
)

router.get("/profile",
    UserController.checkIfAuthenticated,
    (req,res, next) => {
        if(req.session.username == "admin"){
            res.redirect("/admin")
        }
    next()},
    UserController.userGetInfo,
    UserController.userShowBookings,
    (req, res) => {
        res.render("userProfile")
    }
)

router.get("/adminShowUsers", 
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,  
    AdminController.findAllUsers, 
    (req,res) => {
    res.render("adminShowUsers", {users: req.users})
})

router.get("/adminAddUser", (req, res) => {
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    res.render("adminAddUser")
})

router.post("/adminDoAddUser",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.adminDoAddUser,
    AdminController.findAllUsers,
    (req, res) => {
        console.log(req.body),
        res.render("adminShowUsers", { message: req.message, users: req.users })
    }
)

router.get("/adminDeleteUser",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.adminDeleteUser,
    AdminController.findAllUsers, 
    (req,res) => {
    res.render("adminShowUsers", { users: req.users })
})

//show, add & delete bookings
router.get("/adminShowBookings",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.findAllBookings, 
    (req,res) => {
    res.render("adminShowBookings", { bookings: req.bookings })
})

router.get("/adminAddBooking", (req, res) => {
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    res.render("adminAddBooking")
})

router.post("/adminDoAddBooking",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.adminDoAddBooking,
    AdminController.findAllBookings,
    (req, res) => {
        res.render("adminShowBookings",{ message:req.message, bookings: req.bookings })
    }
)

router.get("/adminDeleteBooking",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.adminDeleteBooking,
    AdminController.findAllBookings, 
    (req,res) => {
    res.render("adminShowBookings", { bookings: req.bookings })
})

router.get("/adminEditBooking",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.getBookingInfo,
    (req, res) => {
        res.render("adminEditBooking", { bookingInfo: req.bookingInfo })
    }
)

router.post("/adminDoEditBooking",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.adminDoEditBooking,
    AdminController.findAllBookings,
    (req, res) => {
        res.render("adminShowBookings", { bookings: req.bookings })
    }
)


router.get("/adminShowRooms",
    UserController.checkIfAuthenticated,
    AdminController.checkIfAuthenticatedAdmin,
    AdminController.findAllRooms,
    (req, res) => {
        res.render("adminShowRooms", { rooms: req.rooms })
    }
)


export {router}