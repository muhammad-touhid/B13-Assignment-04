let interviewCards = [];
let rejectedCards = [];
let currentStatus = "all-filter-btn";

let allCardCount = document.getElementById("all-card-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

let allFilterBtn = document.getElementById("all-filter-btn");
let interviewFilterBtn = document.getElementById("interview-filter-btn");
let rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let mainContainer = document.querySelector("main");
let allJobPost = document.getElementById("all-job-post");
let allCards = allJobPost.querySelectorAll(".card");
let filteredSection = document.getElementById("filtered-section");

let tabJobCount = document.getElementById("tab-job-count");
tabJobCount.innerText = allJobPost.querySelectorAll(
  ".card:not(.empty-state)",
).length;

function calculateCount() {
  allCardCount.innerText = allJobPost.querySelectorAll(
    ".card:not(.empty-state)",
  ).length;
  interviewCount.innerText = interviewCards.length;
  rejectedCount.innerText = rejectedCards.length;

  if (currentStatus == "all-filter-btn") {
    tabJobCount.innerText = allJobPost.querySelectorAll(
      ".card:not(.empty-state)",
    ).length;
  } else if (currentStatus == "interview-filter-btn") {
    tabJobCount.innerText = interviewCards.length;
  } else if (currentStatus == "rejected-filter-btn") {
    tabJobCount.innerText = rejectedCards.length;
  }
}

calculateCount();

function filter(id) {
  allFilterBtn.classList.remove("btn-active", "btn-info");
  interviewFilterBtn.classList.remove("btn-active", "btn-info");
  rejectedFilterBtn.classList.remove("btn-active", "btn-info");

  let selected = document.getElementById(id);

  selected.classList.add("btn-active", "btn-info");

  currentStatus = id;

  if (id == "interview-filter-btn") {
    allJobPost.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterviewCard();
  } else if (id == "all-filter-btn") {
    allJobPost.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id == "rejected-filter-btn") {
    allJobPost.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejectedCard();
  }
  calculateCount();
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    let cardBody = event.target.parentNode.parentNode.parentNode;
    let jobTitle = cardBody.querySelector(".card-title").innerText;
    let jobPosition = cardBody.querySelector(".job-position").innerText;
    let location = cardBody.querySelector(".location").innerText;
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

    if (currentStatus == "rejected-filter-btn") {
      renderRejectedCard();
    }

    for (card of allCards) {
      let title = card.querySelector(".card-title").innerText;
      if (title == jobTitle) {
        card.querySelector(".status").innerText = "InterView";
      }
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    let cardBody = event.target.parentNode.parentNode.parentNode;
    let jobTitle = cardBody.querySelector(".card-title").innerText;
    let jobPosition = cardBody.querySelector(".job-position").innerText;
    let location = cardBody.querySelector(".location").innerText;
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

    interviewCards = interviewCards.filter(
      (item) => item.jobTitle != cardInfo.jobTitle,
    );

    if (currentStatus == "interview-filter-btn") {
      renderInterviewCard();
    }

    calculateCount();

    for (card of allCards) {
      let title = card.querySelector(".card-title").innerText;

      if (title == jobTitle) {
        card.querySelector(".status").innerText = "Rejected";
      }
    }
  } else if (event.target.classList.contains("dlt-button")) {
    let cardBody = event.target.parentNode.parentNode;
    let jobTitle = cardBody.querySelector(".card-title").innerText;

    for (card of allCards) {
      let title = card.querySelector(".card-title").innerText;
      if (title == jobTitle) {
        card.remove();
      }
    }

    cardBody.parentElement.remove();

    interviewCards = interviewCards.filter((item) => item.jobTitle != jobTitle);
    rejectedCards = rejectedCards.filter((item) => item.jobTitle != jobTitle);

    calculateCount();

    renderAllJobPostEmpty();

    if (currentStatus == "interview-filter-btn") {
      renderInterviewCard();
    } else if (currentStatus == "rejected-filter-btn") {
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
                <button class="interview-btn btn btn-outline btn-success">Interview</button>
                <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
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
                <button class="interview-btn btn btn-outline btn-success">Interview</button>
                <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
              </div>
              <div class="dlt-button text-[#64748B] absolute top-8 right-6 cursor-pointer">
                <i class="fa-solid fa-trash-can dlt-button"></i>
              </div>
            </div>
    `;

    filteredSection.appendChild(div);
  }
}

function renderAllJobPostEmpty() {
  if (allJobPost.children.length === 0) {
    allJobPost.innerHTML = `
      <div class="card empty-state w-full bg-base-100 card-xs shadow-sm p-14">
        <div class="card-body items-center text-center">
          <img src="./assets/assignment_doc.png" class="w-16" />
          <h2 class="card-title text-[#002C5C]">No jobs available</h2>
          <p class="text-[#64748B]">
            Check back soon for new job opportunities
          </p>
        </div>
      </div>
    `;
    allCardCount.innerText = 0;
  }
}
