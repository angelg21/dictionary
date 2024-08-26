'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUsers = async (excludedUser: string | undefined) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return {
                ok: false,
                message: 'El usuario debe estar autenticado para realizar esta acción',
            };
        }

        const response = await fetch(process.env.API_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ excludedUser }),
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los usuarios',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data: data,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'Error al obtener los usuarios',
        };
    }
};