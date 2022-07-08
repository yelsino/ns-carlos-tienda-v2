import { useContext, useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import { IconArrow, IconLink, IconSearch } from '../../Atoms/Icons'
import { ProductContext } from '../../../Context/Product/ProductProvider'

interface PropsAutocompleteItem {
  name: string
  img: string
  pricePerWeight: []
}

const AutocompleteItem = ({
  name,
  img,
  pricePerWeight
}: PropsAutocompleteItem) => {
  const {
    productstate: {
      products: { products }
    },
    dispatchProduct
  } = useContext(ProductContext)

  return (
    <Link
      to={`/tienda`}
      // to={`/tienda/${name.split(' ')[0]}`}
      onClick={() => {
        dispatchProduct({
          type: 'SELECT_PRODUCT',
          payload: products.find((p) => p.name === name)
        })
      }}
      className="flex w-full items-center justify-between py-3"
    >
      <div className="flex items-center gap-x-3">
        <img src={img} alt={name} className="h-12 w-12 object-contain" />
        <h3 className="font-semibold text-gray-600">{name}</h3>
      </div>
      <p className=" flex items-center gap-x-3 text-gray-600">
        <span>S/. {pricePerWeight[0].price}</span>
        <span className="text-xs text-color_green_7">
          <IconLink />
        </span>
      </p>
    </Link>
  )
}

export default function SearchMovil(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const appId = '5RCKHIZLLD'
  const apiKey = 'a6a8ef3b732553e5967193427cb04be2'
  const searchClient = algoliasearch(appId, apiKey)

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
                      query
                    }
                  ]
                })
              }
            }
          ]
        },
        ...props
      }),
    [props]
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-white sm:hidden">
      <form ref={formRef} className="mx-auto max-w-sm pt-10" {...formProps}>
        <div className="relative flex w-full flex-col">
          <div className="flex w-full  items-center">
            <span className="absolute flex items-center justify-center rounded-l-2xl   px-4 py-2 text-color_green_7">
              <IconSearch />
            </span>
            <input
              ref={inputRef}
              className="w-full rounded-full bg-color_green_2  py-2 pl-12 pr-3 text-color_green_7 outline-none placeholder:text-center placeholder:text-color_green_7"
              {...inputProps}
            />
          </div>
          {autocompleteState.isOpen && (
            <div className="" ref={panelRef} {...autocomplete.getPanelProps()}>
              {autocompleteState.collections.map((val, index) => {
                const { items } = val
                // console.log({ items });
                return (
                  <section key={`section-${index}`} className="">
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items.map((item) => (
                          <AutocompleteItem key={item._id} {...item} />
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>
          )}
        </div>
        <Link
          to="/tienda"
          className="fixed bottom-10 right-10 text-color_green_7"
        >
          <IconArrow />
        </Link>
      </form>
    </div>
  )
}
