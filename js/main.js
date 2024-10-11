let currentDT = ``;
function displayTime(){
    let date = new Date();
    let d = date.getDate();
    let m = date.toLocaleString('default', {month: 'long'});
    let y = date.getFullYear();
    let t = date.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    currentDT = `${d} ${m}, ${y} ${t}`;
    document.getElementById('date').innerHTML = currentDT;
    setTimeout(displayTime, 1000);
}

/* Credits to MrPolywhirl (jsfiddle.net/MrPolywhirl/cbLsc81f) for the loading functions */
/* Modified to suit my craziness */

function onReady(callback) {
    let intervalID = window.setInterval(checkReady, 1000);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }

}

function show(id, value) {
    document.getElementById("loading").style.display = value ? 'block' : 'none';
    document.getElementById("page").style.display = 'block';
}

displayTime();

onReady(function () {
    show('page', true);
    show('loading', false);
});