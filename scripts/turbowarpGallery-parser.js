// https://github.com/Ashimee
var exts = [];
document.querySelectorAll('.extension').forEach(ext => {
  const name = ext.querySelector('h2').textContent;
  const descP = ext.querySelector('p');
  const description = descP.textContent.replace(/( (.{1,30}) by (.+)(\.))/gm, '').trim();
  const imgUri = ext.querySelector('.extension-image').src;
  const url = ext.querySelector('button.copy').dataset.copy;
  const extension = {
    name,
    picture: imgUri,
    description,
  	url
  };
  const users = Array.from(ext.querySelectorAll('a:not(.open):not(.sample):not(.docs):not(.sample-list-item)'));
  if (users.length > 0) {
  	extension.credits = [];
    for (const user of users) {
			extension.credits.push({
				name: user.textContent,
        url: user.href ?? '#'
			});
		}
  }
  exts.push(extension);
});
var getExt = (name) => exts.find(ext => ext.name === name);
function forceCred(name, uname, link) {
  const ext = getExt(name);
  ext.credits = ext.credits ?? [];
  const credit = {name: uname};
  if (!!link) credit.link = link;
  ext.credits.push(credit);
}
forceCred('BigInt', 'Skyhigh173');
forceCred('HTML Encode', 'ClaytonTDM');
forceCred('Window Controls', 'BlueDome77');
forceCred('Browser Fullscreen', 'Veggiecan0419');
forceCred('Custom Styles', 'TheShovel');
forceCred('Color Picker', 'TheShovel');
forceCred('Encoding', '-SIPC-');
forceCred('Ping Cloud Data', 'TheShovel');
forceCred('Cloudlink', 'MikeDEV');
forceCred('Hidden Block Collection', 'pumpkinhasapatch');
forceCred('Time', '-SIPC-');
forceCred('Consoles', '-SIPC-');
forceCred('Search Params', 'ZXMushroom63');
forceCred('ShovelUtils', 'TheShovel');
forceCred('JSON', 'Skyhigh173');
forceCred('Camera Controls (Very Buggy)', 'DT');
forceCred('rxFS', '0832');
forceCred('Graphics 2D', 'NOname-awa');
forceCred('More Comparisons', 'NOname-awa');
forceCred('Data Analysis', 'qxsck');
forceCred('Variable and list', 'qxsck');
forceCred('Longman Dictionary', 'veggiecan0419');
getExt('Pen Plus V5 (Old)').description = 'Replaced by Pen Plus V6.';
console.log(JSON.stringify(exts));
