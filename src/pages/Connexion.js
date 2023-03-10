import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useFlashMessage } from "../components/useFlashMessage";
import { useEffect,useState } from "react";
import { login } from "../methods/AuthMethod";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function ConnexionPage() {
    const flashMessage = useFlashMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handlelogin = async (email,password) => {
        try{
        const res = await login(email,password);
        console.log(res)
        if(res.status === 200){
            flashMessage.show("Connexion réusie","green");
            dispatch({type: "CONNEXION", payload: res.data});
            navigate('/');
        }else{
            flashMessage.show("Connexion échoué","red");
        }
    }catch(err){
        flashMessage.show(err.response?.data?.message,"red");
    }
    }

    return (
      <Card className=" mt-20 ">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Connexion
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" onChange={(text)=> setEmail(text.target.value)} />
          <Input label="Password" size="lg" type="password" onChange={(text)=> setPassword(text.target.value)}/>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={() => handlelogin(email,password)}>
            Connexion
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Vous n'avez pas de compte ?
            <Typography
              as="a"
              href="/register"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
             Enregistrez-vous
            </Typography>
          </Typography>
          {flashMessage.isVisible && (
                                <div style={flashMessage.isVisible ? {
                                    ...styles.flashMessage,
                                    backgroundColor: flashMessage.color
                                } : styles.hide}>
                                    <p>{flashMessage.message}</p>
                                </div>
            )}
        </CardFooter>
      </Card>
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
