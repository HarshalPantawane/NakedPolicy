import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, Shield, Zap, Users } from 'lucide-react';

export default function NackedPolicyApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setSummary({
          title: file.name,
          keyPoints: [
            "Data Collection: The service collects personal information including name, email, and usage data",
            "Third-Party Sharing: Your data may be shared with analytics providers and marketing partners",
            "Retention Period: Personal data is retained for 2 years after account closure",
            "User Rights: You have the right to access, modify, or delete your personal data",
            "Cookies: The service uses both essential and non-essential cookies for functionality and analytics",
            "Security Measures: Industry-standard encryption (TLS 1.3) is used to protect data in transit",
            "Age Restrictions: Users must be 16 years or older to use this service",
            "Policy Updates: Users will be notified via email of any material changes to the policy",
            "Liability Limits: The service limits liability to the amount paid in the last 12 months",
            "Dispute Resolution: Disputes must be resolved through binding arbitration"
          ],
          risk: 'medium'
        });
        setIsProcessing(false);
      }, 2000);
    }
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Nacked Policy</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-300 hover:text-white transition px-4 py-2">
                Sign In
              </button>
              <button className="text-slate-300 hover:text-white transition px-4 py-2">
                Log In
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Pricing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Turn Complex Policies Into Clear Summaries
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Stop wasting hours reading lengthy policy documents. Get instant, bullet-point summaries that highlight what really matters.
            </p>
            <button
              onClick={() => setCurrentPage('service')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Try It Now - Free
            </button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/30">
              <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">Data is encrypted at rest and in transit</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">You retain full ownership of your data</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">Third-party analytics may track usage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
            <Zap className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-300">
              Get comprehensive summaries in seconds, not hours. Our AI processes documents instantly.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
            <Shield className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
            <p className="text-slate-300">
              Your documents are processed securely and never stored on our servers permanently.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
            <Users className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Trusted by Thousands</h3>
            <p className="text-slate-300">
              Join thousands of users who save time understanding policies every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentPage('landing')}
            >
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Nacked Policy</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-300 hover:text-white transition px-4 py-2">
                Sign In
              </button>
              <button className="text-slate-300 hover:text-white transition px-4 py-2">
                Log In
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Pricing
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Policy Document Summarizer
          </h1>
          <p className="text-xl text-slate-300">
            Upload any policy document and get a clear, bullet-point summary
          </p>
        </div>

        {/* Upload Section */}
        {!summary && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-slate-600 p-12 text-center">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer inline-block"
            >
              <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-xl text-white mb-2">
                Drop your policy document here
              </p>
              <p className="text-slate-400 mb-6">
                or click to browse (PDF, DOC, DOCX, TXT)
              </p>
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition inline-block">
                Choose File
              </span>
            </label>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-white">Analyzing your policy document...</p>
          </div>
        )}

        {/* Summary Display */}
        {summary && !isProcessing && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Summary: {summary.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      summary.risk === 'low' ? 'bg-green-500/20 text-green-300' :
                      summary.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {summary.risk.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setSummary(null);
                  }}
                  className="text-slate-400 hover:text-white transition"
                >
                  Upload New
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Key Points:</h3>
                {summary.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-slate-900/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-200">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition">
                Download Summary
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg transition">
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return currentPage === 'landing' ? <LandingPage /> : <ServicePage />;
}