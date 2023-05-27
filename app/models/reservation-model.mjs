//synarthseis tou senariou reservation
import {Reservation,Room,User,Room_Type, Review,ReservationRoom} from "./model.mjs"
import {Op, Model, DataTypes} from 'sequelize'

async function addReservation(newReservation){
    console.log(newReservation);
    console.log(newReservation.check_in_date)
    try{
        const createdReservation  = await Reservation.create(newReservation)
        console.log("Reservation created:", createdReservation.toJSON())
        return createdReservation
    }catch (error) {
        throw error
    }
}

async function getRoomTypes(){

  try {
    const roomTypes = await Room_Type.findAll({raw: true})
    
    return roomTypes
  } catch (error) {
      throw error
}
}

async function checkAvailability(data){

    try { 
      const singleCount = await Room.count({
        include:[
          {model:Room_Type,
            attributes:['roomTypeID','capacity','pricePerNight','typeName'],
            where:{capacity:1},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
      })

            
      const doubleCount = await Room.count({
        include:[
          {model:Room_Type,
          attributes:['roomTypeID','capacity','pricePerNight','typeName'],
          where:{typeName:'Double Room'},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
      })
      
      const tripleCount = await Room.count({
        include:[
          {model:Room_Type,
            attributes:['roomTypeID','capacity','pricePerNight','typeName'],
            where:{capacity:3},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
      })
      
      const deluxeCount = await Room.count({
        include:[
          {model:Room_Type,
            attributes:['roomTypeID','capacity','pricePerNight','typeName'],
            where:{typeName:'Deluxe Suite'},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
      })

      const availableRoomsCount = {
        single: singleCount,
        double: doubleCount,
        triple: tripleCount,
        deluxe: deluxeCount
      }

      return availableRoomsCount   
      
    } catch (error) {
        // throw error
        console.error('Error:', error);
        console.error('Error stack:', error.stack)
  }
}

async function selectRooms(roomTypesID,roomsCount,data){
  try { 
    const roomTypesArray = roomTypesID.split(',').map(Number)
    const roomsCountArray = roomsCount.split(',').map(Number)
    console.log(roomTypesID)
    
    let singleRooms = []
    let doubleRooms = []
    let tripleRooms = []
    let deluxeRooms = []


    if(roomTypesArray.includes(1)){

      singleRooms = await Room.findAll({
          include:[
          {model:Room_Type,
            attributes:['roomTypeID','capacity','pricePerNight','typeName'],
            where:{capacity:1},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
      })
      const index = roomTypesArray.indexOf(1)
      singleRooms = singleRooms.slice(0, roomsCountArray[index])
    }
      
    if(roomTypesArray.includes(2)){
      doubleRooms = await Room.findAll({
      include:[
        {model:Room_Type,
        attributes:['roomTypeID','capacity','pricePerNight','typeName'],
        where:{typeName:'Double Room'},
        },
        {
          model: Reservation,
          attributes:['check_in_date','check_out_date'],
          where:{
            [Op.or]: [
              {
                [Op.and]: [
                  { check_in_date: { [Op.gt]: data.dateIn } },
                  { check_in_date: { [Op.gt]: data.dateOut } }
                ]
              },
              { check_out_date: { [Op.lte]: data.dateIn } }
            ]

          },
          through: {
            model: ReservationRoom,
          },
        }

      ],
      raw: true
      })
      const index = roomTypesArray.indexOf(2)
      doubleRooms = doubleRooms.slice(0, roomsCountArray[index])
    }    

  if(roomTypesArray.includes(3)){
    tripleRooms = await Room.findAll({
    include:[
      {model:Room_Type,
        attributes:['roomTypeID','capacity','pricePerNight','typeName'],
        where:{capacity:3},
      },
      {
        model: Reservation,
        attributes:['check_in_date','check_out_date'],
        where:{
          [Op.or]: [
            {
              [Op.and]: [
                { check_in_date: { [Op.gt]: data.dateIn } },
                { check_in_date: { [Op.gt]: data.dateOut } }
              ]
            },
            { check_out_date: { [Op.lte]: data.dateIn } }
          ]

        },
        through: {
          model: ReservationRoom,
        },
      }

    ],
    raw: true
    })
    const index = roomTypesArray.indexOf(3)
    tripleRooms = tripleRooms.slice(0, roomsCountArray[index])
  }

  if(roomTypesArray.includes(4)){
    deluxeRooms = await Room.findAll({
        include:[
          {model:Room_Type,
            attributes:['roomTypeID','capacity','pricePerNight','typeName'],
            where:{typeName:'Deluxe Suite'},
          },
          {
            model: Reservation,
            attributes:['check_in_date','check_out_date'],
            where:{
              [Op.or]: [
                {
                  [Op.and]: [
                    { check_in_date: { [Op.gt]: data.dateIn } },
                    { check_in_date: { [Op.gt]: data.dateOut } }
                  ]
                },
                { check_out_date: { [Op.lte]: data.dateIn } }
              ]

            },
            through: {
              model: ReservationRoom,
            },
          }

        ],
        raw: true
    })
    const index = roomTypesArray.indexOf(4)
    deluxeRooms = deluxeRooms.slice(0, roomsCountArray[index])
  }

    const availableRooms = {
      single: singleRooms,
      double: doubleRooms,
      triple: tripleRooms,
      deluxe: deluxeRooms
    }
    console.log("availableRooms: ",availableRooms)

    const roomIDs=[]
     
    for (const roomType in availableRooms) {
      if (availableRooms[roomType].length) {
        for (const room of availableRooms[roomType]) {
          roomIDs.push(room.roomID);
        }
      }
    }
    console.log("RoomIDs: ",roomIDs)
    
    return roomIDs  
    
  } catch (error) {
      // throw error
      console.error('Error:', error);
      console.error('Error stack:', error.stack)
}

}


async function RoomsToReservation(booking,roomIDs){

  for (let id of roomIDs){
    let bookedRoom={
      ReservationReservationID:booking.reservationID,
      RoomRoomID:id
    }
    
    const connect = await ReservationRoom.create(bookedRoom)
    console.log("Created:", connect.toJSON())
  }
}

export {addReservation,checkAvailability,getRoomTypes,selectRooms,RoomsToReservation}