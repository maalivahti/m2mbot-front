<template>
  <q-input class="base-modal__input col-7"
           outlined
           dense
           debounce="500"
           label-color="blue-grey-7"
           v-model="formatDate"
           :label="dateLabel"
           v-on="!disabled ? {click: () =>  $refs.qDateProxy.show()} : {}"
  >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" color="primary">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="qDateProxy">
            <q-date v-model="dateValue"
                    emit-immediately
                    @update:model-value="checkValue"
                    :default-view="datePickerSettings[datePickerType].view"
                    :mask="modelMsk"
            >
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
import { computed, ref } from 'vue';
import { date } from 'quasar';

const emit = defineEmits(['update:date']);
const props = defineProps({
  date,
  dateLabel: { type: String, required: false },
  datePickerType: { type: String, required: false, default: 'days' },
  modelMsk: { type: String, required: false, default: 'YYYY/MM/DD' },
  disabled: { type: Boolean, required: false, default: false },
});

const dateValue = computed({
  get() {
    return props.date;
  },
  set(value) {
    emit('update:date', value);
  },
});

const datePickerSettings = {
  days: {
    format: 'DD.MM.YYYY',
    view: 'Days',
  },
  months: {
    format: 'MMMM YYYY',
    view: 'Months',
  },
};

const formatDate = computed(() => date.formatDate(dateValue.value, datePickerSettings[props.datePickerType].format));
const qDateProxy = ref(null);

function checkValue(val, reason) {
  if (reason === 'month') {
    qDateProxy.value.hide();
  }
}
</script>

<style lang="scss">
.filter-input {
  font-size: 12px;
  white-space: nowrap;
}
</style>
