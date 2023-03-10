import {
    Input,
    Typography,
    Button,
    Textarea,
    IconButton,
    Checkbox,
    Switch
  } from "@material-tailwind/react";
import { useEffect ,useState} from "react";
import { getArticleById,postComment ,addLike,addFavoris,isFavoris,getEditArticle,} from "../methods/ArticleMethod";
import { getProfilUser,editProfilUser,getProfilUserById,editUpdateProfilUser} from "../methods/AuthMethod";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { useFlashMessage } from "../components/useFlashMessage";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function UpdateProfilUser(props) {
    const {token,isLogin,article} = useSelector((state) => state.todos);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const flashMessage = useFlashMessage();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDetail(token);
        }, []);

    const getUserDetail = async (token) => {
        try{
        const res = await getProfilUserById(id,token);
        if(res.status === 200){
        setFirstName(res.data.firstname);
        setLastName(res.data.lastname);
        setEmail(res.data.email);
        console.log(res.data)
        setIsAdmin(res.data.isAdmin);
        }
        else{
            flashMessage.show("Profile non chargé","red");
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

  
    
      const handleProfilUser = async (token,id,firstName,lastName,email,password,passwordConfirm,isAdmin) => {
        try{
            const res = await   editUpdateProfilUser(token,id,firstName,lastName,email,password,passwordConfirm,isAdmin);
            if(res.status === 200){
                console.log(res.data)
                flashMessage.show("Votre profil a été modifié","green");
            }
            else{
                flashMessage.show("Votre profil n'a pas été modifié","red");
            }
        }catch(err){
            flashMessage.show(err.response?.data?.message,"red");
        }
    }

    
    return (
        <div>
        <div className="flex items-center justify-center mt-5 mb-5">
        <Typography className={"items-center"} variant="h1">Modifie ton profile</Typography>
        </div>
        <div className="flex items-center flex-col gap-10 justify-center">
        <div className="w-72">
        <Input label="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="w-72">
        <Input label="lastName" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="w-72">
        <Input label="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="w-72">
        <Input label="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="w-72">
        <Input label="passwordConfirm" defaultValue={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </div>
        <div className="w-72 gap-3 flex flex-row">
        <Typography className={"items-center"} variant="p">Admin :</Typography>
        <input type={"checkbox"} color="lightBlue" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
        </div>
        <div className="w-96 items-center">
        <Button variant="gradient" fullWidth color="blue" onClick={() => handleProfilUser(token,id,firstName,lastName,email,password,passwordConfirm,isAdmin)}>
              Enregistrez votre profil
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