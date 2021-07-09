import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RentaldetailsRoute extends Route {
  @service store;

  async model(params) {
    // console.log(this.store.findRecord('rental', params.rental_id));
    return await this.store.findRecord('rental', params.rental_id);
  }
}
