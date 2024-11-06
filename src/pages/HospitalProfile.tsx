import { useState } from 'react';
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

export default function HospitalProfile() {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'organizations'>('hospitals');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      description: 'Leading healthcare provider with specialized elderly care units. We offer comprehensive medical care with experienced staff and modern facilities.',
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
      description: 'Professional caregiving services for elderly with a focus on personalized care and comfort. Our team ensures the highest quality of home-based healthcare.',
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

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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

      <div className="space-y-4">
        {profiles
          .filter((profile) => 
            activeTab === 'hospitals' 
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
                    <button className="btn-primary">
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