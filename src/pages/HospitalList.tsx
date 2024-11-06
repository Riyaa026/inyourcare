export default function HospitalList() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Healthcare Providers</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="card">
            <h3 className="text-xl font-semibold mb-2">City Hospital {item}</h3>
            <p className="text-gray-600 mb-4">
              Specialized in elderly care with 24/7 nursing services
            </p>
            <div className="flex justify-between items-center">
              <span className="text-primary font-semibold">From $25/hour</span>
              <button className="btn-primary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 