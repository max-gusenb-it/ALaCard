import { PollCardService } from "../services/service/card/poll-card.service";
import { PollCard, PollCardResultConfig } from "@shared";

export type BasePollCardService = PollCardService<PollCard, PollCardResultConfig>;