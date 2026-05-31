import "./Heading.css";

export default function Heading({ as: Tag = "h2", size = "lg", className = "", children, ...props }) {
  return (
    <Tag className={`heading heading--${size} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
