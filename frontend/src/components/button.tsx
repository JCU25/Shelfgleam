import type { ReactElement } from "react";
import clsx from "clsx";

type props = {
	children: React.ReactNode;
	onClick?: () => void;
	isPrimary: boolean;
	customStyle?: string;
	disabled?: boolean;
};

export default function Button({
	children,
	onClick,
	isPrimary = true,
	customStyle,
	disabled = false,
}: props): ReactElement {
	return (
		<button
			className={clsx(
				`px-2 md:px-4 py-0 md:py-1 rounded-md`,
				`disabled:bg-gray-300 disabled:text-gray-500`,
				customStyle ?? customStyle,

				isPrimary
					? `bg-purple-600 border-purple-900  text-white hover:bg-purple-700 active:bg-purple-800`
					: `bg-white border-purple-700 border text-black hover:bg-purple-100`,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
