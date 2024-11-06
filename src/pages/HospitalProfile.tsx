import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

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

export default function HospitalProfile() {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'organizations'>('hospitals');

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
      description: 'Leading healthcare provider with specialized elderly care units',
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
      description: 'Professional caregiving services for elderly',
      services: ['Home Care', 'Assisted Living', 'Medical Assistance']
    }
  ];

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

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'hospitals'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('hospitals')}
        >
          Hospitals
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'organizations'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setActiveTab('organizations')}
        >
          Organizations
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {profiles
          .filter((profile) => 
            activeTab === 'hospitals' 
              ? profile.type === 'hospital' 
              : profile.type === 'organization'
          )
          .map((profile) => (
            <div key={profile.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-gray-600">{profile.location}</p>
                </div>
                {renderRating(profile.rating)}
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Contact:</span> {profile.contact}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {profile.email}
                </p>
                <div className="text-gray-600">
                  <span className="font-semibold">Pricing:</span>
                  <ul className="ml-4">
                    <li>Hourly: ₹{profile.pricing.hourly}</li>
                    <li>Daily: ₹{profile.pricing.daily}</li>
                    <li>Monthly: ₹{profile.pricing.monthly}</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{profile.description}</p>

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

              <div className="mt-4 pt-4 border-t flex justify-end">
                <button className="btn-primary">Book Now</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
} 