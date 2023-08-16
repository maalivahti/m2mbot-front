<template>
  <q-input class="filter-input"
           dense
           label-color="blue-grey-7"
           v-model="formatDate"
           :label="dateLabel"
           mask="##.##.####"
           @click="$refs.qDateProxy.show()"
  >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" color="primary">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="qDateProxy">
            <q-date v-model="dateValue">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>

<script setup>
import { computed } from 'vue';
import { date } from 'quasar';

const emit = defineEmits(['change', 'delete', 'update:modelValue']);
// eslint-disable-next-line
const props = defineProps({
  date,
  dateLabel: { type: String, required: false },
});

const dateValue = computed({
  get() {
    return props.date;
  },
  set(value) {
    emit('update:date', value);
  },
});

const formatDate = computed(() => date.formatDate(dateValue.value, 'DD.MM.YYYY'));

</script>

<style lang="scss">
.filter-input {
  font-size: 12px;
  white-space: nowrap;
}
</style>
