import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Inlining translations to avoid module resolution issues.
const en = {
  "appName": "Complaint Management System – Aleppo Block 5",
  "nav": {
    "home": "Home",
    "submit": "Submit Complaint",
    "track": "Track Complaint",
    "stats": "Statistics",
    "announcements": "Announcements",
    "achievements": "Achievements",
    "faq": "FAQ"
  },
  "home": {
    "title": "Welcome to the Aleppo Block 5 Complaint System",
    "intro": "Your voice matters. Submit and track community issues to help us improve our neighborhood together.",
    "submitAction": "Submit a New Complaint",
    "trackAction": "Track Your Complaint"
  },
  "complaintForm": {
    "title": "Submit a New Complaint",
    "type": "Complaint Type",
    "urgency": "Urgency Level",
    "location": "Location",
    "locationPlaceholder": "e.g., Street name, building number, or landmark",
    "description": "Description",
    "descriptionPlaceholder": "Please describe the issue in detail.",
    "notes": "Additional Notes (Optional)",
    "notesPlaceholder": "Any extra information.",
    "contact": "Contact Number",
    "contactPlaceholder": "Enter your phone number",
    "attachment": "Attachment (Optional)",
    "submitButton": "Submit Complaint",
    "successTitle": "Complaint Submitted!",
    "successMessage": "Thank you for your submission. Your tracking ID is:",
    "close": "Close"
  },
  "complaintTypes": {
    "Service": "Service",
    "Electricity": "Electricity",
    "Water": "Water",
    "Cleanliness": "Cleanliness",
    "Security": "Security",
    "Other": "Other"
  },
  "urgencyLevels": {
    "Emergency": "Emergency",
    "Urgent": "Urgent",
    "Normal": "Normal"
  },
  "trackPage": {
    "title": "Track Your Complaint",
    "enterId": "Enter your Tracking ID",
    "trackButton": "Track",
    "notFound": "Complaint not found. Please check the ID and try again.",
    "detailsTitle": "Complaint Details",
    "trackingId": "Tracking ID",
    "status": "Status",
    "submittedOn": "Submitted On",
    "lastUpdate": "Last Update",
    "type": "Type",
    "urgency": "Urgency",
    "location": "Location",
    "description": "Description",
    "statusHistory": "Status History",
    "adminNotes": "Admin Notes"
  },
  "complaintStatuses": {
    "New": "New",
    "In Progress": "In Progress",
    "Completed": "Completed"
  },
  "statsPage": {
    "title": "Public Statistics",
    "total": "Total Complaints",
    "completed": "Completed",
    "pending": "Pending",
    "byCategory": "Complaints by Category",
    "monthlyTrend": "Monthly Complaint Trends"
  },
  "announcementsPage": {
    "title": "Announcements"
  },
  "achievementsPage": {
    "title": "Achievements"
  },
  "faqPage": {
    "title": "Frequently Asked Questions"
  },
  "footer": {
    "copy": "© 2024 Aleppo Block 5 Community Council. All rights reserved."
  },
  "theme": "Theme",
  "language": "Language"
};

const ar = {
  "appName": "نظام إدارة الشكاوى – حلب بلوك 5",
  "nav": {
    "home": "الرئيسية",
    "submit": "تقديم شكوى",
    "track": "تتبع الشكوى",
    "stats": "الإحصائيات",
    "announcements": "الإعلانات",
    "achievements": "الإنجازات",
    "faq": "الأسئلة الشائعة"
  },
  "home": {
    "title": "أهلاً بكم في نظام شكاوى حلب بلوك 5",
    "intro": "صوتك يهمنا. قدم وتتبع قضايا المجتمع لمساعدتنا في تحسين حَيِّنا معًا.",
    "submitAction": "تقديم شكوى جديدة",
    "trackAction": "تتبع شكواك"
  },
  "complaintForm": {
    "title": "تقديم شكوى جديدة",
    "type": "نوع الشكوى",
    "urgency": "مستوى الأهمية",
    "location": "الموقع",
    "locationPlaceholder": "مثال: اسم الشارع، رقم المبنى، أو معلم بارز",
    "description": "الوصف",
    "descriptionPlaceholder": "يرجى وصف المشكلة بالتفصيل.",
    "notes": "ملاحظات إضافية (اختياري)",
    "notesPlaceholder": "أي معلومات إضافية.",
    "contact": "رقم الاتصال",
    "contactPlaceholder": "أدخل رقم هاتفك",
    "attachment": "مرفقات (اختياري)",
    "submitButton": "إرسال الشكوى",
    "successTitle": "تم تقديم الشكوى!",
    "successMessage": "شكرًا لتقديمك. رمز التتبع الخاص بك هو:",
    "close": "إغلاق"
  },
  "complaintTypes": {
    "Service": "خدمات",
    "Electricity": "كهرباء",
    "Water": "مياه",
    "Cleanliness": "نظافة",
    "Security": "أمن",
    "Other": "أخرى"
  },
  "urgencyLevels": {
    "Emergency": "طوارئ",
    "Urgent": "عاجل",
    "Normal": "عادي"
  },
  "trackPage": {
    "title": "تتبع شكواك",
    "enterId": "أدخل رمز التتبع الخاص بك",
    "trackButton": "تتبع",
    "notFound": "الشكوى غير موجودة. يرجى التحقق من الرمز والمحاولة مرة أخرى.",
    "detailsTitle": "تفاصيل الشكوى",
    "trackingId": "رمز التتبع",
    "status": "الحالة",
    "submittedOn": "تاريخ التقديم",
    "lastUpdate": "آخر تحديث",
    "type": "النوع",
    "urgency": "الأهمية",
    "location": "الموقع",
    "description": "الوصف",
    "statusHistory": "سجل الحالة",
    "adminNotes": "ملاحظات الإدارة"
  },
  "complaintStatuses": {
    "New": "جديدة",
    "In Progress": "قيد المعالجة",
    "Completed": "مكتملة"
  },
  "statsPage": {
    "title": "الإحصائيات العامة",
    "total": "إجمالي الشكاوى",
    "completed": "المكتملة",
    "pending": "المعلقة",
    "byCategory": "الشكاوى حسب الفئة",
    "monthlyTrend": "اتجاه الشكاوى الشهري"
  },
  "announcementsPage": {
    "title": "الإعلانات"
  },
  "achievementsPage": {
    "title": "الإنجازات"
  },
  "faqPage": {
    "title": "الأسئلة الشائعة"
  },
  "footer": {
    "copy": "© 2024 مجلس مجتمع حلب بلوك 5. جميع الحقوق محفوظة."
  },
  "theme": "المظهر",
  "language": "اللغة"
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
  });

export default i18n;
