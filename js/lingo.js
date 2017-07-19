$(document).ready(function(){
    initialize();
    kiesAantalSpelers();
});
var MAX_AANTAL_BEURTEN = 5;
var aantal_beurten;
var score_speler_1;
var score_speler_2;
var aantalSpelers;
var playerTurn;
var woord_for_user;
function counter(){
    var counter = 0;
    var interval = setInterval(function() {
        counter++;
        // Display 'counter' wherever you want to display it.
        if (counter == 5) {
            // Display a login box
            clearInterval(interval);
        }
    }, 1000);
}   // uitzoeken hoe ik dit implementeer.
function initialize(){
    $('#startScreen').empty();
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWoordForUser(0);
    setAantalSpelers(0);
    setPlayerTurn('speler1');
    setBeurten(MAX_AANTAL_BEURTEN);
}
function kiesAantalSpelers(){
    $('#speler1, #speler2, #errormsgs, #winnermsg, #uitvoer, #startScreen').empty();

    $('<h1>').text('LINGO!').appendTo('#startScreen');
    var jqo_table = $('<table>').appendTo('#startScreen');
    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({id: '1Speler', value: '1 Speler', type: 'button'}).appendTo(jqo_td);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({id: '2Spelers', value: '2 Spelers', type: 'button'}).appendTo(jqo_td);

    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({id: '5letter', value: '5 letter woord', type: 'button'}).appendTo(jqo_td);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({id: '7letter', value: '7 letter woord', type: 'button'}).appendTo(jqo_td);

    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({id: 'startSpel', value: 'Start Spel!', type: 'button'}).appendTo(jqo_td);


    showPlayerInfo(getAantalSpelers(), getWoordForUser())
    $('#1Speler').click(function(){
        setAantalSpelers(1);
        showPlayerInfo(getAantalSpelers(), getWoordForUser())
    });
    $('#2Spelers').click(function(){
        setAantalSpelers(2);
        showPlayerInfo(getAantalSpelers(), getWoordForUser())
    });
    $('#5letter').click(function(){
        setWoordForUser(5);
        showPlayerInfo(getAantalSpelers(), getWoordForUser())
    });
    $('#7letter').click(function(){
        setWoordForUser(7);
        showPlayerInfo(getAantalSpelers(), getWoordForUser())
    });
    $('#startSpel').click(function(){
        if(woord_for_user != '' && (aantalSpelers > 0 && aantalSpelers < 3)){
            $('#startScreen, #uitvoer').empty();
            setPlayerTurn('speler1');
            maakLingoScherm();
            setFirstLetter();
            startSpel();
        }
    });
}
function maakLingoScherm() {
    var jqo_table = $('<table>').appendTo($('#startScreen'));
    var jqo_tr = $('<tr>').appendTo(jqo_table);
    $('<th>').text('LINGO').appendTo(jqo_tr);

    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({
        type: 'text',
        id: 'playWord',
        placeholder: 'Typ hier je ' + getWoordForUser().length + ' letter woord.',
        maxlength: getWoordForUser().length
    }).appendTo(jqo_td);

    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({type: 'button', id: 'playWordBtn', value: 'submit woord!'}).appendTo(jqo_td);

    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<p>').attr({id: 'aantal-beurten'}).text('aantal beurten: ' + getBeurten()).appendTo(jqo_td);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<p>').attr({id: 'aanDeBeurt'}).text('aan de beurt: ' + getPlayerTurn()).appendTo(jqo_td);

    var jqo_tr = $('<tr>').appendTo(jqo_table);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({type: 'button', id: 'opnieuw', value: 'opnieuw'}).appendTo(jqo_td);
    var jqo_td = $('<td>').appendTo(jqo_tr);
    $('<input>').attr({type: 'button', id: 'nextWord', value: 'Volgende woord!'}).appendTo(jqo_td);
    $('#nextWord').prop('disabled',true);
    $('#nextWord').click(function () {
        $('#uitvoer, #winnermsg').empty();
        $('#nextWord').prop('disabled',true);
        $('#playWordBtn, #playWord').prop('disabled', false);
        setWoordForUser(getWoordForUser().length);
        setFirstLetter();
        setBeurten(MAX_AANTAL_BEURTEN);
        showAantalBeurten();
        showAanDeBeurt();
    });
    $('#opnieuw').click(function () {
        setPlayer2Score(0);
        setPlayer1Score(0);
        setBeurten(MAX_AANTAL_BEURTEN);
        setWoordForUser(0);
        setAantalSpelers(0);
        kiesAantalSpelers();
    });
    showPlayerScore();
}
function setFirstLetter(){
    var jqo_table = $('<table>').appendTo('#uitvoer');
    var jqo_tr = $('<tr>').appendTo(jqo_table);
    $('<td>').attr({style: 'background-color: green'}).text(getWoordForUser().charAt(0)).appendTo(jqo_tr);
    for(var i = 1; i < getWoordForUser().length; i++){
        $('<td>').text('.').appendTo(jqo_tr);
    }
}
function setAllLetter(){
    var jqo_table = $('<table>').appendTo('#uitvoer');
    var jqo_tr = $('<tr>').appendTo(jqo_table);
    for(var i = 0; i < getWoordForUser().length; i++){
        $('<td>').attr({style: 'background-color: green'}).text(getWoordForUser().charAt(i)).appendTo(jqo_tr);
    }
}
function showPlayerScore(){
    $('#speler1, #speler2').empty();
    if (getAantalSpelers() > 1) {
        if(getPlayerTurn() == 'speler1') {
            var jqo_table = $('<table>').appendTo('#speler1');
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<img>').attr({src: 'img/speler.png', style: 'height:100px; width:100px;'}).appendTo(jqo_td);
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<p>').text('Speler 1, Score: ' + getPlayer1Score()).appendTo(jqo_td);

            var jqo_table = $('<table>').appendTo('#speler2');
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<img>').attr({src: 'img/spelergrayed.jpg', style: 'height:100px; width:100px;'}).appendTo(jqo_td);
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<p>').text('Speler 2, Score: ' + getPlayer2Score()).appendTo(jqo_td);
        }else{
            var jqo_table = $('<table>').appendTo('#speler1');
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<img>').attr({src: 'img/spelergrayed.jpg', style: 'height:100px; width:100px;'}).appendTo(jqo_td);
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<p>').text('Speler 1, Score: ' + getPlayer1Score()).appendTo(jqo_td);

            var jqo_table = $('<table>').appendTo('#speler2');
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<img>').attr({src: 'img/speler.png', style: 'height:100px; width:100px;'}).appendTo(jqo_td);
            var jqo_tr = $('<tr>').appendTo(jqo_table);
            var jqo_td = $('<td>').appendTo(jqo_tr);
            $('<p>').text('Speler 2, Score: ' + getPlayer2Score()).appendTo(jqo_td);
        }
    }else{
        var jqo_table = $('<table>').appendTo('#speler1');
        var jqo_tr = $('<tr>').appendTo(jqo_table);
        var jqo_td = $('<td>').appendTo(jqo_tr);
        $('<img>').attr({src: 'img/speler.png', style: 'height:100px; width:100px;'}).appendTo(jqo_td);
        var jqo_tr = $('<tr>').appendTo(jqo_table);
        var jqo_td = $('<td>').appendTo(jqo_tr);
        $('<p>').text('Speler 1, Score: ' + getPlayer1Score()).appendTo(jqo_td);
    }
}
function checkWoord(playerAnser, placeToPut){
    var status = new Array;
    var tempAnser = getWoordForUser();

    //Green, kijk welke letters groen moeten worden en vervang de groene letters met een *
    for (var i = 0; i < getWoordForUser().length; i++) {
        if (playerAnser.charAt(i) === tempAnser.charAt(i)) {
            status[i] = 'green';
            tempAnser = tempAnser.replaceAt(i, '*');
        }
    }
    //Yellow, kijk welke letters geel moeten zijn en vervang die met een * zodat er niet meer
    // geel worden dan dat er in zitten.
    for (var i = 0; i < getWoordForUser().length; i++) {
        if ((tempAnser.indexOf(playerAnser.charAt(i))) > -1) {
            for (var j = 0; j < getWoordForUser().length; j++) {
                if (playerAnser.charAt(i) === tempAnser.charAt(j)) {
                    status[i] = 'orange';
                    tempAnser = tempAnser.replaceAt(j, '*');
                }
            }
        }
        $('<td>').attr({style: 'background-color:' + status[i]})
            .text(playerAnser.charAt(i)).appendTo(placeToPut);
    }
}
function showAanDeBeurt(){
    $('#aanDeBeurt').text('aan de beurt: ' + getPlayerTurn());
}
function showAantalBeurten(){
    $('#aantal-beurten').text('aantal beurten: ' + getBeurten());
}
function startSpel(){
    $('#playWordBtn').click(function(){
        $('#errormsgs').empty();
        var playerAnser = $('#playWord').val().toUpperCase();
        if(playerAnser.length == getWoordForUser().length) {
            var jqo_table = $('<table>').appendTo('#uitvoer');
            if(getBeurten() >= 0) {
                var jqo_tr = $('<tr>').appendTo(jqo_table);

                checkWoord(playerAnser,jqo_tr);
                setBeurten(getBeurten()-1); // verlaagt de aantal beurten bij 1
                showAantalBeurten();

                if(playerAnser === getWoordForUser()){
                    $('#nextWord').prop('disabled',false);
                    $('#playWordBtn, #playWord').prop('disabled', true);
                    if(getPlayerTurn() === 'speler1'){
                        setPlayer1Score(getPlayer1Score()+(getBeurten()*10)+10);
                    }else{
                        setPlayer2Score(getPlayer2Score()+(getBeurten()*10)+10);
                    }
                    if(getAantalSpelers()>1){
                        switchPlayer();
                    }
                    showPlayerScore();
                    $('<h6>').text('congrats').appendTo('#winnermsg');
                }else
                if(getBeurten() == 0){
                    $('#playWordBtn, #playWord').prop('disabled', true);
                    setAllLetter();
                    if(getAantalSpelers() > 1){
                        switchPlayer();
                    }
                    showPlayerScore();
                    $('<h6>').text('Helaas').appendTo('#winnermsg');
                }
            }
        }else{
            var jqo_ul_error = $('<ul>').attr({id: 'error'}).appendTo($('#errormsgs'));
            $('<li>').text('Het woord heeft niet genoeg letters.').appendTo(jqo_ul_error);
        }
        $('#playWord').val('');
    });
}
function switchPlayer(){
    if(getPlayerTurn() === 'speler1'){
        setPlayerTurn('speler2');
    }else{
        setPlayerTurn('speler1');
    }
}
function showPlayerInfo(){
    $('#uitvoer').empty();
    $('<p>').text('aantal Spelers: ' + getAantalSpelers()).appendTo('#uitvoer');
    $('<p>').text('aantal Letter woord: ' + getWoordForUser().length).appendTo('#uitvoer');
}
function setPlayerTurn(player){
    playerTurn = player;
}
function getPlayerTurn(){
    return playerTurn;
}
function setWoordForUser(lettergame){
    var woorden_lijst = [];
    if(lettergame == 5){
        woorden_lijst = [ 'schip', 'schop',
            'schat', 'prins', 'priem', 'praam', 'braam', 'disco', 'vlees',
            'vrees', 'water', 'laars', 'kaars' ];
    }else if(lettergame == 7){
        woorden_lijst = ['paarden'];
    }else{
        woorden_lijst = [''];
    }
    woord_for_user = woorden_lijst[Math.floor(Math.random() * woorden_lijst.length)].toUpperCase();
}
function getWoordForUser(){
    return woord_for_user;
}
function setAantalSpelers(spelers){
    aantalSpelers = spelers;
}
function getAantalSpelers(){
    return aantalSpelers;
}
function setPlayer1Score(player1Score){
    score_speler_1 = player1Score;
}
function getPlayer1Score(){
    return score_speler_1;
}
function setPlayer2Score(player2Score){
    score_speler_2 = player2Score;
}
function getPlayer2Score(){
    return score_speler_2;
}
function getBeurten(){
    return aantal_beurten;
}
function setBeurten(beurten){
    aantal_beurten = beurten;
}
String.prototype.replaceAt=function(index, character){
    return this.substr(0, index) + character + this.substr(index+character.length);
}