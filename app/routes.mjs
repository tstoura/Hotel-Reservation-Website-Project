import express from 'express'
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

router.post("/bookNow",ResController.addReservation,(req, res) => {
    //8elei allagh se allh sel (stelnw to /bookNow apo to bookingForm sthn epomenh sel ->get sth sel)
    res.redirect("/")})


export {router}