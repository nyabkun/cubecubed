import { Vector3 } from "@math/vector";

import { CanvasGroup } from "@group/CanvasGroup";
import { CanvasCubicon } from "./CanvasCubicon";

export interface PARTICLE_CONFIG {
    /**
     * @default "#fff"
     */
    strokeColor: string;
    /**
     * @default 2
     */
    strokeWidth: number;
}

export const PARTICLE_DEFAULT_CONFIG: PARTICLE_CONFIG = {
    strokeColor: "#fff",
    strokeWidth: 2,
};

/**
 * Creating a new `Particle()` object means render a point
 * on the animation screen. Do not call `render()` method
 * directly on any instance of this class, as it is handled
 * automatically by the group object.
 *
 * Particle term here only represents a point (aka a dot),
 * not a flow or anything like that.
 */
export class Particle extends CanvasCubicon {
    readonly cubType = "particle";

    /**
     * Config options of the particle.
     */
    CONFIG: PARTICLE_CONFIG;

    /**
     * @param params An object that contains options to form the particle.
     */
    constructor(params: {
        /**
         * The group that the particle belongs to
         */
        group: CanvasGroup;
        /**
         * Position of the particle.
         */
        position?: Vector3;
        /**
         * Scale the position vector of the particle by this number.
         */
        scaleFactor?: number;
        /**
         * Config options of the particle.
         */
        CONFIG?: PARTICLE_CONFIG;
    }) {
        super({
            group: params.group,
            position: params.position ?? new Vector3(0, 0, 0),
            scaleFactor: params.scaleFactor ?? 1,
        });

        this.CONFIG = {
            strokeColor:
                params.CONFIG?.strokeColor ??
                PARTICLE_DEFAULT_CONFIG.strokeColor,
            strokeWidth:
                params.CONFIG?.strokeWidth ??
                PARTICLE_DEFAULT_CONFIG.strokeWidth,
        };
    }

    render(p: any) {
        const { xGtoW, yGtoW, zGtoW } = this.group;

        const { strokeColor, strokeWidth } = this.CONFIG;

        p.stroke(strokeColor);
        p.strokeWeight(strokeWidth);

        p.point(
            xGtoW(this.position.x) * this.scaleFactor,
            yGtoW(this.position.y) * this.scaleFactor,
            zGtoW(this.position.z) * this.scaleFactor
        );
    }
}
