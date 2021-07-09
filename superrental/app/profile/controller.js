import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ProfileController extends Controller {
  @service store;
  @service session;
  // = this.session.data.authenticated.firstName;
  @tracked firstName;
  @tracked lastName;
  @tracked email;
  @tracked apartmentName;
  @tracked mobileNo;

  @action
  update(attr, event) {
    console.log(attr, event);
    this[attr] = event.target.value;
  }

  @action
  async onsubmit(event) {
    event.preventDefault();

    let self = this;

    function transitionToHome() {
      self.transitionToRoute('index');
    }

    function failure(err) {
      // handle the error
      console.log(err);
    }

    // this.store
    //   .findRecord('user', this.session.data.authenticated._id)
    //   .then(function (userData) {
    //     // ...after the record has loaded
    //     userData.firstName = 'Guru';
    //     userData.lastName = 'Kishore';
    //     userData.mobileNo = '123456789';

    //     userData.save().then(transitionToHome).catch(failure);
    //   });

    let res = await fetch(
      `http://localhost:9000/api/users/${this.session.data.authenticated._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          mobileNo: this.mobileNo,
          email: this.email,
        }),
      }
    );

    if (res.ok) {
      transitionToHome();
      return res.json();
    } else {
      let err = await res.text();
      failure(err);
      throw new Error(err);
    }
  }
}
