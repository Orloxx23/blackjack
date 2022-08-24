import * as React from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    await axios.post('https://bj-backend.vercel.app/api/auth/login', {
        email: email,
        password: password
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        window.location.reload();
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => login(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => onChangeEmail(e)} />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => onChangePassword(e)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
