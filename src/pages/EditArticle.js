import {
    Input,
    Typography,
    Button,
    Textarea,
    IconButton
  } from "@material-tailwind/react";
import { useEffect ,useState} from "react";
import { getArticleById,postComment ,addLike,addFavoris,isFavoris,getEditArticle} from "../methods/ArticleMethod";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { useFlashMessage } from "../components/useFlashMessage";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function EditArticle(props) {
    const {token,isLogin,article} = useSelector((state) => state.todos);
    const [comment, setComment] = useState("");
    const [favoris, setFavoris] = useState(false);
    const navigate = useNavigate();
    const flashMessage = useFlashMessage();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [photo, setPhoto] = useState("");
    const [file, setFile] = useState(null);
    useEffect(() => {
        handleArticleDetail(id,token);
        }, []);

    const handleArticleDetail = async (id,token) => {
        try{
        const res = await getArticleById(id,token);
        if(res.status === 200){
        dispatch({type:"GET_ARTICLE",payload:res.data});
        console.log(res.data)
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategorie(res.data.category);
        setPhoto(res.data.photo);
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
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [flashMessage.isVisible, flashMessage.hide]);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
      };
    
      const handleEditArticle = async (token,id,title,description,categorie,file) => {
        try{
        const res = await getEditArticle(token,id,title,description,categorie,file);
        if(res.status === 200){
        dispatch({type:"GET_ARTICLE",payload:res.data})
        flashMessage.show("Article modifié","green");
        navigate("/");
        }
        else{
            flashMessage.show("Article non modifié","red");
        }
        }catch(err){
            flashMessage.show(err.response?.data?.message,"red");
        }
    }


    
    return (
        <div>
        <div className="flex items-center justify-center mt-5 mb-5">
        <Typography className={"items-center"} variant="h1">Ecris ton article</Typography>
        </div>
        <div className="flex items-center flex-col gap-10 justify-center">
        <div className="w-72">
        <Input label="Titre" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="w-96 items-center">
        <Textarea label="Commentaire de l'article" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
  <input type="file" onChange={handleFileUpload} />
        </div>
        <div className="w-72">
        <Input label="categories" defaultValue={categorie} onChange={(e) => setCategorie(e.target.value)} />
        </div>
        <div className="w-96 items-center">
        <Button variant="gradient" fullWidth color="blue" onClick={() => handleEditArticle(token,id,title,description,categorie,file)}>
              Enregistrez l'article
        </Button>
        </div>
        </div>
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