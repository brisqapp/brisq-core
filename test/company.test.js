/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : company.test.js
 * Description    : Fichier de tests pour la partie company.
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
 
 describe("Test de la route company.route.js", () => {
 
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

        await db.schedule.create({
            id: "123456",
            weekday: "1",
            morningBegin: "08:00:00",
            morningEnd: "12:00:00",
            afternoonBegin: "13:00:00",
            afternoonEnd: "18:00:00",
            employeeId: "123456"
        })

        await db.serviceType.create({
            id: "123456",
            name: "test"
        })

        await db.serviceEmployee.create({
            id: "123456",
            employeeId: "123456",
            serviceTypeId: "123456",
            duration: "25"
        })
        
        await db.client.create({
            id: "123456",
            firstName: "test",
            lastName: "test",
            email: "test.test@test.com"
        })
        
        await db.reservation.create({
            id: "123456",
            startHour: "14:00:00",
            date: "2022-09-07",
            clientId: "123456",
            serviceEmployeeId: "123456"
        })

         done();
     });
 
     // Test N°1
     describe('Requête /POST avec un contenu correct', () => {
         it('cela doit renvoyer un code de status 200', (done) => {
             chai.request(app)
                 .post('/api/companies/').send({
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
                 .end((err, res) => {
                     res.should.have.status(200);
                     db.company.destroy({
                         where: {id: res.body.company.id}
                     })
                 done();
             });
         });
     });
 
     // Test N°2
     describe('Requête /POST avec un contenu incomplet', () => {
         it('cela doit renvoyer un code de status 400', (done) => {
             chai.request(app)
                 .post('/api/companies/').send({
                    lastName: "test",
                    email: "test.test@test.com",
                    password: "1234",
                    companyName: "test",
                    address: "test",
                    postalCode: "1400",
                    city: "test",
                    companyTypeId: "123456"
                 })
                 .end((err, res) => {
                     res.should.have.status(400);
                 done();
             });
         });
     });

    // Test N°3
    describe('Requête /GET sans avoir de token', () => {
        it('cela doit renvoyer un code de status 401', (done) => {
            chai.request(app)
                .get('/api/companies/')
                .end((err, res) => {
                    res.should.have.status(401);
                done();
            });
        });
    });

    // Test N°4
    describe('Requête /PUT sans avoir de token', () => {
        it('cela doit renvoyer un code de status 401', (done) => {
            chai.request(app)
                .put('/api/companies/')
                .end((err, res) => {
                    res.should.have.status(401);
                done();
            });
        });
    });

    // Test N°5
    describe('Requête /DELETE sans avoir de token', () => {
        it('cela doit renvoyer un code de status 401', (done) => {
            chai.request(app)
                .delete('/api/companies/')
                .end((err, res) => {
                    res.should.have.status(401);
                done();
            });
        });
    });

    // Test N°6
    describe("Requête /get pour récupérer tous details d'une company (réservations, employee, etc...", () => {
        it('cela doit renvoyer un code de status 200', (done) => {
            chai.request(app)
                .get('/api/companies/getCompanyDetails').send({
                    id: "123456"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });
    });
 
    // Suppression des ressources créée dans le "beforeEach" après chaque test
    afterEach(async (done) => {

        await db.reservation.destroy({
            where: { id: "123456" } 
        })

        await db.client.destroy({
            where: { id: "123456" } 
        })

        await db.schedule.destroy({
            where: { id: "123456" } 
        })

        await db.serviceEmployee.destroy({
            where: { id: "123456" } 
        })

        await db.serviceType.destroy({
            where: { id: "123456" } 
        })

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