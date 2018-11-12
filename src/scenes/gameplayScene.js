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

    if(self.was_ready)
    {
      var b;
      var graph_s = 200;

      gg.monitor.ww = 422;
      gg.monitor.wh = 320;
      gg.monitor.wx = 234;
      gg.monitor.wy = -26;
      gg.monitor.init_screen();

      gg.lab.ww = gg.canv.width;
      gg.lab.wh = gg.canv.height;

      gg.module_board.ww = gg.canv.width;
      gg.module_board.wh = gg.canv.height;

      gg.data_dragger.w = gg.canv.width;
      gg.data_dragger.h = gg.canv.height;
      gg.data_dragger.x = 0;
      gg.data_dragger.y = 0;

      gg.exposition_box.w = gg.canv.width-20;
      gg.exposition_box.h = 100;
      gg.exposition_box.x = 10;
      gg.exposition_box.y = gg.canv.height-10-gg.exposition_box.h;
      gg.exposition_box.size();

      gg.message_box.w = 200;
      gg.message_box.h = gg.canv.height;
      gg.message_box.x = 0;
      gg.message_box.y = 0;
      gg.message_box.size();

      b = gg.module_board;
      b.h = gg.canv.height;
      b.x = gg.message_box.x+gg.message_box.w;
      b.w = gg.canv.width-b.x;
      b.y = 0;
      b.graph.w = graph_s;
      b.graph.h = graph_s;
      b.graph.x = gg.canv.width-b.graph.w-10;
      b.graph.y = 10;
      b.v_min = 0;
      b.v_max = 10;
      //acts as module cam
      b.ww = gg.canv.width;
      b.wh = gg.canv.height;
      b.wx = 0;
      b.wy = 0;

      gg.timeline.w = (gg.module_board.w-20)*(10/12);
      gg.timeline.h = 30;
      gg.timeline.x = 10+gg.module_board.x+(gg.module_board.w-20)*(1.5/12);
      gg.timeline.y = gg.module_board.h-gg.timeline.h-65;
      gg.timeline.size();

      gg.table.h = 100;
      gg.table.x = gg.message_box.x+gg.message_box.w+10;
      gg.table.y = gg.canv.height-gg.table.h;
      gg.table.w = gg.canv.width-gg.table.x-10;

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
      b.size();

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
      b.size();


    }

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
  var MODE_NULL           = ENUM; ENUM++;
  var MODE_MENU           = ENUM; ENUM++;
  var MODE_CINEMATIC      = ENUM; ENUM++;
  var MODE_BOOT           = ENUM; ENUM++;
  var MODE_PREH           = ENUM; ENUM++;
  var MODE_PREH_TO_WORK   = ENUM; ENUM++;
  var MODE_WORK           = ENUM; ENUM++;
  var MODE_WORK_TO_FEED   = ENUM; ENUM++;
  var MODE_FEED           = ENUM; ENUM++;
  var MODE_FEED_TO_POSTH  = ENUM; ENUM++;
  var MODE_POSTH          = ENUM; ENUM++;
  var MODE_POSTH_TO_NIGHT = ENUM; ENUM++;
  var MODE_NIGHT          = ENUM; ENUM++;
  var MODE_NIGHT_TO_PREH  = ENUM; ENUM++;
  var MODE_COUNT          = ENUM; ENUM++;

  self.reset_level = function()
  {
    gg.cur_level.correct = 0;
    gg.timeline.t = 0;
    gg.timeline.t_target = 0;
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
      case MODE_MENU:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_CINEMATIC:
        break;
      case MODE_BOOT:
        break;
      case MODE_PREH:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_PREH_TO_WORK: //takes on next as current
        gg.cur_level = gg.next_level;
        self.reset_level();
        gg.message_box.clear();
        gg.message_box.nq_group(gg.cur_level.text);
        gg.message_box.nq("DATA:", SPEAKER_DATA, EMOTE_NULL, {})
        break;
      case MODE_WORK:
        gg.home_cam.wx = gg.monitor.wx;
        gg.home_cam.wy = gg.monitor.wy;
        gg.home_cam.ww = gg.monitor.wh/gg.lab.wh*gg.lab.ww;
        gg.home_cam.wh = gg.monitor.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        gg.timeline.fast_sim = 1;
        break;
      case MODE_WORK_TO_FEED:
        gg.exposition_box.clear();
        break;
      case MODE_FEED:
        gg.home_cam.wx = gg.lab.wx;
        gg.home_cam.wy = gg.lab.wy;
        gg.home_cam.ww = gg.lab.ww;
        gg.home_cam.wh = gg.lab.wh;
        screenSpace(gg.home_cam,gg.canv,gg.lab);
        screenSpace(gg.home_cam,gg.canv,gg.monitor);
        break;
      case MODE_FEED_TO_POSTH:
        gg.exposition_box.nq_group(gg.cur_level.post_text);
        break;
      case MODE_POSTH:
        break;
      case MODE_POSTH_TO_NIGHT:
        break;
      case MODE_NIGHT:
        break;
      case MODE_NIGHT_TO_PREH: //sets next level
        gg.next_level = gg.levels[(gg.cur_level.i+1)%gg.levels.length];
        gg.exposition_box.clear();
        gg.exposition_box.nq_group(gg.next_level.pre_text);
        break;
    }

  }

  self.ready = function()
  {
    gg.home_cam = {wx:0,wy:0,ww:0,wh:0};
    gg.monitor  = new monitor();
    gg.lab      = {wx:0,wy:0,ww:0,wh:0,x:0,y:0,w:0,h:0};
    gg.fade_t = 20;
    gg.zoom_t = 50;

    gg.console_img = GenImg("assets/console.png");
    gg.dark_console_img = GenImg("assets/console.png");
    gg.background_img = GenImg("assets/background.jpg");
    gg.notice_img = GenImg("assets/alert.png");

    gg.data_dragger = new data_dragger();
    gg.exposition_box = new exposition_box();
    gg.message_box = new message_box();
    gg.timeline = new timeline();
    gg.table = new table();
    gg.module_board = new module_board();
    gg.line = new editable_line();
    gg.quadratic = new editable_quadratic();

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 0;
    l.b = 0;
    l.correct_m = 2;
    l.correct_b = 1;
    for(var j = 0; j < 10; j++)
      l.feedback_imgs.push(GenImg("assets/feedback/"+i+"-"+j+".png"));
    gg.levels.push(l);
    i++;

    //quadratic
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 2;
    l.c = 1;
    l.correct_a = 0.5;
    l.correct_b = 2;
    l.correct_c = 3;
    gg.levels.push(l);
    i++;

    //quadratic 2
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0.5;
    l.b = 2;
    l.c = 3;
    l.correct_a = 0;
    l.correct_b = 2;
    l.correct_c = 5;
    gg.levels.push(l);
    i++;

    //charge rate
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 0;
    m.correct_v = 0;
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
    gg.levels.push(l);
    i++;

    //improved charge rate
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 0;
    m.correct_v = 0;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2;
    m.correct_v = 2.5;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    gg.levels.push(l);
    i++;

    //charge starting
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 0;
    m.correct_v = 0.5;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2.5;
    m.correct_v = 2.5;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
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
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 0;
    m.correct_v = 1;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    gg.levels.push(l);
    i++;

    //discharge new drills
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 10;
    m.correct_v = 10;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 1;
    m.correct_v = 1.5;
    m.wx = -100;
    l.modparams.push(m);
    m = new relparam();
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
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
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Drill Motor";
    m.v = 1.5;
    m.correct_v = 1.5;
    m.wx = -100;
    m.wy = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Solar Panel";
    m.v = 0;
    m.correct_v = 0.75;
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
    gg.levels.push(l);
    i++;

    //double charge
    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 0.5;
    m.correct_v = 0.5;
    m.wx = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 2.5;
    m.correct_v = 2.5;
    m.wx = -100;
    m.wy = 100;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Solar Panel";
    m.v = 0;
    m.correct_v = 0.75;
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
    gg.levels.push(l);
    i++;

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 2;
    l.b = 5;
    l.correct_m = 4;
    l.correct_b = 10;
    gg.levels.push(l);
    i++;

    //line
    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 4;
    l.b = 10;
    l.correct_m = 0.5;
    l.correct_b = 11;
    gg.levels.push(l);
    i++;

    //shipments quadratic
    l = new level();
    l.i = i;
    l.type = LEVEL_QUADRATIC;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = 1;
    l.correct_b = 2;
    l.correct_c = 12;
    gg.levels.push(l);
    i++;

    for(var i = 0; i < gg.levels.length; i++)
    {
      var l = gg.levels[i];
      l.pre_text       = used_text[i].pre_text;
      l.text           = used_text[i].text;
      l.incorrect_text = used_text[i].incorrect_text;
      l.correct_text   = used_text[i].correct_text;
      l.post_text      = used_text[i].post_text;
    }

    self.was_ready = 1;
    self.resize(stage);
    self.set_mode(MODE_MENU);
  };

  self.tick = function()
  {
    gg.mode_t++;
    gg.monitor.tick();
    switch(gg.mode)
    {
      case MODE_MENU:
        clicker.filter(gg.monitor);
        //if(gg.monitor.clicked)
          self.set_mode(MODE_CINEMATIC);
        break;
      case MODE_CINEMATIC:
      {
        clicker.filter(gg.monitor);
        if(gg.monitor.clicked)
          self.set_mode(MODE_BOOT);
      }
        break;
      case MODE_BOOT:
      {
        if(gg.mode_t < gg.fade_t) //fade home
        {
          var t = gg.mode_t/gg.zoom_t;
        }
        else
        {
          gg.next_level = gg.levels[0];
          gg.exposition_box.clear();
          gg.exposition_box.nq_group(gg.next_level.pre_text);
          self.set_mode(MODE_PREH);
        }
      }
      break;
      case MODE_PREH:
      {
        clicker.filter(gg.exposition_box);
        if(gg.exposition_box.displayed_i >= gg.exposition_box.text.length)
          self.set_mode(MODE_PREH_TO_WORK);
        gg.exposition_box.tick();
      }
        break;
      case MODE_PREH_TO_WORK:
      {
        if(gg.mode_t <= gg.zoom_t) //zoom to work
        {
          var t = gg.mode_t/gg.zoom_t;
          gg.home_cam.wx = lerp(gg.lab.wx,gg.monitor.wx,t);
          gg.home_cam.wy = lerp(gg.lab.wy,gg.monitor.wy,t);
          gg.home_cam.ww = lerp(gg.lab.ww,gg.monitor.wh/gg.lab.wh*gg.lab.ww,t);
          gg.home_cam.wh = lerp(gg.lab.wh,gg.monitor.wh,t);
          screenSpace(gg.home_cam,gg.canv,gg.lab);
          screenSpace(gg.home_cam,gg.canv,gg.monitor);
        }
        else if(gg.mode_t < gg.zoom_t+gg.fade_t) //fade to work
        {
          var t = (gg.mode_t-gg.fade_t-gg.zoom_t)/gg.fade_t;
        }
        else self.set_mode(MODE_WORK);
      }
        break;
      case MODE_WORK:
      {
        gg.table.tick();
        dragger.filter(gg.data_dragger);
        if(!gg.data_dragger.dragging)
        {
          switch(gg.cur_level.type)
          {
            case LEVEL_LINEAR:    gg.line.filter(keyer,blurer,dragger,clicker);         gg.line.tick();         break;
            case LEVEL_QUADRATIC: gg.quadratic.filter(keyer,blurer,dragger,clicker);    gg.quadratic.tick();    break;
            case LEVEL_MODULE:    gg.module_board.filter(keyer,blurer,dragger,clicker); gg.module_board.tick(); break;
          }
          gg.timeline.filter(dragger,clicker);
          dragger.filter(gg.message_box);
        }

        if(gg.cur_level.correct && gg.message_box.requested_end)
          self.set_mode(MODE_WORK_TO_FEED);

        gg.timeline.tick();
        gg.cur_level.tick();
        gg.message_box.tick();
        if(!gg.cur_level.correct) gg.message_box.prompt_end = 0;
      }
        break;
      case MODE_WORK_TO_FEED:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          var t = gg.mode_t/gg.fade_t;
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t) //zoom to home
        {
          var t = (gg.mode_t-gg.fade_t)/gg.zoom_t;
          gg.home_cam.wx = lerp(gg.monitor.wx,gg.lab.wx,t);
          gg.home_cam.wy = lerp(gg.monitor.wy,gg.lab.wy,t);
          gg.home_cam.ww = lerp(gg.monitor.wh/gg.lab.wh*gg.lab.ww,gg.lab.ww,t);
          gg.home_cam.wh = lerp(gg.monitor.wh,gg.lab.wh,t);
          screenSpace(gg.home_cam,gg.canv,gg.lab);
          screenSpace(gg.home_cam,gg.canv,gg.monitor);
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t+gg.fade_t) //fade to feed
        {
          var t = (gg.mode_t-gg.fade_t-gg.zoom_t)/gg.fade_t;
          gg.home_cam.wx = gg.lab.wx;
          gg.home_cam.wy = gg.lab.wy;
          gg.home_cam.ww = gg.lab.ww;
          gg.home_cam.wh = gg.lab.wh;
          screenSpace(gg.home_cam,gg.canv,gg.lab);
          screenSpace(gg.home_cam,gg.canv,gg.monitor);
        }
        else self.set_mode(MODE_FEED);
      }
        break;
      case MODE_FEED:
        if(gg.mode_t < gg.fade_t*gg.cur_level.feedback_imgs.length) //display feedback
        {
          var t = gg.mode_t/gg.fade_t*gg.cur_level.feedback_imgs.length;
        }
        else self.set_mode(MODE_FEED_TO_POSTH);
        break;
      case MODE_FEED_TO_POSTH:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          var t = gg.mode_t/gg.fade_t;
        }
        else self.set_mode(MODE_POSTH);
      }
        break;
      case MODE_POSTH:
      {
        clicker.filter(gg.exposition_box);
        if(gg.exposition_box.displayed_i >= gg.exposition_box.text.length)
          self.set_mode(MODE_POSTH_TO_NIGHT);
        gg.exposition_box.tick();
      }
        break;
      case MODE_POSTH_TO_NIGHT:
      {
        if(gg.mode_t < gg.fade_t) //fade to black
        {
          var t = gg.mode_t/gg.fade_t;
        }
        else if(gg.mode_t < gg.fade_t+gg.fade_t) //fade to night
        {
          var t = (gg.mode_t-gg.fade_t)/gg.fade_t;
        }
        else self.set_mode(MODE_NIGHT);
      }
        break;
      case MODE_NIGHT:
        if(gg.mode_t < gg.fade_t) //display night
        {
          var t = gg.mode_t/gg.fade_t;
        }
        else self.set_mode(MODE_NIGHT_TO_PREH);
        break;
      case MODE_NIGHT_TO_PREH:
      {
        if(gg.mode_t < gg.fade_t) //fade to black
        {
          var t = gg.mode_t/gg.fade_t;
        }
        else if(gg.mode_t < gg.fade_t+gg.fade_t) //fade to home
        {
          var t = (gg.mode_t-gg.fade_t)/gg.fade_t;
        }
        else self.set_mode(MODE_PREH);
      }
        break;
    }

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw_home = function()
  {
    strokeBox(gg.lab,gg.ctx);
    drawImageBox(gg.background_img,gg.lab,gg.ctx);
    gg.ctx.imageSmoothingEnabled = 0;
    if(gg.mode == MODE_FEED)
    {
      drawImageBox(gg.cur_level.feedback_imgs[floor((gg.mode_t*2/gg.fade_t)%gg.cur_level.feedback_imgs.length)],gg.monitor,gg.ctx);
    }
    else
      drawImageBox(gg.monitor.screen,gg.monitor,gg.ctx);
    gg.ctx.imageSmoothingEnabled = 1;
    drawImageBox(gg.console_img,gg.lab,gg.ctx);
    //strokeBox(gg.monitor,gg.ctx);
    gg.exposition_box.draw();
  }

  self.draw_work = function()
  {
    gg.ctx.fillStyle = "#7A92AB";
    gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
    gg.ctx.strokeStyle = black;
    gg.table.draw();
    gg.timeline.draw();
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:    gg.line.draw();         break;
      case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
      case LEVEL_MODULE:    gg.module_board.draw(); break;
    }
    gg.cur_level.draw();
    gg.message_box.draw();
    gg.data_dragger.draw();
  }

  self.draw_night = function()
  {

  }

  self.draw = function()
  {
    gg.monitor.draw(); //draws to self- not to screen
    switch(gg.mode)
    {
      case MODE_MENU:
      {
        self.draw_home();
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
      }
        break;
      case MODE_CINEMATIC:
      {
        self.draw_home();
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
        var s = 40;
        gg.ctx.drawImage(gg.notice_img,gg.monitor.x+gg.monitor.w-s/2,gg.monitor.y-s/2,s,s);
      }
        break;
      case MODE_BOOT:
      {
        self.draw_home();
        var t = gg.mode_t/gg.fade_t;
        gg.ctx.globalAlpha = 1-t;
        drawImageBox(gg.dark_console_img,gg.lab,gg.ctx);
        gg.ctx.globalAlpha = 1;
      }
        break;
      case MODE_PREH:
      {
        self.draw_home();
      }
        break;
      case MODE_PREH_TO_WORK:
      {
        if(gg.mode_t <= gg.zoom_t) //zoom to work
        {
          self.draw_home();
        }
        else if(gg.mode_t < gg.zoom_t+gg.fade_t) //fade to work
        {
          self.draw_work();
          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.zoom_t)/gg.fade_t);
          self.draw_home();
          gg.ctx.globalAlpha = 1;
        }
      }
        break;
      case MODE_WORK:
      {
        self.draw_work();
      }
        break;
      case MODE_WORK_TO_FEED:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          self.draw_work();
          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          self.draw_home();
          gg.ctx.globalAlpha = 1;
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t) //zoom to home
        {
          self.draw_home();
        }
        else if(gg.mode_t < gg.fade_t+gg.zoom_t+gg.fade_t) //fade to feed
        {
          self.draw_home();
        }
      }
        break;
      case MODE_FEED:
      {
        self.draw_home();
      }
        break;
      case MODE_FEED_TO_POSTH:
      {
        if(gg.mode_t < gg.fade_t) //fade to face
        {
          var t = gg.mode_t/gg.fade_t;
          self.draw_home();
        }
      }
        break;
      case MODE_POSTH:
        self.draw_home();
        break;
      case MODE_POSTH_TO_NIGHT:
        if(gg.mode_t < gg.fade_t)
        {
          self.draw_home();
          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else
        {
          self.draw_night();
          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.fade_t)/gg.fade_t);
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        break;
      case MODE_NIGHT:
        self.draw_night();
        break;
      case MODE_NIGHT_TO_PREH:
        if(gg.mode_t < gg.fade_t)
        {
          self.draw_night();
          gg.ctx.globalAlpha = gg.mode_t/gg.fade_t;
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
        }
        else
        {
          self.draw_home();
          gg.ctx.globalAlpha = 1-((gg.mode_t-gg.fade_t)/gg.fade_t);
          gg.ctx.fillRect(0,0,gg.canv.width,gg.canv.height);
          gg.ctx.globalAlpha = 1;
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

