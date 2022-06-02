import PropTypes from 'prop-types';

const Input = ({ onChange, value, title,type, name,readOnly }) => {
  return (
    <div className='w-full'>
      <p className='text-gray-500 '>{title}</p>
      <input
        readOnly={readOnly}
      name={name}
        type={type}
        value={value}
        onChange={onChange}
        className='bg-color_green_2 w-full py-4 outline-none px-5 text-color_green_7 font-poppins '
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
};
