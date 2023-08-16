<template>
  <label class="base-modal__row row items-center no-wrap">
    <span class="base-modal__label text-subtitle2 col-5">{{ title }}</span>
    <slot/>
  </label>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
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
