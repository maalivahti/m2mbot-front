<template>
<q-item clickable v-close-popup>
  <q-item-section>
    <q-item-label>
      <a :href="item.link" class="text-grey-9" :target="item.target">{{ item.label }}</a>
    </q-item-label>
  </q-item-section>
</q-item>
</template>

<script setup>
import { itemLinkValidator } from 'src/app/helpers/validate';

defineProps({
  item: { type: Object, required: true, validator: itemLinkValidator },
});
</script>
