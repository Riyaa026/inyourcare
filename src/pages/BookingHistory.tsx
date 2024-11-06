export default function BookingHistory() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Booking History</h1>
      
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Nursing Care</h3>
                <p className="text-gray-600">City Hospital {item}</p>
                <p className="text-gray-600">Duration: 1 Week</p>
              </div>
              <span className="text-primary font-semibold">$500</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <span className="text-gray-600">Started: March {item}, 2024</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 