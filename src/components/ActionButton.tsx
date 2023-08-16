import cn from "clsx";

interface Props {
  icon: React.ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton = ({
  icon,
  text,
  className,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      className={cn(
        "flex flex-grow items-center justify-center gap-1 rounded-md py-2 font-bold backdrop-filter-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale",
        !disabled && "hover:brightness-95 active:brightness-90",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="opacity-50 [&>svg]:h-6 [&>svg]:w-6">{icon}</div>
      <span className="text-sm opacity-40">{text}</span>
    </button>
  );
};

export default ActionButton;
export type { Props };
