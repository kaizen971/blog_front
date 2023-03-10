
import axios from "axios";

export function createArticle(token,title,description,categorie,photo) {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', categorie);
    formData.append('photo', photo);
    
    return axios.post(process.env.REACT_APP_API_URL + "/createArticle", formData, {
       
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token.token}`
        },
      },        
); 
}

export function getArticles(token){


    return axios.get(process.env.REACT_APP_API_URL + "/articles", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.token}`
        },
      },        
); 
}

export function getSearchArticles(search,token){

    return axios.get(process.env.REACT_APP_API_URL + "/search/"+ search , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    
    
    );
}


export function getSearchArticlesFavoris(search,token){

    return axios.get(process.env.REACT_APP_API_URL + "/favorisSearch/"+ search , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    
    
    );
}


export function getArticleById(id,token){
    return axios.get(process.env.REACT_APP_API_URL + "/article/"+ id , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    
    
    );
}

export function postComment(id,token,comment){
    const formData = new FormData();
    formData.append('id', id);
    formData.append('comment', comment);
    return axios.post(process.env.REACT_APP_API_URL + "/postComment" ,formData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },);
}

export function addLike(id,token){
    const formData = new FormData();
    formData.append('id', id);
    return axios.post(process.env.REACT_APP_API_URL + "/like" ,formData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    
    
    );
}

export function addFavoris(id,token){
    const formData = new FormData();
    formData.append('id', id);
    return axios.post(process.env.REACT_APP_API_URL + "/favoris" ,formData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    );
}

export function isFavoris(id,token){
    const formData = new FormData();
    formData.append('id', id);
    return axios.get(process.env.REACT_APP_API_URL + "/isfavoris/" + id , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    );
}

export function getDeleteArticle(id,token){
    return axios.delete(process.env.REACT_APP_API_URL + "/deleteArticle/" + id , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    );
}

export function getEditArticle(token,id,title,description,categorie,photo){
    const formData = new FormData();
    console.log(photo)
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', categorie);
    formData.append('photo', photo);
    return axios.post(process.env.REACT_APP_API_URL + "/editArticle/" + id , formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    );
}

export function getFavories(token){
    return axios.get(process.env.REACT_APP_API_URL + "/getfavoris" , {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.token}`
        },
    },
    );
}
