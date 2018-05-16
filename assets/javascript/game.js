
        
        let guessed_letters         = new Array();
        let boolio                  = new Array();//use this to determine if letters display
        let guesses_remaining       =12;
        let times_guessed           =0;
        const links                 = new Array("http://www.thewildwest.org/cowboys/wildwestoutlawsandlawmen/172-billythekid",
                                    "https://en.wikipedia.org/wiki/Ike_Clanton",
                                    "https://en.wikipedia.org/wiki/Butch_Cassidy","https://en.wikipedia.org/wiki/Charlie_Bowdre",
                                    "https://www.legendsofamerica.com/tom-pickett/","https://en.wikipedia.org/wiki/Dave_Rudabaugh",
                                    "http://www.thewildwest.org/cowboys/wildwestoutlawsandlawmen/182-tom-horn",
                                    "https://en.wikipedia.org/wiki/Frank_McLaury","https://en.wikipedia.org/wiki/William_Brocius",
                                    "http://www.thewildwest.org/cowboys/wildwestoutlawsandlawmen/186-wildwestoutlawjohnringo",
                                    "http://www.thewildwest.org/cowboys/wildwestoutlawsandlawmen/177-wyattearp",
                                    "https://www.legendsofamerica.com/we-harveylogan/",
                                    "https://en.wikipedia.org/wiki/George_Curry_(Wild_Bunch)",
                                    "https://en.wikipedia.org/wiki/Sundance_Kid");
        const wordset               = new Array("billy    the    kid","ike    clanton","butch    cassidy",
                                    "charlie    bowdre","tom    pickett","dave    rudabaugh","tom    horn","frank    mclaury",
                                    "william     brocius","johnny    ringo","wyatt    earp","harvey    logan","george    curry",
                                    "sundance     kid");
        let guess                   = "";
        let wins                    = 0;
        let losses                  = 0;
        let seed                    = Math.floor(Math.random()*wordset.length);
        let word                    = wordset[seed];
        let ws                      = "";
        let check                   = false;
        const winsd                 = document.getElementById("wins");
        const lossesd               = document.getElementById("losses");
        const guesses_leftd         = document.getElementById("guesses_left");
        const guessed               = document.getElementById("guessed");
        const wordspace             = document.getElementById("wordspace");
        const hangman_pic           = document.getElementById("hangman");
        const message               = document.getElementById("message");
        const gptext                = document.getElementById("gptext");
        const linkspace             = document.getElementById("linkspace");
        let game                    = false;
        boolio.length               = word.length;
        let acceptable_keys         ="abcdefghijklmnopqrstuvwxyz ";
        let gen_purpose_var;
        var good_bad_ugly           = new Audio("assets/audio/goodbadugly.mp3"); 
        
        function showlink()
        {
            linkspace.innerHTML= word;
            linkspace.href= links[seed];
        } 

        function hidelink()
        {
            linkspace.innerHTML = "";
            linkspace.href= "#";
        }
      
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
            {   if(word[i]===" "){boolio[i]=true;}
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
            showlink();
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
        {   clear_data();
            showlink();
            guessed_letters.length  = 0;
            boolio.length           = 0;
            wins++;
            guesses_remaining       =  12;
            times_guessed           = 0;
            game                    = false;
            message.innerHTML       = "you win!  press space bar to restart";
            hangman_pic.style.marginTop = "200px";
            hangman_pic.src         = "assets/images/hangman.gif";
            wordspace.innerHTML     = ws;
             new_word();
             update_wordspace();
             
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
                    game=true;
                    hidelink();
                }
                    
            }
        }
        gen_purpose_var = false;
        good_bad_ugly.play();
        
        };
        hangman_pic.src         = "assets/images/hangman.gif";
        hangman_pic.src         = "assets/images/hangman0.png";
        console.log(wordset.length);
        console.log(links.length);
        gptext.innerHTML = "guessed letters: ";
        winsd.innerHTML = "number of wins: " + wins;
        lossesd.innerHTML = "number of losses: " + losses;
        guesses_leftd.innerHTML = "number of incorrect guesses left: " + guesses_remaining;
        guessed.innerHTML = guessed_letters; 
        wordspace.innerHTML = "press space to play";
        game=false;