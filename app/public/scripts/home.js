document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm')
    const checkInDateInput = document.getElementById('check_in_date')
    const checkOutDateInput = document.getElementById('check_out_date')
    
    bookingForm.addEventListener('submit', function(event) {
        
        event.preventDefault()
    
        const checkInDate = new Date(checkInDateInput.value)
        const checkOutDate = new Date(checkOutDateInput.value)
    
        if (checkOutDate <= checkInDate) {
        alert('Check-out date must be greater than the check-in date.')
        } else {
        
        bookingForm.submit()
        }
    })
})