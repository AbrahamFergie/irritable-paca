import _ from "underscore"

let Board = function(size) {
    this.current_color = Board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
    this.in_atari = false;
    this.attempted_suicide = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

/*
 * Returns a size x size matrix with all entries initialized to Board.EMPTY
 */
Board.prototype.create_board = function(size) {
    let m = [];
    for (let i = 0; i < size; i++) {
        m[i] = [];
        for (let j = 0; j < size; j++)
            m[i][j] = Board.EMPTY;
    }
    return m;
};

/*
 * Switches the current player
 */
Board.prototype.switch_player = function() {
    this.current_color =
        this.current_color === Board.BLACK ? Board.WHITE : Board.BLACK;
};

/*
 * At any point in the game, a player can pass and let his opponent play
 */
Board.prototype.pass = function() {
    if (this.last_move_passed)
        this.end_game();
    this.last_move_passed = true;
    this.switch_player();
};

/*
 * Called when the game ends (both players passed)
 */
Board.prototype.end_game = function() {
    console.log("GAME OVER");
};

/*
 * Attempt to place a stone at (i,j). Returns true iff the move was legal
 */
Board.prototype.play = function(i, j) {
    console.log("Played at " + i + ", " + j);
    this.attempted_suicide = this.in_atari = false;

    if (this.board[i][j] !== Board.EMPTY)
        return false;

    let color = this.board[i][j] = this.current_color;
    let captured = [];
    let neighbors = this.get_adjacent_intersections(i, j);
    let atari = false;

    let self = this;
    _.each(neighbors, function(n) {
        let state = self.board[n[0]][n[1]];
        if (state !== Board.EMPTY && state !== color) {
            let group = self.get_group(n[0], n[1]);
            console.log(group);
            if (group["liberties"] === 0)
                captured.push(group);
            else if (group["liberties"] === 1)
                atari = true;
        }
    });

    // detect suicide
    if (_.isEmpty(captured) && this.get_group(i, j)["liberties"] === 0) {
        this.board[i][j] = Board.EMPTY;
        this.attempted_suicide = true;
        return false;
    }

    _.each(captured, function(group) {
        _.each(group["stones"], function(stone) {
            self.board[stone[0]][stone[1]] = Board.EMPTY;
        });
    });

    if (atari)
        this.in_atari = true;

    this.last_move_passed = false;
    this.switch_player();
    return true;
};

/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthagonally adjacent intersections
 */
Board.prototype.get_adjacent_intersections = function(i , j) {
    let neighbors = [];
    if (i > 0)
        neighbors.push([i - 1, j]);
    if (j < this.size - 1)
        neighbors.push([i, j + 1]);
    if (i < this.size - 1)
        neighbors.push([i + 1, j]);
    if (j > 0)
        neighbors.push([i, j - 1]);
    return neighbors;
};

/*
 * Performs a breadth-first search about an (i,j) position to find recursively
 * orthagonally adjacent stones of the same color (stones with which it shares
 * liberties). Returns null for if there is no stone at the specified position,
 * otherwise returns an object with two keys: "liberties", specifying the
 * number of liberties the group has, and "stones", the list of [i,j]
 * coordinates of the group's members.
 */
Board.prototype.get_group = function(i, j) {

    let color = this.board[i][j];
    if (color === Board.EMPTY)
        return null;

    let visited = {}; // for O(1) lookups
    let visited_list = []; // for returning
    let queue = [[i, j]];
    let count = 0;
    let self = this
    let identifyGroup = function(n) {
        let state = self.board[n[0]][n[1]];
        if (state === Board.EMPTY)
            count++;
        if (state === color)
            queue.push([n[0], n[1]]);
    }
    while (queue.length > 0) {
        let stone = queue.pop();
        if (visited[stone])
            continue;

        let neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
        _.each( identifyGroup(neighbors))

        visited[stone] = true;
        visited_list.push(stone);
    }

    return {
        "liberties": count,
        "stones": visited_list
    };
}

export default Board