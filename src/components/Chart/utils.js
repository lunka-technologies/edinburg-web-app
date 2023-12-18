const POINT = {
  NEGATIVE: "Negative",
  POSITIVE: "Positive",
  YOUR: "Your",
};

const POINTS = [
  { id: 0, name: POINT.NEGATIVE },
  { id: 1, name: POINT.POSITIVE },
  { id: 2, name: POINT.YOUR },
];

/**
 * @typedef {} FormattedPoint
 * @property {number} x Position of point on X axis, 3 digits after decimal
 * @property {number} y Position of point on Y axis, 3 digits after decimal
 * @property {string} smiles Molecule in SMILES format
 *
 * @memberof Chart
 */

/**
 * @typedef {} FormattedGroup
 * @property {string} id Label for group of points in the chart
 * @property {FormattedPoint[]} data Points for the chart
 *
 * @memberof Chart
 */

/**
 * Formats the array of points from /predict request to take the shape necessary for the chart. <br>
 * If groupId in numerical format is not assigned to its respective groupName, groupId will be used as groupName.
 *
 * @property {Points[]} points Raw points
 * @returns {FormattedGroup[]}
 *
 * @memberof Chart
 */
const formatPoints = (points) => {
  try {
    const pointMap = points.reduce((acc, { x, y, smiles, groupId }) => {
      const groupName = POINTS.find(({ id }) => id === groupId)?.name || groupId;
      const point = { x, y, smiles };

      if (!acc.has(groupName)) {
        acc.set(groupName, [point]);
        return acc;
      }

      const group = acc.get(groupName);
      acc.set(groupName, [...group, point]);
      return acc;
    }, new Map());

    return Array.from(pointMap, ([id, data]) => ({ id, data }));
  } catch {
    return [];
  }
};

/**
 * Function to shape the points into diamonds. <br>
 * Scatterplot passes the arguments under the hood.
 *
 * @property {Object} ctx Context of canvas
 * @property {Object} node Properties of point
 *
 * @memberof Chart
 */
const drawDiamond = (ctx, node) => {
  const { x, size, color } = node;
  const y = node.y - 4.5;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size / 2, y + size / 2);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

export { POINT, formatPoints, drawDiamond };
