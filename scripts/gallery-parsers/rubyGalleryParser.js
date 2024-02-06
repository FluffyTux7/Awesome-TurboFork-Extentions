// https://github.com/Ashimee
// for usage on: https://extensions.turbowarp.org/
var exts = [];
document.querySelectorAll('.extension').forEach((ext) => {
    const name = ext.querySelector('strong').textContent;
    const descP = ext.querySelector('p');
    const description = descP.textContent.replace(/( (.{1,30}) by (.+)(\.))/gm, '').trim();
    const imgUri = ext.querySelector('img').src;
    const url = ext.querySelector('button.download').getAttribute('download-url');
    const extension = {
        name,
        picture: imgUri,
        description,
        url,
    };
    exts.push(extension);
});
var getExt = (name) => exts.find((ext) => ext.name === name);
console.log(JSON.stringify(exts));
