import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, Shield, Zap, Users, Mail, Lock, User, Chrome, Github, Eye, EyeOff, Check, Target, TrendingUp, Heart, DollarSign, Star } from 'lucide-react';

export default function NakedPolicyApp() {
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
                            <span className="text-2xl font-bold text-white">Naked Policy</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setCurrentPage('pricing')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Log In
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

            {/* About Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        About Naked Policy
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        We're on a mission to make complex policy documents simple and accessible for everyone.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                        <Target className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Every day, millions of people click "I agree" to policies they've never read. We believe everyone deserves to understand what they're agreeing to without spending hours decoding legal jargon.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Naked Policy uses advanced AI to break down complex documents into clear, actionable summaries—giving you the power to make informed decisions in seconds.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/30">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
                                <div className="text-slate-300">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
                                <div className="text-slate-300">Policies Analyzed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                                <div className="text-slate-300">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">4.9/5</div>
                                <div className="text-slate-300">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-white text-center mb-12">How It Works</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">1. Upload</h4>
                            <p className="text-slate-300">
                                Upload any policy document in PDF, DOC, or TXT format
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">2. Analyze</h4>
                            <p className="text-slate-300">
                                Our AI processes the document and identifies key points
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">3. Understand</h4>
                            <p className="text-slate-300">
                                Get a clear summary with risk assessment in seconds
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Privacy First</h4>
                                <p className="text-slate-300">Your documents are encrypted and never stored permanently on our servers</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <TrendingUp className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Constantly Improving</h4>
                                <p className="text-slate-300">Our AI learns and improves with every document analyzed</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Zap className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Lightning Fast</h4>
                                <p className="text-slate-300">Get comprehensive summaries in under 3 seconds</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Heart className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">User Focused</h4>
                                <p className="text-slate-300">Built based on real user feedback and needs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of users who are making smarter decisions every day
                    </p>
                    <button
                        onClick={() => setCurrentPage('service')}
                        className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                    >
                        Try It Free Now
                    </button>
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
                            <button
                                onClick={() => setCurrentPage('about')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                About
                            </button>
                            <button
                                onClick={() => setCurrentPage('pricing')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Log In
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
                                        <span className={`px-3 py-1 rounded-full text-sm ${summary.risk === 'low' ? 'bg-green-500/20 text-green-300' :
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

    const SignInPage = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        return (
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
                                <button
                                    onClick={() => setCurrentPage('login')}
                                    className="text-slate-300 hover:text-white transition px-4 py-2"
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Sign In Form */}
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-slate-400">Join thousands saving time on policies</p>
                        </div>

                        {/* Social Sign In */}
                        <div className="space-y-3 mb-6">
                            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2">
                                <Chrome className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2">
                                <Github className="w-5 h-5" />
                                <span>Continue with GitHub</span>
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with email</span>
                            </div>
                        </div>

                        {/* Sign In Form */}
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="w-4 h-4 bg-slate-900 border-slate-600 rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-slate-400">
                                    I agree to the <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span> and <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                            >
                                Create Account
                            </button>
                        </form>

                        <p className="mt-6 text-center text-slate-400 text-sm">
                            Already have an account?{' '}
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Log In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const LoginPage = () => {
        const [showPassword, setShowPassword] = useState(false);

        return (
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
                                <button
                                    onClick={() => setCurrentPage('signin')}
                                    className="text-slate-300 hover:text-white transition px-4 py-2"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Login Form */}
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p className="text-slate-400">Log in to continue to Naked Policy</p>
                        </div>

                        {/* Social Login */}
                        <div className="space-y-3 mb-6">
                            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2">
                                <Chrome className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2">
                                <Github className="w-5 h-5" />
                                <span>Continue with GitHub</span>
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with email</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 bg-slate-900 border-slate-600 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                                        Remember me
                                    </label>
                                </div>
                                <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                            >
                                Log In
                            </button>
                        </form>

                        <p className="mt-6 text-center text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const AboutPage = () => (
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
                            <button
                                onClick={() => setCurrentPage('about')}
                                className="text-white border-b-2 border-blue-400 px-4 py-2"
                            >
                                About
                            </button>
                            <button
                                onClick={() => setCurrentPage('pricing')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        About Naked Policy
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        We're on a mission to make complex policy documents simple and accessible for everyone.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                        <Target className="w-12 h-12 text-blue-400 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Every day, millions of people click "I agree" to policies they've never read. We believe everyone deserves to understand what they're agreeing to without spending hours decoding legal jargon.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Naked Policy uses advanced AI to break down complex documents into clear, actionable summaries—giving you the power to make informed decisions in seconds.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/30">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
                                <div className="text-slate-300">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
                                <div className="text-slate-300">Policies Analyzed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                                <div className="text-slate-300">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">4.9/5</div>
                                <div className="text-slate-300">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">1. Upload</h3>
                            <p className="text-slate-300">
                                Upload any policy document in PDF, DOC, or TXT format
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">2. Analyze</h3>
                            <p className="text-slate-300">
                                Our AI processes the document and identifies key points
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">3. Understand</h3>
                            <p className="text-slate-300">
                                Get a clear summary with risk assessment in seconds
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Privacy First</h3>
                                <p className="text-slate-300">Your documents are encrypted and never stored permanently on our servers</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <TrendingUp className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Constantly Improving</h3>
                                <p className="text-slate-300">Our AI learns and improves with every document analyzed</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Zap className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
                                <p className="text-slate-300">Get comprehensive summaries in under 3 seconds</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex items-start space-x-4">
                            <Heart className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">User Focused</h3>
                                <p className="text-slate-300">Built based on real user feedback and needs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of users who are making smarter decisions every day
                    </p>
                    <button
                        onClick={() => setCurrentPage('service')}
                        className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                    >
                        Try It Free Now
                    </button>
                </div>
            </div>
        </div>
    );

    const PricingPage = () => (
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
                            <button
                                onClick={() => setCurrentPage('about')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                About
                            </button>
                            <button
                                onClick={() => setCurrentPage('pricing')}
                                className="text-white border-b-2 border-blue-400 px-4 py-2"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => setCurrentPage('signin')}
                                className="text-slate-300 hover:text-white transition px-4 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Pricing Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Choose the plan that's right for you. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Free Plan */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$0</span>
                            <span className="text-slate-400">/month</span>
                        </div>
                        <p className="text-slate-300 mb-6">Perfect for trying out the service</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">5 documents per month</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Basic summaries</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Risk assessment</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Email support</span>
                            </li>
                        </ul>
                        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan - Highlighted */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 relative transform scale-105 shadow-2xl">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-yellow-400 text-slate-900 text-sm font-bold px-4 py-1 rounded-full">
                                MOST POPULAR
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$12</span>
                            <span className="text-blue-100">/month</span>
                        </div>
                        <p className="text-blue-100 mb-6">For individuals and professionals</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">Unlimited documents</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">Advanced AI summaries</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">Detailed risk analysis</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">Priority support</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">Export to PDF/Word</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-white">API access</span>
                            </li>
                        </ul>
                        <button className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-4 rounded-lg transition transform hover:scale-105">
                            Start Free Trial
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">Custom</span>
                        </div>
                        <p className="text-slate-300 mb-6">For teams and organizations</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Everything in Pro</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Custom AI training</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">Dedicated support</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">SSO integration</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">SLA guarantee</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">On-premise option</span>
                            </li>
                        </ul>
                        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition">
                            Contact Sales
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-bold text-white mb-2">Can I cancel my subscription anytime?</h3>
                            <p className="text-slate-300">Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-bold text-white mb-2">What payment methods do you accept?</h3>
                            <p className="text-slate-300">We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-bold text-white mb-2">Is there a free trial for Pro?</h3>
                            <p className="text-slate-300">Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                            <h3 className="text-lg font-bold text-white mb-2">How secure is my data?</h3>
                            <p className="text-slate-300">We use industry-standard encryption (TLS 1.3) for all data in transit and at rest. Documents are processed securely and not stored permanently.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render appropriate page based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage />;
            case 'service':
                return <ServicePage />;
            case 'signin':
                return <SignInPage />;
            case 'login':
                return <LoginPage />;
            case 'about':
                return <AboutPage />;
            case 'pricing':
                return <PricingPage />;
            default:
                return <LandingPage />;
        }
    };

    return renderPage();

}
