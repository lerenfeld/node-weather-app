console.log ('Fronted JS is UP ! ')






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit' , (e) =>{
e.preventDefault()

const address = search.value

msg1.textContent = "Loading..."

fetch('/weather?address='+address).then((Response)=>{
Response.json().then((data) => {

    if(data.error)
    //console.log(data.error)
    msg1.textContent = data.error
    else {

        //console.log(data.location)
        //console.log(data.forecasts)  
msg1.textContent = "Location : " + data.location
msg2.textContent = "Forecasts : " + data.forecasts
    }
console.log(data)
})
})

})