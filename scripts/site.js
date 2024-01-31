const outer = document.querySelectorAll('.extensions')[0]

const json = await fetch("./extensions.json")
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})

async function create(array) {
    for (const x of array ?? json) {
        const body = document.createElement('div')
        body.classList = "extension"
        outer.appendChild(body)

        const buttonBody = document.createElement('div')
        body.appendChild(buttonBody)

        const img = document.createElement('img')
        img.src = x.picture
        buttonBody.appendChild(img)

        const buttonWrapper = document.createElement('div')
        buttonWrapper.classList = "extensionButtons"
        buttonBody.appendChild(buttonWrapper)

        const button = document.createElement('a')
        button.innerText = "copy link"
        buttonWrapper.appendChild(button)

        const code = document.createElement('a')
        code.innerText = "copy code"
        buttonWrapper.appendChild(code)

        const name = document.createElement('span')
        name.innerText = x.name
        body.appendChild(name)

        const description = document.createElement('p')
        description.innerText = x.description
        body.appendChild(description)

        // const credits = document.createElement('a')
        // body.appendChild(credits)
        if (x.credits) {
            const text = document.createElement('h6')
            text.innerText = "Created by "

            var index = 0
            for (const element of x.credits) {
                const a = document.createElement('a')
                if (element.url) a.href = element.url
                a.innerText = element.name
                if (index > 0) {
                    // Add " and " text node
                    const andText = document.createTextNode(" and ");
                    text.appendChild(andText);
                }
                text.appendChild(a)
                index += 1
            }

            body.appendChild(text)
        }

        button.addEventListener('click', copy(x.url))
        code.addEventListener('click', function() {
            fetch(x.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    // Copy the content to the clipboard
                    navigator.clipboard.writeText(text)
                })
                .catch(error => {
                    console.error('Error fetching or copying JS file:', error);
                });
        })

    }
}

create()

function copy(text) {
    return function() {
        navigator.clipboard.writeText(text);
    };
}

document.getElementById('searchButton')?.addEventListener('click', search(document.getElementById('search')?.value))
document.addEventListener('keypress', function(e) {
    if (e.key === "Enter") search(document.getElementById('search')?.value)
})

function search(query) {
    const array = []

    for (const x of json) {
        if (x.name.toLowerCase().includes(query)) {
            array.push(x)
        }
    }

    outer.innerHTML = ""
    create(array)
}
