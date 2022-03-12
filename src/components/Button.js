import PropTypes from 'prop-types'

const Button = ({color, btnName, onClick}) => {
  return (
    <button className='btn' style={{backgroundColor: color}} onClick={onClick}>
        {btnName}
    </button>
  )
}

Button.defaultProps = {
    color: 'steelblue'
}
Button.propTypes = {
    color: PropTypes.string,
    btnName: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button