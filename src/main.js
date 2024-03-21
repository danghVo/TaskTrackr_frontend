import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon  } from "@fortawesome/vue-fontawesome"
import * as icon from '@fortawesome/free-solid-svg-icons'

import './assets/base.css'

library.add(icon.faCircleUser, icon.faGear, icon.faPen, icon.faTrash, icon.faPlus, icon.faX, icon.faArrowCircleLeft, icon.faMagnifyingGlass, icon.faCheck, icon.faStar, icon.faCircle, icon.faEllipsisVertical, icon.faCircleCheck, icon.faInfo, icon.faListCheck, icon.faArrowsRotate)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon )

app.use(router)

app.mount('#app')
