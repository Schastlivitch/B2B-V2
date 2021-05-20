const router = require("express").Router();
const jwt = require('jsonwebtoken');
const Beer = require("../db/beer.model");
const Request = require("../db/request.model");
const User = require('../db/userModel')
const fs = require('fs')



// Все бары
router.get("/allbars", async (req, res) => {
  try {
    const allBars = await User.find({ role: 'bar' })
    const allBarsFront = allBars.map((bar) => {
      return {
        _id: bar._id,
        location: bar.location,
        contacts: bar.contacts,
        title: bar.title,
        about: bar.about,
        favourites: bar.favourites,
        login: bar.login,
        email: bar.email,
        role: bar.role,
        imageUrl: bar.imageUrl
      }
    })
    res.send(allBarsFront).status(200)
  } catch (err) {
    console.log('error');
  }
});


// Все запросы 
router.get("/requests", async (req, res) => {
  const allRequests = await Request.find().populate('bar')
  res.json(allRequests).status(200)
});

// Один запрос - сменить статус на просмотрено
router.patch("/request/:id", async (req, res) => {
  try {
    const currentRequest = await Request.findById(req.params.id)
    currentRequest.active = false
    await currentRequest.save()
    res.sendStatus(200)
  } catch (err) {

  }
});

// Один запрос
router.get("/request/:id", (req, res) => {

});

// Один бар
router.get("/bar/:id", (req, res) => {

});

// Личный кабинет
router.get("/lk/:id", async (req, res) => {
  try {
    const currentBrewer = await Brew.findById(req.params.id)
    delete currentBrewer.password
    res.send(currentBrewer).status(200)
  } catch (err) {

  }
});

// Личный кабинет - редактирование
router.patch("/lk/:id", async (req, res) => {
  try {
    const changes = req.body
    const ID = req.params.id
    const currentBrewer = await Brew.findByIdAndUpdate(ID, { ...changes })
    const changedBrewer = await Brew.findById(ID)
    delete changedBrewer.password
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
});

// Мои бары
router.get("/mybars/:id", (req, res) => {

});

// Мои бары - добавление
router.post("/mybars/:id", (req, res) => {

});

// Мои бары - удаление
router.delete("/mybars/:id", (req, res) => {

});

// Мои пива
router.get("/beers", async (req, res) => {
  try {
    const beers = await Beer.find()
    res.send(beers).status(200)
  } catch (err) {

  }
});

// Мои пива - добавление
router.post("/beers", async (req, res) => {
  try {
    await Beer.create(req.body)
    res.sendStatus(200)
  } catch (err) {

  }

});

// Мои пива - изменение
router.patch("/beers", async (req, res) => {
  const { _id } = req.body
  const { title, sort, about, abv, ibu, ebc, ph, 
    onceSupplyVolume, permanentSupplyVolume,
    tareVolume, onceSupplyPrice, permanentSupplyPrice, imageUrl
  } = req.body
  try {
    const beer = await Beer.findById(_id)
    beer.title = title
    beer.sort = sort
    beer.about = about
    beer.abv = abv
    beer.ibu = ibu
    beer.ebc = ebc
    beer.ph = ph
    beer.onceSupplyVolume = onceSupplyVolume
    beer.permanentSupplyVolume = permanentSupplyVolume
    beer.tareVolume = tareVolume
    beer.onceSupplyPrice = onceSupplyPrice
    beer.permanentSupplyPrice = permanentSupplyPrice
    beer.imageUrl = imageUrl
    await beer.save()
    res.sendStatus(200)
  } catch (err) {

  }
});

// Мои пива - удаление
router.delete("/beers/:id", async (req, res) => {
  try {
    await Beer.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (err) {

  }
});

// Добавление изображения пива
router.patch('/setBeerImage', (req, res) => {
  console.log(req.files)
  try {
    fs.writeFileSync(`./public/images/beers/${req.files.beerImg.name}.jpg`, req.files.beerImg.data)
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(400)
  }
})
module.exports = router;
