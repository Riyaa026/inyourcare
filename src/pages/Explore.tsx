import { useState } from 'react';

export default function Explore() {
  const [serviceType, setServiceType] = useState("Nurse");
  const [duration, setDuration] = useState("Hourly");
  const [city, setCity] = useState("");
  const [organizations, setOrganizations] = useState([]);
  
  const cities = ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'].sort();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Build the API URL with query parameters for city and service type
      const orgType = serviceType.toLowerCase() == 'nurse' ? 'hospital' : 'organization';
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations?city=${city}&type=${orgType.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrganizations(data); // Update the organizations list
      } else {
        console.error("Failed to fetch organizations");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Find Care Services</h1>
      
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
              <option value="Physiotherapist">Physiotherapist</option>
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

      {/* Display the list of organizations */}
      {organizations.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Healthcare Providers</h2>
          <ul className="space-y-2">
            {organizations.map((org: any) => (
              <li key={org?.id} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold">{org?.name}</h3>
                <p>City: {org?.city}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
