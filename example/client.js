import { render } from 'inferno';
import Loadable from '../src/';
import App from './components/App';

window.main = () => {
  Loadable.preloadReady().then(() => {
    render(<App/>, document.getElementById('app'));
  });
};
