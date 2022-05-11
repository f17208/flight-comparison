import { Icon } from 'leaflet';
import markerIconPng from '../../assets/marker-icon.png';

export { ReactComponent as Logo } from '../../assets/logo.svg';
export { ReactComponent as LogoHorizontal } from '../../assets/logo-horizontal.svg';
export { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';
export { ReactComponent as AirlineIcon } from '../../assets/airline.svg';
export { ReactComponent as AirportIcon } from '../../assets/marker.svg';
export { ReactComponent as ClearIcon } from '../../assets/clear.svg';
export { ReactComponent as ChevronRightIcon } from '../../assets/chevron-right.svg';
export { ReactComponent as ArrowBackIcon } from '../../assets/arrow-back.svg';
export { ReactComponent as ArrowForwardIcon } from '../../assets/arrow-forward.svg';
export { ReactComponent as ViewMoreIcon } from '../../assets/view.svg';
export { ReactComponent as FlightIcon } from '../../assets/flight.svg';
export { ReactComponent as SwapIcon } from '../../assets/swap.svg';

export const MarkerIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [13, 38],
});
