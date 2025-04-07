// State management for the form and tips
const state = {
  selectedRegion: "",
  cropVariety: "",
  specificCrop: "",
  soilType: "",
  farmingExperience: "",
  season: "",
  currentSection: 1,
  regions: [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Trichy",
    "Thanjavur",
    "Erode",
    "Tirunelveli",
  ],
  seasons: ["Kharif", "Rabi", "Summer"],
  soilTypes: ["Red Soil", "Black Soil", "Alluvial Soil", "Sandy Soil"],
};

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Populate dropdowns with data
  populateDropdowns();

  // Set up event listeners
  setupEventListeners();
});

// Function to populate all dropdowns with data
function populateDropdowns() {
  // Populate region dropdowns
  const regionSelects = [
    document.getElementById("quick-region-select"),
    document.getElementById("region-select"),
  ];

  regionSelects.forEach((select) => {
    if (select) {
      state.regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        select.appendChild(option);
      });
    }
  });

  // Populate season dropdown
  const seasonSelect = document.getElementById("season-select");
  if (seasonSelect) {
    state.seasons.forEach((season) => {
      const option = document.createElement("option");
      option.value = season;
      option.textContent = season;
      seasonSelect.appendChild(option);
    });
  }

  // Populate soil type dropdown
  const soilSelect = document.getElementById("soil-select");
  if (soilSelect) {
    state.soilTypes.forEach((soil) => {
      const option = document.createElement("option");
      option.value = soil;
      option.textContent = soil;
      soilSelect.appendChild(option);
    });
  }
}

// Function to set up all event listeners
function setupEventListeners() {
  // Quick tips form
  const quickTipsButton = document.getElementById("quick-tips-button");
  if (quickTipsButton) {
    quickTipsButton.addEventListener("click", handleQuickTips);
  }

  // Newsletter subscription
  const newsletterButton = document.getElementById("newsletter-button");
  if (newsletterButton) {
    newsletterButton.addEventListener("click", handleNewsletterSubscription);
  }

  // Form input change handlers
  const regionSelect = document.getElementById("region-select");
  if (regionSelect) {
    regionSelect.addEventListener("change", (e) => {
      state.selectedRegion = e.target.value;
    });
  }

  const cropInput = document.getElementById("crop-input");
  if (cropInput) {
    cropInput.addEventListener("change", (e) => {
      state.cropVariety = e.target.value;
    });
  }

  const experienceSelect = document.getElementById("experience-select");
  if (experienceSelect) {
    experienceSelect.addEventListener("change", (e) => {
      state.farmingExperience = e.target.value;
    });
  }

  const seasonSelect = document.getElementById("season-select");
  if (seasonSelect) {
    seasonSelect.addEventListener("change", (e) => {
      state.season = e.target.value;
    });
  }

  const soilSelect = document.getElementById("soil-select");
  if (soilSelect) {
    soilSelect.addEventListener("change", (e) => {
      state.soilType = e.target.value;
    });
  }

  // Form submission
  const tipsForm = document.getElementById("tips-form");
  if (tipsForm) {
    tipsForm.addEventListener("submit", (e) => {
      // Form will submit to personalized-tips.html with query parameters
      // No need to prevent default
    });
  }
}

// Function to handle quick tips button click
function handleQuickTips() {
  const regionSelect = document.getElementById("quick-region-select");
  const cropSelect = document.getElementById("quick-crop-select");

  if (
    regionSelect.value === "Select Region" ||
    cropSelect.value === "Select Crop Type"
  ) {
    alert("Please select both a region and crop type.");
    return;
  }

  // Redirect to personalized tips page with query parameters
  window.location.href = `personalized-tips.html?region=${encodeURIComponent(regionSelect.value)}&cropType=${encodeURIComponent(cropSelect.value)}`;
}

// Function to handle newsletter subscription
function handleNewsletterSubscription() {
  const emailInput = document.getElementById("newsletter-email");

  if (!emailInput.value || !isValidEmail(emailInput.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Thank you for subscribing to our newsletter!");
  emailInput.value = "";
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to navigate to next section
function nextSection() {
  if (state.currentSection < 4) {
    // Validate current section before proceeding
    if (!validateSection(state.currentSection)) {
      return;
    }

    // Hide current section
    const currentSection = document.getElementById(
      `section-${state.currentSection}`,
    );
    currentSection.style.opacity = "0";
    currentSection.style.transform = "translateX(-100%)";
    currentSection.style.pointerEvents = "none";

    // Show next section
    state.currentSection++;
    const nextSection = document.getElementById(
      `section-${state.currentSection}`,
    );
    nextSection.style.opacity = "1";
    nextSection.style.transform = "translateX(0)";
    nextSection.style.pointerEvents = "all";
  }
}

// Function to navigate to previous section
function prevSection() {
  if (state.currentSection > 1) {
    // Hide current section
    const currentSection = document.getElementById(
      `section-${state.currentSection}`,
    );
    currentSection.style.opacity = "0";
    currentSection.style.transform = "translateX(100%)";
    currentSection.style.pointerEvents = "none";

    // Show previous section
    state.currentSection--;
    const prevSection = document.getElementById(
      `section-${state.currentSection}`,
    );
    prevSection.style.opacity = "1";
    prevSection.style.transform = "translateX(0)";
    prevSection.style.pointerEvents = "all";
  }
}

// Function to validate each section before proceeding
function validateSection(sectionNumber) {
  switch (sectionNumber) {
    case 1:
      // Validate Basic Information section
      const regionSelect = document.getElementById("region-select");
      const cropInput = document.getElementById("crop-input");
      const experienceSelect = document.getElementById("experience-select");

      if (!regionSelect.value) {
        alert("Please select your region.");
        return false;
      }

      if (!cropInput.value) {
        alert("Please enter what you are planning to grow.");
        return false;
      }

      if (!experienceSelect.value) {
        alert("Please select your farming experience level.");
        return false;
      }

      return true;

    case 2:
      // Validate Crop Details section
      const seasonSelect = document.getElementById("season-select");

      if (!seasonSelect.value) {
        alert("Please select a growing season.");
        return false;
      }

      return true;

    case 3:
      // Validate Growing Conditions section
      const soilSelect = document.getElementById("soil-select");

      if (!soilSelect.value) {
        alert("Please select your soil type.");
        return false;
      }

      return true;

    default:
      return true;
  }
}
