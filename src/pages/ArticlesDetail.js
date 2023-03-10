import {
    Input,
    Typography,
    Button,
    Textarea,
    IconButton
  } from "@material-tailwind/react";
import { useEffect ,useState} from "react";
import { getArticleById,postComment ,addLike,addFavoris,isFavoris,getDeleteArticle} from "../methods/ArticleMethod";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { useFlashMessage } from "../components/useFlashMessage";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from "moment/moment";
import { durationDate } from "../utils/durationDate";

export default function ArticleDetail(props) {
    const {token,isLogin,article,user} = useSelector((state) => state.todos);
    const [comment, setComment] = useState("");
    const [favoris, setFavoris] = useState(false);
    const navigate = useNavigate();
    const flashMessage = useFlashMessage();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const dispatch = useDispatch();

    useEffect(() => {
        handleArticleDetail(id,token);
        isFavorisArticle(id,token);
        }, []);

    const handleArticleDetail = async (id,token) => {
        try{
        const res = await getArticleById(id,token);
        if(res.status === 200){
        dispatch({type:"GET_ARTICLE",payload:res.data})
        }
        else{
            flashMessage.show("Article non chargé","red");
        }
        }catch(err){
            flashMessage.show(err.response?.data?.message,"red");
        }
    }
    const isFavorisArticle = async (id,token) => {
        try{
            const res = await isFavoris(id,token);
            if(res.status === 200){
            setFavoris(res.data.favoris)
            }
            else{
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
    const handleComment = async (id,comment,token) => {
        try{
       const res = await postComment(id,token,comment)
        if(res.status === 200){
            window.location.reload();
            }
            else{
                flashMessage.show("Comment envoyé","red");
            }
            }catch(err){
                flashMessage.show(err.response?.data?.message,"red");
            }
    }
    const addlike = async (id,token) => {
                try{
                const res = await addLike(id,token)
                if(res.status === 200){
                window.location.reload();
                }
                else{
                    flashMessage.show("Like envoyé","red");
                }
                }catch(err){
                    flashMessage.show(err.response?.data?.message,"red");
                }
    }

    const handleFavoris = async (id,token) => {
        try{
            const res = await addFavoris(id,token)
            if(res.status === 200){
                window.location.reload();
                }
                else{
                    flashMessage.show("Article non chargé","red");
                }
                }catch(err){
                    flashMessage.show(err.response?.data?.message,"red");
                }
    }

    const handleDeleteArticle = async (id,token) => {
        const result = window.confirm("Voulez-vous confirmer ?");
        if(result === false) return;
        try{
            const res = await getDeleteArticle(id,token)
            if(res.status === 200){
                navigate('/')
                }
                else{
                    flashMessage.show("Article non chargé","red");
                }
                }catch(err){
                    flashMessage.show(err.response?.data?.message,"red");
                }
    }
    console.log(user)
    return (
      <div>
        <div className="flex items-center justify-around mt-5 mb-5">
        <IconButton size="lg" onClick={()=>handleFavoris(id,token)}>
        {favoris  ? <i className="fas fa-star fa-lg text-yellow-500 text-transparent" /> : <i className="fas fa-star fa-lg " /> }
        </IconButton>
        
        {( user && (user._id == article.author) || user &&user.isAdmin)&&<IconButton size="lg" onClick={()=> handleDeleteArticle(id,token)} >
        <i className="fas fa-trash fa-lg" /> 
        </IconButton>}
        {( user && (user._id == article.author) || user &&user.isAdmin)&&<IconButton size="lg" onClick={() => navigate(`/editArticle?id=${id}`)}>
        <i className="fas fa-pencil fa-lg" /> 
        </IconButton>}
        </div>
      {article !=null && <div>
        <div className="flex items-center justify-center mt-5 mb-5">
        <Typography className={"items-center"} variant="h1">{`Titre de l'article : ${article.title}`}</Typography>

        </div>
        
        <div className="flex items-center justify-center mt-5 mb-5">

        <img
            src={process.env.REACT_APP_API_URL + `/image/${article.photo?.filename}`}
            alt="img-blur-shadow"
            className="h-96 w-96 object-cover rounded-lg shadow-lg justify-center items-center flex"
          />
          </div>
        <div className="flex items-center justify-center mt-5 mb-5">

        <Typography className={"items-center"} variant="h3">{`${article.description}`}</Typography>
        </div>
        <div className="flex items-center justify-center">
        <Typography variant="h2" color="gray" className="flex gap-4">
          <IconButton size="lg" onClick={()=>addlike(id,token)}>
          <i className="fas fa-heart fa-lg" />
          </IconButton>
           {article.like}
        </Typography>
        
        </div>
        <div className="flex flex-col items-center justify-center mt-5 mb-5">

        <Typography variant="h2" color="gray" className="flex gap-4"> Commentaire : </Typography>
        {article.comment && article.comment.length > 0 && <div>
        {
            article.comment.map((comment) => {
                return <div className="flex flex-col  justify-left w-full" >
                <Typography variant="h6" className={"mr-5"} > {durationDate(comment.date)} </Typography>

                <div className="flex flex-row  justify-around w-full" >
                <Typography variant="p" className={"mr-5"}> {` Commentaire : ${comment.comment}  `} </Typography>
                <Typography variant="p"  className={"mr-5"}> { ` Auteur : ${comment.author}   `} </Typography>

                </div>
                </div>
            })

        }
        </div>}
        
        {article.comment && article.comment.length === 0 && <div>
        <Typography variant="h2" color="gray" className="flex gap-4"> Aucun commentaire </Typography>
        </div>

        }

        <Textarea color="lightBlue" size="regular" outline={true} placeholder="Commentaire" className="w-full" onChange={(e) => setComment(e.target.value)} />
        <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            onClick={() => {
                handleComment(id,comment,token)
            }}
            >Envoyer ce commentaire
            </Button>
        </div>
        {flashMessage.isVisible && (
                                <div style={flashMessage.isVisible ? {
                                    ...styles.flashMessage,
                                    backgroundColor: flashMessage.color
                                } : styles.hide}>
                                    <p>{flashMessage.message}</p>
                                </div>
            )}
        </div>}
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