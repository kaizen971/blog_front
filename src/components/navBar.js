import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { logout } from "../methods/AuthMethod";
import ListArticles from "../pages/ListArticles";
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const {token,isLogin,user} = useSelector((state) => state.todos);
  console.log(token)
 console.log(isLogin)
 const dispatch = useDispatch();
 const handleLogout = () => {
  try {
    const res = logout()
    dispatch({ type: "LOGOUT" });
 }
  catch (err) {
    console.log(err)
  }

 }
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLogin &&
        <div className="flex flex-row  gap-2">
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
            <Link to="/">Liste d'article</Link>

        </Typography>
           <Typography
           as="li"
           variant="small"
           color="gray"
           className="p-1 font-normal"
           >
           <Link to="/favoris">Liste Favoris</Link>
         </Typography>
         </div>
        }
        {!isLogin &&
        <div className="flex flex-row  gap-2">
        <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
        >
        <Link to="/connexion">Connexion</Link>

   
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
        >
        <Link to="/register">Inscription</Link>

   
      </Typography>
      </div>
      }
      {isLogin &&<Button>
      <Link to="/createArticle">Ecris ton article</Link>
      </Button>}
      {isLogin &&<Button>
      <Link to="/editProfil">Modifie ton profil</Link>
      </Button>}
      {isLogin &&<Button color={"red"} onClick={() => handleLogout()}>
        Deconnexion
      </Button>}
  
    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-gray-500">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
        {(isLogin && user.isAdmin) &&<Button color={"yellow"}>
        Admin
      </Button>}
  
      {(isLogin && !user.isAdmin) &&<Button color={"blue"}>
        User
      </Button>}
      { (isLogin && user.isAdmin)  &&<Button color={"yellow"}>
      <Link to="/listUsers">Modifie ton profil</Link>
      </Button>}
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}

        </div>
      </MobileNav>
    </Navbar>
  );
}