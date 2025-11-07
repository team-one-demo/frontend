<template>
  <button :class="computedClasses" :type="type" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary' // 'primary', 'secondary', 'danger', etc.
    },
    disabled: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['click'])

  const variants = {
    primary: 'bg-gradient-to-br from-primary to-primary-two text-white'
  }

  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const computedClasses = computed(() => {
    return [baseClasses, variants[props.variant] || variants.primary, props.class].join(' ')
  })

  function onClick(event) {
    if (!props.disabled) {
      emit('click', event)
    }
  }
</script>
