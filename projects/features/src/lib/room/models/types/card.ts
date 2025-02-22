import { PollCardService } from "@features";
import { PollCard, PollCardResultConfig } from "@shared";

export type BasePollCardService = PollCardService<PollCard, PollCardResultConfig>;