function addNow() {
  nowDate = moment().tz("Europe/London").format('YYYY-MM-DD');
  nowTime = moment().tz("Europe/London").format('HH:mm:ss');
  document.getElementById('registration-date').value = nowDate;
  document.getElementById('registration-time').value = nowTime;
  set = setTimeout(function () { addNow(); }, 1000);
}

function toggle(source) {
  checkboxes = document.getElementsByName('friends');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}

function changeradioother(){
 var other= document.getElementById("ignoreThis");
    other.value=document.getElementById("categorie").value;
}

changeradioother()