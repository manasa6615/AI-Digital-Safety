import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnalysisReport } from '../services/analyzer';
import { History as HistoryIcon, Trash2, Eye, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HistoryViewProps {
  history: AnalysisReport[];
  onViewReport: (report: AnalysisReport) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onViewReport,
  onDeleteItem,
  onClearAll,
}) => {
  const { t } = useLanguage();

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'HIGH':
        return <span className="status-pill status-red">{t.report.levelHigh}</span>;
      case 'MEDIUM':
        return <span className="status-pill status-amber">{t.report.levelMedium}</span>;
      default:
        return <span className="status-pill status-green">{t.report.levelLow}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HistoryIcon style={{ color: 'var(--accent-cyan)' }} size={24} />
            <span>{t.history.title}</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t.history.subtitle}
          </p>
        </div>

        {history.length > 0 && (
          <button className="btn btn-secondary" onClick={onClearAll} style={{ fontSize: '0.82rem' }}>
            <Trash2 size={15} />
            <span>{t.history.clearHistoryBtn}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 24px',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <HistoryIcon size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <div style={{ fontSize: '1rem', fontWeight: 500 }}>{t.history.emptyText}</div>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px' }}>{t.history.tableDate}</th>
                  <th style={{ padding: '12px 16px' }}>{t.history.tableType}</th>
                  <th style={{ padding: '12px 16px' }}>{t.history.tableCategory}</th>
                  <th style={{ padding: '12px 16px' }}>{t.history.tableRisk}</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t.history.tableAction}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => {
                  const categoryName = (t.categories as Record<string, string>)[item.categoryKey] || item.categoryKey;
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{item.timestamp}</td>
                      <td style={{ padding: '14px 16px', textTransform: 'capitalize', fontWeight: 500 }}>{item.inputType}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600 }}>{categoryName}</td>
                      <td style={{ padding: '14px 16px' }}>{getRiskBadge(item.riskLevel)}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            className="btn btn-secondary"
                            onClick={() => onViewReport(item)}
                            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                            title={t.history.viewReport}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => onDeleteItem(item.id)}
                            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                            title={t.history.deleteItem}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
