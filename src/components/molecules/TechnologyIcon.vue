<template>
  <span class="technology-icon" tabindex="0" role="img" :aria-label="name">
    <img v-if="logo" :src="logo" alt="" aria-hidden="true" width="20" height="20" />
    <svg v-else-if="isAi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4" /><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4m-10-5-3 2 3 2m-2-4 3 2-3 2" /></svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16" /></svg>
    <span class="technology-tooltip" aria-hidden="true">{{ name }}</span>
  </span>
</template>

<script>
import vueLogo from '@/assets/technologies/vue.svg';
import nodeLogo from '@/assets/technologies/node.svg';
import expressLogo from '@/assets/technologies/express.svg';
import mongoLogo from '@/assets/technologies/mongodb.svg';
import viteLogo from '@/assets/technologies/vite.svg';
import piniaLogo from '@/assets/technologies/pinia.svg';
import typescriptLogo from '@/assets/technologies/typescript.svg';
import websocketLogo from '@/assets/technologies/websocket.svg';
import socketioLogo from '@/assets/technologies/socketio.svg';
import nginxLogo from '@/assets/technologies/nginx.svg';
import pm2Logo from '@/assets/technologies/pm2.svg';
import pwaLogo from '@/assets/technologies/pwa.svg';
import whatsappLogo from '@/assets/technologies/whatsapp.svg';
import htmlLogo from '@/assets/technologies/html5.svg';
import cssLogo from '@/assets/technologies/css3.svg';
import javascriptLogo from '@/assets/technologies/javascript.svg';
import vercelLogo from '@/assets/technologies/vercel.svg';
import phpLogo from '@/assets/technologies/php.svg';

const logos = {
  vue: vueLogo, vuejs: vueLogo, vue3: vueLogo, vuejs3: vueLogo,
  node: nodeLogo, nodejs: nodeLogo,
  express: expressLogo, expressjs: expressLogo,
  mongo: mongoLogo, mongodb: mongoLogo,
  vite: viteLogo, vitejs: viteLogo, pinia: piniaLogo,
  typescript: typescriptLogo, ts: typescriptLogo,
  websocket: websocketLogo, websockets: websocketLogo,
  socketio: socketioLogo, nginx: nginxLogo, pm2: pm2Logo, pwa: pwaLogo,
  whatsapp: whatsappLogo, integracaowhatsapp: whatsappLogo,
  html: htmlLogo, html5: htmlLogo, css: cssLogo, css3: cssLogo,
  javascript: javascriptLogo, js: javascriptLogo, vercel: vercelLogo, php: phpLogo,
};

export default {
  name: 'TechnologyIcon',
  props: { name: { type: String, required: true } },
  computed: {
    normalizedName() { return this.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ''); },
    logo() { return logos[this.normalizedName] || ''; },
    isAi() { return ['ia', 'ai'].includes(this.normalizedName) || this.normalizedName.startsWith('inteligenciaartificial'); },
  },
};
</script>

<style scoped>
.technology-icon { position: relative; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; width: 32px; height: 32px; flex: 0 0 32px; padding: 5px; border: 1px solid #e2e1da; border-radius: 8px; background: #fff; color: #63708a; }
.technology-icon img, .technology-icon svg { display: block; width: 20px; height: 20px; object-fit: contain; }
.technology-icon:hover, .technology-icon:focus { border-color: #b8c9fc; background: #f6f8ff; }
.technology-icon:focus-visible { outline: 2px solid #0052ff; outline-offset: 3px; }
.technology-tooltip { position: absolute; z-index: 10; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); padding: 6px 9px; border-radius: 6px; background: #131a4d; color: #fff; font: 500 12px/1.3 "Inter", sans-serif; white-space: nowrap; pointer-events: none; opacity: 0; }
.technology-icon:hover .technology-tooltip, .technology-icon:focus .technology-tooltip { opacity: 1; }
</style>
