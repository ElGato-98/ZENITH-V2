# Zénith

Zénith est une PWA de carte céleste en JavaScript : projection gnomonique, catalogue embarqué, Astronomy Engine, géolocalisation, gyroscope/boussole et mode AR caméra.

## Déployer sur GitHub Pages

1. Créer un dépôt GitHub, par exemple `zenith`.
2. Envoyer tous les fichiers de ce dossier dans le dépôt.
3. Dans GitHub : `Settings` > `Pages`.
4. Dans `Build and deployment`, choisir `Deploy from a branch`.
5. Sélectionner la branche `main` et le dossier `/root`.
6. Ouvrir l'URL HTTPS générée par GitHub Pages.

L'app est statique : aucun build n'est nécessaire.

## Tester sur téléphone

Ouvrir l'URL GitHub Pages depuis le navigateur mobile. Le HTTPS permet aux permissions caméra, géolocalisation et orientation d'être demandées correctement par le navigateur.
