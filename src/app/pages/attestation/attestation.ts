import { Component } from '@angular/core';

@Component({
  selector: 'app-attestation',
  standalone: true,
  template: `
    <h2 class="page-title">Attestation du solde....</h2>
    <section class="cnss-panel">
      <div class="cnss-panel__title">Attestation du solde</div>
      <div class="placeholder">
        <p>Consultation et téléchargement de l'attestation du solde de cotisations.</p>
      </div>
    </section>
  `,
  styles: [
    `
      .placeholder {
        padding: 2rem 1.2rem;
        color: var(--cnss-muted);
      }
    `,
  ],
})
export class Attestation {}
