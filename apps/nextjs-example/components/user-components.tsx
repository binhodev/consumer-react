"use client";

import { ConsumerReactClient } from "@consumer-react/core";
import { useGet } from "@consumer-react/next";
import { z } from "zod";

const client = new ConsumerReactClient({
    baseUrl: "https://jsonplaceholder.typicode.com",
});

const userSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        username: z.string(),
        email: z.string(),
    })
);

export const UserComponent = () => {
    const { data, isLoading, error } = useGet(client, "/users", {
        schema: userSchema,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    return (
        <ul>
            {data?.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email}) • ({user.username})
                </li>
            ))}
        </ul>
    );
};
