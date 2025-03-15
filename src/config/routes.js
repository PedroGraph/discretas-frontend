export const routes = [
  {
    path: '/',
    component: 'MainPage',
  },
  {
    path: '/register',
    component: 'Login',
  },
  {
    path: '/login',
    component: 'Login',
  },
  {
    path: '/recovery-password',
    component: 'Login',
  },
  {
    path: '/recovery-password/success/:token',
    component: 'Login',
  },
  {
    path: '/set-password',
    component: 'Login',
  },
  {
    path: '/tienda',
    component: 'ProductSection',
  },
  {
    path: '/lenceria',
    component: 'ProductSection',
  },
  {
    path: '/lubricante',
    component: 'ProductSection',
  },
  {
    path: '/:category/:name',
    component: 'ProductDetails',
  },
  {
    path: '/ordenes',
    component: 'Orders',
  },
  {
    path: '/ordenes/:id',
    component: 'OrderDetails',
  },
  {
    path: '/cancelados',
    component: 'Orders',
  },
  {
    path: '/entregados',
    component: 'Orders',
  },
  {
    path: '/carrito',
    component: 'ShoppingCart',
  },
  {
    path: '/carrito/completedpayment/:id',
    component: 'CompletedPayment',
  },
  {
    path: '/process_payment',
    component: 'ShoppingCart',
  },
  {
    path: '/profile',
    component: 'Profile',
  },
  {
    path: '/profile/addresses',
    component: 'Profile',
  },
  {
    path: '/profile/wishlist',
    component: 'Profile',
  },
  {
    path: '/profile/notifications',
    component: 'Profile',
  },
  {
    path: '/profile/settings',
    component: 'Profile',
  },
  {
    path: '*',
    component: 'NotFound',
  },
];
