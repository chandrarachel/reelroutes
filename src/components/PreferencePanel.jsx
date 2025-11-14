import { useState } from 'react';
import { Bell, Moon, Utensils, Languages, AlertCircle, Check } from 'lucide-react';
import { preferenceAPI } from '../lib/api';
import './PreferencePanel.css';

const PreferencePanel = ({ userId, onClose }) => {
  const [preferences, setPreferences] = useState({
    wakeForMeals: false,
    sleepThroughService: false,
    dietaryRestrictions: [],
    languagePreference: 'English',
    specialAssistance: '',
    firstTimeFlyernote: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Kosher',
    'Gluten-Free',
    'Dairy-Free',
    'Nut Allergy',
    'Seafood Allergy',
  ];

  const languageOptions = [
    'English',
    'Mandarin',
    'Cantonese',
    'Indonesian',
    'Japanese',
    'Korean',
    'Thai',
    'Vietnamese',
  ];

  const handleDietaryToggle = (option) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(option)
        ? prev.dietaryRestrictions.filter((item) => item !== option)
        : [...prev.dietaryRestrictions, option],
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      // Save meal preferences
      if (preferences.dietaryRestrictions.length > 0) {
        await preferenceAPI.addMealPreference(userId, {
          dietary_restrictions: preferences.dietaryRestrictions,
        });
      }

      // Save service preferences
      await preferenceAPI.addServicePreference(userId, {
        wake_for_meals: preferences.wakeForMeals,
        sleep_through_service: preferences.sleepThroughService,
        language_preference: preferences.languagePreference,
        special_assistance: preferences.specialAssistance,
        first_time_flyer: preferences.firstTimeFlyernote,
      });

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="preference-panel">
      <div className="preference-header">
        <h2>Your In-Flight Preferences</h2>
        <p>Help us personalize your experience</p>
      </div>

      <div className="preference-sections">
        {/* Service Preferences */}
        <div className="preference-section">
          <h3>
            <Bell size={20} />
            Service Preferences
          </h3>

          <div className="preference-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={preferences.wakeForMeals}
                onChange={(e) =>
                  setPreferences({ ...preferences, wakeForMeals: e.target.checked })
                }
              />
              <div className="checkbox-content">
                <Moon size={18} />
                <div>
                  <strong>Wake me for meals</strong>
                  <p>We'll gently wake you when meal service begins</p>
                </div>
              </div>
            </label>
          </div>

          <div className="preference-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={preferences.sleepThroughService}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    sleepThroughService: e.target.checked,
                  })
                }
              />
              <div className="checkbox-content">
                <Moon size={18} />
                <div>
                  <strong>Let me sleep through service</strong>
                  <p>Skip meal service and minimize interruptions</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="preference-section">
          <h3>
            <Utensils size={20} />
            Dietary Requirements
          </h3>

          <div className="option-grid">
            {dietaryOptions.map((option) => (
              <button
                key={option}
                className={`option-chip ${
                  preferences.dietaryRestrictions.includes(option) ? 'selected' : ''
                }`}
                onClick={() => handleDietaryToggle(option)}
              >
                {option}
                {preferences.dietaryRestrictions.includes(option) && (
                  <Check size={16} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="preference-section">
          <h3>
            <Languages size={20} />
            Language Preference
          </h3>

          <select
            value={preferences.languagePreference}
            onChange={(e) =>
              setPreferences({ ...preferences, languagePreference: e.target.value })
            }
            className="language-select"
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Special Assistance */}
        <div className="preference-section">
          <h3>
            <AlertCircle size={20} />
            Special Assistance
          </h3>

          <textarea
            placeholder="Any specific needs or concerns? (e.g., first-time flyer, anxiety, mobility assistance)"
            value={preferences.specialAssistance}
            onChange={(e) =>
              setPreferences({ ...preferences, specialAssistance: e.target.value })
            }
            className="assistance-input"
            rows={4}
          />
        </div>
      </div>

      <div className="preference-actions">
        {onClose && (
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={handleSavePreferences}
          disabled={isSaving || saved}
        >
          {saved ? (
            <>
              <Check size={20} />
              Saved!
            </>
          ) : isSaving ? (
            'Saving...'
          ) : (
            'Save Preferences'
          )}
        </button>
      </div>

      {saved && (
        <div className="save-confirmation">
          <Check size={20} />
          <span>Your preferences have been saved and shared with the crew</span>
        </div>
      )}
    </div>
  );
};

export default PreferencePanel;
