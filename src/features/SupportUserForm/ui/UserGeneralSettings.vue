<template>
  <div class="q-gutter-sm">
    <base-form-field title="Название:">
      <base-form-text-input v-model="dataValue.user"
                            placeholder="Укажите название пользователя"
                            :valid-rules="[val => validation.validationPatterns.notEmpty(val)]"
      />
    </base-form-field>

    <base-form-field title="Пароль:" v-if="!isUpdate">
      <base-form-text-input v-model="dataValue.pass"
                            type="password"
                            :valid-rules="[val => validation.validationPatterns.password(val)]"
      />
    </base-form-field>

    <base-form-field title="Подтверждение пароля:" v-if="!isUpdate">
      <base-form-text-input v-model="dataValue.passConfirm"
                            type="password"
                            :valid-rules="[val => validation.validationPatterns.confirmPass(val, dataValue.pass)]"
      />
    </base-form-field>

    <base-form-field title="Токен Wialon:">
      <base-form-text-input v-model="dataValue.main_token_wialon" placeholder="Token Wialon"/>
    </base-form-field>

    <base-form-field title="Почта:">
      <base-form-text-input v-model="dataValue.email"
                            type="email"
                            placeholder="Е-mail для уведомлений"
      />
    </base-form-field>

    <base-form-field title="ID Telegram:">
      <base-form-text-input v-model="dataValue.telegram_id"/>
    </base-form-field>

    <base-form-field title="Компания создатель:">
      <base-form-select v-model="dataValue.main_comp" :options="allCompList"/>
    </base-form-field>

    <base-form-field title="Роль:">
      <base-form-select v-model="dataValue.role" :options="formOptions.roleOptions"/>
    </base-form-field>

    <base-form-field title="Сотрудник компании:">
      <base-form-select v-model="dataValue.staff_profile" :options="staffList"/>
    </base-form-field>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import validation from 'src/app/helpers/InputValidations';
import { BaseFormTextInput } from 'src/shared/Form/BaseFormTextInput';
import { BaseFormField } from 'src/shared/Form/BaseFormField';
import { BaseFormSelect } from 'src/shared/Form/BaseFormSelect';
import formOptions from '../module/formOptions';

const props = defineProps({
  modelValue: { type: Object, required: true },
  allCompList: { type: Array, required: true },
  staffList: { type: Array, required: true },
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

const isUpdate = !!dataValue.value.id;

</script>
