import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { findingsData } from '@/data';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, X } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export const Findings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [confidenceFilter, setConfidenceFilter] = useState(0);
  
  const filterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFindings = findingsData.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.id.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesType = typeFilter === 'All Types' || f.type.replace('_', ' ') === typeFilter;
    const matchesSeverity = severityFilter === 'All Severities' || f.severity === severityFilter;
    const matchesConfidence = f.confidence >= confidenceFilter;
    
    return matchesSearch && matchesType && matchesSeverity && matchesConfidence;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search findings by title, ID, or entity..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-sm focus:outline-none"
          >
            <option>All Types</option>
            <option>Execution Gap</option>
            <option>Negative Space</option>
          </select>
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters || severityFilter !== 'All Severities' || confidenceFilter > 0 ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-border'}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(severityFilter !== 'All Severities' || confidenceFilter > 0) && (
                <span className="ml-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-xl z-20 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold">Advanced Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                    <select 
                      value={severityFilter}
                      onChange={(e) => setSeverityFilter(e.target.value)}
                      className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent"
                    >
                      <option>All Severities</option>
                      <option>CRITICAL</option>
                      <option>HIGH</option>
                      <option>MODERATE</option>
                      <option>LOW</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Confidence</label>
                    <input 
                      type="range" 
                      className="w-full" 
                      min="0" max="100" 
                      value={confidenceFilter}
                      onChange={(e) => setConfidenceFilter(parseInt(e.target.value))}
                    />
                    <div className="text-xs text-gray-500 mt-1">&gt; {confidenceFilter}%</div>
                  </div>
                  <button className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700" onClick={() => setShowFilters(false)}>Apply Filters</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead className="bg-gray-50 dark:bg-dark-background/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Finding ID / Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type & Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
            {filteredFindings.map((finding) => (
              <tr key={finding.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white max-w-xs truncate" title={finding.title}>{finding.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{finding.id} • {formatDate(finding.detectedDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <Link to={`/entities/${finding.entityId}`} className="hover:text-blue-600 hover:underline">{finding.entityName}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{finding.type.replace('_', ' ')}</div>
                  <div className="text-xs text-gray-500">{finding.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getRiskBadgeVariant(finding.severity)}>{finding.severity}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${finding.confidence}%` }}></div>
                    </div>
                    {finding.confidence}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs font-medium ${finding.status === 'NEW' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {finding.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/findings/${finding.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 flex items-center justify-end">
                    Review <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFindings.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No findings match the current search and filter criteria.
          </div>
        )}
      </Card>
    </div>
  );
};