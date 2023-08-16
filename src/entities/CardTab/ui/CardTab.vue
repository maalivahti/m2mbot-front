<template>
  <q-card class="card-tab cursor-pointer q-hoverable" flat bordered v-ripple>
    <span class="q-focus-helper"></span>
    <q-card-section horizontal>
      <q-item class="q-pa-sm" style="width: 100%;">
        <q-item-section avatar class="card-tab__icon" v-if="icon">
          <q-icon :color="iconColor" :name="icon"/>
        </q-item-section>

        <q-item-section>
          <q-item-label class="card-tab__label text-no-wrap q-mb-xs">{{ label }}</q-item-label>
          <div class="row">
            <q-item-label caption class="card-tab__text">{{ text }}</q-item-label>
            <q-space/>
            <q-item-label caption class="card-tab__descr">{{ descr }}</q-item-label>
          </div>
        </q-item-section>
      </q-item>
      <q-item-section avatar class="card-tab__icon" v-if="update">
        <q-btn flat round color="primary" icon="refresh" @click.stop="updateTable"/>
        <q-tooltip>Обновить таблицу объектов</q-tooltip>
      </q-item-section>
    </q-card-section>
  </q-card>
</template>

<script setup>

// eslint-disable-next-line
const props = defineProps({
  tab: { type: Object, required: true },
  iconColor: { type: String, required: false },
  label: { type: String, required: true },
  text: { type: String, required: false },
  descr: { type: String, required: false },
  update: { type: Boolean, required: true },
  icon: { type: String, required: false },
});

const emit = defineEmits(['change', 'delete', 'update:modelValue']);

function updateTable() {
  emit('updateTable');
}

</script>

<style lang="scss" scoped>
  .card-tab {
    background-color: var(--color-light);

    &--active {
      background-color: var(--color-french);
    }
  }

  .card-tab__icon {
    padding-right: 10px;
    min-width: 32px;
  }
</style>
