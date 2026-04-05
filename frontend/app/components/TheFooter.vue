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

<style scoped lang="scss">
@use "~/assets/styles" as *;

.footer {
  background-color: color("ink");
  color: color("cream");
  padding-block: $spacing-xl;
  margin-top: $spacing-3xl;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-lg;
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  font-family: $font-display;
  font-size: $font-size-md;
  font-weight: 700;
  color: color("cream");
}
.footer__brand-logo {
  display: block;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.footer__links {
  display: flex;
  gap: $spacing-lg;
  flex-wrap: wrap;
}

.footer__links a {
  font-size: $font-size-sm;
  color: alpha("cream", 0.7);
  transition: color $duration-fast $ease;
}
.footer__links a:hover {
  color: tint("terracotta", 14);
}

.footer__copyright {
  font-size: $font-size-xs;
  color: alpha("cream", 0.55);
  margin: 0;
}

@include respond-below($breakpoint-sm) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}
</style>
