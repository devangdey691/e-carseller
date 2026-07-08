import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const labels = {
    cars: 'Cars',
    car: 'Car Details',
    cart: 'Cart',
    profile: 'Profile',
    'checkout-success': 'Checkout Success',
    admin: 'Admin',
    'add-car': 'Add Car',
    'car-list': 'Car List',
    'edit-car': 'Edit Car',
    users: 'Users',
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-red-500">Home</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = labels[value] || value.replace(/-/g, ' ');

          return (
            <div key={to} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-900 font-medium capitalize">{label}</span>
              ) : (
                <Link to={to} className="hover:text-red-500 capitalize">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
