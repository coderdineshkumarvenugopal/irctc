export function validateEmail(email: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email is required.");
  } else {
    if (!email.includes("@")) {
      errors.push("Email must contain '@'.");
    }
    if (!email.includes(".")) {
      errors.push("Email must contain a domain (e.g., '.com').");
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      errors.push("Email format is invalid.");
    }
  }

  return {
    isValid: errors?.length === 0,
    errors,
  };
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password?.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }
  if (!/[\W_]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    isValid: errors?.length === 0,
    errors,
  };
}
