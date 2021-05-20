const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../db/userModel");
const mailer = require('../nodemailer/nodemailer')
const fs = require('fs')
const secretKey = 'secret'

function generateAccessToken(user) {
  return jwt.sign(user, secretKey)
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Регистрация с проверкой email
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { login, email, password, role } = req.body
  const verifyRandomNumbers = Math.floor(1000 + Math.random() * 999)
  if (login && password && email && role) {
    const hashPass = await bcrypt.hash(password, 10)
    try {
      await User.create({ login, email, password: hashPass, checkEmail: verifyRandomNumbers, role })

      // nodemailer
      const messageGo = {
        from: 'amanatik10@gmail.com',
        to: email,
        subject: 'sending test nodemailer',
        html: `<h3>${verifyRandomNumbers}</h3>`,
      }
      mailer(messageGo)

      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(400)
    }
  }
  return res.sendStatus(402)
});

// Проверка, что ввели настоящий Email 
router.post('/checkEmail', async (req, res) => {
  const { code } = req.body
  try {
    if (code) {
      const currentUser = await User.findOne({ checkEmail: code })
      const currentUserFront = {
        _id: currentUser._id,
        location: currentUser.location,
        contacts: currentUser.contacts,
        title: currentUser.title,
        about: currentUser.about,
        favourites: currentUser.favourites,
        login: currentUser.login,
        email: currentUser.email,
        role: currentUser.role,
        imageUrl: currentUser.imageUrl
      }
      const userToken = { ...currentUserFront }
      const accessToken = generateAccessToken(userToken)
      return res.json({ accessToken: accessToken }).status(200)
    } else {
      return res.sendStatus(401)
    }
  } catch (error) {
    return res.sendStatus(401)
  }
})

// Login
router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      const currentUser = await User.findOne({ email })
      const validation = await bcrypt.compare(password, currentUser.password)
      if (validation) {
        const currentUserFront = {
          _id: currentUser._id,
          location: currentUser.location,
          contacts: currentUser.contacts,
          title: currentUser.title,
          about: currentUser.about,
          favourites: currentUser.favourites,
          login: currentUser.login,
          email: currentUser.email,
          role: currentUser.role,
          imageUrl: currentUser.imageUrl
        }
        const userToken = { ...currentUserFront }
        const accessToken = generateAccessToken(userToken)
        return res.json({ accessToken: accessToken }).status(200)
      }
    } catch (err) {
      return res.sendStatus(400)
    }
  }
  return res.sendStatus(402)
});

router.get('/authcheck', authenticateToken, async (req, res) => {
  res.json(req.user)
})


// Личный кабинет - редактирование
router.patch("/lk/:id", async (req, res) => {
  try {
    const { changes } = req.body
    const ID = req.params.id
    const currentUser = await User.findById(ID)
    currentUser.location = changes.location
    currentUser.contacts = changes.contacts
    currentUser.title = changes.title
    currentUser.about = changes.about
    currentUser.imageUrl = changes.imageUrl
    const currentUserFront = {
      _id: currentUser._id,
      location: currentUser.location,
      contacts: currentUser.contacts,
      title: currentUser.title,
      about: currentUser.about,
      favourites: currentUser.favourites,
      login: currentUser.login,
      email: currentUser.email,
      role: currentUser.role,
      imageUrl: currentUser.imageUrl
    }
    const userToken = { ...currentUserFront }
    const accessToken = generateAccessToken(userToken)
    await currentUser.save()
    res.send({ accessToken: accessToken }).status(200)
  } catch (err) {
    res.sendStatus(400)
  }
});

router.post('/addtofav', async (req, res) => {
  const {userID, partnerID} = req.body
  try {
    const currentUser = await User.findById(userID)
    currentUser.favourites.push(partnerID)
    const currentUserFront = {
      _id: currentUser._id,
      location: currentUser.location,
      contacts: currentUser.contacts,
      title: currentUser.title,
      about: currentUser.about,
      favourites: currentUser.favourites,
      login: currentUser.login,
      email: currentUser.email,
      role: currentUser.role,
      imageUrl: currentUser.imageUrl
    }
    const userToken = { ...currentUserFront }
    const accessToken = generateAccessToken(userToken)
    await currentUser.save()
    console.log(200);
    res.send({ accessToken: accessToken }).status(200)
  } catch (err) {

  }
})

// Добавление аватарки в личном кабинете
router.patch('/setAvatar', (req, res) => {
  try {
    fs.writeFileSync(`./public/images/avatars/${req.files.avatar.name}.jpg`, req.files.avatar.data)
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(400)
  }
})

module.exports = router;
