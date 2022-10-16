//Layout


//Pages
import Home from "-c/pages/Home";
import AddTrips from "-c/pages/AddTrips/AddTrips";
import FormUser from "-cp/FormUser/FormUser";


//Public router
const publicRouters = [
    { path: '/login', component: <FormUser />}
];

//Private router
const privateRouter = [
    { path: '/', component: Home},
    { path: '/create', component: AddTrips},
];



//export router
export { publicRouters, privateRouter };