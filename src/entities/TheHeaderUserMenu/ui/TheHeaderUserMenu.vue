<template>
  <div class="q-pa-sm">
    <q-btn-dropdown outline  color="white" label="admin">
      <q-list v-for="item in userMenuItem" :key="item.label">
        <dropdown-item-link :item="item"/>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>

import { DropdownItemLink } from 'src/shared/DropdownItemLink';

defineProps({
  userMenuItem: { type: Array, required: true },
});

</script>

<style lang="scss" scoped>
.q-btn {
  text-transform: none;
}
</style>
