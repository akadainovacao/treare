// window.innerWidth
// window.innerHeight
// screen.width
// screen.height

var sidemenu = document.getElementById('sidemenu');
var close = document.getElementsByClassName('material-icons');
sidemenu.addEventListener('click', openMenu);

function openMenu() {
  var menumobile = document.getElementsByClassName('menu-mobile');
  menumobile[0].style.display = "block";
  close[0].innerHTML = 'close'
}

if(close[0].innerHTML == 'close') {
  console.log('ashusahds')
}