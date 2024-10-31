import axios from 'axios';

const state = {
  account: [], 
  loading: false,
  error: {},
  totalPages:0
};

const mutations = {
  SET_PAGES (state,totalPages){
    state.totalPages=totalPages
  },
  SET_ACCOUNT(state, account) {
    state.account = account;
  },
  SET_LOADING(state, status) {
    state.loading = {...status};
  },
  SET_ERROR(state, error) {
    state.error = {...error};
  },
  ADD_ACCOUNT(state, account) {
    state.account.push(account);
  },
  UPDATE_ACCOUNT(state, updatedAccount) {
    const index = state.account.findIndex(p => p.id === updatedAccount.id);
    if (index !== -1) {
      state.account.splice(index, 1, updatedAccount);
    }
  },
  DELETE_ACCOUNT(state, accountId) { // Chỉnh sửa tên biến ở đây
    state.account = state.account.filter(p => p.id !== accountId);
  }
};

const actions = {
  async fetchAccounts({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get('http://localhost:3000/accounts');
      commit('SET_ACCOUNT', response.data);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch accounts');
      commit('SET_LOADING', false);
    }
  },
  async fetchPaginatedAccounts({ commit }, { page, limit }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/accounts?_page=${page}&_limit=${limit}`
      );
      const totalPages = Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      );
      commit("SET_ACCOUNT",  response.data );
      commit("SET_PAGES",  totalPages );

    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  },
  async addAccount({ commit }, account) {
    try {
      const response = await axios.post('http://localhost:3000/accounts', account);
      console.log(response.data);
      commit('ADD_ACCOUNT', response.data);
      
    } catch (error) {
      commit('SET_ERROR', 'Failed to add Account');
    }
  },
  async updateAccount({ commit }, account) {
    try {
      const response = await axios.put(`http://localhost:3000/accounts/${account.id}`, account); 
      commit('UPDATE_ACCOUNT', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to update Account');
    }
  },
  async deleteAccount({ commit }, accountId) {
    try {
      await axios.delete(`http://localhost:3000/accounts/${accountId}`);
      commit('DELETE_ACCOUNT', accountId); // Chỉnh sửa tên mutation
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete Account');
    }
  }
};

const getters = {
  allAccounts: (state) => state.account,
  isLoading: (state) => state.loading,
  hasError: (state) => state.error,
  totalPages: (state) => state.totalPages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
