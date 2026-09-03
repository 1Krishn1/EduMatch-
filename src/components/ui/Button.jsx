import { Link } from "react-router-dom";

export default function Button({
  to,
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
}) {
  const className = `btn ${variant === "accent" ? "btn-accent" : ""} ${
    variant === "ghost" ? "btn-ghost" : ""
  } ${variant === "danger" ? "btn-danger" : ""}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
