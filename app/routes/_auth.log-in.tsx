import { Logo } from "~/components/logo";
import { ErrorCard } from "~/components/error-card";
import { useSearchParams, useNavigate, Link } from "react-router";
import { signIn } from "~/lib/auth.client";
import { Form } from "react-router";
import { toast } from "sonner";
import { Label } from "~/components/ui/label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { ChangeEvent } from "react";
import { Submit } from "~/components/submit";

export default function Page() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const error = searchParams.get("error");
	if (error) {
		return <ErrorCard error={error} />;
	}
	const submit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		try {
			await signIn.email(
				{
					email,
					password,
				},
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
					onSuccess: () => navigate("/"),
				},
			);
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Logo />
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Welcome back</CardTitle>
							<CardDescription>Login with your account details</CardDescription>
						</CardHeader>
						<CardContent>
							<Form onSubmit={submit} className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											to="/forgot-password"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input
										id="password"
										type="password"
										name="password"
										required
									/>
								</div>
								<Submit className="w-full">Login</Submit>
								{/* <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div> */}
							</Form>
						</CardContent>
					</Card>
					<div className="text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary ">
						By clicking continue, you agree to our{" "}
						<Link to="/tos">Terms of Service</Link> and{" "}
						<Link to="/tos">Privacy Policy</Link>.
					</div>
				</div>
			</div>
		</div>
	);
}
