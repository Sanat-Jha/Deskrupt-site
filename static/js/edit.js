
function previewImage(event) {
    const previewContainer = document.getElementById('preview-container');
    const placeholder = previewContainer.querySelector('.placeholder');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Clear previous content
            previewContainer.innerHTML = '';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = e.target.result;
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        // Reset to placeholder if no file is selected
        previewContainer.innerHTML = '<p class="placeholder">No image selected</p>';
    }
    isBgImageChanged = true;
}

document.addEventListener("DOMContentLoaded", () => {

    const saveButton = document.querySelector(".save-btn");
    const deletebtn = document.querySelector("#delete");
    saveButton.addEventListener("click", () => {
        
        // Collect data from the form
        const username = document.querySelector(".pageheader").textContent.trim().replace("/", "");
        const title = document.querySelector(".title").value.trim();
        const animation = document.querySelector(".animation-dropdwn").value;
        const fileInput = document.getElementById("file-input");
        const imageFile = fileInput.files[0];
        const isBgImageChanged = fileInput.files.length > 0; // Detect if a new image is selected
    
        if (!title || !animation) {
            alert("Please fill in all required fields.");
            return;
        }
    
        // Collect shortcuts data
        const shortcuts = {};
        document.querySelectorAll(".shortcut").forEach(shortcutDiv => {
            const key = shortcutDiv.querySelector(".shortcut-key").value.trim();
            const command = shortcutDiv.querySelector(".shortcut-command").value.trim();
            if (key && command) {
                shortcuts[key.toLowerCase()] = command;
            }
        });
        const shortcutsJSON = JSON.stringify(shortcuts);
        const widgetsJSON = JSON.stringify(widgitsjson);
    
        // Prepare the data for submission
        const formData = new FormData();
        formData.append("username", username);
        formData.append("title", title);
        formData.append("oldtitle", deckTitle);
        formData.append("animation", animation);
        formData.append("isBgImageChanged", isBgImageChanged);
        formData.append("shortcuts", shortcutsJSON); // Add shortcuts JSON to form data
        formData.append("widgets", widgetsJSON); // Add shortcuts JSON to form data
        if (imageFile) {
            formData.append("image", imageFile);
        }
    
        // Send the data via a POST request
        fetch("/saveedits/", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": getCSRFToken(), // Add CSRF token if needed (Django)
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Assuming the server returns JSON
            })
            .then(data => {
                if (data.status === "success") {
                    alert(data.message); // Show success message from backend
                } else {
                    alert(data.message); // Show error message from backend
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    });
    
    deletebtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this deck?")) {
            // Sending POST request to delete the deck
            fetch('/deletedeck/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()  // Ensure CSRF protection
                },
                body: JSON.stringify({
                    deck: deckcode  // Ensure this is correctly passed
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // Assuming the server returns JSON
                })
                .then(data => {
                    if (data.status === "success") {
                        alert(data.message);  // Show success message from backend
                        window.location.href = '/dashboard';  // Redirect to /dashboard after alert box is closed

                    } else {
                        alert(data.message); // Show error message from backend
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again.");
                });
        }
    });


  // Select all delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');

  // Add event listener to each delete button
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the parent div (shortcut) and remove it
      const shortcutDiv = button.closest('.shortcut');
      shortcutDiv.remove();
    });
  });


    // CSRF token helper (for Django)
    function getCSRFToken() {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith("csrftoken=")) {
                return cookie.substring("csrftoken=".length);
            }
        }
        return "";
    }
    const container = document.getElementById('shortcuts-container');
const addBtn = document.getElementById('add-shortcut-btn');
const saveBtn = document.getElementById('save-btn');

addBtn.addEventListener('click', () => {
  const shortcutDiv = document.createElement('div');
  shortcutDiv.classList.add('shortcut');
  shortcutDiv.innerHTML = `
    <label>Ctrl +</label>
    <input type="text" class="shortcut-key" maxlength="1" placeholder="Letter">
    <i class="fa-solid fa-arrow-right shortcutsarrowicon"></i>
    <input type="text" class="shortcut-command" placeholder="Enter Command">
    <button class="delete-btn">Delete</button>
  `;
  
  container.appendChild(shortcutDiv);
  
  // Delete button functionality
  shortcutDiv.querySelector('.delete-btn').addEventListener('click', () => {
    shortcutDiv.remove();
  });
});





});



