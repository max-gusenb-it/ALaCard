import { PollCard } from "../models/interfaces";
import { PollCardService } from "../services/service/card/poll-card.service";

export type BasePollCardService = PollCardService<PollCard>;