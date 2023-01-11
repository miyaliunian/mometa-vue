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
    };
  },
};
</script>
<script setup>
const test = ref(1);
console.log(test);
</script>

<style scoped>
.message {
  font-size: 60px;
  font-weight: 900;
}
</style>
