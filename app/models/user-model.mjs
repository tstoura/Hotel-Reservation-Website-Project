import {User} from "./model.mjs"
import bcrypt from "bcrypt"

// async function addUser(newUser){

//     try{
//         const user  = await User.create(newUser)
//         console.log("User registered:", user.toJSON())
//     }catch (error) {
//         throw error
//     }
// }


async function addUser(newUser){
    try{

        if (! newUser.username || ! newUser.password)  
        throw new Error("Missing username or password")

    const user = await User.findOne({ where: { username: newUser.username} })
    
    if (user)
        throw new Error("The user already exists")
    const hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash
    console.log(newUser)
    await User.create(newUser)
    return true
    } catch(error){
        throw error
    }
      
}

async function login(username,password){
    try {
        console.log(username, password)
        if (!username || !password)
            throw new Error("Missing username or password")

        let user = await User.findOne({ where: { username: username } })
        
        if (!user){
            throw new Error("User " + username + "doesn't exist")
        }
        const match = await bcrypt.compare(password, user.password)

        if (match){
            return user
        }
        else{
            throw new Error("Wrong credentials")
        }
       
    } catch (error) {
        throw error
    }
}

export {addUser,login}