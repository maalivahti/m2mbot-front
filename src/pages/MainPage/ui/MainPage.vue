<template>
  <div class="q-app__wrapper">
    <q-layout view="hHr Lpr lFr">
      <the-header v-model="drawer"/>
      <main-menu class="menu"
                   :mini="miniState"
                   @mouseover="miniState = false"
                   @mouseout="miniState = true"
                   v-model="drawer"
                   show-if-above
      />

      <page-footer/>
      <q-page-container>
        <q-page class="q-pa-md main">
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { TheHeader } from 'src/widgets/TheHeader';
import { Footer as PageFooter } from 'src/shared/Footer';
import { MainMenu } from 'src/widgets/MainMenu/index';
import { useUserStore } from 'src/app/store/user-store';
import { parsingJSON } from 'src/app/helpers/parsingJSON';

const userStore = useUserStore();
const miniState = ref(true);
const drawer = ref(false);

const getUserData = async () => {
  try {
    await axios.get('/home/get_user_data/')
      .then((response) => {
        const userData = parsingJSON(response.data);
        userStore.setUser(userData);
      });
  } catch (error) {
    if (error) throw error;
  }
};

onMounted(getUserData);

</script>

<style lang="scss">
  .q-app__wrapper {
    padding: 0;
    height: 100vh;
  }

  .menu {
    background-color: var(--color-indigo);
    color: var(--color-light);

    .q-item__section--avatar {
      min-width: auto;
    }
  }

  .menu__link {
    color: var(--color-light);
  }

  .main {
    padding-bottom: 40px;
    background-color: #f1f1f1;
  }

</style>
