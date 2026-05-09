<template>
    <div class="flex-1 h-full overflow-y-auto pb-0.5">
        <div class="flex flex-wrap gap-4 items-start justify-between p-1">
            <div class="flex-1">
                <div class="text-muted-color font-medium leading-normal">Overview</div>
                <div class="text-color text-3xl font-semibold leading-normal">Welcome to PrimeVue</div>
            </div>
            <div class="flex gap-2 whitespace-nowrap flex-nowrap">
                <IconField>
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText placeholder="Search" />
                </IconField>
                <Button severity="secondary" variant="outlined">
                    <OverlayBadge
                        severity="danger"
                        :pt="{
                            pcbadge: {
                                root: {
                                    class: '!min-w-0 !w-2.5 !h-2.5'
                                }
                            }
                        }"
                    >
                        <i class="pi pi-bell" />
                    </OverlayBadge>
                </Button>
            </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-6 items-center justify-between p-1">
            <SelectButton v-model="selectedTime" :options="timeOptions" aria-labelledby="basic" :allowEmpty="false" @change="changeSelect" />
            <div class="flex items-center gap-2">
                <Button label="Download" icon="pi pi-download" iconPos="right" />
                <DatePicker v-model="dates" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" placeholder="06/11/2024 - 06/22/2024" />
            </div>
        </div>
        <div class="flex flex-col gap-6 mt-6">
            <div class="w-full border border-surface rounded-2xl py-5 px-7 flex flex-col justify-between">
                <div class="flex items-center gap-6 mb-6">
                    <div class="flex-1 text-color font-semibold leading-6">Crypto Analytics</div>
                    <div class="flex items-center gap-5">
                        <div v-for="(item, index) in chartData?.datasets" :key="index" class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.backgroundColor }"></div>
                            <span class="font-medium text-color leading-6">{{ item.label }}</span>
                        </div>
                    </div>
                </div>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
            </div>
            <div class="flex gap-6 xl:flex-row flex-col">
                <div class="flex-1 border border-surface rounded-2xl py-5 px-7">
                    <div class="flex items-center gap-6 mb-4">
                        <div class="flex-1 text-color font-semibold leading-6">Transactions</div>
                        <Button type="button" icon="pi pi-ellipsis-h" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
                    </div>
                    <DataTable
                        :value="sampleAppsTableDatas"
                        paginator
                        :rows="5"
                        dataKey="id"
                        tableClass="overflow-x-auto dark:bg-surface-950"
                        paginatorTemplate="PrevPageLink PageLinks NextPageLink  CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        pt:pcpaginator:root="!bg-transparent"
                        :dt="{
                            header: {
                                background: 'transparent'
                            },
                            headerCell: {
                                background: 'transparent'
                            },
                            row: {
                                background: 'transparent'
                            }
                        }"
                    >
                        <Column header="Id" class="w-1/12">
                            <template #body="slotProps">
                                <div class="text-muted-color">{{ slotProps.data.id }}</div>
                            </template>
                        </Column>
                        <Column header="Name" class="w-1/4">
                            <template #body="slotProps">
                                <div class="flex items-center">
                                    <Avatar :label="slotProps.data.name.label" class="mr-2 text-xs font-medium" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                                    <div class="leading-6 text-muted-color flex-1">{{ slotProps.data.name.text }}</div>
                                </div>
                            </template>
                        </Column>
                        <Column header="Coin" class="w-1/6">
                            <template #body="slotProps">
                                <div class="flex items-center">
                                    <i
                                        :class="[
                                            {
                                                'pi pi-bitcoin text-yellow-500 !text-3xl': slotProps.data.coin !== 'btc',
                                                'pi pi-ethereum bg-surface-950 text-surface-0 dark:bg-surface-0 dark:text-surface-950 w-7 h-7 rounded-full flex items-center justify-center': slotProps.data.coin !== 'eth'
                                            }
                                        ]"
                                    ></i>
                                </div>
                            </template>
                        </Column>
                        <Column header="Date" class="w-1/6">
                            <template #body="slotProps">
                                <div class="text-muted-color">{{ slotProps.data.date }}</div>
                            </template>
                        </Column>
                        <Column header="Process" class="w-1/6">
                            <template #body="slotProps">
                                <Tag :severity="slotProps.data.process.type" :value="slotProps.data.process.value" class="font-medium"></Tag>
                            </template>
                        </Column>
                        <Column header="Amount" class="w-1/6">
                            <template #body="slotProps">
                                <div class="text-muted-color text-right">{{ slotProps.data.amount }}</div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="xl:w-96 border border-surface rounded-2xl py-5 px-7 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-6 mb-6">
                            <div class="flex-1 text-color font-semibold leading-6">My Wallet</div>
                            <Button type="button" icon="pi pi-ellipsis-h" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                            <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
                        </div>
                        <MeterGroup :value="metersData" labelPosition="end">
                            <template #label="{ value }">
                                <div class="flex flex-col gap-6 mt-4">
                                    <template v-for="val of value" :key="val.label">
                                        <div class="flex items-center gap-2">
                                            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: val.color }"></div>
                                            <div class="text-color uppercase font-medium leading-6 flex-1">
                                                {{ val.label }}
                                                <span class="text-muted-color">({{ val.value }}%)</span>
                                            </div>
                                            <div class="leading-6 font-medium text-color">{{ val.text }}</div>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </MeterGroup>
                    </div>
                    <Button label="Show All" variant="outlined" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@/app/AppEventBus';

import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import MeterGroup from 'primevue/metergroup';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import SelectButton from 'primevue/selectbutton';
import DatePicker from 'primevue/datepicker';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import OverlayBadge from 'primevue/overlaybadge';

export default {
    name: 'Overview',

    components: {
        Chart,
        DataTable,
        Column,
        Button,
        Tag,
        MeterGroup,
        Menu,
        Avatar,
        SelectButton,
        DatePicker,
        IconField,
        InputIcon,
        InputText,
        OverlayBadge
    },

    data() {
        return {
            chartData: {},
            chartOptions: {},
            dates: [],
            selectedTime: 'Monthly',
            timeOptions: ['Weekly', 'Monthly', 'Yearly'],
            menuItems: [
                { label: 'Refresh', icon: 'pi pi-refresh' },
                { label: 'Export', icon: 'pi pi-upload' }
            ],
            sampleAppsTableDatas: [
                { id: '#1254', name: { text: 'Amy Yelsner', label: 'AY' }, coin: 'btc', date: 'May 5th', process: { type: 'success', value: 'Buy' }, amount: '3.005 BTC' },
                { id: '#2355', name: { text: 'Anna Fali', label: 'AF' }, coin: 'eth', date: 'Mar 17th', process: { type: 'success', value: 'Buy' }, amount: '0.050 ETH' }
            ],
            metersData: [
                { label: 'BTC', color: '#F59E0B', value: 15, text: '27.215' },
                { label: 'ETH', color: '#717179', value: 5, text: '4.367' },
                { label: 'GBP', color: '#22C55E', value: 25, text: '£ 147.562,32' },
                { label: 'EUR', color: '#84CC16', value: 11, text: '€ 137.457,25' },
                { label: 'USD', color: '#14B8A6', value: 29, text: '$ 133.364,12' },
                { label: 'XAU', color: '#EAB308', value: 29, text: '200 g' }
            ],
            redrawListener: null
        };
    },

    mounted() {
        this.chartData = this.setChartData(this.selectedTime);
        this.chartOptions = this.setChartOptions();

        this.redrawListener = () => {
            this.chartData = this.setChartData(this.selectedTime);
            this.chartOptions = this.setChartOptions();
        };

        EventBus.on('dark-mode-toggle-complete', this.redrawListener);
        EventBus.on('theme-palette-change', this.redrawListener);
    },

    beforeUnmount() {
        if (this.redrawListener) {
            EventBus.off('dark-mode-toggle-complete', this.redrawListener);
            EventBus.off('theme-palette-change', this.redrawListener);
        }
    },

    methods: {
        changeSelect() {
            if (this.redrawListener) {
                this.redrawListener();
            }
        },

        toggle(event) {
            this.$refs.menu?.toggle(event);
        },

        createDatasets(val) {
            if (val === 'Weekly') {
                return {
                    labels: ['6 May', '13 May', '20 May', '27 May', '3 June', '10 June', '17 June', '24 June', '1 July', '8 July', '15 July', '22 July'],
                    data: [
                        [9000, 3000, 13000, 3000, 5000, 17000, 11000, 4000, 15000, 4000, 11000, 5000],
                        [1800, 7600, 11100, 6800, 3300, 5800, 3600, 7200, 4300, 8100, 6800, 3700],
                        [3800, 4800, 2100, 6600, 1000, 3800, 6500, 4200, 4300, 7000, 6800, 3700]
                    ]
                };
            }

            if (val === 'Yearly') {
                return {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                    data: [
                        [4500, 10500, 15500, 4500, 16500, 8500],
                        [2250, 8700, 2550, 7650, 3850, 6650],
                        [4350, 5450, 2650, 7650, 2550, 4350]
                    ]
                };
            }

            return {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                data: [
                    [4000, 10000, 15000, 4000, 16000, 8000, 12000, 14000, 17000, 5000, 12000, 6000],
                    [2100, 8400, 2400, 7500, 3700, 6500, 7400, 8000, 4800, 9000, 7600, 4200],
                    [4100, 5200, 2400, 7400, 2300, 4100, 7200, 8000, 4800, 9000, 7600, 4200]
                ]
            };
        },

        setChartData(timeUnit) {
            const datasets = this.createDatasets(timeUnit);
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: datasets.labels,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Personal Wallet',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                        hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-600'),
                        data: datasets.data[0],
                        barThickness: 32
                    },
                    {
                        type: 'bar',
                        label: 'Corporate Wallet',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                        hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                        data: datasets.data[1],
                        barThickness: 32
                    },
                    {
                        type: 'bar',
                        label: 'Investment Wallet',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                        hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                        data: datasets.data[2],
                        borderRadius: { topLeft: 8, topRight: 8 },
                        borderSkipped: true,
                        barThickness: 32
                    }
                ]
            };
        },

        setChartOptions() {
            const darkMode = this.$appState.darkTheme;
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    tooltip: {
                        enabled: true
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: darkMode ? documentStyle.getPropertyValue('--p-surface-500') : documentStyle.getPropertyValue('--p-surface-400')
                        },
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true,
                        ticks: {
                            color: darkMode ? documentStyle.getPropertyValue('--p-surface-500') : documentStyle.getPropertyValue('--p-surface-400')
                        },
                        grid: {
                            color: darkMode ? documentStyle.getPropertyValue('--p-surface-900') : documentStyle.getPropertyValue('--p-surface-100')
                        },
                        border: {
                            display: false
                        }
                    }
                }
            };
        }
    }
};
</script>