import { useParams } from 'react-router-dom';

export default function Booking() {
  useParams();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Booking Details</h1>
      
      <div className="card space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Service Type</label>
            <select className="input-field">
              <option>24/7 Nursing Care</option>
              <option>Daily Care</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <select className="input-field">
              <option>1 Week</option>
              <option>2 Weeks</option>
              <option>1 Month</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input type="date" className="input-field" />
          </div>
        </div>

        <button className="btn-primary w-full">Confirm Booking</button>
      </div>
    </div>
  );
} 