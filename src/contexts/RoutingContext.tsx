import React, { createContext, useEffect, useState } from 'react';
import Router from 'next/router';

type State = {
  previousUrl: string;
};
export const RoutingContext = createContext<State | null>(null);

const routeChangeStartEventId = 'routeChangeStart';

const RoutingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousUrl, setPreviousUrl] = useState('');

  useEffect(() => {
    Router.events.on(routeChangeStartEventId, () => setPreviousUrl(Router.asPath));
    return () => {
      Router.events.on(routeChangeStartEventId, () => setPreviousUrl(''));
    };
  }, []);

  return <RoutingContext.Provider value={{ previousUrl }}>{children}</RoutingContext.Provider>;
};

export default RoutingContextProvider;
