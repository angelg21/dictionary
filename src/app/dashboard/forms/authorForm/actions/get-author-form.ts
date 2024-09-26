'use server';

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Función para cargar los datos de agrupamiento
export const getAuthorForm = async (authorId: string | string[]) => {
    const session = await getServerSession(authOptions);

    // Verificar que el usuario tenga los permisos correctos
    if (!session?.user.roles.includes('admin')) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try {
        // Realizar la solicitud GET para obtener los datos de agrupamiento
        const response = await fetch(process.env.API_URL + `/cards/author/${authorId}`, {
            method: 'GET', // Cambiado a GET
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error al obtener los datos del agrupamiento:', responseData);
            return;
            // return {
            //     ok: false,
            //     message: responseData.message || 'No se pudo obtener los datos del agrupamiento',
            // };
        }

        return {
            responseData, // Devolvemos los datos obtenidos
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return;
        // return {
        //     ok: false,
        //     message: 'No se pudo realizar la acción',
        // };
    }
};