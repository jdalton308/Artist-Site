import "./GradientBackground.css";

export default function GradientBackground({ children, className = "" }) {
  return <div className={`gradient-background ${className}`.trim()}>{children}</div>;
}
