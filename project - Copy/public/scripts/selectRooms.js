function calculateNumberOfNights(checkInDate, checkOutDate) {
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    const firstDate = new Date(checkInDate)
    const secondDate = new Date(checkOutDate)
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    return diffDays
  }
  
document.addEventListener('DOMContentLoaded', () => {

  const checkInDate = document.querySelector("#check_in_date").value
  const checkOutDate = document.querySelector("#check_out_date").value
  const daysOfStay = calculateNumberOfNights(checkInDate,checkOutDate)    

  const totalPriceDiv = document.querySelector("#totalPrice")
  const priceXdaysDiv = document.querySelector("#priceXdays")
  const pricePerNight = priceXdaysDiv.getAttribute("value")
  priceXdaysDiv.textContent = "Price for " + daysOfStay + " days:"
  const totalPrice = daysOfStay*pricePerNight

  //8elw to total Price ws ari8mo gia th bash ti kanw me to symbolo tou euro?
  totalPriceDiv.textContent=totalPrice

})
  
