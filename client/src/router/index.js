import { createRouter, createWebHistory } from 'vue-router';
import Swal from 'sweetalert2';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'account',
          name: 'AdminAccount',
          component: () => import('@/views/admin/AdminAccount.vue'),
        },
        {
          path: 'course',
          name: 'AdminCourse',
          component: () => import('@/views/admin/AdminCourse.vue'),
        },
        {
          path: 'exam/:id',
          name: 'AdminExam',
          component: () => import('@/views/admin/AdminExam.vue'),
        },
        {
          path: 'questions/:id',
          name: 'AdminQuestion',
          component: () => import('@/views/admin/AdminQuestion.vue'),
        },
        {
          path: 'subject/:id',
          name: 'AdminSubject',
          component: () => import('@/views/admin/AdminSubject.vue'),
        },
      ],
      meta: {
        requiresAuth: true,
        adminOnly: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'UserHome',
          component: () => import('@/views/user/Home.vue'),
        },
        {
          path: 'course',
          name: 'UserCourse',
          component: () => import('@/views/user/Course.vue'),
        },
        {
          path: 'subject/:id',
          name: 'UserSubject',
          component: () => import('@/views/user/Subject.vue'),
        },
        {
          path: 'exam/:id',
          name: 'UserExam',
          component: () => import('@/views/user/Exam.vue'),
        },
        {
          path: 'contest/:id',
          name: 'UserContest',
          component: () => import('@/views/user/Contest.vue'),
        },
        {
          path: 'test/:id',
          name: 'UserTest',
          component: () => import('@/views/user/Test.vue'),
          meta: { requiresAuth: true }, 
        },
        {
          path: 'result/:id',
          name: 'UserResult',
          component: () => import('@/views/user/Result.vue'),
        },
        {
          path: 'profile',
          name: 'UserProfile',
          component: () => import('@/views/user/Profile.vue'),
        },
        {
          path: 'history',
          name: 'UserHistory',
          component: () => import('@/views/user/History.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('keyLogin'); 
  const isAdmin = localStorage.getItem('userRole') === 'true'; 

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Yêu cầu đăng nhập',
        text: 'Vui lòng đăng nhập để tiếp tục.',
      });
      return; 
    }
    if (to.meta.adminOnly && !isAdmin) {
      Swal.fire({
        icon: 'error',
        title: 'Truy cập bị từ chối',
        text: 'Bạn không có quyền truy cập vào khu vực quản trị.',
      });
      return; 
    }
  }
  next();
});

export default router;
