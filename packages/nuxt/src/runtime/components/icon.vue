<template>
  <span
    class="da-icon"
    :class="class"
    v-html="icon"
    :style="style"
  ></span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DaIconName } from '../../types';
/**
 * Map with all icons
 */
import * as icons from '@davidabou/icons';

/**
 * Components properties
 */
const props = withDefaults(defineProps<{
  /**
   * Icon name, should be one of the names listed on https://github.com/davidabou/codex-icons
   */
  name: DaIconName,

  /**
   * Optional class names
   */
  class?: string,

  /**
   * Optional size if icon, for example: 20
   */
  size?:  number,
}>(), {
  size: 24
})

/**
 * Icon svg code to be inserted
 */
const icon = ref<string>('')

let iconList: Record<DaIconName, string>;

/**
 * Workaround SSR problem when "import * as icons from '@davidabou/icons'" wraps with { default: ... }
 */
if ('default' in icons){
  iconList = (icons as unknown as {default: Record<DaIconName, string>}).default;
} else {
  iconList = icons;
}

/**
 * Pass size variable to the CSS
 */
const style = computed(() => {
  return `--size: ${props.size}px`;
})

icon.value = iconList[props.name as DaIconName];
</script>

<style>
.da-icon {
  --size: 24px;

  display: inline-flex;
}

.da-icon svg {
  width: var(--size);
  height: var(--size);
}
</style>
