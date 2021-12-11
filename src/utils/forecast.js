const request = require('postman-request')


const forecast = (lat , long , callback) =>{

const url = 'http://api.weatherstack.com/current?access_key=f688672b5736423fd6678d2e8edcc7ed&query='+ lat +','+ long +'&units=m'

request( {url:url  ,json:true } ,(error, response)=>{

  if (error){
      callback('Unable to Connect weatherstack' , undefined)
  }
  else if(response.body.error){
    callback('Error in properties : ' + response.body.error.info , undefined)
  }
  else{
    const data = response.body.current
    callback(undefined , data.weather_descriptions[0] + '. The temperator is : '+ data.temperature +'. And its feelsLike : '+ data.feelslike)    
  }

})
}

module.exports = forecast