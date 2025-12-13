import React, { useState } from 'react';
import {
  Upload,
  UserPlus,
  QrCode,
  List,
  ArrowLeft,
  Star,
  Clipboard,
  ThumbsUp,
  MessageCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';

// Define the external URL for the 5-star rating path
const EXTERNAL_RATING_URL = 'https://g.co/gemini/share/41635e51d140';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  serviceDate: string;
  source: string;
  serviceType: string;
}

export const AddCustomer: React.FC = () => {
  // --- Admin Dashboard State ---
  const [view, setView] = useState<'upload' | 'manual' | 'qr_code' | 'list'>('upload');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const appId = 'unique-app-id-123'; // Mock App ID for URL generation

  // --- External Flow State ---
  // Flow states: 'dashboard', 'conversational_form', 'star_rating', 'final_feedback'
  const [currentFlow, setCurrentFlow] = useState<'dashboard' | 'conversational_form' | 'star_rating' | 'final_feedback'>('dashboard');
  const [tempRating, setTempRating] = useState(0); // Stores the selected star rating
  // Updated state to include serviceType for conversational flow data capture
  const [customerData, setCustomerData] = useState({ name: '', email: '', phone: '', serviceType: '' });

  // --- Custom Alert Box State and Functions ---
  const [alert, setAlert] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);

  const alertBox = (title: string, message: string, type: 'success' | 'error') => {
    setAlert({ title, message, type });
    setTimeout(() => setAlert(null), 5000); // Auto-hide after 5 seconds
  };

  // --- Admin Logic ---
  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      const mockCustomer: Customer = {
        id: Date.now(),
        name: 'CSV Upload Customer',
        phone: '555-1234',
        email: 'csv@example.com',
        serviceDate: new Date().toISOString().slice(0, 10),
        source: 'CSV',
        serviceType: 'N/A - CSV Upload',
      };

      setTimeout(() => {
        setCustomers((prev) => [...prev, mockCustomer]);
        alertBox('Success', 'CSV processed! 1 customer (mock) added. Automated sending initiated.', 'success');
        if (event.target) {
          event.target.value = '';
        }
      }, 1000);
    } else if (file) {
      alertBox('Error', 'Please upload a valid .csv file.', 'error');
    }
  };

  const [manualForm, setManualForm] = useState({ name: '', phone: '', email: '', serviceType: '' });
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setManualForm({ ...manualForm, [e.target.name]: e.target.value });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.phone || !manualForm.email) {
      alertBox('Validation Error', 'Name, Phone, and Email are mandatory fields.', 'error');
      return;
    }
    const newCustomer: Customer = {
      id: Date.now(),
      name: manualForm.name,
      phone: manualForm.phone,
      email: manualForm.email,
      serviceDate: 'N/A',
      // Explicitly check and trim manual service type
      serviceType: manualForm.serviceType.trim() || 'N/A - Manual Entry',
      source: 'Manual',
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setManualForm({ name: '', phone: '', email: '', serviceType: '' });
    alertBox('Success', `${newCustomer.name} added successfully! Automation triggered.`, 'success');
  };

  // --- Conversational Form Completion Handler ---
  const handleConversationalFormComplete = (data: { name: string; email: string; phone: string; serviceType: string }) => {
    // data structure: { name, email, phone, serviceType }
    const newCustomer: Customer = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      // Use the newly collected serviceType from the form
      serviceType: data.serviceType.trim() || 'N/A - QR Intake',
      serviceDate: new Date().toISOString().slice(0, 10),
      source: 'QR Code',
    };

    setCustomers((prev) => [...prev, newCustomer]);
    setCustomerData(data); // Save data for future reference if needed
    alertBox('Success', 'Customer details captured. Moving to rating selection.', 'success');
    setCurrentFlow('star_rating');
  };

  // --- Star Rating Submission Handler (Moves to Conditional Feedback) ---
  const handleRatingSubmit = (rating: number) => {
    setTempRating(rating);
    setCurrentFlow('final_feedback');
  };

  // --- Render Flow Management for Customer screens ---
  if (currentFlow === 'conversational_form') {
    return <ConversationalForm onSubmit={handleConversationalFormComplete} />;
  }

  if (currentFlow === 'star_rating') {
    return (
      <StarRatingStep
        onSubmitRating={handleRatingSubmit}
        onBack={() => setCurrentFlow('conversational_form')}
      />
    );
  }

  if (currentFlow === 'final_feedback') {
    return <FinalFeedbackScreen rating={tempRating} onFinish={() => setCurrentFlow('dashboard')} />;
  }

  // --- Default Admin Dashboard Render ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans antialiased">
      {/* Custom Alert Modal */}
      {alert && (
        <div
          role="alert"
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-sm w-full transition-opacity duration-300 ${
            alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{alert.title}</h3>
            <button onClick={() => setAlert(null)} className="text-white opacity-80 hover:opacity-100">
              &times;
            </button>
          </div>
          <p className="text-sm mt-1">{alert.message}</p>
        </div>
      )}

      {/* WIDENED CONTENT BLOCK: Increased max-w to 7xl */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
          Owner Customer Ingestion Dashboard
        </h1>

        {/* Navigation Tabs (Responsive) */}
        <div className="flex flex-wrap space-x-1 sm:space-x-2 border-b-2 border-gray-200 mb-8">
          <TabButton
            icon={Upload}
            label="CSV List"
            isActive={view === 'upload'}
            onClick={() => setView('upload')}
          />
          <TabButton
            icon={UserPlus}
            label="Manual Add"
            isActive={view === 'manual'}
            onClick={() => setView('manual')}
          />
          <TabButton
            icon={QrCode}
            label="QR Code Mini Form"
            isActive={view === 'qr_code'}
            onClick={() => setView('qr_code')}
          />
          <TabButton
            icon={List}
            label={`Customer List (${customers.length})`}
            isActive={view === 'list'}
            onClick={() => setView('list')}
          />
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {view === 'upload' && <UploadCsvSection handleCsvUpload={handleCsvUpload} />}

          {view === 'manual' && (
            <ManualAddSection
              form={manualForm}
              handleChange={handleManualChange}
              handleSubmit={handleManualSubmit}
            />
          )}

          {view === 'qr_code' && (
            <QRCodeSection
              onLaunchSim={() => setCurrentFlow('conversational_form')}
              appId={appId}
            />
          )}

          {view === 'list' && <CustomerList customers={customers} />}
        </div>
      </div>
    </div>
  );
};

// Reusable Tab Button Component
const TabButton: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition duration-200 ease-in-out whitespace-nowrap ${
      isActive
        ? 'bg-indigo-500 text-white shadow-lg'
        : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
    }`}
  >
    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    <span>{label}</span>
  </button>
);

// --- 3. QR Code Mini Form Section (Admin View) ---
const QRCodeSection: React.FC<{ onLaunchSim: () => void; appId: string }> = ({ onLaunchSim, appId }) => {
  const miniFormUrl = `https://your-platform.com/miniform?app=${appId}`;
  const qrCodePlaceholderUrl = `https://placehold.co/300x300/1e40af/ffffff?text=SCAN%20TO%20RATE%0A%5B${appId}%5D`;

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = miniFormUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    // NOTE: This alert is for the Admin Dashboard simulation, which is acceptable here.
    alert('Link copied to clipboard!');
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <QrCode className="w-6 h-6 mr-3 text-indigo-500" /> QR Code Mini Form Setup
        </h2>
        <p className="text-gray-600 mb-4">
          This QR code links directly to your unique Mini Form, which includes **mandatory contact
          collection and optional service description**.
        </p>

        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium text-gray-700 block">Unique Mini Form URL</label>
          <div className="flex w-full">
            <input
              type="text"
              readOnly
              value={miniFormUrl}
              className="flex-grow p-3 border border-gray-300 rounded-l-lg bg-gray-50 text-sm overflow-x-auto min-w-0"
            />
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 flex items-center p-3 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600 transition duration-150 text-sm font-medium whitespace-nowrap"
            >
              <Clipboard className="w-4 h-4 mr-1 sm:mr-2" />
              Copy Link
            </button>
          </div>
        </div>

        <button
          onClick={onLaunchSim}
          className="w-full py-3 px-4 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          Simulate Customer Scan & Mandatory Intake Flow
        </button>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg border">
        <img
          src={qrCodePlaceholderUrl}
          alt="Simulated QR Code"
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

// --- Conversational Form Component (MANDATORY FIELDS & MODERN DESIGN) ---
interface ConversationalFormProps {
  onSubmit: (data: { name: string; email: string; phone: string; serviceType: string }) => void;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', email: '', phone: '', serviceType: '' });
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // Define the conversational flow (Updated with optional serviceType)
  const flow = [
    {
      label: 'name',
      question: "What's your first name so we can personalize your experience?",
      confirmation: (name: string) => `Got it, thanks ${name}!`,
      type: 'text',
      validate: (value: string) => (value.trim().length > 0 ? null : 'Your name is required to proceed.'),
    },
    {
      label: 'email',
      question: (name: string) =>
        `Great, ${data.name}! We'll need your email address to send your receipt and updates.`,
      confirmation: (email: string) => `Perfect, we'll use ${email} to send updates.`,
      type: 'email',
      validate: (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'A valid email is required to proceed.',
    },
    {
      label: 'phone',
      question: (name: string) =>
        `Thank you, ${data.name}! Please share your phone number for quick service updates via text.`,
      confirmation: (phone: string) => `You're all set! We can now text you updates at ${phone}.`,
      type: 'tel',
      validate: (value: string) =>
        value.replace(/\D/g, '').length >= 10 ? null : 'A valid 10-digit phone number is required to proceed.',
    },
    {
      label: 'serviceType', // New optional field
      question: (name: string) =>
        `(${data.name}, optional) Can you briefly describe the service you received today (e.g., Oil Change, AC Repair, Haircut)?`,
      confirmation: (desc: string) =>
        desc.trim() ? `Service recorded as: ${desc}.` : "No service description provided. That's okay!",
      type: 'text',
      validate: (value: string) => {
        if (value.trim() === '') return null; // Allows skipping
        return value.trim().length < 3 ? 'Description must be at least 3 characters long if entered.' : null;
      },
    },
  ];

  const currentField = flow[step];
  const currentQuestion =
    typeof currentField?.question === 'function' ? currentField.question(data.name) : currentField?.question;

  const handleNext = () => {
    setError('');

    // --- Step 1: Input Validation & Save ---
    if (currentField) {
      const validationError = currentField.validate(input);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Save data
      setData((prev) => ({ ...prev, [currentField.label]: input.trim() }));

      // Show confirmation screen
      setStep(step + 0.5);
      setInput('');
    }
  };

  // Handles moving past the confirmation screen
  const handleConfirmAdvance = () => {
    if (Math.floor(step) < flow.length - 1) {
      setStep(Math.ceil(step)); // Move to the next full step
      setInput('');
    } else {
      // Final confirmation, complete the form
      onSubmit(data);
    }
  };

  // --- Render logic for the conversation ---
  const renderConversation = () => {
    // Confirmation Screen (e.g., step 0.5, 1.5, 2.5, 3.5)
    if (step % 1 !== 0) {
      const confirmedText = data[flow[Math.floor(step)].label as keyof typeof data];
      const confirmationMessage = flow[Math.floor(step)].confirmation(confirmedText);

      return (
        <>
          <div className="bg-indigo-100 p-4 rounded-xl text-indigo-800 font-medium mb-8 border border-indigo-200">
            {confirmationMessage}
          </div>
          <button
            onClick={handleConfirmAdvance}
            className="w-full py-4 text-lg font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            Continue <ChevronRight className="w-6 h-6 ml-2" />
          </button>
        </>
      );
    }

    // Question Screen (e.g., step 0, 1, 2, 3)
    const isOptionalStep = currentField.label === 'serviceType';

    return (
      <div className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-snug">{currentQuestion}</h2>

        <input
          type={currentField.type}
          placeholder={`Enter your ${currentField.label}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-xl placeholder-gray-400"
        />

        {error && <p className="text-red-600 text-sm font-medium pt-2">{error}</p>}

        <div className="pt-4">
          <button
            onClick={handleNext}
            className="w-full py-4 text-xl font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            {isOptionalStep ? 'Next (Optional)' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm sm:max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-8 border-indigo-600">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-2">Service Feedback</h1>

        {renderConversation()}

        {/* Total steps include 4 data points + 1 rating step = 5 total flow steps */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Step {Math.ceil(step) + 1} of {flow.length + 1}
        </p>
      </div>
    </div>
  );
};

// --- 5. Star Rating Step (UNMODIFIED) ---
const RatingStar: React.FC<{ size: number; isFilled: boolean }> = ({ size, isFilled }) => (
  <Star
    className={`w-6 h-6 transition-transform duration-100 ${
      isFilled ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'
    }`}
  />
);

const StarRatingStep: React.FC<{
  onSubmitRating: (rating: number) => void;
  onBack: () => void;
}> = ({ onSubmitRating, onBack }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onSubmitRating(selectedRating);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-yellow-500 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">How was your experience today?</h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Please select your rating below (1 star = Poor, 5 stars = Excellent).
        </p>

        {/* Responsive Stars */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-10">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              onClick={() => setSelectedRating(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 sm:p-2 rounded-full transform transition-all duration-200 focus:outline-none"
            >
              <RatingStar size={12} isFilled={index <= (hoverRating || selectedRating)} />
            </button>
          ))}
        </div>

        <p className="font-semibold text-lg mb-6 h-6 text-indigo-700">
          {selectedRating > 0 ? `Selected: ${selectedRating} Star${selectedRating !== 1 ? 's' : ''}` : 'Tap a star to select a rating'}
        </p>

        <button
          onClick={handleSubmit}
          disabled={selectedRating === 0}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-200 ${
            selectedRating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Submit Rating
        </button>

        <button
          onClick={onBack}
          className="mt-4 py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Details
        </button>
      </div>
    </div>
  );
};

// --- 6. Conditional Final Feedback Screen (UNMODIFIED) ---
const FinalFeedbackScreen: React.FC<{ rating: number; onFinish: () => void }> = ({ rating, onFinish }) => {
  // 5 Stars Logic: Encourage external review
  if (rating === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-green-500 text-center">
          <ThumbsUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">That's Great!</h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Thank you for the 5-star rating! We would be delighted if you could share your positive experience on
            our external rating page.
          </p>

          {/* External Rating Link */}
          <a
            href={EXTERNAL_RATING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3 px-4 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-200 mb-6"
          >
            <Star className="w-5 h-5 mr-2 fill-white" /> Leave External Review
          </a>

          <button
            onClick={onFinish}
            className="py-2 px-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Done
          </button>
        </div>
      </div>
    );
  }

  // 1-4 Stars Logic: Internal feedback/Follow-up (Deflection)
  else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-red-500 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">We're Sorry to Hear That.</h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Your feedback is important. A manager has been notified and will contact you via your provided phone or
            email shortly to address your concerns directly.
          </p>

          <button
            onClick={onFinish}
            className="w-full py-3 px-4 text-lg font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 mb-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> Close & Await Contact
          </button>

          <button
            onClick={onFinish}
            className="py-2 px-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Done
          </button>
        </div>
      </div>
    );
  }
};

// --- Admin Helper Sections (CSV, Manual, List) ---
const UploadCsvSection: React.FC<{
  handleCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleCsvUpload }) => (
  <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 transition duration-300">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      <Upload className="w-6 h-6 mr-3 text-indigo-500" /> Upload CSV List
    </h2>
    <p className="text-gray-600 mb-6">
      Fields required for automated sending:{' '}
      <span className="font-semibold text-indigo-600">Name, Phone, Email, Service Date</span>. Service description
      is assumed to be the same for the whole batch.
    </p>

    <label
      htmlFor="csv-upload"
      className="block w-full py-3 px-4 text-center text-white bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-200 shadow-md"
    >
      Select CSV File to Upload
    </label>
    <input id="csv-upload" type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />

    <p className="mt-4 text-sm text-gray-500">
      <span className="font-bold text-red-500">*</span> Automated sending will be triggered immediately after
      ingestion.
    </p>
  </div>
);

const ManualAddSection: React.FC<{
  form: { name: string; phone: string; email: string; serviceType: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ form, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
      <UserPlus className="w-6 h-6 mr-3 text-indigo-500" /> Manual Customer Entry
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField
        id="name"
        name="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Customer Full Name"
      />
      <InputField
        id="phone"
        name="phone"
        label="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        type="tel"
        placeholder="e.g., (555) 123-4567"
      />
      <InputField
        id="email"
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        required
        type="email"
        placeholder="email@domain.com"
      />

      {/* Updated Field for consistency */}
      <InputField
        id="serviceType"
        name="serviceType"
        label="Service Description (Optional)"
        value={form.serviceType}
        onChange={handleChange}
        required={false}
        placeholder="e.g., Oil Change, AC Repair, Haircut"
      />
    </div>

    <button
      type="submit"
      className="mt-8 w-full py-3 px-4 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
    >
      Add Customer & Begin Automation
    </button>
  </form>
);

const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}> = ({ id, name, label, value, onChange, required, type = 'text', placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
    />
  </div>
);

const CustomerList: React.FC<{ customers: Customer[] }> = ({ customers }) => (
  <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-inner border border-gray-100">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      <List className="w-6 h-6 mr-3 text-indigo-500" /> Customer Records ({customers.length})
    </h2>

    {customers.length === 0 ? (
      <div className="text-center py-10 text-gray-500 border rounded-lg">No customers added yet.</div>
    ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Email
            </th>
            {/* Consistent Label in List */}
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Service Description
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-indigo-50 transition duration-100">
              <td className="px-3 py-3 text-sm font-medium text-gray-900">{c.name}</td>
              <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">{c.phone}</td>
              <td className="px-3 py-3 text-sm text-gray-500 hidden sm:table-cell">{c.email}</td>
              {/* Display the captured service description */}
              <td className="px-3 py-3 text-sm text-gray-500 hidden md:table-cell">{c.serviceType || 'N/A'}</td>
              <td className="px-3 py-3 text-sm whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    c.source === 'QR Code'
                      ? 'bg-yellow-100 text-yellow-800'
                      : c.source === 'CSV'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {c.source}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

