import { createApp } from 'vue'
import App from './App.vue'
import helperFunc from './helper/func'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import router from './router'

const app = createApp(App)

app.mixin(helperFunc)
app.use(router)

setTimeout(() => {
    app.mount('#app')
}, 1000)
