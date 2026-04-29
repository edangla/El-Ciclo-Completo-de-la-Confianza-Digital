<template>
  <ol class="timeline">
    <li v-for="item in items" :key="item.title" :class="{ current: item.current }">
      <span class="timeline-dot"></span>
      <div>
        <strong>{{ item.title }}</strong>
        <p>{{ item.text }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
