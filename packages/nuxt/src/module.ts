import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

/**
 * Union type for available icon names (same as runtime/types.ts, exposed to module consumers)
 */
export type DaIconName = keyof typeof import('@davidabou/icons');

export default defineNuxtModule({
  meta: {
    name: '@davidabou/nuxt-icons',
    configKey: 'daIcons',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  setup () {
    const { resolve } = createResolver(import.meta.url);

    /**
     * Usable as <DaIcon> or <da-icon> in templates
     */
    addComponent({
      name: 'DaIcon',
      filePath: resolve('./runtime/components/DaIcon.vue')
    });
  }
});
