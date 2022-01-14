import {
    Axes,
    Group,
    Scene,
    COLOR,
    Create,
    FadeIn,
    PointAlongGraph,
    PointToCoords,
    DrawAxes,
    Write,
} from "../src/index";

/// This variable keeps track of the time goes by during the animations
/// We'll use this to control time, so don't forget to include it to your code
/// In this example, the scene has only one group, so we don't need `elapsed`
let elapsed = 0;

function graphingFunctions() {
    const scene = new Scene("graphing-functions");
    const gr = new Group("graphing-group", scene);

    const a = new Axes({
        group: gr,
        CONFIG: {
            xRange: [-4, 6],
            yRange: [-3, 3],
            hasNums: true,
        },
    }).render();
    gr.play([new DrawAxes(a)]);

    /// Plotting cosine graph
    const cos = a.graph({
        functionDef: (x) => Math.cos(x),
        color: COLOR.CYAN,
    });
    const tex = a.addGraphLabel(cos, "cos(x)");
    const pt = a.pointToCoords(cos, 2);
    gr.play([new Create({ cubicon: cos }), new Write({ cubicon: tex })]);
    gr.play([
        new PointToCoords({
            point: pt,
            graph: cos,
        }),
    ]);
    gr.play([
        new PointAlongGraph({
            point: pt,
            graph: cos,
            xPos: -3,
        }),
    ]);

    /// Plotting natural logarithm graph
    const ln = a.graph({
        functionDef: (x) => Math.log(x),
        color: COLOR.GREEN_1,
    });
    // a.addGraphLabel(ln, "ln(x)");
    gr.play([new Create({ cubicon: ln })]);
    gr.play([
        new PointAlongGraph({
            point: pt,
            graph: cos,
            xPos: 5,
        }),
    ]);

    /// Plotting cubic graph
    const cubic = a.graph({
        functionDef: (x) => x * x * x + 2 * x * x,
        color: COLOR.RED_2,
    });
    // a.addGraphLabel(cubic, "x^3 + 2x^2", 1.1);
    gr.play([new Create({ cubicon: cubic })]);
}

graphingFunctions();
