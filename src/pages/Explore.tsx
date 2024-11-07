import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface Profile {
  id: string;
  name: string;
  type: 'hospital' | 'organization';
  location: string;
  rating: number;
  contact: string;
  email: string;
  pricing: {
    hourly: number;
    daily: number;
    monthly: number;
  };
  description: string;
  services: string[];
}

export default function Explore() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("Nurse");
  const [duration, setDuration] = useState("Hourly");
  const [city, setCity] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const cities = ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'].sort();

  // Example data - replace with actual data from backend
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'City Hospital',
      type: 'hospital',
      location: 'Mumbai, Maharashtra',
      rating: 4.5,
      contact: '+91 9876543210',
      email: 'contact@cityhospital.com',
      pricing: {
        hourly: 500,
        daily: 5000,
        monthly: 100000
      },
      description: 'Leading healthcare provider with specialized elderly care units.',
      services: ['24/7 Nursing', 'Physiotherapy', 'Emergency Care']
    },
    {
      id: '2',
      name: 'Care Plus Organization',
      type: 'organization',
      location: 'Delhi, NCR',
      rating: 4.2,
      contact: '+91 9876543211',
      email: 'info@careplus.org',
      pricing: {
        hourly: 300,
        daily: 3000,
        monthly: 80000
      },
      description: 'Professional caregiving services for elderly.',
      services: ['Home Care', 'Assisted Living', 'Medical Assistance']
    }
  ];

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Backend integration will go here
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-400 flex">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${
                index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </span>
        <span className="ml-2 text-gray-600">{rating}/5</span>
      </div>
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBookNow = (profileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking/${profileName}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Find Care Services</h1>
      
      {/* Search Form */}
      <div className="card">
        <form className="grid md:grid-cols-4 gap-4" onSubmit={handleSearch}>
          <div>
            <label className="block text-gray-700 mb-2">Service Type</label>
            <select 
              className="input-field" 
              value={serviceType} 
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="Nurse">Nurse</option>
              <option value="Caretaker">Caretaker</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <select 
              className="input-field" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <select 
              className="input-field" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">Search</button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {profiles
          .filter((profile) => 
            serviceType === 'Nurse' 
              ? profile.type === 'hospital' 
              : profile.type === 'organization'
          )
          .map((profile) => (
            <div 
              key={profile.id} 
              className="card cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => toggleExpand(profile.id)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-gray-600">{profile.location}</p>
                  {renderRating(profile.rating)}
                </div>
                <button className="text-gray-500">
                  {expandedId === profile.id ? (
                    <ChevronUpIcon className="h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                  )}
                </button>
              </div>

              {expandedId === profile.id && (
                <div className="mt-6 pt-4 border-t space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                      <p className="text-gray-600">{profile.contact}</p>
                      <p className="text-gray-600">{profile.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Pricing Details</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>Hourly Rate: ₹{profile.pricing.hourly}</li>
                        <li>Daily Rate: ₹{profile.pricing.daily}</li>
                        <li>Monthly Rate: ₹{profile.pricing.monthly}</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600">{profile.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      className="btn-primary"
                      onClick={(e) => handleBookNow(profile.name, e)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
