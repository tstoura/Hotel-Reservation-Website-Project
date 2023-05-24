import express from 'express'
// import {BookList} from './booklist.mjs'
import * as ResController from './controller/reservation-controller.mjs'
import * as UserController from './controller/user-controller.mjs'
import * as AdminController from './controller/admin-controller.mjs'

const router = express.Router()

router.get("/",(req, res) => {
    res.redirect("/home")
})

router.get("/home",(req, res)=>{
    res.render("home")
})

//register-login
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
        if(req.body.username == 'admin' && req.body.password == 'admin'){
            res.render("admin", {username: req.body.username})
        }
        else{
            res.render("home",{username: req.body.username})
        }
    }
)


router.get("/logout", (req, res) => {
    res.render("home")
})

// router.get("/logout", UserController.doLogout, (req, res) => {
//     // req.session.destroy() //καταστρέφουμε τη συνεδρία στο session store
//     res.redirect("/")
// })

//reservation scenario
router.get("/bookNow", (req, res) => {
    res.render("bookingForm")
})

// router.post("/bookNow",ResController.addReservation,(req, res) => {//   
//     res.redirect("/")})
// router.post("/bookNow",(req, res) => {   
//     console.log("data: ", req.body.check_in_date,req.body.check_out_date,req.body.guests_count) 
//     res.render("selectRoom", {
//         check_in_date: req.body.check_in_date,
//         check_out_date: req.body.check_out_date,
//         guests: req.body.guests_count
//     })
// })

//for NOT WORKING //den pairnei tis times
router.get("/doSelectRoom",ResController.createDB,ResController.availableRooms)

//NOT WORKING
// router.get("/doSelectRoom", (req, res) => {
//     console.log(req.query.check_in_date, req.query.check_out_date, req.query.guests_count);
//     res.render("selectRoom",{check_in_date: req.query.check_in_date,
//         check_out_date: req.query.check_out_date,
//         guests: req.query.guests_count})
// })
// router.get("/selectRoom", (req, res) => {
// });

router.get("/bookRoom",(req,res)=>{
    const RoomID = req.query.roomID
    console.log("RoomID: ", RoomID)
    //ektos tou roomID pernaw kai to posa dwmatia (input sthn sel selectRoom)
    res.render("userDataBooking",{selectedID:RoomID})
})

router.post("/doCompleteBooking", (req,res)=>{
    const roomID = req.body.selectedID
    console.log("roomID: ", roomID,"userInfo: ",req.body.firstName," " ,req.body.lastName," " ,req.body.email," " ,req.body.phone," " ,req.body.paymentMethod)
    //den briskei to roomID. akoma prepei na perasw check_in/check_out)
    //kai pernaw ta dedomena tou xrhsth->kalw synarthsh pou pairnei ta stoixeia apo prin
    //(plhrof room apo to id kai posa dwmatia +stoixeia xrhsth +ypologismoi tot price kai kanei eggrafh sto Reservation)
    // res.render("/completeBoooking",{roomID:roomID})
    res.render("doCompleteBooking",{})
})

router.get("/userDataBooking")

// router.get("/selectRoom",ResController.availableRooms)

//admin!

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