import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';


const EmployeeVerification = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data, error } = await supabase
          .from('EmployeesDetails')
          .select('*')
          .eq('qr_token', id)
          .maybeSingle();

        if (error) throw error;
        setEmployee(data);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[var(--border)] border-t-[#1F6FD1] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="headline-xl mb-4">Verification Failed</h1>
        <p className="body-lg text-[var(--text-secondary)] mb-8 max-w-md">
          We could not find an active employee record matching the provided verification link.
        </p>
        <Link to="/" className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg)] font-medium rounded-lg hover:opacity-90 transition-opacity">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
      <div className="flex flex-col h-full px-6 sm:px-12 lg:px-24 py-6 max-w-7xl mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F6FD1]/10 text-[#1F6FD1] rounded-full text-sm font-semibold mb-2 border border-[#1F6FD1]/20">
            <span className="w-2 h-2 rounded-full bg-[#1F6FD1] animate-pulse"></span>
            Verified Record
          </div>
          <h1 className="display-lg">Employee Details</h1>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">

          {/* Left: Digital ID Placeholder */}
          <motion.div
            className="border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex items-center justify-center"
            style={{ height: '580px', background: 'var(--bg-card)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-3 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1F6FD1]/10 border border-[#1F6FD1]/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#1F6FD1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0M9 11h.01M15 11h.01M9 15h6" />
                </svg>
              </div>
              <p className="body-lg text-[var(--text-muted)] font-medium">The Digital ID will display here</p>
            </div>
          </motion.div>

          {/* Right: Info Cards (scrollable internally) */}
          <div className="flex flex-col gap-5 overflow-y-auto pb-2 pr-1">

            {/* Public Verification Card */}
            <motion.div
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border-light)]">
                <div className="w-10 h-10 bg-[#1F6FD1]/10 rounded-xl flex items-center justify-center text-[#1F6FD1]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="headline-md">Public Verification</h2>
              </div>

              <dl className="space-y-4">
                <div>
                  <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Name</dt>
                  <dd className="body-lg font-medium text-[var(--text-primary)]">{employee['Full Name']}</dd>
                </div>
                <div>
                  <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">ID</dt>
                  <dd className="body-lg font-medium text-[var(--text-primary)] font-mono">{employee['Employee_ID']}</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Job Title</dt>
                    <dd className="body-lg font-medium text-[var(--text-primary)]">{employee['Job Title/Designation']}</dd>
                  </div>
                  <div>
                    <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Department</dt>
                    <dd className="body-lg font-medium text-[var(--text-primary)]">{employee['Department']}</dd>
                  </div>
                </div>
                <div>
                  <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Current Status</dt>
                  <dd className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {employee['Employee Status'] || 'Working'}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Contact & Utility Data Card */}
            <motion.div
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border-light)]">
                <div className="w-10 h-10 bg-[#1F6FD1]/10 rounded-xl flex items-center justify-center text-[#1F6FD1]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="headline-md">Contact & Utility Data</h2>
              </div>

              <dl className="space-y-4">
                <div>
                  <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Office Location</dt>
                  <dd className="body-lg font-medium text-[var(--text-primary)] leading-relaxed">
                    2nd floor, BFC Plaza Mano Mini AC function hall, Srinagar Colony, Anantapur, Andhra Pradesh, India
                  </dd>
                </div>
                <div>
                  <dt className="label-md text-[var(--text-muted)] mb-1 uppercase tracking-wider">Emergency Contact</dt>
                  <dd className="body-lg font-medium text-[var(--text-primary)]">
                    <a href={`tel:${employee['Emergency_Contact']}`} className="text-[var(--text-primary)] hover:text-[#1F6FD1] transition-colors">
                      {employee['Emergency_Contact']}
                    </a>
                  </dd>
                </div>
              </dl>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeVerification;
