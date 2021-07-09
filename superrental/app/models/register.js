import Model, { attr } from '@ember-data/model';

export default class RegisterModel extends Model {
  @attr firstName;
  @attr lastName;
  @attr mobileNo;
  @attr email;
  @attr apartmentName;
}
