<script setup lang="ts">
/**
 * Contact section — displays admin phone and email fetched from the backend API.
 * No form; just prominent, clickable contact information.
 *
 * @pattern Adapter
 * @category Structural
 * @purpose Fetches raw contact data from the API and adapts it for display with fallback defaults.
 */

interface ContactData {
  phone: string
  email: string
}

const DEFAULT_CONTACT: ContactData = { phone: '', email: '' }

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: contactRaw } = await useFetch<ContactData>(`${baseUrl}/contact`)
const contact = computed(() => contactRaw.value ?? DEFAULT_CONTACT)
</script>

<template>
  <section id="contact" class="contact section" aria-labelledby="contact-title">
    <div class="container contact__inner">
      <div class="contact__intro" data-reveal>
        <span class="section__eyebrow">Contact</span>
        <h2 id="contact-title" class="section__title">
          Prendre rendez-vous pour la s&#233;ance bilan offerte.
        </h2>
        <p class="section__lede">
          Un message, une question, une prise de contact&nbsp;? Je vous r&#233;ponds
          personnellement sous quelques jours.
        </p>

        <ul class="contact__info">
          <li>
            <span class="contact__info-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span>R&#233;ponse sous 48h en semaine</span>
          </li>
          <li>
            <span class="contact__info-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <span>S&#233;ances en pr&#233;sentiel ou en visio</span>
          </li>
          <li>
            <span class="contact__info-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span>&#201;changes confidentiels et bienveillants</span>
          </li>
        </ul>
      </div>

      <div class="contact__card" data-reveal>
        <h3 class="contact__card-title">Me contacter directement</h3>
        <p class="contact__card-subtitle">
          N'h&#233;sitez pas &#224; me joindre par t&#233;l&#233;phone ou par email pour
          &#233;changer sur votre situation.
        </p>

        <div class="contact__methods">
          <a
            v-if="contact.phone"
            :href="`tel:${contact.phone}`"
            class="contact__method"
            aria-label="Appeler au {{ contact.phone }}"
          >
            <span class="contact__method-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                     19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18
                     2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2
                     2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1
                     2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
            </span>
            <span class="contact__method-details">
              <span class="contact__method-label">T&#233;l&#233;phone</span>
              <span class="contact__method-value">{{ contact.phone }}</span>
            </span>
          </a>

          <a
            v-if="contact.email"
            :href="`mailto:${contact.email}`"
            class="contact__method"
            aria-label="Envoyer un email &#224; {{ contact.email }}"
          >
            <span class="contact__method-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span class="contact__method-details">
              <span class="contact__method-label">Email</span>
              <span class="contact__method-value">{{ contact.email }}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.contact {
  background-color: color("cream");
}

.contact__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2xl;
  align-items: start;
}

.contact__intro {
  max-width: 40rem;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-top: $spacing-xl;
}

.contact__info li {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  color: color("ink-soft");
  font-weight: 500;
}

.contact__info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: alpha("terracotta", 0.12);
  color: color("terracotta");
  border-radius: $radius-md;
  flex-shrink: 0;
}

/* Contact card */
.contact__card {
  background-color: color("surface");
  padding: $spacing-2xl;
  border-radius: $radius-xl;
  box-shadow: $shadow-medium;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.contact__card-title {
  font-family: $font-display;
  font-size: $font-size-xl;
  color: color("ink");
  margin: 0;
}

.contact__card-subtitle {
  font-size: $font-size-md;
  color: color("ink-soft");
  margin: 0;
  line-height: $line-height-normal;
}

/* Contact methods */
.contact__methods {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.contact__method {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  background-color: color("cream");
  border: 1.5px solid color("border");
  text-decoration: none;
  color: inherit;
  transition: border-color $duration-fast $ease,
    box-shadow $duration-fast $ease,
    background-color $duration-fast $ease;
}

.contact__method:hover,
.contact__method:focus-visible {
  border-color: color("terracotta");
  box-shadow: 0 0 0 4px alpha("terracotta", 0.12);
  background-color: color("surface");
  outline: none;
}

.contact__method-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: alpha("terracotta", 0.12);
  color: color("terracotta");
  border-radius: $radius-md;
  flex-shrink: 0;
}

.contact__method-details {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xs;
}

.contact__method-label {
  font-size: $font-size-sm;
  font-weight: 600;
  color: color("muted");
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.contact__method-value {
  font-size: $font-size-lg;
  font-weight: 700;
  color: color("ink");
}

@media (min-width: 960px) {
  .contact__inner {
    grid-template-columns: 5fr 7fr;
    gap: $spacing-3xl;
  }
}

@media (max-width: 560px) {
  .contact__card {
    padding: $spacing-lg;
  }

  .contact__method {
    gap: $spacing-md;
    padding: $spacing-md;
  }

  .contact__method-icon {
    width: 44px;
    height: 44px;
  }

  .contact__method-value {
    font-size: $font-size-md;
  }
}
</style>
