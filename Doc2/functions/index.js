const functions = require('firebase-functions');
const express = require('express');
const request = require ('request');
const nodemailer = require ('nodemailer');
const engines = require('consolidate'); //use for the handlebars

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    
        response.render('index');
    
});

app.get('/contact', (request, response) => {
    response.render('contact');
});

app.get('/cosmetic', (request, response) => {
    response.render('cosmetic');
});

app.get('/dental-hygiene', (request, response) => {
    response.render('dental-hygiene');
});

app.get('/digital-xray', (request, response) => {
    response.render('digital-xray');
});

app.get('/educational-videos', (request, response) => {
    response.render('educational-videos');
});

app.get('/gallery', (request, response) => {
    response.render('gallery');
});

app.get('/implants', (request, response) => {
    response.render('implants');
});

app.get('/intraoral-cam', (request, response) => {
    response.render('intraoral-cam');
});

app.get('/links', (request, response) => {
    response.render('links');
});

app.get('/meet-the-dr', (request, response) => {
    response.render('meet-the-dr');
});

app.get('/meet-the-staff', (request, response) => {
    response.render('meet-the-staff');
});

app.get('/new-patient-forms', (request, response) => {
    response.render('new-patient-forms');
});

app.get('/oral-cancer-screen', (request, response) => {
    response.render('oral-cancer-screen');
});

app.get('/oral-surgery', (request, response) => {
    response.render('oral-surgery');
});

app.get('/pediatric', (request, response) => {
    response.render('pediatric');
});

app.get('/periodontal-disease', (request, response) => {
    response.render('periodontal-disease');
});

app.get('/post-op-instructions', (request, response) => {
    response.render('post-op-instructions');
});

app.get('/practice', (request, response) => {
    response.render('practice');
});

app.get('/preventive-devices', (request, response) => {
    response.render('preventive-devices');
});

app.get('/q-and-a', (request, response) => {
    response.render('q-and-a');
});

app.get('/restorative', (request, response) => {
    response.render('restorative');
});

app.get('/root-canal', (request, response) => {
    response.render('root-canal');
});

app.get('/rotary-endo', (request, response) => {
    response.render('rotary-endo');
});

app.get('/surgical-instructions', (request, response) => {
    response.render('surgical-instructions');
});

exports.app = functions.https.onRequest(app);
