import axios from 'axios';

const state = {
  subjects: [],
  loading: false,
  error: {},
  totalPages: 0,
};

const mutations = {
  SET_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_SUBJECTS(state, subjects) { 
    state.subjects = subjects;
  },
  SET_LOADING(state, status) {
    state.loading = { ...status };
  },
  SET_ERROR(state, error) {
    state.error = { ...error };
  },
  ADD_SUBJECT(state, subject) {
    state.subjects.push(subject);
  },
  UPDATE_SUBJECT(state, updatedSubject) { 
    const index = state.subjects.findIndex(s => s.id === updatedSubject.id);
    if (index !== -1) {
      state.subjects.splice(index, 1, updatedSubject);
    }
  },
  DELETE_SUBJECT(state, subjectId) {
    state.subjects = state.subjects.filter(s => s.id !== subjectId);
  }
};

const actions = {
  async fetchSubjects({ commit },{id}) { 
    commit('SET_LOADING', true);
    try {
      const response = await axios.get(`http://localhost:3000/subjects?id=${id}`);
      commit('SET_SUBJECTS', response.data); 
      console.log(response.data);
      
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch subjects');
      commit('SET_LOADING', false);
    }
  },
  async fetchPaginatedSubjects({ commit }, { page, limit,id }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/subjects?idCourese=${id}&_page=${page}&_limit=${limit}` 
      );    
      console.log(response.data);
      
      const totalPages = Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      );

      commit("SET_SUBJECTS", response.data); 
      commit("SET_PAGES", totalPages);
    } catch (error) {
      console.error("Error fetching subjects:", error); 
    }
  },
  async addSubject({ commit }, subject) { 
    try {
      const response = await axios.post('http://localhost:3000/subjects', subject); 

    } catch (error) {
      commit('SET_ERROR', 'Failed to add subject'); 
    }
  },
  async updateSubject({ commit }, subject) { 
    try {
      const response = await axios.put(`http://localhost:3000/subjects/${subject.id}`, subject); 
      commit('UPDATE_SUBJECT', response.data); 
    } catch (error) {
      commit('SET_ERROR', 'Failed to update subject');
    }
  },
  async deleteSubject({ commit }, subjectId) { 
    try {
      await axios.delete(`http://localhost:3000/subjects/${subjectId}`);
      commit('DELETE_SUBJECT', subjectId); 
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete subject');
    }
  }
};

const getters = {
  allSubjects: (state) => state.subjects, 
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
