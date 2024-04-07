const getElement = (id) => {
    return document.getElementById(id) ?? console.error(`${id} was not found, please report this bug.`)
}

const objects = {
    outer: getElement('outer'),
    user: getElement('rightButton'),
    userModal: getElement('userModal'),
    closeUser: getElement('closeUser'),
    userExtensions: getElement('userExtensions'),
    searchButton: getElement('searchButton'),
    searchField: getElement('search'),

    userField: getElement('userSearch'),
    userButton: getElement('userSearchButton'),
    copyBanner: getElement('copyBanner')
}
var currentArray = [];

const galleries = ['tw', 'pm', 'ruby', 'elmobear', 'mistium', 'electramod'],
    jsons = {
        all: [],
    };

for (const galleryName of galleries) {
    const galleryJson = await fetchJson(`./jsons/${galleryName}.json`);
    jsons[galleryName] = galleryJson;
    jsons.all = jsons.all.concat(galleryJson);

    createDropdown(galleryName)
}

createDropdown("all")

const hash = window.location.hash?.split('#')[1]
var current = jsons[hash] ? hash : 'all';
if (current != "all") objects.user.value = current
objects.searchField.setAttribute('placeholder', current)

async function createDropdown(galleryName) {

    const div = document.createElement('div');
    div.classList = "userTopBar";
    if (galleryName != "all") {
        objects.userExtensions.appendChild(div);
    } else {
        const first = objects.userExtensions.firstChild;

        objects.userExtensions.insertBefore(div, first)
    }

    const name = document.createElement('span');
    name.innerText = galleryName;
    div.appendChild(name)

    const amount = document.createElement('span');
    amount.innerText = jsons[galleryName].length + " extensions"
    div.appendChild(amount)

    userClick(div, galleryName)

}

function userClick(element, name) {
    element.addEventListener('click', function() {
        current = name;
        objects.searchField.setAttribute('placeholder', current)
        objects.outer.innerHTML = ""
        create()

        objects.userModal.close()
    })
}

async function fetchJson(url) {
    const json = await fetch(url);
    return await json.json();
}

async function create(array) {
    var index = 0;
    currentArray = [];
    for (const x of array ?? jsons[current]) {
        if (currentArray.includes(x.name)) return;

        const body = document.createElement('div');
        body.classList = 'extension';
        objects.outer.appendChild(body);

        const buttonBody = document.createElement('div');
        body.appendChild(buttonBody);

        const img = document.createElement('img');
        img.src = x.picture;
        img.loading = "lazy"
        buttonBody.appendChild(img);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList = 'extensionButtons';
        buttonBody.appendChild(buttonWrapper);

        const button = document.createElement('a');
        button.innerText = 'Copy Link';
        buttonWrapper.appendChild(button);

        const code = document.createElement('a');
        code.innerText = 'Copy Code';
        buttonWrapper.appendChild(code);

        const name = document.createElement('span');
        name.innerText = x.name;
        body.appendChild(name);

        const description = document.createElement('p');
        description.innerText = x.description;
        body.appendChild(description);

        // const credits = document.createElement('a')
        // body.appendChild(credits)
        if (x.credits) {
            const text = document.createElement('h6');
            text.innerText = 'Created by ';

            var index = 0;
            for (const element of x.credits) {
                const a = document.createElement('a');
                if (element.url) a.href = element.url;
                a.innerText = element.name;
                if (index > 0) {
                    // Add ' and ' text node
                    const andText = document.createTextNode(' and ');
                    text.appendChild(andText);
                }
                text.appendChild(a);
                index += 1;
            }

            body.appendChild(text);
        }

        button.addEventListener('click', function () {
            copy(x.url)
            copyBanner()
        });
        code.addEventListener('click', function () {
            fetch(x.url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then((text) => {
                    // Copy the content to the clipboard
                    navigator.clipboard.writeText(text);
                    copyBanner()
                })
                .catch((error) => {
                    console.error('Error fetching or copying JS file:', error);
                });
        });

        async function copyBanner() {
            objects.copyBanner.style.opacity = 1;
            await delay(1500)
            objects.copyBanner.style.opacity = 0
        }

        currentArray.push(x.name);
    }
}

create();

function copy(text) {
    return function () {
        navigator.clipboard.writeText(text);
    };
}

objects.searchButton?.addEventListener('click', function () {
    search(objects.searchField?.value);
});
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') search(objects.searchField?.value);
});

objects.user?.addEventListener('click', function() {objects.userModal.showModal()})
objects.closeUser?.addEventListener('click', function() {objects.userModal.close()})

function search(query) {
    const filter = document.getElementById('searchFor')
    const array = [];

    for (const x of jsons[current]) {
        if (filter.value == "name") {
            if (x.name.toLowerCase().includes(query.toLowerCase())) {
                array.push(x);
            }
        } else if (x.credits && filter.value == "username") {
            for (const y of x.credits) {
                if (y.name.toLowerCase().includes(query.toLowerCase())) {
                    array.push(x)
                }
            }
        }
    }

    objects.outer.innerHTML = '';
    create(array);
}


function searchUser() {
    objects.userExtensions.innerHTML = ""
    for (let key in jsons) {
        if (key.toLowerCase().includes(objects.userField.value.toLowerCase())) {
            createDropdown(key)
        }
    }
}

objects.userButton.addEventListener('click', function() {
    searchUser()
})

const modal = document.getElementById('faqModal')
document.getElementById('faqButton').addEventListener('click', function() {
    modal.showModal();
})

document.getElementById('closeFaq').addEventListener('click', function() {
    modal.close();
})
const delay = ms => new Promise(res => setTimeout(res, ms));
