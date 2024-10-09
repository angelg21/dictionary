'use server'
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getAllRejectedSheets = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return {
                ok: false,
                message: 'El usuario debe estar autenticado para realizar esta acción',
            };
        }

        const response = await fetch(process.env.API_URL + '/cards/rejected', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
        })

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
            message: 'Error al obtener los usuarios',
        };
    }
};