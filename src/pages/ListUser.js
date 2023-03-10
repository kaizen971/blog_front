
import {
    Input,
    Typography,
    Button,
    Textarea
  } from "@material-tailwind/react";
import { useEffect,useState } from "react";
import CardUser from "../components/CardUser";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { getUsers,deleteUser } from "../methods/AuthMethod";
import { useFlashMessage } from "../components/useFlashMessage";
import { useNavigate } from 'react-router-dom';

export default function ListUser() {
  const {token,isLogin,users} = useSelector((state) => state.todos);
  const navigate = useNavigate();
   const flashMessage = useFlashMessage();
  const dispatch = useDispatch();
    useEffect(() => {
      getUsersList(token)
      }, []);
    
    const getUsersList = async (token) => {
        try{
        const res = await getUsers(token);
        if(res.status === 200){
        dispatch({type:"GET_USERS",payload:res.data})
        flashMessage.show("Users chargé","green");
        }
        else{
          flashMessage.show("Users non chargé","red");
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

    const handleDelete =  async (id) => {
      const result = window.confirm("Voulez-vous confirmer ?");
      if(result === false) return;
      try{
        const res = await deleteUser(id,token);
        if(res.status === 200){
          window.location.reload();
          flashMessage.show("Article supprimé","green");
        }
        else{
          flashMessage.show("Article non supprimé","red");
        }
        }catch(err){
          flashMessage.show(err.response?.data?.message,"red");
        }
      }
    
    return (
      <div>
        <div className="flex items-center justify-center mt-5 mb-5">
    
        <Typography className={"items-center"} variant="h1">Liste d'utilisateur</Typography>
        </div>

       {users !=null && users.length > 0 && <div className="grid grid-cols-4 grid-rows-3 gap-10  lg:flex-row mr-8 ml-8 gap-10 mt-20 grid-container">
          {users.map((user) => (
            <CardUser user={user} deleteUser={(id) => handleDelete(id)} />
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