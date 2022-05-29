import { useContext, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';
import './cssViewProduct.css';
import { ListContext } from '../../../../Context/List/ListContext';
import { useOnClick } from '../../../../Hooks/useOnClick';
import { AuthContext } from '../../../../Context/auth/AuthContext';
import { SocketContext } from '../../../../Context/SocketContext';
import { motion } from 'framer-motion';
import { IconDelete } from '../../../Atoms/Icons';
import { formatToMoney } from '../../../../helpers/formatToMoney';

const SwitchWeight = ({ product }) => {
  const [disabled, setDisabled] = useOnClick(200);
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const {
    liststate: { list: listOfProducts },
  } = useContext(ListContext);
  const [alterproduct, setAlterProduct] = useState(product);
  const [weight, setWeight] = useState('');
  const {
    liststate: { lists },
  } = useContext(ListContext);

  const transformWeight = () => {
    const { pricePerWeight, typeOfsale } = alterproduct;
    switch (typeOfsale) {
      case 'KILOGRAMOS':
        return setAlterProduct({
          ...alterproduct,
          pricePerWeight: pricePerWeight.map(v => {
            if (v.weight === 250) {
              v.weighttextmd = '1/4';
              v.weighttextlg = `${v.weight} gramos`;
              return v;
            }
            if (v.weight === 500) {
              v.weighttextmd = '1/2';
              v.weighttextlg = `${v.weight} gramos`;
              return v;
            }
            if (v.weight === 1000) {
              v.weighttextmd = '1 kg';
              v.weighttextlg = `1 kilogramo`;
              return v;
            }
            if (v.weight !== 250 || v.weight !== 500 || v.weight !== 1000) {
              v.weighttextmd = `${v.weight} gr`;
              v.weighttextlg = `${v.weight} gramos`;
              return v;
            }
            return v;
          }),
        });

      case 'LITROS':
        return setAlterProduct({
          ...alterproduct,
          pricePerWeight: pricePerWeight.map(v => {
            if (v.weight === 500) {
              v.weighttextmd = '1/2';
              v.weighttextlg = '1/2 litro';
              return v;
            }
            if (v.weight === 1000) {
              v.weighttextmd = '1 lt';
              v.weighttextlg = '1 litro';
              return v;
            }

            if (v.weight !== 500 || v.weight !== 1000) {
              v.weighttextmd = `${v.weight} ml`;
              v.weighttextlg = `${v.weight} mililitros`;
              return v;
            }
            return v;
          }),
        });

      case 'FRACCIONES':
        return setAlterProduct({
          ...alterproduct,
          pricePerWeight: pricePerWeight.map(v => {
            if (v.weight === 250) {
              v.weighttextmd = '1/4';
              v.weighttextlg = 'un cuarto';
              return v;
            }
            if (v.weight === 500) {
              v.weighttextmd = '1/2';
              v.weighttextlg = 'la mitad';
              return v;
            }
            if (v.weight === 1000) {
              v.weighttextmd = '1';
              v.weighttextlg = 'entero';
              return v;
            }
            return v;
          }),
        });

      case 'UNIDADES':
        return setAlterProduct({
          ...alterproduct,
          pricePerWeight: pricePerWeight.map(v => {
            if (v.weight === 250) {
              v.weighttextmd = 'chico';
              v.weighttextlg = 'pequeño';
              return v;
            }
            if (v.weight === 500) {
              v.weighttextmd = 'medio';
              v.weighttextlg = 'mediano';
              return v;
            }
            if (v.weight === 1000) {
              v.weighttextmd = 'extra';
              v.weighttextlg = 'grande';
              return v;
            }
            return v;
          }),
        });
    }
  };

  const addProductToList = () => {
    setDisabled(true);
    console.log(weight);
    socket?.emit('update-list', {
      type: 'ADD_PRODUCT_TO_LIST',
      userID: auth.uid,
      listID: listOfProducts._id,
      productID: product._id,
      mountID: weight,
    });
  };

  const removeProductOfList = () => {
    setDisabled(true);
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      userID: auth.uid,
      listID: listOfProducts._id,
      productID: product._id,
      mountID: weight,
    });
  };

  const getPriceWeightSelected = () => {
    const { pricePerWeight } = alterproduct;
    const price = pricePerWeight.find(v => v._id === weight);
    return formatToMoney(price.price);
  };

  const getQuantityWeightSelected = () => {
    // const { pricePerWeight } = alterproduct;
    const productOfList = listOfProducts.products.find(
      p => p.product._id === product._id
    );

    if (productOfList) {
      const quantity = productOfList?.quantities.find(
        v => v._id === weight
      ).quantity;
      return quantity;
    } else {
      return 0;
    }
  };

  const getTotalQuantityAndPrice = () => {
    const { typeOfsale } = alterproduct;
    const productOfList = listOfProducts?.products.find(
      p => p.product._id === product._id
    );

    if (productOfList) {
      const weight = productOfList?.quantities.reduce((acc, cur) => {
        return acc + cur.weight * cur.quantity;
      }, 0);
      const price = productOfList?.quantities.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
      }, 0);

      const quantity = productOfList?.quantities.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);

      switch (typeOfsale) {
        case 'KILOGRAMOS':
          return ` ${weight / 1000} ${
            weight < 1000 ? 'gr' : 'kg'
          } = S/ ${formatToMoney(price)}`;

        case 'LITROS':
          return ` ${weight / 1000} ${
            weight < 1000 ? 'ml' : 'lt'
          } = S/ ${formatToMoney(price)}`;

        case 'FRACCIONES':
          return  ` ${weight / 1000} ${
            weight < 1000 ? 'ml' : 'lt'
          } = S/ ${formatToMoney(price)}`;

        case 'UNIDADES':
          return  ` ${quantity} ${
            quantity <= 1 ? 'und' : 'unds'
          } = S/ ${formatToMoney(price)}`;
      }

      return ` ${weight / 1000} ${
        weight < 1000 ? 'gr' : 'kg'
      } = S/ ${formatToMoney(price)}`;
    } else {
      return '0 = S/ 0.00';
    }
  };

  useEffect(() => {
    transformWeight();
    setWeight(product.pricePerWeight[0]._id);
  }, []);

  useEffect(() => {
    if (weight) {
      getPriceWeightSelected();
    }
  }, [weight]);

  return (
    <>
      {weight && (
        <>
          <RadioGroup
            value={weight}
            onChange={e => {
              console.log(e);
              setWeight(e);
            }}
            className='flex justify-between w-full'
          >
            {/* ! aqui hay un error, en el id no corresponde  */}
            {alterproduct.pricePerWeight.map(
              ({ _id, weighttextlg, weighttextmd }) => (
                <RadioGroup.Option
                  key={_id}
                  value={_id}
                  className='flex justify-between w-full gap-x-3'
                >
                  {({ checked }) => (
                    <button
                      className={`transition duration-300 ease-in-out px-6 py-4 tracking-tight rounded-sm overflow-hidden truncate border border-black ${
                        checked
                          ? 'bg-black text-white width-active1  '
                          : 'bg-white width-inactive1'
                      }`}
                    >
                      {checked ? weighttextlg : weighttextmd}
                    </button>
                  )}
                </RadioGroup.Option>
              )
            )}
          </RadioGroup>

          <div className='w-full flex flex-col gap-y-1'>
            <p className='flex justify-between w-full'>
              <span>Precio</span>
              <span>{getPriceWeightSelected()}</span>
            </p>

            <p className='flex justify-between w-full'>
              <span>En lista</span>

              <span className='text-color_green_7'>
                {getQuantityWeightSelected()} und
              </span>
            </p>
            <p className='flex justify-between w-full'>
              <span>Total</span>
              <span className='text-color_green_7'>
                {getTotalQuantityAndPrice()}
              </span>
            </p>
          </div>

          <div className='flex items-center justify-between w-full'>
            <motion.button
              animate={disabled ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={addProductToList}
              disabled={disabled}
              className={`bg-orange-600 text-white w-48 py-3 font-semibold font-poppins ${
                disabled ? 'cursor-wait' : 'cursor-pointer'
              }`}
            >
              Añadir
            </motion.button>

            <button
              onClick={removeProductOfList}
              className='text-2xl w-14 h-full flex items-center justify-center'
            >
              <IconDelete />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SwitchWeight;

SwitchWeight.propTypes = {
  product: PropTypes.object,
};
