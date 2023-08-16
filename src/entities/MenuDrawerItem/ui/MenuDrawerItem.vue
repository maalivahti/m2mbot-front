<template>
  <q-expansion-item :class="expansionMenuItemClasses(menuItemParams, currentPage)"
                    v-if="menuItemParams.dropdown"
                    expand-icon-class="menu__expand-icon"
                    :icon="menuItemParams.icon"
                    :label="menuItemParams.title"
  >
    <router-link v-for="dropdownItem in menuItemParams.dropdownList"
                 :key="dropdownItem.id"
                 :to="dropdownItem.link"
                 class="menu__link"
    >
      <drawer-item :title="dropdownItem.title" :icon="dropdownItem.icon"/>
    </router-link>
  </q-expansion-item>

  <router-link :to="menuItemParams.link" v-else class="menu__link">
    <drawer-item :title="menuItemParams.title" :icon="menuItemParams.icon"/>
  </router-link>
</template>

<script setup>
import { inject } from 'vue';
import { DrawerItem } from 'src/shared/DrawerItem';
import { expansionMenuItemClasses } from '../helpers';

defineProps({
  menuItemParams: { type: Object, required: true },
});

const currentPage = inject('currentPage');
</script>

<style lang="scss">
.menu__expand-icon {
  color: white;
}
.router-link-active {
  color: var(--color-malibu) !important;
}
</style>
