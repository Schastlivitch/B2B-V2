const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
  bar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bar"
  },
  isPermanentSupply: Boolean,
  supplyVolume: String,
  price: Number,
  title: String,
  about: String,
  sort: String
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request
