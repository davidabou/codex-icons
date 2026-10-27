import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'da-icons',
    configKey: 'daIcons',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  setup () {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: 'da-icon',
      global: true,
      filePath: resolve('./runtime/components/icon.vue')
    });
  }
});
