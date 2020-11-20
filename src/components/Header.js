import { Icon } from '@iconify/react'
import locationIcon from '@iconify-icons/openmoji/evacuate-fire'

const Header = () => {
	return (
		<header className="header">
			<h1><Icon icon={ locationIcon }></Icon> Wildfire Tracker (Powered by Nasa)</h1>			
		</header>
	)
}

export default Header
