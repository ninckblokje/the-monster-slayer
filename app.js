new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        monsterHealth: 100,
        playerHealth: 100,
        turns: []
    },
    methods: {
        attack: function() {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
            }

            this.log(true, "Player hits Monster for " + damage);

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                this.log(true, "Player beats Monster");
                if (confirm("You won! New game?")) {
                    this.startGame();
                } else {
                    this.stopGame();
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                this.log(false, "Monster beats Player");
                if (confirm("You lost! New game?")) {
                    this.startGame();
                } else {
                    this.stopGame();
                }
                return true;
            } else {
                return false;
            }
        },
        heal: function() {
            if (this.playerHealth > 90) {
                var healing = 100 - this.playerHealth;
                this.playerHealth = 100;
                this.log(true, "Player heals with " + healing);
            } else {
                this.playerHealth += 10;
                this.log(true, "Player heals with 10");
            }

            this.monsterAttacks();
        },
        log: function(isPlayer, msg) {
            this.turns.unshift({
                isPlayer: isPlayer,
                text: msg,
                id: this.turns.length
            });
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(3,12);
            this.playerHealth -= damage;
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
            }

            this.log(false, "Monster hits Player for " + damage);

            this.checkWin();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
            }

            this.log(true, "Player hits Monster hard for " + damage);
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        startGame: function() {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        stopGame: function() {
            this.gameIsRunning = false;
        }
    }
});