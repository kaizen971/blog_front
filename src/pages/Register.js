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
  import { register } from "../methods/AuthMethod";


  export default function RegisterPage() {
    const flashMessage = useFlashMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


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

    const handleRegister = async (email,password,passwordConfirm,firstName,lastName) => {
        try{
        const res = await register(email,password,passwordConfirm,firstName,lastName);
        console.log(res)
        if(res.status === 200){
            flashMessage.show(res.data.message,"green");
        }else{
            flashMessage.show(res.data.message,"red");
        }
    }catch(err){
        flashMessage.show(err.response?.data?.message,"red");
    }
    }


    return (
      <Card className="mt-20">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Inscription
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" type={"email"} onChange={(text) => setEmail(text.target.value)}/>
          <Input label="lastName" size="lg"  onChange={(text) => setLastName(text.target.value)} />
          <Input label="firstName" size="lg" onChange={(text) => setFirstName(text.target.value)} />
          <Input label="Password" size="lg" type={"password"} onChange={(text) => setPassword(text.target.value)} />
          <Input label="PasswordConfirm" size="lg" type={"password"} onChange={(text) => setPasswordConfirm(text.target.value)} />

        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={() => handleRegister(email,password,passwordConfirm,firstName,lastName)}>
            Inscription
          </Button>
        </CardFooter>
        {flashMessage.isVisible && (
                                <div style={flashMessage.isVisible ? {
                                    ...styles.flashMessage,
                                    backgroundColor: flashMessage.color
                                } : styles.hide}>
                                    <p>{flashMessage.message}</p>
                                </div>
            )}
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
