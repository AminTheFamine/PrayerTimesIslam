// Get user location
navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude, longitude } = pos.coords;
  
  // Fetch prayer times
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=2`)
    .then(res => res.json())
    .then(data => {
      const times = data.data.timings;
      console.log('Fajr:', times.Fajr);
      console.log('Dhuhr:', times.Dhuhr);
      console.log('Asr:', times.Asr);
      console.log('Maghrib:', times.Maghrib);
      console.log('Isha:', times.Isha);
      

     document.querySelectorAll(".PrayerFrame").forEach(element => {
        const Name = element.querySelector("h1")
        const Time = element.querySelector("h2")

        Name.textContent = element.id

        Time.textContent = times[element.id]
      });
    });
});
