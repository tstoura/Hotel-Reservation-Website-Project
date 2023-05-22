import {User} from "./model.mjs"

async function addUser(newUser){

    try{
        const user  = await User.create(newUser)
        console.log("User registered:", user.toJSON())
    }catch (error) {
        throw error
    }
}

async function login(username,password){
    try {
        if (!username || !password)
            throw new Error("Missing username or password")

        let user = await User.findOne({ where: { username: username } })

        if (!user)
            throw new Error("User " + username + "doesn't exist")
        if(password==user.password){
            return user
        }
        else
            throw new Error("Wrong credentials")
        
        // const match = await bcrypt.compare(password, user.password)
        // if (match)
        //     return user
        // else
        //     throw new Error("Wrong credentials")
    } catch (error) {
        throw error
    }
}

export {addUser,login}