
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComplaintType, UrgencyLevel, ComplaintSubmission } from '../types';
import { apiService } from '../services/apiService';
import { UploadCloud, X } from 'lucide-react';

const SubmitComplaintPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ trackingId: string } | null>(null);

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  
  const MAX_FILE_SIZE = 5000000; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


  const schema = z.object({
    type: z.nativeEnum(ComplaintType, { errorMap: () => ({ message: "Please select a complaint type." }) }),
    urgency: z.nativeEnum(UrgencyLevel, { errorMap: () => ({ message: "Please select an urgency level." }) }),
    location: z.string().min(5, "Location is too short.").max(100, "Location is too long."),
    description: z.string().min(20, "Description must be at least 20 characters.").max(500, "Description is too long."),
    notes: z.string().max(300, "Notes are too long.").optional(),
    contactNumber: z.string().regex(phoneRegex, 'Invalid phone number!'),
    attachment: z.any()
      .refine((files) => files?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true, "Only .jpg, .jpeg, .png and .webp formats are supported.")
      .refine((files) => files?.length == 1 ? files[0]?.size <= MAX_FILE_SIZE : true, `Max file size is 5MB.`)
      .optional(),
  });

  type FormFields = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    try {
      const submissionData: ComplaintSubmission = {
        ...data,
        attachment: data.attachment?.[0],
      };
      const result = await apiService.submitComplaint(submissionData);
      setSubmissionResult(result);
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      // Here you would show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-4">{t('complaintForm.title')}</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Complaint Type */}
              <div className="form-control">
                <label className="label"><span className="label-text">{t('complaintForm.type')}</span></label>
                <select className={`select select-bordered ${errors.type ? 'select-error' : ''}`} {...register('type')}>
                  <option value="" disabled selected>Select type</option>
                  {Object.values(ComplaintType).map(type => (
                    <option key={type} value={type}>{t(`complaintTypes.${type}`)}</option>
                  ))}
                </select>
                {errors.type && <span className="text-error text-sm mt-1">{errors.type.message}</span>}
              </div>

              {/* Urgency Level */}
              <div className="form-control">
                <label className="label"><span className="label-text">{t('complaintForm.urgency')}</span></label>
                <select className={`select select-bordered ${errors.urgency ? 'select-error' : ''}`} {...register('urgency')}>
                   <option value="" disabled selected>Select urgency</option>
                  {Object.values(UrgencyLevel).map(level => (
                    <option key={level} value={level}>{t(`urgencyLevels.${level}`)}</option>
                  ))}
                </select>
                {errors.urgency && <span className="text-error text-sm mt-1">{errors.urgency.message}</span>}
              </div>
            </div>

            {/* Location */}
            <div className="form-control mt-4">
              <label className="label"><span className="label-text">{t('complaintForm.location')}</span></label>
              <input type="text" placeholder={t('complaintForm.locationPlaceholder')} className={`input input-bordered ${errors.location ? 'input-error' : ''}`} {...register('location')} />
              {errors.location && <span className="text-error text-sm mt-1">{errors.location.message}</span>}
            </div>
            
            {/* Description */}
            <div className="form-control mt-4">
              <label className="label"><span className="label-text">{t('complaintForm.description')}</span></label>
              <textarea className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`} placeholder={t('complaintForm.descriptionPlaceholder')} {...register('description')}></textarea>
              {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
            </div>
            
            {/* Additional Notes */}
            <div className="form-control mt-4">
              <label className="label"><span className="label-text">{t('complaintForm.notes')}</span></label>
              <textarea className="textarea textarea-bordered h-20" placeholder={t('complaintForm.notesPlaceholder')} {...register('notes')}></textarea>
            </div>
            
            {/* Contact Number */}
            <div className="form-control mt-4">
                <label className="label"><span className="label-text">{t('complaintForm.contact')}</span></label>
                <input type="tel" placeholder={t('complaintForm.contactPlaceholder')} className={`input input-bordered ${errors.contactNumber ? 'input-error' : ''}`} {...register('contactNumber')} />
                {errors.contactNumber && <span className="text-error text-sm mt-1">{errors.contactNumber.message}</span>}
            </div>

            {/* Attachment */}
            <div className="form-control mt-4">
                <label className="label"><span className="label-text">{t('complaintForm.attachment')}</span></label>
                <div className="file-input file-input-bordered flex items-center gap-2">
                    <UploadCloud className="w-5 h-5" />
                    <input type="file" className="grow" {...register('attachment')} />
                </div>
                {errors.attachment && <span className="text-error text-sm mt-1">{errors.attachment.message as string}</span>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading && <span className="loading loading-spinner"></span>}
                {t('complaintForm.submitButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {submissionResult && (
        <div className="modal modal-open">
            <div className="modal-box">
                <button onClick={() => setSubmissionResult(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X /></button>
                <h3 className="font-bold text-lg text-success">{t('complaintForm.successTitle')}</h3>
                <p className="py-4">{t('complaintForm.successMessage')}</p>
                <div className="mockup-code">
                    <pre><code className="text-lg font-bold">{submissionResult.trackingId}</code></pre>
                </div>
                <div className="modal-action">
                    <button onClick={() => setSubmissionResult(null)} className="btn">{t('close')}</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SubmitComplaintPage;
