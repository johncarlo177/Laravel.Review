import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CheckCircle, X, Clock, Filter, List, QrCode, TrendingUp, Send, Plug, Key, ArrowLeft, Upload, Settings, Home } from 'lucide-react';

const isProduction = false;

const mockGooglePlacesSearch = (query: string) => {
  if (query.length < 3) return [];
  const lowerQuery = query.toLowerCase();
  const suggestions = [
    { id: 1, name: "Alpha Tech Solutions", address: "123 Main St, Anytown, USA", category: "Software & Technology" },
    { id: 2, name: "Beta Consulting Group", address: "456 Oak Ave, Big City, USA", category: "Professional Services" },
    { id: 3, name: "Gamma Retail Co.", address: "789 Pine Ln, Smallville, USA", category: "Retail & E-commerce" },
  ];
  return suggestions.filter(s => s.name.toLowerCase().includes(lowerQuery));
};

const mockCreateDemoLead = async (email: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, userId: `lead_${Date.now()}` };
};

const mockCompleteBusinessProfile = async (userData: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true, dashboardUrl: "/dashboard" };
};

const INITIAL_USER_STATE = {
  id: '',
  email: '',
  name: '',
  businessName: '',
  businessAddress: '',
  businessCategory: '',
  phone: '',
  status: 'guest',
  role: 'public',
};

const SIMULATION_MESSAGES = {
  WIN_BACK: [
    { sender: 'AI', text: "Hi [Customer Name]! It looks like you haven't used our service in about 90 days. We miss you! Are you finding everything you need?" },
    { sender: 'Customer', text: "I've been busy, but I did notice your prices went up a bit." },
    { sender: 'AI', text: "Thanks for the feedback. To welcome you back, we're offering a special 15% discount code valid for the next 30 days. Ready to jump back in?" },
    { sender: 'Customer', text: "That's a great offer. I'll use it this week!" },
    { sender: 'AI', text: "Fantastic! We look forward to serving you. This automated engagement is now complete, providing resolution without requiring staff intervention." },
  ],
  COMPLAINT_FIRST: [
    { sender: 'Customer', text: "Service was slow, and my order was wrong. Leaving 1-star review." },
    { sender: 'AI', text: "We sincerely apologize for this experience. That's not the standard we uphold. To properly address this, may I get your name and a contact number or email for a direct follow-up?" },
    { sender: 'Customer', text: "It's Alex, my email is alex@example.com." },
    { sender: 'AI', text: "Thank beautiful! We've initiated a full refund and applied a 25% coupon for your next visit immediately. Does this resolution meet your satisfaction?" },
  ],
  STARS_RECOVERY_FLOW: [
    { sender: 'AI', text: "Thank you for your feedback. We are truly sorry to see you rated your experience poorly. We want to make this right immediately. Could you please tell us briefly what went wrong today?" },
    { sender: 'Customer', text: "The service was slow, and my order was wrong." }, 
    { sender: 'AI', text: "We understand. That's not the standard we uphold. To properly address this, may I get your name and a contact number or email for a direct follow-up?" },
    { sender: 'Customer', text: "It's Alex, my email is alex@example.com." },
    { sender: 'AI', text: "Thank beautiful! We've initiated a full refund and applied a 25% coupon for your next visit immediately. Does this resolution meet your satisfaction?" },
  ],
  STARS_SUCCESS_FLOW: [
    { sender: 'AI', text: "That's wonderful! We're so glad you had a 5-star experience today." },
    { sender: 'AI', text: "If you have a moment, sharing your positive feedback would help other customers find us! Would you like to leave a quick Google review?" },
  ],
  ESCALATION_FLOW: [
    { sender: 'Customer', text: "No, actually, the coupon isn't enough." },
    { sender: 'AI', text: "We understand that you are not satisfied yet. We are immediately escalating this to our Senior Customer Success team, who will contact you personally within the hour to ensure a complete and satisfactory resolution. Thank you for your patience." },
  ],
  SATISFACTION_CONFIRMED: { sender: 'Customer', text: "Yes, that's much better. Thank you for fixing this so quickly." },
  POST_SATISFACTION_REVIEW_PROMPT: { sender: 'AI', text: "Wonderful! We'd love for you to share your updated experience. Here is an FTC-safe link to revise your public review." },
};

const GoogleReviewModal = ({ isOpen, onClose, initialRating, businessName }: {
  isOpen: boolean;
  onClose: () => void;
  initialRating: number;
  businessName: string;
}) => {
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [reviewText, setReviewText] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentRating(initialRating);
      setIsReviewSubmitted(false);
      setReviewText('');
    }
  }, [isOpen, initialRating]);

  if (!isOpen) return null;

  const handlePostReview = () => {
    setIsReviewSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl transform transition-all duration-300">
        <div className="p-6 md:p-6 space-y-4">
          <div className="flex items-center space-x-3 border-b pb-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              G
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Rate Your Visit</h3>
              <p className="text-sm text-gray-500">{businessName || 'Neviane Demo Business'}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-1 py-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={`review-star-${star}`}
                onClick={() => setCurrentRating(star)}
                className={`text-4xl transition-transform hover:scale-110`}
                style={{ color: star <= currentRating ? '#FFC107' : '#E0E0E0' }}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share more details (optional)"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          {isReviewSubmitted ? (
            <div className="text-center py-2 text-green-600 font-semibold bg-green-50 rounded-lg">
              Review Posted! (Demo)
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                onClick={handlePostReview}
                disabled={currentRating === 0}
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
              >
                Post Review
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Not now
              </button>
              <p className="text-xs text-center text-red-500 pt-2">
                *DEMO MODE: No real review will be posted to Google.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LiveSimulation = ({ userStatus, onFirstInteraction }: {
  userStatus: string;
  onFirstInteraction: () => void;
}) => {
  const [simulationType, setSimulationType] = useState('RECOVERY');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [flowState, setFlowState] = useState('RATING');
  const [rating, setRating] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [hasInteractedWithSimulation, setHasInteractedWithSimulation] = useState(false);
  const [isCustomerSatisfied, setIsCustomerSatisfied] = useState(false);

  const baseFlow = isAdvancedMode ? SIMULATION_MESSAGES.COMPLAINT_FIRST : SIMULATION_MESSAGES.STARS_RECOVERY_FLOW;
  const isRecoveryFlow = simulationType === 'RECOVERY' && !isAdvancedMode;
  const isComplaintFlow = simulationType === 'RECOVERY' && isAdvancedMode;

  const messagesToDisplay = useMemo(() => {
    if (simulationType === 'WIN_BACK') return SIMULATION_MESSAGES.WIN_BACK;
    if (flowState === 'SUCCESS_REVIEW') return SIMULATION_MESSAGES.STARS_SUCCESS_FLOW;
    if (flowState === 'SATISFIED_ENDING') {
      const stepsBeforeOffer = baseFlow.slice(0, baseFlow.length - 1);
      return [...stepsBeforeOffer, SIMULATION_MESSAGES.SATISFACTION_CONFIRMED, SIMULATION_MESSAGES.POST_SATISFACTION_REVIEW_PROMPT];
    }
    if (flowState === 'ESCALATED_ENDING') {
      const stepsBeforeOffer = baseFlow.slice(0, baseFlow.length - 1);
      return [...stepsBeforeOffer, ...SIMULATION_MESSAGES.ESCALATION_FLOW];
    }
    return baseFlow;
  }, [simulationType, isAdvancedMode, flowState, rating]);

  const startSimulation = useCallback((initialType = simulationType, initialAdvanced = isAdvancedMode) => {
    setCurrentStep(0);
    setMessages([]);
    setRating(0); 
    setIsReviewModalOpen(false);
    setIsCustomerSatisfied(false);
    setSimulationType(initialType);
    setIsAdvancedMode(initialAdvanced);
    if (initialType === 'RECOVERY' && !initialAdvanced) {
      setFlowState('RATING');
    } else {
      setFlowState('CHAT_ACTIVE');
      const initialMessages = initialType === 'WIN_BACK' ? SIMULATION_MESSAGES.WIN_BACK : SIMULATION_MESSAGES.COMPLAINT_FIRST;
      if (initialMessages.length > 0) {
        setTimeout(() => {
          setMessages([initialMessages[0]]);
          setCurrentStep(1);
        }, 500);
      }
    }
  }, [simulationType, isAdvancedMode]);

  const handleTypeChange = (newType: string) => {
    setSimulationType(newType);
    startSimulation(newType, isAdvancedMode);
  };

  const handleAdvancedToggle = () => {
    const newAdvancedMode = !isAdvancedMode;
    setIsAdvancedMode(newAdvancedMode);
    if (simulationType === 'RECOVERY') {
      startSimulation('RECOVERY', newAdvancedMode);
    }
  };

  const handleRatingSelect = (newRating: number) => {
    if (!hasInteractedWithSimulation) {
      if (typeof onFirstInteraction === 'function') {
        onFirstInteraction();
      }
      setHasInteractedWithSimulation(true);
    }
    setRating(newRating);
    setMessages([]);
    if (newRating === 5) {
      setFlowState('SUCCESS_REVIEW');
      setMessages(SIMULATION_MESSAGES.STARS_SUCCESS_FLOW.slice(0, 1));
      setCurrentStep(1); 
    } else { 
      setFlowState('CHAT_ACTIVE');
      setMessages(SIMULATION_MESSAGES.STARS_RECOVERY_FLOW.slice(0, 1));
      setCurrentStep(1);
    }
  };

  useEffect(() => {
    startSimulation(simulationType, isAdvancedMode);
  }, [startSimulation]);

  const handleNextMessage = () => {
    if (flowState === 'AWAIT_SATISFACTION') {
      return; 
    }
    if (!hasInteractedWithSimulation && flowState !== 'RATING') {
      if (typeof onFirstInteraction === 'function') {
        onFirstInteraction();
      }
      setHasInteractedWithSimulation(true);
    }
    
    const currentFlowMessages = simulationType === 'WIN_BACK' ? SIMULATION_MESSAGES.WIN_BACK : baseFlow;
    const nextStepIndex = currentStep;
    
    if (nextStepIndex < currentFlowMessages.length) {
      const nextMessage = currentFlowMessages[nextStepIndex];
      const delay = nextMessage.sender === 'AI' ? 700 : 300;
      
      const isSatisfactionOfferStep = (isRecoveryFlow || isComplaintFlow) && nextStepIndex === baseFlow.length - 1;
      setTimeout(() => {
        setMessages(prev => [...prev, nextMessage]);
        setCurrentStep(prev => prev + 1);
        if (isSatisfactionOfferStep) {
          setFlowState('AWAIT_SATISFACTION');
        }
        if (flowState === 'SUCCESS_REVIEW' && nextStepIndex === SIMULATION_MESSAGES.STARS_SUCCESS_FLOW.length - 1) {
          setIsReviewModalOpen(true);
        }
      }, delay);
    }
  };

  const handleSatisfactionChoice = (satisfied: boolean) => {
    setIsReviewModalOpen(false);
    setIsCustomerSatisfied(satisfied);
    
    if (satisfied) {
      setFlowState('SATISFIED_ENDING');
      const satisfiedMessages = [...messages, SIMULATION_MESSAGES.SATISFACTION_CONFIRMED, SIMULATION_MESSAGES.POST_SATISFACTION_REVIEW_PROMPT];
      setMessages(satisfiedMessages);
      setCurrentStep(satisfiedMessages.length);
      setTimeout(() => setIsReviewModalOpen(true), 500);
    } else {
      setFlowState('ESCALATED_ENDING');
      const escalatedMessages = [...messages, ...SIMULATION_MESSAGES.ESCALATION_FLOW];
      setMessages(escalatedMessages);
      setCurrentStep(escalatedMessages.length);
    }
  };

  const isComplete = (flowState !== 'RATING' && flowState !== 'AWAIT_SATISFACTION') && currentStep >= messagesToDisplay.length;

  const StarSelector = () => (
    <div className="flex justify-center space-x-2 p-4 bg-gray-100 rounded-xl shadow-inner">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => handleRatingSelect(star)}
          className={`text-4xl transition-transform hover:scale-110 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          aria-label={`${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 transition-all duration-300">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span className='flex flex-col sm:flex-row sm:items-center'>
            {simulationType === 'RECOVERY' ? '⚡ AI Recovery Engine Demo' : '🎯 Win-Back Engine Demo'}
            <span className="ml-0 sm:ml-2 text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full mt-1 sm:mt-0">LIVE</span>
          </span>
          {simulationType === 'RECOVERY' && (
            <button
              onClick={handleAdvancedToggle}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                isAdvancedMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAdvancedMode ? 'Standard Mode' : 'Advanced Demo'}
            </button>
          )}
        </h3>
        
        {simulationType === 'RECOVERY' && (
          <p className={`text-xs text-gray-500 mb-4 transition-opacity duration-300 ${flowState === 'RATING' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            {isAdvancedMode ? 'Advanced Demo: Complaint-first flow (No initial rating).' : 'Standard Demo: Starts with 1-5 star selection.'}
          </p>
        )}
        <div className="flex justify-start space-x-2 mb-4">
          <button
            onClick={() => handleTypeChange('RECOVERY')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              simulationType === 'RECOVERY' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
            }`}
          >
            Customer Recovery
          </button>
          <button
            onClick={() => handleTypeChange('WIN_BACK')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              simulationType === 'WIN_BACK' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
            }`}
          >
            Customer Win-Back
          </button>
        </div>
        <div className="h-80 overflow-y-auto bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 space-y-3">
          {flowState === 'RATING' && simulationType === 'RECOVERY' && !isAdvancedMode && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-lg font-semibold mb-4">How was your experience today?</p>
              <StarSelector />
              <p className="text-xs text-gray-500 mt-4">Select 1 to 5 stars to start the demo.</p>
            </div>
          )}
          {flowState !== 'RATING' && messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-md transition-all duration-300 transform ${
                  msg.sender === 'AI'
                    ? 'bg-indigo-100 text-indigo-900 rounded-tl-none'
                    : 'bg-white text-gray-800 rounded-tr-none border border-gray-100'
                }`}
              >
                <span className={`font-semibold text-xs ${msg.sender === 'AI' ? 'text-indigo-700' : 'text-gray-500'}`}>{msg.sender}: </span>
                {msg.text.replace(/\[Customer Name\]/g, 'Alex')}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-red-600 font-semibold mb-3">
          ⚠️ Live Demo — No real messages are sent or data saved.
        </p>
        {flowState === 'AWAIT_SATISFACTION' ? (
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => handleSatisfactionChoice(true)}
              className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition duration-150"
            >
              Yes, I am Satisfied
            </button>
            <button
              onClick={() => handleSatisfactionChoice(false)}
              className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition duration-150"
            >
              No, Escalate
            </button>
          </div>
        ) : isComplete ? (
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => startSimulation(simulationType, isAdvancedMode)}
              className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition duration-150"
            >
              Run Again
            </button>
          </div>
        ) : (
          <div className="flex justify-center space-x-3">
            {flowState === 'RATING' && simulationType === 'RECOVERY' && !isAdvancedMode ? (
              <span className="h-12 w-full"></span>
            ) : (
              <button
                onClick={handleNextMessage}
                disabled={currentStep > messages.length}
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
              >
                {currentStep === 0 ? 'Start Demo' : 'Next Action'}
              </button>
            )}
          </div>
        )}
      </div>
      <GoogleReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        initialRating={rating || 5}
        businessName="Neviane Demo Business"
      />
    </>
  );
};

const ProgressiveSignupModal = ({ isOpen, onClose, user, setUser, onComplete }: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  setUser: (user: any) => void;
  onComplete: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(user.email);
  const [businessName, setBusinessName] = useState(user.businessName);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [tempAddress, setTempAddress] = useState(user.businessAddress);
  const [tempCategory, setTempCategory] = useState(user.businessCategory);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsLoading(false);
    } else if (user.status === 'demo_lead') {
      setStep(2);
    }
  }, [isOpen, user.status]);

  useEffect(() => {
    if (step === 2 && businessName.length > 2 && !isManualEntry) {
      const results = mockGooglePlacesSearch(businessName);
      setSuggestions(results);
      if (results.length === 1) {
        handleSelectSuggestion(results[0]);
      }
    } else {
      setSuggestions([]);
    }
  }, [businessName, step, isManualEntry]);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsLoading(true);
    try {
      const { userId } = await mockCreateDemoLead(email);
      const newUser = { ...user, id: userId, email, status: 'demo_lead' };
      setUser(newUser);
      setStep(2);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    setBusinessName(suggestion.name);
    setTempAddress(suggestion.address);
    setTempCategory(suggestion.category);
    setSuggestions([]);
    setIsManualEntry(false);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !tempAddress || !tempCategory) return;
    const newUser = {
      ...user,
      businessName,
      businessAddress: tempAddress,
      businessCategory: tempCategory,
      status: 'full_lead',
    };
    setUser(newUser);
    setStep(3);
  };

  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (e && !name) return; 
    if (!user.businessName && businessName) {
      handleStep2Submit(e as any);
    }
    setIsLoading(true);
    const finalData = {
      ...user,
      name: name || user.name,
      phone: phone || user.phone,
      status: 'full_lead',
    };
    setUser(finalData);
    try {
      await mockCompleteBusinessProfile(finalData);
      onComplete();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const currentTitle = useMemo(() => {
    if (step === 1) return '1/3: Get Instant Demo Access';
    if (step === 2) return '2/3: Personalize Your Simulation';
    return '3/3: Optional Contact Details';
  }, [step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">{currentTitle}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-6">
            <div
              className={`h-full bg-indigo-500 rounded-full transition-all duration-500 ${
                step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
              }`}
            ></div>
          </div>
          <form onSubmit={(step === 1 ? handleStep1Submit : step === 2 ? handleStep2Submit : handleFinalSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@yourbusiness.com"
                />
                <p className="text-xs text-gray-500 mt-1">We need this to save your demo progress and connect your account.</p>
                <button
                  type="submit"
                  disabled={isLoading || !email.includes('@')}
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                >
                  {isLoading ? 'Saving Lead...' : 'Unlock Demo Access'}
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setIsManualEntry(false);
                    setTempAddress('');
                    setTempCategory('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Apex Dental"
                />
                {suggestions.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {suggestions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSuggestion(s)}
                        className="p-3 hover:bg-indigo-50 cursor-pointer border-b last:border-b-0"
                      >
                        <p className="font-semibold text-sm">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.address}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!isManualEntry && businessName.length > 0 && suggestions.length === 0 && (
                  <button type="button" onClick={() => {
                    setIsManualEntry(true);
                    setTempAddress("");
                    setTempCategory("");
                  }} className="text-indigo-600 text-sm hover:text-indigo-800">
                    No match? Enter details manually.
                  </button>
                )}
                {(tempAddress || tempCategory || isManualEntry) && (
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 space-y-3">
                    <p className="text-sm font-medium text-indigo-700">
                      {isManualEntry ? 'Manual Business Details:' : 'Auto-suggested Details:'}
                    </p>
                    <div>
                      <label htmlFor="manualAddress" className="block text-xs font-medium text-indigo-700">Address</label>
                      <input
                        id="manualAddress"
                        type="text"
                        required
                        value={tempAddress}
                        onChange={(e) => setTempAddress(e.target.value)}
                        disabled={!isManualEntry && businessName.length > 0 && suggestions.length === 0}
                        className={`w-full px-3 py-2 text-sm rounded-lg ${!isManualEntry ? 'bg-indigo-100 text-gray-600' : 'bg-white border border-indigo-300'}`}
                        placeholder="123 Example Street"
                      />
                    </div>
                    <div>
                      <label htmlFor="manualCategory" className="block text-xs font-medium text-indigo-700">Category</label>
                      <input
                        id="manualCategory"
                        type="text"
                        required
                        value={tempCategory}
                        onChange={(e) => setTempCategory(e.target.value)}
                        disabled={!isManualEntry && businessName.length > 0 && suggestions.length === 0}
                        className={`w-full px-3 py-2 text-sm rounded-lg ${!isManualEntry ? 'bg-indigo-100 text-gray-600' : 'bg-white border border-indigo-300'}`}
                        placeholder="Retail & E-commerce"
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs text-green-600 font-medium">
                  ✓ This helps personalize your demo — not public.
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !businessName || !tempAddress || !tempCategory}
                    className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                  >
                    Continue to Contact
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner / Primary Contact Name</label>
                  <input
                    id="ownerName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-xs text-gray-400">(Optional)</span></label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="(555) 555-5555"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used only for urgent recovery alerts (optional).</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleFinalSubmit()}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    Skip & View Demo
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !name}
                    className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving Profile...' : 'Save Profile & Launch Dashboard'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const HighIntentForm = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (businessName.length > 2) {
      const results = mockGooglePlacesSearch(businessName);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [businessName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">Book A Live Demo (High-Intent)</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              id="bookName"
              type="text"
              required
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label htmlFor="bookEmail" className="block text-sm font-medium text-gray-700">Business Email</label>
            <input
              id="bookEmail"
              type="email"
              required
              value={bookEmail}
              onChange={(e) => setBookEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="john@smithcorp.com"
            />
          </div>
          <div>
            <label htmlFor="bookBusiness" className="block text-sm font-medium text-gray-700">Business Name (Auto-suggest)</label>
            <input
              id="bookBusiness"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Apex Dental"
            />
            {suggestions.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto mt-2">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setBusinessName(s.name);
                      setSuggestions([]);
                    }}
                    className="p-3 hover:bg-indigo-50 cursor-pointer text-sm border-b last:border-b-0"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="bookPhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="bookPhone"
              type="tel"
              required
              value={bookPhone}
              onChange={(e) => setBookPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="(555) 555-5555"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Submit & Route to Scheduler'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const LiveSimulationSection = () => {
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [showDemoSuccess, setShowDemoSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [promptedSignup, setPromptedSignup] = useState(false);

  const handleProgressiveSignupComplete = () => {
    setIsSignupOpen(false);
    setShowDemoSuccess(true);
    setTimeout(() => setShowDemoSuccess(false), 5000);
  };

  const handleFirstInteraction = useCallback(() => {
    if (user.status === 'guest' && !hasInteracted && !promptedSignup) {
      setIsSignupOpen(true);
      setPromptedSignup(true);
      setHasInteracted(true);
    }
  }, [user.status, hasInteracted, promptedSignup]);

  useEffect(() => {
    if (user.status === 'guest' && !promptedSignup) {
      const videoElement = videoRef.current;
      if (videoElement) {
        const checkTime = () => {
          if (videoElement.currentTime >= 15 && !promptedSignup) {
            setIsSignupOpen(true);
            setPromptedSignup(true);
          }
        };
        videoElement.addEventListener('timeupdate', checkTime);
        return () => videoElement.removeEventListener('timeupdate', checkTime);
      }
    }
  }, [user.status, promptedSignup]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {showDemoSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative transition-all duration-300" role="alert">
            <p className="font-bold">Profile Saved!</p>
            <p className="text-sm">We are preparing your personalized dashboard access. You now have full demo privileges.</p>
          </div>
        )}

        <div className="text-center pt-8 pb-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Stop Churn. <span className="text-indigo-600">Start Recovery.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Our AI Win-Back Engine automatically converts negative feedback into loyal customers and brings back inactive accounts, guaranteed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setIsSignupOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-extrabold text-lg rounded-xl shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-100"
            >
              Try the Demo: See It In Action
            </button>
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 text-indigo-600 font-extrabold text-lg rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition duration-300"
            >
              Book Live Demo
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-6">How Our Engine Works (90 Seconds)</h2>
          <div className="relative aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center pointer-events-none">
              <span className="text-white text-xl font-bold p-3 bg-black bg-opacity-50 rounded-lg">
                Demo Video Preview (Autoplay Muted)
              </span>
            </div>
            {user.status !== 'guest' && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                FULL ACCESS UNLOCKED!
              </div>
            )}
          </div>
        </div>

        <div id="simulation" className="py-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            Interact With Our AI: <span className="text-indigo-600">The Live Simulation</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <LiveSimulation userStatus={user.status} onFirstInteraction={handleFirstInteraction} />
          </div>
        </div>
      </div>

      <ProgressiveSignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        user={user}
        setUser={setUser}
        onComplete={handleProgressiveSignupComplete}
      />

      <HighIntentForm
        isOpen={isBookDemoOpen}
        onClose={() => setIsBookDemoOpen(false)}
      />
    </section>
  );
};

