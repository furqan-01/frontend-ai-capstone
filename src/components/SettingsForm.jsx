import { useEffect, useRef, useState } from 'react';
import CheckboxField from './CheckboxField.jsx';
import FormField from './FormField.jsx';
import SelectField from './SelectField.jsx';
import { validateSettings } from '../utils/validation.js';
import './SettingsForm.css';

const INITIAL_SETTINGS = {
  fullName: '',
  email: '',
  theme: 'light',
  enableNotifications: false,
};

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function applyTheme(theme) {
  document.body.classList.toggle('theme-dark', theme === 'dark');
}

function SettingsForm() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  const updateField = (field, value) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSavedMessage('');
  };

  const focusFirstError = (validationErrors) => {
    const firstErrorField = Object.keys(validationErrors)[0];
    if (!firstErrorField || !formRef.current) {
      return;
    }

    const input = formRef.current.querySelector(`[name="${firstErrorField}"]`);
    input?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateSettings(settings);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    setSavedMessage('Your settings have been saved successfully.');
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
    setErrors({});
    setSavedMessage('');
    applyTheme(INITIAL_SETTINGS.theme);
  };

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <header className="settings__header">
        <h1 id="settings-heading">Settings</h1>
        <p>Update your profile and application preferences.</p>
      </header>

      <form
        ref={formRef}
        className="settings__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="settings__section">
          <legend>Profile</legend>

          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            value={settings.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            error={errors.fullName}
            autoComplete="name"
            required
          />

          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={settings.email}
            onChange={(event) => updateField('email', event.target.value)}
            error={errors.email}
            autoComplete="email"
            required
          />
        </fieldset>

        <fieldset className="settings__section">
          <legend>Preferences</legend>

          <SelectField
            id="theme"
            name="theme"
            label="Theme"
            value={settings.theme}
            onChange={(event) => updateField('theme', event.target.value)}
            options={THEME_OPTIONS}
          />

          <CheckboxField
            id="enableNotifications"
            name="enableNotifications"
            label="Enable Notifications"
            checked={settings.enableNotifications}
            onChange={(event) =>
              updateField('enableNotifications', event.target.checked)
            }
          />
        </fieldset>

        <div className="settings__actions">
          <button type="submit" className="settings__button settings__button--primary">
            Save Settings
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
          <p className="settings__success" role="status" aria-live="polite">
            {savedMessage}
          </p>
        )}
      </form>
    </section>
  );
}

export default SettingsForm;
