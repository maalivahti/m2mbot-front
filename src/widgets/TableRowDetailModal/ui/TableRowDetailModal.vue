<template>
  <q-dialog class="detail-modal" v-model="modalState" position="bottom" seamless>
    <q-card style="min-width:50vw; min-height: 40vh">
      <q-card-section class="base-modal__head row justify-between items-center">
        <div class="text-subtitle2">{{ modalTitle }}</div>
        <q-btn flat round icon="close" v-close-popup/>
      </q-card-section>

      <q-separator/>

      <q-card-section class="col items-center no-wrap q-gutter-sm">
        <slot/>
      </q-card-section>
    </q-card>
  </q-dialog>
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

<style lang="scss">
.detail-modal {
  .q-dialog__inner {
    bottom: 30px;
  }
}
</style>
