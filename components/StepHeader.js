export default function StepHeader({ step, total = 4, title, subtitle }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-dark">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <span className="text-brand font-medium text-sm whitespace-nowrap">
        Step {step} of {total}
      </span>
    </div>
  );
}
