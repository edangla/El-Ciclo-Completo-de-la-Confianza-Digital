<template>
  <div class="trust-bar" :class="{ compact }">
    <div v-for="item in items" :key="item.title" class="trust-item">
      <component :is="item.icon" :size="20" />
      <div>
        <strong>{{ item.title }}</strong>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>
