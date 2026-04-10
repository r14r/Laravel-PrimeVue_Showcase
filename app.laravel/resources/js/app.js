import 'primeicons/primeicons.css';
import { createApp, reactive } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createHead } from '@unhead/vue/client';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import AppTheme from './themes/app-theme';
import CodeHighlight from './directives/CodeHighlight';
import DeferredDemo from './components/demo/DeferredDemo.vue';
import PrimeVueNuxtLink from './components/layout/PrimeVueNuxtLink';
import { routes } from './router';
import App from './App.vue';

const AppState = {
    install(app) {
        app.config.globalProperties.$appState = reactive({
            preset: 'Aura',
            primary: 'noir',
            surface: null,
            darkTheme: false,
            codeSandbox: false,
            sourceType: 'options-api',
            newsActive: false,
            announcement: null,
            storageKey: 'primevue',
            designer: {
                verified: false,
                csrfToken: null,
                themeLimit: null,
                active: false,
                activeView: 'dashboard',
                activeTab: '0',
                theme: { key: null, name: null, preset: null, config: null },
                acTokens: [],
                themes: []
            }
        });
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { top: 0 };
    }
});

const head = createHead();
const app = createApp(App);

app.use(head);
app.use(AppState);
app.use(PrimeVue, { theme: AppTheme });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);

app.directive('code', CodeHighlight);
app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.component('DeferredDemo', DeferredDemo);
app.component('PrimeVueNuxtLink', PrimeVueNuxtLink);

app.mount('#app');
