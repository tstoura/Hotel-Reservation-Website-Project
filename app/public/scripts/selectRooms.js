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


  totalPriceDiv.setAttribute("value",totalPrice)
  totalPriceDiv.textContent = totalPrice
}

function createEventListeners(roomType) {
  const priceForOne = roomType.querySelector("#totalPrice")
  const roomsCountInput = roomType.querySelector("#roomsCount")
  const addBtn = roomType.querySelector("#addBtn")
  
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
