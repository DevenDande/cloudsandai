const marqueeItems = [
  'Early Bird Discount – 20%',
  'Bulk Admission Discount (Group of 5+ candidates) – 30%',
  'Batches starting from 12th October 2026',
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
