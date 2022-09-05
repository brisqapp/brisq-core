<div align="center">
<img src="https://github.com/brisqapp/admin/blob/main/logo.jpg" width="320px"><br/>
Une manière simple de gérer ses rendez-vous
</div>

<hr/>

# Back-end (API REST)

## Prérequis d'installation
- Avoir Docker d'installé, avec le plugin `docker-compose`.
- Avoir `node.js` et `npm` d'installé.

## Installation pour développement en local

1. Cloner le repository courant

```bash
$ git clone https://github.com/brisqapp/brisq-core.git
```

2. Installer les dépendances

```bash
$ npm install
````

3. Lancer le conteneur

```bash
$ docker-compose up -d
```

4. L'API devrait être accessible à l'adresse `https://[nom d'hôte du serveur]:8080`.

> **Note**
> Vous pouvez désormais modifier les sources du repository local que vous avez cloné.
