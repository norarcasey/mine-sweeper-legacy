export const toggleFlag = (el) => {

  if(el.className.indexOf('cell') < 0 || el.className.indexOf('revealed') > -1)
    return;

  const idObj = {},
        id = Number(el.getAttribute('data-id'));

  if(el.className.indexOf('flag') > -1) {
    idObj[id] = false;
    el.className = el.className.replace(' flag', '');
    for(let i=0; i<el.childNodes.length; i++) {
      if(el.childNodes[i].className.indexOf('fa-flag') > -1) {
        el.childNodes[i].remove();
        break;
      }
    }
  } else {
    idObj[id] = true;
    el.className += ' flag';
    var flagNode = document.createElement("I");
    flagNode.className = 'far fa-flag';
    el.appendChild(flagNode);
  }

  return idObj;
}