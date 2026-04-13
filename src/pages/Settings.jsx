import { useState } from 'react';
import { Save, Building2, Phone, Mail, MapPin, FileText, CreditCard, Bell, Shield } from 'lucide-react';

const sections = [
  { id: 'business', label: 'Business Info', icon: Building2 },
  { id: 'booking', label: 'Booking Policy', icon: FileText },
  // { id: 'payment', label: 'Payment Gateway', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder-gray-600";
const labelCls = "block text-xs text-gray-400 font-medium mb-1.5";

export default function Settings() {
  const [active, setActive] = useState('business');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Configure your business preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-2">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === s.id ? 'bg-[#f5b400]/10 text-[#f5b400] border border-[#f5b400]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
          {active === 'business' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-white border-b border-[#2a2a2a] pb-3">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Business Name</label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input defaultValue="MyShoot Photography" className={`${inputCls} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input defaultValue="+91 9876543210" className={`${inputCls} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input defaultValue="admin@myshoot.in" className={`${inputCls} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input defaultValue="Chennai, Tamil Nadu" className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Business Address</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-3 text-gray-500" />
                    <textarea rows={3} defaultValue="12, Anna Salai, Teynampet, Chennai - 600006, Tamil Nadu, India"
                      className={`${inputCls} pl-9 resize-none`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>GST Number</label>
                  <input defaultValue="33AABCS1429B1ZB" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Website URL</label>
                  <input defaultValue="https://www.myshoot.in" className={inputCls} />
                </div>
              </div>
            </div>
          )}

          {active === 'booking' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-white border-b border-[#2a2a2a] pb-3">Booking Policy</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Advance Payment Required (%)</label>
                  <input type="number" defaultValue={50} className={inputCls} />
                  <p className="text-xs text-gray-600 mt-1">Percentage of total amount required to confirm a booking.</p>
                </div>
                <div>
                  <label className={labelCls}>Cancellation Policy</label>
                  <textarea rows={4} defaultValue="Cancellations made 7 days before the shoot date will receive a full refund of the advance amount. Cancellations within 7 days will forfeit 50% of the advance. No refund for cancellations within 48 hours."
                    className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={labelCls}>Rescheduling Policy</label>
                  <textarea rows={3} defaultValue="Rescheduling is allowed up to 48 hours before the scheduled shoot with no penalty. Rescheduling within 48 hours will incur a fee of ₹1,000."
                    className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={labelCls}>Booking Lead Time (days)</label>
                  <input type="number" defaultValue={3} className={inputCls} />
                  <p className="text-xs text-gray-600 mt-1">Minimum number of days required in advance to place a booking.</p>
                </div>
              </div>
            </div>
          )}

{/* 
          {active === 'payment' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-white border-b border-[#2a2a2a] pb-3">Payment Gateway</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Payment Provider</label>
                  <select className={inputCls}>
                    <option>Razorpay</option>
                    <option>PayU</option>
                    <option>Stripe</option>
                    <option>CCAvenue</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>API Key</label>
                  <input type="password" defaultValue="rzp_live_xxxxxxxxxxxxxxxx" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>API Secret</label>
                  <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className={inputCls} />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                  <div>
                    <p className="text-sm text-white font-medium">Test Mode</p>
                    <p className="text-xs text-gray-500 mt-0.5">Enable sandbox environment for testing payments</p>
                  </div>
                  <div className="relative inline-flex w-11 h-6 rounded-full bg-[#f5b400] cursor-pointer">
                    <span className="inline-block w-4 h-4 bg-white rounded-full mt-1 ml-6 transition-transform" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                  <div>
                    <p className="text-sm text-white font-medium">UPI Payments</p>
                    <p className="text-xs text-gray-500 mt-0.5">Accept UPI payments via QR code</p>
                  </div>
                  <div className="relative inline-flex w-11 h-6 rounded-full bg-[#f5b400] cursor-pointer">
                    <span className="inline-block w-4 h-4 bg-white rounded-full mt-1 ml-6 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}
*/}

          {active === 'notifications' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-white border-b border-[#2a2a2a] pb-3">Notification Settings</h3>
              <div className="space-y-3">
                {[
                  ['New Booking Alert', 'Get notified when a new booking is placed', true],
                  ['Payment Received', 'Alert when payment is received from a customer', true],
                  ['Booking Cancellation', 'Alert when a customer cancels a booking', true],
                  ['Drone Enquiry', 'Notify on new drone show enquiries', true],
                  ['Daily Summary', 'Receive a daily report every morning at 8 AM', false],
                  ['Weekly Revenue Report', 'Get weekly revenue summary on Mondays', false],
                ].map(([label, desc, defaultOn]) => (
                  <div key={label} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                    <div>
                      <p className="text-sm text-white font-medium">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                    <div className={`relative inline-flex w-11 h-6 rounded-full cursor-pointer transition-colors ${defaultOn ? 'bg-[#f5b400]' : 'bg-gray-700'}`}>
                      <span className={`inline-block w-4 h-4 bg-white rounded-full mt-1 transition-transform ${defaultOn ? 'ml-6' : 'ml-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-white border-b border-[#2a2a2a] pb-3">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Current Password</label>
                  <input type="password" placeholder="Enter current password" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>New Password</label>
                  <input type="password" placeholder="Enter new password" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Confirm New Password</label>
                  <input type="password" placeholder="Re-enter new password" className={inputCls} />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                  <div>
                    <p className="text-sm text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500 mt-0.5">Add extra security with OTP verification</p>
                  </div>
                  <div className="relative inline-flex w-11 h-6 rounded-full cursor-pointer bg-gray-700">
                    <span className="inline-block w-4 h-4 bg-white rounded-full mt-1 ml-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 pt-5 border-t border-[#2a2a2a] flex items-center justify-end gap-3">
            {saved && <span className="text-sm text-green-400 font-medium">✓ Changes saved!</span>}
            <button onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
