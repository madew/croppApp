<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
    <button @click="() => removeNotification(notification)">
      <box-icon class="bx-spin-hover" color="#fff" name="x"></box-icon>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  methods: {
    ...mapActions(['removeNotification'])
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      5000
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1rem 0 1rem 0;
  background: #5e6872;
  padding: 0.25rem 1rem;
  display: flex;
  color: #fff;
  font-weight: 600;
}

.-text-warning {
  border-bottom: 3px orange solid;
}
.-text-error {
  border-bottom: 3px orangered solid;
}
.-text-success {
  border-bottom: 3px #5cdb95 solid;
}
button {
  border: none;
  display: inline-block;
  padding: 10px;
  background: none;
  margin-left: 10px;
}
</style>