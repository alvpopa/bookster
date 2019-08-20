import { Schema, model } from 'mongoose';

const predictionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  eventId: {
    type: Number,
  },

  homeTeam: {
    type: String,
  },

  awayTeam: {
    type: String,
  },

  prediction: {
    type: String,
  },

  odd: {
    type: Number,
  },

  result: {
    type: String,
  },

  isCorrect: {
    type: Boolean,
  },
});

const ticketSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  date: {
    type: String,
  },

  userId: {
    type: String,
  },

  amount: {
    type: Number,
  },

  totalOdd: {
    type: Number,
  },

  predictions: [predictionSchema],

  isWinner: {
    type: Boolean,
  },
});

export default model('Tickets', ticketSchema);
