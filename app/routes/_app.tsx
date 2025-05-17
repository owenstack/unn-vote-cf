import { Outlet } from "react-router";
import { Sidebar } from "~/components/protected/sidebar";
import type { Route } from "./+types/_app";
import { auth } from "~/lib/auth.server";
import { redirect } from "react-router";
import { adminLink, userLink } from "~/lib/constants";

export async function loader({ request }: Route.LoaderArgs) {
	const authz = await auth.api.getSession({ headers: request.headers });
	if (!authz?.user) {
		return redirect("/log-in");
	}
	return { role: authz.user.role };
}

export default function PosterLayout({ loaderData }: Route.ComponentProps) {
	const { role } = loaderData;
	return (
		<Sidebar menuLink={role === "admin" ? adminLink : userLink}>
			<Outlet />
		</Sidebar>
	);
}
