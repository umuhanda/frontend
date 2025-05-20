import { ReactNode } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { ModalProvider } from '../providers/ModalProviders';
import { UserProvider } from '../context/userContext';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RootLayoutProps = {
  children?: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <UserProvider>
      <ModalProvider>
        <LanguageProvider>
          <div className="font-outfit">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
            {children || <Outlet />}
          </div>
        </LanguageProvider>
      </ModalProvider>
    </UserProvider>
  );
};

export default RootLayout;
