import { FastifyReply, FastifyRequest } from 'fastify'

export const refreshController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {

  await request.jwtVerify({onlyCookie: true})
  /*
    isso aqui diz que ela nao vai olhar para o header e sim para o cookie, e vai buscar pelo refreshToken
    se daqui para baixo continuar sig que o refrsh token existir e que ele ainda e valido
  */

    const roles = request.user.role

    const token = await reply.jwtSign(
      {roles},
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )
    const refrshToken = await reply.jwtSign(
      {roles},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '15d',
        },
      },
    )

    return reply
    .setCookie('refreshToken', refrshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })
    .status(200).send({
      token,
    })
  
}
