// Replace 'YOUR_FORMSPREE_ENDPOINT_ID' with your actual Formspree ID
const FORMSPREE_ID = "maeqovzk";

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  if (FORMSPREE_ID === "YOUR_FORMSPREE_ENDPOINT_ID" || !FORMSPREE_ID) {
    formStatus.style.color = "#d93838";
    formStatus.textContent = "[ CONFIGURATION REQUIRED: ADD FORMSPREE_ID IN SCRIPT.JS ]";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "SENDING...";
  formStatus.textContent = "";

  const formData = new FormData(form);

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.style.color = "#1a1a1a";
      formStatus.textContent = "[ MESSAGE SENT SUCCESSFULLY ]";
      form.reset();
    } else {
      const data = await response.json();
      throw new Error(data.errors ? data.errors.map(error => error.message).join(", ") : "SUBMISSION FAILED");
    }
  } catch (error) {
    formStatus.style.color = "#d93838";
    formStatus.textContent = "[ ERROR: " + error.message.toUpperCase() + " ]";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "SEND INQUIRY —>";
  }
});