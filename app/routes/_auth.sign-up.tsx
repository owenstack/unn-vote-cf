import background from "~/assets/images/background-image.jpg";
import { ErrorCard } from "~/components/error-card";
import { Logo } from "~/components/logo";
import { useSearchParams, useNavigate, Form } from "react-router";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { signUp } from "~/lib/auth.client";
import { Label } from "~/components/ui/label";
import { EyeOff, Eye } from "lucide-react";
import { Submit } from "~/components/submit";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Page() {
	const [searchParams] = useSearchParams();
	const error = searchParams.get("error");
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const validatePassword = (pass: string, confirm: string) => {
		if (pass.length < 8) {
			return false;
		}
		if (pass !== confirm) {
			return false;
		}
		return true;
	};

	const submit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const firstName = form.get("first_name") as string;
		const surName = form.get("last_name") as string;
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		const confirmPassword = form.get("confirm_password") as string;
		if (!validatePassword(password, confirmPassword)) {
			toast.error("Invalid body", {
				description: "Passwords don't match or are too short",
			});
			return;
		}
		try {
			await signUp.email(
				{
					email,
					password,
					name: `${firstName} ${surName}`,
				},
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
					onSuccess: () => navigate("/verify-email"),
				},
			);
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	if (error) {
		return <ErrorCard error={error} />;
	}
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Logo />
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="font-bold text-2xl">Sign Up</h1>
								<p className="text-balance text-muted-foreground text-sm">
									Enter your information to create an account
								</p>
							</div>
							<Form onSubmit={submit} className="grid gap-6">
								<div className="flex items-center gap-2">
									<div className="grid gap-2">
										<Label htmlFor="first_name">First name</Label>
										<Input
											id="first_name"
											name="first_name"
											type="text"
											placeholder="John"
											autoComplete="given-name"
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="last_name">Last name</Label>
										<Input
											id="last_name"
											name="last_name"
											type="text"
											placeholder="Doe"
											autoComplete="family-name"
											required
										/>
									</div>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										autoComplete="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											name="password"
											autoComplete="new-password"
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										</Button>
									</div>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="confirm_password">Confirm Password</Label>
									<div className="relative">
										<Input
											id="confirm_password"
											type={showConfirmPassword ? "text" : "password"}
											name="confirm_password"
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? (
												<EyeOff size={16} />
											) : (
												<Eye size={16} />
											)}
										</Button>
									</div>
								</div>
								<Submit className="w-full">Sign Up</Submit>
							</Form>
							<div className="text-center text-sm">
								Don't have an account?{" "}
								<a href="/log-in" className="underline underline-offset-4">
									Log in
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src={background}
					loading="lazy"
					alt="placeholder"
					sizes="100vw"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
