import React from 'react';
import ReactDOM from 'react-dom';

const boardStyle = {
  background: 'rgb(198, 232, 236)',
  border: '1px solid rgb(16, 16, 16)',
  float: 'left',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '34px',
  height: '34px',
  marginRight: '-1px',
  marginTop: '-1px',
  padding: '0px',
  textAlign: 'center',
  width: '34px'
}

const boardRow={
  clear: 'both',
  content: "",
  display: 'table'
}

const game={
	marginTop: '300px',
	marginLeft: '500px'
}

const status={
	marginTop: '50px',
	marginLeft: '500px'
}

class Square extends React.Component{

	constructor(){
		super();
	}
	render(){
		return(
			<button id='buttonId' style={boardStyle} onClick={this.props.onClick}>{this.props.value}</button>
		)
	}
}
class Board extends React.Component{

	renderSquare(i){
		return(
			<Square
				onClick={()=>this.props.onClick(i)}
				value={this.props.squares[i]}/>
		);
	}

	render(){
		return(
			<div style={game}>
				<div style={boardRow}>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				
				<div style={boardRow}>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				
				<div style={boardRow}>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}

class GameStatus extends React.Component{
	render(){
		return(
			<div style={status}>
				<h3>Next Turn = {this.props.gameStatus}</h3>
				<h3>Game Winner = {this.props.winner}</h3>
			</div>
		)
	}

}
class Game extends React.Component{
	constructor(){
		super();
		this.state={
			nextState : true,
			squares:Array(9).fill(null),
			moveNum:0
		}
		 this.handleClick = this.handleClick.bind(this)
		 this.computeWinner = this.computeWinner.bind(this)
	}
	render(){
		const winner=this.computeWinner(this.state.squares);
		let status;
		if(winner){
			status="Game Over"
		}
		else{
			status=this.state.nextState ? 'O' : 'X';
		}
		return(
				<div>
					<Board onClick={i=>this.handleClick(i)}
							squares={this.state.squares}/>	
					<GameStatus
						winner={winner}
						gameStatus={status}/>
				</div>
			)
		}
	handleClick(i){
		const tempSquares=this.state.squares.slice();
		tempSquares[i]=this.state.nextState ? 'O' : 'X';
	
		if( this.computeWinner(this.state.squares) || this.state.squares[i] )
			return;
		this.setState({
			nextState:!this.state.nextState,
			squares:tempSquares,
			moveNum:this.state.moveNum+1
		});
	}
		
	computeWinner(squares){
		const result=[ 
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,4,8],
			[2,4,6],
			[0,3,6],
			[1,4,7],
			[2,5,8]
		]
		if(this.state.moveNum >0){
			for(let i=0;i<result.length;i++){
				const [a,b,c]=result[i]; 
				if((squares[a]==squares[b]) && (squares[b]==squares[c]) && (squares[c]==squares[a])){
						return squares[a];
				}
			}
		}
		return null;
	}
}
export default Game;