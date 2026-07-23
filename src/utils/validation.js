const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateSettings(settings) {
  const errors = {};

  const fullName = settings.fullName.trim();
  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  const email = settings.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address (for example, name@example.com).';
  }

  return errors;
}
