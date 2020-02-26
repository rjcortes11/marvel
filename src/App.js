import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './helpers/MainStyles';
import Spinner from './components/commons/Spinner';
const Routes = React.lazy(() => import('./Routes'));
const Header = React.lazy(() => import('./components/commons/Header'));

function App() {
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <Header />
        <Routes />
      </React.Suspense>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(App);
