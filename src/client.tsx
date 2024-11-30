import './styles/global.scss';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import { createRoot } from 'react-dom/client';
import { getInitialRoute } from 'dk-react-mobx-router';

import { App } from 'comp/app';
import { StoreContext } from 'compSystem/StoreContext';
import { createGlobals } from 'compSystem/createGlobals';
import { initAutorun } from 'autorun';
import { isomorphPolyfills } from 'utils';
import { routes } from 'routes';

isomorphPolyfills();

const globals = createGlobals();

void Promise.resolve()
  .then(() => initAutorun(globals))
  .then(() => globals.actions.client.beforeRender())
  .then(() =>
    globals.actions.routing.redirectTo(
      getInitialRoute({
        routes,
        pathname: location.pathname + location.search,
        fallback: 'error404',
      })
    )
  )
  .then(() =>
    createRoot(document.getElementById('app')!).render(
      <StoreContext.Provider value={globals}>
        <App />
      </StoreContext.Provider>
    )
  );
