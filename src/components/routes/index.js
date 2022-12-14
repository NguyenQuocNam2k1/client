//Layout


//Pages
import Home from "-c/pages/Home";
import Theme from "-cp/Theme/Theme"
import AddTrips from "-c/pages/AddTrips/AddTrips";
import FormUser from "-cp/FormUser/FormUser";
import History from "-cp/History/History";
import Profile from "-cp/Profile/Profile";
import TripDetail from "-cp/TripDetail";


//Public router
const publicRouters = [
    { path: '/login', component: <FormUser />},
    { path: '/theme', component: <Theme /> },
];

//Private router
const privateRouter = [
    { path: '/', component: Home},
    { path: '/create', component: AddTrips},
    { path: '/history', component: History},
    { path: '/profile/:slug', component: Profile},
    { path: '/trips/:slug', component: TripDetail},
];



//export router
export { publicRouters, privateRouter };