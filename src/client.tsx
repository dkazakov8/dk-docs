import './styles/global.scss';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'comp/app';
import { StoreContext } from 'compSystem/StoreContext';
import { createGlobals } from 'compSystem/createGlobals';
import { initAutorun } from 'autorun';
import { isomorphPolyfills } from 'utils';

isomorphPolyfills();

const globals = createGlobals();

void Promise.resolve()
  .then(() => initAutorun(globals))
  .then(() => globals.actions.client.beforeRender())
  .then(() => globals.actions.routing.redirectTo({ pathname: location.pathname }))
  .then(() =>
    createRoot(document.getElementById('app')!).render(
      <StoreContext.Provider value={globals}>
        <App />
      </StoreContext.Provider>
    )
  );
