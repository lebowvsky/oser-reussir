<script setup lang="ts">
/**
 * Footer — copyright + liens symboliques.
 */
interface FooterLink {
  readonly label: string
  readonly href: string
}

const footerLinks: readonly FooterLink[] = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
] as const

const logoSrc = '/logo.png'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">
      <div class="footer__brand">
        <img
          :src="logoSrc"
          alt=""
          aria-hidden="true"
          class="footer__brand-logo"
          width="32"
          height="32"
        />
        <span class="footer__name">Oser Réussir</span>
      </div>

      <nav class="footer__nav" aria-label="Navigation secondaire">
        <ul class="footer__links">
          <li v-for="link in footerLinks" :key="link.label">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <p class="footer__copyright">&copy; {{ year }} Oser Réussir — Tous droits réservés</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-ink);
  color: var(--color-cream);
  padding-block: var(--space-xl);
  margin-top: var(--space-3xl);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-display);
  font-size: var(--fs-md);
  font-weight: 700;
  color: var(--color-cream);
}
.footer__brand-logo {
  display: block;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.footer__links {
  display: flex;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.footer__links a {
  font-size: var(--fs-sm);
  color: rgba(251, 246, 239, 0.7);
  transition: color var(--dur-fast) var(--ease);
}
.footer__links a:hover {
  color: var(--color-terracotta-soft);
}

.footer__copyright {
  font-size: var(--fs-xs);
  color: rgba(251, 246, 239, 0.55);
  margin: 0;
}

@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}
</style>
