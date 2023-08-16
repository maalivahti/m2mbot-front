import { ref } from 'vue';

export const serverErrorHandler = {
  popupStatus: ref(false),

  showServerErrorPopup() {
    this.popupStatus.value = true;
    setTimeout(() => { this.popupStatus.value = false; }, 3000);
  },
};
