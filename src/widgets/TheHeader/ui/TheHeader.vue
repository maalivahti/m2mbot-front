<template>
  <q-header elevated  class="header">
    <q-toolbar>
      <q-btn class="header__burger" flat @click="drawerValue = !drawerValue" round dense icon="menu"/>
      <logo-link-button class="link__logo" />
      <q-space />
      <wialon-link-btn :wialonHref="wialonHref"/>
      <the-header-user-menu :user-menu-item="menuDropdownItems"/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from 'vue';
import { LogoLinkButton } from 'src/shared/buttons/LogoLinkButton';
import { WialonLinkBtn } from 'src/entities/WialonLinkBtn';
import { TheHeaderUserMenu } from 'src/entities/TheHeaderUserMenu';
import { useUserStore } from 'src/app/store/user-store';
import { menuDropdownItems } from '../module/headerData';

const userStore = useUserStore();
const wialonToken = computed(() => userStore.getWialonToken);
const wialonHref = `http://wialon.m2m-sib.ru/?token=${wialonToken.value}`;

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(['update:modelValue']);

const drawerValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss">
  .header {
    background-color: var(--color-indigo);
  }

  .header__burger {
    margin-right: 22px;
  }

  .link__logo {
    height: 28px;
    width: 152px;
  }
</style>
