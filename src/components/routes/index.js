//Layout


//Pages
import Home from "-c/pages/Home";
import Theme from "-cp/Theme/Theme"
import AddTrips from "-c/pages/AddTrips/AddTrips";
import FormUser from "-cp/FormUser/FormUser";
import History from "-cp/History/History";
import Profile from "-cp/Profile/Profile";


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
    { path: '/profile', component: Profile},
];



//export router
export { publicRouters, privateRouter };