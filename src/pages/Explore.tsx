export default function Explore() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Find Care Services</h1>
      
      <div className="card">
        <form className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Service Type</label>
            <select className="input-field">
              <option>Nurse</option>
              <option>Caretaker</option>
              <option>Physiotherapist</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <select className="input-field">
              <option>Hourly</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
} 