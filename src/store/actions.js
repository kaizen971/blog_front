// actions.js
export const CONNEXION = 'CONNEXION';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_ARTICLES_FAVORIS = 'GET_ARTICLES_FAVORIS';
export const GET_USERS = 'GET_USERS';

export const connexion = text => ({
  type: CONNEXION,
  text,
});

export const logout = text => ({
    type: LOGOUT,
    text,
    });

export const register = id => ({
  type: REGISTER,
  id,
});

export const getArticles = articles => ({
    type: GET_ARTICLES,
    articles,
  });

export const getArticle = article => ({
    type: GET_ARTICLE,  
    article,
  });

  export const getArticlesFavoris = articles => ({
    type: GET_ARTICLES_FAVORIS,
    articles,
  });

  export const getUsers = users => ({
    type: GET_USERS,
    users,
  });