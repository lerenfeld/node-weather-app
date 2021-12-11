const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app  =  express()


//Define path for express config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewPath = path.join(__dirname ,'../templates/views')
const partialsPath = path.join(__dirname ,'../templates/partials')



//Setup handelbars engine and view config   
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

//Setup static direcctoty to serve
app.use(express.static(publicDirectoryPath))


app.get('' , (req, res)  => {
    res.render('index' , {
        title : "Weather" ,
        name : "Gal Lerenfeld" 
        

    })
})

app.get('/about' , (req, res)  => {
    res.render('about' , {
        title : "ABOUT_TitleDynamic" ,
        name : "Gal Lerenfeld"  
        

    })
})

app.get('/help' , (req, res)  => {
    res.render('help' , {
        massage : "H E L P !!!" ,
        name : "Gal Lerenfeld"
       

    })
})


app.get('/weather' , (req, res)  => {

if(!req.query.address){
    return res.send({
        error : 'address is a mandatory field ! '
    })
}


geocode(req.query.address, (error, {lat , long , location} = {}) => {
    if(error) 
    return res.send({ error})
  
    forecast(lat, long, (error, ForecastData) => {
      if(error) 
      return res.send({ error})

  



    res.send({
        forecasts : ForecastData , 
        location : location, 
        address : req.query.address
    })
        
})

})
})

app.get('/help/*' , (req, res)  => {
    res.render('404page' , {
        massage: 'help atrical not found !',
        title : "404" ,
        name : "Gal Lerenfeld"  
    })
    
})

app.get('*' , (req, res)  => {
    res.render('404page' , {
        massage: 'Page not found !',
        title : "404" ,
        name : "Gal Lerenfeld"  

    })
} )




app.listen(3000 , () =>{
console.log('server is up on port 3000')
})
