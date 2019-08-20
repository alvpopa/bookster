import { standingService } from '../../services';

export default {
  Query: {
    standing: async (_, args) => {
      const { id } = args;
      return standingService.getStanding(id);
    },
  },
};
