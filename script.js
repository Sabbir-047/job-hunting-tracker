let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

// 1- get all the count
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let jobCount = document.getElementById("jobCount");

// 2 -  get the toggling/Filtering buttons
let allFilterBtn = document.getElementById("allFilterBtn");
let interviewFilterBtn = document.getElementById("interviewFilterBtn");
let rejectedFilterBtn = document.getElementById("rejectedFilterBtn");

// 3 - get all cards, main section, filtered section
let allCards = document.getElementById("allCards");
let mainSection = document.querySelector("main");
let filteredSection = document.getElementById("filteredSection");

// count all the job cards in various lists
// function calculateCount() {
//     total.innerText = allCards.children.length;
//     interviewCount.innerText = interviewList.length;
//     rejectedCount.innerText = rejectedList.length;
//     // console.log(total.innerText, interviewCount.innerText, rejectedCount.innerText)
// }
// count all the job cards in various lists
function calculateCount() {
    let currentTotal = allCards.children.length;
    
    // Update the top stat boxes
    total.innerText = currentTotal;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    
    // Determine which number to show in the "Available Jobs" header
    let displayCount = currentTotal; // Default to 'All'
    
    if (currentStatus === "interviewFilterBtn") {
        displayCount = interviewList.length;
    } else if (currentStatus === "rejectedFilterBtn") {
        displayCount = rejectedList.length;
    }
    
    // Update the DOM
    jobCount.innerHTML = `<span>${displayCount}</span> Jobs`;
}
calculateCount();

// 4 - toggle style
function toggleStyle(id) {
    allFilterBtn.classList.add("bg-white");
    interviewFilterBtn.classList.add("bg-white");
    rejectedFilterBtn.classList.add("bg-white");

    allFilterBtn.classList.remove("bg-sky-500");
    interviewFilterBtn.classList.remove("bg-sky-500");
    rejectedFilterBtn.classList.remove("bg-sky-500");

    let selected = document.getElementById(id);

    currentStatus = id;
    // console.log(currentStatus);
    selected.classList.remove("bg-white");
    selected.classList.add("bg-sky-500");

    // show and hide particular section
    // filtering while clicking the filter buttons
    if (id == "interviewFilterBtn") {
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderInterview();
    } else if (id == "rejectedFilterBtn") {
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderRejected();
    } else if (id == "allFilterBtn") {
        allCards.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    }
    // to add them in the filteren count
    calculateCount();
}

// 5 - main functionalities
mainSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("interviewBtn")) {
        let parentNode = event.target.parentNode.parentNode.parentNode;

        let companyName = parentNode.querySelector(".companyName").innerText;
        let companyRole = parentNode.querySelector(".companyRole").innerText;
        let location = parentNode.querySelector(".location").innerText;
        let type = parentNode.querySelector(".type").innerText;
        let salary = parentNode.querySelector(".salary").innerText;
        let jobStatus = parentNode.querySelector(".jobStatus").innerText;
        let description = parentNode.querySelector(".description").innerText;
        // console.log(companyName, companyRole, location, type, salary, jobStatus, description);
        parentNode.querySelector(".jobStatus").innerText = "Interview";

        // getting and creating card information
        const cardInfo = {
            companyName,
            companyRole,
            location,
            type,
            salary,
            jobStatus: "Interview",
            description,
        };

        const interviewExist = interviewList.find(
            (item) => item.companyName == cardInfo.companyName,
        );

        if (!interviewExist) {
            interviewList.push(cardInfo);
        }

        // removing the card from the rejected list
        rejectedList = rejectedList.filter(
            (item) => item.companyName != cardInfo.companyName,
        );

        // now render html after removing
        if (currentStatus == "rejectedFilterBtn") {
            renderRejected();
        }

        calculateCount();
    } else if (event.target.classList.contains("rejectedBtn")) {
        let parentNode = event.target.parentNode.parentNode.parentNode;

        let companyName = parentNode.querySelector(".companyName").innerText;
        let companyRole = parentNode.querySelector(".companyRole").innerText;
        let location = parentNode.querySelector(".location").innerText;
        let type = parentNode.querySelector(".type").innerText;
        let salary = parentNode.querySelector(".salary").innerText;
        let jobStatus = parentNode.querySelector(".jobStatus").innerText;
        let description = parentNode.querySelector(".description").innerText;
        // console.log(companyName, companyRole, location, type, salary, jobStatus, description);
        parentNode.querySelector(".jobStatus").innerText = "Rejected";

        // getting and creating card information
        const cardInfo = {
            companyName,
            companyRole,
            location,
            type,
            salary,
            jobStatus: "Rejected",
            description,
        };

        const interviewExist = rejectedList.find(
            (item) => item.companyName == cardInfo.companyName,
        );

        if (!interviewExist) {
            rejectedList.push(cardInfo);
        }

        // removing the card from the rejected list
        interviewList = interviewList.filter(
            (item) => item.companyName != cardInfo.companyName,
        );

        // now render html after removing
        if (currentStatus == "interviewFilterBtn") {
            renderInterview();
        }

        calculateCount();
    } else if (event.target.closest(".deleteBtn")) {
        // 1. We use closest here just in case the user clicks the <i> icon instead of the button padding
        let card = event.target.closest(".jobCard");
        let companyName = card.querySelector(".companyName").innerText;

        // 2. filtering the job
        interviewList = interviewList.filter(
            (item) => item.companyName !== companyName,
        );
        rejectedList = rejectedList.filter(
            (item) => item.companyName !== companyName,
        );

        // 3. Removing the clicked card from the ui
        card.remove();

        // 4. we are deleting from filtered view. So, we also have to delete from the real one all
        let hiddenCards = allCards.querySelectorAll(".jobCard");
        hiddenCards.forEach((hiddenCard) => {
            if (
                hiddenCard.querySelector(".companyName").innerText ===
                companyName
            ) {
                hiddenCard.remove();
            }
        });

        // 5. Update all totals, including the jobCount
        calculateCount();
    }
});

// Render Interview
function renderInterview() {
    // make the filtered section empty each time
    filteredSection.innerHTML = "";

    // creating innterHTML
    for (const inter of interviewList) {
        let div = document.createElement("div");
        div.className =
            "jobCard flex-col md:flex-row flex justify-between bg-white rounded-2xl p-6 space-y-8";
        div.innerHTML = `
        <div class="space-y-5">
                        <div>
                            <h3 class="companyName text-lg text-black font-bold">${inter.companyName}</h3>
                            <p class="companyRole text-gray-400">${inter.companyRole}</p>
                        </div>
                        <div class="text-gray-500">
                            <span class="location"> ${inter.location} | </span>
                            <span class="type"> ${inter.type} | </span>
                            <span class="salary"> ${inter.salary} </span>
                        </div>
                        <div class="space-y-2">
                            <button class="btn btn-active jobStatus">${inter.jobStatus}</button>
                            <p class="description">${inter.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="interviewBtn btn btn-outline btn-success">INTERVIEW</button>
                            <button class="rejectedBtn btn btn-outline btn-error">REJECTED</button>
                        </div>
                    </div>
                    <!-- right side delete can -->
                    <div>
                        <button class="deleteBtn btn rounded-full"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
        
        `;
        filteredSection.appendChild(div);
    }
}
// Render Rejected
function renderRejected() {
    // make the filtered section empty each time
    filteredSection.innerHTML = "";

    // creating innterHTML
    for (const reject of rejectedList) {
        let div = document.createElement("div");
        div.className =
            "jobCard flex-col md:flex-row flex justify-between bg-white rounded-2xl p-6 space-y-8";
        div.innerHTML = `
        <div class="space-y-5">
                        <div>
                            <h3 class="companyName text-lg text-black font-bold">${reject.companyName}</h3>
                            <p class="companyRole text-gray-400">${reject.companyRole}</p>
                        </div>
                        <div class="text-gray-500">
                            <span class="location"> ${reject.location} | </span>
                            <span class="type"> ${reject.type} | </span>
                            <span class="salary"> ${reject.salary} </span>
                        </div>
                        <div class="space-y-2">
                            <button class="btn btn-active jobStatus">${reject.jobStatus}</button>
                            <p class="description">${reject.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="interviewBtn btn btn-outline btn-success">INTERVIEW</button>
                            <button class="rejectedBtn btn btn-outline btn-error">REJECTED</button>
                        </div>
                    </div>
                    <!-- right side delete can -->
                    <div>
                        <button class="deleteBtn btn rounded-full"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
        
        `;
        filteredSection.appendChild(div);
    }
}
