import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Step } from '../types';
import { CheckCircle, AlertTriangle, Loader2, XCircle, Play } from 'lucide-react';

interface CodeEditorProps {
  steps: Step[];
  testName: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ steps, testName }) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const generateCode = () => {
    const stepLines = steps.map(step => {
      switch (step.type) {
        case 'goto':
          return `  await page.goto('${step.target}');`;
        case 'click':
          return `  await page.click('${step.target}');`;
        case 'fill':
           return `  await page.fill('${step.target}', 'value');`;
        case 'waitForLoadState':
          return `  await page.waitForLoadState('${step.target}');`;
        case 'expect':
          return `  await expect(page.locator('${step.target}')).toBeVisible();`;
        case 'think':
          return `  await page.waitForTimeout(${step.target});`;
        default:
          return `  // ${step.type} ${step.target}`;
      }
    }).join('\n');

    return `import { test, expect } from '@playwright/test';

test('${testName || 'Untitled Test'}', async ({ page }) => {
${stepLines}
});`;
  };

  const handleVerify = () => {
    setVerificationStatus('verifying');
    setMessage('Checking syntax...');

    // Simulate async verification process
    setTimeout(() => {
        const code = generateCode();
        let error = null;

        // Basic "Syntax" Checks (Simulation)
        if (!testName || !testName.trim()) {
            error = "Error: Test name cannot be empty.";
        } else if (steps.length === 0) {
            error = "Error: Test body is empty. Add at least one step.";
        } else {
            // Check for missing targets in steps
            for (let i = 0; i < steps.length; i++) {
                const s = steps[i];
                // waitForLoadState often has defaults or 'networkidle', but if target is strictly empty in our model it might be an issue depending on usage.
                // Here we assume target is required for all except maybe waitForLoadState if we allow defaults.
                if (s.type === 'think' && (!s.duration && !s.target)) {
                     error = `Error at step ${i + 1}: Missing duration for think time.`;
                     break;
                }
                if (s.type !== 'think' && (!s.target || s.target.trim() === '')) {
                     error = `Error at step ${i + 1}: Missing target for ${s.type}.`;
                     break;
                }
            }
        }

        if (error) {
            setVerificationStatus('error');
            setMessage(error);
        } else {
            setVerificationStatus('success');
            setMessage('No syntax errors found. Ready to run.');
            // Auto hide success message after 3s
            setTimeout(() => {
                if (verificationStatus !== 'error') { // Only clear if we haven't errored in the meantime
                    setVerificationStatus('idle');
                    setMessage('');
                }
            }, 3000);
        }
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700 text-xs text-gray-400">
            <span className="flex items-center gap-2">
                spec.ts
                {verificationStatus === 'verifying' && <span className="text-blue-400 flex items-center gap-1 ml-2"><Loader2 size={12} className="animate-spin"/> Checking...</span>}
                {verificationStatus === 'success' && <span className="text-green-400 flex items-center gap-1 ml-2"><CheckCircle size={12}/> Passed</span>}
                {verificationStatus === 'error' && <span className="text-red-400 flex items-center gap-1 ml-2"><XCircle size={12}/> Failed</span>}
            </span>
            <div className="flex space-x-2">
                <button className="hover:text-white transition-colors">Format</button>
                <button 
                    onClick={handleVerify} 
                    disabled={verificationStatus === 'verifying'}
                    className={`flex items-center gap-1 hover:text-white transition-colors ${verificationStatus === 'verifying' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify'}
                </button>
            </div>
        </div>
      {verificationStatus === 'error' && (
          <div className="bg-red-900/20 border-b border-red-900/50 px-4 py-2 text-xs text-red-300 flex items-center gap-2 animate-in slide-in-from-top-1">
              <AlertTriangle size={12} />
              {message}
          </div>
      )}
      {verificationStatus === 'success' && message && (
           <div className="bg-green-900/20 border-b border-green-900/50 px-4 py-2 text-xs text-green-300 flex items-center gap-2 animate-in slide-in-from-top-1">
              <CheckCircle size={12} />
              {message}
          </div>
      )}
      <div className="flex-1 overflow-auto text-sm">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', minHeight: '100%' }}
          showLineNumbers={true}
        >
          {generateCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeEditor;