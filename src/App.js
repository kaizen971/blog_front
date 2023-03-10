import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import Card from "./components/Card";
import Search from "./components/Search";
import ConnexionPage from "./pages/Connexion";
import {
  Input,
  Typography,
  Button,
  Textarea
} from "@material-tailwind/react";
import RegisterPage from "./pages/Register";
import CreateArticlePage from "./pages/CreateArticle";
import ListArticles from "./pages/ListArticles";
import { useLocation } from 'react-router-dom';
import ArticleDetail from "./pages/ArticlesDetail";
import EditArticle from "./pages/EditArticle";
import EditProfilUser from "./pages/EditProfil";
import { useSelector,useDispatch } from "react-redux/es/exports";
import ListArticlesFavoris from "./pages/ListArticlesfavoris";
import ListUser from "./pages/ListUser";
import UpdateProfilUser from "./pages/updateUser";
export default function App() {

  const {token,isLogin,articles,user} = useSelector((state) => state.todos);
  return (
    <div>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="connexion" element={<Connexion />} />
          <Route path="register" element={<Register />} />
          {isLogin &&
          <Route>
          <Route index element={<ListArticles />} />
          <Route path="createArticle" element={<CreateArticlePage />} />
          <Route path="articleDetail" element={<ArticleDetail />} />
          <Route path="editArticle" element={<EditArticle />} />
          <Route path="editProfil" element={<EditProfilUser />} />
          <Route path="favoris" element={<ListArticlesFavoris />} />
          <Route path="listUsers" element={<ListUser />} />
          </Route>
          }
          {user && user.isAdmin && isLogin &&       <Route path="updateUser" element={<UpdateProfilUser />} /> }
          {!isLogin &&
                    <Route index element={<Connexion />} />

          }
          <Route path="*" element={<NotFound />} />


        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

function NotFound(props) {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  console.log(id)
  return (
    <div>
      <div className="flex items-center justify-center mt-5 mb-5">
      <Typography className={"items-center"} variant="h1">Pas de page</Typography>
      </div>
 
      </div>
  );
}

function Connexion() {
  return (
    <div>
      <div className="flex items-center justify-center mt-5 mb-5">
      </div>
      <ConnexionPage/>
    </div>
  );
}

function Register() {
  return (
    <div>
      <div className="flex items-center justify-center mt-5 mb-5">
      </div>
      <RegisterPage/>
    </div>
  );
}
