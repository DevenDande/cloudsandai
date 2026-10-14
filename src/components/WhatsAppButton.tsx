import { MessageCircle } from 'lucide-react';

const whatsappUrl = `https://wa.me/919028028869?text=${encodeURIComponent(
  "Hi, I'm interested in learning more about your AI/ML courses."
)}`;

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span>WhatsApp us</span>
    </a>
  );
}
