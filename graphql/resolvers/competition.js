import { apiRequest } from '../../utils/';

export default {
  Query: {
    competitions: async () => {
      const result = await apiRequest('competitions');
      return result.competitions;
    },
    competition: async (_, args) => {
      const { id } = args;
      return await apiRequest(`competitions/${id}`);
    },
  },
};
