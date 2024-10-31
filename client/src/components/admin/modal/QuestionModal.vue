<template>
  <div v-if="isOpen && modalType === 'questionModal'" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Tên bài thi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Tên bài thi</label>
            <input
              type="text"
              :value="examName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              readonly
            />
          </div>

          <!-- Tên câu hỏi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Tên câu hỏi</label>
            <input
              type="text"
              v-model="questionForm.text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <p v-if="errors.text" class="text-red-500 text-sm mt-1">{{ errors.text }}</p>
          </div>

          <!-- Danh sách câu trả lời cố định -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Danh sách câu trả lời</label>
            <div v-for="(answer, index) in questionForm.answerList" :key="index" class="flex items-center space-x-2 mb-2">
              <input
                type="text"
                v-model="answer.answer"
                placeholder="Nhập câu trả lời"
                class="block w-3/4 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              <input
                type="radio"
                :value="index"
                v-model="selectedAnswer"
                @change="setCorrectAnswer(index)"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <p v-if="errors.answerList" class="text-red-500 text-sm mt-1">{{ errors.answerList }}</p>
            <p v-if="errors.correctAnswer" class="text-red-500 text-sm mt-1">{{ errors.correctAnswer }}</p>
          </div>

          <!-- Nút lưu -->
          <button type="button" @click="handleSaveQuestion" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
            Lưu
          </button>
          <button type="button" @click="handleCloseModal" class="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); 
const store = useStore();
const examId = computed(() => route.params.id);

const isOpen = computed(() => store.state.modal.isOpen);
const modalType = computed(() => store.state.modal.modalType);
const modalData = computed(() => store.state.modal.modalData);
const exams = computed(() => store.state.exam.exams);
const questionForm = ref({
  idExam: '',
  requence: 0, 
  text: '',
  answerList: [
    { answer: '', status: 0 },
    { answer: '', status: 0 },
    { answer: '', status: 0 },
    { answer: '', status: 0 },
  ],
});
const selectedAnswer = ref(null);
const errors = ref({}); // Error messages for validation

const examName = computed(() => {
  const exam = exams.value.find((c) => c.id === questionForm.value.idExam);
  return exam ? exam.name : "";
});

onMounted(() => {
  if (!exams.value || exams.value.length === 0) {
    store.dispatch("exam/fetchExams", { id: examId.value });
  }
});

watch([modalData, exams], ([newData, newExams]) => {
  if (newData) {
    questionForm.value = { ...newData };
    const correctAnswerIndex = questionForm.value.answerList.findIndex(answer => answer.status === 1);
    selectedAnswer.value = correctAnswerIndex !== -1 ? correctAnswerIndex : null;
  } else {
    resetForm();
    questionForm.value.idExam = examId.value;
  }
  if (newExams && questionForm.value.idExam) {
    const exam = newExams.find((c) => c.id === questionForm.value.idExam);
    examName.value = exam ? exam.name : "";
  }
});

const resetForm = () => {
  questionForm.value = {
    idExam: '',
    requence: 0,
    text: '',
    answerList: [
      { answer: '', status: 0 },
      { answer: '', status: 0 },
      { answer: '', status: 0 },
      { answer: '', status: 0 },
    ],
  };
  selectedAnswer.value = null;
  errors.value = {}; // Clear errors
};

const setCorrectAnswer = (index) => {
  questionForm.value.answerList.forEach((answer, i) => {
    answer.status = i === index ? 1 : 0;
  });
  selectedAnswer.value = index;
};

const validateForm = () => {
  errors.value = {}; // Reset errors

  // Validate question text
  if (!questionForm.value.text) {
    errors.value.text = "Tên câu hỏi không được để trống.";
  }

  // Validate answer list (all answers must be filled and exactly 4 answers)
  if (questionForm.value.answerList.some(answer => !answer.answer)) {
    errors.value.answerList = "Tất cả câu trả lời phải được điền.";
  }

  // Validate correct answer selection
  if (selectedAnswer.value === null) {
    errors.value.correctAnswer = "Phải chọn một câu trả lời đúng.";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSaveQuestion = () => {
  if (!validateForm()) return; // Stop if validation fails

  if (modalData.value) {
    store.dispatch('question/updateQuestion', {
      ...questionForm.value,
      id: modalData.value.id,
    });
  } else {
    store.dispatch('question/addQuestion', questionForm.value);
  }
  handleCloseModal();
};

const handleCloseModal = () => {
  store.dispatch('modal/closeModal');
  resetForm();
};
</script>
