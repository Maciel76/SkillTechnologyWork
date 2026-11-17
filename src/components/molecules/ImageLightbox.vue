<template>
  <Teleport to="body">
    <div class="imagem-fundo" @click.self="$emit('close')">
      <section ref="dialogo" class="imagem-visualizador" role="dialog" aria-modal="true" aria-labelledby="imagem-visualizador-titulo" tabindex="-1">
        <header class="imagem-cabecalho">
          <div class="imagem-titulo">
            <h2 id="imagem-visualizador-titulo">{{ title }}</h2>
            <p aria-live="polite">{{ indice === 0 ? 'Capa' : `Foto auxiliar ${indice}` }} · {{ indice + 1 }} de {{ images.length }}</p>
          </div>
          <div class="imagem-ferramentas" aria-label="Zoom da imagem">
            <button type="button" aria-label="Diminuir zoom" :disabled="zoom <= 1" @click="ajustarZoom(-0.5)">−</button>
            <button type="button" class="imagem-escala" aria-label="Restaurar tamanho da imagem" @click="restaurarZoom">{{ Math.round(zoom * 100) }}%</button>
            <button type="button" aria-label="Aumentar zoom" :disabled="zoom >= 3" @click="ajustarZoom(0.5)">+</button>
          </div>
          <button ref="fechar" type="button" class="imagem-fechar" aria-label="Fechar imagem ampliada" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </header>

        <div class="imagem-palco">
          <div ref="area" class="imagem-rolagem" :style="{ touchAction: zoom > 1 ? 'auto' : 'pan-y' }" @touchstart.passive="iniciarToque" @touchend.passive="terminarToque">
            <div class="imagem-tela" :style="{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }">
              <img v-if="!erro" :key="imagemAtual" :src="imagemAtual" :alt="`${title} — ${indice === 0 ? 'capa' : `foto auxiliar ${indice}`}`" @load="carregando = false" @error="erro = true; carregando = false" @dblclick="zoom === 1 ? ajustarZoom(1) : restaurarZoom()" />
            </div>
          </div>
          <p v-if="carregando" class="imagem-estado" role="status">Carregando imagem…</p>
          <div v-if="erro" class="imagem-estado" role="alert">
            <p>Não foi possível carregar esta imagem.</p>
            <a v-if="linkOriginal" :href="linkOriginal" target="_blank" rel="noopener noreferrer">Tentar abrir a imagem original</a>
          </div>
          <button v-if="images.length > 1" type="button" class="imagem-seta imagem-anterior" aria-label="Imagem anterior" @click="navegar(-1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <button v-if="images.length > 1" type="button" class="imagem-seta imagem-proxima" aria-label="Próxima imagem" @click="navegar(1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>

        <footer class="imagem-rodape">
          <div v-if="images.length > 1" class="imagem-miniaturas" aria-label="Imagens do projeto">
            <button v-for="(imagem, index) in images" :key="imagem" type="button" :class="{ selecionada: indice === index }" :aria-pressed="indice === index" :aria-label="index === 0 ? 'Ver capa' : `Ver foto auxiliar ${index}`" @click="indice = index">
              <img :src="imagem" alt="" />
            </button>
          </div>
          <a v-if="linkOriginal" :href="linkOriginal" target="_blank" rel="noopener noreferrer" class="imagem-original">Abrir original <span aria-hidden="true">↗</span></a>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "ImageLightbox",
  props: {
    images: { type: Array, required: true },
    title: { type: String, default: "Imagem do projeto" },
    startIndex: { type: Number, default: 0 },
    returnFocus: { type: Object, default: null },
  },
  emits: ["close", "change"],
  data() {
    return { indice: Math.max(0, Math.min(this.startIndex, this.images.length - 1)), zoom: 1,
      carregando: true, erro: false, focoAnterior: null, toque: null };
  },
  computed: {
    imagemAtual() { return this.images[this.indice] || ""; },
    linkOriginal() {
      try {
        const url = new URL(this.imagemAtual, window.location.origin);
        return ["https:", "http:"].includes(url.protocol) ? url.href : "";
      } catch { return ""; }
    },
  },
  watch: {
    indice() {
      this.carregando = true;
      this.erro = false;
      this.restaurarZoom();
      this.$emit("change", this.imagemAtual);
    },
  },
  mounted() {
    this.focoAnterior = this.returnFocus || document.activeElement;
    document.addEventListener("keydown", this.aoTeclar, true);
    this.$nextTick(() => this.$refs.fechar?.focus());
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.aoTeclar, true);
    const anterior = this.focoAnterior;
    this.$nextTick(() => {
      if (anterior?.isConnected) anterior.focus({ preventScroll: true });
    });
  },
  methods: {
    navegar(passo) { this.indice = (this.indice + passo + this.images.length) % this.images.length; },
    ajustarZoom(passo) { this.zoom = Math.max(1, Math.min(3, this.zoom + passo)); },
    restaurarZoom() {
      this.zoom = 1;
      this.$nextTick(() => this.$refs.area?.scrollTo({ top: 0, left: 0 }));
    },
    iniciarToque(evento) {
      const ponto = evento.touches[0];
      this.toque = evento.touches.length === 1 ? { x: ponto.clientX, y: ponto.clientY } : null;
    },
    terminarToque(evento) {
      if (!this.toque || this.zoom !== 1 || this.images.length < 2) return;
      const ponto = evento.changedTouches[0];
      const x = ponto.clientX - this.toque.x, y = ponto.clientY - this.toque.y;
      this.toque = null;
      if (Math.abs(x) > 60 && Math.abs(x) > Math.abs(y) * 1.5) this.navegar(x < 0 ? 1 : -1);
    },
    aoTeclar(evento) {
      if (evento.key === "Tab") {
        const itens = [...this.$refs.dialogo.querySelectorAll('a[href], button:not([disabled])')].filter(item => item.getClientRects().length);
        const primeiro = itens[0], ultimo = itens[itens.length - 1];
        if (evento.shiftKey && (document.activeElement === primeiro || !this.$refs.dialogo.contains(document.activeElement))) {
          evento.preventDefault(); ultimo?.focus();
        } else if (!evento.shiftKey && (document.activeElement === ultimo || !this.$refs.dialogo.contains(document.activeElement))) {
          evento.preventDefault(); primeiro?.focus();
        }
        return;
      }
      const acoes = { Escape: () => this.$emit("close"), ArrowLeft: () => this.navegar(-1),
        ArrowRight: () => this.navegar(1), "+": () => this.ajustarZoom(0.5), "=": () => this.ajustarZoom(0.5),
        "-": () => this.ajustarZoom(-0.5), "0": () => this.restaurarZoom() };
      if (acoes[evento.key]) {
        evento.preventDefault(); evento.stopImmediatePropagation(); acoes[evento.key]();
      }
    },
  },
};
</script>

<style scoped>
.imagem-fundo, .imagem-fundo *, .imagem-fundo *::before, .imagem-fundo *::after { box-sizing: border-box; }
.imagem-fundo { position: fixed; inset: 0; z-index: 12000; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(5, 9, 20, 0.94); font-family: "Inter", sans-serif; }
.imagem-visualizador { display: flex; flex-direction: column; width: min(1400px, 100%); height: min(1000px, calc(100dvh - 32px)); min-height: 0; color: #f4f6fc; background: #090e1d; border: 1px solid #30394c; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 80px #0008; }
.imagem-cabecalho { display: flex; align-items: center; gap: 16px; padding: 14px 18px; border-bottom: 1px solid #30394c; }
.imagem-titulo { min-width: 0; flex: 1; }
.imagem-titulo h2 { margin: 0; font-size: 15px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.imagem-titulo p { margin: 4px 0 0; font-size: 12px; color: #bdc9e0; }
.imagem-visualizador button { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding: 0; border: 1px solid #44516a; border-radius: 9px; background: #182237; color: #fff; font: inherit; font-size: 23px; cursor: pointer; }
.imagem-visualizador button:hover { background: #293a59; }
.imagem-visualizador button:disabled { cursor: default; opacity: 0.35; }
.imagem-visualizador button:focus-visible, .imagem-original:focus-visible, .imagem-estado a:focus-visible { outline: 3px solid #80aaff; outline-offset: 3px; }
.imagem-ferramentas { display: flex; align-items: center; gap: 5px; }
.imagem-ferramentas .imagem-escala { min-width: 60px; font-size: 12px; }
.imagem-visualizador svg { width: 22px; height: 22px; }
.imagem-palco { position: relative; flex: 1; min-height: 0; }
.imagem-rolagem { width: 100%; height: 100%; overflow: auto; overscroll-behavior: contain; }
.imagem-tela { min-width: 100%; min-height: 100%; }
.imagem-tela img { display: block; width: 100%; height: 100%; object-fit: contain; cursor: zoom-in; }
.imagem-estado { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 60px; margin: 0; text-align: center; color: #dce6fc; pointer-events: none; }
.imagem-estado a { pointer-events: auto; color: #99baff; }
.imagem-visualizador .imagem-seta { position: absolute; top: 50%; transform: translateY(-50%); border-color: #5a6686; border-radius: 50%; background: #111b30d9; box-shadow: 0 3px 12px #0005; }
.imagem-anterior { left: 14px; }
.imagem-proxima { right: 14px; }
.imagem-rodape { display: flex; align-items: center; gap: 20px; padding: 12px 18px; border-top: 1px solid #30394c; }
.imagem-miniaturas { display: flex; flex: 1; min-width: 0; gap: 8px; overflow-x: auto; padding: 4px; }
.imagem-miniaturas button { width: 76px; height: 52px; flex-shrink: 0; overflow: hidden; opacity: 0.65; border: 2px solid transparent; }
.imagem-miniaturas button.selecionada { border-color: #80aaff; opacity: 1; }
.imagem-miniaturas img { width: 100%; height: 100%; object-fit: cover; }
.imagem-original { flex-shrink: 0; color: #d6e4ff; font-size: 12px; text-decoration: underline; text-underline-offset: 3px; margin-left: auto; }
@media (max-width: 640px) {
  .imagem-fundo { padding: 6px; }
  .imagem-visualizador { height: calc(100dvh - 12px); border-radius: 12px; }
  .imagem-cabecalho { flex-wrap: wrap; gap: 10px; padding: 12px; }
  .imagem-titulo { flex-basis: calc(100% - 60px); }
  .imagem-fechar { order: 1; }
  .imagem-ferramentas { order: 2; flex-basis: 100%; justify-content: center; }
  .imagem-titulo h2 { font-size: 14px; }
  .imagem-anterior { left: 8px; }
  .imagem-proxima { right: 8px; }
  .imagem-rodape { flex-wrap: wrap; gap: 10px; padding: 10px 12px; }
  .imagem-miniaturas { flex-basis: 100%; }
  .imagem-original { margin-left: 4px; }
}
</style>
