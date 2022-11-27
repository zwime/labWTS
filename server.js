const { v4: uuidv4 } = require('uuid');
express = require('express');
app = express();
app.use(express.static("public"));
helper = require('./helperfunctions/helper');
fs = require('fs');


const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

let contactFile = fs.readFileSync("data.json");
let contacts = JSON.parse(contactFile);
console.log(contacts)


app.get('/contacts', function(req, res) {
    contactFile = fs.readFileSync("data.json");
    contacts = JSON.parse(contactFile);

    let list = [];
    contacts.forEach(function(contact) {
        list.push({
            uuid: contact.uuid,
            name: contact.fname + " " + contact.lname
        })
    })

    res.send(list)
});

app.get('/contacts/:uuid', function(req, res) {
    contactFile = fs.readFileSync("data.json");
    contacts = JSON.parse(contactFile);
    let contact = contacts.filter(contact => contact.uuid === req.params.uuid)

    res.send(contact[0])

});

app.delete('/contacts/:uuid', function(req, res) {
    let uuid = req.params.uuid

    let rawContacts = fs.readFileSync('data.json')
    let contacts = JSON.parse(rawContacts);

    saveData(contacts.filter(contact => contact.uuid !== uuid))

    res.send('ok')


});

app.post('/contacts', function(req, res) {
    let data = req.body
    data['uuid'] = uuidv4()
    contacts.push(data)

    saveData(contacts)

    res.send('ok')
});



app.listen(3000, function () {
    console.log(`Hello world`, 5);
});

function printToConsole(subtrain, id) {
    console.log(subtrain);
}

function saveData(contacts) {
    fs.writeFile("data.json", JSON.stringify(contacts), (err) => {
        if (err) throw err;
        console.log("saved.");
    });
}
