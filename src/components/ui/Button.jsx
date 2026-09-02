import { Link } from "react-router-dom";

export default function Button({
  to,
  children,
  variant = "primary",
  type = "button",
  onClick,
}) {
  const className = `btn ${variant === "accent" ? "btn-accent" : ""}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
