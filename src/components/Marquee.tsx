const marqueeItems = [
  'Remote classes from INR 2999 • Morning 7:00 AM–8:30 AM • Evening 7:30 PM–9:00 PM • Starting soon • Recordings available • Call +91 8830628242',
];

const renderMarqueeContent = () => (
  <div className="flex shrink-0 items-center">
    {marqueeItems.map((item, index) => (
      <div key={index} className="flex items-center">
        <span className="whitespace-nowrap text-xs font-medium tracking-wide text-ink-600">
          {item}
        </span>
        <span className="mx-6 text-ink-300" aria-hidden="true">
          •
        </span>
      </div>
    ))}
  </div>
);

export function Marquee() {
  return (
    <div className="border-b border-ink-100 bg-ink-50/60">
      <div className="group relative flex overflow-hidden py-2">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {renderMarqueeContent()}
          {renderMarqueeContent()}
        </div>
      </div>
    </div>
  );
}
