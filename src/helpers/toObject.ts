const toObject = (lines: string[], fragments = {}): RecursiveObject => {
    let openParenths = 0;
    let returnObj: RecursiveObject = {};
    lines.forEach(line => {
        if (line.includes("}")) {
            openParenths = openParenths - 1;
        } else {
            const cleanLine = line.replace("{", "").trim();
            returnObj = recursivelyAddChild(
                returnObj,
                openParenths,
                cleanLine,
                fragments,
            );
        }

        if (line.includes("{")) {
            openParenths = openParenths + 1;
        }
    });

    return returnObj;
};

function recursivelyAddChild(
    mainObject: RecursiveObject,
    levelsDown: number,
    child: string,
    fragments?: RecursiveObject,
) {
    const prevLastChild = Object.keys(mainObject)[
        Object.keys(mainObject).length - 1
    ];
    if (levelsDown > 0) {
        recursivelyAddChild(
            mainObject[prevLastChild],
            levelsDown - 1,
            child,
            fragments || {},
        );
    } else {
        if (fragments && child.includes("...")) {
            const fragmentId: string = child.trim().replace(/.../, "");

            if (fragments[fragmentId]) {
                Object.assign(mainObject, fragments[fragmentId]);
            } else {
                mainObject[child] = {};
            }
        } else {
            mainObject[child] = {};
        }
    }
    return mainObject;
}
export { toObject };
