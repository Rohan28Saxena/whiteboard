import { Message } from "@/components/ui/message";
import { db, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req:NextRequest) {

    const user=await currentUser()

    //if user already exists

    if(user)
    {
        const userData=await db.select().from(users)
        //@ts-ignore
        .where(eq(user.primaryEmailAddress?.emailAddress,users.email))

        if(userData?.length>0)
        {
            return NextResponse.json(userData[0])
        }else
        {
            const result=await db.insert(users).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress??'',
                
            }).returning();
            return NextResponse.json(result[0]);
        }
    }

    return NextResponse.json({message:"unauthenticated"},{status:401})
    
}

