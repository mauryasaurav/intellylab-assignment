import * as Yup from "yup";

export const validateType = (value) => {
  let error;
  if (!value) {
    error = `Required field`;
  }
  return error;
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export const validateSelect = (obj) => {
  let error;
  if (!obj) {
    error = `Required field`;
  }
  return error;
};

export const validateEmail = (value) => {
  if (!value) return "Email is required";
  if (!isValidEmail(value)) return "Invalid email";
  return undefined;
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9_ ]+$/, "Special character not allowed")
    .min(3, "Username is too short - should be 4 chars minimum.")
    .matches(/^([A-Z]|\d| (?! )|(?!\s\s).)*$/, "Double space not allowed"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])",
      "Password should contains at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required field"),
  last_name: Yup.string().required("Last Name is required field"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one numeric digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password cannot exceed 16 characters")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const chnagePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required("Old Password is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one numeric digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password cannot exceed 16 characters")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const isValidMapHTML = (value) => {
  let error;
  if (!value) return `Required field`;

  const regex =
    /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".?"|'.?'|[^'">\s]+))?)+\s*|\s*)>[^<>]<\/\1+\s>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".?"|'.?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.?-->|[^<>]+)$/;
  if (regex.test(value)) return "Invalid string";
  return error;
};

export const subAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required field"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  contact: Yup.string()
    .min(6, "Contact must be at least 6 characters long")
    .max(15, "Contact cannot exceed 15 characters")
    .required("Contact is required"),
  adminId: Yup.string().required("Admin ID is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one numeric digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password cannot exceed 16 characters")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const editSubAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required field"),
  countryCode: Yup.string().required("countryCode is required field"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .required("Contact is required"),
  adminId: Yup.string().required("Admin ID is required"),
});

export const promoCodeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Promo Code is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  promoType: Yup.string().required("Promo Type is required"),
  discount: Yup.number()
    .required("Promo Type is required")
    .min(1, "Min is 1")
    .max(100, "max is 100"),
  discountUpto: Yup.number()
    .required("Discount Percentage is required")
    .min(1, "Min is 1"),
  usageLimit: Yup.number()
    .required("Usage Limit is required")
    .min(1, "Min is 1"),
  minimumSpend: Yup.number().required("Booking Charges is required"),
  usageLimitType: Yup.string().required("Usage Limit Type is required"),
  termsAndConditions: Yup.string().required("Terms And Conditions is required"),
});

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  link: Yup.string().url("Invalid URL format").required("Link is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
});

export const faqSchema = Yup.object().shape({
  question: Yup.string().required("Question is required."),
  answer: Yup.string().required("Answer is required."),
});
