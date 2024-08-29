'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getAllPendingReviews = async (userId?: string) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return {
                ok: false,
                message: 'El usuario debe estar autenticado para realizar esta acción',
            };
        }

        const response = !userId ? 
            await fetch(process.env.API_URL + '/cards/status/pending-review', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }) :
            await fetch(process.env.API_URL + `/cards/user/${userId}/reviewer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener las fichas',
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
            message: 'Error al obtener las fichas',
        };
    }
};