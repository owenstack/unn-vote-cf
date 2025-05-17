import LogoImage from "~/assets/images/unn-logo.jpeg";
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import { buttonVariants } from "./ui/button";

export function Logo({ className }: { className?: string }) {
	return (
		<Link
			to="/"
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"flex items-center gap-2 self-center font-medium",
				className,
			)}
		>
			<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<img
					src={LogoImage}
					alt="unn-logo"
					className="size-6"
					width={100}
					height={100}
				/>
			</div>
			UNN Election.
		</Link>
	);
}
