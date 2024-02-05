import "./Character.css";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "dead":
      return "rgb(214, 61, 46)";
    case "alive":
      return "rgb(85, 204, 68)";
    case "unknown":
      return "rgb(0, 0, 0.37)";
    default:
      return "rgb(0, 0, 0.37)";
  }
};

const Character = ({ character }) => {
  return (
    <div className="clsCharacter">
      <div>
        <img alt="logo" src={character.image}></img>
      </div>
      <div className="clsCard">
        <div className="clsName">{character.name}</div>
        <div className="clsStatus">
          <span
            className="dot"
            style={{ background: getStatusColor(character.status) }}
          ></span>
          <span className="clsStatusVal">
            {character.status} - {character.species}
          </span>
        </div>
        <div className="clsLocation">
          <div className="grey-text">Last known location:</div>
          <div>{character.location.name}</div>
        </div>
        <div className="clsOrigin">
          <div className="grey-text">First seen in:</div>
          <div>{character.origin.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Character;
