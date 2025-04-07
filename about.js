(() => {
    // DOM Elements
    const teamLinks = document.querySelectorAll(".team-link");
    const notificationArea = document.getElementById("notification-area");
  
    // Initialize the application
    function init() {
      attachEventListeners();
    }
  
    // Attach event listeners
    function attachEventListeners() {
      // Team member links
      teamLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const teamMember = link.closest(".team-member");
          const name = teamMember.querySelector("h3").textContent;
          showNotification(
            `More information about ${name} would be displayed here.`,
            "info",
          );
        });
      });
    }
  
    // Show notification
    function showNotification(message, type = "info") {
      notificationArea.textContent = message;
  
      if (type === "error") {
        notificationArea.style.backgroundColor = "#c62828";
      } else if (type === "success") {
        notificationArea.style.backgroundColor = "#2e7d32";
      } else {
        notificationArea.style.backgroundColor = "#333";
      }
  
      notificationArea.classList.add("visible");
  
      // Hide notification after 5 seconds
      setTimeout(() => {
        notificationArea.classList.remove("visible");
      }, 5000);
    }
  
    // Initialize the application
    init();
  })();
  