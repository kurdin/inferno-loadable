import Loadable from '../../src';
import Loading from './Loading';

const LoadableNested = Loadable({
  loader: () => import('./ExampleNested'),
  loading: Loading,
});

export default function Example() {
  return (
    <div>
      <h1>Hello from a loadable component</h1>
      <LoadableNested/>
    </div>
  );
}
