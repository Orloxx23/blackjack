/* eslint-disable no-loop-func */
import * as React from "react";
import cardsImg from "../../assets/cards/cardsImg";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Match() {
  // Load cards
  const [cards, setCards] = React.useState([]);

  // User data
  const [coins, setCoins] = React.useState(0);

  // Match data
  const [bet, setBet] = React.useState(0);

  const [playerCards, setPlayerCards] = React.useState([]);
  const [playerTotal, setPlayerTotal] = React.useState(0);
  const [playerAceCount, setPlayerAceCount] = React.useState(0);

  const [crupierCards, setCrupierCards] = React.useState([]);
  const [crupierTotal, setCrupierTotal] = React.useState(0);
  const [crupierAceCount, setCrupierAceCount] = React.useState(0);

  // System
  const [disabled, setDisabled] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [finished, setFinished] = React.useState(false);

  const cargarCoins = () => {
    setCoins(500);
  };

  const barajarCartas = () => {
    let newCards = [];
    let _total = 0;
    for (let i = 0; i < 2; i++) {
      var randomNum = Math.floor(Math.random() * (52 + 0 - 0 + 0));
      let randomCard = cards.find((card) => card.id === randomNum);

      if (randomCard.number === 1) {
        setPlayerAceCount(playerAceCount + 1);
      }

      newCards.push(randomCard);
      if (randomCard.number === 1) {
        _total += 11;
      } else {
        _total += randomCard.number;
      }
    }
    setPlayerTotal(_total);
    setPlayerCards(newCards);

    isBlackjack(_total);

    cartasCrupier();
  };

  const cartasCrupier = () => {
    let newCards = [];
    let _total = 0;
    for (let i = 0; i < 1; i++) {
      var randomNum = Math.floor(Math.random() * (52 + 0 - 0 + 0));
      let randomCard = cards.find((card) => card.id === randomNum);
      newCards.push(randomCard);
      if (randomCard.number === 1) {
        _total += 11;
      } else {
        _total += randomCard.number;
      }
    }
    newCards.push(cards[52]);
    setCrupierTotal(_total);
    setCrupierCards(newCards);

  };

  const pedir = () => {
    let _total = playerTotal;
    var randomNum = Math.floor(Math.random() * (52 + 0 - 0 + 0));
    let randomCard = cards.find((card) => card.id === randomNum);

    if (randomCard.number === 1) {
      setPlayerAceCount(playerAceCount + 1);
    }

    _total += randomCard.number;

    _total -= 10 * playerAceCount;
    setPlayerAceCount(0);

    setPlayerTotal(_total);

    playerCards.push(randomCard);

    isBlackjack(_total);
  };

  const crupierPedir = (_playerTotal) => {
    var _total = crupierTotal;
    while (_total < 17) {
      var randomNum = Math.floor(Math.random() * (52 + 0 - 0 + 0));
      let randomCard = cards.find((card) => card.id === randomNum);

      if (randomCard.number === 1) {
        setCrupierAceCount(crupierAceCount + 1);
      }

      _total += randomCard.number;

      _total -= 10 * crupierAceCount;
      setCrupierAceCount(0);

      setCrupierTotal(_total);

      crupierCards.push(randomCard);
    }

    resultado(_playerTotal, _total);
  };

  const isBlackjack = (total) => {
    if (total > 21) {
      plantarse(total);
      return;
    }

    if (total === 21) {
      plantarse(total);
      return;
    }
  };

  const reset = () => {
    setPlayerCards([]);
    setPlayerTotal(0);
    setPlayerAceCount(0);

    setCrupierCards([]);
    setCrupierTotal(0);
    setCrupierAceCount(0);

    setFinished(false);
    setDisabled(false);
    setMessage("");

  };

  const plantarse = (_playerTotal) => {
    setDisabled(true);
    let newCards = crupierCards;
    newCards.pop();
    setCrupierCards(newCards);
    crupierPedir(_playerTotal);
  };

  const resultado = (_playerTotal, _crupierTotal) => {
    if (_playerTotal <= 21) {
      if (_playerTotal === 21) {
        setCoins(coins + (bet*2))
        setMessage("Ganaste 1");

      } else if (_crupierTotal > 21) {
        setCoins(coins + (bet*2))
        setMessage("Ganaste 2");

      } else if (_playerTotal === _crupierTotal) {
        if (_playerTotal === 21) {
          if (playerCards.length < crupierCards.length) {
            setCoins(coins + (bet*2))
            setMessage("Ganaste 3");

          }
        } else {
          const _coins = ((coins*1) + (bet*1));
          setCoins(_coins)
          setMessage("Empate");

        }
      } else if (_playerTotal > _crupierTotal) {
        setCoins(coins + (bet*2))
        setMessage("Ganaste 4");

      } else if (_playerTotal < _crupierTotal) {
        setMessage("Pierdes 1");
      }
    } else if (_playerTotal > 21) {
      setMessage("Pierdes 2");
    }
    setFinished(true);
  };

  const empezar = (e) => {
    e.preventDefault();
    if(bet < 1){
      alert("debes apostar algo")
    } else if(bet > coins){
      alert("dinero insuficiente")
    } else {
      setCoins(coins - bet);
      barajarCartas();
    }
  }

  const onBetChange = (e) =>{
    setBet(e.target.value);
  }

  React.useEffect(() => {
    setCards(cardsImg);
    cargarCoins();
  }, []);

  return (
    <Container style={{ paddingTop: "100px" }}>
      {`Coins: ${coins}`}
      {crupierCards.length > 0 ? (
        <div>
          {`Crupier Total: ${crupierTotal}`}
          <Row xs={1} md={5} style={{ marginBottom: "200px" }}>
            {crupierCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: "50%" }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  transition: { delay: index / 30 },
                }}
              >
                <Col>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px" }}
                  />
                </Col>
              </motion.div>
            ))}
          </Row>
        </div>
      ) : (
        <div></div>
      )}
      {playerCards.length > 0 ? (
        <div>
          <Row xs={1} md={5}>
            {playerCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: "50%" }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  transition: { delay: index / 30 },
                }}
              >
                <Col>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px" }}
                  />
                </Col>
              </motion.div>
            ))}
          </Row>
          <br />
          {`Total: ${playerTotal}`}
          <hr />
          <button disabled={disabled} onClick={pedir}>
            Pedir
          </button>
          <button disabled={disabled} onClick={() => plantarse(playerTotal)}>
            Plantarse
          </button>
          {/* <button onClick={reset}>Nuevo juego</button> */}
          {finished ? (
            <button onClick={reset}>Nuevo juego</button>
          ) : (
            ""
          )}
          {message}
        </div>
      ) : (
        <div>
          <p>Esperando inicio</p>
          <form onSubmit={(e) => empezar(e)}>
          <input type="number" onChange={(e) => onBetChange(e)} required/>
          <button type="submit">Empezar</button>
          </form>
        </div>
      )}
    </Container>
  );
}
