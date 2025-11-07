<script setup lang="ts"></script>
<template>
  <div
    class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 shadow-sm"
    v-bind="$attrs">
    <slot />
  </div>
</template>
