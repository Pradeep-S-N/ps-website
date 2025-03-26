// Handle the "continue" button click
const continueBtn = document.getElementById('continueBtn');
const gmailInput = document.getElementById('gmailInput');
const otpModal = document.getElementById('otpModal');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const otpInputs = document.querySelectorAll('.otp-input');
const otpContinueBtn = document.getElementById('otpContinueBtn');
const resendCodeLink = document.getElementById('resendCodeLink');

if (continueBtn && gmailInput) {
  continueBtn.addEventListener('click', async function () {
    const emailValue = gmailInput.value.trim();

    if (!emailValue) {
      alert('Please enter a valid email');
      return;
    }

    try {
      // Call the backend to send the OTP email
      const response = await fetch('http://localhost:3000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      });
      const data = await response.json();

      if (response.ok) {
        // OTP sent successfully, display user email and show the OTP modal
        userEmailDisplay.textContent = emailValue;
        otpModal.style.display = 'flex';

        // Clear OTP inputs and disable the continue button
        otpInputs.forEach(input => (input.value = ''));
        otpContinueBtn.classList.remove('btn-continue-enabled');
        otpContinueBtn.classList.add('btn-continue-disabled');
        otpContinueBtn.disabled = true;
      } else {
        alert('Error sending OTP: ' + data.message);
      }
    } catch (error) {
      console.error('Error sending OTP', error);
      alert('Error sending OTP.');
    }
  });
}

function checkAllOtpInputs() {
  const allFilled = Array.from(otpInputs).every(input => input.value.trim() !== '');
  if (allFilled) {
    otpContinueBtn.classList.remove('btn-continue-disabled');
    otpContinueBtn.classList.add('btn-continue-enabled');
    otpContinueBtn.disabled = false;
  } else {
    otpContinueBtn.classList.remove('btn-continue-enabled');
    otpContinueBtn.classList.add('btn-continue-disabled');
    otpContinueBtn.disabled = true;
  }
}

// Handle the "Continue" button in the OTP modal
if (otpContinueBtn) {
  otpContinueBtn.addEventListener('click', function () {
    const otpValue = Array.from(otpInputs).map(input => input.value).join('');
    const mockCorrectOTP = '123456'; // Replace with server-side validation

    if (otpValue === mockCorrectOTP) {
      alert('OTP is correct! Signing you in...');
      otpModal.style.display = 'none';
    } else {
      alert('Invalid code. Please try again.');
      otpInputs.forEach(input => (input.value = ''));
      otpInputs[0].focus();
      otpContinueBtn.classList.remove('btn-continue-enabled');
      otpContinueBtn.classList.add('btn-continue-disabled');
      otpContinueBtn.disabled = true;
    }
  });
}

// Handle the "Resend code" link
if (resendCodeLink) {
  resendCodeLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('A new code has been sent to your email.');
    // Add server-side logic to resend OTP
  });
}

// Handle the "continue with Google" button click
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
  googleBtn.addEventListener('click', function () {
    alert('Continue with Google clicked');
    // Add Google sign-in logic here
  });
}

// Handle the "continue with Apple" button click
const appleBtn = document.getElementById('appleBtn');
if (appleBtn) {
  appleBtn.addEventListener('click', function () {
    alert('Continue with Apple clicked');
    // Add Apple sign-in logic here
  });
}