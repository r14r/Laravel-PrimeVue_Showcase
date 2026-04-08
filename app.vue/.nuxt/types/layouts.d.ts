import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "custom" | "default"
declare module "../../../../node_modules/.pnpm/nuxt@3.15.4_@parcel+watcher@2.5.4_@types+node@25.5.0_cac@6.7.14_db0@0.3.4_eslint@9.39.2_jiti@_2dq2wxp6am7cat32tr7ehkx4va/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}