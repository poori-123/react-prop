import React from "react";
import { Route } from "react-router";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <CacheSwitch {...switchProps}>
      {routes.map((route, i) =>{
        if(route.noCache){
          return (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={props =>
                route.render ? (
                  route.render({ ...props, ...extraProps, route: route })
                ) : (
                  <route.component {...props} {...extraProps} route={route} />
                )
              }
            />
          )

        }else{
          return (
            <CacheRoute
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={props =>
                route.render ? (
                  route.render({ ...props, ...extraProps, route: route })
                ) : (
                  <route.component {...props} {...extraProps} route={route} />
                )
              }
            />
          )
        }
      })}
    </CacheSwitch>
  ) : null;
}

export default renderRoutes;