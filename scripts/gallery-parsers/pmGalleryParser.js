// https://github.com/Ashimee
// for usage on: https://extensions.penguinmod.com/
var exts = [];
document.querySelectorAll('.extension-list .block').forEach((ext) => {
    const name = ext.querySelector('p.title').textContent;
    const descP = ext.querySelector('p.description');
    const credits = descP.nextElementSibling;
    const description = descP.textContent.trim();
    const imgUri = ext.querySelector('img.image').src;
    let url = ext.querySelector('.block-buttons button.purple').parentElement.href;
    url = url.substr(url.indexOf('http', 1));
    const extension = {
        name,
        picture: imgUri,
        description,
        url,
    };
    const users = Array.from(credits.querySelectorAll('a'));
    if (users.length > 0) {
        extension.credits = [];
        for (const user of users) {
            extension.credits.push({
                name: user.textContent,
                url: user.href ?? '#',
            });
        }
    }
    exts.push(extension);
});
var getExt = (name) => exts.find((ext) => ext.name === name);
function forceCred(name, uname, link) {
    const ext = getExt(name);
    ext.credits = ext.credits ?? [];
    const credit = { name: uname };
    if (!!link) credit.link = link;
    ext.credits.push(credit);
}
console.log(JSON.stringify(exts));
