//synarthseis tou senariou reservation
import {Reservation,Room,User,Room_Type, Review} from "./model.mjs"
import faker from 'faker' 
import {Op, Model, DataTypes} from 'sequelize'

async function addReservation(newReservation){
    console.log(newReservation);
    console.log(newReservation.check_in_date)
    try{
        const createdReservation  = await Reservation.create(newReservation)
        console.log("Reservation created:", createdReservation.toJSON())
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

            }
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

            }
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

            }
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

            }
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

      // const availableRooms = await Room_Type.findAll({
      //   include: [
      //     {
      //       model: Room,
      //       attributes:['roomID'],
      //       include: [
      //         {
      //           model: Reservation,
      //           where: {
      //             [Op.or]: [
      //               {
      //                 check_in_date: {
      //                   [Op.gt]: data.dateOut, 
      //                 },
      //               },
      //               {
      //                 check_out_date: {
      //                   [Op.lt]: data.dateIn, 
      //                 },
      //               },
      //             ],
      //           },
      //           required: false, 
      //         },
      //       ],
      //     },
      //   ],
      //   raw: true,
      // })

      // console.log("MODEL: ", availableRooms[0])      
      // return availableRooms

      // let singleCount = 0
      // const availableRoomCounts = availableRooms.map((roomType) => ({        
      //   roomTypeID: roomType.roomTypeID,
      //   typeName: roomType.typeName,
      //   availableCount: roomType.Rooms.length,
      // }))
      
      // console.log("MODEL: ", availableRoomCounts[0])      
      // return availableRoomCounts
      
    
      
    } catch (error) {
        // throw error
        console.error('Error:', error);
        console.error('Error stack:', error.stack)
  }
}

async function selectRooms(){
  
  try{
    const singleRooms = await Room.findAll({
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

        }
    }

    ],
    raw: true
  })
        
  const doubleRooms = await Room.findAll({
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

        }
    }

    ],
    raw: true
  })
  
  const tripleRooms = await Room.findAll({
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

        }
    }

    ],        
    raw: true
  })
  
  const deluxeRooms = await Room.findAll({
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

        }
    }

    ],        
    raw: true
  })

  const availableRooms = {
    single: singleRooms,
    double: doubleRooms,
    triple: tripleRooms,
    deluxe: deluxeRooms
  }



}catch (error) {
  // throw error
  console.error('Error:', error);
  console.error('Error stack:', error.stack)
}
  
}

export {addReservation,checkAvailability,getRoomTypes}
