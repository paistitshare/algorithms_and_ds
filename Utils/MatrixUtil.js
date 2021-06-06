export function printMatrix (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const rowItems = [];

        for (let j = 0; j < matrix[0].length; j++) {
            rowItems.push(matrix[i][j]);
        }

        console.log(rowItems);
    }
};
