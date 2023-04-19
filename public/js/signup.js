document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector("#submit");

    submitBtn?.addEventListener("click", async (e) => {
        e.preventDefault();

        const myForm = new FormData(document.forms.signupForm);
        let formObj = {};
        for (let data of myForm) {
            formObj[data[0]] = data[1];
        }

        const jsonFormObj = JSON.stringify(formObj);

        try {
            const response = await fetch("/addAccount", {
                method: "POST",
                body: jsonFormObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert("New User Registered.");
            } else {
                alert("Registration Failed. Please try again.");
                document.forms.signupForm.reset(); // Reset the form fields
            }
            console.log(`Server responded: ${response}`);
        } catch (err) {
            console.error(err);
        }
    });
});
