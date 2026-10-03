import { useState } from 'react';
import { UploadCloud, FileJson, Database, Webhook, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export const DataIngestion = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileState, setFileState] = useState<'idle' | 'uploading' | 'validating' | 'success'>('idle');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processMockUpload();
    }
  };

  const processMockUpload = () => {
    setFileState('uploading');
    setTimeout(() => {
      setFileState('validating');
      setTimeout(() => {
        setFileState('success');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Data Ingestion</h2>
        <p className="text-sm text-[#a19a93] max-w-3xl">
          Securely import SOC alerts and case-management extracts for offline supervisory analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { name: 'Upload CSV', icon: FileText, active: true },
          { name: 'Upload JSON', icon: FileJson, active: false },
          { name: 'Database Export', icon: Database, active: false },
          { name: 'API Connect', icon: Webhook, active: false }
        ].map(source => (
          <button 
            key={source.name}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-3 transition-colors ${
              source.active 
                ? 'bg-[#d97706]/10 border-[#d97706]/40 text-[#d97706] shadow-[inset_0_0_12px_rgba(217,119,6,0.1)]' 
                : 'bg-dark-surface border-dark-border text-[#a19a93] hover:text-[#d4d4d8] hover:border-gray-500'
            }`}
          >
            <source.icon className={`h-8 w-8 ${source.active ? 'text-[#d97706]' : 'text-[#8c827a]'}`} />
            <span className="font-medium text-sm">{source.name}</span>
          </button>
        ))}
      </div>

      {fileState === 'idle' && (
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-16 flex flex-col items-center justify-center transition-all ${
            isDragging ? 'border-[#d97706] bg-[#d97706]/5' : 'border-dark-border bg-dark-surface/50'
          }`}
        >
          <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center shadow-lg mb-4">
            <UploadCloud className="h-8 w-8 text-[#d97706]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Drag & Drop CSV Dataset</h3>
          <p className="text-sm text-[#8c827a] mb-6 text-center max-w-md">
            Upload exported alerts and cases from SIEM or ITSM tools. Standardized NCIIPC ingestion schema required.
          </p>
          <button onClick={processMockUpload} className="px-6 py-2.5 bg-[#d97706] hover:bg-amber-500 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-[#d97706]/20">
            Browse Local Files
          </button>
        </div>
      )}

      {(fileState === 'uploading' || fileState === 'validating') && (
        <div className="bg-dark-surface border border-dark-border rounded-xl p-12 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-dark-border border-t-[#d97706] rounded-full animate-spin mb-4"></div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {fileState === 'uploading' ? 'Parsing dataset...' : 'Validating schema and identifying entities...'}
          </h3>
          <p className="text-sm text-[#8c827a]">This may take a few moments for large files.</p>
        </div>
      )}

      {fileState === 'success' && (
        <div className="bg-dark-surface border border-green-500/30 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-start mb-8 relative z-10">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mr-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Dataset Successfully Validated</h3>
              <p className="text-sm text-[#a19a93]">soc_export_q2_2026_final.csv</p>
            </div>
            <button onClick={() => setFileState('idle')} className="ml-auto px-4 py-2 bg-dark-background border border-dark-border text-sm text-[#d4d4d8] rounded-lg hover:bg-dark-border transition-colors">
              Import Another
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div className="bg-dark-background border border-dark-border rounded-lg p-4">
              <div className="text-xs font-bold text-[#8c827a] uppercase mb-1">File Size</div>
              <div className="text-lg font-bold text-white">41.2 MB</div>
            </div>
            <div className="bg-dark-background border border-dark-border rounded-lg p-4">
              <div className="text-xs font-bold text-[#8c827a] uppercase mb-1">Total Records</div>
              <div className="text-lg font-bold text-white">24,850</div>
            </div>
            <div className="bg-dark-background border border-dark-border rounded-lg p-4">
              <div className="text-xs font-bold text-[#8c827a] uppercase mb-1">Detected Entities</div>
              <div className="text-lg font-bold text-white">12 CSEs</div>
            </div>
            <div className="bg-dark-background border border-dark-border rounded-lg p-4">
              <div className="text-xs font-bold text-[#8c827a] uppercase mb-1">Assessment Period</div>
              <div className="text-lg font-bold text-white">Q2 2026</div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end relative z-10">
            <button className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-green-600/20">
              Commit to Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};