<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import EventBus from './app/AppEventBus';
import DefaultLayout from './layouts/default.vue';
import CustomLayout from './layouts/custom.vue';

export default {
    components: {
        DefaultLayout,
        CustomLayout
    },
    data() {
        return {
            currentLayout: DefaultLayout
        };
    },
    watch: {
        $route: {
            immediate: true,
            handler(route) {
                if ((route.meta || {}).layout === 'custom') {
                    this.currentLayout = CustomLayout;
                } else {
                    this.currentLayout = DefaultLayout;
                }
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
            if (isDark) document.documentElement.classList.add('p-dark');
            else document.documentElement.classList.remove('p-dark');
            this.$appState.darkTheme = isDark;
            EventBus.emit('dark-mode-toggle-complete');
        }
    }
};
</script>
