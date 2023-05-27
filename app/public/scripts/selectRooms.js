function calculateNumberOfNights(checkInDate, checkOutDate) {
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    const firstDate = new Date(checkInDate)
    const secondDate = new Date(checkOutDate)
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    return diffDays
  }

function setPrice(roomType,days){
  
  const priceXdaysDiv = roomType.querySelector("#priceXdays")
  const totalPriceDiv = roomType.querySelector("#totalPrice")  

  const pricePerNight = priceXdaysDiv.getAttribute("value")
  priceXdaysDiv.textContent = "Price for " + days + " days:"
  const totalPrice = days*pricePerNight
  //priceForOne

  //symbolo tou euro?
  totalPriceDiv.setAttribute("value",totalPrice)
  totalPriceDiv.textContent = totalPrice
}

// function createEventListeners(roomType){
//   const roomTypeID = roomType.querySelector(".typeName")
//   const ID = roomTypeID.getAttribute("id") 

//   const roomsDiv = roomType.querySelector("#roomsCount")
//   const addDiv = roomType.querySelector("#addBtn")

//   roomsDiv.setAttribute("id",ID)
//   addDiv.setAttribute("id",ID)
//   //mavalue tou tara ws parametro to incrRooms + parametro tou addRooms to roomTypeID? alla to roomscount dynamiko
//   roomsDiv.addEventListener('click',incrRooms)
//   addDiv.addEventListener('click',addRooms)
// }

// function incrRooms(event){
//   const target = event.target
//   console.log("incrRooms: ",target)
// }

// function addRooms(event){
//   const target = event.target   
//   console.log("addRooms: ", target)
// }

function createEventListeners(roomType) {
  const priceForOne = roomType.querySelector("#totalPrice")
  const roomsCountInput = roomType.querySelector("#roomsCount")
  const addBtn = roomType.querySelector("#addBtn")
  
  // Add click event listener to the "Add to Booking" button
  addBtn.addEventListener('click', () => {
    const roomTypeId = addBtn.getAttribute("value")
    const roomsCount = roomsCountInput.value
    
    const priceValue = priceForOne.getAttribute("value")
    console.log("selected roomTypeID: ", roomTypeId)
    updateBookAllHref(roomTypeId, roomsCount,priceValue)
  })
}

function updateBookAllHref(roomTypeId, roomsCount,priceValue) {
  const bookAllLink = document.querySelector("#bookAll")
  
  bookAllLink.href += `&roomTypeID=${roomTypeId}&roomsCount=${roomsCount}&price=${priceValue}`
  console.log("href: ", bookAllLink.href)
  
}


document.addEventListener('DOMContentLoaded', () => {

  const checkInDate = document.querySelector("#check_in_date").value
  const checkOutDate = document.querySelector("#check_out_date").value
  const daysOfStay = calculateNumberOfNights(checkInDate,checkOutDate)
  
  const roomTypes = document.querySelectorAll(".room")
  roomTypes.forEach(roomType => {
    
    setPrice(roomType,daysOfStay)   

    createEventListeners(roomType)})    
    
})


// //-------------------------------------------------------//


// document.addEventListener('DOMContentLoaded', () => {
//   const roomTypes = document.querySelectorAll(".room")

//   function calculateNumberOfNights(checkInDate, checkOutDate) {
//     const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
//     const firstDate = new Date(checkInDate)
//     const secondDate = new Date(checkOutDate)
//     const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
//     return diffDays
//   }

  

//   function updateBookAllLink() {
//     let bookAllLink = document.querySelector("#bookAll").href

//     roomTypes.forEach((roomType) => {
//       const roomsCountInput = roomType.querySelector("#rooms_count")
//       const roomTypeID = roomType.querySelector(".btn").getAttribute("value")
//       const roomsCount = roomsCountInput.value
//       const params = `&roomTypeID=${roomTypeID}&rooms_count=${roomsCount}`
//       bookAllLink += params
//     })

//     document.querySelector("#bookAll").href = bookAllLink
//   }

//   roomTypes.forEach((roomType) => {
//     const bookButton = roomType.querySelector(".btn")
//     const roomsCountInput = roomType.querySelector("#rooms_count")

//     bookButton.addEventListener("click", () => {
//       const roomTypeID = roomType.querySelector(".btn").getAttribute("value")
//       const roomsCount = roomsCountInput.value
//       const params = `roomTypeID=${roomTypeID}&rooms_count=${roomsCount}`
//       const bookAllLink = `/doBookRoom?check_in_date=${document.querySelector("#check_in_date").value}&check_out_date=${document.querySelector("#check_out_date").value}&guests=${document.querySelector("#guests").value}&${params}`
//       document.querySelector("#bookAll").href = bookAllLink
//     })

//     roomsCountInput.addEventListener("change", updateBookAllLink)
//   })

//   const checkInDate = document.querySelector("#check_in_date").value
//   const checkOutDate = document.querySelector("#check_out_date").value
//   const daysOfStay = calculateNumberOfNights(checkInDate, checkOutDate)

//   roomTypes.forEach((roomType) => {
//     setPrice(roomType, daysOfStay)
//   })

//   updateBookAllLink()
// })