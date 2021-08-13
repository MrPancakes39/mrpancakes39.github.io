let menu_icon = document.querySelector(".menu_icon");
let nav = document.querySelector(".nav-bar>ul");
let closebtn = document.querySelector(".close_nav");

menu_icon.addEventListener("click", () => {
    nav.style.width = "210px";
});

closebtn.addEventListener("click", () => {
    nav.style.width = "0";
});

const YAML = jsyaml;

async function getData() {
    let res = await fetch("/projects.yml");
    let data = await res.text();
    return data;
}

async function createProjects() {
    const data_raw = await getData();
    const data = YAML.load(data_raw);

    const projectsDiv = document.querySelector("#projects");
    data["projects"].forEach(project => {
        let parentDiv = document.createElement("div");
        parentDiv.setAttribute("class", "grid-30-70");

        const linkText = (project["liveApp"]) ? "View Live App" : "View Source Code";

        parentDiv.innerHTML = `
        <img src="../assets/thumbnails/${project["image"]}">
        <div>
            <h1>${project["title"]}</h1>
            <h4>${project["desc"]}</h4>
            <h5><a href="${project["link"]}" target="_blank">${linkText}</a></h5>
        </div>`;

        projectsDiv.insertBefore(parentDiv, projectsDiv.firstChild);
    });
}

createProjects();