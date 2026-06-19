import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase } from '../supabaseClient';

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Replace this with your actual Cloudflare Turnstile Site Key
  // '1x00000000000000000000AA' is a testing sitekey that always passes
  const SITE_KEY = '1x00000000000000000000AA';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!employeeId.trim()) {
      setError('Please enter your Employee ID.');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the captcha verification.');
      return;
    }

    setLoading(true);

    try {
      // Query Supabase to find the employee by their ID
      const { data, error: dbError } = await supabase
        .from('EmployeesDetails')
        .select('Employee_ID, qr_token')
        .eq('Employee_ID', employeeId.trim())
        .maybeSingle();

      if (dbError || !data) {
        setError('Invalid Employee ID. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to the verification page using the qr_token
      navigate(`/employees/${data.qr_token}`);
    } catch (err) {
      console.error(err);
      setError('An error occurred during verification. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-6 sm:px-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-[#1F6FD1]/10 rounded-xl flex items-center justify-center text-[#1F6FD1] mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="headline-md mb-2">Employee Login</h1>
          <p className="body-md text-[var(--text-secondary)]">
            Enter your ID and verify to access your employment data.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="employeeId" className="block label-md text-[var(--text-muted)] mb-2 uppercase tracking-wider">
              Employee ID
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[#1F6FD1] transition-colors"
              placeholder="e.g. 123456_IN"
              required
            />
          </div>

          <div className="flex justify-center">
            <Turnstile
              siteKey={SITE_KEY}
              onSuccess={(token) => setCaptchaToken(token)}
              onError={() => setError('Captcha verification failed. Please try again.')}
              onExpire={() => setCaptchaToken(null)}
              options={{
                theme: 'auto',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !captchaToken}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              loading || !captchaToken
                ? 'bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed'
                : 'bg-[#1F6FD1] text-white hover:bg-[#1A5BB0] shadow-sm hover:shadow-md'
            }`}
          >
            {loading ? 'Verifying...' : 'Access Records'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmployeeLogin;
