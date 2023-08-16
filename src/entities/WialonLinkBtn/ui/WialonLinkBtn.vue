<template>
  <div class="q-pa-sm">
    <a class="header__wialon q-hoverable"
       :href="link"
       target="_blank"
    >
      <span class="q-focus-helper"></span>
      Вход в Wialon
    </a>
  </div>
</template>

<script>
export default {
  props: {
    wialonHref: { type: String, required: false },
  },

  setup(props) {
    return {
      link: props.wialonHref,
    };
  },
};
</script>

<style lang="scss">
.header__wialon {
  position: relative;
  padding: 8px 5px 7px 45px;
  border: 1px solid var(--color-light);
  border-radius: 3px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: var(--color-light);

  &:hover {
    &::before {
      transform: translateY(-50%) rotate(360deg);
      transition: transform 400ms linear;
    }
  }

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 5px;
    width: 24px;
    height: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("src/app/assets/images/wialon.png");
    transform: translateY(-50%);
  }
}
</style>
