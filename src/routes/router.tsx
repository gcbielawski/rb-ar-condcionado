// router.tsx
import { createHashRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../views/Home';
import Quotes from '../views/Quotes';
import History from '../views/History';
import EditQuote from '../views/EditQuote';

// Usar createHashRouter para o Electron
const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'quotes',
        element: <Quotes />
      },
      {
        path: 'quotes/:id/edit',
        element: <EditQuote />
      },
      {
        path: 'history',
        element: <History />
      }
    ]
  }
]);

export default router;
