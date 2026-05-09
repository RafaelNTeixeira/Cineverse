import { useState } from 'react';

const StarIcon = ({ filled, half, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <defs>
      <linearGradient id={`half-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={filled ? 'currentColor' : half ? `url(#half-${size})` : 'none'}
      stroke="currentColor"
      strokeWidth={filled || half ? 0 : 1.5}
      strokeLinejoin="round"
      opacity={filled || half ? 1 : 0.35}
    />
  </svg>
);

export default function StarRating({
  value = 0,
  onChange,
  max = 5,
  size = 20,
  readOnly = false,
  showValue = false,
  className = '',
}) {
  const [hovered, setHovered] = useState(null);

  const display = hovered !== null ? hovered : value;

  const handleClick = (star, isHalf) => {
    if (readOnly || !onChange) return;
    const newVal = isHalf ? star - 0.5 : star;
    onChange(newVal);
  };

  const handleMouseMove = (e, star) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHovered(isHalf ? star - 0.5 : star);
  };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        color: 'var(--color-accent)',
      }}
      onMouseLeave={() => !readOnly && setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;
        return (
          <span
            key={star}
            style={{ cursor: readOnly ? 'default' : 'pointer', lineHeight: 0 }}
            onMouseMove={(e) => handleMouseMove(e, star)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const isHalf = e.clientX - rect.left < rect.width / 2;
              handleClick(star, isHalf);
            }}
          >
            <StarIcon filled={filled} half={half} size={size} />
          </span>
        );
      })}
      {showValue && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: size * 1.1 + 'px',
            fontWeight: 600,
            color: 'var(--color-accent)',
            marginLeft: '0.4rem',
            lineHeight: 1,
          }}
        >
          {display > 0 ? display.toFixed(1) : '—'}
          <span
            style={{
              fontSize: size * 0.65 + 'px',
              color: 'var(--color-text-secondary)',
              marginLeft: '2px',
            }}
          >
            /{max}
          </span>
        </span>
      )}
    </div>
  );
}
