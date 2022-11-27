/*
    Creating form
 */

let form = document.getElementById('contact_form')

form.addEventListener('submit', postDataToServer, true)

function postDataToServer (event) {
    event.preventDefault()
    let fname = document.getElementById('fname')
    let lname = document.getElementById('lname')
    let email = document.getElementById('email')
    let tel = document.getElementById('tel')
    let information = document.getElementById('information')

    let response = fetch('/contacts/', {        //unused?
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:    JSON.stringify({
            'fname':       fname.value,
            'lname':       lname.value,
            'email':       email.value,
            'tel':         tel.value,
            'information': information.value,

        }),
    })
}
