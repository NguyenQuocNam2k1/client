//Layout


//Pages
import Home from "-c/pages/Home";
import FormUser from "-cp/FormUser/FormUser";


//Public router
const publicRouters = [
    { path: '/login', component: <FormUser />}
];

//Private router
const privateRouter = [
    { path: '/', component: Home},
];



//export router
export { publicRouters, privateRouter };