//Layout


//Pages
import Home from "-c/pages/Home";


//Public router
const publicRouters = [
    { path: '/', component: <Home />},
];

//Private router
const privateRouter = [];



//export router
export { publicRouters, privateRouter };