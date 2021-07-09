import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class RentalDetailedComponent extends Component {
  @service store;
  @service session;
  @tracked firstName = this.session.data.authenticated.firstName;
  @tracked lastName = this.session.data.authenticated.lastName;
  @tracked email = this.session.data.authenticated.email;
  @tracked apartmentName;
  @tracked mobileNo = this.mobileNo;

  // @action
  // update(attr, event) {
  //   console.log(attr, event);
  //   this[attr] = event.target.value;
  // }
  @action
  async onsubmit(id, event) {
    event.preventDefault();

    //   await fetch('/api/user', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log('Success:', data);
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 2000);
    //       alert('Registered successfully');
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //       alert('Server error');
    //     });

    function transitionToHome() {
      window.location.replace('/');
    }

    function failure(err) {
      console.log(err);
    }

    let userDetails = await this.store.createRecord('register', {
      firstName: this.session.data.authenticated.firstName,
      lastName: this.session.data.authenticated.lastName,
      email: this.session.data.authenticated.email,
      apartmentName: id,
      mobileNo: this.session.data.authenticated.mobileNo,
    });
    userDetails.save().then(transitionToHome()).catch(failure());
    console.log(this.session.data.authenticated.firstName);
  }
}
