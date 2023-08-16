<template>
  <div class="fit row no-wrap justify-start items-stretch content-start q-pb-sm q-gutter-sm">
    <card-tab v-for="tab in objectTabs.tabList"
              :label="tab.title"
              :text="tab.objCount"
              :icon="tab.icon"
              :iconColor="tab.iconColor"
              :update="tab.update"
              :key="tab.id"
              :class="{'card-tab--active': activeTabs === tab.id}"
              @click="switchObjectTable(tab.id)"
              @updateTable="updateTable"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { CardTab } from 'src/entities/CardTab';
import objectTabs from '../module/objectsTabs';

export default {
  name: 'ObjectsTabs',
  components: { CardTab },

  setup(props, { emit }) {
    const activeTabs = ref('bot');

    const switchObjectTable = (typeTable) => {
      activeTabs.value = typeTable;
      emit('switchObjectTable', typeTable);
    };

    function updateTable() {
      emit('updateTable');
    }

    return {
      objectTabs,
      activeTabs,
      switchObjectTable,
      updateTable,
    };
  },

};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
