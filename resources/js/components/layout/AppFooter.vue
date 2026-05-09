<template>
    <div class="layout-footer">
        <div>
            <span>PrimeVue {{ version }} on Vue 3 by </span>
            <a href="https://www.primetek.com.tr" target="_blank" rel="noopener noreferrer">PrimeTek</a>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            version: __APP_VERSION__
        };
    }
};
</script>
