const outer = document.querySelectorAll('.extensions')[0];
var currentArray = [];

const galleries = ['tw', 'pm', 'ruby', 'elmobear'],
    jsons = {
        all: [],
    };

createDropdown("all")

for (const galleryName of galleries) {
    const galleryJson = await fetchJson(`./jsons/${galleryName}.json`);
    jsons[galleryName] = galleryJson;
    jsons.all = jsons.all.concat(galleryJson);

    createDropdown(galleryName)
}

const hash = window.location.hash?.split('#')[1]
var current = jsons[hash] ? hash : 'all';
if (current != "all") document.getElementById('galleryButtons').value = current

async function createDropdown(galleryName) {
    const dropdown = document.createElement('option');
    dropdown.innerText = galleryName;
    dropdown.value = galleryName;

    document.getElementById('galleryButtons').appendChild(dropdown)
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
        outer.appendChild(body);

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

        button.addEventListener('click', copy(x.url));
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
                })
                .catch((error) => {
                    console.error('Error fetching or copying JS file:', error);
                });
        });

        currentArray.push(x.name);
    }
}

create();

function copy(text) {
    return function () {
        navigator.clipboard.writeText(text);
    };
}

document.getElementById('searchButton')?.addEventListener('click', function () {
    search(document.getElementById('search')?.value);
});
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') search(document.getElementById('search')?.value);
});

document.getElementById('galleryButtons')?.addEventListener('change', function(e) {
    current = document.getElementById('galleryButtons')?.value;
    outer.innerHTML = "";
    create();
})

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

    outer.innerHTML = '';
    create(array);
}

const modal = document.getElementById('faqModal')
document.getElementById('faqButton').addEventListener('click', function() {
    modal.showModal();
})

document.getElementById('closeFaq').addEventListener('click', function() {
    modal.close();
})
