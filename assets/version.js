// Numéro de la dernière version publiée, lu sur la release GitHub la plus récente
// (tag `desktop-vX.Y.Z`) plutôt qu'écrit en dur dans les pages : sinon il faudrait
// penser à retoucher le site à chaque publication, et il finirait périmé.
//
// Ce fichier remplace trois copies identiques du même `fetch`, qui vivaient en bas
// d'`index.html`, de `faq.html` et de `comparatif.html`. Elles ne couvraient pas
// `docs.html`, qui porte pourtant un bouton de téléchargement — donc la mesure
// d'audience n'y avait aucun numéro de version à rattacher au clic.
//
// ⚠️ Volontairement SÉPARÉ de `mesure-audience.js` : les bloqueurs de publicité
// écartent les fichiers de mesure, et le numéro de version affiché à côté du bouton
// « Télécharger » ne doit pas disparaître avec eux.
//
// En cas d'échec (hors ligne, quota GitHub), on n'affiche simplement rien.
(() => {
  fetch('https://api.github.com/repos/ixelia-fr/playR-releases/releases/latest')
    .then((r) => (r.ok ? r.json() : null))
    .then((rel) => {
      const v = rel && rel.tag_name && rel.tag_name.replace(/^desktop-v?/, '');
      if (!v) return;

      document.querySelectorAll('[data-version]').forEach((el) => { el.textContent = ` (v${v})`; });

      // Publié sur <html> plutôt que dans une variable globale : n'importe quel
      // script de la page peut le lire, sans avoir à connaître l'ordre de
      // chargement. `mesure-audience.js` s'en sert pour rattacher un
      // téléchargement à la version réellement proposée au moment du clic.
      document.documentElement.dataset.playrVersion = v;
      document.dispatchEvent(new CustomEvent('playr:version', { detail: v }));
    })
    .catch(() => {});
})();
