import { useContext, createContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  /*
    Regras de Negócios
      - produto chegou
      -ele já existe no carrinho?
      -se sim - aumenta aquantidade
      -se não - adiciona o produto no carrinho
    */

  const putProductInCart = (product) => {
    // coloca os produtos que vem do menu no carrinho

    //encontra o index do produto no carrinho
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id); // pega item por item do array e compara com product.id. se encontrar significa q já existe esse produto no carrinho e retorna o index dele. Se não encontrar retorna '-1'

    let newProductsInCart = []; //para poder manipular os itens do carrinho (cartProducts)
    if (cartIndex >= 0) {
      newProductsInCart = [...cartProducts]; // Crio um novo array, espalhando cartProducts dentro dele
      newProductsInCart[cartIndex] = {
        ...newProductsInCart[cartIndex], // pego o produto na posição [cartIndex] e espalho e...
        quantity: newProductsInCart[cartIndex].quantity + 1, //...crio a propriedade quantity e adiciono 1 a ela.
      };
      setCartProducts(newProductsInCart);
      updateLocalStorage(newProductsInCart);
    } else {
      // se cartIndex for menor q zero (0)...
      product.quantity = 1; //crio a prorpiedade quantity(pq retornou -1) e adiciono 1 a ela como valor
      newProductsInCart = [...cartProducts, product]; // pego o cartProducts, adiciono o novo produto com a nova propriedade quantity =1
      setCartProducts(newProductsInCart); // atualizo o cartProducts com newProductsInCart
      updateLocalStorage(newProductsInCart);
    }
  };

  const clearCart = () => {
    // esvaziar o carrinho
    setCartProducts([]); // atualizo o cartProducts(carrinho) com um array vazio
    updateLocalStorage([]); // faço o mesmo com o devburger:cartInfo no localStorage
  };
  const deleteProduct = (productId) => {
    // enviando apenas o productId

    const newCart = cartProducts.filter((prd) => prd.id !== productId); // faço um filtro em cartProducts(carrinho) e retorno apenas os produtos q tenham o id(productId) diferente do prd.id(produto selecionado p deletar)
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const increaseProduct = (productId) => {
    // enviando apenas o productId
    const newCart = cartProducts.map((prd) => {
      // mapeio o cartProducts...
      return prd.id === productId
        ? { ...prd, quantity: prd.quantity + 1 }
        : prd; // comparo o prd.id(id do producto q quero incrementar) como id do produto. Se forem iguais, 'espalho o prd(produto do cart) e altero a propriedade quantity do prd em mais 1 (+1). Se não for, repito o prd e mantenho inalterada a quantidade.
    });

    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const decreaseProduct = (productId) => {
    // enviando apenas o productId
    const cartIndex = cartProducts.findIndex((prd) => prd.id === productId); // acho index do produto no carrinho

    if (cartProducts[cartIndex].quantity > 1) {
      // se a quantidade do item for maior q 1...

      const newCart = cartProducts.map((prd) => {
        // mapeio o cartProducts...
        return prd.id === productId
          ? { ...prd, quantity: prd.quantity - 1 }
          : prd; // comparo o prd.id(id do producto q quero incrementar) como id do produto. Se forem iguais, 'espalho o prd(produto do cart) e altero a propriedade quantity do prd em -1(menos 1). Se não for, repito o prd e mantenho inalterada a quantidade.
      });

      setCartProducts(newCart);
      updateLocalStorage(newCart);
    } else {
      deleteProduct(productId);
    }
  };

  const updateLocalStorage = (products) => {
    // função q salva o carrinho no localStorage
    localStorage.setItem('devburger:cartInfo', JSON.stringify(products)); // adiciono os produtos no localStorage onde a chave será devburger:cartInfo e o valor (products). Products transformado em string.
  };

  // vai buscar no localStorage os itens do carrinho toda vez q minha aplicação reiniciar
  useEffect(() => {
    const clientCartData = localStorage.getItem('devburger:cartInfo'); // pego o conteudo de localstorage e armazeno na variavel clientCartData

    if (clientCartData) {
      // se tiver alguma coisa dentro de clientCartData...
      setCartProducts(JSON.parse(clientCartData)); // converto em objeto e atualizo o cartProducts(carrinho)
    }
  }, []); // quando está vazio o array, significa q basta reiniciar a pagina para executar o q tem aqui dentro

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProduct,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  // para evitar q a app quebre faço uma verificação p saber se o contexto existe

  if (!context) {
    // se não existir 'explodo' um erro q evita quebrar a app
    throw new Error('useCart must be used with a context');
  }

  return context;
};
