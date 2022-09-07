/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : employee.test.js
 * Description    : Fichier de tests pour la partie employee.
 * Par manque de temps aucun de ces tests ne vérifient pas le contenu du json renvoyé par le back-end.
 * De plus toutes les routes ne sont pas testées car elles ne sont pas toutes utilisées.
 * Certaines routes nécessitent l'utilisation d'un token valide afin de pouvoir être utilisée,
 * c'est pourquoi nous avons décidé pour ces routes de ne pas tester leur bon fonctionnement mais 
 * seulement vérifier qu'ils renvoient bien un code 403.
 */

 const app = require("../app");
 const db = require("../app/models");
 
 const chai = require('chai');
 const chaiHttp = require('chai-http');
 const should = chai.should();
 
 chai.use(chaiHttp);
 
 describe("Test de la route employee.route.js", () => {
 
     // Création des ressources nécessaires dans la BDD avant chaque lancement de test
     beforeEach(async (done) => { 
        await db.companyType.create({
            id: "123456",
            name: "test"
        })

        await db.company.create({
            id: "123456",
            firstName: "test",
            lastName: "test",
            email: "test.test@test.com",
            password: "1234",
            companyName: "test",
            address: "test",
            postalCode: "1400",
            city: "test",
            companyTypeId: "123456"       
        })

        await db.employee.create({
            id: "123456",
            name: "test",
            companyId: "123456"
        })

         done();
     });
 
     // Test N°1
     describe('Requête /POST sans avoir de token', () => {
         it('cela doit renvoyer un code de status 401', (done) => {
             chai.request(app)
                 .post('/api/employees/').send({

                 })
                 .end((err, res) => {
                     res.should.have.status(401);
                 done();
             });
         });
     });
 
     // Test N°2
     describe('Requête /GET sans avoir de token', () => {
         it('cela doit renvoyer un code de status 401', (done) => {
             chai.request(app)
                 .get('/api/employees/')
                 .end((err, res) => {
                     res.should.have.status(401);
                 done();
             });
         });
     });

    // Test N°3
    describe("Requête /GET pour récupérer les informations en fonction de l'id", () => {
        it('cela doit renvoyer un code de status 200', (done) => {
            chai.request(app)
                .put('/api/employees/123456')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });
    });
 
    // Suppression des ressources créée dans le "beforeEach" après chaque test
    afterEach(async (done) => { 

        await db.employee.destroy({
            where: { id: "123456" } 
        })

        await db.company.destroy({
            where: {id: "123456"}
        })

        await db.companyType.destroy({
            where: { id: "123456" } 
        })

         done();
    });
 
 });