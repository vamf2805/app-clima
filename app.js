window.addEventListener("load", () => {
  let lat 
  let lon

  let temperaturaValor = document.getElementById('temperatura-valor')
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

  let ubicacion = document.getElementById('ubicacion')
  let iconoAnimado = document.getElementById('icono-animado')

  let vientoVelocidad = document.getElementById('viento-velocidad')




  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
      console.log(posicion.coords.latitude)
      lat = posicion.coords.latitude
      lon = posicion.coords.longitude
      
      //Ubicacion actual
      // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fad5e2070f5ffbb3cdebec9f7526b8ab`

      //ubicación por ciudad
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=fad5e2070f5ffbb3cdebec9f7526b8ab`

      fetch(url)
        .then(response =>{ return response.json()})
        .then (data =>{
          let temp = Math.round(data.main.temp)
          temperaturaValor.textContent = `${temp} °C`

          let desc = data.weather[0].description
          temperaturaDescripcion.textContent = desc.toUpperCase()

          ubicacion.textContent = data.name
          vientoVelocidad.textContent = `${data.wind.speed} m/s`

          //Para iconos estaticos 
          // console.log(data.weather[0].icon)
          // let iconCode = data.weather[0].icon

          // const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`

          console.log(data.weather[0].main)
          switch(data.weather[0].main){
            case 'Thunderstorm':
              iconoAnimado.src='animated/thunder.svg'
              console.log('TORMENTA');
              break;
            case 'Drizzle':
              iconoAnimado.src='animated/rainy-2.svg'
              console.log('LLOVIZNA');
              break;
            case 'Rain':
              iconoAnimado.src='animated/rainy-7.svg'
              console.log('LLUVIA');
              break;
            case 'Snow':
              iconoAnimado.src='animated/snowy-6.svg'
                console.log('NIEVE');
              break;                        
            case 'Clear':
                iconoAnimado.src='animated/day.svg'
                console.log('LIMPIO');
              break;
            case 'Atmosphere':
              iconoAnimado.src='animated/weather.svg'
                console.log('ATMOSFERA');
                break;  
            case 'Clouds':
                iconoAnimado.src='animated/cloudy-day-1.svg'
                console.log('NUBES');
                break;  
            default:
              iconoAnimado.src='animated/cloudy-day-1.svg'
              console.log('por defecto');
          }



        })
        .catch(error =>{
          console.log(error)
        })
    })
  }
});
