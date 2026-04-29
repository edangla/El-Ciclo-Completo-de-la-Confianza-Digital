<template>
  <div class="secure-badge">
    <component :is="icon" :size="20" />
    <div>
      <strong>{{ title }}</strong>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>
