import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string

}

interface GetUserMetricsUseCaseResponse {
  checkInsCounter: number
}

export class GetUserMetricsUseCase {
  constructor(private chekInsRepository: CheckInsRepository) {}

  async execute({userId}:GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCounter = await this.chekInsRepository.countByUserId(userId)

    return {
      checkInsCounter
    }

  }
}