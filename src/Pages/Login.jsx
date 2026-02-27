import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import instance from '../api/axios'
import { useNavigate } from 'react-router-dom'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080b12;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Animated background orbs */
  .login-page::before {
    content: '';
    position: absolute;
    top: -200px; left: -200px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%);
    animation: float1 8s ease-in-out infinite;
  }
  .login-page::after {
    content: '';
    position: absolute;
    bottom: -200px; right: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(236,100,75,0.07) 0%, transparent 70%);
    animation: float2 10s ease-in-out infinite;
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, 30px) scale(1.05); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, -40px) scale(1.08); }
  }

  /* Grid pattern */
  .login-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }

  /* Card */
  .login-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 420px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 2.8rem 2.5rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
    animation: slideUp 0.5s ease both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Logo / Brand */
  .login-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 2rem;
  }
  .brand-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, #63b3ed, #ec644b);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
  }
  .brand-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.25rem;
    color: #fff; letter-spacing: 0.5px;
  }

  /* Header */
  .login-header { margin-bottom: 2rem; }
  .login-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
    margin-bottom: 0.4rem;
  }
  .login-header p {
    color: rgba(255,255,255,0.35);
    font-size: 0.88rem;
  }

  /* Form fields */
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    margin-bottom: 1.5rem;
  }
  .field-wrap { position: relative; }
  .field-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 0.45rem;
  }
  .field-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .field-icon {
    position: absolute;
    left: 14px;
    color: rgba(255,255,255,0.25);
    font-size: 1rem;
    pointer-events: none;
    transition: color 0.2s;
  }
  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.75rem 1rem 0.75rem 2.8rem;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.2); }
  .field-input:focus {
    border-color: rgba(99,179,237,0.5);
    background: rgba(99,179,237,0.05);
    box-shadow: 0 0 0 3px rgba(99,179,237,0.1);
  }
  .field-input:focus + .field-focus-icon,
  .field-input-wrap:focus-within .field-icon {
    color: rgba(99,179,237,0.7);
  }
  .field-input.error-input {
    border-color: rgba(252,129,74,0.6);
    background: rgba(252,129,74,0.05);
  }
  .field-error {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #fc814a;
    font-size: 0.75rem;
    margin-top: 0.4rem;
    animation: errShake 0.3s ease;
  }
  @keyframes errShake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  /* Show/hide password toggle */
  .toggle-pw {
    position: absolute;
    right: 12px;
    background: none; border: none;
    color: rgba(255,255,255,0.25);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 4px;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: rgba(255,255,255,0.6); }

  /* Forgot password */
  .forgot-link {
    display: block;
    text-align: right;
    font-size: 0.78rem;
    color: rgba(99,179,237,0.7);
    text-decoration: none;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: #63b3ed; }

  /* Submit Button */
  .btn-login {
    width: 100%;
    background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.85rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  }
  .btn-login::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .btn-login:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99,179,237,0.35);
  }
  .btn-login:hover:not(:disabled)::before { opacity: 1; }
  .btn-login:active:not(:disabled) { transform: translateY(0); }
  .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-login.loading {
    pointer-events: none;
  }
  .btn-spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .divider {
    display: flex; align-items: center; gap: 1rem;
    margin: 1.5rem 0;
    color: rgba(255,255,255,0.2); font-size: 0.75rem;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1;
    height: 1px; background: rgba(255,255,255,0.08);
  }

  /* Signup link */
  .signup-text {
    text-align: center;
    font-size: 0.83rem;
    color: rgba(255,255,255,0.3);
  }
  .signup-text a {
    color: #63b3ed; text-decoration: none; font-weight: 500;
    transition: color 0.2s;
  }
  .signup-text a:hover { color: #90cdf4; }

  /* Toast override */
  .Toastify__toast { font-family: 'DM Sans', sans-serif !important; border-radius: 10px !important; }
`;

function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear error on change
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const Validation = () => {
    let newerror = {}
    const { username, password } = form
    if (!username) newerror.username = 'Username is required'
    if (!password) newerror.password = 'Password is required'
    setErrors(newerror)
    return Object.keys(newerror).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!Validation()) {
      toast.error('Please fix the errors below')
      return
    }
    const { username, password } = form
    setLoading(true)
    try {
      const result = await instance.post('/login/', { username, password })
      localStorage.setItem('access', result.data.access_token)
      toast.success('Login successful! Welcome back 👋')
      setTimeout(() => {
        navigate('/profile')
      }, 1500)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const { username, password } = form

  return (
    <>
      <style>{css}</style>
      <div className="login-page">
        <div className="login-grid" />

        <div className="login-card">
          {/* Brand */}
          <div className="login-brand">
            <div className="brand-icon">⚡</div>
            <span className="brand-name">StudioX</span>
          </div>

          {/* Header */}
          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="field-group">
              {/* Username */}
              <div className="field-wrap">
                <label className="field-label" htmlFor="username">Username</label>
                <div className="field-input-wrap">
                  <span className="field-icon">👤</span>
                  <input
                    id="username"
                    className={`field-input${errors.username ? ' error-input' : ''}`}
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <div className="field-error">⚠ {errors.username}</div>
                )}
              </div>

              {/* Password */}
              <div className="field-wrap">
                <label className="field-label" htmlFor="password">Password</label>
                <div className="field-input-wrap">
                  <span className="field-icon">🔒</span>
                  <input
                    id="password"
                    className={`field-input${errors.password ? ' error-input' : ''}`}
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPw(!showPw)}
                    tabIndex={-1}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? '🙈' : '👁'}
                  </button>
                </div>
                {errors.password && (
                  <div className="field-error">⚠ {errors.password}</div>
                )}
              </div>
            </div>

            <a href="#" className="forgot-link">Forgot password?</a>

            <button
              type="submit"
              className={`btn-login${loading ? ' loading' : ''}`}
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="signup-text">
            Don't have an account? <a href="#">Create one free</a>
          </p>
        </div>
      </div>

      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  )
}

export default Login