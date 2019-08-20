import { ticketService } from '../../services';

export default {
  Query: {
    async tickets() {
      return await ticketService.getTickets();
    },

    async userTickets(_, { userId }) {
      return await ticketService.getTickets({ userId });
    },
  },

  Mutation: {
    async addTicket(_, { input }) {
      return await ticketService.addTicket({ input });
    },
  },
};
