emailjs.init("pbb4DH4vTWf1EenbX");

// Assume the user's email is stored globally for verification
let userEmailForVerification;
let expectedOTP; // Store the expected OTP

function sendOTP() {
    // Get the user's email
    userEmailForVerification = document.getElementById('email').value;

    // Generate OTP and store it for verification
    expectedOTP = generateOTP();

    var templateParams = {
        to_email: userEmailForVerification,
        subject: 'OTP for Email Verification',
        body: `Your OTP is: ${expectedOTP}`
    };

    emailjs.send('service_uo4rjou', 'template_g3n1bsm', templateParams)
        .then(function (response) {
            console.log('Email sent successfully:', response);
            // alert('OTP sent successfully');
            Swal.fire({
                text: "OTP sent successfully!",
                icon: "success"
                });
            // Show OTP input and verify button
            document.getElementById('otpLabel').style.display = 'block';
            document.getElementById('otp').style.display = 'block';
            document.getElementById('verifyBtn').style.display = 'block';
            
        })
        .catch(function (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again.');
        });
}

function verifyOTP() {
    var enteredOTP = document.getElementById('otp').value;

    console.log('Entered OTP:', enteredOTP);
    console.log('Expected OTP:', expectedOTP);

    // Compare entered OTP with the expected OTP
    if (enteredOTP.trim() === expectedOTP) {
        Swal.fire({
            title: "Good job!",
            text: "OTP verification successful!",
            icon: "success"
            });
        // Your logic for successful verification, e.g., redirect to a new page
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid OTP. Please try again.!",
            });
        // Your logic for unsuccessful verification
    }
}

function generateOTP() {
    var otpLength = 6;
    var otp = '';
    for (var i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}