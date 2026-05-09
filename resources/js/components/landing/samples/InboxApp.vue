<template>
    <div class="flex gap-4 h-full flex-1 w-full overflow-auto">
        <div class="w-64 h-full overflow-hidden border border-surface rounded-2xl flex flex-col">
            <div class="flex items-center justify-between gap-2 p-4 border-b border-surface">
                <div class="text-xl font-medium leading-7 text-color">Mails</div>
                <Button icon="pi pi-plus" class="w-8 h-8" />
            </div>
            <div class="flex-1 flex flex-col overflow-auto justify-between gap-4 pt-4 pb-4 px-4">
                <div class="flex-1 overflow-auto flex flex-col gap-2">
                    <div v-for="(navData, i) of inboxNavs" :key="i" class="flex flex-col gap-2">
                        <div class="text-sm font-medium leading-5 text-surface-400 dark:text-surface-500">{{ navData.title }}</div>
                        <button
                            v-for="(nav, j) of navData.navs"
                            :key="j"
                            @click="activeInboxNav = nav.name"
                            :class="activeInboxNav === nav.name ? 'text-color bg-emphasis' : 'text-muted-color bg-transparent'"
                            class="px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-emphasis transition-all"
                        >
                            <i :class="nav.icon"></i>
                            <span class="font-medium">{{ nav.name }}</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div class="border border-surface rounded-border px-4 pb-4 pt-3 mb-4">
                        <div class="font-medium text-color mb-4">Free Version</div>
                        <ProgressBar
                            :value="75"
                            :pt="{
                                value: {
                                    class: 'bg-red-600'
                                }
                            }"
                        >
                            <span class="w-full text-center text-sm font-normal text-primary-contrast leading-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">4 days left</span>
                        </ProgressBar>
                    </div>
                    <Button label="Upgrade to PRO 🚀" variant="outlined" class="w-full" />
                </div>
            </div>
        </div>
        <div class="flex-1 h-full overflow-hidden flex border border-surface rounded-2xl">
            <DataTable
                v-model:selection="selectedRows"
                scrollable
                :value="tableData"
                :rows="10"
                :pt="{
                    root: {
                        class: 'w-full flex-1 overflow-x-auto'
                    },
                    thead: {
                        class: 'hidden'
                    },
                    header: {
                        class: 'sticky top-0 z-10'
                    },
                    column: {
                        bodyCell: {
                            class: '!border-transparent'
                        }
                    }
                }"
                :dt="{
                    headerCell: {
                        background: 'transparent'
                    },
                    row: {
                        background: 'transparent'
                    }
                }"
            >
                <template #header>
                    <div class="flex xl:items-center justify-between gap-2 flex-col xl:flex-row">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="checked" :binary="true" class="mr-1" @update:modelValue="onSelectionChange" />
                            <Button icon="pi pi-envelope" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-exclamation-circle" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-tag" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-inbox" label="Archive" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-trash" label="Trash" variant="outlined" severity="secondary" />
                        </div>
                        <div class="flex items-center gap-2">
                            <IconField class="w-6/12 xl:max-w-36">
                                <InputIcon class="pi pi-search"> </InputIcon>
                                <InputText v-model="search" placeholder="Search" class="w-full" />
                            </IconField>
                            <Button icon="pi pi-filter" variant="outlined" severity="secondary" />
                            <Divider layout="vertical" class="m-0" />
                            <Button icon="pi pi-refresh" variant="outlined" severity="secondary" />
                            <Button label="1 of 15" class="!whitespace-nowrap" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-chevron-left" variant="outlined" severity="secondary" />
                            <Button icon="pi pi-chevron-right" variant="outlined" severity="secondary" />
                        </div>
                    </div>
                </template>
                <template #empty>Inbox is empty.</template>
                <Column selectionMode="multiple" headerStyle="width: 1rem" style="width: 1rem"></Column>
                <Column field="bookmarked" headerStyle="width: 1rem" style="width: 1rem; padding: 0.5rem">
                    <template #body="{ data }">
                        <div @click="data.bookmarked = !data.bookmarked" @click.stop>
                            <i :class="data.bookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"></i>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex items-center">
                            <OverlayBadge severity="danger" class="w-fit">
                                <Avatar
                                    v-bind="data.image ? { image: data.image } : { label: data.capName }"
                                    :class="{
                                        'bg-violet-100 text-violet-950 text-xs font-medium': !data.image
                                    }"
                                    class="rounded-md overflow-hidden flex"
                                />
                            </OverlayBadge>
                            <div class="ml-4 leading-6 text-color font-medium">{{ data.name }}</div>
                        </div>
                    </template>
                </Column>
                <Column field="title" style="min-width: 14rem; max-width: 20rem">
                    <template #body="{ data }">
                        <div class="truncate">
                            <span class="text-color leading-6 mr-2">{{ data.title }}</span>
                            <span class="text-muted-color leading-5 text-sm">{{ data.message }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="type" style="width: 4rem">
                    <template #body="{ data }">
                        <Tag v-if="data.type" severity="secondary" :value="data.type" class="font-medium"></Tag>
                    </template>
                </Column>
                <Column field="time" style="width: 4rem">
                    <template #body="{ data }">
                        <div class="text-right text-sm leading-5 text-muted-color">{{ data.time }}</div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import OverlayBadge from 'primevue/overlaybadge';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';

export default {
    name: 'Inbox',

    components: {
        Button,
        ProgressBar,
        DataTable,
        Column,
        Checkbox,
        IconField,
        InputIcon,
        InputText,
        Divider,
        OverlayBadge,
        Avatar,
        Tag
    },

    data() {
        return {
            checked: false,
            search: '',
            activeInboxNav: 'Inbox',
            selectedRows: [],

            // keep your existing inboxNavs here
            inboxNavs: [
                {
                    title: 'Navigation',
                    navs: [
                        { name: 'Inbox', icon: 'pi pi-inbox' },
                        { name: 'Starry', icon: 'pi pi-star' },
                        { name: 'Drafts', icon: 'pi pi-file-o' },
                        { name: 'Important', icon: 'pi pi-file-import' },
                        { name: 'Sent', icon: 'pi pi-send' },
                        { name: 'Archive', icon: 'pi pi-inbox' },
                        { name: 'Spam', icon: 'pi pi-info-circle' },
                        { name: 'Trash', icon: 'pi pi-trash' }
                    ]
                },
                {
                    title: 'Other',
                    navs: [
                        { name: 'Security', icon: 'pi pi-tag' },
                        { name: 'Update', icon: 'pi pi-tag' },
                        { name: 'Marketing', icon: 'pi pi-tag' },
                        { name: 'HR', icon: 'pi pi-tag' }
                    ]
                }
            ],

            // keep your existing tableData here
            tableData: []
        };
    },

    methods: {
        onSelectionChange(checked) {
            this.selectedRows = checked ? [...this.tableData] : [];
        }
    },

    watch: {
        selectedRows(newValue) {
            this.checked = newValue.length === this.tableData.length;
        }
    }
};
</script>