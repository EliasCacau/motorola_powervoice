import { Feature } from "../features/feature.model"

export interface Reaction {
    featureId: number,
    userId: number,
    feature: Feature,
}
