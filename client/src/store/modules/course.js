import axios from 'axios';

const state = {
  course: [], 
  loading: false,
  error: {},
  totalPages:0
};

const mutations = {
  SET_PAGES (state,totalPages){
    state.totalPages=totalPages
  },
  SET_COURSE(state, course) {
    state.course = course;
  },
  SET_LOADING(state, status) {
    state.loading = {...status};
  },
  SET_ERROR(state, error) {
    state.error = {...error};
  },
  ADD_COURSE(state, course) {
    state.course.push(course);
  },
  UPDATE_COURSE(state, updatedcourse) {
    const index = state.course.findIndex(p => p.id === updatedCourse.id);
    if (index !== -1) {
      state.course.splice(index, 1, updatedCourse);
    }
  },
  DELETE_COURSE(state, courseId) { // Chỉnh sửa tên biến ở đây
    state.course = state.course.filter(p => p.id !== courseId);
  }
};

const actions = {
  async fetchCourses({ commit },{id}) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get(`http://localhost:3000/courses?id=${id}`);
      commit('SET_COURSE', response.data);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch courses');
      commit('SET_LOADING', false);
    }
  },
  async fetchPaginatedCourses({ commit }, { page, limit }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/courses?_page=${page}&_limit=${limit}`
      );
      const totalPages = Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      );
      console.log(totalPages.value);
      
      commit("SET_COURSE",  response.data );
      commit("SET_PAGES",  totalPages );

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, 
  async addCourse({ commit }, course) {
    try {
      const response = await axios.post('http://localhost:3000/courses', course);
    } catch (error) {
      commit('SET_ERROR', 'Failed to add course');
    }
  },
  async updateCourse({ commit }, course) {
    try {
      const response = await axios.put(`http://localhost:3000/courses/${course.id}`, course); 
      commit('UPDATE_COURSE', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to update course');
    }
  },
  async deleteCourse({ commit }, courseId) {
    try {
      await axios.delete(`http://localhost:3000/courses/${courseId}`);
      commit('DELETE_COURSE', courseId); // Chỉnh sửa tên mutation
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete course');
    }
  }
};

const getters = {
  allCourses: (state) => state.course,
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
