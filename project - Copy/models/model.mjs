import {sequelize} from './db-config.mjs';
import {Op, Model, DataTypes} from 'sequelize';

const User = sequelize.define('User',{
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    firstName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    gender:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    nationality:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    address:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    role:{
        type: DataTypes.TEXT,
        allowNull: false
    }
    
})


const Reservation = sequelize.define('Reservation',{
    reservationID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
    },
    check_in_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    check_out_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    total_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    guests_count:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Review = sequelize.define('Review',{
    reviewID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    rate:{
        type: DataTypes.TEXT
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    }
    
})

const Room = sequelize.define('Room',{
    roomID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    number:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    breakfast:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    view:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    smoking:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    FreeCancelation:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

const Room_Type = sequelize.define('Room_Type',{
    roomTypeID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerNight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    typeName:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Review.belongsTo(Reservation)
Reservation.hasMany(Review)

Reservation.belongsTo(User)
User.hasMany(Reservation)
Room.belongsTo(Reservation)
Reservation.hasMany(Room)
Room.belongsTo(Room_Type)
Room_Type.hasMany(Room)


await sequelize.sync({alter:true})
export {User, Room, Room_Type, Review, Reservation}