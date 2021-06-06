// Given two rectangles, find if the given two rectangles overlap or not.
// Note that a rectangle can be represented by two coordinates, top left and bottom right.
// So mainly we are given following four coordinates.
// l1: Top Left coordinate of first rectangle.
// r1: Bottom Right coordinate of first rectangle.
// l2: Top Left coordinate of second rectangle.
// r2: Bottom Right coordinate of second rectangle.
import assert from 'assert';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// do not overlap if secondRectTopLeft.x > firstRectBottomRight.x and secondRectTopLeft.y > firstRectBottomRight.y
// or if secondRectBottomRight.x > firstRectTopLeft.x and secondRectBottomRight.y > firstRectTopLeft.y
const areTwoRectanglesOverlapped = (firstRectTopLeft, firstRectBottomRight, secondRectTopLeft, secondRectBottomRight) => {
    const isSecondRectOutsideLeftTopPoint = secondRectBottomRight.x < firstRectTopLeft.x || secondRectBottomRight.y > firstRectTopLeft.y;
    const isSecondRectOutsideRightBottomPoint = secondRectTopLeft.x > firstRectBottomRight.x || secondRectTopLeft.y < firstRectBottomRight.y;

    if (isSecondRectOutsideLeftTopPoint || isSecondRectOutsideRightBottomPoint) {
        return false;
    }

    return true;
};

// tests
assert.strictEqual(areTwoRectanglesOverlapped(new Point(0, 4), new Point(6, -2), new Point(1, 5), new Point(4, 0)), true);
assert.strictEqual(areTwoRectanglesOverlapped(new Point(2, 3), new Point(5, 0), new Point(-2, 6), new Point(1, 1)), false);
assert.strictEqual(areTwoRectanglesOverlapped(new Point(0, 4), new Point(4, 0), new Point(-4, 8), new Point(0, 4)), true);
