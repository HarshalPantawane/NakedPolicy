import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { RiskBadge } from './components/RiskBadge';
import { RiskCard } from './components/RiskCard';
import { Button } from './components/Button';
import { Eye, Lock, Globe, ChevronRight, AlertCircle } from 'lucide-react';

interface SummaryData {
  critical: string[];
  concerning: string[];
  good: string[];
  standard: string[];
}

function App() {
  const [currentUrl, setCurrentUrl] = useState('example.com');
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  useEffect(() => {
    // Get the current tab URL
    if (chrome?.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          try {
            const url = new URL(tabs[0].url);
            setCurrentUrl(url.hostname);
          } catch (e) {
            // fallback
          }
        }
      });
    }
  }, []);

  const analyzePage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real extension, we would:
      // 1. Extract policy text from the current page
      // 2. Or fetch from common policy URLs
      
      // For demo, we'll use a sample text
      const samplePolicyText = `
Privacy Policy

We collect your personal information including name, email, phone number, and location data.
Your data may be shared with third-party advertisers and marketing partners.
We use cookies and tracking technologies to monitor your activity across websites.
Your data is stored indefinitely, even after account deletion.
We may sell your information if our company is acquired.
You have limited rights to access or delete your data.
We are not responsible for data breaches or unauthorized access.
      `.trim();

      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: samplePolicyText })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const summaryText = data.summary;

      // Parse the summary
      const sections: SummaryData = {
        critical: [],
        concerning: [],
        good: [],
        standard: []
      };

      const lines = summaryText.split('\n').filter((line: string) => line.trim());
      
      lines.forEach((line: string) => {
        if (line.includes('🚫')) {
          sections.critical.push(line.replace('🚫', '').trim());
        } else if (line.includes('⚠️')) {
          sections.concerning.push(line.replace('⚠️', '').trim());
        } else if (line.includes('✅')) {
          sections.good.push(line.replace('✅', '').trim());
        } else if (line.includes('ℹ️')) {
          sections.standard.push(line.replace('ℹ️', '').trim());
        }
      });

      setSummary(sections);

      // Determine risk level
      if (sections.critical.length > 2) {
        setRiskLevel('HIGH');
      } else if (sections.critical.length > 0 || sections.concerning.length > 3) {
        setRiskLevel('MEDIUM');
      } else {
        setRiskLevel('LOW');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze policy');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand-500/30">
      <Header />

      <main className="p-4 space-y-6">
        {/* Domain & Score */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs text-slate-400 hover:border-slate-700 transition-colors cursor-default">
            <Globe className="w-3 h-3" />
            {currentUrl}
          </div>

          {summary && (
            <div className="flex justify-center">
              <RiskBadge level={riskLevel} />
            </div>
          )}
        </div>

        {/* Analyze Button */}
        {!summary && !isLoading && (
          <div className="text-center">
            <Button 
              variant="primary" 
              onClick={analyzePage}
              className="w-full justify-center text-base py-3"
            >
              Analyze Privacy Policy
            </Button>
            <p className="text-xs text-slate-500 mt-2">
              Make sure backend is running on localhost:5000
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm text-slate-400">Analyzing policy...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-300 font-medium">Error</p>
                <p className="text-xs text-red-400 mt-1">{error}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Make sure the backend server is running
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Risk Grid */}
        {summary && !isLoading && (
          <div className="space-y-3">
            {summary.critical.length > 0 && (
              <RiskCard
                title="Critical Issues"
                icon={<AlertCircle className="w-4 h-4" />}
                items={summary.critical.slice(0, 3)}
                delay={100}
              />
            )}

            {summary.concerning.length > 0 && (
              <RiskCard
                title="Concerning Practices"
                icon={<Eye className="w-4 h-4" />}
                items={summary.concerning.slice(0, 3)}
                delay={200}
              />
            )}

            {summary.good.length > 0 && (
              <RiskCard
                title="Good Things"
                icon={<Lock className="w-4 h-4" />}
                items={summary.good.slice(0, 2)}
                delay={300}
              />
            )}

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                variant="primary" 
                icon={<ChevronRight className="w-4 h-4" />} 
                className="w-full justify-center text-base py-3"
                onClick={() => window.open(`http://localhost:5173`, '_blank')}
              >
                View Full Report
              </Button>
              <Button 
                variant="secondary" 
                className="w-full text-xs py-2 justify-center"
                onClick={analyzePage}
              >
                Re-analyze
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
