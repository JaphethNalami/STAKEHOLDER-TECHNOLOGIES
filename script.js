document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  emailjs.init("Pj7FmWwP3gWIidj9R"); // Replace with your EmailJS Public Key

  // Close button functionality - UPDATED to close the window
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    try {
      window.close();
    } catch (e) {
      console.log("Could not close window automatically. Hiding modal instead.");
      const modal = document.querySelector(".modal");
      modal.style.opacity = "0";
      modal.style.transform = "translateY(20px)";

      setTimeout(() => {
        document.querySelector(".page-container").style.display = "none";
      }, 300);
    }
  });

  // Speed Test button functionality
  const speedTestBtn = document.querySelector(".primary-btn");
  speedTestBtn.addEventListener("click", () => {
    window.location.href = "https://wifiman.com/";
  });

  // Visit Website button functionality
  const visitWebsiteBtn = document.querySelector(".secondary-btn");
  visitWebsiteBtn.addEventListener("click", () => {
    alert("Redirecting to Stakeholder Technologies website...");
  });

  // Support button functionality
  const supportBtn = document.querySelector(".support-btn");
  supportBtn.addEventListener("click", () => {
    window.location.href = "https://wa.me/+254114821468";
  });

  // Contact form modal functionality
  const formModal = document.getElementById("contactFormModal");
  const formCloseBtn = document.querySelector(".form-close-btn");
  const adBtn = document.querySelector(".ad-btn");

  // Open form modal when Get Started button is clicked
  adBtn.addEventListener("click", () => {
    formModal.classList.add("active");
  });

  // Close form modal when close button is clicked
  formCloseBtn.addEventListener("click", () => {
    formModal.classList.remove("active");
  });

  // Close form modal when clicking outside the form
  formModal.addEventListener("click", (e) => {
    if (e.target === formModal) {
      formModal.classList.remove("active");
    }
  });

  // Handle pricing item selection
  const pricingItems = document.querySelectorAll(".pricing-item");
  let selectedPackage = null;

  function addPulseEffect() {
    pricingItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("pulse");
        setTimeout(() => {
          item.classList.remove("pulse");
        }, 700);
      }, index * 150);
    });
  }

  addPulseEffect();
  setInterval(addPulseEffect, 15000);

  pricingItems.forEach((item) => {
    item.addEventListener("click", function () {
      pricingItems.forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");

      selectedPackage = {
        speed: this.getAttribute("data-speed"),
        price: this.getAttribute("data-price"),
      };

      const packageSelect = document.getElementById("package");
      const packageOption = `${selectedPackage.speed} - ${selectedPackage.price}`;

      for (let i = 0; i < packageSelect.options.length; i++) {
        if (packageSelect.options[i].value === packageOption) {
          packageSelect.selectedIndex = i;
          break;
        }
      }

      formModal.classList.add("active");
    });
  });

  // Form submission with EmailJS
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Send email using EmailJS
    emailjs
      .send("service_px1wu0q", "template_qyu44og", {
        fullName: formDataObj.fullName,
        email: formDataObj.email,
        phone: formDataObj.phone,
        address: formDataObj.address || "Not provided",
        package: formDataObj.package,
        message: formDataObj.message || "No additional info",
      })
      .then(
        function (response) {
          console.log("Email successfully sent!", response);
          alert("Your request has been submitted successfully!");

          // Hide form & show success message
          contactForm.style.display = "none";
          formSuccess.style.display = "block";

          // Reset form
          contactForm.reset();

          // Close modal after 3 seconds
          setTimeout(() => {
            formModal.classList.remove("active");
            setTimeout(() => {
              contactForm.style.display = "block";
              formSuccess.style.display = "none";
            }, 500);
          }, 3000);
        },
        function (error) {
          console.error("Failed to send email:", error);
          alert("Error sending request. Please try again.");
        }
      );
  });

  // Add animation for modal appearance
  const modal = document.querySelector(".modal");
  modal.style.opacity = "0";
  modal.style.transform = "translateY(20px)";
  modal.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.style.transform = "translateY(0)";
  }, 100);

  // Add animation to the new service badge
  const newBadge = document.querySelector(".new-badge");
  setInterval(() => {
    newBadge.style.transform = "rotate(45deg) scale(1.1)";
    setTimeout(() => {
      newBadge.style.transform = "rotate(45deg) scale(1)";
    }, 300);
  }, 3000);

  // Add hover effect for pricing items
  const pricingItemsHover = document.querySelectorAll(".pricing-item");
  pricingItemsHover.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (!this.classList.contains("selected")) {
        this.style.backgroundColor = "#f0f7ff";
      }
    });
    item.addEventListener("mouseleave", function () {
      if (!this.classList.contains("selected")) {
        this.style.backgroundColor = "white";
      }
    });
  });

  // Adjust viewport responsiveness
  function adjustForViewport() {
    const vh = window.innerHeight;
    const modalContent = document.querySelector(".modal-content");

    if (vh < 600) {
      modalContent.style.maxHeight = `${vh - 80}px`;
    } else {
      modalContent.style.maxHeight = "calc(100vh - 100px)";
    }
  }

  adjustForViewport();
  window.addEventListener("resize", adjustForViewport);
});
