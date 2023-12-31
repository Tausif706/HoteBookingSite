import { NextResponse } from "next/server";

import prisma from "@/app/libs/Prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
     const currentUser = await getCurrentUser();

     if(!currentUser)
        return NextResponse.error()

    const body = await request.json();

    const {
            category,
            location,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price,
            title,
            description,
    } = body 


    //useless code if u want remove it 
    Object.keys(body).forEach((value: any) => {
        if(!body[value]){
            return NextResponse.error();
        }
    })

    const listing = await prisma.listing.create({
        data: {
            category,
            locationValue:location.value,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price:parseInt(price,10),
            title,
            description,
            userId:currentUser.id,
        }
    })
    return NextResponse.json(listing) 
}