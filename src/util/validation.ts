import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email(),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/),
});
export const signupValidation = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
      "password must be alphanumeric!"
    )
    .required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "passwords do not match!")
    .required(),
});
