document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const checkinDate = new Date(form.checkin.value);
      const checkoutDate = new Date(form.checkout.value);
  
      if (checkoutDate <= checkinDate) {
        alert("Check-out date must be after check-in date.");
        return;
      }
  
      const reservationData = {
        name: form.name.value,
        email: form.email.value,
        checkin: form.checkin.value,
        checkout: form.checkout.value,
        roomType: form["room-type"].value,
        numGuests: form["num-guests"].value,
      };
  
      console.log(reservationData);
      // Here you can send the reservationData to your server, e.g., using fetch API or XMLHttpRequest.
      alert("Reservation submitted. Check the browser console for the reservation data.");
    });
  });