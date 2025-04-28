
# Readme - Explanations of Choices and Decisions

## Introduction

Ce fichier explique les choix, décisions et problèmes que j'ai rencontrés lors du développement de l'application Todo List avec React pour le frontend, NestJS pour le backend et MySQL pour la base de données.


## Problèmes et Défis Rencontrés

### 1. Synchronisation entre le Frontend et le Backend

**Problème** : Lors du développement de la fonctionnalité de création et d'édition des tâches, j'ai dû m'assurer que les données envoyées par le frontend étaient correctement traitées par le backend.

**Solution** : J'ai utilisé des requêtes HTTP `POST` et `PATCH` dans React pour interagir avec les API du backend.

### 3. Gestion des erreurs dans les appels API

**Problème** : Au début, j'avais des difficultés à gérer les erreurs provenant des appels API du backend.

**Solution** : J'ai implémenté des blocs `try-catch` dans le backend pour attraper les erreurs et envoyer des messages appropriés à l'utilisateur. Sur le frontend, j'ai ajouté une gestion d'erreurs pour afficher des messages utiles lorsque quelque chose ne va pas.

---

### 4. Synchronisation entre la base de données et le frontend

**Problème** : La récupération des tâches dans le frontend ne se faisait pas correctement si les données dans la base de données changeaient.

**Solution** : J'ai utilisé une fonction de récupération des tâches qui est appelée après chaque modification (création, édition ou suppression) pour s'assurer que l'affichage est toujours à jour avec la base de données.

---

## Choix d'Implémentation

**Gestion des tâches dans la base de données**  
   J'ai créé une table `tasks` dans MySQL pour stocker les tâches, avec les colonnes suivantes : `id`, `name`, `createdAt`, `updatedAt`, et `done`. La colonne `done` est utilisée pour indiquer si une tâche est terminée ou non.

**Interface utilisateur simple et intuitive**  
   L'interface utilisateur est conçue pour être claire et facile à utiliser, avec des options simples pour ajouter, modifier et supprimer des tâches. L'état de chaque tâche est reflété immédiatement dans l'interface.



