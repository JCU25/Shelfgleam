import type { ReactElement } from "react";
import clsx from "clsx";

type props = {
	children: React.ReactNode;
	onClick?: () => void;
	isPrimary?: boolean;
	customStyle?: string;
	disabled?: boolean;
	type?: "submit" | "reset" | "button";
};

export default function Button({
	children,
	onClick,
	isPrimary = true,
	customStyle,
	disabled = false,
	type,
}: props): ReactElement {
	return (
		<button
			className={clsx(
				`px-4 py-2 md:px-6 md:py-2  rounded-[10px]`,
				`disabled:bg-purple-200 disabled:text-gray-500`,

				isPrimary
					? `bg-purple-600 border-purple-900  text-white hover:bg-purple-500 active:bg-purple-800`
					: `bg-white border-purple-700 border text-black hover:bg-purple-100 active:bg-purple-400`,

				customStyle,
			)}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{children}
		</button>
	);
}
