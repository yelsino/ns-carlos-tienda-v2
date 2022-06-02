import PropTypes from 'prop-types'


const Select = ({text, selected, onClick, checked, icon}) => {
    return ( 
        <div 
        onClick={onClick}
        className='flex items-center justify-between px-5 py-4 border cursor-pointer'>
            <div className='flex gap-x-3'>
            <span>{icon}</span>
        <span className='truncate first-letter:uppercase'>{text}</span>
            </div>
        <input className='accent-violet-500' readOnly={true} type='radio' checked={checked} />
      </div>
     );
}
 
export default Select;

Select.propTypes = {
    text: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
    icon: PropTypes.node,
}