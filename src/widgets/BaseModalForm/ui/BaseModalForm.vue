<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modalState">
      <q-card class="base-modal">
        <q-form class="q-gutter-sm" @submit="submitForm"
                :class="$attrs.class">
          <q-card-section class="base-modal__head">
            <div class="text-subtitle2">{{ modalTitle }}</div>
          </q-card-section>

          <slot />

          <q-card-actions align="right" class="base-modal__bottom">
            <q-btn label="Отменить" @click="modalState = false" type="reset" color="primary" flat class="q-ml-sm"/>
            <q-btn label="Сохранить" type="submit" color="primary"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import axios from 'axios';

const emit = defineEmits(['update:modelValue']);

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

function submitForm() {
  emit('submitForm');
}

</script>

<style lang="scss">
  .base-modal {
    width: 650px;
  }

  .base-modal__head {
    padding: 7px 0 7px 16px;
    border-bottom: 1px solid var(--color-separation);
    background-color: var(--color-indigo);
    color: var(--color-light);
  }

  .base-modal__bottom {
    border-top: 1px solid var(--color-separation);
  }
</style>
