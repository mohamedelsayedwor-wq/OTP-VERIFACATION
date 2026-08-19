
const inputs = document.querySelectorAll(".otp-inputs input");

const verifyBtn = document.getElementById("verifyBtn");

const resendBtn = document.getElementById("resendBtn");

const message = document.getElementById("message");

const otpCard = document.querySelector(".otp-card");


// ===============================
// Focus
// ===============================

inputs[0].focus();


// ===============================
// OTP INPUT
// ===============================

inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/[^0-9]/g, "");


        if (input.value !== "") {

            if (index < inputs.length - 1) {

                inputs[index + 1].focus();

            }

        }

    });


    // ===============================
    // BACKSPACE
    // ===============================

    input.addEventListener("keydown", (e) => {

        if (
            e.key === "Backspace" &&
            input.value === ""
        ) {

            if (index > 0) {

                inputs[index - 1].focus();

            }

        }

    });


    // ===============================
    // PASTE
    // ===============================

    input.addEventListener("paste", (e) => {

        e.preventDefault();


        const pastedData =
            e.clipboardData
                .getData("text")
                .replace(/[^0-9]/g, "");


        if (!pastedData) return;


        pastedData
            .slice(0, inputs.length)
            .split("")
            .forEach((number, i) => {

                inputs[i].value = number;

            });


        const nextIndex =
            Math.min(
                pastedData.length,
                inputs.length - 1
            );


        inputs[nextIndex].focus();

    });

});


// ===============================
// VERIFY
// ===============================

verifyBtn.addEventListener("click", () => {

    const otp =
        Array.from(inputs)
            .map(input => input.value)
            .join("");


    message.className = "";


    // ===============================
    // CHECK COMPLETE
    // ===============================

    if (
        otp.length !==
        inputs.length
    ) {

        message.textContent =
            "Please enter the complete OTP code.";

        message.classList.add("error");

        return;

    }


    // ===============================
    // TEST OTP
    // ===============================

    const correctOTP = "1234";


    // ===============================
    // SUCCESS
    // ===============================

    if (otp === correctOTP) {

        message.textContent =
            "Verification successful!";

        message.classList.add("success");


        // Disable inputs

        inputs.forEach(input => {

            input.disabled = true;

        });


        // Disable button

        verifyBtn.disabled = true;

        verifyBtn.textContent =
            "Verified ✓";


        // ===============================
        // STEP 1
        // Connect lines
        // ===============================

        otpCard.classList.add("connecting");


        // ===============================
        // STEP 2
        // Rotate and disappear
        // ===============================

        setTimeout(() => {

            otpCard.classList.add("hide-otp");

        }, 1700);


        // ===============================
        // STEP 3
        // Show VERIFIED
        // ===============================

        setTimeout(() => {

            otpCard.classList.add("show-verified");

        }, 2700);

    }


    // ===============================
    // WRONG OTP
    // ===============================

    else {

        message.textContent =
            "Invalid OTP code.";

        message.classList.add("error");


        inputs.forEach(input => {

            input.value = "";

        });


        inputs[0].focus();

    }

});


// ===============================
// RESEND
// ===============================

resendBtn.addEventListener("click", () => {

    message.className = "";

    message.textContent =
        "A new OTP has been sent.";

    message.classList.add("success");


    inputs.forEach(input => {

        input.value = "";

        input.disabled = false;

    });


    verifyBtn.disabled = false;

    verifyBtn.textContent =
        "Verify";


    otpCard.classList.remove(
        "connecting",
        "hide-otp",
        "show-verified"
    );


    inputs[0].focus();

});

