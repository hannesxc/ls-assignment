var cafes = []
var places = []
var res = []
var data = ''

async function fetchData(search) {

    await fetch(`https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json`).then(res => res.json()).then(data => cafes = data.cafes).catch(err => console.log(err))
    await fetch(`https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json`).then(res => res.json()).then(data => places = data.places).catch(err => console.log(err))
    
    places.forEach( place => {
        cafes.forEach( cafe => {
            if (place.id === cafe.location_id) {
                res.push({
                    name: cafe.name,
                    locality: place.locality,
                    postal_code: place.postal_code,
                    lat: place.lat,
                    long: place.long
                })
            }
        })
    })

    const inputBox = document.getElementById('search')

    display('')

    inputBox.addEventListener("keyup", (e) => {
        const search = e.target.value.toLowerCase()
        data = ''
        display(search)
    })

    function display(search) {

        var i = 1
        res.forEach( item => {
            itemName = item.name.toLowerCase()
            if (itemName.includes(search)) {
                data += `
                    <tr>
                        <td class="column1">${i}</td>
                        <td class="column2">${item.name}</td>
                        <td class="column3">${item.locality}</td>
                        <td class="column4">${item.postal_code}</td>
                        <td class="column5">${item.lat}</td>
                        <td class="column6">${item.long}</td>
                    </tr>
                `
                i += 1
            }
        })

        document.getElementById('data').innerHTML = data
    }
}

fetchData()