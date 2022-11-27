getContacts()

async function getContacts () {
    let response = await fetch('/contacts/', {
        method:  'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let contact_requests = await response.json()
    let placeholder_div = document.getElementById('placeholder')
    placeholder_div.innerHTML = ''

    contact_requests.forEach(function (contact) {

        let div = document.createElement('div')
        div.className = 'contact-request'

        let link = document.createElement('a')
        link.innerHTML = contact.name
        link.dataset.uuid = contact.uuid
        link.href = 'javascript: void(0);'

        link.addEventListener('click', async function (event) {
            let link = event.target
            let uuid = link.dataset.uuid

            if (link.dataset.status === 'open') {
                let details = document.querySelector(
                    '.details[data-uuid=\'' + uuid + '\']')
                details.remove()
                link.dataset.status = 'closed'
                return
            }

            let response = await fetch('/contacts/' + uuid, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            link.dataset.status = 'open'

            let contact = await response.json()

            let details = document.createElement('div')
            details.className = 'details'
            details.dataset.uuid = uuid
            details.innerHTML = contact.email + '<br>' +
                contact.tel + '<br>' +
                contact.information + '<br>'
            link.after(details)
        })

        div.appendChild(link)

        let btn_delete = document.createElement('button')
        btn_delete.dataset.uuid = contact.uuid
        btn_delete.innerText = 'delete'

        div.appendChild(btn_delete)
        btn_delete.addEventListener('click', delContact)

        placeholder_div.appendChild(div)

    })

}

async function delContact (event) {
    if (window.confirm('Are you sure?')) {
        let button = event.target
        let uuid = button.dataset.uuid

        await fetch('/contacts/' + uuid, {
            method:  'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        getContacts()
    }
}



