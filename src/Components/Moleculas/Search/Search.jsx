import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

const AutocompleteItem = ({ id, title, img, price }) => {
  return (
    <li>
      <Link to={`/detail/${id}`}>
        <a className='hover:bg-blue-300 flex gap-4 p-4'>
          <img src={img} alt={title} className='w-12 h-12 object-contain' />
          <div>
            <h3 className='text-sm font-semibold'>{title}</h3>
            <p className='text-xs text-gray-600'>{price}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

AutocompleteItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default function Search(props) {
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
        placeholder: 'Busca tu oferta',
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
           }
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
    <form ref={formRef} className='flex justify-center mb-20' {...formProps}>
      <div className='flex relative p-1  bg-gradient-to-tr from-purple-600 to-blue-300 rounded-full '>
        <input
          ref={inputRef}
          className='flex-1 p-2 pl-4 rounded-full w-full'
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className='absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10'
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              console.log({ items });
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map(item => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
