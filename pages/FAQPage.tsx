
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: "How do I submit a complaint?",
      answer: "Navigate to the 'Submit Complaint' page from the homepage or navbar. Fill in all the required details about the issue, including type, location, and a clear description. You can also attach a photo. Once submitted, you will receive a tracking ID."
    },
    {
      question: "When should I use the 'Emergency' urgency level?",
      answer: "The 'Emergency' level should be reserved for critical situations that pose an immediate threat to safety or property, such as a major water leak, a fallen power line, or a serious security threat."
    },
    {
      question: "Is my personal information kept private?",
      answer: "Yes. Your contact number is only visible to authorized administrators for follow-up purposes. It will never be displayed publicly on the complaint tracking page."
    },
    {
      question: "How can I track the status of my complaint?",
      answer: "Go to the 'Track Complaint' page and enter the unique tracking ID you received after submitting your complaint. You will see the current status and any updates from the administration."
    },
    {
      question: "What do the different statuses mean?",
      answer: "'New' means your complaint has been received. 'In Progress' means it has been assigned and is being worked on. 'Completed' means the issue has been resolved."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <HelpCircle /> {t('faqPage.title')}
      </h1>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-100 shadow-md">
            <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
