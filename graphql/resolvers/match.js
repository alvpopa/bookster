import { matchService } from '../../services';

export default {
  Query: {
    async matches() {
      return await matchService.getMatches();
    },

    async match(_, { id }) {
      return await matchService.getMatch(id);
    },
  },
};
