export function Hero() {
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 pt-24 pb-6 text-center fade-up">
      <div className="tag-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
        ✦ Machine Learning · Regression
      </div>

      <h1 className="fade-up delay-1 hero-title">
        {`Predict Your Ford's`}<br />
        <span className="gradient-text">Market Value</span>
      </h1>

      <p className="mt-4 text-sm leading-relaxed fade-up delay-2 hero-sub max-w-100 mx-auto">
        Trained on 15,000+ Ford UK listings. Instant estimate with live GBP → INR conversion.
      </p>
    </div>
  );
}