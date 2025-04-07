(() => {
    // DOM Elements
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const subjectInput = document.getElementById("subject-input");
    const messageInput = document.getElementById("message-input");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");
    const notificationArea = document.getElementById("notification-area");
    const faqItems = document.querySelectorAll(".faq-item");
  
    // Initialize the application
    function init() {
      attachEventListeners();
    }
  
    // Attach event listeners
    function attachEventListeners() {
      // Contact form submission
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitContactForm();
      });
  
      // FAQ items keyboard support
      faqItems.forEach((item) => {
        const summary = item.querySelector("summary");
        summary.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.open = !item.open;
          }
        });
      });
    }
  
    // Submit contact form
    function submitContactForm() {
      // Validate form
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        showFormStatus("Please fill in all required fields", "error");
        return;
      }
  
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
  
      // Simulate form submission
      setTimeout(() => {
        // Reset form
        contactForm.reset();
  
        // Show success message
        showFormStatus(
          "Thank you for your message! We'll get back to you soon.",
          "success",
        );
  
        // Show notification
        showNotification("Message sent successfully!", "success");
  
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
  
        // Clear form status after a delay
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      }, 1500);
    }
  
    // Show form status message
    function showFormStatus(message, type) {
      formStatus.textContent = message;
  
      if (type === "error") {
        formStatus.style.backgroundColor = "#ffebee";
        formStatus.style.color = "#c62828";
      } else {
        formStatus.style.backgroundColor = "#e8f5e9";
        formStatus.style.color = "#2e7d32";
      }
  
      formStatus.style.display = "block";
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
  