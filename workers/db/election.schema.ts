import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const student = sqliteTable("student", {
	id: text("id").primaryKey(),
	registrationNumber: text("registrationNumber").unique(),
	name: text("name").notNull(),
	departmentId: text("departmentId")
		.notNull()
		.references(() => department.id),
	facultyId: text("facultyId")
		.notNull()
		.references(() => faculty.id),
	biometricVerified: integer("biometricVerified", { mode: "boolean" }).default(
		false,
	),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const department = sqliteTable("department", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	facultyId: text("facultyId")
		.notNull()
		.references(() => faculty.id),
});

export const faculty = sqliteTable("faculty", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
});

export const biometric = sqliteTable("biometric", {
	id: text("id").primaryKey(),
	studentId: text("studentId")
		.unique()
		.references(() => student.id),
	faceImageUrl: text("faceImageUrl"),
	fingerTemplate: text("fingerTemplate"),
	verificationAttempts: integer("verificationAttempts").notNull().default(0),
	lastVerified: integer("lastVerified", { mode: "timestamp" }),
});

export const candidate = sqliteTable("candidate", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	studentId: text("studentId")
		.notNull()
		.references(() => student.id),
	electionId: text("electionId")
		.notNull()
		.references(() => election.id),
});

export const election = sqliteTable("election", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	type: text("type").notNull(),
	startDate: integer("startDate", { mode: "timestamp" }).notNull(),
	endDate: integer("endDate", { mode: "timestamp" }).notNull(),
	departmentId: text("departmentId").references(() => department.id),
	facultyId: text("facultyId").references(() => faculty.id),
	status: text("status").notNull().default("DRAFT"),
});

export const votingSession = sqliteTable("votingSession", {
	id: text("id").primaryKey(),
	studentId: text("studentId")
		.notNull()
		.references(() => student.id),
	otp: text("otp").unique().notNull(),
	status: text("status").notNull().default("GENERATED"),
	generatedAt: integer("generatedAt", { mode: "timestamp" }).notNull(),
	initialExpiry: integer("initialExpiry", { mode: "timestamp" }).notNull(),
	verifiedAt: integer("verifiedAt", { mode: "timestamp" }),
	extendedExpiry: integer("extendedExpiry", { mode: "timestamp" }),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const vote = sqliteTable("vote", {
	id: text("id").primaryKey(),
	studentId: text("studentId")
		.notNull()
		.references(() => student.id),
	electionId: text("electionId")
		.notNull()
		.references(() => election.id),
	candidateId: text("candidateId")
		.notNull()
		.references(() => candidate.id),
	votingSessionId: text("votingSessionId")
		.notNull()
		.references(() => votingSession.id),
});

export type Student = typeof student.$inferSelect;
export type Department = typeof department.$inferSelect;
export type Faculty = typeof faculty.$inferSelect;
export type Biometric = typeof biometric.$inferSelect;
export type Candidate = typeof candidate.$inferSelect;
export type Election = typeof election.$inferSelect;
export type VotingSession = typeof votingSession.$inferSelect;
export type Vote = typeof vote.$inferSelect;
