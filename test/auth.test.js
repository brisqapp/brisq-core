/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : auth.test.js
 * Description    : Fichier de tests pour la partie authentification.
 * Par manque de temps aucun de ces tests ne vérifient pas le contenu du json renvoyé par le back-end.
 * De plus toutes les routes ne sont pas testées car elles ne sont pas toutes utilisées.
 */

const app = require("../app");
const db = require("../app/models");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Test de la route auth.route.js", () => {

    // Création des ressources nécessaires dans la BDD avant chaque lancement de test
    beforeEach(async (done) => { 
        await db.companyType.create({
            id: "123456",
            name: "test"
        });

        const salt = await bcrypt.genSalt(10);

        await db.company.create({
            id: "123456",
            firstName: "test",
            lastName: "test",
            email: "test.test@test.com",
            password: await bcrypt.hash("1234", salt),
            companyName: "test",
            address: "test",
            postalCode: "1400",
            city: "test",
            companyTypeId: "123456"
        });

        done();
    });

    // Test N°1 
    describe("Requête /POST avec un contenu correcte", () => {
        it('cela doit renvoyer un code de status 200', (done) => {
            chai.request(app)
                .post("/api/auth/").send({
                    email: "test.test@test.com",
                    password: "1234"
                }).end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });
    });

    // Test N°2
    describe("Requête /POST avec un contenu incomplet", () => {
        it('cela doit renvoyer un code de status 400', (done) => {
            chai.request(app)
                .post("/api/auth/").send({
                    email: "test.test@test.com"
                }).end((err, res) => {
                        res.should.have.status(400);
                    done();
                });
            });
        });

    // Test N°3
    describe("Requête /POST avec un email ou un mdp incorrecte", () => {
        it('cela doit renvoyer un code de status 403', (done) => {
            chai.request(app)
                .post("/api/auth/").send({
                    email: "test.test@test2.com",
                    password: "1234"
                }).end((err, res) => {
                        res.should.have.status(403);
                    done();
                });
            });
    });

    // Suppression des ressources créée dans le "beforeEach" après chaque test
    afterEach(async (done) => { 

        await db.company.destroy({
            where: { id: "123456" } 
        })

        await db.companyType.destroy({
            where: { id: "123456" } 
        });

        done();
    });

});