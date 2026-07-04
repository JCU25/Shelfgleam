import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function HeaderRight() {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex flex-row gap-1 md:gap-2">
				<Button isPrimary={true} onClick={() => navigate("/login")}>
					<p className="text-xs md:text-md">Sign In</p>
				</Button>
				<Button isPrimary={false} onClick={() => navigate("/signup")}>
					<p className="text-xs md:text-md">Sign Up</p>
				</Button>
			</div>
		</>
	);
}
