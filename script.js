function setLayer(layerId, imgSrc, element) {
  document.getElementById(layerId).src = imgSrc;
  
  // Remove selected class from siblings
  element.parentElement.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
  element.classList.add('selected');
}

function showTab(tabName) {
  document.querySelectorAll('.item-grid').forEach(g => g.classList.add('hidden'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  
  document.getElementById(tabName).classList.remove('hidden');
  event.target.classList.add('active');
}

function resetLook() {
  document.querySelectorAll('.layer').forEach(l => l.src = '');
  document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
}

function saveLook() {
  alert('Fitur save look butuh backend. Untuk sekarang screenshot aja manual 👍');
}