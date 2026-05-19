import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import instance from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .signup-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080b12;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .signup-page::before {
    content: '';
    position: absolute;
    top: -200px; right: -150px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%);
    animation: float1 8s ease-in-out infinite;
  }
  .signup-page::after {
    content: '';
    position: absolute;
    bottom: -200px; left: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(236,100,75,0.07) 0%, transparent 70%);
    animation: float2 10s ease-in-out infinite;
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-40px, 30px) scale(1.05); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -40px) scale(1.08); }
  }

  /* Grid pattern */
  .signup-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    pointer-events: none;
  }

  /* Card */
  .signup-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 440px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 2.8rem 2.5rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
    animation: slideUp 0.5s ease both;
    margin: 1.5rem;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Brand */
  .signup-brand {
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
  .signup-header { margin-bottom: 2rem; }
  .signup-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem; font-weight: 700;
    color: #fff; letter-spacing: -0.5px;
    margin-bottom: 0.4rem;
  }
  .signup-header p { color: rgba(255,255,255,0.35); font-size: 0.88rem; }

  /* Fields */
  .field-group {
    display: flex; flex-direction: column;
    gap: 1.1rem; margin-bottom: 1.5rem;
  }
  .field-wrap { position: relative; }
  .field-label {
    display: block;
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 0.45rem;
  }
  .field-input-wrap {
    position: relative;
    display: flex; align-items: center;
  }
  .field-icon {
    position: absolute; left: 14px;
    color: rgba(255,255,255,0.25);
    font-size: 1rem; pointer-events: none;
    transition: color 0.2s;
  }
  .field-input-wrap:focus-within .field-icon {
    color: rgba(99,179,237,0.7);
  }
  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.75rem 1rem 0.75rem 2.8rem;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.2); }
  .field-input:focus {
    border-color: rgba(99,179,237,0.5);
    background: rgba(99,179,237,0.05);
    box-shadow: 0 0 0 3px rgba(99,179,237,0.1);
  }
  .field-input.error-input {
    border-color: rgba(252,129,74,0.6);
    background: rgba(252,129,74,0.05);
  }
  .field-error {
    display: flex; align-items: center; gap: 0.3rem;
    color: #fc814a; font-size: 0.75rem;
    margin-top: 0.4rem;
    animation: errShake 0.3s ease;
  }
  @keyframes errShake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  /* Password toggle */
  .toggle-pw {
    position: absolute; right: 12px;
    background: none; border: none;
    color: rgba(255,255,255,0.25);
    cursor: pointer; font-size: 0.9rem; padding: 4px;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: rgba(255,255,255,0.6); }

  /* Password strength bar */
  .pw-strength {
    margin-top: 0.5rem;
  }
  .pw-strength-bar {
    height: 3px; border-radius: 4px;
    background: rgba(255,255,255,0.07);
    overflow: hidden; margin-bottom: 0.3rem;
  }
  .pw-strength-fill {
    height: 100%; border-radius: 4px;
    transition: width 0.4s ease, background 0.4s ease;
  }
  .pw-strength-label {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.5px;
  }

  /* Terms checkbox */
  .terms-row {
    display: flex; align-items: flex-start; gap: 0.7rem;
    margin-bottom: 1.5rem;
  }
  .terms-checkbox {
    width: 16px; height: 16px; flex-shrink: 0;
    margin-top: 2px; accent-color: #63b3ed; cursor: pointer;
  }
  .terms-label {
    font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.5;
  }
  .terms-label a {
    color: #63b3ed; text-decoration: none; transition: color 0.2s;
  }
  .terms-label a:hover { color: #90cdf4; }

  /* Submit button */
  .btn-signup {
    width: 100%;
    background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%);
    color: #fff; border: none;
    border-radius: 10px; padding: 0.85rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  }
  .btn-signup::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .btn-signup:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99,179,237,0.35);
  }
  .btn-signup:hover:not(:disabled)::before { opacity: 1; }
  .btn-signup:active:not(:disabled) { transform: translateY(0); }
  .btn-signup:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px; vertical-align: middle;
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

  /* Login link */
  .login-text {
    text-align: center; font-size: 0.83rem;
    color: rgba(255,255,255,0.3);
  }
  .login-text a {
    color: #63b3ed; text-decoration: none; font-weight: 500;
    transition: color 0.2s;
  }
  .login-text a:hover { color: #90cdf4; }

  .Toastify__toast { font-family: 'DM Sans', sans-serif !important; border-radius: 10px !important; }
`

// Password strength helper
function getStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { label: '', color: '', pct: '0%' },
    { label: 'Weak', color: '#ef4444', pct: '25%' },
    { label: 'Fair', color: '#f97316', pct: '50%' },
    { label: 'Good', color: '#eab308', pct: '75%' },
    { label: 'Strong', color: '#22c55e', pct: '90%' },
    { label: 'Very Strong', color: '#63b3ed', pct: '100%' },
  ]
  return map[Math.min(score, 5)]
}

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()

  const strength = getStrength(form.password)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!agreed) newErrors.terms = 'You must agree to the terms'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors below')
      return
    }
    setLoading(true)
    try {
      await instance.post('signup/', form)
      toast.success('Account created! Redirecting... 🎉')
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Signup failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{css}</style>
      <div className="signup-page">
        <div className="signup-grid" />

        <div className="signup-card">
          {/* Brand */}
          <div className="signup-brand">
            <div className="brand-icon">⚡</div>
            <span className="brand-name">StudioX</span>
          </div>

          {/* Header */}
          <div className="signup-header">
            <h1>Create account</h1>
            <p>Join thousands of users building great things</p>
          </div>

          <form onSubmit={handleSignup}>
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
                    placeholder="Choose a username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
                {errors.username && <div className="field-error">⚠ {errors.username}</div>}
              </div>

              {/* Email */}
              <div className="field-wrap">
                <label className="field-label" htmlFor="email">Email</label>
                <div className="field-input-wrap">
                  <span className="field-icon">✉</span>
                  <input
                    id="email"
                    className={`field-input${errors.email ? ' error-input' : ''}`}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <div className="field-error">⚠ {errors.email}</div>}
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
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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

                {/* Password strength */}
                {form.password && (
                  <div className="pw-strength">
                    <div className="pw-strength-bar">
                      <div
                        className="pw-strength-fill"
                        style={{ width: strength.pct, background: strength.color }}
                      />
                    </div>
                    <span className="pw-strength-label" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                )}

                {errors.password && <div className="field-error">⚠ {errors.password}</div>}
              </div>
            </div>

            {/* Terms */}
            <div className="terms-row">
              <input
                type="checkbox"
                id="terms"
                className="terms-checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (errors.terms) setErrors({ ...errors, terms: '' })
                }}
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                {errors.terms && <div className="field-error" style={{ marginTop: '0.3rem' }}>⚠ {errors.terms}</div>}
              </label>
            </div>

            <button
              type="submit"
              className={`btn-signup${loading ? ' loading' : ''}`}
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="login-text">
            Already have an account? <Link to="/login">Sign in</Link>
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

export default Signup