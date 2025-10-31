// main-vue.js
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";

export function mountVueApp(selector) {
    const app = createApp(App);
    app.use(vuetify);
    app.mount(selector);
}
