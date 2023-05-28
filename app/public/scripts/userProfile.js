document.addEventListener('DOMContentLoaded', () =>{
    const bookings = document.querySelectorAll('.booking')
    
    bookings.forEach(booking => {
        const cancelButton = booking.querySelector("#cancelBtn")
        
        
        cancelButton.addEventListener('click', (event)=>{
            booking.classList.add('canceled')
        })
    })

})
