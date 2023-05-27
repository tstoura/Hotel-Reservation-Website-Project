import * as User from '../models/user-model.mjs' // version 3 with ORM sequelize, postgress
// import * as seqObj from '../models/model.mjs'
// import faker from 'faker'
import {Op, Model, DataTypes} from 'sequelize'

const doLogin = async (req, res, next) => {

    //έλεγχος εγκυρότητας οκ
    const user = await User.login(req.body.username, req.body.password)
    // if(user){
    //     req.session.username = req.body.username
    //     req.locals.username = req.session.username
    // }
    next()

}

const doRegister = async (req, res, next) => {

    try {
        await User.addUser({
            "username": req.body["username"],
            "password": req.body["password"],
            "firstName":req.body["firstName"],
            "lastName":req.body["lastName"],
            "email": req.body["email"],
            "phone_number": req.body['phone'],
            "role": "member"
        })
        next()
    } catch (error) {
        next(error)
    }
}


const doLogout = (req, res, next) => {
    req.session.destroy() //καταστρέφουμε τη συνεδρία στο session store
    next()
}

function checkIfAuthenticated(req, res, next) {
    if (req.session.username) { //αν έχει τεθεί η μεταβλητή στο session store θεωρούμε πως ο χρήστης είναι συνδεδεμένος
        res.locals.username = req.session.username
    }
    // console.log(req.session)
    next() //επόμενο middleware
}


async function userGetInfo(req, res, next){

    const info = await User.getUserInfo(req.session.username)
    console.log("Info:",info)
    res.locals.email = info[0].email
    res.locals.phone_number = info[0].phone_number
    req.session.userID = info[0].userID
    next()

}

async function userShowBookings(req,res,next){
    
    const bookings = await User.userBookings(req.session.userID)
    console.log("bookings:",bookings)
    res.locals.bookings = bookings
    next()
}

export { doRegister, doLogin, checkIfAuthenticated, doLogout, userShowBookings, userGetInfo}