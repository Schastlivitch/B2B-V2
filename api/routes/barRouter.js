const router = require("express").Router();
const jwt = require('jsonwebtoken');
const Beer = require("../db/beer.model");
const Request = require("../db/request.model");
const User = require('../db/userModel')




// Все пивоварни
router.get("/allbrewers", async (req, res) => {
  try {
    const allBrews = await User.find({ role: 'brew' })
    const allBrewsFront = allBrews.map((brew) => {
      return {
        _id: brew._id,
        location: brew.location,
        contacts: brew.contacts,
        title: brew.title,
        about: brew.about,
        favourites: brew.favourites,
        login: brew.login,
        email: brew.email,
        role: brew.role,
        imageUrl: brew.imageUrl
      }
    })
    res.send(allBrewsFront).status(200)
  } catch (err) {
    console.log('error');
  }
});

// Все пиво
router.get("/beers", async (req, res) => {
  const allBeers = await Beer.find()
  res.json(allBeers).status(200)
});

// Одно пиво
router.get("/beer/:id", (req, res) => {

});

// Один пивовар
router.get("/brewer/:id", (req, res) => {

});

router.get("/lk/:id", async (req, res) => {
  try {
    const currentBar = await Bar.findById(req.params.id)
    delete currentBar.password
    res.send(currentBar).status(200)
  } catch (err) {

  }
});

// Личный кабинет - редактирование
router.patch("/lk/:id", async (req, res) => {
  try {
    const changes = req.body
    const ID = req.params.id
    const currentBrewer = await Bar.findByIdAndUpdate(ID, { ...changes })
    const changedBar = await Bar.findById(ID)
    delete changedBar.password
    res.sendStatus(200)
  } catch (err) {

  }
});

// Мои пивовары
router.get("/mybrewers/:id", (req, res) => {

});

// Мои пивовары - добавление
router.post("/mybrewers/:id", (req, res) => {

});

// Мои пивовары - удаление
router.delete("/mybrewers/:id", (req, res) => {

});

// Все запросы
router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find()
    res.send(requests).status(200)
  } catch (err) {

  }
});

// Мои запросы - добавление
router.post("/requests", async (req, res) => {
  try {
    await Request.create(req.body)
    res.sendStatus(200)
  } catch (err) {

  }
});

// Мои запросы - изменение
router.patch("/requests", async (req, res) => {
  const { _id } = req.body
  const { isPermanentSupply, supplyVolume, price, title, about, sort } = req.body
  try {
    const request = await Request.findById(_id)
    request.isPermanentSupply = isPermanentSupply
    request.supplyVolume = supplyVolume
    request.price = price
    request.title = title
    request.about = about
    request.sort = sort
    await request.save()
    res.sendStatus(200)
  } catch (err) {

  }
});

// Мои запросы - удаление
router.delete("/requests/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await Request.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (err) {

  }
});

module.exports = router;
