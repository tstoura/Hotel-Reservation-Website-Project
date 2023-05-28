import {User, Reservation, ReservationRoom} from "./model.mjs"
import bcrypt from "bcrypt"

//kaleitai apo thn register:  elegxoume an uparxei hdh to username  -> munhma error xrhsimopoieitai hdh 
//                            elegxoume an uparxei hdh to email  -> munhma error xrhsimopoieitai hdh  
//                            alliws create user
async function addUser(newUser){
    try{
        if (! newUser.username || ! newUser.password)  
        throw new Error("Missing username or password")

    const user = await User.findOne({ where: { username: newUser.username} })
    
    if (user)
        throw new Error("The user already exists")
    const hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash

    await User.create(newUser)
    return true
    } catch(error){
        throw error
    }
      
}

async function login(username,password){
    
        if (!username || !password)
            throw new Error("Missing username or password")
        
        let user = await User.findOne({ where: { username: username } })
  
        if (!user){

            throw new Error("User " + username + " doesn't exist")
        }
        const match = await bcrypt.compare(password, user.password)

        if (match){
            return user
        }
        else{
            throw new Error("Wrong credentials")
        }
}

async function getUser(newUser){
    try {        
        
        let user = await User.findOne({ where: { email: newUser.email } })
        if (user)
        return user
        else{
            user = await User.create(newUser)
            return user
        }
            
    } catch (error) {
        throw error
    }
}
async function getUserbyUserName(username){
    try {        
        const user = await User.findOne({where: {username : username}})
            return user
        }
        catch (error) {
            throw error
        }
}

async function getUserInfo(username){
    try{
        const user = await User.findAll({
        where: { username: username },
        raw: true
    })
        return user
    }catch (error) {
        throw error
    }
} 

async function userBookings(userID){

    try{
        const bookings = await Reservation.findAll({
        where: {UserUserID: userID},
        raw:true
    })
        return bookings
    }catch (error) {
        throw error
    }
}

async function updateStatus(bookingID){
    try{
        await Reservation.update(
            {status:"cancelled"},
            {where:{reservationID: bookingID}})
        
    }catch (error) {
        throw error
    }
}

async function unbookRooms(bookingID){
    try{
        await ReservationRoom.destroy(
            { where: { ReservationReservationID: bookingID } }
          )
    }catch (error) {
        throw error
    }
}

export {addUser, login, getUser, getUserbyUserName, userBookings, getUserInfo, updateStatus, unbookRooms}