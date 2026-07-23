import { useState } from 'react';
import './SettingsForm.css';

const INITIAL_SETTINGS = {
  displayName: '',
  email: '',
  theme: 'system',
  language: 'en',
  timezone: 'UTC',
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
};

const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'America/Chicago', label: 'Central Time (US)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
];

function SettingsForm() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSavedMessage('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!settings.displayName.trim()) {
      nextErrors.displayName = 'Display name is required.';
    }

    if (!settings.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSavedMessage('Settings saved successfully.');
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
    setErrors({});
    setSavedMessage('');
  };

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <header className="settings__header">
        <h1 id="settings-heading">Settings</h1>
        <p>Manage your profile, preferences, and notifications.</p>
      </header>

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="settings__section">
          <legend>Profile</legend>

          <div className="settings__field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              value={settings.displayName}
              onChange={(event) => updateField('displayName', event.target.value)}
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            />
            {errors.displayName && (
              <p id="displayName-error" className="settings__error" role="alert">
                {errors.displayName}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={settings.email}
              onChange={(event) => updateField('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="settings__error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="settings__section">
          <legend>Preferences</legend>

          <div className="settings__field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={(event) => updateField('theme', event.target.value)}
            >
              {THEMES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="settings__field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={(event) => updateField('language', event.target.value)}
            >
              {LANGUAGES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="settings__field">
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={(event) => updateField('timezone', event.target.value)}
            >
              {TIMEZONES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="settings__section">
          <legend>Notifications</legend>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={(event) => updateField('emailNotifications', event.target.checked)}
            />
            <span>Email notifications</span>
          </label>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={settings.pushNotifications}
              onChange={(event) => updateField('pushNotifications', event.target.checked)}
            />
            <span>Push notifications</span>
          </label>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={settings.marketingEmails}
              onChange={(event) => updateField('marketingEmails', event.target.checked)}
            />
            <span>Marketing emails</span>
          </label>
        </fieldset>

        <div className="settings__actions">
          <button type="submit" className="settings__button settings__button--primary">
            Save changes
          </button>
          <button
            type="button"
            className="settings__button settings__button--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {savedMessage && (
          <p className="settings__success" role="status">
            {savedMessage}
          </p>
        )}
      </form>
    </section>
  );
}

export default SettingsForm;
