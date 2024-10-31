<template>
  <div
    v-if="isOpen && modalType === 'subjectModal'"
    class="fixed z-10 inset-0 overflow-y-auto"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Tên môn học</label
            >
            <input
              type="text"
              v-model="subjectForm.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Khóa học</label>
            <input
              type="text"
              :value="courseName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Ảnh</label>
            <input
              type="file"
              @change="handleImageUpload"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              accept="image/*"
            />
          </div>

          <div v-if="imagePreview" class="mb-4">
            <img
              :src="imagePreview"
              class="w-32 h-32 object-cover mx-auto rounded-md"
              alt="Preview Image"
            />
          </div>
          <button
            type="button"
            @click="handleSaveSubject"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            @click="handleCloseModal"
            class="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useStore } from "vuex";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const courseId = computed(() => route.params.id);
const store = useStore();
const isOpen = computed(() => store.state.modal.isOpen);
const modalType = computed(() => store.state.modal.modalType);
const modalData = computed(() => store.state.modal.modalData);
const courses = computed(() => store.state.course.course);
const imagePreview = ref(null); 
  
const courseName = computed(() => {
  const course = courses.value.find((c) => c.id === courseId.value);
  return course ? course.name : "";
});
const subjectForm = ref({
  name: "",
  idCourse: `${courseId.value}`,
  image: null,
});
onMounted(() => {
  store.dispatch("course/fetchCourses",{id:courseId.value});
});

watch(modalData, (newData) => {
  if (newData) {
    subjectForm.value = { ...newData };
    imagePreview.value = newData.image || null; 
  } else {
    resetForm();
  }
});

const resetForm = () => {
  subjectForm.value = {
    name: "",
    idCourse: "",
  };
  imagePreview.value = "";
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      subjectForm.value.image = reader.result;
      imagePreview.value = reader.result;
    };
    reader.onerror = (error) => {
      console.error("Error uploading image: ", error);
    };
  }
};

const handleSaveSubject = () => {
  if (modalData.value) {
    store.dispatch("subject/updateSubject", {
      ...subjectForm.value,
      id: modalData.value.id,
    });
  } else {
    store.dispatch("subject/addSubject", subjectForm.value);
  }
  handleCloseModal();
};

const handleCloseModal = () => {
  store.dispatch("modal/closeModal");
  resetForm();
};
</script>
  