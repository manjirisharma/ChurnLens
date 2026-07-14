import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChurn } from '../context/ChurnContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Trash2, Eye, RefreshCw, Calendar, FileText, CheckCircle } from 'lucide-react';
import { CustomerAssessmentData, HistoryRecord } from '../types';

export default function CustomerHistory() {
  const { history, deleteHistoryRecord, clearHistory, updateForm, runPredictionEngine } = useChurn();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const { theme } = useTheme();

  const cardClass = theme === 'dark' 
    ? 'bg-slate-900/40 border-slate-800/60 shadow-glass-glow' 
    : 'bg-white border-slate-200 shadow-sm';
    
  const inputClass = `w-full pl-9 pr-4 py-2 text-xs rounded-xl focus:outline-none focus:border-indigo-500 transition-colors ${
    theme === 'dark'
      ? 'bg-[#0c101f]/60 border-slate-800/60 text-white placeholder-slate-600'
      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
  }`;

  const selectClass = `px-3 py-1.5 text-xs rounded-xl focus:outline-none focus:border-indigo-500 transition-colors ${
    theme === 'dark'
      ? 'bg-[#0c101f]/60 border-slate-800/60 text-white'
      : 'bg-slate-50 border-slate-200 text-slate-800'
  }`;

  const textTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSubtitle = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const textLabel = theme === 'dark' ? 'text-slate-400' : 'text-slate-700';
  const borderClass = theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200';

  // Handle reload of previous report instance
  const handleViewReport = async (item: HistoryRecord) => {
    // Inject parameters back into active form context state
    const recoveredData: CustomerAssessmentData = {
      gender: item.gender as any,
      maritalStatus: 'Married', // default mock recovery
      cityTier: item.cityTier as any,
      tenure: item.tenure,
      preferredLoginDevice: 'Mobile',
      preferredPaymentMode: item.paymentMode as any,
      hoursSpent: 4,
      registeredDevices: 3,
      noOfAddresses: 2,
      preferredOrderCategory: 'Laptop & Accessories',
      orderCount: item.orderCount,
      couponUsed: 2,
      cashbackAmount: 50,
      daysSinceLastOrder: 8,
      orderAmountHike: 12,
      warehouseToHome: 15,
      customerSatisfaction: item.satisfaction,
      complaint: item.complaint,
    };
    updateForm(recoveredData);
    try {
      await runPredictionEngine(item.customerName, recoveredData);
      navigate('/app/result');
    } catch (error) {
      console.error(error);
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = riskFilter === "All" || item.riskLevel === riskFilter;
    return matchesSearch && matchesFilter;
  });

  // Simple Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`text-xl font-bold flex items-center gap-1.5 ${textTitle}`}>
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Diagnostic History Directory</span>
          </h1>
          <p className={`text-xs ${textSubtitle}`}>Manage and inspect historical machine-learning model prediction results.</p>
        </div>
        {history.length > 0 && (
          <button
            id="clear-all-history-btn"
            onClick={clearHistory}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all self-start sm:self-auto"
          >
            Clear Log Directory
          </button>
        )}
      </div>

      {/* Control Filters Block */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="history-search-input"
            type="text"
            placeholder="Search client name or diagnostic ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={inputClass}
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            id="history-risk-filter"
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="All">All Risk Severities</option>
            <option value="High">High Attrition Risk</option>
            <option value="Medium">Medium Attrition Risk</option>
            <option value="Low">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className={`border rounded-3xl overflow-hidden transition-all duration-300 ${cardClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                theme === 'dark' 
                  ? 'bg-slate-950/40 border-slate-800/60 text-slate-400' 
                  : 'bg-slate-50/80 border-slate-200 text-slate-600'
              }`}>
                <th className="p-4">Report ID</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Assessed Date</th>
                <th className="p-4">Tenure</th>
                <th className="p-4">Satisfaction</th>
                <th className="p-4">Probability</th>
                <th className="p-4">Risk Severity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b transition-colors ${
                      theme === 'dark' 
                        ? 'border-slate-800/40 text-slate-300 hover:bg-slate-900/30' 
                        : 'border-slate-100 text-slate-700 hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="p-4 font-mono font-bold text-cyan-500">{item.id}</td>
                    <td className={`p-4 font-bold ${textTitle}`}>{item.customerName}</td>
                    <td className={`p-4 font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{item.date}</td>
                    <td className="p-4">{item.tenure} months</td>
                    <td className="p-4">{item.satisfaction} / 5 score</td>
                    <td className="p-4 font-bold font-mono">{item.probability}%</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.riskLevel === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        item.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        id={`view-report-btn-${item.id}`}
                        onClick={() => handleViewReport(item)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all inline-flex items-center"
                        title="Reload full diagnostic report"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`delete-btn-${item.id}`}
                        onClick={() => deleteHistoryRecord(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all inline-flex items-center"
                        title="Delete record from workspace"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500 italic">
                    No matching records logged in directory database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination triggers */}
        {totalPages > 1 && (
          <div className={`px-4 py-3 border-t flex justify-between items-center text-xs ${
            theme === 'dark' ? 'bg-slate-950/20 border-slate-800/60' : 'bg-slate-50/80 border-slate-200'
          }`}>
            <span className={textSubtitle}>
              Showing <span className={`font-semibold ${textTitle}`}>{indexOfFirstItem + 1}</span> to{' '}
              <span className={`font-semibold ${textTitle}`}>
                {Math.min(indexOfLastItem, filteredHistory.length)}
              </span>{' '}
              of <span className={`font-semibold ${textTitle}`}>{filteredHistory.length}</span> reports
            </span>
            <div className="flex gap-2">
              <button
                id="pagination-prev-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'border-slate-800/60 text-slate-400 hover:text-white' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Previous
              </button>
              <button
                id="pagination-next-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border transition-all disabled:opacity-40 ${
                  theme === 'dark' 
                    ? 'border-slate-800/60 text-slate-400 hover:text-white' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
