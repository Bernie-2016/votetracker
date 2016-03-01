import React, { Component } from 'react';
import superagent from 'superagent';
import memoize from 'lodash.memoize';
import Promise from 'bluebird';

const get = url => new Promise((resolve, reject) => {
  superagent.get(url)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err || !response.ok || !response.body.length) {
        reject(err || response);
      } else {
        resolve(response.body);
      }
    });
});

export default class ApiProvider extends Component {

  getChildContext() {
    return { api: this.api() };
  }

  api() {
    const memotwo = ({ state, county }) => `${state}.${county}`;
    const api = {
      getCounties: memoize(state => get(`/api/states/${state}/counties`)),
      getLocations: memoize(({ state, county }) => get(`/api/states/${state}/${county}/locations`),
        memotwo),
      getPrecinctsFromLocation: memoize(locId => get(`/api/locations/${locId}/precincts`)),
      getPrecinctsFromCounty: memoize(
        ({ state, county }) => get(`/api/states/${state}/${county}/precincts`),
        memotwo
      ),
    };

    return api;
  }

  render() {
    return this.props.children;
  }

}

ApiProvider.propTypes = {
  children: React.PropTypes.element,
};

ApiProvider.childContextTypes = {
  api: React.PropTypes.object,
};
