import { teamService } from '../../services';

export default {
  Query: {
    async team(_, { id }) {
      return teamService.getTeamInfo(id);
    },
  },
};
