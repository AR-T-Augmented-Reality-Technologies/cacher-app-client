import { func, number, oneOfType, string } from 'prop-types'

const Marker = ({ className, lat, lng, markerId, onClick, icon }) => {
    return (
        <img
            className={className}
            src={icon.url}
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

    icon: { url: string, scaledSize: { width: number, height: number }},

    onClick: func,
}

export default Marker
