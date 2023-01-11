<template>
  <div class="message">{{ message }}</div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Main",
  setup() {
    const message = ref("Main");
    return {
      message,
      color: "red",
    };
  },
};
</script>

<style scoped>
.message {
  font-size: 60px;
  font-weight: 900;
  color: v-bind(color);
}
</style>
