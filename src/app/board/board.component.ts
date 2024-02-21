import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from "../square/square.component";

@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrl: './board.component.css',
    imports: [CommonModule, SquareComponent]
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string = "";

  constructor() {

  }
  ngOnInit(): void {
      this.newGame()
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = "";
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(i: number) {
    if (!this.squares[i] && !this.calculateWinner()) {
      this.squares.splice(i, 1, this.player)
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    var filledSquares = 0
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
      if (this.squares[i]) {
        filledSquares += 1;
      }
    }

    if (filledSquares >= 8) {
      return "no one"
    }

    return null;
  }
}
