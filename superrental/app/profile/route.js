import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service session;
  @service store;
  @tracked userData;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  // accessing the controller
  setupController(controller, model) {
    super.setupController(controller, model);
    const users = this.store
      .findRecord('user', this.session.data.authenticated._id)
      .then(function (userData) {
        controller.set('firstName', userData.firstName);
        controller.set('lastName', userData.lastName);
        controller.set('email', userData.email);
        controller.set('mobileNo', userData.mobileNo);
      });
  }
}
