import { IMode, ModeThemeColors } from "../mode";
import { G4LegacyMode } from "./legacy";
import { Level } from "../../level/level";
import { getLegacyDifficulties, generateBasicLegacyRings } from "../../generator/legacy";
import { Ring } from "../../level/ring";
import { Cannon } from "../../level/cannon";

export class G4EasyMode extends G4LegacyMode {
    public modeID = "g4_easy"
    public name = "Easy"

    generateLevel(index: number): Level {
        const level = new Level(
            this, index
        )

        const difficulties = getLegacyDifficulties(index)

        level.add(
            ...generateBasicLegacyRings(
                level, [
                    Math.max(difficulties[0], 2),
                    0, 0
                ]
            )
        )

        const cannonRing = new Ring(
            level, 1
        )

        cannonRing.add(
            new Cannon(
                cannonRing,
                0, 0, 0, -1.5
            )
        )

        level.add(cannonRing)

        return level
    }
}