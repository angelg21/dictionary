'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { AuthorTextValues } from "@/src/worksheetsReview/interfaces/AuthorWorkSheetReview";
import { getServerSession } from "next-auth";



export const ValidateAuthorWorkSheet = async (payload: AuthorTextValues, authorId: string | string[]) => {
    const session = await getServerSession(authOptions);

    if (!session?.user.roles.includes('admin' || 'reviewer')) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try {
        console.log(payload)
        const responseValidate = await fetch(process.env.API_URL + `/cards/save-texts/${authorId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload}),
        });

        const responseNeo4j = await fetch(process.env.API_URL + `/cards/upload/author/${authorId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
        });

        const responseAuthor = await responseValidate.json();
        const responseAuthorNeo4j = await responseNeo4j.json();

        if (!responseAuthor || !responseAuthorNeo4j) {
            console.error('Error al validar la ficha:', responseAuthor);
            return {
                ok: false,
                message: responseAuthor.message || 'No se pudo validar la ficha',
            };
        }

        return {
            ok: true,
            message: 'Ficha validada correctamente',
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return {
            ok: false,
            message: 'No se pudo realizar la acción',
        };
    }
};