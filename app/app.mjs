import 'dotenv/config'
// const dotenv = require('dotenv'); 
// dotenv.config(); 
import express from 'express'
import { engine } from 'express-handlebars'
import {router} from './routes.mjs'

import session from 'express-session'
import createMemoryStore from 'memorystore'

// const MemoryStore = createMemoryStore(session)

// const HotelResSession = session({
//     secret: process.env.SESSION_SECRET,
//     store: new MemoryStore({ checkPeriod: 86400 * 1000 }),
//     resave: false,
//     saveUninitialized: false,
//     name: "HotelRes-sid", // an den to orisoume connect.sid = onoma sto cookie wste na isxuei gia auth thn efarmogh tou hostname
//     cookie: {
//         maxAge: 1000 * 60 * 20 // 20 λεπτά
//     }
// })

const app = express()
const PORT = process.env.PORT || 3000

// //sessions
// app.use(HotelResSession) //elegxei an ka8e eiserxomeno aithma sthn efarmogh sunodeuetai apo cookie me sid pou exei ekdo8ei apo authn thn efarmhogh - sugkish me secret

//handlebars
app.use(express.urlencoded({extended:false}))
app.engine(".hbs", engine({extname:".hbs"}))
app.set("view engine",".hbs")

//middleware & static files
app.use('/public', express.static('./public'))

//Diaxeiristes aithmatwn
app.use("/",router)

//oti aithma ki an er8ei epistrifh sthn selida /
// app.use((req, res) => {
//     res.redirect('/')
// }
// );

// app.use((err, req, res, next) => {
//     console.log("error occured: " + err.message)
//     next(err)
// })

// app.use((err, req, res, next) => {
//     console.log(err.stack)
//     res.render("error", { message: err.message })
// })

// 404 page //prpei na nai sto telos
// app.use((req,res)=>{
//     res.status(404).render('404',{title:'404'})
// })

app.listen(PORT, console.log(`Server started on port ${PORT}`))
