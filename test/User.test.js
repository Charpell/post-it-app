import faker from 'faker';
import chai from 'chai';
import request from 'supertest';

import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

const password = '123456';


describe('EndPoint: SignUp', () => {
  const userName = 'Kakashi';
  const email = faker.internet.email();
  const number = '2348088098146';

  it('should successfully create a new user', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, password, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Welcome to Post it app');
        res.body.should.have.nested.property('userData.email')
        .eql(email.toLowerCase());
        res.body.should.have.nested.property('userData.displayName')
        .eql('Kakashi');
        if (err) return done(err);
        done();
      });
  });


  it('should return validation error if username is undefined', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if phone number is undefined', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Phone number is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email is undefined', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if password is undefined', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Password is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if username field is empty', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName: '', email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if number field is empty', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email, password, number: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Phone number is required');
        if (err) return done(err);
        done();
      });
  });

  it('should require the email field is not empty', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email: '', password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should require that password field is not empty', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email, number, password: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Password is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email field is badly formatted',
  (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, password, number, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('should not create a user with an existing email', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, password, number, email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is already in use by another account.');
        if (err) return done(err);
        done();
      });
  });


  it('should return validation error if password characters is less than 5',
  (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ userName, email, number, password: '1234' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Password should be at least 6 characters');
        if (err) return done(err);
        done();
      });
  });
});


describe('SignIn Route', () => {
  const email = 'jat@gmail.com';
  it('should successfully sign in a resgistered user',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        .eql('Welcome to Post it app');
        res.body.should.have.nested.property('userData.email')
        .eql('jat@gmail.com');
        res.body.should.have.nested.property('userData.displayName')
        .eql('Jat');
        res.body.should.have.nested.property('userData.uid')
        .eql('Sb1mgQOVOoXafC3MMnQXVjKlPdJ2');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email field is undefined', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if password field is undefined',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Password is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email field is empty', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email: '', password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if password field is empty', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email, password: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Password is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email field is badly formatted',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ password, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if an email address does not exist',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ password, email: 'hhd@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The email does not exist.');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the password is invalid',
  (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email, password: '123456ggh' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The password is invalid.');
        if (err) return done(err);
        done();
      });
  });
});

describe('Google SignUp Route', () => {
  const userName = 'Gideon';
  const email = 'emekasmithyu@gmal.com';
  const number = '2348066098146';
  const uid = 'rbjxWT5b4AfHirNE4IDlS0ELk882';

  it('should return validation error if the username is undefined', (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ email, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the phone number is undefined',
  (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, email, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Phone number is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the email is undefined',
  (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if the uid is undefined',
  (done) => {
    request(app)
    .post('/api/v1/google/signup')
    .send({ userName, email, number })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be
      .eql('Uid is required');
      if (err) return done(err);
      done();
    });
  });

  it('should return validation error if uid field is empty',
  (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, email, number, uid: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Uid is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if username field is empty', (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName: '', email, number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if email field is empty', (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, email: '', number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('should return validation error if number field is empty', (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, email, number: '', uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Phone number is required');
        if (err) return done(err);
        done();
      });
  });

  it('should not create a user with an existing Username', (done) => {
    request(app)
      .post('/api/v1/google/signup')
      .send({ userName, email, number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username already exist');
        if (err) return done(err);
        done();
      });
  });
});


describe('Home Page', () => {
  it('should open the home page of the app', (done) => {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should redirect to home page when a random route is used', (done) => {
    request(app)
      .get('/api/v1/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('SignOut Route', () => {
  it('should return status 200 when the user sign out', (done) => {
    request(app)
      .post('/api/v1/user/signout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You have successfully signed out');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Reset Password', () => {
  const invalidEmail = 'gfhr@gmail.com';
  const email = 'wesumeh@gmail.com';

  it('should return 200 when a user logs in successfully', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });


  it('should return status 200 when the email is valid for reset', (done) => {
    request(app)
      .post('/api/v1/user/reset')
      .send({ email: 'wesumeh@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('An email has been sent to your inbox for password reset.');
        if (err) return done(err);
        done();
      });
  });


  it('should return status 404 if a email/user dose not exist', (done) => {
    request(app)
      .post('/api/v1/user/reset')
      .send({ email: invalidEmail })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Email address does not exist');
        if (err) return done(err);
        done();
      });
  });

  it('should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/api/v1/user/reset')
      .send({ email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: Get all Phone Numbers from the Database', () => {
  it('should return status 200 when all users are returned', (done) => {
    request(app)
      .get('/api/v1/users/allnumbers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(17);
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Emails from the Database', () => {
  it('should return status 200 when all emails are returned', (done) => {
    request(app)
      .get('/api/v1/users/allemails')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(17);
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Users from the Database', () => {
  it('should return status 200 when all users are returned', (done) => {
    request(app)
      .get('/api/v1/users/allusers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(17);
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: Get all Notification for a User', () => {
  it('should return status 200 when all notifications are received', (done) => {
    request(app)
      .get('/api/v1/user/notification/Jat')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(2);
        if (err) return done(err);
        done();
      });
  });

  it('should return status 200 when a googleUser logs in', (done) => {
    request(app)
      .get('/api/v1/user/notification/Ebuka')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(6);
        if (err) return done(err);
        done();
      });
  });
});

