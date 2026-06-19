import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CnssService } from '../../core/services/cnss.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  template: `
    <h2 class="page-title">Profil </h2>

    <!-- API 1 : identité employeur -->
    <section class="cnss-panel">
      <div class="cnss-panel__title">identité employeur</div>
      @if (identite(); as id) {
        <table class="cnss-table kv-table">
          <tbody>
            <tr>
              <td class="kv-key">employeur</td>
              <td>{{ id.employeur }}</td>
              <td class="kv-key">raison sociale</td>
              <td>{{ id.raisonSociale }}</td>
            </tr>
            <tr>
              <td class="kv-key">adresse</td>
              <td colspan="3">{{ id.adresse }}</td>
            </tr>
            <tr>
              <td class="kv-key">Date Affiliation</td>
              <td>{{ id.dateAffiliation }}</td>
              <td class="kv-key">bureau</td>
              <td>{{ id.bureau }}</td>
            </tr>
            <tr>
              <td class="kv-key">Regime</td>
              <td>{{ id.regime }}</td>
              <td class="kv-key">Exoneration</td>
              <td>{{ id.exoneration }}</td>
            </tr>
          </tbody>
        </table>
      } @else {
        <p class="loading">Chargement…</p>
      }
    </section>

    <!-- API 2 : les codes d'exploitation -->
    <section class="cnss-panel">
      <div class="cnss-panel__title">les codes d'exploitation</div>
      <table class="cnss-table">
        <thead>
          <tr>
            <th>code</th>
            <th>libellé</th>
            <th>date debut</th>
            <th>date fin</th>
          </tr>
        </thead>
        <tbody>
          @for (c of codes(); track c.code) {
            <tr>
              <td>{{ c.code }}</td>
              <td>{{ c.libelle }}</td>
              <td>{{ c.dateDebut }}</td>
              <td>{{ c.dateFin }}</td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="loading">Chargement…</td></tr>
          }
        </tbody>
      </table>
    </section>

    <!-- API 3 : Taux ATMP -->
    <section class="cnss-panel">
      <div class="cnss-panel__title">Taux ATMP</div>
      <table class="cnss-table">
        <thead>
          <tr>
            <th>reference</th>
            <th>Taux</th>
            <th>Bonus/Malus</th>
            <th>Taux Appliqué</th>
            <th>Date debut</th>
            <th>Date fin</th>
          </tr>
        </thead>
        <tbody>
          @for (t of taux(); track t.reference) {
            <tr>
              <td>{{ t.reference }}</td>
              <td>{{ t.taux }}</td>
              <td>{{ t.bonusMalus }}</td>
              <td>{{ t.tauxApplique }}</td>
              <td>{{ t.dateDebut }}</td>
              <td>{{ t.dateFin }}</td>
            </tr>
          } @empty {
            <tr><td colspan="6" class="loading">Chargement…</td></tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      .loading {
        padding: 1rem;
        color: var(--cnss-muted);
        text-align: center;
      }
    `,
  ],
})
export class Profil {
  private readonly cnss = inject(CnssService);

  readonly identite = toSignal(this.cnss.getIdentiteEmployeur());
  readonly codes = toSignal(this.cnss.getCodesExploitation(), {
    initialValue: [],
  });
  readonly taux = toSignal(this.cnss.getTauxAtmp(), { initialValue: [] });
}
