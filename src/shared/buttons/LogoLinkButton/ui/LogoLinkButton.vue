<template>
  <a class="link-logo" href="#">
    <img class="header__logo" src="~src/app/assets/images/m2mbot-logo-wh.svg" alt="M2MBOT Logo"/>
  </a>
</template>

<script>
export default {
  name: 'LogoLinkButton',
};
</script>

<style scoped lang="scss">
  .link-logo {
    display: inline-block;
  }
  .header__logo {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
