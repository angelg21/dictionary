'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GetWorksheet = async (id: string) => {
    try {

        const response = await fetch(process.env.API_URL + `/cards/texts/${id}`, {
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
            data,  // Devolvemos los datos en una clave `data`
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'Error al obtener los datos de la ficha',
        };
    }
};