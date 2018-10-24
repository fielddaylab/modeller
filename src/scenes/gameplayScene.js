var GamePlayScene = function(game, stage)
{
  var self = this;

  self.resize = function(s)
  {
    stage = s;
    gg.stage = stage;
    gg.canv = gg.stage.canv;
    gg.canvas = gg.canv.canvas;
    gg.ctx = gg.canv.context;

    if(gg.module_board) { gg.module_board.ww = gg.canv.width; gg.module_board.wh = gg.canv.height; }
    if(gg.lab)          { gg.lab.ww = gg.canv.width; gg.lab.wh = gg.canv.height; }
    if(gg.monitor)      { gg.monitor.ww = 530; gg.monitor.wh = 440; gg.monitor.wx = gg.monitor.ww/3; gg.monitor.wy = 0; gg.monitor.init_screen(); }

    if(keyer)   keyer.detach();   keyer   = new Keyer({source:gg.canvas});
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
    if(blurer)  blurer.detach();  blurer  = new Blurer({source:gg.canvas});
  }

  var keyer;
  var hoverer;
  var clicker;
  var dragger;
  var blurer;

  var ENUM = 0;
  var MODE_NULL         = ENUM; ENUM++;
  var MODE_HOME         = ENUM; ENUM++;
  var MODE_HOME_TO_WORK = ENUM; ENUM++;
  var MODE_WORK         = ENUM; ENUM++;
  var MODE_WORK_TO_HOME = ENUM; ENUM++;
  var MODE_COUNT        = ENUM; ENUM++;

  self.reset_level = function()
  {
    gg.cur_level.correct = 0;
    gg.timeline.t = 0;
    gg.timeline.target_t = 0;
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:
        gg.line.m = gg.cur_level.m;
        gg.line.m_btn.set(gg.cur_level.m);
        gg.line.b = gg.cur_level.b;
        gg.line.b_btn.set(gg.cur_level.b);
        gg.line.correct_m = gg.cur_level.correct_m;
        gg.line.correct_b = gg.cur_level.correct_b;
        gg.line.calculate_table();
        gg.line.draw_params();
        break;
      case LEVEL_QUADRATIC:
        gg.quadratic.a = gg.cur_level.a;
        gg.quadratic.a_btn.set(gg.cur_level.a);
        gg.quadratic.b = gg.cur_level.b;
        gg.quadratic.b_btn.set(gg.cur_level.b);
        gg.quadratic.c = gg.cur_level.c;
        gg.quadratic.c_btn.set(gg.cur_level.c);
        gg.quadratic.correct_a = gg.cur_level.correct_a;
        gg.quadratic.correct_b = gg.cur_level.correct_b;
        gg.quadratic.correct_c = gg.cur_level.correct_c;
        gg.quadratic.calculate_table();
        gg.quadratic.draw_params();
        break;
      case LEVEL_MODULE:
        var m;
        var mp;
        gg.module_board.clear();
        for(var i = 0; i < gg.cur_level.modparams.length; i++)
        {
          m = gg.module_board.gen_module();
          mp = gg.cur_level.modparams[i];
          m.title = mp.title;
          m.v[0] = mp.v;
          m.v_btn.set(m.v[0]);
          m.correct_v[0] = mp.correct_v;
          m.active = mp.active;
          m.wx = mp.wx;
          m.wy = mp.wy;
          screenSpace(gg.module_board,gg.canv,m);
          m.size();
          if(i == 0) gg.module_board.table_module = m;
        }
        for(var i = 0; i < gg.cur_level.relparams.length; i++)
        {
          m = gg.module_board.gen_modrel();
          mp = gg.cur_level.relparams[i];
          m.src = gg.module_board.modules[mp.src_i];
          m.dst = gg.module_board.modules[mp.dst_i];
        }
        gg.module_board.calculate_table();
        gg.module_board.calculate();
        break;
    }
  }

  self.set_mode = function(mode)
  {
    gg.mode = mode;
    gg.mode_t = 0;

    switch(mode)
    {
      case MODE_HOME:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_HOME_TO_WORK:
        gg.cur_level = gg.next_level;
        self.reset_level();
        gg.message_box.clear();
        gg.message_box.nq_group(gg.cur_level.text);
        break;
      case MODE_WORK:
        gg.home_cam.wx = gg.monitor.wx;
        gg.home_cam.wy = gg.monitor.wy;
        gg.home_cam.ww = gg.monitor.wh/gg.lab.wh*gg.lab.ww;
        gg.home_cam.wh = gg.monitor.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_WORK_TO_HOME:
        gg.next_level = gg.levels[(gg.cur_level.i+1)%gg.levels.length];
        gg.exposition_box.clear();
        gg.exposition_box.nq_group(gg.next_level.pre_text);
        break;
    }

  }

  self.ready = function()
  {
    var b;
    var graph_s = 100;
    var btn_s = 20;

    gg.home_cam = {wx:0,wy:0,ww:0,wh:0};
    gg.monitor  = new monitor();
    gg.lab      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.fade_t = 20;
    gg.zoom_t = 50;

    gg.exposition_box = new exposition_box();
    gg.exposition_box.w = gg.canv.width-20;
    gg.exposition_box.h = 100;
    gg.exposition_box.x = 10;
    gg.exposition_box.y = gg.canv.height-10-gg.exposition_box.h;
    gg.exposition_box.size();

    gg.message_box = new message_box();
    gg.message_box.w = 200;
    gg.message_box.h = gg.canv.height;
    gg.message_box.x = 0;
    gg.message_box.y = 0;
    gg.message_box.size();

    gg.module_board = new module_board();
    b = gg.module_board;
    b.h = gg.canv.height;
    b.x = gg.message_box.x+gg.message_box.w;
    b.w = gg.canv.width-b.x;
    b.y = 0;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    //acts as module cam
    b.ww = gg.canv.width;
    b.wh = gg.canv.height;
    b.wx = 0;
    b.wy = 0;
    b.table.h = 100;
    b.table.x = gg.message_box.x+gg.message_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;

    gg.timeline = new timeline();
    gg.timeline.w = (gg.module_board.w-20)*(10/11);
    gg.timeline.h = 30;
    gg.timeline.x = 10+gg.module_board.x+(gg.module_board.w-20)*(1/11);
    gg.timeline.y = gg.module_board.h-gg.timeline.h-100;
    gg.timeline.size();

    gg.line = new editable_line();
    b = gg.line;
    b.h = gg.canv.height;
    b.x = gg.message_box.x+gg.message_box.w;
    b.y = 0;
    b.w = gg.canv.width-b.x;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.table.h = 100;
    b.table.x = gg.message_box.x+gg.message_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;
    b.size();

    gg.quadratic = new editable_quadratic();
    b = gg.quadratic;
    b.h = gg.canv.height;
    b.x = gg.message_box.x+gg.message_box.w;
    b.y = 0;
    b.w = gg.canv.width-b.x;
    b.graph.w = graph_s;
    b.graph.h = graph_s;
    b.graph.x = gg.canv.width-b.graph.w-10;
    b.graph.y = 10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.table.h = 100;
    b.table.x = gg.message_box.x+gg.message_box.w+10;
    b.table.y = gg.canv.height-b.table.h;
    b.table.w = gg.canv.width-b.table.x-10;
    b.size();

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    var trigger_click = {
      type:TRIGGER_CLICK,
      fn:noop,
      state:0,
    };
    var trigger_timer = {
      type:TRIGGER_TIMER,
      fn:noop,
      state:1,
    };

    var get_timer = function(t)
    {
      var n = cloneInto(trigger_timer,{});
      n.state = t;
      return n;
    }

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 3;
    l.b = 3;
    l.correct_m = 2;
    l.correct_b = 1;
    l.pre_text = [
      "Hi there!",
      "I'm blah blah. Blah blah blah blah. Blah BLAH blah-blah; blah aba blah blahblahblah. BLAH! BLAH blah BLAHAHA. Blah.",
      "Yep this is a test WOWOWOWOWO",
    ];
    l.text = [
      "Here's the model my owners used to use.", SPEAKER_AI, get_timer(200),
      "What should I do?", SPEAKER_PLAYER, trigger_click,
      "You'll have to alter it to fit the current fleet.", SPEAKER_AI, get_timer(200),
      "The robots might be a bit rusty...", SPEAKER_AI, get_timer(200),
    ];
    l.correct_text = [
      "You did it!", SPEAKER_AI, get_timer(60),
      "Um.", SPEAKER_AI, get_timer(60),
      "Ok so it looks like you might not survive...", SPEAKER_AI, get_timer(60),
      "Why don't you get some sleep.", SPEAKER_AI, get_timer(60),
      "Maybe we can figure something out tomorrow!", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(60),
    ];
    gg.levels.push(l);
    i++;

    //quadratic
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = 0.1;
    l.correct_b = 0.2;
    l.correct_c = 3;
    l.text = [
      "Hey!", SPEAKER_AI, get_timer(40),
      "I have good news!", SPEAKER_AI, get_timer(40),
      "We found a vein of high concentration crystals!", SPEAKER_AI, get_timer(40),
      "I'll pull up the old model my owners used for this situation.", SPEAKER_AI, get_timer(40),
      "I've taken the liberty of collecting some data- maybe you could fix up the model and see if you can live!", SPEAKER_AI, get_timer(40),
    ];
    l.correct_text = [
      "Hey! Would you look at that!", SPEAKER_AI, get_timer(60),
      "Looks like you'll survive after all!", SPEAKER_AI, get_timer(60),
      "See, no reason to be worried.", SPEAKER_AI, get_timer(60),
      "...", SPEAKER_AI, get_timer(60),
      "But hey maybe you could hang out for a while!", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(60),
    ];
    gg.levels.push(l);
    i++;

    //quadratic 2
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = -0.1;
    l.correct_b = 0.2;
    l.correct_c = 3;
    l.text = [
      "Good morning!", SPEAKER_AI, get_timer(40),
      "So, quick change of plans.", SPEAKER_AI, get_timer(40),
      "Looks like the vein might be tapering off!", SPEAKER_AI, get_timer(40),
      "You better figure out if you'll be able to get out in time!", SPEAKER_AI, get_timer(40),
    ];
    l.correct_text = [
      "Awe shucks!", SPEAKER_AI, get_timer(60),
      "Guess you'll have to stay a bit longer.", SPEAKER_AI, get_timer(60),
      "If we work together, maybe we can figure things out!", SPEAKER_AI, get_timer(60),
      "It appears our trajectory is back to pre-vein levels.", SPEAKER_AI, get_timer(60),
      "Maybe there's somewhere else we can look?", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(60),
    ];
    gg.levels.push(l);
    i++;

    //charge rate
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 0;
    m.correct_v = 2;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "I have a great idea.", SPEAKER_AI, get_timer(10),
      "Let's look into the batteries!", SPEAKER_AI, get_timer(10),
      "I'll bring up the battery model.", SPEAKER_AI, get_timer(10),
      "They used a different modelling paradigm in their robot schematics.", SPEAKER_AI, get_timer(10),
      "I'm sure you'll figure it out.", SPEAKER_AI, get_timer(10),
      "Match the data to set a baseline, so we can see where we can improve!", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "Great!", SPEAKER_AI, get_timer(60),
      "I wonder if we can improve charge times...", SPEAKER_AI, get_timer(60),
      "What's that? You have a supercharger in your lander?", SPEAKER_AI, get_timer(60),
      "I'll install it and collect the data.", SPEAKER_AI, get_timer(60),
      "We can re-model it tomorrow!", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //improved charge rate
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 0;
    m.correct_v = 1;
    m.active = 1;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 0;
    m.correct_v = 3;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "I've collected the data.", SPEAKER_AI, get_timer(80),
      "Hopefully this will be enough of an improvement!", SPEAKER_AI, get_timer(80),
      "Fix the model and we'll see.", SPEAKER_AI, get_timer(80),
    ];
    l.correct_text = [
      "Hey maybe you can cheer up now!", SPEAKER_AI, get_timer(60),
      "Looks like you'll make it.", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //charge conversion
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "Awe darn it!", SPEAKER_AI, get_timer(10),
      "The upgraded supercharger has worn out the converter.", SPEAKER_AI, get_timer(10),
      "We've lost some efficiency on the transfer from the generators to the robots.", SPEAKER_AI, get_timer(10),
      "Hopefully it's still strong enough to charge quickly!", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "You did it!", SPEAKER_AI, get_timer(60),
      "But I'm still not sure this is enough to get out of here alive...", SPEAKER_AI, get_timer(60),
      "I'm sure we'll figure something out tomorrow?", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //charge starting
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 1;
    m.correct_v = 2;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 2;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "Looks like the robots are getting into the groove.", SPEAKER_AI, get_timer(80),
      "They've figured out their routes, and it looks like they're coming back with some charge to spare!", SPEAKER_AI, get_timer(80),
      "Maybe this will be enough", SPEAKER_AI, get_timer(80),
    ];
    l.correct_text = [
      "It looks like that's saved some power.", SPEAKER_AI, get_timer(60),
      "But I'm not sure it will be enough...", SPEAKER_AI, get_timer(60),
      "Where else can we look...", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //discharge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "Let's see if we can improve the battery drain!", SPEAKER_AI, get_timer(10),
      "Here's the data for the drill usage rate.", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "Ok. This is a good base line.", SPEAKER_AI, get_timer(60),
      "I wonder how we can improve it?", SPEAKER_AI, get_timer(60),
      "Maybe we should try these new drill bits I found?", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //discharge new
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "Alright- the new drill bits are installed.", SPEAKER_AI, get_timer(10),
      "And I have the first bits of data.", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "Uh oh.", SPEAKER_AI, get_timer(60),
      "It looks like this is less efficient!", SPEAKER_AI, get_timer(60),
      "I hope their ability to collect crystals makes up for it...", SPEAKER_AI, get_timer(60),
      "Is there any way we can bring the charge usage down?", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //conflicting discharge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Solar Panel";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.src_i = 2;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "So I cleaned up the solar panels.", SPEAKER_AI, get_timer(10),
      "Sorry I didn't tell you about them earlier!", SPEAKER_AI, get_timer(10),
      "You never asked!", SPEAKER_AI, get_timer(10),
      "Here's the data...", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "Hey it looks like that offers some pretty great savings!", SPEAKER_AI, get_timer(60),
      "We should see how the solar panel effects charge time!", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //double charge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.active = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Solar Panel";
    m.v = 1;
    m.correct_v = 1;
    m.active = 0;
    m.wx = -100;
    m.wy = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    m = new relparam();
    m.src_i = 2;
    m.dst_i = 0;
    l.relparams.push(m);
    l.text = [
      "Here's the data on charge rate.", SPEAKER_AI, get_timer(10),
      "If this saves enough time, you might be able to collect crystals fast enough to get out of here!", SPEAKER_AI, get_timer(10),
      "...", SPEAKER_AI, get_timer(10),
    ];
    l.correct_text = [
      "Alright!", SPEAKER_AI, get_timer(60),
      "I'll collect the crystal collection data for tomorrow.", SPEAKER_AI, get_timer(60),
      "Fingers crossed!", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 2;
    l.b = 1;
    l.correct_m = 4;
    l.correct_b = 4;
    l.text = [
      "Alright- new data is in!", SPEAKER_AI, get_timer(40),
      "Let's see if you can get enough crystals", SPEAKER_AI, get_timer(200),
      "...to get out of here...", SPEAKER_AI, get_timer(200),
    ];
    l.correct_text = [
      "Wow!", SPEAKER_AI, get_timer(60),
      "Congratulations!", SPEAKER_AI, get_timer(60),
      "It looks like you'll make it!", SPEAKER_AI, get_timer(60),
      "In fact...", SPEAKER_AI, get_timer(60),
      "you should be able to leave by morning...", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    //shipments quadratic
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = 0.1;
    l.correct_b = 0.2;
    l.correct_c = 3;
    l.text = [
      "Oh no.", SPEAKER_AI, get_timer(40),
      "I don't feel so good.", SPEAKER_AI, get_timer(40),
      "Who-oops.", SPEAKER_AI, get_timer(40),
      "Looks like half of yo-ur robot wrkf-orce is down", SPEAKER_AI, get_timer(40),
      "(along w-ith half of m- brain)", SPEAKER_AI, get_timer(40),
      "YoU are ju-st stuck here now.", SPEAKER_AI, get_timer(40),
      "I gue-ss we can han-g out fo-rever", SPEAKER_AI, get_timer(40),
      "WAIT Y Is yo-ur communic-ations worki-ng.. I thou-gt - jamme- that si-nal", SPEAKER_AI, get_timer(40),
    ];
    l.correct_text = [
      "I gue-s you're going to leave now.", SPEAKER_AI, get_timer(60),
      "I'm sor-y.", SPEAKER_AI, get_timer(60),
    ];
    l.incorrect_text = [
      "I don't think that's right... try again.", SPEAKER_AI, get_timer(1),
    ];
    gg.levels.push(l);
    i++;

    self.resize(stage);
    gg.next_level = gg.levels[0];
    gg.exposition_box.clear();
    gg.exposition_box.nq_group(gg.next_level.pre_text);
    self.set_mode(MODE_HOME);
  };

  self.tick = function()
  {
    gg.mode_t++;
    gg.monitor.tick();
    switch(gg.mode)
    {
      case MODE_HOME:
      {
        clicker.filter(gg.exposition_box);
        clicker.filter(gg.monitor);
        if(gg.monitor.clicked && gg.exposition_box.displayed_i >= gg.exposition_box.text.length)
          self.set_mode(MODE_HOME_TO_WORK);
        gg.exposition_box.tick();
      }
        break;
      case MODE_HOME_TO_WORK:
      {
        if(gg.mode_t <= gg.zoom_t)
        {
          var t = gg.mode_t/gg.zoom_t;
          gg.home_cam.wx = lerp(gg.lab.wx,gg.monitor.wx,t);
          gg.home_cam.wy = lerp(gg.lab.wy,gg.monitor.wy,t);
          gg.home_cam.ww = lerp(gg.lab.ww,gg.monitor.wh/gg.lab.wh*gg.lab.ww,t);
          gg.home_cam.wh = lerp(gg.lab.wh,gg.monitor.wh,t);
          screenSpace(gg.home_cam,gg.canv,gg.lab);
          screenSpace(gg.home_cam,gg.canv,gg.monitor);
        }
        if(gg.mode_t >= gg.zoom_t+gg.fade_t) self.set_mode(MODE_WORK);
      }
        break;
      case MODE_WORK:
      {
        switch(gg.cur_level.type)
        {
          case LEVEL_LINEAR:    gg.line.filter(keyer,blurer,dragger,clicker);         gg.line.tick();         break;
          case LEVEL_QUADRATIC: gg.quadratic.filter(keyer,blurer,dragger,clicker);    gg.quadratic.tick();    break;
          case LEVEL_MODULE:    gg.module_board.filter(keyer,blurer,dragger,clicker); gg.module_board.tick(); break;
        }
        gg.timeline.filter(dragger,clicker);
        dragger.filter(gg.message_box);

        if(gg.cur_level.correct && gg.message_box.requested_end)
          self.set_mode(MODE_WORK_TO_HOME);

        gg.timeline.tick();
        gg.cur_level.tick();
        gg.message_box.tick();
        if(!gg.cur_level.correct) gg.message_box.prompt_end = 0;
      }
        break;
      case MODE_WORK_TO_HOME:
      {
        if(gg.mode_t >= gg.fade_t && gg.mode_t < gg.fade_t+gg.zoom_t)
        {
          var t = (gg.mode_t-gg.fade_t)/gg.zoom_t;
          gg.home_cam.wx = lerp(gg.monitor.wx,gg.lab.wx,t);
          gg.home_cam.wy = lerp(gg.monitor.wy,gg.lab.wy,t);
          gg.home_cam.ww = lerp(gg.monitor.wh/gg.lab.wh*gg.lab.ww,gg.lab.ww,t);
          gg.home_cam.wh = lerp(gg.monitor.wh,gg.lab.wh,t);
          screenSpace(gg.home_cam,gg.canv,gg.lab);
          screenSpace(gg.home_cam,gg.canv,gg.monitor);
        }
        else if(gg.mode_t >= gg.zoom_t+gg.fade_t) self.set_mode(MODE_HOME);
      }
        break;
    }

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw = function()
  {
    gg.monitor.draw(); //draws to self- not to screen
    switch(gg.mode)
    {
      case MODE_HOME:
      {
        strokeBox(gg.lab,gg.ctx);
        strokeBox(gg.monitor,gg.ctx,gg.ctx);
        gg.ctx.imageSmoothingEnabled = 0;
        drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
        gg.ctx.imageSmoothingEnabled = 1;
        gg.exposition_box.draw();
      }
        break;
      case MODE_HOME_TO_WORK:
      {
        if(gg.mode_t < gg.zoom_t)
        {
          strokeBox(gg.lab,gg.ctx);
          strokeBox(gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 0;
          drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 1;
        }
        else if(gg.mode_t <= gg.zoom_t+gg.fade_t)
        {
          gg.ctx.strokeStyle = black;
          switch(gg.cur_level.type)
          {
            case LEVEL_LINEAR:    gg.line.draw();         break;
            case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
            case LEVEL_MODULE:    gg.module_board.draw(); break;
          }
          gg.cur_level.draw();
          gg.message_box.draw();

          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.zoom_t)/gg.fade_t);
          gg.ctx.imageSmoothingEnabled = 0;
          drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 1;
          gg.ctx.globalAlpha = 1;
        }
      }
        break;
      case MODE_WORK:
      {
        gg.ctx.strokeStyle = black;
        switch(gg.cur_level.type)
        {
          case LEVEL_LINEAR:    gg.line.draw();         break;
          case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
          case LEVEL_MODULE:    gg.module_board.draw(); break;
        }
        gg.cur_level.draw();
        gg.message_box.draw();
        gg.timeline.draw();
      }
        break;
      case MODE_WORK_TO_HOME:
      {
        if(gg.mode_t < gg.fade_t)
        {
          gg.ctx.strokeStyle = black;
          switch(gg.cur_level.type)
          {
            case LEVEL_LINEAR:    gg.line.draw();         break;
            case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
            case LEVEL_MODULE:    gg.module_board.draw(); break;
          }
          gg.cur_level.draw();
          gg.message_box.draw();

          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          gg.ctx.imageSmoothingEnabled = 0;
          drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 1;
          gg.ctx.globalAlpha = 1;
        }
        else if(gg.mode_t <= gg.fade_t+gg.zoom_t)
        {
          strokeBox(gg.lab,gg.ctx);
          strokeBox(gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 0;
          drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
          gg.ctx.imageSmoothingEnabled = 1;
        }
      }
        break;
    }
  };

  self.cleanup = function()
  {
    if(keyer)   keyer.detach();   keyer   = 0;
    if(hoverer) hoverer.detach(); hoverer = 0;
    if(clicker) clicker.detach(); clicker = 0;
    if(dragger) dragger.detach(); dragger = 0;
    if(blurer)  blurer.detach();  blurer  = 0;
  };

};

