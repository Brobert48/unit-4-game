var activeDefender = false;
var isCharSelected= false;
var game ={
    character:[ 
        {name:'characterOne', image:'assets/images/starwarsplaceholder.jpg', HP:'100', BaseAP:'20', CurrentAP:'20', CAP:'20'},
        {name:'characterTwo', image:'assets/images/starwarsplaceholder.jpg', HP:'120', BaseAP:'25', CurrentAP:'20', CAP:'25'},
        {name:'characterThree', image:'assets/images/starwarsplaceholder.jpg', HP:'140', BaseAP:'30', CurrentAP:'20', CAP:'30'},
        {name:'characterFour', image:'assets/images/starwarsplaceholder.jpg', HP:'160', BaseAP:'35', CurrentAP:'20', CAP:'35'},
    ],
    

    spawnCharacter: function(){
        // Do this to populate character selection area.
        for(var i = 0; i < this.character.length; i++){
            // Creates character "tile" and gives it the id of character.name[i].
            var targetDiv = document.getElementById("charSelarea");
            var newChar = document.createElement("div");
            targetDiv.appendChild(newChar);
            newChar.setAttribute("id", this.character[i].name)
            newChar.setAttribute('class','charContainer charavatar')
            newChar.setAttribute('data-HP', this.character[i].HP)
            newChar.setAttribute('data-BaseAP', this.character[i].BaseAP)
            newChar.setAttribute('data-CurrentAP', this.character[i].CurrentAP)
            newChar.setAttribute('data-CAP', this.character[i].CAP)

            var targetDiv2 = document.getElementById(this.character[i].name);
            var nameDiv= document.createElement("div");
            targetDiv2.appendChild(nameDiv);
            nameDiv.innerHTML =  this.character[i].name;
            nameDiv.setAttribute('class','charName');

            var imageDiv = document.createElement("div");
            targetDiv2.appendChild(imageDiv);
            imageDiv.innerHTML = '<img src="'+this.character[i].image+'">';
            imageDiv.setAttribute('class',"charImage");

            var HPDiv = document.createElement("div");
            targetDiv2.appendChild(HPDiv);
            HPDiv.innerHTML = $('#'+this.character[i].name).attr("data-HP");
            HPDiv.setAttribute('class','charHP');         

            
        }
    },

    characterSelect: function(){
        // Do this when player selects character.
        // assign character an ID on click to target for cloning and remove class shared by all character tiles.
        // clone character with the above ID to 'selectedCharacter' div
        // move the others to 'enemies' div by targeting class shared by all three.
        // clear 'charSelarea' div
    },

    enemySelct: function(){
        // assign ID to enemy onClick to target for cloning
        // clone to 'defenderTile' div
        // remove from 'enemies' div

    },

    enemyDefeat:function(){
        // do this when player defeats enemy.
        // clear 'defenderTile' section

    },

    playerDefeat:function(){
        // Do this when player is.
    },

    attack: function(){
        // Do this when player attacks.


    },

    reset:function(){
        // Do this to restart the game.
    },
};
game.spawnCharacter();

$( "#charSelarea" ).on( "click", ".charavatar", function() {
    $(this)
    .removeClass('charavatar')
    .addClass('attacker')
    .appendTo("#selectedCharacter");
    isCharSelected= true;
    $('.charavatar').appendTo("#enemies")
    .removeClass('charavatar')
    .addClass('enemy');
});
$( "#enemies" ).on( "click", ".enemy", function() {
    if(!activeDefender){
        $(this)
        .removeClass('enemy')
        .addClass('defender')
        .appendTo('#defenderTile');
        activeDefender = true;
    }});
$('#attack-btn').on('click', function(){
    $('.defender').attr('data-HP', function(i,origValue){
        var newHP = origValue - $('.attacker').attr('data-CurrentAP');
        $('.defender .charHP').text(newHP);
        return newHP;
    })
    $('.attacker').attr('data-HP',function(i,origValue){
        var AnewHP = origValue - $('.defender').attr('data-cap');
        $('.attacker .charHP').text(AnewHP);
        return AnewHP;
    // subtract defender HP by attacker CurrentAP. Add BaseAP to CurrentAP.
    // subtract attacker HP by defender CAP.
})});

