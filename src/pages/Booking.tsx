import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  sex: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  type: 'hospital' | 'organization';
  location: string;
  pricing: {
    hourly: number;
    daily: number;
    monthly: number;
  };
}

export default function Booking() {
  const { id: organizationId } = useParams();  // Extract organizationId from the URL
  const navigate = useNavigate();'+91 9876543211'
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  // const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [duration, setDuration] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [bookingId, setBookingId] = useState<string>('');

  useEffect(() => {
    // Fetch provider details when component mounts
    // const fetchProvider = async () => {
    //   if (id) {
    //     try {
    //       const response = await fetch(`${import.meta.env.VITE_API_URL}/providers/${id}`);
    //       if (response.ok) {
    //         const data = await response.json();
    //         setProvider(data);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching provider:', error);
    //     }
    //   }
    // };

    // Fetch profiles
    const fetchProfiles = async () => {
      try {
        const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/patients/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    // fetchProvider();
    fetchProfiles();
    setBookingId(`BK${Date.now().toString().slice(-6)}`);
  }, []);

  // Calculate total amount when dates or duration changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      let amount = 0;
      if (duration === 'daily') {
        amount = days * 1000;
      } else if (duration === 'weekly') {
        amount = Math.ceil(days / 7) * (1000 * 10); // Weekly discount
      } else {
        amount = Math.ceil(days / 30) * (1000 * 25); // Monthly discount
      }
      
      setTotalAmount(amount);
    }
  }, [startDate, endDate, duration]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProfile || !startDate || !endDate) {
      alert('Please fill in all required fields');
      return;
    }

    console.log("payload: ", selectedProfile, duration)
    
    const bookingData = {
      organizationId: organizationId,
      patientId: selectedProfile,
      startDate,
      endDate,
      duration,
      totalAmount,
      status: 'pending'
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        navigate('/bookings');
      } else {
        alert('Error creating booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating booking');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Booking Details</h1>
      
      {/* Provider Information Card */}
      <div className="card bg-gray-50">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            {/* <div>
              {(
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-primary">{provider.name}</h2>
                  <div className="text-gray-600">
                    <p className="capitalize">{provider.type}</p>
                    <p>{provider.location}</p>
                  </div>
                </div>
              )}
            </div> */}
            <div className="text-right">
              <p className="text-sm text-gray-600">Booking ID:</p>
              <p className="font-medium">{bookingId}</p>
            </div>
          </div>
          
          {/* {provider && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Pricing Information</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Daily Rate</p>
                  <p className="font-medium">₹{provider.pricing.daily}</p>
                </div>
                <div>
                  <p className="text-gray-600">Weekly Rate</p>
                  <p className="font-medium">₹{provider.pricing.daily * 6}/week</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Rate</p>
                  <p className="font-medium">₹{provider.pricing.daily * 25}/month</p>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Booking Form */}
      <div className="card space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Profile Selection */}
          <div>
            <label className="block text-gray-700 mb-2">Select Patient Profile</label>
            <select 
              className="input-field"
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              required
            >
              <option value="">Choose a profile</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile?.name} - {profile?.sex}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Date</label>
              <input 
                type="date" 
                className="input-field"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">End Date</label>
              <input 
                type="date" 
                className="input-field"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Duration Type</label>
            <select 
              className="input-field"
              value={duration}
              onChange={(e) => setDuration(e.target.value as 'daily' | 'weekly' | 'monthly')}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              className="btn-primary bg-gray-500 hover:bg-gray-600"
              onClick={() => navigate('/explore')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!selectedProfile || !startDate || !endDate}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 