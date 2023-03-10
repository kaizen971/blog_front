

import {
  Input,
  Typography,
  Button,
  Textarea
} from "@material-tailwind/react";
import { useFlashMessage } from "../components/useFlashMessage";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createArticle } from "../methods/ArticleMethod";

export default function  CreateArticle () {
  const flashMessage = useFlashMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [photo, setPhoto] = useState("");
  const {token,isLogin} = useSelector((state) => state.todos);
  const [image, setImage] = useState('');

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

  const handleCreateArticle = async (token,title,description,categorie,photo) => {

    try{
    const res = await createArticle(token,title,description,categorie,file);
    console.log(res)
    if(res.status === 200){
        flashMessage.show("Article créé","green");
    }else{
        flashMessage.show("Article non créé","red");
    }
}catch(err){
    flashMessage.show(err.response?.data?.message,"red");
}
}
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(file);
  setFile(event.target.files[0]);
};
const [file, setFile] = useState("");

  return(
      <div>
        <div className="flex items-center justify-center mt-5 mb-5">
        <Typography className={"items-center"} variant="h1">Ecris ton article</Typography>
        </div>
        <div className="flex items-center flex-col gap-10 justify-center">
        <div className="w-72">
        <Input label="Titre" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="w-96 items-center">
        <Textarea label="Commentaire de l'article" onChange={(e) => setDescription(e.target.value)} />
  <input type="file" onChange={handleFileUpload} accept="image/*"  />
  {image && <img src={image} alt="preview" />}
        </div>
        <div className="w-72">
        <Input label="categories" onChange={(e) => setCategorie(e.target.value)} />
        </div>
        <div className="w-96 items-center">
        <Button variant="gradient" fullWidth color="blue" onClick={() => handleCreateArticle(token,title,description,categorie,photo)}>
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
    )
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