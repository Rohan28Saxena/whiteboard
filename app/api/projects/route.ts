import { db, projects } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // 1. Fixed: Use object destructuring instead of array destructuring
        const { projectName, projectId } = await req.json();
        
        // 2. Fetch the guaranteed authenticated user's email
        const user = await currentUser();
        const userEmail = user?.primaryEmailAddress?.emailAddress as string;
        
        // 3. Validate request body
        if (!projectId || !projectName) {
            return NextResponse.json({ error: 'Project Information missing' }, { status: 400 });
        }

        // 4. Insert into the database
        const result = await db.insert(projects).values({
            projectId: projectId,
            projectName: projectName,
            userEmail: userEmail
        }).returning();

        return NextResponse.json(result[0], { status: 201 });

    } catch (err) {
        console.error("Failed to create project:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}