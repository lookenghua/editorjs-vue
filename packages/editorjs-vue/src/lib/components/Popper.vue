<template>
  <div ref="button" aria-describedby="tooltip">
    <slot></slot>
  </div>
  <div v-if="!slots.tooltip" ref="tooltip" class="tooltip message" role="tooltip">
    <div class="arrow" data-popper-arrow></div>
    {{ props.title }}
  </div>
  <div v-else ref="tooltip" class="tooltip" role="tooltip">
    <slot name="tooltip"></slot>
  </div>
</template>

<script setup lang="ts">
  import { createPopper } from '@popperjs/core'
  import { nextTick, onMounted, useSlots } from 'vue'

  const props = defineProps<{ title?: string }>()
  const slots = useSlots()
  let button = $ref<HTMLElement | null>()
  let tooltip = $ref<HTMLElement | null>()

  onMounted(() => {
    nextTick(() => {
      const instance = createPopper(button!, tooltip!, {
        modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
      })

      function show() {
        tooltip?.setAttribute('data-show', '')
        instance.update() // correctly position
      }

      function hide() {
        tooltip?.removeAttribute('data-show')
      }

      function onMouseenter() {
        show()
      }

      function onMouseleave() {
        hide()
      }

      button?.addEventListener('mouseenter', onMouseenter)
      button?.addEventListener('mouseleave', onMouseleave)
      tooltip?.addEventListener('mouseenter', onMouseenter)
      tooltip?.addEventListener('mouseleave', onMouseleave)
    })
  })
</script>

<style scoped lang="scss">
  .tooltip {
    display: none;
    &.message {
      background: #333;
      color: white;
      font-weight: bold;
      padding: 4px 8px;
      font-size: 13px;
      border-radius: 4px;
    }
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
