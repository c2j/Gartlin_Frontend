import React from 'react';
import { ShoppingCart, LogIn, Search, CreditCard, Layout, Zap, Download } from 'lucide-react';

const Templates: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Template Market</h1>
          <p className="text-gray-400">Jumpstart your testing with pre-configured industry standard scenarios.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: 'E-commerce Checkout', desc: 'Full flow from product page to payment confirmation.', icon: <ShoppingCart size={24} className="text-blue-400" />, tags: ['Flow', 'Complex'] },
                { title: 'User Login & Auth', desc: 'High concurrency login attempt with token validation.', icon: <LogIn size={24} className="text-green-400" />, tags: ['Single', 'Security'] },
                { title: 'Search & Filtering', desc: 'Heavy database query load simulation via frontend search.', icon: <Search size={24} className="text-purple-400" />, tags: ['Script', 'Data'] },
                { title: 'Payment Gateway', desc: 'Mock payment processing with 3rd party iframe handling.', icon: <CreditCard size={24} className="text-yellow-400" />, tags: ['Critical', 'External'] },
                { title: 'Landing Page LCP', desc: 'Focus on First Contentful Paint and asset loading speeds.', icon: <Layout size={24} className="text-pink-400" />, tags: ['Single', 'Metrics'] },
                { title: 'API Stress Test', desc: 'Direct backend API bombardment without UI rendering.', icon: <Zap size={24} className="text-orange-400" />, tags: ['Headless', 'Backend'] },
            ].map((tpl, idx) => (
                <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-500 hover:shadow-lg transition group cursor-pointer flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-gray-900 rounded-lg border border-gray-700 group-hover:border-gray-600 transition">
                            {tpl.icon}
                        </div>
                        <button className="text-gray-500 hover:text-white transition">
                            <Download size={18} />
                        </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">{tpl.title}</h3>
                    <p className="text-sm text-gray-400 mb-6 flex-1">{tpl.desc}</p>
                    <div className="flex gap-2 mt-auto">
                        {tpl.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded border border-gray-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-medium transition">
                        Load Template
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;