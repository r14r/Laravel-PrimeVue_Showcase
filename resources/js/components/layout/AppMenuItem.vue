<template>
    <li v-for="(menuitem, index) in menu" :key="`_root${index}`">
        <button
            v-if="menuitem.children && root"
            v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-slideup'
            }"
            type="button"
        >
            <span class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <span class="menu-toggle">
                <Tag v-if="menuitem.badge" :value="menuitem.badge" />
                <i class="menu-toggle-icon pi pi-angle-down"></i>
            </span>
        </button>

        <a
            v-if="menuitem.href"
            :href="menuitem.href"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span v-if="menuitem.icon && root" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge" />
        </a>

        <RouterLink
            v-if="menuitem.to"
            :to="menuitem.to"
            :class="{ 'router-link-active': menuitem.to === $route.fullPath }"
        >
            <span v-if="menuitem.icon && root" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge" />
        </RouterLink>

        <span v-if="!root && menuitem.children" class="menu-child-category">
            {{ menuitem.name }}
        </span>

        <div
            v-if="menuitem.children"
            :class="{ hidden: menuitem.children && root && isActiveRootMenuItem(menuitem) }"
        >
            <ol>
                <AppMenuItem :root="false" :menu="menuitem.children" />
            </ol>
        </div>
    </li>
</template>

<script>
import Tag from 'primevue/tag';
import StyleClass from 'primevue/styleclass';

export default {
    name: 'AppMenuItem',

    components: {
        Tag
    },

    directives: {
        styleclass: StyleClass
    },

    props: {
        root: {
            type: Boolean,
            default: true
        },
        menu: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        isActiveRootMenuItem(menuitem) {
            if (!menuitem.children) {
                return false;
            }

            const currentPath = this.$route.fullPath;

            return !menuitem.children.some((item) => {
                if (item.to === currentPath) {
                    return true;
                }

                if (item.children) {
                    return item.children.some((child) => child.to === currentPath);
                }

                return false;
            });
        }
    }
};
</script>