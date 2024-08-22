import { createBrowserRouter } from 'react-router-dom';
import SignIn from './views/content-auth/SignIn';
import Home from './views/content-home/view';
import ViewSafe from './views/content-safe/view-safe';
import ViewAuthorize from './views/content-authorize/view-authorize';
import Quixote from './views/content-report/PDF/example';
import ViewTakeDoc from './views/content-takeDoc/view-take';
import ViewFloors from './views/content-safe/content-locker/content-floors/view-floor';
import ViewLockerContract from './views/content-safe/content-locker/content-contract/view-lockercontract';
import ViewDoclist from './views/content-takedocList/view-doclist';
import PageNotfound from './views/content-errorpage/404-page';
import ExcelLayout from './views/content-report/EXCEL/excel-exam';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />,
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/view-safe',
        element: <ViewSafe />
    },
    {
        path: '/view-floors/:id',
        element: <ViewFloors />
    },
    {
        path: '/view-authorize',
        element: <ViewAuthorize />
    },
    {
        path: '/view-pdf',
        element: <Quixote />
    },
    {
        path: '/view-takedoc',
        element: <ViewTakeDoc />,
    },
    {
        path: '/view-takedoc/:contNos/:typeLoan',
        element: <ViewTakeDoc />,
    },
    {
        path: '/view-contract/:lockerId/:floorsId',
        element: <ViewLockerContract />
    },
    {
        path: '/view-takedoc-list',
        element: <ViewDoclist />
    },
    {
        path: '/report-excel',
        element: <ExcelLayout />
    },
    {
        path: '*',
        element: <PageNotfound />,
    },
]);

export default router;