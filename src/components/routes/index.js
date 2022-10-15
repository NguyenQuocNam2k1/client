//Layout


//Pages
import Home from "-c/pages/Home";
import FormUser from "-cp/FormUser/FormUser";


//Public router
const publicRouters = [
    { path: '/home', component: <Home />},
    { path: '/login', component: <FormUser />},
];

//Private router
const privateRouter = [];



//export router
export { publicRouters, privateRouter };