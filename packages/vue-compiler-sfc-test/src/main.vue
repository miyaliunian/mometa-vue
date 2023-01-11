<template>
  <div class="message">{{ message }}</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Main',
  setup() {
    const message = ref('前段逗逗飞')
    return {
      message,
    }
  },
}
</script>

<style scoped>
.message {
  font-size: 60px;
  font-weight: 900;
}
</style>
