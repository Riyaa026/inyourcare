export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Patient Profile</h1>
      
      <div className="card space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input type="text" className="input-field" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input type="number" className="input-field" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Contact Number</label>
            <input type="tel" className="input-field" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" className="input-field" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Medical History</label>
          <textarea className="input-field h-32" />
        </div>

        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
} 