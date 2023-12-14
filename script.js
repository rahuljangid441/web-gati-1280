var loader=document.getElementById("preloader");
window.addEventListener("load" , function(){
    loader.style.display="none";
})

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const counterNum = document.querySelectorAll(".counter-numbers");
const speed = 1000;
let countersStarted = false;

function startCounters() {
    if (!countersStarted) {
        counterNum.forEach((curElem) => {
            updateNumber(curElem);
        });
        countersStarted = true;
    }
}

function updateNumber(curElem) {
    const targetNumber = parseInt(curElem.getAttribute("data-number"));
    const initialText = curElem.innerText;
    const initialNum = parseInt(initialText.replace(/\D/g, ""));
    const plusSign = initialText.includes("+");
    const difference = targetNumber - initialNum;
    const incrementNumber = difference > 0 ? Math.ceil(difference / speed) : 0;

    const updatedNumber = initialNum + incrementNumber;
    const updatedText = plusSign ? `${updatedNumber}+` : `${updatedNumber}`;

    curElem.innerText = updatedText;

    if (updatedNumber < targetNumber) {
        setTimeout(() => updateNumber(curElem), 10);
    }
}

const workDataElement = document.getElementById("work-data");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(workDataElement);
        }
    });
});

observer.observe(workDataElement);

console.log("loaded");









