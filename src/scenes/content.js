'use strict';
var ENUM;

ENUM = 0;
var TRIGGER_NULL  = ENUM; ENUM++;
var TRIGGER_CLICK = ENUM; ENUM++;
var TRIGGER_TIMER = ENUM; ENUM++;
var TRIGGER_COUNT = ENUM; ENUM++;

ENUM = 0;
var CONTENT_NULL     = ENUM; ENUM++;
var CONTENT_PLAYER   = ENUM; ENUM++;
var CONTENT_AI       = ENUM; ENUM++;
var CONTENT_DATA     = ENUM; ENUM++;
var CONTENT_LABEL    = ENUM; ENUM++;
var CONTENT_CONSTANT = ENUM; ENUM++;
var CONTENT_SIM      = ENUM; ENUM++;
var CONTENT_NULL     = ENUM; ENUM++;

ENUM = 0;
var EMOTE_NULL       = ENUM; ENUM++;
var EMOTE_EXCITED    = ENUM; ENUM++;
var EMOTE_BASHFUL    = ENUM; ENUM++;
var EMOTE_SAD        = ENUM; ENUM++;
var EMOTE_PROCESSING = ENUM; ENUM++;
//special
var EMOTE_SILENT   = ENUM; ENUM++;
var EMOTE_BLACKOUT = ENUM; ENUM++;
var EMOTE_RECOVER  = ENUM; ENUM++;
var EMOTE_CHANGE   = ENUM; ENUM++;
var EMOTE_DIE      = ENUM; ENUM++;
var EMOTE_EMP      = ENUM; ENUM++;
var EMOTE_BUILD    = ENUM; ENUM++;
var EMOTE_NULL     = ENUM; ENUM++;

var level = function()
{
  var self = this;
  self.i = 0;
  self.y_icon = GenIcon(10,10);
  self.m_starting = [0,];
  self.m_correct = [0,];
  self.m_correct_total = 0;
  self.m_label = ["Rate",];
  self.m_label_fmt = [];
  self.m_icon = [GenIcon(10,10),];
  self.b_starting = [0,];
  self.b_correct = [0,];
  self.b_correct_total = 0;
  self.b_label = ["Initial",];
  self.b_label_fmt = [];
  self.b_icon = [GenIcon(10,10),];

  self.t_speed = 0.01;
  self.fast_t_speed = 0.1;
  self.x_label = "HOURS";
  self.y_label = "FUEL";

  self.day = 0;

  self.context_imgs = [];
  self.system_imgs = [];
  self.pano = 0;
  self.pano_st = 0;
  self.pano_et = 1;

  self.skip_context = 0;
  self.skip_zoom = 0;
  self.perma_zoom = 0;
  self.skip_axis = 0;
  self.skip_labels = 0;
  self.skip_system = 0;
  self.skip_night = 0;
  self.push_work = 0;
  self.special = 0;

  self.text = {}; //see text.js for format

  //state
  self.progress = 0;
  self.msg_progress = 0;
  self.correct = 0;

  self.reset = function()
  {
    self.progress = 0;
    self.msg_progress = 0;
    self.correct = 0;
  }

  self.commit = function()
  {
    if(self.special)
    {
      self.m_correct_total = 1;
      for(var i = 0; i < self.m_correct.length; i++)
        self.m_correct_total *= self.m_correct[i];
    }
    else
    {
      self.m_correct_total = 0;
      for(var i = 0; i < self.m_correct.length; i++)
        self.m_correct_total += self.m_correct[i];
    }
    self.b_correct_total = 0;
    for(var i = 0; i < self.b_correct.length; i++)
      self.b_correct_total += self.b_correct[i];
    var w = 50;
    self.m_label_fmt = [];
    for(var i = 0; i < self.m_label.length; i++)
    {
      self.m_label_fmt[i] = textToLines(gg.line.font,w,self.m_label[i],gg.ctx);
      for(var j = 0; j < self.m_label_fmt[i].length; j++)
        self.m_label_fmt[i][j] = self.m_label_fmt[i][j].trim();
    }
    self.b_label_fmt = [];
    for(var i = 0; i < self.b_label.length; i++)
    {
      self.b_label_fmt[i] = textToLines(gg.line.font,w,self.b_label[i],gg.ctx);
      for(var j = 0; j < self.b_label_fmt[i].length; j++)
        self.b_label_fmt[i][j] = self.b_label_fmt[i][j].trim();
    }
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {

  }
}

