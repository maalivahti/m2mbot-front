<template>
  <label class="base-modal__row row items-center no-wrap">
    <span class="base-modal__label text-subtitle2 col-5" :class="$attrs.class">{{ title }}</span>
    <q-checkbox left-label size="30px"
                v-model="dataValue"
                class="base-modal__label text-subtitle2"
                @update:model-value="(value) => changeValue(value)"
    />
  </label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  modelValue: { type: Boolean, required: true, default: false },
});

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

const dataValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const changeValue = (value) => {
  dataValue.value = value;
};
</script>

<style lang="scss">

.base-modal__label {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-indigo);
}

.base-modal__descr {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-shark);
  &--btn {
    padding: 0;
    margin-right: 5px;
    min-height: 0;
  }
}

.base-modal__input {
  font-size: 12px;

  .q-field__control {
    &::before {
      border-color: var(--color-indigo);
    }
  }

  .q-field__native {
    color: var(--color-indigo);
  }
}

.base-modal__select {
  font-size: 12px;

  .q-field__control {
    &::before {
      border-color: var(--color-indigo);
    }
  }

  .q-field__native {
    color: var(--color-indigo);
  }
}

.q-checkbox__label {
  font-size: 12px;
  color: var(--color-indigo);
}
</style>
