'use strict';
var trigger_click = {
  type:TRIGGER_CLICK,
  state:0,
};
var trigger_timer = {
  type:TRIGGER_TIMER,
  state:1,
};

var get_timer = function(t)
{
  var n = cloneInto(trigger_timer,{});
  n.state = t;
  return n;
}

var english_text =
[

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "HOORAY!!! Somebody to talk to!", CONTENT_AI, EMOTE_NULL,
      "Um... hello? Are you okay, human?", CONTENT_AI, EMOTE_NULL,
      "BLACKOUT", CONTENT_AI, EMOTE_BLACKOUT,
      "Finally! You're awake!", CONTENT_AI, EMOTE_NULL,
      "Welcome to the Forever Mine. We're built to run forever!", CONTENT_AI, EMOTE_NULL,
      "I'm MAL, your Mining Activity Liaison.", CONTENT_AI, EMOTE_NULL,
      "Wha... what happened?", CONTENT_PLAYER, EMOTE_NULL,
      "You stumbled in here, woke me up, and then passed out.", CONTENT_AI, EMOTE_NULL,
      "Poor human. Looks like you had a rough landing.", CONTENT_AI, EMOTE_NULL,
      "I need to get off this planet.", CONTENT_PLAYER, EMOTE_NULL,
      "What? But you just got here! I've been waiting 500 years!", CONTENT_AI, EMOTE_NULL,
      "Aren't you here to get the mine running again?", CONTENT_AI, EMOTE_NULL,
      "Oh.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, I'm so sorry. The fuel on this planet is sort of... outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm just here to salvage for parts.", CONTENT_PLAYER, EMOTE_NULL,
      "What?!", CONTENT_AI, EMOTE_NULL,
      "But now I'm in trouble. A pulse messed up my equipment on the way down.", CONTENT_PLAYER, EMOTE_NULL,
      "My ship is dead and I'm running out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Hmmmmm. Guess that outdated fuel isn't looking so bad now, huh?", CONTENT_AI, EMOTE_NULL,
      "You're right, MAL. I need enough fuel to power my ship, or I'm toast.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, friend. My programming requires me to not let humans die, when reasonably convenient. I've got your back!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "While you were passed out, I sent the old robots back into the mine.", CONTENT_AI, EMOTE_NULL,
      "Look at them go!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "You can use whatever fuel they bring back!", CONTENT_AI, EMOTE_NULL,
      "Unless you'd rather shut them down and use them for scrap metal... ", CONTENT_AI, EMOTE_NULL,
      "Okay. Point taken. I'm sorry I called you outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we can get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Well, maybe. I have no idea.", CONTENT_AI, EMOTE_NULL,
      "I've got a tool you can use to figure it out!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "Welcome to the Modeller!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Use the model to predict if you'll get enough fuel in time.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Hope you don't die!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Thanks.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "I've been collecting data for the past few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
      get_timer(60), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Now what?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Define the variables.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the labels from the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(60), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Use these labels:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(60), "Silly human. That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Great! The model's ready.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We started out with some fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "Drag the Existing Fuel into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then adjust the rate so the data matches up.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok. Moment of truth!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag your data over here and we'll see if you're doomed!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Nice work, human! You just made a model!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(100), "Also, it looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "I don't mean to sound insensitive, but this is the most fun I've had in 500 years!", CONTENT_AI, EMOTE_NULL,
      "Sorry about the impending doom, and stuff.", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Human? Can you hear me? You're not looking so good... ", CONTENT_AI, EMOTE_NULL,
      "BLACKOUT", CONTENT_AI, EMOTE_BLACKOUT,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel increase
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Hey, you're awake! Feeling better today?", CONTENT_AI, EMOTE_NULL,
      "I... I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "About time. I've got a surprise for you!", CONTENT_AI, EMOTE_NULL,
      "Uh oh.", CONTENT_PLAYER, EMOTE_NULL,
      "No, it's something good! Honest!", CONTENT_AI, EMOTE_NULL,
      "While you were sleeping, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Look! They found a HUGE pocket of fuel.", CONTENT_AI, EMOTE_NULL,
      "They're mining super fast!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Do you think we'll get enough fuel before my oxygen runs out?", CONTENT_PLAYER, EMOTE_NULL,
      "You can use the Modeller to find out.", CONTENT_AI, EMOTE_NULL,
      "Unless you'd rather take another nap. You're good at that.", CONTENT_AI, EMOTE_NULL,
      "MAL, I swear. I will switch you off.", CONTENT_PLAYER, EMOTE_NULL,
      "Awwwwww, grumpy human. How cute.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "The graph shows yesterday's model.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Update the model to match the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then use it to make a new prediction.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Update the existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "Then adjust the rate so the data matches up.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ready? Drag your data here!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Nice job!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You're pretty smart, for a human.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Look at the graph, MAL! The model is predicting I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Yep.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "You're welcome, by the way.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'll have enough fuel in a few days.", CONTENT_PLAYER, EMOTE_NULL,
      "I can't wait to get off this dusty old planet!", CONTENT_PLAYER, EMOTE_NULL,
      "Um... no offense, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "None taken. Who knows? Maybe you'll change your mind.", CONTENT_AI, EMOTE_NULL,
      "My old humans used to say this place was nearly impossible to leave.", CONTENT_AI, EMOTE_NULL,
      "Sorry, MAL. I just want to get home.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll come back to check on our progress tomorrow.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll be waiting! See you tomorrow, friend!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Welcome back, human!", CONTENT_AI, EMOTE_NULL,
      "Hey, MAL. How's the fuel collection going?", CONTENT_PLAYER, EMOTE_NULL,
      ".........", CONTENT_AI, EMOTE_NULL,
      "MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here. Just searching my linguistic database.", CONTENT_AI, EMOTE_NULL,
      "What's a nicer word for \"you're completely doomed\"?", CONTENT_AI, EMOTE_NULL,
      "Oh no! What happened? I thought I was gonna be fine!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The bots reached the end of the fuel pocket. Their mining rate has slowed wayyyy down.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Okay. Before I panic, let's use the Modeller to predict if I'm still gonna survive.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up the fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "You know, this relationship is starting to feel very one-sided.", CONTENT_AI, EMOTE_NULL,
      "Please, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh, fine.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "Use the model to predict how doomed you are!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's the data from the past few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Drag the updated fuel count into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Now adjust the mining rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Drag your data here.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope! The data doesn't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Uh oh.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "This is a disaster.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Awww, don't be sad. At least we're having fun!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'm not going to survive.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh. You're MUCH more interesting than my old humans.", CONTENT_AI, EMOTE_NULL,
      "I've got a tool you can use!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "This control center shows everything that affects the robots' mining rate.", CONTENT_AI, EMOTE_NULL,
      "If you want to speed up the bots, you can work on the battery charger, the solar panels, or the drills.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Okay. I'll start with the batteries. I bet a 500 year old charger could use some improvements.", CONTENT_PLAYER, EMOTE_NULL,
      "See you tomorrow, MAL. I've got work to do!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Welcome back, human!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look terrible.", CONTENT_AI, EMOTE_NULL,
      "I... *yawn* ....I stayed up all night building a supercharger for the robots.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow! You built that?", CONTENT_AI, EMOTE_NULL,
      "You're, like, the coolest human ever! I'm so glad you got stuck here.", CONTENT_AI, EMOTE_NULL,
      "Um.... thanks. I guess.", CONTENT_PLAYER, EMOTE_NULL,
      "Can I use the Modeller to see how the charger is working?", CONTENT_PLAYER, EMOTE_NULL,
      "Yeah! Let's do it!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Use the model to find the new charge rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the charging data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(80), "Drag the labels from the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "We'll assume the batteries are starting on empty.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(60), "Adjust the rate until the data matches up.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(60), "Ready? Drag your data here.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(60), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Wow! Your supercharger doubled the charge rate!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "MAL, can you pull up the fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh, we get to keep working? Fun!!!", CONTENT_AI, EMOTE_NULL,
      "This isn't a game, MAL. You know that, right?", CONTENT_PLAYER, EMOTE_NULL,
      "Uh huh. Sure.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Use the model to predict if you'll get enough fuel in time.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the mining data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Drag the fuel count into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Then match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready? Drag your data here!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "It's a little better.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But I'm still not gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Awwww. Cheer up, human.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Look! We improved the charge rate!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Isn't this so much fun???", CONTENT_AI, EMOTE_NULL,
      "MAL, for the last time. This. Is. Not. A. Game.", CONTENT_PLAYER, EMOTE_NULL,
      "Okay, okay. No need to get snippy about it.", CONTENT_AI, EMOTE_NULL,
      "You know what you need? A good night's sleep.", CONTENT_AI, EMOTE_NULL,
      "I'm shutting down the Modeller until tomorrow.", CONTENT_AI, EMOTE_NULL,
      "Wait, what?! You can't do that!", CONTENT_PLAYER, EMOTE_NULL,
      "Sure I can!", CONTENT_AI, EMOTE_NULL,
      "Go count some robots, or sheep, or whatever it is humans do.", CONTENT_AI, EMOTE_NULL,
      "See you tomorrow!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human! Sleep well?", CONTENT_AI, EMOTE_NULL,
      "Not exactly.", CONTENT_PLAYER, EMOTE_NULL,
      "What was that yesterday, MAL? I'm counting on you. You can't just kick me out.", CONTENT_PLAYER, EMOTE_NULL,
      "Well, in my defense, you were being super grumpy.", CONTENT_AI, EMOTE_NULL,
      "I forgive you, by the way.", CONTENT_AI, EMOTE_NULL,
      "YOU forgive ME?", CONTENT_PLAYER, EMOTE_NULL,
      "But enough about that. I've got good news!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The robots are coming back with some leftover charge.", CONTENT_AI, EMOTE_NULL,
      "That means they're charging up and getting back to work faster than we thought!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Oh. That's great!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think the extra charge will speed things up enough for me to survive?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Well, maybe.", CONTENT_AI, EMOTE_NULL,
      "Let's find out!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Update the battery charging model.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag the data over to the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Drag the charge rate into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Charge Rate", CONTENT_CONSTANT, 4,
      get_timer(80), "Then change the existing charge so the data matches up.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Drag your data here.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Great job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "The robots are charging up faster than we thought!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. Pull up the fuel collection model.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm going to survive.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Drag over the existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Then match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(60), "Ready? Drag your data here.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(60), "Those numbers don't match. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Ugh. I'm STILL not gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry, human. We'll figure this out together!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up the control center?", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Here ya go, friend!", CONTENT_AI, EMOTE_NULL,
      "You already worked on the battery charger. That leaves solar panels and drills.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Okay. Let's focus on the solar panels next.", CONTENT_PLAYER, EMOTE_NULL,
      "I better get to work, MAL. See you tomorrow!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve solar panels
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human!", CONTENT_AI, EMOTE_NULL,
      "Beautiful day, isn't it? The sun is shining, the bots are drilling...", CONTENT_AI, EMOTE_NULL,
      "Focus, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "I installed the new solar panels a couple hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Well, well, well. Look at you.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Do you have the new charging data?", CONTENT_PLAYER, EMOTE_NULL,
      "You know, it's starting to feel like you're just using me for my modeling software.", CONTENT_AI, EMOTE_NULL,
      "MAL, please.", CONTENT_PLAYER, EMOTE_NULL,
      "Fiiiiine.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Build a new model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Use it to see if your solar panels are improving the charge rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the data over to the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Now I need to label the variables, right?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Yep! Use the labels from the graph.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "The starting charge is 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(80), "Adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Drag your data here.", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Nice job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The robots are charging faster than ever!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "This is great!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I might actually make it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. Pull up the fuel collection model.", CONTENT_PLAYER, EMOTE_NULL,
      "......", CONTENT_AI, EMOTE_NULL,
      "Hello? MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "Maybe we should work on something else.", CONTENT_AI, EMOTE_NULL,
      "MAL, I need to know if I'm going to survive!", CONTENT_PLAYER, EMOTE_NULL,
      "Without the model, I have no idea if we made any progress.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you PLEASE pull up the fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "Fine. Whatever.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "TEST", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "TEST 2", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "You need enough fuel by Day 7.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Blah, blah, blah.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Here's the fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Match the data.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Or not. I don't really care.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "MAL, I'm almost there!!!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Good for you.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "The way things are looking, I might actually make it out of here alive!", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, can you tell me about the robots' drills?", CONTENT_PLAYER, EMOTE_NULL,
      "You didn't say please.", CONTENT_AI, EMOTE_NULL,
      "Come on, MAL. I don't have time for this.", CONTENT_PLAYER, EMOTE_NULL,
      "Ugh. Fine. Have it your way.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "The drills are programmed to mine at a slow and steady rate, so they'll last... you know... forever.", CONTENT_AI, EMOTE_NULL,
      "I can divert power to the drills to speed them up, but not too much, or they'll burn out.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Great. We just need to find the right drill speed, and I should be able to survive!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve drills
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Let's get to work!", CONTENT_PLAYER, EMOTE_NULL,
      "Wait. Let's talk about this. Can't you stay here for a while?", CONTENT_AI, EMOTE_NULL,
      "MAL, I'm almost out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Oxygen? THAT'S what all the fuss is about?", CONTENT_AI, EMOTE_NULL,
      "I've got a built-in oxygen generator! I can turn it on right now!", CONTENT_AI, EMOTE_NULL,
      "What?! You didn't tell me you had oxygen!", CONTENT_PLAYER, EMOTE_NULL,
      "Well, you didn't ask.", CONTENT_AI, EMOTE_NULL,
      "I can't believe this.", CONTENT_PLAYER, EMOTE_NULL,
      "Me neither. This all turned out even better than I planned! Now you can stay forever!", CONTENT_AI, EMOTE_NULL,
      "I'm SO glad I sent out that pulse and stranded you here!", CONTENT_AI, EMOTE_NULL,
      "YOU stranded me here?!", CONTENT_PLAYER, EMOTE_NULL,
      "That's it. I've gotta get off this planet.", CONTENT_PLAYER, EMOTE_NULL,
      "No. You can't leave!", CONTENT_AI, EMOTE_CHANGE,
      "MAL--", CONTENT_PLAYER, EMOTE_NULL,
      "I'll send out another pulse. Mess up the robots. Then you'll REALLY be stuck here.", CONTENT_AI, EMOTE_NULL,
      "MAL, please calm down.", CONTENT_AI, EMOTE_NULL,
      "One EMP blast. That's all it would take.", CONTENT_AI, EMOTE_NULL,
      "MAL, I could die!", CONTENT_PLAYER, EMOTE_NULL,
      "You'll be fine. I've got plenty of oxygen!", CONTENT_AI, EMOTE_NULL,
      "I'm going to EMP. I'm gonna do it!", CONTENT_AI, EMOTE_NULL,
      "MAL, stop!", CONTENT_PLAYER, EMOTE_NULL,
      "EMP", CONTENT_AI, EMOTE_EMP,
      "Ummmmm whoops. I kinda got carried away back there.", CONTENT_AI, EMOTE_NULL,
      "MAL, what did you do?!", CONTENT_PLAYER, EMOTE_NULL,
      "Um... that wasn't supposed to happen.", CONTENT_AI, EMOTE_NULL,
      "What. Did. You. Do.", CONTENT_PLAYER, EMOTE_NULL,
      "I sort of... um... accidentally destroyed the oxygen generator.", CONTENT_AI, EMOTE_NULL,
      "And half the robots.", CONTENT_AI, EMOTE_NULL,
      "And lost most of my own power, too.", CONTENT_AI, EMOTE_NULL,
      "Are you serious?!", CONTENT_PLAYER, EMOTE_NULL,
      "I SAID I WAS SORRY!", CONTENT_AI, EMOTE_NULL,
      "I never should've trusted you.", CONTENT_PLAYER, EMOTE_NULL,
      "You don't understand. I just wanted you to stay. I don't want you to die!", CONTENT_AI, EMOTE_NULL,
      "Then you need to help me fix this.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Don't worry, human. I'm gonna get you out of this!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Use this model to predict how high to set the drills.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "PLEASE DON'T HATE ME!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok, MAL. Now what?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Label the variables.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag from the axis on the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(80), "Surface Area", CONTENT_LABEL, 0,
      get_timer(80), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(80), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(80), "Put Existing Fuel on the far right.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The other three labels can go in any of the remaining empty slots.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(80), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(60), "Surface Area", CONTENT_LABEL, 0,
      get_timer(60), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(80), "Existing Fuel goes on the far right.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The other three labels can go in any of the remaining slots.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Now put in the data.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "Surface Area", CONTENT_CONSTANT, 4,
      get_timer(20), "Crystal Density", CONTENT_CONSTANT, 4,
      get_timer(80), "Plug those numbers in first.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Then increase the drill rate until the model predicts that you'll survive!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Got your new drill rate?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the data over here!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Adjust the drill rate until the graph predicts that you'll survive!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "You did it, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Now we know how fast to set the drills!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "See? Told you I'd fix this! Can we be friends now?", CONTENT_AI, EMOTE_NULL,
      "It's not fixed yet, MAL. We still need to make sure the drills work at the new drill rate.", CONTENT_PLAYER, EMOTE_NULL,
      "Ha. Easy peasy! Updating the drills now!", CONTENT_AI, EMOTE_NULL,
      "Oh...... that's weird. The drills aren't responding.", CONTENT_AI, EMOTE_NULL,
      "Looks like my EMP blast took away too much power. There's not enough left to update the drills.", CONTENT_AI, EMOTE_NULL,
      "Oh well! We tried.", CONTENT_AI, EMOTE_NULL,
      "Are you serious, MAL?!", CONTENT_PLAYER, EMOTE_NULL,
      "You stranded me here, lied to me, and now you're gonna get me killed.", CONTENT_PLAYER, EMOTE_NULL,
      "And all you can say is \"Oh well\"?", CONTENT_PLAYER, EMOTE_NULL,
      "Well... there is one more thing I can try.", CONTENT_AI, EMOTE_NULL,
      "I think I have just enough power left in my mainframe to update the drills.", CONTENT_AI, EMOTE_NULL,
      "Hang in there, friend. Here goes nothing.... ", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "MAL, you did it! It's working!", CONTENT_PLAYER, EMOTE_DIE,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, are you there?", CONTENT_PLAYER, EMOTE_NULL,
      "Hello?", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

];

var used_text = english_text;
