import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/apiService';
import { Complaint, ComplaintStatus } from '../types';
import { AlertTriangle, CheckCircle, Hourglass, List, Info, Calendar, MapPin, FileText, StickyNote } from 'lucide-react';

const ComplaintDetails: React.FC<{ complaint: Complaint }> = ({ complaint }) => {
  const { t, i18n } = useTranslation();

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.NEW: return <Hourglass className="w-5 h-5 text-info" />;
      case ComplaintStatus.IN_PROGRESS: return <Hourglass className="w-5 h-5 text-warning" />;
      case ComplaintStatus.COMPLETED: return <CheckCircle className="w-5 h-5 text-success" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
        case ComplaintStatus.NEW: return "badge-info";
        case ComplaintStatus.IN_PROGRESS: return "badge-warning";
        case ComplaintStatus.COMPLETED: return "badge-success";
        default: return "badge-ghost";
    }
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl mt-8 animate-fade-in">
      <div className="card-body">
        <h2 className="card-title text-2xl">{t('trackPage.detailsTitle')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2"><List className="w-5 h-5 text-primary" /><strong>{t('trackPage.trackingId')}:</strong> {complaint.trackingId}</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5">{getStatusIcon(complaint.status)}</div><strong>{t('trackPage.status')}:</strong> <span className={`badge ${getStatusColor(complaint.status)}`}>{t(`complaintStatuses.${complaint.status}`)}</span></div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /><strong>{t('trackPage.submittedOn')}:</strong> {new Date(complaint.createdAt).toLocaleString()}</div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /><strong>{t('trackPage.lastUpdate')}:</strong> {new Date(complaint.updatedAt).toLocaleString()}</div>
            <div className="flex items-center gap-2"><Info className="w-5 h-5 text-primary" /><strong>{t('trackPage.type')}:</strong> {t(`complaintTypes.${complaint.type}`)}</div>
            <div className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-primary" /><strong>{t('trackPage.urgency')}:</strong> {t(`urgencyLevels.${complaint.urgency}`)}</div>
            <div className="flex items-center gap-2 col-span-1 md:col-span-2"><MapPin className="w-5 h-5 text-primary" /><strong>{t('trackPage.location')}:</strong> {complaint.location}</div>
        </div>

        <div className="divider"></div>
        
        <div>
            <h3 className="font-bold text-lg flex items-center gap-2"><FileText />{t('trackPage.description')}</h3>
            <p className="mt-2 bg-base-200 p-4 rounded-lg">{complaint.description}</p>
        </div>

        {complaint.adminNotes && (
            <div className="mt-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><StickyNote />{t('trackPage.adminNotes')}</h3>
                <p className="mt-2 bg-base-200 p-4 rounded-lg">{complaint.adminNotes}</p>
            </div>
        )}

        <div className="divider"></div>

        <div>
            <h3 className="font-bold text-lg mb-4">{t('trackPage.statusHistory')}</h3>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {complaint.statusHistory.map((update, index) => (
                    <li key={index}>
                        <div className="timeline-middle">
                            {getStatusIcon(update.status)}
                        </div>
                        <div className={`timeline-${index % 2 === 0 ? 'start' : 'end'} ${i18n.dir() === 'rtl' ? (index % 2 === 0 ? 'text-right' : 'text-left') : ''}  mb-10 md:text-end`}>
                            <time className="font-mono italic">{new Date(update.timestamp).toLocaleString()}</time>
                            <div className="text-lg font-black">{t(`complaintStatuses.${update.status}`)}</div>
                            {update.notes && <p className="text-sm">{update.notes}</p>}
                        </div>
                        {index < complaint.statusHistory.length - 1 && <hr/>}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};


const TrackComplaintPage: React.FC = () => {
  const { t } = useTranslation();
  const [trackingId, setTrackingId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsLoading(true);
    setError('');
    setComplaint(null);
    try {
      const result = await apiService.getComplaintByTrackingId(trackingId);
      if (result) {
        setComplaint(result);
      } else {
        setError(t('trackPage.notFound'));
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">{t('trackPage.title')}</h1>
      <form onSubmit={handleTrack} className="form-control mt-8 max-w-lg mx-auto">
        <div className="input-group">
          <input
            type="text"
            placeholder={t('trackPage.enterId')}
            className="input input-bordered w-full"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : t('trackPage.trackButton')}
          </button>
        </div>
      </form>

      {error && (
        <div role="alert" className="alert alert-error mt-8">
            <AlertTriangle />
            <span>{error}</span>
        </div>
      )}

      {complaint && <ComplaintDetails complaint={complaint} />}
    </div>
  );
};

export default TrackComplaintPage;