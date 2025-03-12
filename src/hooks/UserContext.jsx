import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({}); // definindo um obj vazio como valor inicial padrão

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  // deixa disponível as info de usuário e guarda no userInfo e nolocalStorage
  const putUserData = (userInfo) => {
    setUserInfo(userInfo);
   
    localStorage.setItem('devburger:userData', JSON.stringify(userInfo)); // transformo o objeto userInfo em string e armazeno no localstorage com chave (devburger:userData) e valor (userInfo)
  };

  const logout = () => {
    setUserInfo({}) // limpo as informações de userInfo
    localStorage.removeItem('devburger:userData') // vou ao localstorage e apago a key: devburguer:userData
  }

  //para não ir ao localStorage toda vez q a tela recarregar e pegar info do user, preciso manter o userInfo atualizado no contexto.Para isso uso um useEffect.
  useEffect(() => {
   const userInfoLocalStorage = localStorage.getItem('devburger:userData')

   //faço uma verificação p saber se tem alguma coisa no localStorage p não quebrar a app
   if(userInfoLocalStorage){// sr tiver alguma coisa...
    setUserInfo(JSON.parse(userInfoLocalStorage)) //...atualizo o userInfo com essa informação que ficará disponível no contexto do usuario.
   }
  }, [])
  


  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {/* // tudo que for exportado precisa estar dentro do value */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  //verificando se existe contexto para não quebrar a app
  if (!context) {
    throw new Error('useUser must be provider');
  }

  return context;
};
