<template>
  <div ref="button" aria-describedby="tooltip">
    <slot></slot>
  </div>
  <div ref="tooltip" class="tooltip" role="tooltip">
    <div class="arrow" data-popper-arrow></div>
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
  import { createPopper } from '@popperjs/core'
  import { nextTick, onMounted } from 'vue'

  const props = defineProps<{ title: string }>()

  let button = $ref<HTMLElement | null>()
  let tooltip = $ref<HTMLElement | null>()

  onMounted(() => {
    nextTick(() => {
      const popperInstance = createPopper(button!, tooltip!, {
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
      })
      const showEvents = ['mouseenter', 'focus']
      const hideEvents = ['mouseleave', 'blur']

      showEvents.forEach((event) => {
        button?.addEventListener(event, () => {
          tooltip?.setAttribute('data-show', '')
          popperInstance.update()
        })
      })

      hideEvents.forEach((event) => {
        button?.addEventListener(event, () => {
          tooltip?.removeAttribute('data-show')
        })
      })
    })
  })
</script>

<style scoped lang="scss">
  .tooltip {
    background: #333;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    border-radius: 4px;
    display: none;
    &[data-show] {
      display: block;
    }
  }
  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .arrow {
    visibility: hidden;
  }

  .arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  .tooltip[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
  }

  .tooltip[data-popper-placement^='bottom'] > .arrow {
    top: -4px;
  }

  .tooltip[data-popper-placement^='left'] > .arrow {
    right: -4px;
  }

  .tooltip[data-popper-placement^='right'] > .arrow {
    left: -4px;
  }
</style>
