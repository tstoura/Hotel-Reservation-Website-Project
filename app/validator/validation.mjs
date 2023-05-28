import { body, validationResult } from 'express-validator'
import validator from 'validator'

const validateLogin = [
    body("username")
        .trim().escape().isLength({ min: 4 }) // Θα μπορούσαμε να έχουμε και άλλους ελέγχους
        .withMessage("Δώστε όνομα με τουλάχιστον 4 χαρακτήρες"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            next()
        }
        //se periptwsh pou entopisthkan la8h 
        else {
            res.render("./loginForm", { message: errors.mapped() })
        } 
    }
]

const validateNewUser = [
    body("username")
    .trim().escape().isLength({ min: 4 }) // Θα μπορούσαμε να έχουμε και άλλους ελέγχους
    .withMessage("Δώστε όνομα με τουλάχιστον 4 χαρακτήρες"),
    body("password-confirm")
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage('Το συνθηματικό πρέπει να έχει από 4 μέχρι 10 χαρακτήρες')
    .custom((value, { req }) => {
        if (value != req.body.password)
            throw new Error("Το συνθηματικό πρέπει να είναι το ίδιο και στα δύο πεδία")
        else
            return true
    }), 
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            next()
        }
        else {
            res.render("./registrationform", {
                message: errors.mapped()
            })
        }
    }
]

export { validateLogin, validateNewUser }