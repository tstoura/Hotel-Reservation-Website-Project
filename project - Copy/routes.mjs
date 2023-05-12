import express from 'express'
// import {BookList} from './booklist.mjs'
import * as ResController from './controller/reservation-controller.mjs'
import * as UserController from './controller/user-controller.mjs'

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
        res.render("home",{username: req.body.username})
    }
)

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

router.get("/doSelectRoom",ResController.createDB,ResController.availableRooms)

router.get("/bookRoom",(req,res)=>{
    const RoomID = req.query.roomID
    console.log("RoomID: ", RoomID)
    //ektos tou roomID pernaw kai to posa dwmatia (input sthn sel selectRoom)
    res.render("userDataBooking",{selectedID:RoomID})
})

router.post("/doCompleteBooking", (req,res)=>{
    //ektos tou roomID pernaw kai to posa dwmatia (input sthn sel selectRoom)
    //kai pernaw ta dedomena tou xrhsth->kalw synarthsh pou pairnei ta stoixeia apo prin
    //(plhrof room apo to id kai posa dwmatia +stoixeia xrhsth +ypologismoi tot price kai kanei eggrafh sto Reservation)
    // res.render("/completeBoooking",{roomID:roomID})
})

// router.get("/selectRoom",ResController.availableRooms)


export {router}