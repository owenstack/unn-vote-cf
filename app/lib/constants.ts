import type {
	Biometric,
	Candidate,
	Election,
	Student,
} from "workers/db/election.schema";
import { z } from "zod";

declare global {
	interface Window {
		// biome-ignore lint/suspicious/noExplicitAny: the type for the sdk is inaccurate
		Fingerprint: any;
	}
}
export interface ButtonProps {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	children: React.ReactNode;
}

export interface Menu {
	icon: string;
	title: string;
	url: string;
}

export const userLink: Menu[] = [
	{ icon: "UserPlus2", title: "Biometric Capture", url: "/add-student" },
	{ icon: "UserCheck", title: "Verify Student", url: "/verify-student" },
	{ icon: "Vote", title: "Vote", url: "/vote" },
	{ icon: "Combine", title: "Elections", url: "/elections" },
];

export const adminLink: Menu[] = [
	{ icon: "Home", title: "Home", url: "/" },
	{ icon: "UserPlus2", title: "Biometric Capture", url: "/add-student" },
	{ icon: "UserCheck", title: "Verify Student", url: "/verify-student" },
	{ icon: "Vote", title: "Vote", url: "/vote" },
	{ icon: "Combine", title: "Elections", url: "/elections" },
	{ icon: "Users", title: "Users", url: "/admin/users" },
	{ icon: "GraduationCap", title: "Students", url: "/admin/students" },
];

export interface StudentBio extends Student {
	biometric: Biometric | null;
}

export interface FullElection extends Election {
	candidates: (Candidate & {
		votes: {
			id: string;
			candidateId: string;
		}[];
	})[];
}

export interface PreviewElection extends Election {
	candidates: Candidate[];
}

export const schema = z.object({
	title: z.string(),
	description: z.string().optional(),
	type: z.enum(["GENERAL", "FACULTY", "DEPARTMENT"]),
	startDate: z.date(),
	endDate: z.date(),
	departmentId: z.string().optional(),
	facultyId: z.string().optional(),
});

export const candidateSchema = z.object({
	name: z.string(),
	studentId: z.string(),
	electionId: z.string(),
});

export const studentSchema = z.object({
	name: z.string(),
	id: z.string(),
	registrationNumber: z.string(),
	departmentId: z.string(),
	facultyId: z.string(),
	biometricVerified: z.boolean(),
	biometricId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
