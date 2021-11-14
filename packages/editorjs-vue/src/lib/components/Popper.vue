<template>
  <div ref="button" aria-describedby="tooltip">
    <slot></slot>
  </div>
  <div
    v-if="!slots.tooltip"
    ref="tooltip"
    class="tooltip message"
    role="tooltip"
    :data-popper-placement="props.placement"
  >
    <div class="arrow" data-popper-arrow></div>
    {{ props.title }}
  </div>
  <div v-else ref="tooltip" class="tooltip" role="tooltip">
    <slot name="tooltip"></slot>
  </div>
</template>

<script setup lang="ts">
  import { createPopper, Placement } from '@popperjs/core'
  import { nextTick, onMounted, useSlots } from 'vue'

  const props = withDefaults(
    defineProps<{
      title?: string
      placement?: Placement
      offset?: number[]
      closeDelay?: number
    }>(),
    {
      placement: 'auto',
      offset: () => [0, 0],
      closeDelay: 200,
    }
  )
  const slots = useSlots()
  let button = $ref<HTMLElement | null>()
  let tooltip = $ref<HTMLElement | null>()
  let _timer: ReturnType<typeof setTimeout>

  onMounted(() => {
    nextTick(() => {
      const instance = createPopper(button!, tooltip!, {
        placement: props.placement,
        modifiers: [{ name: 'offset', options: { offset: props.offset } }],
      })

      function show() {
        tooltip?.setAttribute('data-show', '')
        instance.update() // correctly position
      }

      function hide() {
        console.log('hidden')
        tooltip?.removeAttribute('data-show')
      }

      function onMouseenter() {
        clearTimeout(_timer)
        _timer = setTimeout(() => {
          show()
        }, 0)
      }

      function onMouseleave() {
        clearTimeout(_timer)
        _timer = setTimeout(() => {
          hide()
        }, props.closeDelay)
      }

      button?.addEventListener('mouseenter', onMouseenter)
      button?.addEventListener('mouseleave', onMouseleave)
      tooltip?.addEventListener('mouseenter', onMouseenter)
      tooltip?.addEventListener('mouseleave', onMouseleave)
      tooltip?.addEventListener('click', onMouseleave)
    })
  })
</script>

<style scoped lang="scss">
  .tooltip {
    z-index: 9999;
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
  .tooltip ::v-deep(*) {
    pointer-events: none;
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
