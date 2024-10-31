import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { SearchOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import '@fortawesome/fontawesome-free/css/all.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faBuilding, faUsers, faShop, faCircleInfo, 
  faShieldHalved, faTruckFast, faBlog, 
  faCircleQuestion, faHandshake, faHeart 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, faTwitter, faGithub, faInstagram 
} from '@fortawesome/free-brands-svg-icons';
library.add(
  faBuilding, faUsers, faShop, faCircleInfo, 
  faShieldHalved, faTruckFast, faBlog, 
  faCircleQuestion, faHandshake, faHeart,
  faFacebook, faTwitter, faGithub, faInstagram
);

const app = createApp(App)
app.component('SearchOutlined', SearchOutlined);
app.component('CaretUpOutlined', CaretUpOutlined);
app.component('CaretDownOutlined', CaretDownOutlined);
app.use(router)
app.use(store)
app.mount('#app')
