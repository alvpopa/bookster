import { apiRequest } from '../utils/';

export default {
  route: 'matches',

  async getMatches(filters = {}) {
    const result = await apiRequest(this.route, filters);
    return result.matches;
  },

  async getMatch(id) {
    const route = `${this.route}/${id}`;
    return await apiRequest(route);
  },
};
