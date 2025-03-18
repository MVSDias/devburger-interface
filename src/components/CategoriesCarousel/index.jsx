// busco as categoria na api

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CategoryButton, Container, ContainerItems, Title } from './styles';
import { useNavigate, useLocation } from 'react-router-dom';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // chamada a api

    async function loadCategories() {
      try {
        const { data } = await api.get('/categories'); // vou até o backend em categories e pego o data dentro da response que chega aqui.

        setCategories(data);
        // console.log(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }
    loadCategories();
  }, []);
  // console.log(categories);

  const location = useLocation();
  // useEffect(() => {
  //   console.log('Location atual:', location);
  // }, [location]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1280, min: 690 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {categories.map((category) => (
          <ContainerItems key={category.id} imageUrl={category.url}>
            <CategoryButton
              onClick={() => {
                const newUrl = `/cardapio?categorias=${category.id}`;
                navigate(newUrl, { replace: true });
              }}
            >
              {category.name}
            </CategoryButton>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
