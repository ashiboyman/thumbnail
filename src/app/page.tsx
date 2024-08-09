"use client";
import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { log } from "console";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

export default function Home() {
    const { isSignedIn } = useSession();
    const createThumbnail = useMutation(api.thumbnails.createThumbnail);
    const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
    return (
        <main className="">
            {!isSignedIn ? <SignInButton /> : <SignOutButton />}

            {isSignedIn && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(e.currentTarget);
                        const title = formData.get("title") as string;
                        await createThumbnail({ title });
                        form.reset();
                        // console.log(title);
                    }}
                >
                    <label>Title</label>
                    <input type="text" className="text-black" name="title" />
                    <button>Create</button>
                </form>
            )}

            {thumbnails?.map((thumbnail) => {
                return <div key={thumbnail._id}>{thumbnail.title}</div>;
            })}
        </main>
    );
}
