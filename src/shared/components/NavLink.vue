<script setup lang="ts"></script>

<template>
  <RouterLink
    :to="$attrs.to"
    class="inline-block py-2 text-gray-800 dark:text-gray-200 font-semibold hover:underline hover:text-blue-600 dark:hover:text-blue-400">
    <slot></slot>
  </RouterLink>
</template>
