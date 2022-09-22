//Require Mongoose
const mongoose = require('mongoose')

//Define schema
const Schema = mongoose.Schema

//Define model
const sequenceDataSchema = new Schema({
  sequence_number: { type: String },
  sequence_type: { type: String, required: [true, "sequence_type is required"] },
  sequence_digits: { type: Number, default: 0 },
  prefix: { type: String, default: "" },
  postfix: { type: String, default: "" },
  modified_date: { type: Date, default: Date.now() },
  modified_by: { type: Schema.Types.ObjectId, ref: 'userData', default: null },
})

//Export function to create this model class
module.exports = mongoose.model(
  'sequenceData',
  sequenceDataSchema,
  'sequenceData',
)
