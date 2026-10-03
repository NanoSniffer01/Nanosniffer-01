import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { entitiesData } from '@/data';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, X } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

export const Entities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  const [sectorFilter, setSectorFilter] = useState('All Sectors');
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

  const filteredEntities = entitiesData.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All Risk Levels' || e.riskLevel === riskFilter;
    const matchesSector = sectorFilter === 'All Sectors' || e.sector === sectorFilter;
    
    return matchesSearch && matchesRisk && matchesSector;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search entities by name, ID, or sector..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative" ref={filterRef}>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters || riskFilter !== 'All Risk Levels' || sectorFilter !== 'All Sectors' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-border'}`}
          >
            <Filter className="h-4 w-4 mr-2" />
            More Filters
            {(riskFilter !== 'All Risk Levels' || sectorFilter !== 'All Sectors') && (
              <span className="ml-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
            )}
          </button>
          
          {showFilters && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-xl z-20 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold">Entity Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Level</label>
                  <select 
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent"
                  >
                    <option>All Risk Levels</option>
                    <option>CRITICAL</option>
                    <option>HIGH</option>
                    <option>MODERATE</option>
                    <option>LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sector</label>
                  <select 
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value)}
                    className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent"
                  >
                    <option>All Sectors</option>
                    <option>Power</option>
                    <option>Finance</option>
                    <option>Transport</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700" onClick={() => setShowFilters(false)}>Apply Filters</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead className="bg-gray-50 dark:bg-dark-background/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Alerts (Critical)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inv. Rate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Findings</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
            {filteredEntities.map((entity) => (
              <tr key={entity.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white">{entity.name}</div>
                  <div className="text-xs text-gray-500">{entity.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entity.sector}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(entity.alertCount)} <span className="text-red-500 font-medium">({formatNumber(entity.criticalAlertCount)})</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entity.investigationRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getRiskBadgeVariant(entity.riskLevel)}>{entity.riskLevel}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{entity.findingCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/entities/${entity.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 flex items-center justify-end">
                    Review <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEntities.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No entities found matching your criteria.
          </div>
        )}
      </Card>
    </div>
  );
};