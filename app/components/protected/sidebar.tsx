import { toast } from "sonner";
import { signOut, useSession } from "~/lib/auth.client";
import type { Menu } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { LogOut, Menu as MenuIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import type React from "react";
import { Logo } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";

export function Sidebar({
	children,
	menuLink,
}: { children: React.ReactNode; menuLink: Menu[] }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const { data } = useSession();

	return (
		<>
			<header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6 md:left-64">
				<Button
					variant={"outline"}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="md:hidden"
				>
					<MenuIcon className="h-6 w-6" />
				</Button>
				<Logo className="truncate" />
				<Avatar>
					<AvatarImage src={data?.user?.image ?? ""} />
					<AvatarFallback>{data?.user?.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</header>
			<aside
				className={cn(
					"fixed top-0 left-0 h-screen w-64 flex-col justify-between border-r bg-background p-6 transition-transform md:flex",
					isSidebarOpen
						? "flex translate-x-0"
						: "-translate-x-full md:translate-x-0",
				)}
			>
				<div className="flex flex-col items-center gap-4">
					<Logo />
					<hr className="w-full" />
					<nav className="flex w-full flex-col gap-2">
						{menuLink.map(({ icon, title, url }) => {
							const Icon = LucideIcons[
								icon as keyof typeof LucideIcons
							] as LucideIcons.LucideIcon;
							return (
								<Link
									key={title}
									className={cn(
										buttonVariants({ variant: "ghost" }),
										"w-full justify-start gap-2",
									)}
									to={url}
									onClick={() => setIsSidebarOpen(false)}
								>
									<Icon className="h-4 w-4" /> {title}
								</Link>
							);
						})}
						<Button
							variant={"ghost"}
							onClick={async () => {
								try {
									await signOut();
								} catch (error) {
									toast.error("Something went wrong", {
										description:
											error instanceof Error
												? error.message
												: "Internal server error",
									});
								}
							}}
							className={"justify-start gap-2"}
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</nav>
				</div>
			</aside>
			<main className="mt-16 p-6 md:ml-64">{children}</main>
		</>
	);
}
