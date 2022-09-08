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

3. L'API devrait être accessible à l'adresse `https://[nom d'hôte du serveur]:8080`.

## Astuces de développement

- Si vous souhaitez afficher les journaux de l'application, utilisez la commande `docker logs brisq-core-app-1`.
- Comme nous utilisons un container, les modifications ne sont pas directement pris en compte. Afin de pouvoir "valider" les modifications, il faut exécuter cette commande à la racine du repository : `docker-compose up -d --build`
- Pour les routes, une documentation automatique peut être générée. Elle est disponible à l'adresse `https://api-doc.brisq.app/`. Pour la générer, il faut exécuter cette commande à la racine du back-end : `apidoc -i app -o docs`
- Dans le dossier `test`, des tests unitaires sont présents pour les routes de notre application. Nous utilisons `mocha` et `chai` pour faire des tests express.js. Lancer la commande `npm test` afin d'exécuter tous les tests présent dans le dossier `test`.

## Développement

### Principales technologies utilisées

- L'application utilise `express.js`
- Nous utilisons `Sequelize` comme ORM afin de simplifier l'utilisation d'une BDD (création de schéma, insertion, suppression etc...)
Lien : https://sequelize.org/
- Comme dit précèdemmenent, nous utilisons `mocha` et `chai` pour les tests.
Lien : https://mochajs.org/
Lien : https://www.chaijs.com/
- Nous utilisons `jsonwebtoken` et `bcrypt` pour la protection du mot de passe et l'utilisation d'un token.

### Infrastructure des dossiers

- `config` : Contient la connexion à la BDD à l'aide de `Sequelize`
- `controllers` : Contient les requêtes faites à la BDD à l'aide de `Sequelize`
- `middleware` : Contient la partie sécurité de notre API (authentification avec token)
- `models` : Contient les tables et le modèle de la BDD
- `routes` : Contient toutes les routes accessible de l'API
- `server.js` : Contient le serveur
- `app.js` : Synchronisation de la BDD et spécification des routes