import logo from '../logo.svg';
import './LoadingIndicator.css';

export function LoadingIndicator() {
    return <img className={'indicator'} height={32} src={logo} alt={'loading'} />
}