import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    wialonToken: null,
    companyList: null,
    wialonAccList: null,
    user: null,
  }),

  getters: {
    getWialonToken: (state) => state.wialonToken,
    getCompanyList: (state) => state.companyList,
    getWialonAccList: (state) => state.wialonAccList,
    getUserData: (state) => state.user,
  },

  actions: {
    setUser(payload) {
      if (payload.wialonToken) this.wialonToken = payload.wialonToken;
      if (payload.companyList) this.companyList = payload.companyList;
      if (payload.wialonAccList) this.wialonAccList = payload.wialonAccList;
      if (payload.user) this.user = payload.user;
    },
    clearUser() {
      this.wialonToken = null;
    },
  },

});
