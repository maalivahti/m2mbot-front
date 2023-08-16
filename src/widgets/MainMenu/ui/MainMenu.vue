<template>
  <q-drawer show-if-above :width="240" :breakpoint="500" side="left" elevated mini-to-overlay>
    <q-scroll-area class="fit">
      <q-list v-for="menuItem in lcMenuItems" :key="menuItem.link">
        <menu-drawer-item :menuItemParams="menuItem"/>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { MenuDrawerItem } from 'src/entities/MenuDrawerItem';
import { lcMenuItems } from '../module/mainMenuItems';

const route = useRoute();
const currentPage = ref('');

watch(
  () => route.params,
  () => {
    currentPage.value = route.fullPath.substring(1);
  },
);

provide('currentPage', currentPage);
</script>
