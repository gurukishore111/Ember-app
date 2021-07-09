// import RESTAdapter from '@ember-data/adapter/json-api';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';
  host = 'http://localhost:9000';
  @service session;

  @computed('session.data.authenticated.token')
  get headers() {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (this.session) {
      headers['token'] = this.session.data.authenticated.token;
      headers['userID'] = this.session.data.authenticated._id;
    }
    return headers;
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
