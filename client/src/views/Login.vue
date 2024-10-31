<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="mt-12 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">Login</h1>
          <div class="w-full flex-1 mt-8">
            <div class="flex flex-col items-center">
              <button
                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                <div class="bg-white p-2 rounded-full">
                  <svg class="w-4" viewBox="0 0 533.5 544.3">
                    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
                    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
                    <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/>
                    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/>
                  </svg>
                </div>
                <span class="ml-4"> Login with Google </span>
              </button>

              <button
                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
              >
                <div class="bg-white p-1 rounded-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_(2019).svg/1365px-Facebook_f_logo_(2019).svg.png"
                    class="w-6"
                    alt="Facebook Logo"
                  />
                </div>
                <span class="ml-4"> Login with Facebook </span>
              </button>
            </div>

            <div class="my-12 border-b text-center">
              <div
                class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
              >
                Or login with e-mail
              </div>
            </div>

            <div class="mx-auto max-w-xs">
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <input
                  v-model="email"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                />
                <div v-if="errors.email" class="text-red-500 text-sm text-center">
                  {{ errors.email }}
                </div>
              </div>

              <div class="sm:col-span-2 mt-5">
                <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
                <input
                  v-model="password"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                />
                <div v-if="errors.password" class="text-red-500 text-sm text-center">
                  {{ errors.password }}
                </div>
              </div>

              <button
                @click="handleSubmit"
                class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span> Login </span>
              </button>
              <p class="mt-10 text-center text-sm text-gray-700">
                Don't have an account?
                <router-link to="/register" class="font-semibold text-indigo-500 hover:text-indigo-800">Sign up here</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import router from '@/router';

const email = ref('');
const password = ref('');
const errors = ref({});

const handleSubmit = async (e) => {
  e.preventDefault();

  // Kiểm tra lỗi nhập
  const formErrors = {};
  if (!email.value) formErrors.email = 'Email không được để trống';
  if (!password.value) formErrors.password = 'Mật khẩu không được để trống';

  if (Object.keys(formErrors).length > 0) {
    errors.value = formErrors;
    return;
  }

  try {
    // Gọi API để lấy danh sách người dùng
    const response = await axios.get('http://localhost:3000/accounts');
    const users = response.data;

    // Tìm người dùng có email trùng khớp
    const currentUser = users.find((user) => user.email === email.value);
  console.log(currentUser);
    if (currentUser) {
      const decryptedPassword = CryptoJS.DES.decrypt(
  currentUser.password,
  "secret_key"
).toString(CryptoJS.enc.Utf8);
      
      
      if (decryptedPassword === password.value) {
        if (currentUser.lock === 'lock') {
          Swal.fire({
            icon: 'error',
            title: 'Tài khoản bị khóa',
            text: 'Tài khoản này đã bị khóa!',
          });
        } else {
          localStorage.setItem('keyLogin', currentUser.id);
          localStorage.setItem('userRole', currentUser.role);
          await axios.patch(`http://localhost:3000/accounts/${currentUser.id}`, { status: 1 });
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công',
            text: 'Bạn đã đăng nhập thành công!',
          }).then(() => {
            router.push('/user/home'); 
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Tài khoản hoặc mật khẩu không đúng!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Tài khoản hoặc mật khẩu không đúng!',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Có lỗi xảy ra trong quá trình đăng nhập!',
    });
  }
};

</script>
  

  