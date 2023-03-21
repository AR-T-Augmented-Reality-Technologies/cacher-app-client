import { func, number, oneOfType, string } from 'prop-types'

const Marker = ({ className, lat, lng, markerId, onClick, scaledSize, url}) => {
    return (
        <img
            className={className}
            src={"map-marker.png"}
            // eslint-disable-next-line react/no-unknown-property
            lat={lat}
            // eslint-disable-next-line react/no-unknown-property
            lng={lng}
            key={markerId}
            onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
            style={{ cursor: 'pointer', fontSize: 40 }}
            alt={markerId}
        />
    )
}

Marker.defaultProps = {}

Marker.iconScaledSize = { 
    width: number,
    height: number
}

Marker.propTypes = {
    className: string,
    /**
     * The id of the marker.
     */
    markerId: oneOfType([number, string]).isRequired,
    /**
     * The latitude of the marker.
     */
    lat: number.isRequired,
    /**
     * The longitude of the marker.
     */
    lng: number.isRequired,
    /**
     * The function to call when the marker is clicked.
     */

    scaledSize: Marker.iconScaledSize,

    url: string,

    onClick: func,
}

export default Marker
