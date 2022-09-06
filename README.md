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

- Un volume a été créé entre le repository cloné et le container que vous avez lancé. Cela signifie que tout changement aux sources sera automatiquement appliqué au container (qui sera actualisé par *nodemon*). Cela permet de simplifier le développement.
- Si vous souhaitez afficher les journaux de l'application, utilisez la commande `docker logs brisq-core-app-1`.
