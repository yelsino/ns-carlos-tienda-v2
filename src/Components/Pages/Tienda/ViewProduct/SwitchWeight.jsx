import { useContext, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';
import './cssViewProduct.css';
import { ListContext } from '../../../../Context/List/ListContext';

const SwitchWeight = ({ product }) => {
  const [alterproduct, setAlterProduct] = useState(product);
  const [weight, setWeight] = useState(0);
  const { liststate: {lists}} = useContext(ListContext)

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
  useEffect(() => {
    transformWeight();
    setWeight(product.pricePerWeight[0].weight);
  }, []);

  return (
    <>
      <RadioGroup
        value={weight}
        onChange={setWeight}
        className='flex justify-between w-full'
      >
        {alterproduct.pricePerWeight.map(
          ({ weight, price, _id, weighttextlg, weighttextmd }) => (
            <RadioGroup.Option
              key={_id}
              value={weight}
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

                // <span
                //   className={`px-3 py-3 border border-black text-center cursor-pointer transition ease-in duration-400 font-bold   ${
                //     checked ? 'bg-black text-white width-active' : 'width-inactive bg-white text-black'
                //   }`}
                // >
                //   {weighttext}
                // </span>
              )}
            </RadioGroup.Option>
          )
        )}
      </RadioGroup>

      <div className='w-full flex flex-col gap-y-2'>
        <p className='flex justify-between w-full'>
          <span>Precio</span>
          <span>{alterproduct.pricePerWeight.find(p=>p.weight === weight)?.price} /kg</span>
        </p>

        <p className='flex justify-between w-full'>
          <span>En lista</span>
          <span className='text-color_green_7'>
            5.90 /{lists[0].products.find(p => p.product._id === product._id)?.quantity}
            kg
          </span>
        </p>
      </div>
    </>
  );
};

export default SwitchWeight;

SwitchWeight.propTypes = {
  product: PropTypes.object,
};
