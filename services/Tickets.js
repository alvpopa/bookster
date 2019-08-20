import mongoose from 'mongoose';

// Import Models
import Tickets from '../models/ticketSchema';
import { queryDate, resultsObject, yesterday } from '../utils';
import { matchService } from './';

export default {
  async getTickets(filters = {}) {
    try {
      const tickets = await Tickets.find(filters)
        .sort({ date: -1 })
        .exec();

      if (tickets.length < 1) {
        return { error: 'No tickets' };
      }

      return tickets;
    } catch (error) {
      console.log(error.message);
    }
  },

  async addTicket({ input: { amount, predictions, totalOdd, userId } }) {
    const newTicket = Tickets({
      _id: new mongoose.Types.ObjectId(),
      amount,
      date: queryDate(),
      predictions,
      totalOdd,
      userId,
    });
    const ticket = await newTicket.save();
    return ticket;
  },

  async verifyTickets() {
    const date = yesterday();
    const matches = await matchService.getMatches({
      dateFrom: date,
      dateTo: date,
    });

    const results = resultsObject(matches);

    const tickets = await Tickets.find({ date }).exec();

    tickets.forEach(ticket => {
      const { predictions } = ticket;

      const updated = predictions.map(pred => {
        const { eventId, prediction } = pred;
        const { winner, score } = results[eventId];
        pred.isCorrect = winner === prediction;
        pred.result = score;
        return pred;
      });

      const isWinner = predictions.every(({ isCorrect }) => isCorrect);

      Tickets.updateOne(
        { _id: ticket._id },
        { predictions: updated, isWinner },
        { upsert: true },
        err => {
          err ? console.log(err) : console.log(`Ticket ${ticket._id} updated!`);
        }
      );
    });
  },
};
