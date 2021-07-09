import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  async model() {
    // console.log(this.store.findAll('rental'));
    const rental = await this.store.findAll('rental');
    console.log(rental);
    return rental;
  }
}
