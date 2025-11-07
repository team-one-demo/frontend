<script setup lang="ts">
  import Header from '@/app/components/Header.vue'
  import Navbar from '@/app/components/Navbar.vue'
  import Footer from '@/app/components/Footer.vue'
  import HelpPopup from '@/chat-bot/HelpPopup.vue'
</script>
<template>
  <div
    class="min-h-screen grid grid-rows-[auto_auto_1fr_auto] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />
    <Navbar />
    <slot></slot>
    <Footer />
    <HelpPopup />
  </div>
</template>
