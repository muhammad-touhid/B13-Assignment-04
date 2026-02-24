let interviewCards = [];
let rejectedCards = [];
let currentStatus = "all";

let allCardCount = document.getElementById("allCardCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

let allFilterBtn = document.getElementById("allFilterBtn");
let interviewFilterBtn = document.getElementById("interviewFilterBtn");
let rejectedFilterBtn = document.getElementById("rejectedFilterBtn");

let mainContainer = document.querySelector("main");
let allJobPost = document.getElementById("allJobPost");
let filteredSection = document.getElementById("filteredSection");
let allJob = allJobPost.children;
let tabJobCount = document.getElementById("tab-job-count");

function calculateCount() {
  allCardCount.innerText = allJobPost.children.length;
  tabJobCount.innerText = allJobPost.children.length;
  interviewCount.innerText = interviewCards.length;
  rejectedCount.innerText = rejectedCards.length;
}

calculateCount();

function filter(id) {
  allFilterBtn.classList.remove("btn-active", "btn-info");
  interviewFilterBtn.classList.remove("btn-active", "btn-info");
  rejectedFilterBtn.classList.remove("btn-active", "btn-info");

  let selected = document.getElementById(id);

  currentStatus = id;

  selected.classList.add("btn-active", "btn-info");

  if (id == "interviewFilterBtn") {
    allJobPost.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    tabJobCount.innerText = interviewCards.length;
    renderInterviewCard();
  } else if (id == "allFilterBtn") {
    allJobPost.classList.remove("hidden");
    filteredSection.classList.add("hidden");
    tabJobCount.innerText = allJobPost.children.length;
  } else if (id == "rejectedFilterBtn") {
    allJobPost.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    tabJobCount.innerText = rejectedCards.length;
    renderRejectedCard();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interviewBtn")) {
    let cardBody = event.target.parentNode.parentNode.parentNode;
    let jobTitle = cardBody.querySelector(".card-title").innerText;
    let jobPosition = cardBody.querySelector(".job-position").innerText;
    let location = cardBody.querySelector(".location").innerText;
    let status = cardBody.querySelector(".status").innerText;
    let jobDscrition = cardBody.querySelector(".job-descrition").innerText;

    cardBody.querySelector(".status").innerText = "Interview";

    let cardInfo = {
      jobTitle,
      jobPosition,
      location,
      status: "Interview",
      jobDscrition,
    };
    let cardExist = interviewCards.find(
      (item) => item.jobTitle == cardInfo.jobTitle,
    );

    if (!cardExist) {
      interviewCards.push(cardInfo);
    }

    rejectedCards = rejectedCards.filter(
      (item) => item.jobTitle != cardInfo.jobTitle,
    );

    calculateCount();

    if (currentStatus == "rejectedFilterBtn") {
      renderRejectedCard();
    }
  } else if (event.target.classList.contains("rejectedBtn")) {
    let cardBody = event.target.parentNode.parentNode.parentNode;
    let jobTitle = cardBody.querySelector(".card-title").innerText;
    let jobPosition = cardBody.querySelector(".job-position").innerText;
    let location = cardBody.querySelector(".location").innerText;
    let status = cardBody.querySelector(".status").innerText;
    let jobDscrition = cardBody.querySelector(".job-descrition").innerText;

    cardBody.querySelector(".status").innerText = "Rejected";

    let cardInfo = {
      jobTitle,
      jobPosition,
      location,
      status: "Rejected",
      jobDscrition,
    };
    let cardExist = rejectedCards.find(
      (item) => item.jobTitle == cardInfo.jobTitle,
    );

    if (!cardExist) {
      rejectedCards.push(cardInfo);
    }
    console.log(rejectedCards);

    interviewCards = interviewCards.filter(
      (item) => item.jobTitle != cardInfo.jobTitle,
    );

    if (currentStatus == "interviewFilterBtn") {
      renderInterviewCard();
    }

    calculateCount();
  } else if (event.target.classList.contains("dlt-button")) {
    let cardBody = event.target.parentNode.parentNode;
    console.log(event.target.classList.contains("dlt-button"));

    let jobTitle = cardBody.querySelector(".card-title").innerText;
    cardBody.parentElement.remove();

    interviewCards = interviewCards.filter((item) => item.jobTitle != jobTitle);
    rejectedCards = rejectedCards.filter((item) => item.jobTitle != jobTitle);

    calculateCount();

    if (currentStatus == "interviewFilterBtn") {
      renderInterviewCard();
    } else if (currentStatus == "rejectedFilterBtn") {
      renderRejectedCard();
    }
  }
});

function renderInterviewCard() {
  filteredSection.innerHTML = "";

  if (interviewCards.length === 0) {
    filteredSection.innerHTML = `
      <div class="card w-full bg-base-100 card-xs shadow-sm p-14">
        <div class="card-body items-center text-center">
          <img src="./assets/assignment_doc.png" class="w-16" />
          <h2 class="card-title text-[#002C5C]">No jobs available</h2>
          <p class="text-[#64748B]">
            Check back soon for new job opportunities
          </p>
        </div>
      </div>
    `;
  }

  for (let interviewCard of interviewCards) {
    let div = document.createElement("div");
    div.className = "card w-full bg-base-100 card-xs shadow-sm p-4 relative";
    div.innerHTML = `
          <div class="card-body">
              <h2 class="card-title text-[#002C5C]">${interviewCard.jobTitle}</h2>
              <p class="job-position text-[#64748B]">${interviewCard.jobPosition}</p>
              <p class="location text-[#64748B]">
                ${interviewCard.location}
              </p>
              <button
                class="status btn btn-soft w-fit mt-2 text-[#002C5C] text-sm"
              >
                ${interviewCard.status}
              </button>
              <p class="job-descrition">
                ${interviewCard.jobDscrition}
              </p>
              <div class="flex gap-2 mt-2">
                <button class="interviewBtn btn btn-outline btn-success">Interview</button>
                <button class="rejectedBtn btn btn-outline btn-error">Rejected</button>
              </div>
              <div class="dlt-button text-[#64748B] absolute top-8 right-6 cursor-pointer">
                <i class="fa-solid fa-trash-can dlt-button"></i>
              </div>
            </div>
            
    `;

    filteredSection.appendChild(div);
  }
}

function renderRejectedCard() {
  filteredSection.innerHTML = "";

  if (rejectedCards.length === 0) {
    filteredSection.innerHTML = `
      <div class="card w-full bg-base-100 card-xs shadow-sm p-14">
        <div class="card-body items-center text-center">
          <img src="./assets/assignment_doc.png" class="w-16" />
          <h2 class="card-title text-[#002C5C]">No jobs available</h2>
          <p class="text-[#64748B]">
            Check back soon for new job opportunities
          </p>
        </div>
      </div>
    `;
  }

  for (let rejectedCard of rejectedCards) {
    let div = document.createElement("div");
    div.className = "card w-full bg-base-100 card-xs shadow-sm p-4 relative";
    div.innerHTML = `
          <div class="card-body">
              <h2 class="card-title text-[#002C5C]">${rejectedCard.jobTitle}</h2>
              <p class="job-position text-[#64748B]">${rejectedCard.jobPosition}</p>
              <p class="location text-[#64748B]">
                ${rejectedCard.location}
              </p>
              <button
                class="status btn btn-soft w-fit mt-2 text-[#002C5C] text-sm"
              >
                ${rejectedCard.status}
              </button>
              <p class="job-descrition">
                ${rejectedCard.jobDscrition}
              </p>
              <div class="flex gap-2 mt-2">
                <button class="interviewBtn btn btn-outline btn-success">Interview</button>
                <button class="rejectedBtn btn btn-outline btn-error">Rejected</button>
              </div>
              <div class="dlt-button text-[#64748B] absolute top-8 right-6 cursor-pointer">
                <i class="fa-solid fa-trash-can dlt-button"></i>
              </div>
            </div>
    `;

    filteredSection.appendChild(div);
  }
}
