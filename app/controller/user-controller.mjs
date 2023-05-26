import * as User from '../models/user-model.mjs' // version 3 with ORM sequelize, postgress
// import * as seqObj from '../models/model.mjs'
// import faker from 'faker'
import {Op, Model, DataTypes} from 'sequelize'

const doLogin = async (req, res, next) => {

    //έλεγχος εγκυρότητας οκ
    const user = await User.login(req.body.username, req.body.password)
    // console.log(user)
    next()
    // if (user) {
    //     req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
    //     res.locals.username = req.session.username //τα μέλη του res.locals είναι απευθείας προσβάσιμα στο template
    //     next() //το επόμενο middleware είναι το showBooklist
    // }
    // else {
    //     throw new Error("άγνωστο σφάλμα")
    // }

}

const doRegister = async (req, res, next) => {

    try {
        await User.addUser({
            // "userID": faker.random.uuid(),
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
        next() //επόμενο middleware
    }
    else
        res.redirect("/") //αλλιώς ανακατεύθυνση στην αρχική σελίδα
}

export { doRegister, doLogin, checkIfAuthenticated, doLogout}