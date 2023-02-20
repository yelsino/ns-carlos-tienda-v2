import algoliasearch from 'algoliasearch';
import { IProducto } from 'types-yola';


const appId = '5RCKHIZLLD'
const apiKey = 'a6a8ef3b732553e5967193427cb04be2'
const searchClient = algoliasearch(appId, apiKey)

// const client = algoliasearch('5RCKHIZLLD', '146bdd8e1b9ac42ac0360a488be0081e');
const index = searchClient.initIndex('products-negocios-carlos');


  export const exportarProductosForAlgolia = (objects:IProducto[]) => {
	const convertir = objects.map((producto) => ({...producto, objectID: producto._id}));

	 index.saveObjects(convertir, (err, content) => {
		if (err) throw err;
		console.log('Objects imported into Algolia', content);
	  });
  }


