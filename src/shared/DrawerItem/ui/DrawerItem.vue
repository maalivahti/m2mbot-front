<template>
  <q-item clickable v-ripple >
    <q-item-section avatar>
      <q-icon :name="icon"/>
    </q-item-section>
    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'DrawerItem',
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: false },
  },
};
</script>
