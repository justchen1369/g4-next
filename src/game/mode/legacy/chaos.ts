import { PrimitiveMaterial } from "../mode";
import { G4LegacyMode } from "./legacy";
import { Level } from "../../level/level";
import { generateLegacyRing, LegacyRingType, LegacyRingDifficulty } from "../../generator/legacy";
import { Ring } from "../../level/ring";
import { Cannon } from "../../level/cannon";
import { BarPrimitive } from "../../level/primitives/bar";
import { IPrimitive } from "../../level/primitives/primitives";

export class G4ChaosMode extends G4LegacyMode {
    public modeID = "g4_chaos"
    public name = "Chaos"

    getMaterial(prim: IPrimitive): PrimitiveMaterial {
        const colors = this.getThemeColors(prim.ring.level)
        const ringParity = prim.ring.level.rings.indexOf(prim.ring) % 2

        const accentAlt = this.settings.getThemeColor(
            `g4.mode.${this.modeID}.accentAlt`
        )
        const accentAlt2 = this.settings.getThemeColor(
            `g4.mode.${this.modeID}.secondaryAccentAlt`
        )

        let color = ringParity ? accentAlt : accentAlt2

        if (prim instanceof Cannon) color = colors.foreground
        else if (prim instanceof BarPrimitive)
            color = ringParity ? colors.accent : colors.secondaryAccent

        return {
            color
        }
    }

    generateLevel(index: number): Level {
        const level = new Level(
            this, index
        )

        level.add(
            (() => {
                const ring = new Ring(level, 1)
                ring.add(
                    ...generateLegacyRing(
                        ring, LegacyRingType.deniseRing,
                        LegacyRingDifficulty.extreme, 200
                    )
                )
                return ring
            })(),
            (() => {
                const ring = new Ring(level, 0.5)
                ring.add(
                    ...generateLegacyRing(
                        ring, LegacyRingType.deniseRing,
                        LegacyRingDifficulty.extreme, 266
                    )
                )
                return ring
            })(),
            (() => {
                const ring = new Ring(level, 0.25)
                ring.add(
                    ...generateLegacyRing(
                        ring, LegacyRingType.deniseRing,
                        LegacyRingDifficulty.extreme, 333
                    )
                )
                return ring
            })(),
            (() => {
                const ring = new Ring(level, 0.125)
                ring.add(
                    ...generateLegacyRing(
                        ring, LegacyRingType.deniseRing,
                        LegacyRingDifficulty.extreme, 400
                    )
                )
                return ring
            })(),
        )

        const cannonRing = new Ring(
            level, 1
        )

        cannonRing.add(
            new Cannon(
                cannonRing,
                0, 0, 0, -1
            )
        )

        level.add(cannonRing)

        return level
    }
}