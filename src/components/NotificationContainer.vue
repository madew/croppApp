<template>
  <div class="notification-container">
    <NotifcationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotifcationBar from './NotificationBar';
// import { mapState } from 'vuex';
export default {
  components: {
    NotifcationBar
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
}
</style>