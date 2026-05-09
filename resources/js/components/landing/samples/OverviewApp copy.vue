<template>
    <div class="p-6">
        <div class="text-2xl font-semibold mb-4">Overview</div>

        <div class="flex gap-3 mb-6">
            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText v-model="search" placeholder="Search" />
            </IconField>

            <Button label="Download" icon="pi pi-download" />
        </div>

        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

export default {
    name: 'Overview',

    components: {
        Chart,
        Button,
        IconField,
        InputIcon,
        InputText
    },

    data() {
        return {
            search: '',
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [12000, 19000, 3000, 5000, 2000, 3000]
                    }
                ]
            },
            chartOptions: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        };
    }
};
</script>