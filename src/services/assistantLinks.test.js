import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assistantLinks } from './assistantLinks.js';

const site = {
  url: 'https://skilltechnologywork.com',
  whatsapp: 'https://wa.me/5563982809010',
  email: 'contato@skilltechnologywork.com',
};

test('contato e WhatsApp clicáveis preservam texto, pontuação e quebras', () => {
  const text = `Fale em /contato ou pelo WhatsApp: ${site.whatsapp}.\nEstamos à disposição!`;
  const parts = assistantLinks(text, site);
  assert.equal(parts.map(part => part.text).join(''), text);
  assert.deepEqual(parts.filter(part => part.href).map(part => part.href), ['/contato', site.whatsapp]);
  assert.equal(parts.find(part => part.href === site.whatsapp).external, true);
});

test('links em Markdown e URL oficial usam navegação interna', () => {
  const parts = assistantLinks(`[Fale com a equipe](${site.url}/contato) e /portfolio.`, site);
  assert.deepEqual(parts.filter(part => part.href), [
    { text: 'Fale com a equipe', href: '/contato' },
    { text: '/portfolio', href: '/portfolio' },
  ]);
});

test('e-mail oficial é clicável', () => {
  assert.equal(assistantLinks(site.email, site)[0].href, `mailto:${site.email}`);
});

test('HTML, protocolos perigosos e destinos desconhecidos continuam texto', () => {
  const text = '<img src=x onerror=alert(1)> [Clique](javascript:alert(1)) https://evil.test/contato https://wa.me/000 https://skilltechnologywork.com.evil.test/contato';
  const parts = assistantLinks(text, site);
  assert.equal(parts.map(part => part.text).join(''), text);
  assert.equal(parts.some(part => part.href), false);
});
