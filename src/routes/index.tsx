import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { Contact } from '../pages';
import {
  PasswordConfirmation,
  ResetPassword,
  Signin,
  Signup,
  VerificationCode,
} from '../pages/auth';
import { Home, Lessons, Settings, Exam, Lesson } from '../pages/dashboard/client';
import ExamQuestions from '../pages/dashboard/client/ExamQuestions';
import ExamAnswers from '../pages/dashboard/client/components/ExamAnswers';
import Igazeti from '../pages/dashboard/client/Igazeti';
import RevisionStudy from '../pages/dashboard/client/components/RevisionStudy';
import ExamTest from '../pages/dashboard/client/ExamTest';
import ProtectedRoute from '../components/ProtectedRoute';
import ProtectedExamRoute from '../components/ProtectedExamRoute';
import RootLayout from '../Layout/RootLayout.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/reset',
        element: <ResetPassword />,
      },
      {
        path: '/verificationcode',
        element: <VerificationCode />,
      },
      {
        path: '/passwordconfirmation',
        element: <PasswordConfirmation />,
      },
      // 🔒 Protected Routes
      {
        path: '/client',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'igazeti',
            element: <Igazeti />,
          },
          {
            path: 'lessons',
            element: <ProtectedExamRoute />,
            children: [
              {
                path: '',
                element: <Lessons />,
              },
              {
                path: 'lesson/:id',
                element: <Lesson />,
              },
              {
                path: 'revision/:id',
                element: <RevisionStudy />,
              },
            ],
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'exam',
            element: <ProtectedExamRoute />,
            children: [
              {
                path: '',
                element: <Exam />,
              },
              {
                path: 'questions',
                element: <ExamQuestions />,
              },
              {
                path: 'answers',
                element: <ExamAnswers />,
              },
              {
                path: 'test',
                children: [
                  {
                    path: '',
                    element: <ExamTest />,
                  },
                  {
                    path: 'questions',
                    element: <ExamQuestions />,
                  },
                  {
                    path: 'answers',
                    element: <ExamAnswers />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;

export default RouteProvider;
