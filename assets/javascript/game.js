        /*//create array to store possible words
        let guesses_remaining;
        let guessed_letters = new Array();
        let guess;
        let word;
        let wins;
        let losses;
        

        
        //1() function to get selected key

        //2()function to check your guess with word variable

        //3()function to change display
        
        //4()function(s) to handle win/loss*/
        
        let guessed_letters         = new Array();
        let boolio                  = new Array();//use this to determine if letters display
        let guesses_remaining       =12;
        let times_guessed           =0;
        let wordset                 = new Array("how","now","brown",
                                    "cow","whiskey","boot","texas","sherrif",
                                    "hangman","noose","game","poker","colt");
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
        boolio.length               = word.length;
        
        function new_word()
        {   
            seed = Math.floor(Math.random()*wordset.length);
            word = wordset[seed];
        }


        function hangman_picture()
        {   let temp = "assets/images/hangman"
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
                if(boolio[i]==true){ws=ws+word[i];}
                else{ws=ws+"_";}
            }
           
        }
        update_wordspace();

        function update_data()
        {
            winsd.innerHTML = "number of wins: " + wins;
            lossesd.innerHTML = "number of losses: " + losses;
            guesses_leftd.innerHTML = "number of guesses left: " + guesses_remaining;
            guessed.innerHTML =  guessed_letters; 
            wordspace.innerHTML = ws;
            hangman_picture();
        }

        function guess_list()
        {
                check=false;
                for(let i=guessed_letters.length; i>=0; i--)
                {if(guessed_letters[i-1]==guess){check=true;}}
                if(check==false){guessed_letters.push(guess);times_guessed++;guesses_remaining--;}
                check=false;
        }

        function lose()
        {   
            ws="";
            guessed_letters.length  = 0;
            boolio.length           = 0;
            new_word();
            update_wordspace();
            update_data();
            losses++;
            guesses_remaining       =12;
            times_guessed           =0;

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
            update_data();
            wins++;
            guesses_remaining       =12;
            times_guessed           =0;
        }

        document.onkeyup = function(event) {
            guess = event.key;
            for(let i=0;i<word.length;i++){
            if(guess==word[i])
            { 
                boolio[i]=true;
            }

            }
            guess_list();
            update_wordspace();
            if(win_check()){win();}
            if(guesses_remaining===0){lose();}
            update_data();

        };

        winsd.innerHTML = "number of wins: " + wins;
        lossesd.innerHTML = "number of losses: " + losses;
        guesses_leftd.innerHTML = "number of guesses left: " + guesses_remaining;
        guessed.innerHTML = guessed_letters; 
        wordspace.innerHTML = ws;
        
        //update
