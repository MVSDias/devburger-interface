import { useEffect, useState } from 'react';
import {
  Banner,
  CategoryButton,
  CategoryMenu,
  Container,
  ProductsContainer,
} from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components/CardProduct';
import { useLocation, useNavigate } from 'react-router-dom';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation(); // pego apenas o search de dentro do useLocation
  const queryParams = new URLSearchParams(search); // manipula parametros que vem pelo query params. nesse caso o parametro é o search.

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categorias'); // O queryParams é a variável que criei para armazenar o resultado do new URLSearchParams. O sinal de mais (+) serve para converter a string em numbe, nesse caso. Uso o  método get do URLSearchParams para buscar categorias e armazenar em categoryId

    // faço uma verificação pra saber qual será o valor retornará como default quando a pagina carregar.
    

    if (categoryId) {// se tiver algum valor aqui...
      return categoryId; //...  o categoryId será o valor inicial de activeCategory
    } 
        return 0; // se não 0 será default

        
  });

  

  // chamada a api
  useEffect(() => {
    async function loadCategories() {
      // busca as categorias no backend
      //
      const { data } = await api.get('/categories'); // vou até o backend em categories e pego o data dentro da response que chega aqui.

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]; //crio uma nova categoria chamada todas, com id = 0 e adiciono ao data(por isso 'esparramei o data)

      setCategories(newCategories);
    }

    async function loadProducts() {
      // busca os produtos no backend
      //
      const { data } = await api.get('/products'); // vou até o backend em categories e pego o data dentro da response que chega aqui.

      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      })); //  mapeio os produtos e adiciono um novo campo (currencyValue), formatando os preços, dentro dos produtos.

      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  //verificar qual categoria está ativa e fazer o filtro pra colocar na tela
  useEffect(() => {
    if (activeCategory === 0) {
      setfilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.category_id === activeCategory,
      );

      setfilteredProducts(newFilteredProducts);
    }
  }, [products, activeCategory]); // quando um dos dois mudar, chama o useEffect

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTA ÁQUI!
          <span>Este cardápio está irressistível!</span>
        </h1>
      </Banner>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?categorias=${category.id}`,
                  // passando minfo pelo queryparams
                },
                {
                  replace: true, // substitui a url existente
                },
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} /> // reaproveito o componente CardProduct e passo a info q ele está esperando(product)
        ))}
      </ProductsContainer>
    </Container>
  );
}
