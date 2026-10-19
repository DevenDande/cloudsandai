const renderMarqueeContent = () => (
  <div className="flex shrink-0 items-center">
    <div className="flex items-center">
      <span className="whitespace-nowrap text-xs font-medium tracking-wide text-ink-600">
        Free AI & ML Resources | Interactive Machine-Learning Labs | Structured AI Programs | Practical Projects
      </span>
      <span className="mx-6 text-ink-300" aria-hidden="true">
        •
      </span>
    </div>
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
