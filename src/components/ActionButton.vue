<template>
  <button
    :ref="optionalRef"
    :class="optionalClass"
    class="btn"
    @click.prevent="action"
    v-tooltip="{
      content: toolTip,
      placement: 'right',
      classes: ['tooltip-info', 'tooltip-arrow'],
      targetClasses: ['it-has-a-tooltip'],
      offset: 10,
      delay: {
        show: 1000,
        hide: 100
      }
    }"
  >
    <box-icon color="white" :name="iconName"></box-icon>
  </button>
</template>

<script>
export default {
  props: {
    iconName: String,
    toolTip: String,
    action: Function,
    optionalClass: String,
    optionalRef: String
  }
};
</script>

<style scoped>
.btn {
  background-color: #424b54;
  border: none;
  padding: 0.5rem;
  display: block;
  cursor: pointer;
}

.btn--green {
  background-color: #28a745;
}
</style>
