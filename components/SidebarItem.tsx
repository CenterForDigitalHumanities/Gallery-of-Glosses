import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  onClick,
}) => {
  const router = useRouter();

  function handlePageNavigation() {
    if (!active) {
      router.push(href);
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
    handlePageNavigation();
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-xl cursor-pointer hover:text-neutrl-800 transition text-gray-neutral-300 py-4 px-8",
        active && "text-neutral-800 active-item"
      )}
    >
      <Icon size={26} />
      <p className="w-full">{label}</p>
    </div>
  );
};

export default SidebarItem;
