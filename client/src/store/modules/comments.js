import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    comments: [],
  }),
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    updateComment(state, updatedComment) {
      const index = state.comments.findIndex((comment) => comment.id === updatedComment.id);
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment);
      }
    },
    deleteComment(state, commentId) {
      state.comments = state.comments.filter((comment) => comment.id !== commentId);
    },
  },
  actions: {
    async fetchComments({ commit }, examId) {
      try {
        const response = await axios.get('http://localhost:3000/comment');
        const allComments = response.data.filter((comment) => comment.idExam === examId);
        commit('setComments', allComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async addComment({ commit }, newComment) {
      try {
        const response = await axios.post('http://localhost:3000/comment', newComment);
        commit('addComment', response.data);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async updateComment({ commit }, { commentId, updatedContent }) {
      try {
        await axios.put(`http://localhost:3000/comment/${commentId}`, { content: updatedContent });
        commit('updateComment', { id: commentId, content: updatedContent });
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },
    async deleteComment({ commit }, commentId) {
      try {
        await axios.delete(`http://localhost:3000/comment/${commentId}`);
        commit('deleteComment', commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
  },
  getters: {
    allComments: (state) => state.comments,
    displayedComments: (state) => (showAll) => (showAll ? state.comments : state.comments.slice(0, 1)),
  },
};
