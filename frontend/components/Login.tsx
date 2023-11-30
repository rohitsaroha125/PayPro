// Login.tsx
import React, { useState } from "react";
import styles from "./Login.module.css";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.loginForm}>
      <h2 className="text-center" style={{
        marginTop:'0px'
      }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.loginInput}>
          <label htmlFor="email" className={styles.loginLabel}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.textInput}
          />
        </div>

        <div className={styles.loginInput}>
          <label htmlFor="password" className={styles.loginLabel}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.textInput}
          />
        </div>
        <div className={styles.midBtn}>
            <button type="submit" className={styles.loginBtn}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
