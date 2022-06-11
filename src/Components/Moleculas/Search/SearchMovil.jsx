import { useContext, useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { IconArrow, IconLink, IconSearch } from '../../Atoms/Icons';
import { ProductContext } from '../../../Context/Product/ProductContext';

const AutocompleteItem = ({ name, img, pricePerWeight }) => {
  const {
    productstate: {
      products: { products },
    },
    dispatchProduct,
  } = useContext(ProductContext);

  return (
    <Link
      to={`/tienda`}
      // to={`/tienda/${name.split(' ')[0]}`}
      onClick={() => {
        dispatchProduct({
          type: 'SELECT_PRODUCT',
          payload: products.find(p => p.name === name),
        });
      }}
      className='w-full flex justify-between items-center py-3'
    >
        <div className='flex items-center gap-x-3'>
          <img src={img} alt={name} className='w-12 h-12 object-contain' />
          <h3 className='font-semibold text-gray-600'>{name}</h3>
        </div>
        <p className=' text-gray-600 flex items-center gap-x-3'>
          <span>S/. {pricePerWeight[0].price}</span>
          <span className='text-xs text-color_green_7'><IconLink/></span>
          </p>
    </Link>
  );
};

AutocompleteItem.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  pricePerWeight: PropTypes.array,
};

export default function SearchMovil(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const appId = '5RCKHIZLLD';
  const apiKey = 'a6a8ef3b732553e5967193427cb04be2';
  const searchClient = algoliasearch(appId, apiKey);

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: '¿Qué estás buscando?',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources({ query }) {
          return [
            {
              sourceId: 'products',
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'products-negocios-carlos',
                      query,
                    },
                  ],
                });
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,

  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-white sm:hidden'>
      <form ref={formRef} className='max-w-sm mx-auto pt-10' {...formProps}>
        <div className='flex relative w-full flex-col'>
          <div className='flex items-center  w-full'>
            <span className='flex justify-center items-center text-color_green_7 absolute   px-4 py-2 rounded-tl-2xl rounded-bl-2xl'>
              <IconSearch />
            </span>
            <input
              ref={inputRef}
              className='pl-12 pr-3 py-2  rounded-full w-full outline-none bg-color_green_2 text-color_green_7 placeholder:text-color_green_7 placeholder:text-center'
              {...inputProps}
            />
          </div>
          {autocompleteState.isOpen && (
            <div className='' ref={panelRef} {...autocomplete.getPanelProps()}>
              {autocompleteState.collections.map((val, index) => {
                const { items } = val;
                // console.log({ items });
                return (
                  <section key={`section-${index}`} className=''>
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items.map(item => (
                          <AutocompleteItem key={item._id} {...item} />
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
        <Link
          to='/tienda'
          className='text-color_green_7 fixed bottom-10 right-10'
        >
          <IconArrow />
        </Link>
      </form>
    </div>
  );
}
