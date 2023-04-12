import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle login/signup logic
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isSignup ? 'Create an Account' : 'Sign In'}</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        {isSignup && (
          <>
            <div className="form-group">
              <label htmlFor="first-name">Name:</label>
              <div className="name-fields">
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" />
          </div>
        )}
        <button className="form-btn" type="submit">
          {isSignup ? 'Create Account' : 'Sign In'}
        </button>
        <button className="form-toggle-btn" type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
        </button>
      </form>
    </div>
  );
};

export default Login;
