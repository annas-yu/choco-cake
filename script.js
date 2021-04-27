var animation = bodymovin.loadAnimation({
    container: document.getElementById('happyGirl'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'happyAnim.json',
})

dragElement(document.getElementById("cake"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function inBound(top, left) {
        let screen = document.getElementById('screen')
        let screenRect = screen.getBoundingClientRect()
        let cake = document.getElementById('cake')
        if (top < screenRect.top) {
            return false
        } else if (left < screenRect.left) {
            return false
        } else if (left + cake.offsetWidth > screenRect.left + screen.offsetWidth) {
            return false
        } else if (top + cake.offsetHeight > screenRect.top + screen.offsetHeight) {
            return false
        } else {
            return true
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let newTop = elmnt.offsetTop - pos2
        let newLeft = elmnt.offsetLeft - pos1
        if (inBound(newTop, newLeft)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            checkHappiness()
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function checkHappiness() {
    let cake = document.getElementById("cake")
    let AOE = document.getElementById("AOE")
    let happyGirl = document.getElementById("happyGirl")
    let sadGirl = document.getElementById("sadGirl")
    if (isOverlapping(cake, AOE)) {
        sadGirl.style.opacity = "0%"
        happyGirl.style.opacity = "100%"
    } else {
        sadGirl.style.opacity = "100%"
        happyGirl.style.opacity = "0%"
    }
}

function isOverlapping(e1, e2) {
    if (e1.length && e1.length > 1) {
        e1 = e1[0];
    }
    if (e2.length && e2.length > 1) {
        e2 = e2[0];
    }
    const rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
    const rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;

    console.log(rect1, rect2);

    let overlap = false;

    if (rect1 && rect2) {
        overlap = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
        return overlap;
    }

    console.warn('Please provide valid HTMLElement object');
    return overlap;
}