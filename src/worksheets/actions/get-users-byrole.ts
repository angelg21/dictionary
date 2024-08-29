'use server'
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface GetUsersByRoleProps {
  type: string;
  excludeIds: string[];
}

export const getUsersByRole = async( {type, excludeIds = []}: GetUsersByRoleProps) => {

    const session = await getServerSession(authOptions);

    if ( !session?.user.roles.includes('admin') ) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try{
        const response = await fetch(process.env.API_URL + `/users/find-by-role?type=${type}&excludeIds=${excludeIds.join(', ')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'No se pudo obtener los usuarios',
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
            message: 'No se pudo actualizar el rol',
        };
    }
}
