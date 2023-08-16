<template>
  <q-dialog v-model="modalState" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="mdi-alert-octagon-outline" color="white" text-color="orange-14" />
        <span class="q-ml-sm">{{ dialogText }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отменить" color="primary" v-close-popup/>
        <q-btn flat label="Подтвердить" color="primary" v-close-popup @click="emit('confirmAction')"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  dialogText: { type: String, required: true },
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
