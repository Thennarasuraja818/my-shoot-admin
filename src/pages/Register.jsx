import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Camera, User, Phone, AlertCircle } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Min. 8 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/login-bg.png"
          alt="Background"
          className="w-full h-full object-cover opacity-50 transform scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-black/70" />
      </div>

      <div className="w-full max-w-[500px] relative z-10 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5b400]/10 border border-[#f5b400]/20 mb-4 animate-bounce-subtle">
            <Camera className="text-[#f5b400]" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Join MyShoot</h1>
          <p className="text-gray-400 mt-2">Start managing your photography business professionally</p>
        </div>

        {/* Register Card */}
        <div className="bg-[#141414]/90 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.name ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#f5b400]'}`}>
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-white rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#f5b400]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.email ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#f5b400]'}`}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} text-white rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#f5b400]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.phone ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#f5b400]'}`}>
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} text-white rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#f5b400]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600`}
                    placeholder="+91 98765..."
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.password ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#f5b400]'}`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} text-white rounded-2xl py-3.5 pl-11 pr-12 focus:outline-none focus:border-[#f5b400]/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {errors.password}</p>}
                {!errors.password && (
                  <p className="mt-2 text-[10px] text-gray-500 flex items-center gap-1.5 ml-1">
                    <span className="w-1 h-1 rounded-full bg-gray-500"></span> Min. 8 characters required
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-[#f5b400] focus:ring-[#f5b400]/50" id="terms" />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-normal">
                I agree to the <button type="button" className="text-white hover:underline">Terms of Service</button> and <button type="button" className="text-white hover:underline">Privacy Policy</button>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#f5b400] hover:bg-[#e0a300] text-black font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(245,180,0,0.15)] flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account? {' '}
          <Link to="/" className="text-[#f5b400] font-semibold hover:underline decoration-2 underline-offset-8">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
