var activeDefender = false;
var isCharSelected = false;
var enemiesDefeated = 0;
var game = {
    character: [
        { name: 'Sith Troopers', image: 'assets/images/Sith-Troopers.png', HP: '100', BaseAP: '30', CurrentAP: '30', CAP: '20' },
        { name: 'Dark Jedi', image: 'assets/images/Dark-Jedi.png', HP: '120', BaseAP: '25', CurrentAP: '25', CAP: '25' },
        { name: 'Darth Malak', image: 'assets/images/darth-malak.jpg', HP: '140', BaseAP: '15', CurrentAP: '15', CAP: '30' },
        { name: 'Darth Revan', image: 'assets/images/Darth-Revan.jpg', HP: '160', BaseAP: '10', CurrentAP: '10', CAP: '35' },
        // { name: 'Darth Robert', image: 'assets/images/Darth-Bane.jpg', HP: '1800', BaseAP: '5', CurrentAP: '5', CAP: '40' },
    ],


    spawnCharacter: function () {
        // Do this to populate character selection area.
        for (var i = 0; i < this.character.length; i++) {
            // Creates character "tile" and gives it the id of character.name[i].
            var targetDiv = document.getElementById("charSelarea");
            var newChar = document.createElement("div");
            targetDiv.appendChild(newChar);
            newChar.setAttribute("id", i)
            newChar.setAttribute('class', 'charContainer charavatar')
            newChar.setAttribute('data-name', this.character[i].name)
            newChar.setAttribute('data-HP', this.character[i].HP)
            newChar.setAttribute('data-BaseAP', this.character[i].BaseAP)
            newChar.setAttribute('data-CurrentAP', this.character[i].CurrentAP)
            newChar.setAttribute('data-CAP', this.character[i].CAP)

            var targetDiv2 = document.getElementById(i);
            var nameDiv = document.createElement("div");
            targetDiv2.appendChild(nameDiv);
            nameDiv.innerHTML = this.character[i].name;
            nameDiv.setAttribute('class', 'charName');

            var imageDiv = document.createElement("div");
            targetDiv2.appendChild(imageDiv);
            imageDiv.innerHTML = '<img src="' + this.character[i].image + '">';
            imageDiv.setAttribute('class', "charImage");

            var HPDiv = document.createElement("div");
            targetDiv2.appendChild(HPDiv);
            HPDiv.innerHTML = "Health:" + $('#' + i).attr("data-HP") +"<br>" + "Attack Power:" + $('#' + i).attr("data-CurrentAP")+ "<br>" + "Counter-Attack:" + $('#' + i).attr("data-CAP");
            HPDiv.setAttribute('class', 'charStats');

            var overlayDiv = document.createElement("div");
            targetDiv2.appendChild(overlayDiv);
            overlayDiv.setAttribute('class', 'overlay');
            // overlayDiv. display:none");



        }
    },

    
    instructions: function () {
        $.colorbox({ width: "80%", height: "80%", href: 'https://brobert48.github.io/starwar-scroll-title/' });
    },

    reset: function () {
        // Do this to restart the game.
        $('#charSelarea').empty();
        $('#selectedCharacter').empty();
        $('#enemies').empty();
        $('#defenderTile').empty();
        $('#atkinfo').empty();
        $('#catkinfo').empty();
        activeDefender = false;
        isCharSelected = false;
        enemiesDefeated = 0;
        game.spawnCharacter();
    },
};


game.spawnCharacter();
game.instructions();

$("#charSelarea").on("click", ".charavatar", function () {
    $(this)
        .removeAttr('id')
        .removeClass('charavatar')
        .addClass('attacker')
        .appendTo("#selectedCharacter");
    var newHP2 = $('.attacker').attr('data-HP');
    var newAP = $('.attacker').attr('data-CurrentAP');
    $('.attacker .charStats').html('Health:' + newHP2 + "<br>" + 'Attack Power:' + newAP);


    isCharSelected = true;
    $('.charavatar').appendTo("#enemies")
    for (var i = 0; i < game.character.length; i++) {
        var newHP = $('#' + i).attr('data-HP');
        var newCAP = $('#' + i).attr('data-CAP');
        var targetDiv = $('#' + i + ' .charStats');
        targetDiv.html('Health:' + newHP + "<br>" + 'Counter Attack:' + newCAP)

    }


    $('.charavatar').removeClass('charavatar')
        .addClass('enemy');
});

function removeClass(){
    $('.defender .overlay').removeClass('damageOverlay');
    $('.attacker .overlay').removeClass('damageOverlay');
}
function emptyDiv(){
    $('#defenderTile').empty();}

function canClick(){
    activeDefender = false;
    
};
function emptyDiv2(){
    $('#selectedCharacter').empty();
    
}
$("#enemies").on("click", ".enemy", function () {
    if (activeDefender === false) {
        $(this)
            .removeClass('enemy')
            .addClass('defender')
            .appendTo('#defenderTile');
        $('#atkinfo').empty();
        $('#catkinfo').empty();
        activeDefender = true;
    }
});
$('#attack-btn').on('click', function () {
    if ($('.attacker').attr('data-HP') > 1) {
        if (activeDefender === true) {
            $('.defender .overlay').addClass('damageOverlay');
            setTimeout(removeClass, 1001);
            $('#atkinfo').empty();
            $('#catkinfo').empty();
            $('.defender').attr('data-HP', function (i, origValue) {
                var newHP = origValue - $('.attacker').attr('data-CurrentAP');
                var newHP2 = $('.attacker').attr('data-HP');
                var newCAP = $('.defender').attr('data-CAP');
                var newAP = $('.attacker').attr('data-CurrentAP');
                $('.defender .charStats').html('Health:' + newHP +"<br>" + 'Counter Attack:' + newCAP);
                $('.attacker .charStats').html('Health:' + newHP2 +"<br>" + 'Attack Power:' + newAP);               
                
                return newHP;
            })
            if ($('.defender').attr('data-HP') > 1) {
                $('.attacker').attr('data-HP', function (i, origValue) {
                    $('.attacker .overlay').addClass('damageOverlay');
                        setTimeout(removeClass, 1001);
                    var newHP = origValue - $('.defender').attr('data-cap');
                    var newAP = $('.attacker').attr('data-CurrentAP');
                    $('.attacker .charStats').html('Health:' + newHP +"<br>" + 'Attack Power:' + newAP);
                    return newHP;
                })
            }

            $('#atkinfo').append('You attacked ' + $('.defender').attr('data-name') + ' for ' + $('.attacker').attr('data-CurrentAP') + ' damage.');
            $('#catkinfo').append($('.defender').attr('data-name') + ' attacked you back for ' + $('.defender').attr('data-cap') + ' damage.');

            $('.attacker').attr('data-CurrentAP', function (i, origValue) {
                var newAP = +origValue + +$('.attacker').attr('data-BaseAP');
                var newHP = $('.attacker').attr('data-HP');
                $('.attacker .charStats').html('Health:' + newHP +"<br>" + 'Attack Power:' + newAP);
                return newAP;
            })
        

        if ($('.defender').attr('data-HP') < 1) {
            $('#atkinfo').empty();
            $('#catkinfo').empty();
            $('#atkinfo').append('You have defeated ' + $('.defender').attr('data-name') + ', you can choose to fight another enemy.');
            $('.defender').addClass('loser');
            setTimeout(emptyDiv, 900);
            setTimeout(canClick, 1001);
            
            enemiesDefeated++;
        }
        if ($('.attacker').attr('data-HP') < 1) {
            $('#atkinfo').empty();
            $('#catkinfo').empty();
            $('.attacker').addClass('loser');
            setTimeout(emptyDiv2, 900);
            $('#atkinfo').append('You have been defeated by ' + $('.defender').attr('data-name') + ' ...GAME OVER!!!');
            $('#catkinfo').append("<button onClick='game.reset()'>Restart Game</button>");
        }
        if (enemiesDefeated === game.character.length - 1) {
            $('#atkinfo').empty();
            $('#catkinfo').empty();
            $('.attacker').addClass('winner');
            $('#atkinfo').append('You WON!!!!!');
            $('#catkinfo').append("<button onClick='game.reset()'>Restart Game</button>");
        }

    }}
});

function newFunction() {
    document.onload.openColorBox();
}

