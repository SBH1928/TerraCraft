(() => {
    // State management
    const state = {
      currentCategory: "general",
      showLoginModal: false,
      showNewTopicModal: false,
      isLoggedIn: false,
      user: null,
      searchQuery: "",
      categories: [
        "general",
        "growing",
        "pests",
        "soil",
        "equipment",
        "market",
        "beginners",
      ],
    };
  
    // DOM Elements
    const categoryLinks = document.querySelectorAll(".category-link");
    const forumCategories = document.querySelectorAll(".forum-category");
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");
    const closeLoginButton = document.getElementById("close-login-button");
    const loginForm = document.getElementById("login-form");
    const newTopicButton = document.getElementById("new-topic-button");
    const newTopicModal = document.getElementById("new-topic-modal");
    const closeNewTopicButton = document.getElementById("close-new-topic-button");
    const newTopicForm = document.getElementById("new-topic-form");
    const searchInput = document.getElementById("forum-search-input");
    const searchButton = document.getElementById("search-button");
    const notificationArea = document.getElementById("notification-area");
    const pageButtons = document.querySelectorAll(".page-button");
  
    // Initialize the application
    function init() {
      attachEventListeners();
      checkUrlHash();
    }
  
    // Check URL hash for category
    function checkUrlHash() {
      const hash = window.location.hash.substring(1);
      if (hash && state.categories.includes(hash)) {
        switchCategory(hash);
      }
    }
  
    // Attach event listeners
    function attachEventListeners() {
      // Category links
      categoryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const category = link.dataset.category;
          switchCategory(category);
          window.location.hash = category;
        });
      });
  
      // Login button
      loginButton.addEventListener("click", () => {
        toggleLoginModal(true);
      });
  
      // Close login button
      closeLoginButton.addEventListener("click", () => {
        toggleLoginModal(false);
      });
  
      // Login form submission
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleLogin();
      });
  
      // New topic button
      newTopicButton.addEventListener("click", () => {
        if (state.isLoggedIn) {
          toggleNewTopicModal(true);
        } else {
          showNotification("Please log in to create a new topic", "error");
          toggleLoginModal(true);
        }
      });
  
      // Close new topic button
      closeNewTopicButton.addEventListener("click", () => {
        toggleNewTopicModal(false);
      });
  
      // New topic form submission
      newTopicForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleNewTopic();
      });
  
      // Search functionality
      searchButton.addEventListener("click", () => {
        performSearch();
      });
  
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          performSearch();
        }
      });
  
      // Pagination buttons
      pageButtons.forEach((button) => {
        if (!button.disabled) {
          button.addEventListener("click", () => {
            // In a real application, this would load the next/previous page
            showNotification("Loading more topics...");
  
            // Simulate loading
            setTimeout(() => {
              showNotification("Page changed successfully", "success");
            }, 1000);
          });
        }
      });
  
      // Close modals when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
          toggleLoginModal(false);
        }
        if (e.target === newTopicModal) {
          toggleNewTopicModal(false);
        }
      });
  
      // Keyboard support for modals
      loginModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleLoginModal(false);
        }
      });
  
      newTopicModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleNewTopicModal(false);
        }
      });
  
      // Handle hash change
      window.addEventListener("hashchange", checkUrlHash);
    }
  
    // Switch category
    function switchCategory(category) {
      state.currentCategory = category;
  
      // Update active category link
      categoryLinks.forEach((link) => {
        if (link.dataset.category === category) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
  
      // Update visible category
      forumCategories.forEach((section) => {
        if (section.id === category) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
  
      // Announce category change to screen readers
      announceToScreenReader(`Showing ${category} category`);
    }
  
    // Toggle login modal
    function toggleLoginModal(show) {
      state.showLoginModal = show;
  
      if (show) {
        loginModal.style.display = "flex";
        loginModal.setAttribute("aria-hidden", "false");
  
        // Save last focused element
        state.lastFocusedElement = document.activeElement;
  
        // Focus on first input
        setTimeout(() => {
          document.getElementById("username").focus();
        }, 100);
  
        // Trap focus in modal
        trapFocusInModal(loginModal);
      } else {
        loginModal.style.display = "none";
        loginModal.setAttribute("aria-hidden", "true");
  
        // Return focus to last element
        if (state.lastFocusedElement) {
          state.lastFocusedElement.focus();
        }
      }
    }
  
    // Toggle new topic modal
    function toggleNewTopicModal(show) {
      state.showNewTopicModal = show;
  
      if (show) {
        newTopicModal.style.display = "flex";
        newTopicModal.setAttribute("aria-hidden", "false");
  
        // Save last focused element
        state.lastFocusedElement = document.activeElement;
  
        // Focus on first input
        setTimeout(() => {
          document.getElementById("topic-category").focus();
        }, 100);
  
        // Trap focus in modal
        trapFocusInModal(newTopicModal);
      } else {
        newTopicModal.style.display = "none";
        newTopicModal.setAttribute("aria-hidden", "true");
  
        // Return focus to last element
        if (state.lastFocusedElement) {
          state.lastFocusedElement.focus();
        }
      }
    }
  
    // Handle login
    function handleLogin() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (!username || !password) {
        showNotification("Please enter both username and password", "error");
        return;
      }
  
      // Simulate login process
      showNotification("Logging in...");
  
      // Simulate API call
      setTimeout(() => {
        // Successful login simulation
        state.isLoggedIn = true;
        state.user = {
          username: username,
          role: "Member",
        };
  
        // Update UI
        loginButton.textContent = username;
  
        // Close modal
        toggleLoginModal(false);
  
        // Show success message
        showNotification("Logged in successfully", "success");
  
        // Announce to screen readers
        announceToScreenReader("You are now logged in");
      }, 1000);
    }
  
    // Handle new topic creation
    function handleNewTopic() {
      const category = document.getElementById("topic-category").value;
      const title = document.getElementById("topic-title").value;
      const content = document.getElementById("topic-content").value;
      const tags = document.getElementById("topic-tags").value;
  
      if (!category || !title || !content) {
        showNotification("Please fill in all required fields", "error");
        return;
      }
  
      // Simulate topic creation
      showNotification("Creating new topic...");
  
      // Simulate API call
      setTimeout(() => {
        // Close modal
        toggleNewTopicModal(false);
  
        // Show success message
        showNotification("Topic created successfully", "success");
  
        // Redirect to the new topic (in a real app)
        // For demo, we'll just switch to the category
        switchCategory(category);
  
        // Announce to screen readers
        announceToScreenReader("New topic created successfully");
  
        // Reset form
        newTopicForm.reset();
      }, 1000);
    }
  
    // Perform search
    function performSearch() {
      const query = searchInput.value.trim();
  
      if (!query) {
        showNotification("Please enter a search term", "error");
        return;
      }
  
      state.searchQuery = query;
  
      // Simulate search
      showNotification(`Searching for "${query}"...`);
  
      // In a real application, this would perform an actual search
      // For demo purposes, we'll just show a notification
      setTimeout(() => {
        showNotification(`Found 5 results for "${query}"`, "success");
  
        // Announce to screen readers
        announceToScreenReader(`Found 5 results for ${query}`);
      }, 1000);
    }
  
    // Trap focus within modal
    function trapFocusInModal(modal) {
      // Get all focusable elements in modal
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      // Handle tab key in modal
      modal.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          // Shift + Tab
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
            // Tab
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
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
  
    // Announce message to screen readers
    function announceToScreenReader(message) {
      const ariaLiveElement = document.createElement("div");
      ariaLiveElement.setAttribute("aria-live", "assertive");
      ariaLiveElement.setAttribute("class", "visually-hidden");
      document.body.appendChild(ariaLiveElement);
  
      setTimeout(() => {
        ariaLiveElement.textContent = message;
      }, 100);
  
      setTimeout(() => {
        document.body.removeChild(ariaLiveElement);
      }, 3000);
    }
  
    // Initialize the application
    init();
  })();
  