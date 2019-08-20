import { apiRequest } from '../utils/';

export default {
  route: 'competitions',

  async getStanding(id) {
    const route = `${this.route}/${id}/standings`;
    const result = await apiRequest(route);
    return result.standings[0];
  },
};
