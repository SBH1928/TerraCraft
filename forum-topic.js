(() => {
    // State management
    const state = {
      topicId: null,
      showLoginModal: false,
      isLoggedIn: false,
      user: null,
      isSubscribed: false,
      isBookmarked: false,
    };
  
    // DOM Elements
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");
    const closeLoginButton = document.getElementById("close-login-button");
    const loginForm = document.getElementById("login-form");
    const replyForm = document.getElementById("reply-form");
    const subscribeButton = document.getElementById("subscribe-button");
    const bookmarkButton = document.getElementById("bookmark-button");
    const shareButton = document.getElementById("share-button");
    const notificationArea = document.getElementById("notification-area");
    const actionButtons = document.querySelectorAll(".action-button");
    const pageButtons = document.querySelectorAll(".page-button");
  
    // Initialize the application
    function init() {
      // Get topic ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("id")) {
        state.topicId = urlParams.get("id");
        loadTopicData();
      }
  
      attachEventListeners();
    }
  
    // Load topic data
    function loadTopicData() {
      // In a real application, this would fetch topic data from an API
      // For demo purposes, we'll use the data already in the HTML
      document.title = `${document.getElementById("topic-title").textContent} - Organic Farming Hub Forum`;
    }
  
    // Attach event listeners
    function attachEventListeners() {
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
  
      // Reply form submission
      replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleReply();
      });
  
      // Subscribe button
      subscribeButton.addEventListener("click", () => {
        toggleSubscription();
      });
  
      // Bookmark button
      bookmarkButton.addEventListener("click", () => {
        toggleBookmark();
      });
  
      // Share button
      shareButton.addEventListener("click", () => {
        shareTopic();
      });
  
      // Action buttons (like, quote, report)
      actionButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const action = e.target.textContent.trim().split(" ")[0].toLowerCase();
          handlePostAction(action, e.target);
        });
      });
  
      // Pagination buttons
      pageButtons.forEach((button) => {
        if (!button.disabled) {
          button.addEventListener("click", () => {
            // In a real application, this would load the next/previous page
            showNotification("Loading more replies...");
  
            // Simulate loading
            setTimeout(() => {
              showNotification("Page changed successfully", "success");
            }, 1000);
          });
        }
      });
  
      // Close modal when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
          toggleLoginModal(false);
        }
      });
  
      // Keyboard support for modal
      loginModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleLoginModal(false);
        }
      });
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
  
    // Handle reply submission
    function handleReply() {
      const replyContent = document.getElementById("reply-content").value;
  
      if (!replyContent) {
        showNotification("Please enter your reply", "error");
        return;
      }
  
      if (!state.isLoggedIn) {
        showNotification("Please log in to post a reply", "error");
        toggleLoginModal(true);
        return;
      }
  
      // Simulate reply submission
      showNotification("Posting your reply...");
  
      // Simulate API call
      setTimeout(() => {
        // Show success message
        showNotification("Reply posted successfully", "success");
  
        // Clear form
        document.getElementById("reply-content").value = "";
  
        // Announce to screen readers
        announceToScreenReader("Your reply has been posted");
  
        // In a real application, the new reply would be added to the page
        // For demo purposes, we'll just show a notification
      }, 1000);
    }
  
    // Toggle subscription
    function toggleSubscription() {
      if (!state.isLoggedIn) {
        showNotification("Please log in to subscribe to topics", "error");
        toggleLoginModal(true);
        return;
      }
  
      state.isSubscribed = !state.isSubscribed;
  
      if (state.isSubscribed) {
        subscribeButton.textContent = "Unsubscribe from Topic";
        showNotification("You are now subscribed to this topic", "success");
      } else {
        subscribeButton.textContent = "Subscribe to Topic";
        showNotification("You have unsubscribed from this topic", "info");
      }
    }
  
    // Toggle bookmark
    function toggleBookmark() {
      if (!state.isLoggedIn) {
        showNotification("Please log in to bookmark topics", "error");
        toggleLoginModal(true);
        return;
      }
  
      state.isBookmarked = !state.isBookmarked;
  
      if (state.isBookmarked) {
        bookmarkButton.textContent = "Remove Bookmark";
        showNotification("Topic bookmarked", "success");
      } else {
        bookmarkButton.textContent = "Bookmark";
        showNotification("Bookmark removed", "info");
      }
    }
  
    // Share topic
    function shareTopic() {
      // In a real application, this would open a share dialog
      // For demo purposes, we'll copy the URL to clipboard
  
      try {
        navigator.clipboard.writeText(window.location.href);
        showNotification("Topic URL copied to clipboard", "success");
      } catch (err) {
        showNotification("Failed to copy URL: " + err, "error");
      }
    }
  
    // Handle post actions (like, quote, report)
    function handlePostAction(action, button) {
      if (!state.isLoggedIn && (action === "like" || action === "quote")) {
        showNotification(`Please log in to ${action} posts`, "error");
        toggleLoginModal(true);
        return;
      }
  
      switch (action) {
        case "like":
          // In a real application, this would send a like to the server
          // For demo purposes, we'll just update the button text
          const likeCount = parseInt(button.textContent.match(/\d+/)[0]) + 1;
          button.textContent = `Like (${likeCount})`;
          showNotification("Post liked", "success");
          break;
  
        case "quote":
          // In a real application, this would add the quoted text to the reply box
          // For demo purposes, we'll just scroll to the reply form
          document.getElementById("reply-content").focus();
          showNotification("Quote added to reply", "success");
          break;
  
        case "report":
          // In a real application, this would open a report dialog
          // For demo purposes, we'll just show a notification
          showNotification(
            "Report submitted. Thank you for helping keep our community safe.",
            "success",
          );
          break;
      }
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
  