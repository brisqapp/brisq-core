/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceType.test.js
 * Description    : Fichier de tests pour la partie serviceType.
 * Par manque de temps aucun de ces tests ne vérifient pas le contenu du json renvoyé par le back-end.
 * De plus toutes les routes ne sont pas testées car elles ne sont pas toutes utilisées.
 */

 const app = require("../app");
 const db = require("../app/models");
 
 const chai = require('chai');
 const chaiHttp = require('chai-http');
 const should = chai.should();
 
 chai.use(chaiHttp);
 
 describe("Test de la route serviceType.route.js", () => {
 
     // Création des ressources nécessaires dans la BDD avant chaque lancement de test
     beforeEach(async (done) => { 

        await db.serviceType.create({
            id: "123456",
            name: "test2"
        })

         done();
     });
 
     // Test N°1
     describe('Requête /POST avec un contenu correcte', () => {
         it('cela doit renvoyer un code de status 200', (done) => {
             chai.request(app)
                 .post('/api/serviceTypes/').send({
                    name: "test2"
                 })
                 .end((err, res) => {
                    res.should.have.status(200);

                    db.serviceType.destroy({
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
                .post('/api/serviceTypes/').send({

                })
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        });
    });

    // Test N°3
    describe('Requête /GET pour récupérer tous les serviceTypes', () => {
        it('cela doit renvoyer un code de status 200', (done) => {
            chai.request(app)
                .get('/api/serviceTypes/')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });
    });

    // Suppression des ressources créée dans le "beforeEach" après chaque test
    afterEach(async (done) => { 

        await db.serviceType.destroy({
            where: { id: "123456" } 
        })

        done();
    });
 
 });

 