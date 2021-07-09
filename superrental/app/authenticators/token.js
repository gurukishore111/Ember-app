import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  async restore(data) {
    let { token } = data;
    if (token) {
      return data;
    } else {
      throw 'no valid session data';
    }
  },

  async authenticate(email, password) {
    console.log(email, password);
    let res = await fetch('http://localhost:9000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      return res.json();
    } else {
      let err = await res.text();
      throw new Error(err);
    }
  },
  async invalidate(data) {},
});
