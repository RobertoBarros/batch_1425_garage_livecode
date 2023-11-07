const url = 'https://wagon-garage-api.herokuapp.com/lewacars/cars'

const list = document.querySelector('.cars-list')
const form = document.querySelector('.car-form')

const makeCar = (car) => {
  return `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand.replace(' ','-')}-${car.model.replace('','-')}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>`
}


const refresh = () => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {

    list.innerHTML = ''

    data.forEach((car) => {
      const div = makeCar(car)
      list.insertAdjacentHTML('beforeend', div)

    })
  })
}



form.addEventListener('submit',(event) => {
  event.preventDefault();

  const details = Object.fromEntries(new FormData(form))

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details)
  })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      form.reset()
      refresh()
    })

})




refresh()
