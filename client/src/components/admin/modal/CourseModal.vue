<template>
  <div v-if="isOpen && modalType === 'courseModal'" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Course Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Tên khóa học</label>
            <input
              type="text"
              v-model="courseForm.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Mô tả</label>
            <input
              type="text"
              v-model="courseForm.description"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
          </div>

          <!-- Image Upload -->
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
            <img :src="imagePreview" class="w-32 h-32 object-cover mx-auto rounded-md" alt="Preview Image" />
          </div>

          <!-- Save and Cancel Buttons -->
          <button type="button" @click="handleSaveCourse" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
            Save
          </button>
          <button type="button" @click="handleCloseModal" class="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';

const store = useStore();

const isOpen = computed(() => store.state.modal.isOpen);
const modalType = computed(() => store.state.modal.modalType);
const modalData = computed(() => store.state.modal.modalData);

const courseForm = ref({
  name: '',
  description: '',
  image: null,
});

const errors = ref({}); // Track errors for form fields
const imagePreview = ref(null); 

watch(modalData, (newData) => {
  if (newData) {
    courseForm.value = { ...newData };
    imagePreview.value = newData.image || null; 
  } else {
    resetForm();
  }
});

const resetForm = () => {
  courseForm.value = {
    name: '',
    description: '',
    image: null,
  };
  imagePreview.value = null;
  errors.value = {}; // Reset errors
};

const validateForm = () => {
  errors.value = {};

  if (!courseForm.value.name) {
    errors.value.name = 'Tên khóa học không được để trống';
  }

  if (!courseForm.value.description) {
    errors.value.description = 'Mô tả không được để trống';
  }

  return Object.keys(errors.value).length === 0;
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      courseForm.value.image = reader.result;
      imagePreview.value = reader.result; 
    };
    reader.onerror = (error) => {
      console.error('Error uploading image: ', error);
    };
  }
};

const handleSaveCourse = () => {
  if (!validateForm()) {
    return; // Stop if form is invalid
  }

  if (modalData.value) {
    store.dispatch('course/updateCourse', {
      ...courseForm.value,
      id: modalData.value.id,
    });
  } else {
    store.dispatch('course/addCourse', courseForm.value);
  }
  handleCloseModal();  
};

const handleCloseModal = () => {
  store.dispatch('modal/closeModal');
  resetForm();  
};
</script>
