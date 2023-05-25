import express from 'express'
import * as ResController from './controller/reservation-controller.mjs'
import * as UserController from './controller/user-controller.mjs'
//admin
import * as AdminController from './controller/admin-controller.mjs'

import {createdata} from "./models/data.mjs"
const router = express.Router()

router.get("/",(req, res) => {
    createdata()
    res.redirect("/home")
})

//------------Nav-Bar links------------//
router.get("/home",(req, res)=>{
    res.render("home")
})

router.get("/roomsGalery",(req, res)=>{
    res.render("roomsGalery")
})

router.get("/services",(req, res)=>{
    res.render("services")
})

router.get("/reviews",(req, res)=>{
    res.render("reviews")
})

//------------register-login------------//
router.get("/register", (req, res) => {
    res.render("registrationForm")
})

router.post("/doregister",
    UserController.doRegister,
    (req, res) => {
        res.redirect("/home")}
)

router.get("/login", (req, res) => {
    res.render("loginForm")
})

router.post("/dologin",
    UserController.doLogin,
    (req, res) => {
        res.render("home",{username: req.body.username})
    }
)

router.get("/logout", UserController.doLogout, (req, res) => {
    // req.session.destroy() //καταστρέφουμε τη συνεδρία στο session store
    res.redirect("/")
})

//------------------------------------------//
// router.post("/dologin",
//     UserController.doLogin,
//     (req, res) => {
//         if(req.body.username == 'admin' && req.body.password == 'admin'){
//             res.render("admin", {username: req.body.username})
//         }
//         else{
//             res.render("home",{username: req.body.username})
//         }
//     }
// )

//proswrino
// router.get("/logout", (req, res) => {
//     res.render("home")
// })


//------------doReservation------------//
router.get("/bookNow", (req, res) => {
    res.render("bookingForm")
})

router.get("/doCheckAvailability",ResController.availableRooms)

router.get("/doBookRoom",(req,res)=>{
    const typeRoomID = req.query.roomTypeID
    const check_in_date = req.query.check_in_date
    const check_out_date = req.query.check_out_date
    const guests = req.query.guests
    const rooms = req.query.rooms_count
    const totalPrice = req.query.totalPrice
    // console.log("check_in_date klp: ",check_in_date,check_out_date,guests)
    console.log("query: ",req.query)
    res.render("userDataBooking",
    {selectedID:typeRoomID,
    check_in_date:check_in_date,
    check_out_date:check_out_date,
    guests:guests,
    roomsNum:rooms,
    totalPrice: totalPrice})
})

router.post("/doCompleteBooking", (req,res)=>{
    const roomID = req.body.selectedID
    console.log("roomID: ", roomID ,"userInfo: ",req.body.firstName," " ,req.body.lastName," " ,req.body.email," " ,req.body.phone," " ,req.body.paymentMethod)
    //den briskei to roomID. akoma prepei na perasw check_in/check_out)
    //kai pernaw ta dedomena tou xrhsth->kalw synarthsh pou pairnei ta stoixeia apo prin
    //(plhrof room apo to id kai posa dwmatia +stoixeia xrhsth +ypologismoi tot price kai kanei eggrafh sto Reservation)
    // res.render("/completeBoooking",{roomID:roomID})
})


//------------Admin------------//
router.get("/adminShowUsers", AdminController.findAllUsers, 
    (req,res) => {
    res.render("adminShowUsers", {users: req.users})
    // console.log(req.users)
})

router.get("/adminShowBookings", AdminController.findAllBookings, 
    (req,res) => {
    res.render("adminShowBookings", {bookings: req.bookings})
    // console.log(req.bookings)
})

router.get("/adminAddBooking", (req, res) => {
    res.render("adminAddBooking")
})

router.post("/adminDoAddBooking", 
    AdminController.adminDoAddBooking,
    (req, res) => {
        res.render("adminResTemplate", {message: req.message})
    }
)
router.post("/adminDeleteBooking", AdminController.adminDeleteBooking,
//     AdminController.findAllBookings, 
//     (req,res) => {
//     res.render("showBookings", {bookings: req.bookings})
//     console.log(req.bookings)
// }
)

router.get("/adminDeleteBooking", (req, res) => {
    AdminController.findAllBookings, 
    (req,res) => {
    res.render("showBookings", {bookings: req.bookings})
    console.log(req.bookings)
}
    // res.render("adminDeleteBooking")
})


export {router}