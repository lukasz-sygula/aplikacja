//const DB = require('../../src/storage/db')
//const db = new DB()
//const config = require('config')


const inputRss = document.getElementById("url");
const btnAdd = document.getElementById("button-add");
const lsOutput = document.getElementById("lsOutput");
const saveBtn = document.getElementById("savebtn");
const previewBtn = document.getElementById("previewbtn")
const sendBtn = document.getElementById("sendbtn")
const email = document.getElementById('e-mail');
const iframe = document.getElementById('encoder_iframe');
const rssKey = "rss";

btnAdd.onclick = function() {
    const value = inputRss.value;
    if(!value){
        alert('Wprowadź url nim klikniesz "Dodaj"!');
        return;
    } else {
        localStorage.setItem(rssKey, value);
        lsOutput.innerHTML = localStorage.getItem(rssKey);
    }
};


saveBtn.onclick = async function() {

    // ustawienie przycisku na tylko do odczytu
    const emailValue = email.value;

    if(!email.readOnly === true)
    {
        email.readOnly = true;
    }


    // wyslanie zmian do backendu
    localStorage.getItem(rssKey);

    
    urlToPost = '/api/v1/rss';

    var bodyContent = JSON.stringify(
        {
            rss: localStorage.getItem(rssKey)
        });


    fetch(urlToPost, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: bodyContent
    })
    .then(res=> console.log(res.status));
};

previewBtn.onclick = async function() {

    var url = "http://localhost:8081/api/v1/mail";

    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'GET'
    })
    .then(response => response.text())
    .then(data=>
        {
            document.getElementById("encoder_iframe").srcdoc = data;
            
            
            
            console.log(data);
            //console.log(data);
            //var doc = iframe.contentWindow.document;
            //doc.open();
            //doc.write(data);
            //doc.close();
        }
    );
};

sendBtn.onclick = async function() {


    const emailValue = email.value;

    if(!email.readOnly === true)
    {
        alert('Email nie został zapisany!');
    }
    else
    {
        urlToPost = '/api/v1/mail';

        var bodyContent = JSON.stringify(
            {
                email: emailValue
            });
    
        fetch(urlToPost, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: bodyContent
        })
        .then(res=>res.text())
        .then(res=> alert(res));
    }
};
