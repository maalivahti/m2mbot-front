<template>
  <q-footer elevated>
    <footer class="footer">
      <p class="footer__copy">&copy; М2М-Телематика Сибирь +7(391)205-30-22 (Техническая поддержка)</p>
    </footer>
  </q-footer>
</template>

<script>
export default {
  name: 'PageFooter',
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px 0 !important;
  background-color: #fff;
  text-align: center;
  color: #90a4ae;
}
</style>
