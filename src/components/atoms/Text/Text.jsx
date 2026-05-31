import "./Text.css";

export default function Text({ as: Tag = "p", variant = "body", className = "", children, ...props }) {
  return (
    <Tag className={`text text--${variant} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
