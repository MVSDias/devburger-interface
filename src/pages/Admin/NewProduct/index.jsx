import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Image } from '@phosphor-icons/react';
import {
  Container,
  ContainerCheckBox,
  ErrorMessage,
  Form,
  InputGroup,
  Label,
  Input,
  LabelUpload,
  Select,
  SubmitButton,
} from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup
      .number()
      .positive()
      .required('Digite o preço do produto')
      .typeError('Digite o preço do produto'), // typeError é a mensagem automatica que aparece no form quando está vazio o campo enviado
    category: yup.object().required('Escolha uma categoria'), // será um objeto pq no select usa objeto
    offer: yup.bool(),
    file: yup
      .mixed()
      .test('required', 'Escolha um arquivo para continuar', (value) => {
        return value && value.length > 0;
      })
      .test('fileSize', 'Carregue arquivos até 3mb', (value) => {
        return value && value.length > 0 && value[0].size <= 30000000;
      })
      .test('type', 'apenas .png ou .jpeg', (value) => {
        return (
          value &&
          value.length > 0 &&
          (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
        );
      }),
    // o campo test adiciona validação, onde o primeiro valor é que ele é obrigatório, depois a mensagem se não for preenchido, e por ultimo uma validação pra saber se o arquivo se enquandra nas condições. uma função vai validar o que chega em value. Se o tamanho for maior  q zero(0) é qp tem alguma coisa dentro de value, se não estoura o erro. Valido também o tamanho da imagem e por ultimo, valido o formato da imagem
  })
  .required();

export function NewProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // busca na api as categorias
    async function loadCategories() {
      const { data } = await api.get('/categories'); // vou na api e pego categories
      setCategories(data); //atualizo categories com as categories q chegam da api

      // console.log(data);
    }

    loadCategories(); // chamo a function async
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // aqui em data chega todos os dados do formulário
    const productFormData = new FormData(); // o formData vai organizar todos os dados enviado no formulário, de acordo com o q espera o backend. Ao estanciar o formData eu transformei productFormData em formData e agora escrevo as regras q os dados devem seguir.

    productFormData.append('name', data.name);
    productFormData.append('price', data.price);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]); // só o arquivo na posição zero
    productFormData.append('offer', data.offer);

    await toast.promise(api.post('/products', productFormData), {
      pending: 'Adicionando o produto...',
      success: 'Produto criado com sucesso',
      error: 'Falha ao adicionar o produto, tente novamente',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 1500);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          {/* // coloca o erro embaixo do input */}
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="text" {...register('price')} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <Image />
            <input
              type="file"
              {...register('file')}
              accept="image/png, image/jpg"
              onChange={(value) => {
                setFileName(value?.target?.files[0]?.name);
                register('file').onChange(value);
                //dentro do onChange, no HookForm, precios avisa que fiz upload de um arquivo,
                // passando o nome do campo no register e o onChange com o value.
              }}
            />
            {fileName || 'Upload do Produto'}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category" //de acordo com schema validation
            control={control} // importo no useForm
            render={(
              { field }, // o que vai está dentro do controlador, nesse caso o Select
            ) => (
              <Select
                {...field}
                options={categories} //o array de categorias q chega
                getOptionLabel={(category) => category.name} // tipo um map. é o nome que aparece no select p escolher
                getOptionValue={(category) => category.id} // o nome que vai no formulário submetido
                placeholder="Categorias"
                menuPortalTarget={document.body} // para 'crescer o select e poder ultrapassar o espaço disponível
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
                  <ContainerCheckBox>
                    <input
                      type="checkbox"
                      {...register('offer')}
                    />
                    <Label>Produto em Oferta?</Label>
                  </ContainerCheckBox>
                </InputGroup>

        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
