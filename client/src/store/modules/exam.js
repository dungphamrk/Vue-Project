import axios from 'axios';

const state = {
  exams: [],
  loading: false,
  error: {},
  totalPages: 0,
};

const mutations = {
  SET_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_EXAMS(state, exams) {
    state.exams = exams;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  ADD_EXAM(state, exam) {
    state.exams.push(exam);
  },
  UPDATE_EXAM(state, updatedExam) {
    const index = state.exams.findIndex(e => e.id === updatedExam.id);
    if (index !== -1) {
      state.exams.splice(index, 1, updatedExam);
    }
  },
  DELETE_EXAM(state, examId) {
    state.exams = state.exams.filter(e => e.id !== examId);
  }
};

const actions = {
  async fetchExams({ commit },{id}) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get(`http://localhost:3000/exams?id=${id}`);
      commit('SET_EXAMS', response.data);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch exams');
      commit('SET_LOADING', false);
    }
  },
  async fetchPaginatedExams({ commit }, { page, limit,id }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/exams?idSubject=${id}&_page=${page}&_limit=${limit}` 
      );    
      console.log(response);
      
      const totalPages = Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      );

      commit("SET_EXAMS", response.data);
      commit("SET_PAGES", totalPages);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  },
  async addExam({ commit }, exam) {
    try {
      const response = await axios.post('http://localhost:3000/exams', exam);
    } catch (error) {
      commit('SET_ERROR', 'Failed to add exam');
    }
  },
  async updateExam({ commit }, exam) {
    try {
      const response = await axios.put(`http://localhost:3000/exams/${exam.id}`, exam);
      commit('UPDATE_EXAM', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to update exam');
    }
  },
  async deleteExam({ commit }, examId) {
    try {
      await axios.delete(`http://localhost:3000/exams/${examId}`);
      commit('DELETE_EXAM', examId);
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete exam');
    }
  }
};

const getters = {
  allExams: (state) => state.exams,
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
