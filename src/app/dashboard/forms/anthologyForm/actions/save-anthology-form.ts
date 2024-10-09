'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { AnthologyFormValues } from "@/src/forms/components/AnthologyFormComponents/interfaces/AnthologyForm";
import { getServerSession } from "next-auth";


export const saveAnthologyForm = async (payload: AnthologyFormValues, anthologyId: string | string[]) => {
    const session = await getServerSession(authOptions);

    if (!session?.user.roles.includes('admin' || 'editor')) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try {
        const response = await fetch(process.env.API_URL + `/cards/save/anthology/${anthologyId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error al guardar el formulario de autor:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo guardar el formulario del autor',
            };
        }

        return {
            ok: true,
            message: 'Formulario de autor guardado correctamente',
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return {
            ok: false,
            message: 'No se pudo realizar la acción',
        };
    }
};