/* cube rotation with mouse */

const cube = document.getElementById("cube");
const hero3d = document.getElementById("hero-3d");

hero3d.addEventListener("mouseenter", function() {
    cube.style.animation = "none";
});

hero3d.addEventListener("mousemove", function(event) {

    const box = hero3d.getBoundingClientRect();

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const rotateY = (x / box.width - 0.5) * 60;
    const rotateX = (y / box.height - 0.5) * -60;

    cube.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

hero3d.addEventListener("mouseleave", function() {
    cube.style.animation = "cubeRotate 5s linear infinite";
});

/* for the section to lit up when we scroll*/
const navlinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll",function(){
    let currentSection = "";

sections.forEach(function(section){
    const sectionTop = section.offsetTop;
    
    if (window.scrollY >= sectionTop - 200){
        currentSection = section.getAttribute("id");
    }
});

navlinks.forEach(function(link){
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
    }
 });
});
window.dispatchEvent(new Event("scroll"));

/*contact form _ stops  the page from navigation away on submit, sends the data in the background instead,and show the success message */
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
contactForm.addEventListener("submit", function(event) {
/* stops the browser deafult brhaviour, which is to leaventhis page and lead whatever is in the forrmsheet "action" url */
    event.preventDefault();

/* send the forms data to formspree in the background,without reloading or leaving the page */
    fetch(contactForm.action, {
        method: "post",
        body: new FormData(contactForm),
        headers: {"Accept": "application/json"}
    })
    .then(function(response){
        if (response.ok) {
            /* removes the "hidden" class so the message becomes visible*/
            formMessage.classList.remove("hidden");
            /* clears the form fields back to empty */
            contactForm.reset();
        }
        else {
            alert("something went wrong.please try agian.");
        }
    })
    .catch(function(){
        alert("something went wrong.please try agian.");
    });
});

/* watches each .reveal section and there opacity incrases as they gets into view so they can be visible */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible"); }
        });
    }, { threshold: 0.15 });

revealElements.forEach(function(element) {
    revealObserver.observe(element);
});
