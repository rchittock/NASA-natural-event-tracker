import { useState } from 'react'

import { v4 as uuidv4  } from 'uuid'

import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

import wildfireIcon from '@iconify-icons/openmoji/evacuate-fire'
import stormIcon from '@iconify-icons/openmoji/wind-face'
import volcanoIcon from '@iconify-icons/openmoji/volcano'
import iceBergIcon from '@iconify-icons/openmoji/iceberg'

const Map = ({ eventData, center, zoom }) => {
	const [locationInfo, setLocationInfo] = useState(null)

	const markers = eventData.map(ev => {

		//Sea and Lake Ice
		if (ev.categories[0].id === 15) {
			return <LocationMarker
				key={uuidv4()}
				lat={ev.geometries[0].coordinates[1]}
				lng={ev.geometries[0].coordinates[0]}
				onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
				locationIcon={iceBergIcon}
			></LocationMarker>
		}

		//Volcanoes
		if (ev.categories[0].id === 12) {
			if (!Array.isArray(ev.geometries[0].coordinates[0])) {			
				return <LocationMarker
					key={uuidv4()}
					lat={ev.geometries[0].coordinates[1]}
					lng={ev.geometries[0].coordinates[0]}
					onClick={()=>setLocationInfo({id:ev.id,title:ev.title})}
					locationIcon={volcanoIcon}
				></LocationMarker>
			} else {
				return ev.geometries[0].coordinates[0].map(geo => {
					return <LocationMarker
						key={uuidv4()}
						lat={geo[1]}
						lng={geo[0]}
						onClick={() => setLocationInfo({ id: ev.id, title: ev.title, date: geo.date })}
						locationIcon={volcanoIcon}
					></LocationMarker>
				})
			}
		}
		
		//WildFires
		if (ev.categories[0].id === 8) {
			return <LocationMarker
				key={uuidv4()}
				lat={ev.geometries[0].coordinates[1]}
				lng={ev.geometries[0].coordinates[0]}
				onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
				locationIcon={wildfireIcon}
			></LocationMarker>
		}

		//Severe Storms
		if (ev.categories[0].id === 10) {
			return ev.geometries.map(geo => {
				return <LocationMarker
					key={uuidv4()}
					lat={geo.coordinates[1]}
					lng={geo.coordinates[0]}
					onClick={() => setLocationInfo({ id: ev.id, title: ev.title, date: geo.date })}
					locationIcon={stormIcon}
				></LocationMarker>
			})
		}

		return null;
	})

	return (
	
		<div className="map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
				defaultCenter={ center }
				defaultZoom={ zoom }
			>
				{ markers }
			</GoogleMapReact>
			{ locationInfo && <LocationInfoBox info={locationInfo}/> }
		</div>
	)
}

Map.defaultProps = {
	center: {
		lat: 42.3265,
		lng: -1228756
	},
	zoom: 6
}

export default Map
