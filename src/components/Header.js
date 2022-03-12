import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, setShowAddTask, btnColor, btnName }) => {
  const location = useLocation();
  return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname === '/' && <Button color={btnColor} btnName={btnName} onClick={setShowAddTask} />}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string,
    btnColor: PropTypes.string,
    btnName: PropTypes.string, 
}
 
export default Header