(() => {
    // Initialize the application
    function init() {
      // Add keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        // Alt + C to navigate to contact page
        if (e.altKey && e.key === "c") {
          e.preventDefault();
          window.location.href = "contact.html";
        }
  
        // Alt + H to navigate to home page
        if (e.altKey && e.key === "h") {
          e.preventDefault();
          window.location.href = "index.html";
        }
  
        // Alt + A to navigate to about page
        if (e.altKey && e.key === "a") {
          e.preventDefault();
          window.location.href = "about.html";
        }
  
        // Alt + S to navigate to store page
        if (e.altKey && e.key === "s") {
          e.preventDefault();
          window.location.href = "store.html";
        }
      });
    }
  
    // Initialize the application
    init();
  })();
  