<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modalState">
      <q-card class="base-modal" :style="{width: modalWidth, maxWidth: modalWidth}">
        <q-card-section class="base-modal__head">
          <div class="text-subtitle2">{{ modalTitle }}</div>
        </q-card-section>

        <q-card-section class="base-modal__body scroll" style="max-height: 60vh">
          <slot/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  modalWidth: {
    type: String,
    required: false,
    default: '70vw',
  },
});

const modalState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>
