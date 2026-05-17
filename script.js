document.addEventListener("DOMContentLoaded", function () {

    const reviewForm = document.getElementById("reviewForm");
    const reviewsDisplay = document.getElementById("reviewsDisplay");

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const rating = document.getElementById("rating").value;
        const reviewText = document.getElementById("review").value;

        // Create review box
        const reviewBox = document.createElement("div");
        reviewBox.classList.add("review-box");

        reviewBox.innerHTML = `
            <strong>${name}</strong>
            <p>${rating}</p>
            <p>${reviewText}</p>
        `;

        // Remove "No reviews yet" message if it exists
        const noReviews = reviewsDisplay.querySelector(".no-reviews");
        if (noReviews) {
            noReviews.remove();
        }

        // Add review to page
        reviewsDisplay.appendChild(reviewBox);

        // Reset form
        reviewForm.reset();
    });

});


// 📧 EMAIL FUNCTION
function sendEmail() {
    const name = document.getElementById("emailName").value;
    const email = document.getElementById("emailAddress").value;
    const message = document.getElementById("emailMessage").value;

    // Simple validation
    if (!name || !email || !message) {
        alert("Please fill out all fields before sending.");
        return;
    }

    const subject = encodeURIComponent("Portfolio Contact from " + name);
    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message
    );

    window.location.href = `mailto:cm79333@gmail.com?subject=${subject}&body=${body}`;
}

// Load reviews when page opens
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const container = document.getElementById("reviewsDisplay");

    container.innerHTML = "";

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
        return;
    }

    reviews.forEach(r => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-card";

        reviewDiv.innerHTML = `
            <strong>${r.name}</strong> - ${r.rating}
            <p>${r.text}</p>
            <hr>
        `;

        container.appendChild(reviewDiv);
    });
}

// Handle form submit
function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const text = document.getElementById("reviewText").value;

    if (!name || !rating || !text) return;

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({ name, rating, text });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.querySelector(".review-form").reset();

    loadReviews();
}

// Load on page start
window.onload = loadReviews;


// OPTIONAL: clear bad/old data (run once if needed)
// localStorage.clear();
