import { twMerge } from "tailwind-merge";

interface BoxProps {
	children: React.ReactNode;
	className?: string;
}
/**
 * The Box component serves as a container for child components.
 * It uses tailwind's utility classes to style the box with rounded corners and full width.
 * Additional styles can be passed through the className prop.
 *
 * @param {React.ReactNode} children The child nodes to be rendered within the Box component.
 * @param {string} [props.className] Optional additional class names for more specific styling.
 * @returns A div container with applied styles and child elements.
 */

const Box: React.FC<BoxProps> = ({ children, className }) => {
	
	return (
		<div className={twMerge('rounded-lg h-fit w-full', className)}>
			{children}
		</div>
	)
}

export default Box;