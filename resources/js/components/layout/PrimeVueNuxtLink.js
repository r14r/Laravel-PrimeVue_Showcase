import { h, resolveComponent } from 'vue';

const PrimeVueNuxtLink = {
    name: 'PrimeVueNuxtLink',
    props: {
        to: {
            type: [String, Object],
            required: true
        }
    },
    setup(props, { slots, attrs }) {
        return () => {
            const RouterLink = resolveComponent('RouterLink');
            const href =
                typeof props.to === 'string'
                    ? props.to.endsWith('/')
                        ? props.to
                        : props.to + '/'
                    : props.to;
            return h(RouterLink, { to: href, ...attrs }, slots);
        };
    }
};

export default PrimeVueNuxtLink;
