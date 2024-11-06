import { useState } from 'react';

interface PatientProfile {
  id: string;
  fullName: string;
  age: number;
  contactNumber: string;
  preferredLanguage: string;
  medicalCondition: string;
}

export default function Profile() {
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<PatientProfile | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  
  // Example profiles (replace with actual data from backend)
  const [profiles, setProfiles] = useState<PatientProfile[]>([
    {
      id: '1',
      fullName: 'John Doe',
      age: 65,
      contactNumber: '+91 9876543210',
      preferredLanguage: 'Hindi',
      medicalCondition: 'Diabetes, High Blood Pressure'
    }
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      id: selectedProfile?.id || Date.now().toString(),
      fullName: formData.get('fullName') as string,
      age: parseInt(formData.get('age') as string),
      contactNumber: formData.get('contactNumber') as string,
      preferredLanguage: formData.get('preferredLanguage') as string,
      medicalCondition: formData.get('medicalCondition') as string
    };

    if (selectedProfile) {
      // Update existing profile
      setProfiles(profiles.map(profile => 
        profile.id === selectedProfile.id ? profileData : profile
      ));
    } else {
      // Create new profile
      setProfiles([...profiles, profileData]);
    }
    
    setShowNewProfileForm(false);
    setSelectedProfile(null);
    setIsViewMode(false);
  };

  const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 
    'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Malayalam'
  ].sort();

  const handleView = (profile: PatientProfile) => {
    setSelectedProfile(profile);
    setIsViewMode(true);
    setShowNewProfileForm(true);
  };

  const handleEdit = (profile: PatientProfile) => {
    setSelectedProfile(profile);
    setIsViewMode(false);
    setShowNewProfileForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Profiles</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setSelectedProfile(null);
            setIsViewMode(false);
            setShowNewProfileForm(true);
          }}
        >
          Create New Profile
        </button>
      </div>

      {/* Profile List */}
      {!showNewProfileForm && (
        <div className="grid md:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="card">
              <h3 className="text-xl font-semibold mb-2">{profile.fullName}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">Age: {profile.age}</p>
                <p className="text-gray-600">Emergency Contact: {profile.contactNumber}</p>
                <p className="text-gray-600">Preferred Language: {profile.preferredLanguage}</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => handleView(profile)}
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEdit(profile)}
                  className="btn-primary"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Form */}
      {showNewProfileForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {selectedProfile 
                ? (isViewMode ? 'View Profile' : 'Edit Profile') 
                : 'Create New Profile'}
            </h2>
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => {
                setShowNewProfileForm(false);
                setSelectedProfile(null);
                setIsViewMode(false);
              }}
            >
              ← Back to Profiles
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  className="input-field"
                  defaultValue={selectedProfile?.fullName}
                  required 
                  readOnly={isViewMode}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  className="input-field"
                  defaultValue={selectedProfile?.age}
                  required 
                  readOnly={isViewMode}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Emergency Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber" 
                  className="input-field"
                  defaultValue={selectedProfile?.contactNumber}
                  required 
                  readOnly={isViewMode}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Preferred Language</label>
                <select 
                  name="preferredLanguage" 
                  className="input-field"
                  defaultValue={selectedProfile?.preferredLanguage}
                  required
                  disabled={isViewMode}
                >
                  <option value="">Select a language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Medical Conditions</label>
              <textarea 
                name="medicalCondition" 
                className="input-field h-32"
                defaultValue={selectedProfile?.medicalCondition}
                placeholder="Please list any medical conditions, allergies, or special care requirements"
                required 
                readOnly={isViewMode}
              />
            </div>

            {!isViewMode && (
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  className="btn-primary bg-gray-500 hover:bg-gray-600"
                  onClick={() => {
                    setShowNewProfileForm(false);
                    setSelectedProfile(null);
                    setIsViewMode(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {selectedProfile ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
} 