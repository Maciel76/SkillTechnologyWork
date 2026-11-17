<template>
  <section class="sobre-section" aria-labelledby="home-about-title">
    <div class="sobre-grid">
      <div class="sobre-texto">
        <h2 id="home-about-title">Sobre nós</h2>
        <p>Criamos sistemas, aplicativos e automações com IA para simplificar a rotina da sua empresa. Da ideia à integração com o sistema que você já usa.</p>
        <router-link to="/sobre" class="sobre-cta">Conheça a agência <font-awesome-icon icon="arrow-right" /></router-link>
      </div>
      <dl class="sobre-numeros" aria-label="A agência em números">
        <div><dt>Projetos entregues</dt><dd>200+</dd></div>
        <div><dt>Serviços</dt><dd>20+</dd></div>
        <div><dt>Satisfação do cliente</dt><dd>98%</dd></div>
      </dl>
    </div>
  </section>
</template>

<script>
export default { name: "SobreNosResumo" };
</script>

<style scoped>
.sobre-section, .sobre-section * { box-sizing: border-box; }
.sobre-section { padding: 46px 30px; background: #f5f7fb; border-top: 1px solid #e7ecf4; border-bottom: 1px solid #e7ecf4; font-family: "Inter", sans-serif; }
.sobre-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: center; gap: 64px; max-width: 1180px; margin: 0 auto; }
.sobre-texto h2 { margin: 0 0 12px; color: #131a4d; font-size: 28px; line-height: 1.25; font-weight: 750; letter-spacing: -0.025em; }
.sobre-texto p { max-width: 570px; margin: 0 0 18px; color: #566079; font-size: 15px; line-height: 1.65; }
.sobre-cta { display: inline-flex; align-items: center; gap: 9px; color: #0052ff; font-size: 14px; line-height: 1.5; font-weight: 650; text-decoration: none; }
.sobre-cta:hover { text-decoration: underline; text-underline-offset: 5px; }
.sobre-cta:focus-visible { outline: 3px solid #0052ff; outline-offset: 5px; }
.sobre-numeros { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin: 0; }
.sobre-numeros > div { display: flex; flex-direction: column; gap: 7px; padding-left: 20px; border-left: 1px solid #dce3ef; }
.sobre-numeros dd { order: -1; margin: 0; color: #0052ff; font-size: 28px; line-height: 1.15; font-weight: 750; letter-spacing: -0.025em; }
.sobre-numeros dt { max-width: 110px; color: #63708a; font-size: 12px; line-height: 1.5; }
@media (max-width: 900px) {
  .sobre-grid { grid-template-columns: 1fr; gap: 30px; }
  .sobre-texto p { max-width: 650px; }
  .sobre-numeros { max-width: 460px; }
}
@media (max-width: 600px) {
  .sobre-section { padding: 32px 20px; }
  .sobre-texto h2 { font-size: 26px; }
  .sobre-grid { gap: 26px; }
  .sobre-numeros { gap: 12px; }
  .sobre-numeros > div { padding-left: 12px; }
  .sobre-numeros > div:first-child { padding-left: 0; border-left: 0; }
  .sobre-numeros dd { font-size: 25px; }
}
</style>
