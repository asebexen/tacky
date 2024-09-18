export var GameState;
(function (GameState) {
    GameState["XWin"] = "xwin";
    GameState["OWin"] = "owin";
    GameState["Tie"] = "tie";
    GameState["InProgress"] = "inprogress";
})(GameState || (GameState = {}));
;
export var TackyError;
(function (TackyError) {
    TackyError["PositionOutOfBounds"] = "PositionOutOfBounds";
    TackyError["CellOccupied"] = "CellOccupied";
    TackyError["GameEnded"] = "GameEnded";
})(TackyError || (TackyError = {}));
