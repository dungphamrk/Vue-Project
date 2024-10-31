import axios from 'axios';

const state = {
  questions: [],
  loading: false,
  error: null,
  totalPages: 0
};

const mutations = {
  SET_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_QUESTIONS(state, questions) {
    state.questions = questions;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  ADD_QUESTION(state, question) {
    state.questions.push(question);
  },
  UPDATE_QUESTION(state, updatedQuestion) {
    const index = state.questions.findIndex(q => q.id === updatedQuestion.id);
    if (index !== -1) {
      state.questions.splice(index, 1, updatedQuestion);
    }
  },
  DELETE_QUESTION(state, questionId) {
    state.questions = state.questions.filter(q => q.id !== questionId);
  }
};

const actions = {
  async fetchQuestions({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get('http://localhost:3000/questions');
      commit('SET_QUESTIONS', response.data);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch questions');
      commit('SET_LOADING', false);
    }
  },
  async fetchPaginatedQuestions({ commit }, { page, limit,id }) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get(
        `http://localhost:3000/questions?idExam=${id}&_page=${page}&_limit=${limit}` 
      );    
      const totalPages = Math.ceil(parseInt(response.headers["x-total-count"]) / limit);
      commit("SET_QUESTIONS", response.data);
      commit("SET_PAGES", totalPages);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Error fetching paginated questions');
      commit('SET_LOADING', false);
    }
  },
  async addQuestion({ commit }, question) {
    try {
      const response = await axios.post('http://localhost:3000/questions', question);
    } catch (error) {
      commit('SET_ERROR', 'Failed to add question');
    }
  },
  async updateQuestion({ commit }, question) {
    try {
      const response = await axios.put(`http://localhost:3000/questions/${question.id}`, question);
      commit('UPDATE_QUESTION', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to update question');
    }
  },
  async deleteQuestion({ commit }, questionId) {
    try {
      await axios.delete(`http://localhost:3000/questions/${questionId}`);
      commit('DELETE_QUESTION', questionId);
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete question');
    }
  }
};

const getters = {
  allQuestions: (state) => state.questions,
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
