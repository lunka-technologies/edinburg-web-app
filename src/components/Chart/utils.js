export const POINT = {
  NEGATIVE: "Negative",
  POSITIVE: "Positive",
  YOUR: "Your",
};

const POINTS = [
  { id: 0, name: POINT.NEGATIVE },
  { id: 1, name: POINT.POSITIVE },
  { id: 2, name: POINT.YOUR },
];

export const formatPoints = (points) => {
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

export const drawDiamond = (ctx, node) => {
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
