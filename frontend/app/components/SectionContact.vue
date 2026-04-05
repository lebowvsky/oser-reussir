<script setup lang="ts">
/**
 * @pattern Mediator + State
 * @purpose Form state management with native HTML5 validation, no real submission.
 */
type Role = '' | 'parent' | 'jeune' | 'autre'

interface ContactForm {
  prenom: string
  nom: string
  email: string
  telephone: string
  message: string
  role: Role
  consent: boolean
}

type SubmitState = 'idle' | 'success' | 'error'

const createEmptyForm = (): ContactForm => ({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  message: '',
  role: '',
  consent: false,
})

const form = ref<ContactForm>(createEmptyForm())
const submitState = ref<SubmitState>('idle')

const handleSubmit = (event: Event): void => {
  event.preventDefault()

  // No real submission — log for now, will be wired to backend later.
  // eslint-disable-next-line no-console
  console.log('[Oser Réussir] Contact form submitted:', { ...form.value })

  submitState.value = 'success'
  form.value = createEmptyForm()

  // Reset inline message after 6s
  window.setTimeout(() => {
    submitState.value = 'idle'
  }, 6000)
}
</script>

<template>
  <section id="contact" class="contact section" aria-labelledby="contact-title">
    <div class="container contact__inner">
      <div class="contact__intro" data-reveal>
        <span class="section__eyebrow">Contact</span>
        <h2 id="contact-title" class="section__title">
          Prendre rendez-vous pour la séance bilan offerte.
        </h2>
        <p class="section__lede">
          Un message, une question, une prise de contact&nbsp;? Je vous réponds
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
            <span>Réponse sous 48h en semaine</span>
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
            <span>Séances en présentiel ou en visio</span>
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
            <span>Échanges confidentiels et bienveillants</span>
          </li>
        </ul>
      </div>

      <form
        class="contact__form"
        novalidate="false"
        data-reveal
        @submit="handleSubmit"
      >
        <div class="contact__row">
          <div class="contact__field">
            <label for="prenom">Prénom <span aria-hidden="true">*</span></label>
            <input
              id="prenom"
              v-model="form.prenom"
              type="text"
              name="prenom"
              autocomplete="given-name"
              required
            />
          </div>
          <div class="contact__field">
            <label for="nom">Nom <span aria-hidden="true">*</span></label>
            <input
              id="nom"
              v-model="form.nom"
              type="text"
              name="nom"
              autocomplete="family-name"
              required
            />
          </div>
        </div>

        <div class="contact__row">
          <div class="contact__field">
            <label for="email">Email <span aria-hidden="true">*</span></label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              required
            />
          </div>
          <div class="contact__field">
            <label for="telephone">Téléphone <span class="contact__hint">(optionnel)</span></label>
            <input
              id="telephone"
              v-model="form.telephone"
              type="tel"
              name="telephone"
              autocomplete="tel"
            />
          </div>
        </div>

        <div class="contact__field">
          <label for="role">Vous êtes <span aria-hidden="true">*</span></label>
          <select id="role" v-model="form.role" name="role" required>
            <option value="" disabled>— Choisissez une option —</option>
            <option value="parent">Un parent</option>
            <option value="jeune">Le jeune concerné</option>
            <option value="autre">Autre (enseignant, proche...)</option>
          </select>
        </div>

        <div class="contact__field">
          <label for="message">Message <span aria-hidden="true">*</span></label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            rows="5"
            required
            placeholder="Présentez brièvement votre situation ou votre demande…"
          ></textarea>
        </div>

        <div class="contact__field contact__field--checkbox">
          <input
            id="consent"
            v-model="form.consent"
            type="checkbox"
            name="consent"
            required
          />
          <label for="consent">
            J'accepte d'être recontacté(e) concernant cette demande.
          </label>
        </div>

        <button type="submit" class="btn btn--primary contact__submit">
          Envoyer le message
          <svg
            viewBox="0 0 20 20"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 10h10M11 5l5 5-5 5" />
          </svg>
        </button>

        <p
          v-if="submitState === 'success'"
          class="contact__feedback contact__feedback--success"
          role="status"
          aria-live="polite"
        >
          <svg
            viewBox="0 0 20 20"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 10l4 4 8-8" />
          </svg>
          Merci&nbsp;! Votre message a bien été pris en compte. Je reviens vers
          vous rapidement.
        </p>

        <p class="contact__legal">
          Les informations recueillies sont utilisées uniquement dans le cadre
          de votre demande. Aucun partage à des tiers.
        </p>
      </form>
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

/* Form */
.contact__form {
  background-color: color("surface");
  padding: $spacing-2xl;
  border-radius: $radius-xl;
  box-shadow: $shadow-medium;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.contact__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-md;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xs;
}

.contact__field label {
  font-size: $font-size-sm;
  font-weight: 600;
  color: color("ink");
}

.contact__hint {
  font-weight: 400;
  color: color("muted");
  font-size: $font-size-xs;
}

.contact__field input[type='text'],
.contact__field input[type='email'],
.contact__field input[type='tel'],
.contact__field select,
.contact__field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: $font-body;
  font-size: $font-size-base;
  color: color("ink");
  background-color: color("cream");
  border: 1.5px solid color("border");
  border-radius: $radius-md;
  transition: border-color $duration-fast $ease,
    background-color $duration-fast $ease,
    box-shadow $duration-fast $ease;
}

.contact__field input:focus,
.contact__field select:focus,
.contact__field textarea:focus {
  outline: none;
  border-color: color("terracotta");
  background-color: color("surface");
  box-shadow: 0 0 0 4px alpha("terracotta", 0.15);
}

.contact__field textarea {
  resize: vertical;
  min-height: 120px;
  line-height: $line-height-normal;
}

.contact__field--checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: $spacing-sm;
  margin-top: $spacing-xs;
}

.contact__field--checkbox input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: color("terracotta");
  cursor: pointer;
  flex-shrink: 0;
}

.contact__field--checkbox label {
  font-weight: 400;
  color: color("ink-soft");
  font-size: $font-size-sm;
  cursor: pointer;
  line-height: 1.45;
}

.contact__submit {
  align-self: flex-start;
  margin-top: $spacing-xs;
}

.contact__feedback {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: 600;
  margin: 0;
}

.contact__feedback--success {
  background-color: alpha("sage-soft", 0.18);
  color: shade("primary", 16);
  border: 1px solid color("primary");
}

.contact__legal {
  font-size: $font-size-xs;
  color: color("muted");
  margin: 0;
  line-height: 1.6;
}

@include respond-above($breakpoint-sm) {
  .contact__row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  .contact__inner {
    grid-template-columns: 5fr 7fr;
    gap: $spacing-3xl;
  }
}

@media (max-width: 560px) {
  .contact__form {
    padding: $spacing-lg;
  }
}
</style>
