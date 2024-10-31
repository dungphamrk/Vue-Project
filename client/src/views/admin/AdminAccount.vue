<template>
  <div class="admin-account-list bg-gray-100 p-6">
    <div class="flex justify-between p-3 bg-slate-400">
      <h2 class="text-xl font-semibold mb-4">Danh sách người dùng</h2>
      <div class="w-3/5 flex justify-center">
        <label class="text-2xl p-3" for="search">
          <SearchOutlined />
        </label>
        <input
          type="text"
          name="search"
          v-model="searchQuery"
          class="w-2/3 h-12 border-black border-[1px] p-3"
          placeholder="Tìm kiếm"
        />
      </div>
    </div>

    <Modal v-if="modalOpen">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Tên đăng nhập</label
        >
        <input
          type="text"
          v-model="accountForm.accountName"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="accountForm.email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
   
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Trạng thái người dùng</label
        >
        <select
          v-model="accountForm.status"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="true">Active</option>
          <option value="false">Block</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          v-model="accountForm.password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Vai trò</label>
        <select
          v-model="accountForm.role"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="true">Admin</option>
          <option value="false">account</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Số điện thoại</label
        >
        <input
          type="text"
          v-model="accountForm.phone"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
        <input
          type="text"
          v-model="accountForm.address"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <button
        type="button"
        @click="handleSaveAccount"
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
    </Modal>

    <div class="overflow-x-auto">
      <div class="min-w-full bg-white">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th
                @click="toggleSort('id')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                ID
                <span v-if="sortField === 'id'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                @click="toggleSort('accountname')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Tên đăng nhập
                <span v-if="sortField === 'accountname'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                @click="toggleSort('email')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Email
                <span v-if="sortField === 'email'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                @click="toggleSort('phone')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Số điện thoại
                <span v-if="sortField === 'phone'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                @click="toggleSort('status')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Trạng thái người dùng
                <span v-if="sortField === 'status'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                @click="toggleSort('role')"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Vai trò
                <span v-if="sortField === 'role'">
                  <CaretUpOutlined
                    v-if="sortDirection === 'asc'"
                    class="ml-1"
                  />
                  <CaretDownOutlined v-else class="ml-1" />
                </span>
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="account in filteredAccounts" :key="account.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  @click="toggleStatus(account.id)"
                  :class="
                    account.status
                      ? 'inline-block px-3 py-2 bg-green-600 text-white rounded-lg'
                      : 'inline-block px-3 py-2 bg-red-600 text-white rounded-lg'
                  "
                >
                  {{ account.status ? "Active" : "Block" }}
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  @click="toggleRole(account.id)"
                  :class="
                    account.role
                      ? 'inline-block px-3 py-2 bg-green-300 text-green-800 rounded-lg'
                      : 'inline-block px-3 py-2 bg-yellow-300 text-yellow-800 rounded-lg'
                  "
                >
                  {{ account.role ? "Admin" : "User" }}
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="openModal()"
                  class=" inline-block px-2 py-1 rounded-lg bg-orange-600 text-white ">
                    Xem thông tin 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-between p-3 bg-gray-200">
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-700">
          Trang {{ currentPage }} / {{ totalPages }}
        </span>
      </div>
      <div class="flex items-center space-x-1">
        <button
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="{
            'bg-gray-300 text-gray-600 cursor-not-allowed':
              currentPage === 1,
            'bg-white hover:bg-gray-100 text-gray-700':
              currentPage !== 1,
          }"
          class="px-3 py-2 rounded-l-md"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div v-for="page in pageButtons" :key="page.key">
          <button
            @click.prevent="handlePageChange(page.number)"
            :class="page.class"
          >
            {{ page.number !== "..." ? page.number : "..." }}
          </button>
        </div>

        <button
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="{
            'bg-gray-300 text-gray-600 cursor-not-allowed':
              currentPage === totalPages,
            'bg-white hover:bg-gray-100 text-gray-700':
              currentPage !== totalPages,
          }"
          class="px-3 py-2 rounded-r-md"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import swal from "sweetalert";

const store = useStore();
const accounts = computed(() => store.state.account.account);
const totalPages = computed(() => store.state.account.totalPages);
console.log(totalPages.value);

const modalOpen = computed(() => store.state.account.modalOpen);
const accountForm = ref({
  id: 0,
  name: "",
  email: "",
  phone: "",
  status: false,
  password: "",
  role: false,
  avatar: "",
  created_at: "",
  updated_at: "",
});

const sortField = ref("id");
const sortDirection = ref("asc");
const searchQuery = ref("");
const currentPage = ref(1);

const ITEMS_PER_PAGE = 7;

onMounted(() => {
  store.dispatch("account/fetchPaginatedAccounts", {
    page: currentPage.value,
    limit: ITEMS_PER_PAGE,
  });
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  accountForm.value[name] = value;
};

const handleSaveAccount = () => {
  if (currentAccountId.value !== null) {
    store.dispatch("updateAccount", {
      ...accountForm.value,
      id: currentAccountId.value,
    });
  }
  store.dispatch("closeModal");
  resetForm();
};

const handleEditAccount = (account) => {
  currentAccountId.value = account.id;
  accountForm.value = { ...account };
  store.dispatch("openModal");
};

const handleDeleteAccount = (id) => {
  store.dispatch("account/deleteAccount", id);
};

const handleCloseModal = () => {
  store.dispatch("closeModal");
  resetForm();
};

const toggleSort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
};

const sortedAccounts = computed(() => {
  return [...accounts.value].sort((a, b) => {
    if (a[sortField.value] < b[sortField.value])
      return sortDirection.value === "asc" ? -1 : 1;
    if (a[sortField.value] > b[sortField.value])
      return sortDirection.value === "asc" ? 1 : -1;
    return 0;
  });
});

const filteredAccounts = computed(() => {
  return sortedAccounts.value.filter((account) =>
    account.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    store.dispatch("account/fetchPaginatedAccounts", {
      page: currentPage.value,
      limit: ITEMS_PER_PAGE,
    });
  }
};

const toggleStatus = (id) => {
  swal({
    title: "Cảnh báo?",
    text: "Bạn sẽ khóa tài khoản này!",
    icon: "warning",
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const account = accounts.value.find((item) => item.id === id);
      store.dispatch("account/updateAccount", {
        ...account,
        status: !account.status,
      });
    } else {
      swal("Your account is safe!");
    }
  });
};

const toggleRole = (id) => {
  swal({
    title: "Cảnh báo?",
    text: "Đổi role của tài khoản này!",
    icon: "warning",
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const account = accounts.value.find((item) => item.id === id);
      store.dispatch("account/updateAccount", {
        ...account,
        role: !account.role,
      });
    } else {
      swal("Your account is safe!");
    }
  });
};

const resetForm = () => {
  accountForm.value = {
    id: 0,
    name: "",
    email: "",
    status: false,
    password: "",
    role: false,
    avatar: "",
    phone: "",
    created_at: "",
    updated_at: "",
  };
  currentAccountId.value = null;
};
const pageButtons = computed(() => {
  const buttons = [];
  const delta = 2;
    console.log(totalPages.value);
    
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      buttons.push({
        key: i,
        number: i,
        class:
          currentPage.value === i
            ? "relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
      });
    } else if (
      i === currentPage.value - delta - 1 ||
      i === currentPage.value + delta + 1
    ) {
      buttons.push({
        key: i,
        number: "...",
        class:
          "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0",
      });
    }
  }
  return buttons;
});
</script>
