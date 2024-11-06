import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Professional Healthcare at Your Doorstep
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with qualified nurses and caretakers for your loved ones
        </p>
        <Link to="/explore" className="btn-primary">
          Find Care Now
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Qualified Professionals</h3>
          <p className="text-gray-600">
            All our healthcare providers are certified and experienced
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Flexible Booking</h3>
          <p className="text-gray-600">
            Choose from hourly, daily, or monthly care options
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
          <p className="text-gray-600">
            Round-the-clock assistance for all your healthcare needs
          </p>
        </div>
      </section>
    </div>
  );
} 