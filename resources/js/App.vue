<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import { markRaw } from 'vue';

import EventBus from './app/AppEventBus';
import DefaultLayout from './layouts/default.vue';
import CustomLayout from './layouts/custom.vue';

const layouts = {
    default: markRaw(DefaultLayout),
    custom: markRaw(CustomLayout)
};

export default {
    name: 'App',

    data() {
        return {
            currentLayout: layouts.default
        };
    },

    watch: {
        $route: {
            immediate: true,
            handler(route) {
                this.currentLayout = route.meta?.layout === 'custom'
                    ? layouts.custom
                    : layouts.default;
            }
        }
    },

    mounted() {
        EventBus.on('dark-mode-toggle', this.darkModeToggleListener);
    },

    beforeUnmount() {
        EventBus.off('dark-mode-toggle', this.darkModeToggleListener);
    },

    methods: {
        darkModeToggleListener(event) {
            if (!document.startViewTransition) {
                this.toggleDarkMode(event);
                return;
            }

            document.startViewTransition(() => this.toggleDarkMode(event));
        },

        toggleDarkMode(event) {
            const isDark = event.dark;

            if (isDark) {
                document.documentElement.classList.add('p-dark');
            } else {
                document.documentElement.classList.remove('p-dark');
            }

            this.$appState.darkTheme = isDark;
            EventBus.emit('dark-mode-toggle-complete');
        }
    }
};
</script>