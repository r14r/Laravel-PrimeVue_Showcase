<template>
    <!-- keep your existing template -->
</template>

<script>
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
    components: {
        DataTable,
        Column,
        Button,
        Tag,
        ProgressBar,
        InputText,
        IconField,
        InputIcon
    },

    data() {
        return {
            customers: [],
            selectedCustomers: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
                },
                'country.name': {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
                },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                date: {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
                },
                balance: {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
                },
                status: {
                    operator: FilterOperator.OR,
                    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
                },
                activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            loading: true
        };
    },

    mounted() {
        CustomerService.getCustomersLarge().then((data) => {
            this.customers = data;
            this.customers.forEach((customer) => {
                customer.date = new Date(customer.date);
            });
            this.loading = false;
        });
    },

    methods: {
        formatDate(value) {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },

        formatCurrency(value) {
            return value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        },

        getSeverity(status) {
            switch (status) {
                case 'unqualified':
                    return 'danger';
                case 'qualified':
                    return 'success';
                case 'new':
                    return 'info';
                case 'negotiation':
                    return 'warn';
                case 'renewal':
                    return null;
                default:
                    return null;
            }
        }
    }
};
</script>