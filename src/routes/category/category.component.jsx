import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ProductCard from '../../components/product-card/product-card.component';


import { CategoryContainer, Title } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

const GET_CATEGORY = gql`
  query($title: String) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

const SET_CATEGORY = gql`
  mutaion ($category: Category!) {
    addCategory(category: $category) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

const Category = () => {
  const { category } = useParams();
  const {data, error, loading} = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  })

  // const [addCategory, {loading, error, data}] = useMutation(SET_CATEGORY)

  // addCategory({variables: { category: categoryObject}})

  console.log(data)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(data) {
      const {getCollectionsByTitle: {items}} = data
      setProducts(items)
    }
  }, [category, data])

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      { loading ? <Spinner/> : 
        <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      }
    </Fragment>
  );
};

export default Category;
