let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 8 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Hamarosan kikel a tojásból. Vidd el egy sétára hogy kikeljen!", "profile_lvl0.gif"],
    ["Az 5G sugárzástól kikelt a tamagocsid! Már alig várja hogy felfedezze a világot. <br> Mielőtt elviszed sétálni etesd meg.","profile_lvl1.gif"],
    ["Itt az ideje újra elvinni egy sétára!","profile_lvl2.gif"],
    ["Túl sok sugárzás érte a tamagocsidat és meghalt :( <br> Legközelebb tekerd be a fejét alufóliával.", "profile_lvl3.gif"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story =  document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function favagas(){
    let szazalek = rnd_szazalek();
    if(szazalek <= 50){

        harc("5G", 50, 10);
        

        refreshProfileStats();
    } else{
        
        story.innerHTML += "Élelmet találtál! (+1 étel)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function harc(e_name, e_life, e_damage){
    story.innerHTML = e_name + " antenna a közelben! <br>";

    
    let counter = 0;
    let ellenfel_tamad = true;
    do {
        counter++;
        story.innerHTML += "<br>~~"+counter+". kör~~<br>";
        let szazalek = rnd_szazalek();
        if(ellenfel_tamad){

            let elkerules = 50 + stats.deffense;
            if(elkerules >= 100) elkerules = 95; 

            if(szazalek > elkerules){
                story.innerHTML += "Elkerülöd az "+e_name+" sugárzást!<br>" ;
            }else{
                story.innerHTML += e_name+" sugárzást kapsz és megsebezi állatkádat! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
            }
        }else{
            let elkerules = 50;
            if(szazalek > elkerules){
                story.innerHTML += "Nem tudod kivédeni az "+e_name+ "sugárzást<br>";
            }else{
                story.innerHTML += "Súlyosan megsebez az " +e_name+"-s hálózat! (-"+stats.strength+" élet)<br>";
                
                e_life -= stats.strength;

               
            }

        }

        ellenfel_tamad = !ellenfel_tamad; 

        
    } while (stats.life > 0 && e_life > 0 && counter <= 10);
}