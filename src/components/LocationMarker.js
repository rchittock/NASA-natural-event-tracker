import { Icon } from '@iconify/react'

const LocationMarker = ({ lat, lng, onClick, locationIcon }) => {
	return (
		<div className="location-marker" onClick={ onClick }>
			<Icon
				icon={locationIcon}
				className="location-icon">	
			</Icon>
		</div>
	)
}

export default LocationMarker
