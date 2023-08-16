<template>
<q-dialog v-model="dataValue" position="top" seamless>
  <q-card style="width: 250px">
    <q-card-section class="row items-center no-wrap">
      <div>
        <div class="text-weight-bold text-red-10">Error</div>
        <div class="text-black">500: Server Error</div>
      </div>
    </q-card-section>
  </q-card>
</q-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
