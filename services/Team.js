import { apiRequest } from '../utils';

export default {
  route: 'teams',

  async getTeamInfo(id) {
    const route = `${this._route}/${id}`;
    return await apiRequest(route);
  },

  async getTeamMatches(id) {
    const route = `${this._route}/${id}/matches`;
    return await apiRequest(route);
  },
};
