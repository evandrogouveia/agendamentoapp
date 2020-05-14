importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyC8wIKRV-0dpdwWJbDBhY9baV-lhFiwmwo',
    authDomain: 'agendamento-f8fb6.firebaseapp.com',
    databaseURL: 'https://agendamento-f8fb6.firebaseio.com',
    projectId: 'agendamento-f8fb6',
    storageBucket: 'agendamento-f8fb6.appspot.com',
    messagingSenderId: '1026898851432',
    appId: '1:1026898851432:web:428a48906ea748ce',
    'messagingSenderId': '1026898851432'
});

const messaging = firebase.messaging();