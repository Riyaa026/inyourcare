import { useParams } from 'react-router-dom';

export default function HospitalProfile() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">City Hospital {id}</h1>
        <p className="text-gray-600">
          Leading healthcare provider with over 20 years of experience in elderly care
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">24/7 Nursing Care</h3>
              <p className="text-gray-600 mb-4">Professional nursing care at your home</p>
              <button className="btn-primary">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 