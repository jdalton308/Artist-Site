import Link from "next/link";
import "./Button.css";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ...props
}) {
  const classes = `button button--${variant} button--${size} ${className}`.trim();

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
