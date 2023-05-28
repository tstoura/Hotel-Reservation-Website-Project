document.addEventListener('DOMContentLoaded', function() {

  const roomsDataInput = document.getElementById('roomsData');
  const roomsData = JSON.parse(roomsDataInput.value)

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
    datasets: [{
      label: 'Booked Rooms',
      data: roomsData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  }
  
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
  })