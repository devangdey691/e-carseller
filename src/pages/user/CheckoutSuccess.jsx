import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-green-600">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Your booking request has been received. We will contact you soon.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/cars" className="bg-red-500 text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </Link>
          <Link to="/profile" className="bg-black text-white px-6 py-3 rounded-lg">
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
