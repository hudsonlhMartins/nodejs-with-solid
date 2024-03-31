import { FastifyReply, FastifyRequest } from "fastify";

export function validateRoles (roleToVerify: 'ADMIN'| 'MEMBER'){
    return async (request:FastifyRequest, reply:FastifyReply) => {
        const role = request.user.role
        if(role !== roleToVerify){
            return reply.status(401).send({message: 'Unauthorized'})
        }
    }
}