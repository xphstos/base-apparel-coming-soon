import { object, string } from "yup";
import debounce from "lodash/debounce";

const form = document.querySelector(".form");
const emailInput = form.querySelector(".form__input");
const submitButton = form.querySelector(".form__submit");
const formSchema = object({
  email: string().email().required(),
});

// Initial validation of the form
formSchema
  .isValid({
    email: emailInput.value,
  })
  .then((valid) => {
    submitButton.disabled = !valid;
  });

// Validate the email when user starts typing
emailInput.addEventListener(
  "input",
  debounce(({ target: { value } }) => {
    formSchema
      .isValid({
        email: value,
      })
      .then((valid) => {
        submitButton.disabled = !valid;
        form.classList.toggle("has-errors", !valid);
      });
  }, 400)
);

// Validate the email input when it loses focus
emailInput.addEventListener("blur", ({ target: { value } }) => {
  formSchema
    .isValid({
      email: value,
    })
    .then((valid) => {
      submitButton.disabled = !valid;
      form.classList.toggle("has-errors", !valid);
    });
});

// Validate the form data after submition
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  formSchema
    .isValid({
      email: formData.get("email"),
    })
    .then((valid) => {
      form.classList.toggle("success", valid);
    });
});
