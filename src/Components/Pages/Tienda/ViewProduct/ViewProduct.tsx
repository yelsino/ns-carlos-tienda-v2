import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import SwitchWeight from './SwitchWeight'
import algoliasearch from 'algoliasearch'
import { useEffect, useState } from 'react'
import SimilarProducts from './SimilarProducts'

const ViewProduct = ({ product, setModal, setItem }) => {
  const { name, img, description, keywords } = product

  const appId = '5RCKHIZLLD'
  const apiKey = 'a6a8ef3b732553e5967193427cb04be2'
  const searchClient = algoliasearch(appId, apiKey)

  const [similarProducts, setSimilarProducts] = useState([])

  // get similar products with algolia

  const index = searchClient.initIndex('products-negocios-carlos')

  const getSimilarProducts = async () => {
    const tags = keywords.reduce(
      (acc, curr) =>
        acc ? `${acc} OR (keywords:"${curr}")` : `(keywords:"${curr}")`,
      ''
    )

    console.log(tags)

    const { hits } = await index.search('', {
      filters: `${tags}`
    })

    setSimilarProducts(hits)
  }

  useEffect(() => {
    getSimilarProducts()
  }, [product])

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative z-50   h-screen
    w-full overflow-y-scroll bg-white p-10 sm:h-auto sm:max-h-[600px] sm:w-auto sm:overflow-y-hidden  sm:rounded-2xl `}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          setItem(null)
          setModal(false)
        }}
        className="absolute top-0 right-0 -translate-y-[1px] translate-x-[1px] bg-red-500  px-5 py-3 font-poppins font-semibold text-white focus:outline-none sm:rounded-tr-2xl"
      >
        Cerrar
      </button>
      {/* contenido */}
      <motion.div className="mx-auto  flex max-w-xs flex-col gap-10 pt-5 sm:max-w-none sm:flex-row">
        <motion.div className="flex max-w-xs flex-col items-center gap-7 sm:h-[600px] sm:overflow-y-scroll sm:px-5 sm:pb-20 ">
          <p className="font-poppins text-xl font-semibold ">{name}</p>
          <div className="mb-3 flex h-[130px] w-[140px] items-center justify-center rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-emerald-300 bg-opacity-50 ">
            <img src={img} className=" mb-3 scale-125" />
          </div>

          <SwitchWeight product={product} />

          <div className="flex  w-full flex-col gap-y-3">
            {description &&
              description.split('.').map((item, index) => (
                <p key={index} className="font-poppins text-gray-600 ">
                  {item}.
                </p>
              ))}
          </div>
        </motion.div>
        <SimilarProducts similarProducts={similarProducts} />
      </motion.div>
    </motion.div>
  )
}

export default ViewProduct

