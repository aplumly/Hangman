
        
        let guessed_letters         = new Array();
        let boolio                  = new Array();//use this to determine if letters display
        let guesses_remaining       =12;
        let times_guessed           =0;
        let wordset                 = new Array("marshall","bandit","holster",
                                    "cowboy","whiskey","boot","texas","sherrif",
                                    "hangman","noose","game","poker","colt",
                                    "pony","cowgirl","outlaw");
        let guess                   = "";
        let wins                    = 0;
        let losses                  = 0;
        let seed                    = Math.floor(Math.random()*wordset.length);
        let word                    = wordset[seed];
        let ws                      = "";
        let check                   = false;
        let winsd                   = document.getElementById("wins");
        let lossesd                 = document.getElementById("losses");
        let guesses_leftd           = document.getElementById("guesses_left");
        let guessed                 = document.getElementById("guessed");
        let wordspace               = document.getElementById("wordspace");
        let hangman_pic             = document.getElementById("hangman");
        let message                 = document.getElementById("message");
        let gptext                  = document.getElementById("gptext");
        let game                    = true;
        boolio.length               = word.length;
        let acceptable_keys         ="abcdefghijklmnopqrstuvwxyz ";
        let gen_purpose_var;
       // var good_bad_ugly           = document.getElementById("music");
        var good_bad_ugly           = new Audio("assets/audio/goodbadugly.mp3"); 
        
       
      
        function new_word()
        {   
            seed = Math.floor(Math.random()*wordset.length);
            word = wordset[seed];
        }


        function hangman_picture()
        {   hangman_pic.style.marginTop = "0px";
            let temp = "assets/images/hangman"
            temp = temp+times_guessed;
            temp = temp+".png"; 
            hangman_pic.src=temp;
        }

        function update_wordspace()
        {   ws="";
            boolio.length = word.length;
            let a=1;
            for(let i=0;i<=word.length-1;i++)
            {   
                if(boolio[i]==true || word[i]===" "){ws=ws+word[i];}
                else{ws=ws+"_";}
            }
           
        }
        update_wordspace();

        function update_data()
        {   
            gptext.innerHTML = "guessed letters: ";
            winsd.innerHTML = "number of wins: " + wins;
            lossesd.innerHTML = "number of losses: " + losses;
            guesses_leftd.innerHTML = "number of incorrect guesses left: " + guesses_remaining;
            guessed.innerHTML =  guessed_letters; 
            wordspace.innerHTML = ws;
            hangman_picture();
            
            
        }


        function clear_data()
        {
            winsd.innerHTML = "";
            lossesd.innerHTML = "";
            guesses_leftd.innerHTML = "";
            guessed.innerHTML = "";
            wordspace.innerHTML = "";
            hangman_pic.src = "#"
            gptext.innerHTML = "";
        }

        function guess_list()
        {
                check=false;
                for(let i=guessed_letters.length; i>=0; i--)
                {if(guessed_letters[i-1]==guess){check=true;}}
                if(check==false){if(guess != " "){guessed_letters.push(guess);
                    if(!gen_purpose_var){times_guessed++;guesses_remaining--;}}}
                check=false;
        }

        function lose()
        {   
            ws="";
            guessed_letters.length  = 0;
            boolio.length           = 0;
            new_word();
            update_wordspace();
            losses++;
            lossesd.innerHTML       = "number of losses: " + losses;
            guesses_remaining       =12;
            times_guessed           =0;
            game                    = false;
            message.innerHTML       = "you lose!  press spacebar to reset";

        }

        function win_check()
        { let temp = true;
            for(let i=0;i<boolio.length;i++)
            {
                if(!boolio[i]){temp=false;}
            }
            return temp;
        }

        function win()
        {
            ws="";
            guessed_letters.length  = 0;
            boolio.length           = 0;
            new_word();
            update_wordspace();
            clear_data();
            wins++;
            //winsd.innerHTML         = "number of wins: " + wins;
            guesses_remaining       =  12;
            times_guessed           = 0;
            game                    = false;
            message.innerHTML       = "you win!  press space bar to restart";
            hangman_pic.style.marginTop = "200px";
            hangman_pic.src         = "assets/images/hangman.gif"
        }



        document.onkeyup = function(event) {
            guess = event.key;
            let d = false;
            gen_purpose_var = false;
            for(let i=0;i<acceptable_keys.length;i++)
            {
                if(guess==acceptable_keys[i])
                {d=true;}
            }
            if(d==true){
            if(game){
            for(let i=0;i<word.length;i++){
            if(guess==word[i])
            { 

                gen_purpose_var = true;
                boolio[i]=true;

            }

            }
            guess_list();
            update_wordspace();
            update_data();
            if(win_check()){win();}
            if(guesses_remaining===0){lose();}
            
            }

            if(!game)
            {   
                if(guess==" "){
                    message.innerHTML = "";
                    update_data();
                    game=true;}

            }
        }
        gen_purpose_var = false;
        good_bad_ugly.play();
        
        };
        gptext.innerHTML = "guessed letters: ";
        winsd.innerHTML = "number of wins: " + wins;
        lossesd.innerHTML = "number of losses: " + losses;
        guesses_leftd.innerHTML = "number of incorrect guesses left: " + guesses_remaining;
        guessed.innerHTML = guessed_letters; 
        wordspace.innerHTML = "press space to play";
        game=false;
        //update
