
import {
    Input,
    Typography,
    Button,
    Textarea
  } from "@material-tailwind/react";
import { useEffect,useState } from "react";
import Card from "../components/Card";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { getArticles,getSearchArticlesFavoris,getFavories } from "../methods/ArticleMethod";
import { useFlashMessage } from "../components/useFlashMessage";
import { useNavigate } from 'react-router-dom';

export default function ListArticlesFavoris() {
  const {token,isLogin,articlesFavoris} = useSelector((state) => state.todos);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
   const flashMessage = useFlashMessage();
  const dispatch = useDispatch();
    useEffect(() => {
      getArticleFavoris(token)
      }, []);
    
    const getArticleFavoris = async (token) => {
        try{
        const res = await getFavories(token);
        if(res.status === 200){
        dispatch({type:"GET_ARTICLES_FAVORIS",payload:res.data})
        flashMessage.show("Article chargé","green");
        }
        else{
          flashMessage.show("Article non chargé","red");
        }
        }catch(err){
          flashMessage.show(err.response?.data?.message,"red");
        }
      }
    const handleSearch = async (token,search) => {
        try{
        const res = await getSearchArticlesFavoris(search,token);
        if(res.status === 200){
          console.log(res.data)
        dispatch({type:"GET_ARTICLES_FAVORIS",payload:res.data})
        flashMessage.show("Article chargé","green");
        }
        else{
          flashMessage.show("Article non chargé","red");
        }
        }catch(err){
          flashMessage.show(err.response?.data?.message,"red");
        }
    }

      useEffect(() => {
        let timeoutId;
        if (flashMessage.isVisible) {
            timeoutId = setTimeout(() => {
                flashMessage.hide();
            }, 5000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [flashMessage.isVisible, flashMessage.hide]);
    return (
      <div>
        <div className="flex items-center justify-center mt-5 mb-5">
    
        <Typography className={"items-center"} variant="h1">Liste d'article</Typography>
        </div>
        
        <div className="w-84 flex items-center flex-row gap-10 mb-8 mt-8 ml-7 lg:flex-row">
        <Input label="Search" onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={()=> handleSearch(token,search)}>Rechercher</Button>;
        </div>
       {articlesFavoris !=null && articlesFavoris.length > 0 && <div className="grid grid-cols-4 grid-rows-3 gap-10  lg:flex-row mr-8 ml-8 gap-10 mt-20 grid-container">
          {articlesFavoris.map((article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>}
        {flashMessage.isVisible && (
                                <div style={flashMessage.isVisible ? {
                                    ...styles.flashMessage,
                                    backgroundColor: flashMessage.color
                                } : styles.hide}>
                                    <p>{flashMessage.message}</p>
                                </div>
            )}
      </div>
    );
  }
  
  const styles = {
    flashMessage: {
        position: "fixed",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightgreen",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        textAlign: "center"
    },
    hide: {
        display: "none"
    }
};