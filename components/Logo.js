export default function Logo({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lakas ng may Kapansanan logo"
    >
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#e2352f" strokeWidth="3" />
      <circle cx="50" cy="50" r="40" fill="#eaf6fc" />
      {/* Five figures in a ring, symbolizing an inclusive community */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + 22 * Math.cos(rad);
        const cy = 50 + 22 * Math.sin(rad);
        const colors = ["#1789b3", "#2fb2df", "#f2a71b", "#e2352f", "#2a9d5c"];
        return (
          <g key={angle}>
            <circle cx={cx} cy={cy} r="9" fill={colors[i % colors.length]} />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="8" fill="#0d2b3d" />
    </svg>
  );
}
