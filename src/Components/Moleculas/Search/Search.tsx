import { useContext, useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { Link, useLocation } from 'react-router-dom'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import { IconSearch } from '../../Atoms/Icons'
import { ProductContext } from '../../../Context/Product/ProductContext'
import { string } from 'prop-types'

interface PropsAutoCompleteItem {
  name: string
  img: string
  pricePerWeight: []
}

const AutocompleteItem = ({
  name,
  img,
  pricePerWeight
}: PropsAutoCompleteItem) => {
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
      className="w-full"
    >
      <div className="flex gap-4 p-4 hover:bg-color_green_2">
        <img src={img} alt={name} className="h-12 w-12 object-contain" />
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-gray-600">{name}</h3>
          <p className="text-xs text-gray-600">S/. {pricePerWeight[0].price}</p>
        </div>
      </div>
    </Link>
  )
}

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const location = useLocation()
  const { pathname } = location
  const currentPath = pathname.split('/')
  const hidden = ['mis-compras', 'mis-listas']
  const filterRutes = hidden.filter((tag) => currentPath.includes(tag) && tag)

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
    <>
      {filterRutes.length !== 1 && (
        <form
          ref={formRef}
          className="flex w-[260px] justify-center   font-poppins"
          {...formProps}
        >
          <div className="relative flex">
            <div className="flex items-center">
              <span className="absolute flex items-center justify-center rounded-l-2xl   px-4 py-2 text-color_green_7">
                <IconSearch />
              </span>
              <input
                ref={inputRef}
                className="w-[260px] rounded-full bg-color_green_2  py-2 pl-12 pr-3 text-color_green_7 outline-none placeholder:text-center placeholder:text-color_green_7"
                {...inputProps}
              />
            </div>
            {autocompleteState.isOpen && (
              <div
                className="absolute top-0 left-0 z-10 mt-16 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
                ref={panelRef}
                {...autocomplete.getPanelProps()}
              >
                {autocompleteState.collections.map((val, index) => {
                  const { items } = val
                  // console.log({ items });
                  return (
                    <section key={`section-${index}`} className="w-[260px]">
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
        </form>
      )}
    </>
  )
}
