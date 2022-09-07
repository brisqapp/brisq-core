/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : client.test.js
 * Description    : Fichier de tests pour la partie client.
 * Par manque de temps aucun de ces tests ne vérifient pas le contenu du json renvoyé par le back-end.
 * De plus toutes les routes ne sont pas testées car elles ne sont pas toutes utilisées.
 */

const app = require("../app");
const db = require("../app/models");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe("Test de la route client.route.js", () => {

    // Création des ressources nécessaires dans la BDD avant chaque lancement de test
    beforeEach((done) => { 
        done();
    });

    // Test N°1
    describe('Requête /POST avec un contenu correct', () => {
        it('cela doit renvoyer un code de status 200', (done) => {
            chai.request(app)
                .post('/api/clients/').send({
                    firstName: "test",
                    lastName: "test",
                    email: "test.test@test.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    db.client.destroy({
                        where: {id: res.body.id}
                    })
                done();
            });
        });
    });

    // Test N°2
    describe('Requête /POST avec un contenu incomplet', () => {
        it('cela doit renvoyer un code de status 400', (done) => {
            chai.request(app)
                .post('/api/clients/').send({
                    firstName: "test",
                    lastName: "test"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        });
    });

    // Suppression des ressources créée dans le "beforeEach" après chaque test
    afterEach((done) => { 
        done();
    });

});