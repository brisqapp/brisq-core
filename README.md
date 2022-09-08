<div align="center">
<img src="https://github.com/brisqapp/admin/blob/main/logo.jpg" width="320px"><br/>
Une manière simple de gérer ses rendez-vous
</div>

<hr/>

# Back-end (API REST)

## Prérequis d'installation

- Avoir Docker d'installé, avec le plugin `docker-compose`.

## Installation pour développement en local

1. Cloner le repository courant

```bash
git clone https://github.com/brisqapp/brisq-core.git
```

2. Lancer le conteneur

```bash
docker-compose up -d
```

4. L'API devrait être accessible à l'adresse `https://[nom d'hôte du serveur]:8080`.

## Astuces de développement

- Si vous souhaitez afficher les journaux de l'application, utilisez la commande `docker logs brisq-core-app-1`.
- Comme nous utilisons un container, les modifications ne sont pas directement pris en compte. Afin de pouvoir "valider" les modifications, il faut exécuter cette commande dans le dossier contenant le `docker-compose` : `docker-compose up -d --build`
- Pour les routes, une documentation automatique peut être générée. Elle est disponible à l'adresse `https://api-doc.brisq.app/`. Pour la générer, il faut exécuter cette commande à la racine du back-end : `apidoc -i app -o docs`
- Dans le dossier `test`, des tests unitaires sont présents pour les routes de notre application. Nous utilisons `mocha` et `chai` pour faire des tests express.js. Lancer la commande `npm test` afin d'exécuter tous les tests présent dans le dossier `test`.
