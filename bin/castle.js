(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) len = s.length; else if(len < 0) {
		if(pos == 0) len = s.length + len; else return "";
	}
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var cdb_jq_Server = function(root) {
	this.root = root;
	this.nodes = [root];
	this.events = new haxe_ds_IntMap();
};
$hxClasses["cdb.jq.Server"] = cdb_jq_Server;
cdb_jq_Server.__name__ = ["cdb","jq","Server"];
cdb_jq_Server.prototype = {
	send: function(msg) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,dock: function(parent,e,dir,size) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,handleSpecial: function(e,name,args,result) {
	}
	,onMessage: function(msg) {
		var _g = this;
		switch(msg[1]) {
		case 0:
			var attr = msg[4];
			var name = msg[3];
			var id = msg[2];
			var n = window.document.createElement(name);
			if(attr != null) {
				var _g1 = 0;
				while(_g1 < attr.length) {
					var a = attr[_g1];
					++_g1;
					n.setAttribute(a.name,a.value);
				}
			}
			this.nodes[id] = n;
			break;
		case 1:
			var name1 = msg[3];
			var id1 = msg[2];
			this.nodes[id1].classList.add(name1);
			break;
		case 2:
			var name2 = msg[3];
			var id2 = msg[2];
			this.nodes[id2].classList.remove(name2);
			break;
		case 3:
			var to = msg[3];
			var id3 = msg[2];
			this.nodes[to].appendChild(this.nodes[id3]);
			break;
		case 4:
			var pid = msg[4];
			var text = msg[3];
			var id4 = msg[2];
			var t = window.document.createTextNode(text);
			this.nodes[id4] = t;
			if(pid != null) this.nodes[pid].appendChild(t);
			break;
		case 5:
			var id5 = msg[2];
			var n1 = this.nodes[id5];
			while(n1.firstChild != null) n1.removeChild(n1.firstChild);
			break;
		case 6:
			var size = msg[5];
			var dir = msg[4];
			var e = msg[3];
			var p = msg[2];
			this.dock(this.nodes[p],this.nodes[e],dir,size);
			break;
		case 7:
			var id6 = msg[2];
			this.nodes[id6].remove();
			break;
		case 8:
			var eid = msg[4];
			var name3 = msg[3];
			var id7 = msg[2];
			var n2 = this.nodes[id7];
			var callb = function(e1) {
				var sendValue = false;
				var props = null;
				switch(name3) {
				case "change":
					sendValue = true;
					break;
				case "blur":
					if(n2.tagName == "INPUT") sendValue = true; else {
					}
					break;
				case "keydown":
					props = { keyCode : e1.keyCode, shiftKey : e1.shiftKey, ctrlKey : e1.ctrlKey};
					if(n2.tagName == "INPUT") sendValue = true;
					break;
				case "mousedown":case "mouseup":
					props = { which : e1.which};
					break;
				default:
				}
				if(sendValue) _g.send(cdb_jq_Answer.SetValue(id7,"" + Std.string(Reflect.field(n2,"value"))));
				_g.send(cdb_jq_Answer.Event(eid,props));
			};
			this.events.h[eid] = { name : name3, callb : callb, n : n2};
			n2.addEventListener(name3,callb);
			break;
		case 9:
			var val = msg[4];
			var att = msg[3];
			var id8 = msg[2];
			this.nodes[id8].setAttribute(att,val);
			break;
		case 10:
			var val1 = msg[4];
			var s = msg[3];
			var id9 = msg[2];
			this.nodes[id9].style[s] = val1;
			break;
		case 11:
			var s1 = msg[3];
			var id10 = msg[2];
			var n3 = this.nodes[id10];
			var m = Reflect.field(n3,s1);
			if(m == null) throw new js__$Boot_HaxeError(Std.string(n3) + " has no method " + Std.string(m));
			Reflect.callMethod(n3,m,[]);
			if(s1 == "focus" && n3.tagName == "SELECT") {
				var event = window.document.createEvent("MouseEvents");
				event.initMouseEvent("mousedown",true,true,window);
				n3.dispatchEvent(event);
			}
			break;
		case 12:
			var eid1 = msg[5];
			var args = msg[4];
			var name4 = msg[3];
			var id11 = msg[2];
			this.handleSpecial(this.nodes[id11],name4,args,eid1 == null?function(_) {
			}:function(v) {
				_g.send(cdb_jq_Answer.Event(eid1,{ value : v}));
			});
			break;
		case 13:
			var duration = msg[4];
			var name5 = msg[3];
			var id12 = msg[2];
			this.handleSpecial(this.nodes[id12],"animate",[name5,duration],null);
			break;
		case 15:
			var eids = msg[2];
			var _g2 = 0;
			while(_g2 < eids.length) {
				var eid2 = eids[_g2];
				++_g2;
				var e2 = this.events.h[eid2];
				if(e2 != null) {
					this.events.remove(eid2);
					e2.n.removeEventListener(e2.name,e2.callb);
				}
			}
			break;
		case 14:
			var eids1 = msg[3];
			var id13 = msg[2];
			this.nodes[id13].remove();
			this.nodes[id13] = null;
			if(eids1 != null) this.onMessage(cdb_jq_Message.Unbind(eids1));
			break;
		}
	}
	,__class__: cdb_jq_Server
};
var JqPage = function(sock) {
	cdb_jq_Server.call(this,window.document.createElement("div"));
	this.sock = sock;
	this.page = window.document.createElement("div");
	this.page.setAttribute("class","jqpage");
	this.page.appendChild(this.root);
	window.document.body.appendChild(this.page);
	this.page.style.visibility = "hidden";
	this.name = "";
	this.panels = new haxe_ds_ObjectMap();
	this.dnodes = new haxe_ds_ObjectMap();
	this.dockManager = new dockspawn.DockManager(this.page);
	this.dockManager.initialize();
	this.dockManager.resize(800,600);
	this.dnodes.set(this.root,this.dockManager.context.model.documentManagerNode);
};
$hxClasses["JqPage"] = JqPage;
JqPage.__name__ = ["JqPage"];
JqPage.__super__ = cdb_jq_Server;
JqPage.prototype = $extend(cdb_jq_Server.prototype,{
	send: function(msg) {
		var bytes = cdb_BinSerializer.doSerialize(msg,560507292);
		var buf = new js_node_buffer_Buffer(bytes.length + 2);
		buf[0] = bytes.length & 255;
		buf[1] = bytes.length >> 8;
		var _g1 = 0;
		var _g = buf.length;
		while(_g1 < _g) {
			var i = _g1++;
			buf[i + 2] = bytes.b[i];
		}
		this.sock.write(buf);
	}
	,dock: function(parent,e,dir,size) {
		var p = this.panels.h[e.__id__];
		if(p == null) {
			p = new dockspawn.PanelContainer(e,this.dockManager);
			this.panels.set(e,p);
		}
		var n = this.dnodes.h[parent.__id__];
		if(n == null) return;
		var n1;
		switch(dir[1]) {
		case 0:
			n1 = this.dockManager.dockLeft(n,p,size);
			break;
		case 1:
			n1 = this.dockManager.dockRight(n,p,size);
			break;
		case 2:
			n1 = this.dockManager.dockUp(n,p,size);
			break;
		case 3:
			n1 = this.dockManager.dockDown(n,p,size);
			break;
		case 4:
			n1 = this.dockManager.dockFill(n,p);
			break;
		}
		this.dnodes.set(e,n1);
	}
	,handleSpecial: function(e,name,args,result) {
		switch(name) {
		case "colorPick":
			var id = Std.random(1);
			e.innerHTML = "<div class=\"modal\" onclick=\"$('#_c" + id + "').spectrum('toggle')\"></div><input type=\"text\" id=\"_c" + id + "\"/>";
			var spect = $("#_c" + id);
			var val = args[0];
			var getColor = function(vcol) {
				return Std.parseInt("0x" + Std.string(vcol.toHex())) | Std["int"](vcol.getAlpha() * 255) << 24;
			};
			spect.spectrum({ color : "rgba(" + [val >> 16 & 255,val >> 8 & 255,val & 255,(val >>> 24) / 255].join(",") + ")", showInput : true, showButtons : false, showAlpha : args[1], clickoutFiresChange : true, move : function(vcol1) {
				result({ color : getColor(vcol1), done : false});
			}, change : function(vcol2) {
				spect.spectrum("hide");
				result({ color : getColor(vcol2), done : true});
			}, hide : function(vcol3) {
				result({ color : getColor(vcol3), done : true});
			}}).spectrum("show");
			break;
		case "fileSelect":
			var path = args[0];
			var ext;
			if(args[1] == null) ext = []; else ext = args[1].split(",");
			var fs = $("#fileSelect");
			if(path != null && StringTools.startsWith(window.navigator.platform,"Win")) path = path.split("/").join("\\");
			fs.attr("nwworkingdir",path == null?"":new haxe_io_Path(path).dir);
			fs.change(function(_) {
				fs.unbind("change");
				var path1 = fs.val().split("\\").join("/");
				fs.val("");
				if(path1 == "") {
					result(null);
					return;
				}
				fs.attr("nwworkingdir","");
				result(path1);
			}).click();
			break;
		case "animate":
			var j = $(e);
			Reflect.callMethod(j,Reflect.field(j,args[0]),[args[1]]);
			break;
		case "setName":
			name = args[0];
			if(this.tab != null) this.tab.text(name);
			break;
		case "popupMenu":
			var args1 = args;
			var n = new js_node_webkit_Menu();
			var _g1 = 0;
			var _g = args1.length;
			while(_g1 < _g) {
				var i = [_g1++];
				var mit = new js_node_webkit_MenuItem({ label : args1[i[0]]});
				n.append(mit);
				mit.click = (function(i) {
					return function() {
						result(i[0]);
					};
				})(i);
			}
			n.popup(Main.inst.mousePos.x,Main.inst.mousePos.y);
			break;
		case "startDrag":
			var document = window.document;
			var onMove = function(e1) {
				result({ dx : e1.movementX, dy : e1.movementY});
			};
			var onUp = function() {
				document.exitPointerLock();
			};
			var onChange;
			var onChange1 = null;
			onChange1 = function() {
				if(document.pointerLockElement == e) {
					document.addEventListener("mousemove",onMove,false);
					document.addEventListener("mouseup",onUp,false);
				} else {
					result({ dx : 0, dy : 0, done : true});
					document.removeEventListener("pointerlockchange",onChange1,false);
					document.removeEventListener("mousemove",onMove,false);
					document.removeEventListener("mouseup",onUp,false);
				}
			};
			onChange = onChange1;
			document.addEventListener("pointerlockchange",onChange,false);
			e.requestPointerLock();
			break;
		default:
			throw new js__$Boot_HaxeError("Don't know how to handle " + name + "(" + args.join(",") + ")");
		}
	}
	,__class__: JqPage
});
var JqPages = function(main) {
	this.curPage = -1;
	this.main = main;
	this.pages = [];
	js_node_Net.createServer($bind(this,this.onClient)).listen(6669,"127.0.0.1");
};
$hxClasses["JqPages"] = JqPages;
JqPages.__name__ = ["JqPages"];
JqPages.prototype = {
	updateTabs: function() {
		var _g2 = this;
		var sheets = $("ul#sheets");
		sheets.find("li.client").remove();
		var _g = 0;
		var _g1 = this.pages;
		while(_g < _g1.length) {
			var p = [_g1[_g]];
			++_g;
			var jc = [$("<li>").addClass("client").text(p[0].name == ""?"???":p[0].name).appendTo(sheets)];
			p[0].tab = jc[0];
			jc[0].click((function(jc,p) {
				return function(e) {
					_g2.curPage = Lambda.indexOf(_g2.pages,p[0]);
					$("#sheets li").removeClass("active");
					jc[0].addClass("active");
					_g2.select();
				};
			})(jc,p));
			if(Lambda.indexOf(this.pages,p[0]) == this.curPage) jc[0].addClass("active");
		}
	}
	,onKey: function(e) {
		this.pages[this.curPage].send(cdb_jq_Answer.Event(-1,{ keyCode : e.keyCode, shiftKey : e.shiftKey, ctrlKey : e.ctrlKey}));
	}
	,select: function() {
		var p = this.pages[this.curPage];
		$("#content").html("").append(p.page);
		p.page.style.visibility = "";
		this.onResize();
	}
	,onResize: function() {
		if(this.curPage >= 0) {
			var p = this.pages[this.curPage];
			p.page.style.width = "100%";
			p.page.style.height = "100%";
			p.dockManager.resize(p.page.clientWidth,p.page.clientHeight - (30 + p.root.clientHeight));
		}
	}
	,onClient: function(sock) {
		var _g = this;
		var p = new JqPage(sock);
		this.pages.push(p);
		this.updateTabs();
		sock.setNoDelay(true);
		sock.on("error",function() {
			sock.end();
		});
		sock.on("close",function() {
			var cur = _g.curPage == Lambda.indexOf(_g.pages,p);
			p.page.remove();
			HxOverrides.remove(_g.pages,p);
			_g.updateTabs();
			if(cur) {
				_g.curPage--;
				_g.main.initContent();
			}
		});
		var curBuffer = null;
		var curPos = 0;
		var size = 0;
		var sizeCount = 0;
		sock.on("data",function(e) {
			var pos = 0;
			while(pos < e.length) if(curBuffer == null) {
				size |= e.readUInt8(pos++) << sizeCount * 8;
				sizeCount++;
				if(sizeCount == 4) {
					curBuffer = new haxe_io_Bytes(new ArrayBuffer(size));
					curPos = 0;
				}
			} else {
				var max = e.length - pos;
				if(max > curBuffer.length - curPos) max = curBuffer.length - curPos;
				var _g1 = 0;
				while(_g1 < max) {
					var i = _g1++;
					curBuffer.set(curPos++,e.readUInt8(pos++));
				}
				if(curPos == curBuffer.length) {
					var msg = cdb_BinSerializer.doUnserialize(curBuffer,1522840838);
					p.onMessage(msg);
					switch(msg[1]) {
					case 9:
						switch(msg[2]) {
						case 0:
							switch(msg[3]) {
							case "title":
								var name = msg[4];
								p.tab.text(name);
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
					curBuffer = null;
					sizeCount = 0;
					size = 0;
				}
			}
		});
	}
	,__class__: JqPages
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var Level = function(model,sheet,index) {
	this.reloading = false;
	this.rotation = 0;
	this.flipMode = false;
	this.startPos = null;
	this.mousePos = { x : 0, y : 0};
	this.zoomView = 1.;
	this.sheet = sheet;
	this.sheetPath = SheetData.getPath(sheet);
	this.index = index;
	this.obj = sheet.lines[index];
	this.model = model;
	this.references = [];
	this.palette = new lvl_Palette(this);
};
$hxClasses["Level"] = Level;
Level.__name__ = ["Level"];
Level.prototype = {
	getName: function() {
		var name = "#" + this.index;
		var _g = 0;
		var _g1 = this.sheet.columns;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var v = Reflect.field(this.obj,c.name);
			{
				var _g2 = c.type;
				switch(_g2[1]) {
				case 1:
					if(c.name == this.sheet.props.displayColumn && v != null && v != "") return Std.string(v) + "#" + this.index; else {
					}
					break;
				case 6:
					if(c.name == this.sheet.props.displayColumn && v != null && v != "") return Std.string(v) + "#" + this.index; else {
					}
					break;
				case 0:
					name = v;
					break;
				default:
				}
			}
		}
		return name;
	}
	,set_mouseCapture: function(e) {
		var _g = this;
		this.mouseCapture = e;
		if(e != null) {
			var onUp;
			var onUp1 = null;
			onUp1 = function(_) {
				window.document.removeEventListener("mouseup",onUp1);
				if(_g.mouseCapture != null) {
					_g.mouseCapture.mouseup();
					_g.set_mouseCapture(null);
				}
			};
			onUp = onUp1;
			window.document.addEventListener("mouseup",onUp);
		}
		return e;
	}
	,init: function() {
		var _g = this;
		this.layers = [];
		this.watchList = [];
		this.watchTimer = new haxe_Timer(50);
		this.watchTimer.run = $bind(this,this.checkWatch);
		var $it0 = Level.loadedTilesCache.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.watchSplit(key);
		}
		this.props = this.obj.props;
		if(this.props == null) {
			this.props = { };
			this.obj.props = this.props;
		}
		if(this.props.tileSize == null) this.props.tileSize = 16;
		this.tileSize = this.props.tileSize;
		var lprops = new haxe_ds_StringMap();
		if(this.props.layers == null) this.props.layers = [];
		var _g1 = 0;
		var _g11 = this.props.layers;
		while(_g1 < _g11.length) {
			var ld = _g11[_g1];
			++_g1;
			var prev = lprops.get(ld.l);
			if(prev != null) HxOverrides.remove(this.props.layers,prev);
			lprops.set(ld.l,ld);
		}
		var getProps = function(name) {
			var p;
			p = __map_reserved[name] != null?lprops.getReserved(name):lprops.h[name];
			if(p == null) {
				p = { l : name, p : { alpha : 1.}};
				_g.props.layers.push(p);
			}
			lprops.remove(name);
			return p.p;
		};
		this.waitCount = 1;
		var title = "";
		var _g2 = 0;
		var _g12 = this.sheet.columns;
		while(_g2 < _g12.length) {
			var c = _g12[_g2];
			++_g2;
			var val = Reflect.field(this.obj,c.name);
			var _g21 = c.name;
			switch(_g21) {
			case "width":
				this.width = val;
				break;
			case "height":
				this.height = val;
				break;
			default:
			}
			{
				var _g22 = c.type;
				switch(_g22[1]) {
				case 0:
					title = val;
					break;
				case 12:
					var type = _g22[2];
					var l = new lvl_LayerData(this,c.name,getProps(c.name),{ o : this.obj, f : c.name});
					l.loadSheetData(this.model.smap.get(type).s);
					l.setLayerData(val);
					this.layers.push(l);
					break;
				case 8:
					var sheet = SheetData.model.smap.get(this.sheet.name + "@" + c.name).s;
					var floatCoord = false;
					if(SheetData.hasColumn(sheet,"x",[cdb_ColumnType.TInt]) && SheetData.hasColumn(sheet,"y",[cdb_ColumnType.TInt]) || (floatCoord = SheetData.hasColumn(sheet,"x",[cdb_ColumnType.TFloat]) && SheetData.hasColumn(sheet,"y",[cdb_ColumnType.TFloat]))) {
						var sid = null;
						var idCol = null;
						var _g3 = 0;
						var _g4 = sheet.columns;
						try {
							while(_g3 < _g4.length) {
								var cid = _g4[_g3];
								++_g3;
								{
									var _g5 = cid.type;
									switch(_g5[1]) {
									case 6:
										var rid = _g5[2];
										sid = this.model.smap.get(rid).s;
										idCol = cid.name;
										throw "__break__";
										break;
									default:
									}
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var l1 = new lvl_LayerData(this,c.name,getProps(c.name),{ o : this.obj, f : c.name});
						l1.hasFloatCoord = l1.floatCoord = floatCoord;
						l1.baseSheet = sheet;
						l1.loadSheetData(sid);
						l1.setObjectsData(idCol,val);
						l1.hasSize = SheetData.hasColumn(sheet,"width",[floatCoord?cdb_ColumnType.TFloat:cdb_ColumnType.TInt]) && SheetData.hasColumn(sheet,"height",[floatCoord?cdb_ColumnType.TFloat:cdb_ColumnType.TInt]);
						this.layers.push(l1);
					} else if(SheetData.hasColumn(sheet,"name",[cdb_ColumnType.TString]) && SheetData.hasColumn(sheet,"data",[cdb_ColumnType.TTileLayer])) {
						var val1 = val;
						var _g31 = 0;
						while(_g31 < val1.length) {
							var lobj = val1[_g31];
							++_g31;
							if(lobj.name == null) continue;
							var l2 = new lvl_LayerData(this,lobj.name,getProps(lobj.name),{ o : lobj, f : "data"});
							l2.setTilesData(lobj.data);
							l2.listColumnn = c;
							this.layers.push(l2);
						}
						this.newLayer = c;
					}
					break;
				case 15:
					var l3 = new lvl_LayerData(this,c.name,getProps(c.name),{ o : this.obj, f : c.name});
					l3.setTilesData(val);
					this.layers.push(l3);
					break;
				default:
				}
			}
		}
		var $it1 = new haxe_ds__$StringMap_StringMapIterator(lprops,lprops.arrayKeys());
		while( $it1.hasNext() ) {
			var c1 = $it1.next();
			HxOverrides.remove(this.props.layers,c1);
		}
		if(this.sheet.props.displayColumn != null) {
			var t = Reflect.field(this.obj,this.sheet.props.displayColumn);
			if(t != null) title = t;
		}
		this.palette.init();
		this.waitDone();
	}
	,watchSplit: function(key) {
		var _g = this;
		var file = key.split("@").shift();
		var abs = this.model.getAbsPath(file);
		this.watch(file,function() {
			lvl_Image.load(abs,function(_) {
				Level.loadedTilesCache.remove(key);
				_g.reload();
			},function() {
				var _g1 = 0;
				var _g2 = _g.watchList;
				while(_g1 < _g2.length) {
					var w = _g2[_g1];
					++_g1;
					if(w.path == abs) w.time = 0;
				}
			},true);
		});
	}
	,loadAndSplit: function(file,size,callb) {
		var key = file + "@" + size;
		var a = Level.loadedTilesCache.get(key);
		if(a == null) {
			a = { pending : [], data : null};
			Level.loadedTilesCache.set(key,a);
			lvl_Image.load(this.model.getAbsPath(file),function(i) {
				var images = [];
				var blanks = [];
				var w = i.width / size | 0;
				var h = i.height / size | 0;
				var _g = 0;
				while(_g < h) {
					var y = _g++;
					var _g1 = 0;
					while(_g1 < w) {
						var x = _g1++;
						var i1 = i.sub(x * size,y * size,size,size);
						blanks[images.length] = i1.isBlank();
						images.push(i1);
					}
				}
				a.data = { w : w, h : h, img : images, blanks : blanks};
				var _g2 = 0;
				var _g11 = a.pending;
				while(_g2 < _g11.length) {
					var p = _g11[_g2];
					++_g2;
					p(w,h,images,blanks);
				}
				a.pending = [];
			},function() {
				throw new js__$Boot_HaxeError("Could not load " + file);
			});
			this.watchSplit(key);
		}
		if(a.data != null) callb(a.data.w,a.data.h,a.data.img,a.data.blanks); else a.pending.push(callb);
	}
	,reload: function() {
		if(!this.reloading) {
			this.reloading = true;
			this.model.initContent();
		}
	}
	,allocRef: function(f) {
		var r = { ref : f};
		this.references.push(r);
		return r;
	}
	,dispose: function() {
		if(this.content != null) this.content.html("");
		if(this.view != null) {
			this.view.dispose();
			this.view.viewport.parentNode.removeChild(this.view.viewport);
			this.view = null;
			var _g = 0;
			var _g1 = this.references;
			while(_g < _g1.length) {
				var r = _g1[_g];
				++_g;
				r.ref = null;
			}
		}
		this.watchTimer.stop();
		this.watchTimer = null;
	}
	,isDisposed: function() {
		return this.watchTimer == null;
	}
	,watch: function(path,callb) {
		path = this.model.getAbsPath(path);
		var _g = 0;
		var _g1 = this.watchList;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			if(w.path == path) {
				w.callb.push(callb);
				return;
			}
		}
		this.watchList.push({ path : path, time : this.getFileTime(path), callb : [callb]});
	}
	,checkWatch: function() {
		var _g = 0;
		var _g1 = this.watchList;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			var f = this.getFileTime(w.path);
			if(f != w.time && f != 0.) {
				w.time = f;
				js_node_webkit_App.clearCache();
				var _g2 = 0;
				var _g3 = w.callb;
				while(_g2 < _g3.length) {
					var c = _g3[_g2];
					++_g2;
					c();
				}
			}
		}
	}
	,getFileTime: function(path) {
		try {
			return js_node_Fs.statSync(path).mtime.getTime();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return 0.;
		}
	}
	,wait: function() {
		this.waitCount++;
	}
	,waitDone: function() {
		if(--this.waitCount != 0) return;
		if(this.isDisposed()) return;
		this.setup();
		var layer = this.layers[0];
		var state;
		try {
			state = haxe_Unserializer.run(js_Browser.getLocalStorage().getItem(this.sheetPath + "#" + this.index));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			state = null;
		}
		if(state != null) {
			var _g = 0;
			var _g1 = this.layers;
			while(_g < _g1.length) {
				var l = _g1[_g];
				++_g;
				if(l.name == state.curLayer) {
					layer = l;
					break;
				}
			}
			this.zoomView = state.zoomView;
			this.palette.paintMode = state.paintMode;
			this.palette.randomMode = state.randomMode;
			this.palette.mode = state.paletteMode;
			this.palette.modeCursor = state.paletteModeCursor;
			this.palette.small = state.smallPalette;
			this.flipMode = state.flipMode;
			this.rotation = state.rotation;
			if(this.rotation == null) this.rotation = 0;
			if(this.palette.small == null) this.palette.small = false;
		}
		this.setLayer(layer);
		this.updateZoom();
		var sc = this.content.find(".scroll");
		if(state != null) {
			sc.scrollLeft(state.scrollX);
			sc.scrollTop(state.scrollY);
		}
		sc.scroll();
	}
	,toColor: function(v) {
		return "#" + StringTools.hex(v,6);
	}
	,hasHole: function(i,x,y) {
		var _g = -1;
		while(_g < 2) {
			var dx = _g++;
			var _g1 = -1;
			while(_g1 < 2) {
				var dy = _g1++;
				var x1 = x + dx;
				var y1 = y + dy;
				if(x1 >= 0 && y1 >= 0 && x1 < i.width && y1 < i.height && i.getPixel(x1,y1) >>> 24 != 0) return false;
			}
		}
		return true;
	}
	,pick: function(filter) {
		if(this.curPos == null) return null;
		var i = this.layers.length - 1;
		while(i >= 0) {
			var l = this.layers[i--];
			if(!l.enabled() || filter != null && !filter(l)) continue;
			var x = this.curPos.xf;
			var y = this.curPos.yf;
			var ix = (x - this.curPos.x) * this.tileSize | 0;
			var iy = (y - this.curPos.y) * this.tileSize | 0;
			{
				var _g = l.data;
				switch(_g[1]) {
				case 0:
					var data = _g[2];
					var idx = this.curPos.x + this.curPos.y * this.width;
					var k = data[idx];
					if(k == 0 && i >= 0) continue;
					if(l.images != null) {
						var i1 = l.images[k];
						if(this.hasHole(i1,ix + (i1.width - this.tileSize >> 1),iy + (i1.height - this.tileSize))) continue;
					}
					return { k : k, layer : l, index : idx};
				case 1:
					var objs = [_g[3]];
					var idCol = _g[2];
					if(l.images == null) {
						var found = [];
						var _g2 = 0;
						var _g1 = objs[0].length;
						while(_g2 < _g1) {
							var i2 = _g2++;
							var o = objs[0][i2];
							var w;
							if(l.hasSize) w = o.width; else w = 1;
							var h;
							if(l.hasSize) h = o.height; else h = 1;
							if(x >= o.x && y >= o.y && x < o.x + w && y < o.y + h) {
								if(l.idToIndex == null) found.push({ k : 0, layer : l, index : i2}); else found.push({ k : (function($this) {
									var $r;
									var key = Reflect.field(o,idCol);
									$r = l.idToIndex.get(key);
									return $r;
								}(this)), layer : l, index : i2});
							}
						}
						if(l.hasSize) found.sort((function(objs) {
							return function(f1,f2) {
								var o1 = objs[0][f1.index];
								var o2 = objs[0][f2.index];
								return Reflect.compare(o2.width * o2.height,o1.width * o1.height);
							};
						})(objs));
						if(found.length > 0) return found.pop();
					} else {
						var max = objs[0].length - 1;
						var _g21 = 0;
						var _g11 = objs[0].length;
						while(_g21 < _g11) {
							var i3 = _g21++;
							var i4 = max - i3;
							var o3 = objs[0][i4];
							var k1;
							var key1 = Reflect.field(o3,idCol);
							k1 = l.idToIndex.get(key1);
							if(k1 == null) continue;
							var img = l.images[k1];
							var w1 = img.width / this.tileSize;
							var h1 = img.height / this.tileSize;
							var ox = o3.x - (w1 - 1) * 0.5;
							var oy = o3.y - (h1 - 1);
							if(x >= ox && y >= oy && x < ox + w1 && y < oy + h1 && !this.hasHole(img,(x - ox) * this.tileSize | 0,(y - oy) * this.tileSize | 0)) return { k : k1, layer : l, index : i4};
						}
					}
					break;
				case 2:
					var data1 = _g[3];
					var idx1 = this.curPos.x + this.curPos.y * this.width;
					var k2 = data1[idx1] - 1;
					if(k2 < 0) continue;
					var i5 = l.images[k2];
					if(i5.getPixel(ix,iy) >>> 24 == 0) continue;
					return { k : k2, layer : l, index : idx1};
				case 3:
					var insts = _g[3];
					var objs1 = l.getTileObjects();
					var idx2 = insts.length;
					while(idx2 > 0) {
						var i6 = insts[--idx2];
						var o4 = objs1.h[i6.o];
						if(x >= i6.x && y >= i6.y && x < i6.x + (o4 == null?1:o4.w) && y < i6.y + (o4 == null?1:o4.h)) {
							var im = l.images[i6.o + (x - i6.x | 0) + (y - i6.y | 0) * l.stride];
							if(this.hasHole(im,ix,iy)) continue;
							return { k : i6.o, layer : l, index : idx2};
						}
					}
					break;
				}
			}
		}
		return null;
	}
	,action: function(name,val) {
		var _g = this;
		var l = this.currentLayer;
		switch(name) {
		case "close":
			(js_Boot.__cast(this.model , Main)).closeLevel(this);
			break;
		case "options":
			var opt = this.content.find(".submenu.options");
			var hide = opt["is"](":visible");
			this.content.find(".submenu").hide();
			if(hide) this.content.find(".submenu.layer").show(); else {
				opt.show();
				this.content.find("[name=tileSize]").val("" + this.tileSize);
			}
			break;
		case "layer":
			if(this.newLayer == null) return;
			var opt1 = this.content.find(".submenu.newlayer");
			var hide1 = opt1["is"](":visible");
			this.content.find(".submenu").hide();
			if(hide1) this.content.find(".submenu.layer").show(); else {
				opt1.show();
				this.content.find("[name=newName]").val("");
			}
			break;
		case "file":
			var m;
			m = js_Boot.__cast(this.model , Main);
			m.chooseFile(function(path) {
				{
					var _g1 = _g.currentLayer.data;
					switch(_g1[1]) {
					case 2:
						var t = _g1[2];
						if(t.file == null) {
							var size = _g.props.tileSize;
							t.stride = t.size * t.stride / size | 0;
							t.size = size;
						}
						t.file = path;
						_g.currentLayer.dirty = true;
						_g.save();
						_g.reload();
						break;
					case 3:
						var t1 = _g1[2];
						if(t1.file == null) {
							var size1 = _g.props.tileSize;
							t1.stride = t1.size * t1.stride / size1 | 0;
							t1.size = size1;
						}
						t1.file = path;
						_g.currentLayer.dirty = true;
						_g.save();
						_g.reload();
						break;
					default:
					}
				}
			});
			break;
		case "lock":
			l.lock = val;
			l.comp.toggleClass("locked",l.lock);
			l.saveState();
			break;
		case "lockGrid":
			l.floatCoord = l.hasFloatCoord && !val;
			l.saveState();
			break;
		case "visible":
			l.set_visible(val);
			l.saveState();
			this.draw();
			break;
		case "alpha":
			l.props.alpha = val / 100;
			this.model.save(false);
			this.draw();
			break;
		case "size":
			{
				var _g2 = l.data;
				switch(_g2[1]) {
				case 2:
					var t2 = _g2[2];
					var size2 = val;
					t2.stride = t2.size * t2.stride / size2 | 0;
					t2.size = size2;
					l.dirty = true;
					this.save();
					this.reload();
					break;
				case 3:
					var t3 = _g2[2];
					var size3 = val;
					t3.stride = t3.size * t3.stride / size3 | 0;
					t3.size = size3;
					l.dirty = true;
					this.save();
					this.reload();
					break;
				default:
				}
			}
			break;
		case "mode":
			this.setLayerMode(val);
			break;
		}
		$(":focus").blur();
	}
	,addNewLayer: function(name) {
		var _g = this.newLayer.type;
		switch(_g[1]) {
		case 8:
			var s = SheetData.model.smap.get(this.sheet.name + "@" + this.newLayer.name).s;
			var o = { name : null, data : null};
			var _g1 = 0;
			var _g2 = s.columns;
			while(_g1 < _g2.length) {
				var c = _g2[_g1];
				++_g1;
				var v = this.model.getDefault(c);
				if(v != null) o[c.name] = v;
			}
			var a = Reflect.field(this.obj,this.newLayer.name);
			o.name = name;
			a.push(o);
			var n = a.length - 2;
			while(n >= 0) {
				var o2 = a[n--];
				if(o2.data != null) {
					var a1 = cdb__$Types_TileLayerData_$Impl_$.encode((function($this) {
						var $r;
						var _g11 = [];
						{
							var _g3 = 0;
							var _g21 = $this.width * $this.height;
							while(_g3 < _g21) {
								var k = _g3++;
								_g11.push(0);
							}
						}
						$r = _g11;
						return $r;
					}(this)),this.model.compressionEnabled());
					o.data = { file : o2.data.file, size : o2.data.size, stride : o2.data.stride, data : a1};
					break;
				}
			}
			this.props.layers.push({ l : name, p : { alpha : 1.}});
			this.currentLayer = { name : name};
			this.savePrefs();
			this.save();
			this.reload();
			break;
		default:
		}
	}
	,popupLayer: function(l,mouseX,mouseY) {
		var _g = this;
		this.setLayer(l);
		var n = new js_node_webkit_Menu();
		var nclear = new js_node_webkit_MenuItem({ label : "Clear"});
		var ndel = new js_node_webkit_MenuItem({ label : "Delete"});
		var nshow = new js_node_webkit_MenuItem({ label : "Show Only"});
		var nshowAll = new js_node_webkit_MenuItem({ label : "Show All"});
		var nrename = new js_node_webkit_MenuItem({ label : "Rename"});
		var _g1 = 0;
		var _g11 = [nshow,nshowAll,nrename,nclear,ndel];
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			n.append(m);
		}
		nclear.click = function() {
			{
				var _g2 = l.data;
				switch(_g2[1]) {
				case 2:
					var data = _g2[3];
					var _g21 = 0;
					var _g12 = data.length;
					while(_g21 < _g12) {
						var i = _g21++;
						data[i] = 0;
					}
					break;
				case 1:
					var objs = _g2[3];
					while(objs.length > 0) objs.pop();
					break;
				case 0:
					var data1 = _g2[2];
					var _g22 = 0;
					var _g13 = data1.length;
					while(_g22 < _g13) {
						var i1 = _g22++;
						data1[i1] = 0;
					}
					break;
				case 3:
					var insts = _g2[3];
					while(insts.length > 0) insts.pop();
					break;
				}
			}
			l.dirty = true;
			_g.save();
			_g.draw();
		};
		ndel.enabled = l.listColumnn != null;
		ndel.click = function() {
			var layers = Reflect.field(_g.obj,l.listColumnn.name);
			var x = l.targetObj.o;
			HxOverrides.remove(layers,x);
			_g.save();
			_g.reload();
		};
		nshow.click = function() {
			var _g14 = 0;
			var _g23 = _g.layers;
			while(_g14 < _g23.length) {
				var l2 = _g23[_g14];
				++_g14;
				l2.set_visible(l == l2);
				l2.saveState();
			}
			_g.draw();
		};
		nshowAll.click = function() {
			var _g15 = 0;
			var _g24 = _g.layers;
			while(_g15 < _g24.length) {
				var l21 = _g24[_g15];
				++_g15;
				l21.set_visible(true);
				l21.saveState();
			}
			_g.draw();
		};
		nrename.click = function() {
			l.comp.find("span").remove();
			l.comp.prepend($("<input type='text'>").val(l.name).focus().blur(function(_) {
				var n1 = StringTools.trim($(this).val());
				var _g16 = 0;
				var _g25 = _g.props.layers;
				while(_g16 < _g25.length) {
					var p = _g25[_g16];
					++_g16;
					if(p.l == n1) {
						_g.reload();
						return;
					}
				}
				var _g17 = 0;
				var _g26 = _g.props.layers;
				while(_g17 < _g26.length) {
					var p1 = _g26[_g17];
					++_g17;
					if(p1.l == l.name) p1.l = n1;
				}
				var layers1 = Reflect.field(_g.obj,_g.newLayer.name);
				var _g18 = 0;
				while(_g18 < layers1.length) {
					var l22 = layers1[_g18];
					++_g18;
					if(l22.name == l.name) l22.name = n1;
				}
				l.name = n1;
				_g.currentLayer = null;
				_g.setLayer(l);
				_g.save();
				_g.reload();
			}).keypress(function(e) {
				if(e.keyCode == 13) $(this).blur();
			}));
		};
		nrename.enabled = ndel.enabled;
		n.popup(mouseX,mouseY);
	}
	,onResize: function() {
		var win = js_node_webkit_Window.get();
		this.content.find(".scroll").css("height",win.height - 240 + "px");
	}
	,setSort: function(j,callb) {
		j.sortable({ vertical : false, onDrop : function(item,container,_super) {
			_super(item,container);
			callb.ref(null);
		}});
	}
	,spectrum: function(j,options,change,show) {
		options.change = function(c) {
			change.ref(Std.parseInt("0x" + c.toHex()));
		};
		if(show != null) options.show = function() {
			show.ref(null);
		};
		j.spectrum(options);
	}
	,setup: function() {
		var _g3 = this;
		var page = $("#content");
		page.html("");
		this.content = $($("#levelContent").html()).appendTo(page);
		var mlayers = this.content.find(".layers");
		var _g14 = 0;
		var _g4 = this.layers.length;
		while(_g14 < _g4) {
			var index = _g14++;
			var l2 = [this.layers[index]];
			var td = $("<li class='item layer'>").appendTo(mlayers);
			l2[0].comp = td;
			td.data("index",index);
			if(!l2[0].visible) td.addClass("hidden");
			if(l2[0].lock) td.addClass("locked");
			td.mousedown((function(l2) {
				return function(e) {
					var _g24 = e.which;
					switch(_g24) {
					case 1:
						_g3.palette.mode = null;
						_g3.setLayer(l2[0]);
						break;
					case 3:
						_g3.popupLayer(l2[0],e.pageX | 0,e.pageY | 0);
						e.preventDefault();
						break;
					}
				};
			})(l2));
			$("<span>").text(l2[0].name).appendTo(td);
			if(l2[0].images != null) {
				td.find("span").css("margin-top","10px");
				continue;
			}
			var id = Level.UID++;
			var t = $("<input type=\"text\" id=\"_" + Level.UID++ + "\">").appendTo(td);
			this.spectrum(t,{ color : this.toColor(l2[0].colors[l2[0].current]), clickoutFiresChange : true, showButtons : false, showPaletteOnly : true, showPalette : true, palette : (function($this) {
				var $r;
				var _g25 = [];
				{
					var _g31 = 0;
					var _g41 = l2[0].colors;
					while(_g31 < _g41.length) {
						var c = _g41[_g31];
						++_g31;
						_g25.push($this.toColor(c));
					}
				}
				$r = _g25;
				return $r;
			}(this))},this.allocRef((function(l2) {
				return function(color) {
					var _g42 = 0;
					var _g32 = l2[0].colors.length;
					while(_g42 < _g32) {
						var i3 = _g42++;
						if(l2[0].colors[i3] == color) {
							l2[0].set_current(i3);
							_g3.setLayer(l2[0]);
							return;
						}
					}
					_g3.setLayer(l2[0]);
				};
			})(l2)),this.allocRef((function(l2) {
				return function(_2) {
					_g3.setLayer(l2[0]);
				};
			})(l2)));
		}
		var callb = this.allocRef(function(_) {
			var indexes = [];
			var _this = mlayers.find("li");
			var _g_i = 0;
			var _g_j = _this;
			while(_g_i < _g_j.length) {
				var i = $(_g_j[_g_i++]);
				indexes.push(i.data("index"));
			}
			var _g = [];
			var _g2 = 0;
			var _g1 = _g3.layers.length;
			while(_g2 < _g1) {
				var i1 = _g2++;
				_g.push(_g3.layers[indexes[i1]]);
			}
			_g3.layers = _g;
			var _g21 = 0;
			var _g11 = _g3.layers.length;
			while(_g21 < _g11) {
				var i2 = _g21++;
				_g3.layers[i2].comp.data("index",i2);
			}
			var groups = new haxe_ds_StringMap();
			var _g12 = 0;
			var _g22 = _g3.layers;
			while(_g12 < _g22.length) {
				var l = _g22[_g12];
				++_g12;
				if(l.listColumnn == null) continue;
				var g = groups.get(l.listColumnn.name);
				if(g == null) {
					g = [];
					groups.set(l.listColumnn.name,g);
				}
				g.push(l);
			}
			var $it0 = groups.keys();
			while( $it0.hasNext() ) {
				var g1 = $it0.next();
				var layers;
				layers = __map_reserved[g1] != null?groups.getReserved(g1):groups.h[g1];
				var objs;
				var _g13 = [];
				var _g23 = 0;
				while(_g23 < layers.length) {
					var l1 = layers[_g23];
					++_g23;
					_g13.push(l1.targetObj.o);
				}
				objs = _g13;
				_g3.obj[g1] = objs;
			}
			_g3.save();
			_g3.draw();
		});
		this.setSort(mlayers,callb);
		this.content.find("[name=newlayer]").css({ display : this.newLayer != null?"block":"none"});
		var scroll = this.content.find(".scroll");
		var scont = this.content.find(".scrollContent");
		this.view = lvl_Image3D.getInstance();
		scont.append(this.view.viewport);
		scroll.scroll(function(_3) {
			_g3.savePrefs();
			_g3.view.setScrollPos(scroll.scrollLeft() - 20,scroll.scrollTop() - 20);
		});
		scroll[0].onmousewheel = function(e1) {
			if(e1.shiftKey) _g3.updateZoom(e1.wheelDelta > 0);
		};
		this.spectrum(this.content.find("[name=color]"),{ clickoutFiresChange : true, showButtons : false},this.allocRef(function(c1) {
			_g3.currentLayer.props.color = c1;
			_g3.save();
			_g3.draw();
		}));
		this.onResize();
		this.cursor = this.content.find("#cursor");
		this.cursorImage = new lvl_Image(0,0);
		this.cursorImage.set_smooth(false);
		this.tmpImage = new lvl_Image(0,0);
		this.cursor[0].appendChild(this.cursorImage.getCanvas());
		this.cursor.hide();
		scont.mouseleave(function(_4) {
			_g3.curPos = null;
			if(_g3.selection == null) _g3.cursor.hide();
			$(".cursorPosition").text("");
		});
		scont.mousemove(function(e2) {
			_g3.mousePos.x = e2.pageX | 0;
			_g3.mousePos.y = e2.pageY | 0;
			_g3.updateCursorPos();
		});
		var onMouseUp = function(_1) {
			_g3.mouseDown = null;
			if(_g3.currentLayer.hasSize) _g3.setCursor();
			if(_g3.needSave) _g3.save();
		};
		scroll.mousedown(function(e3) {
			if(_g3.palette.mode != null) {
				_g3.palette.mode = null;
				_g3.setCursor();
				return;
			}
			var _g5 = e3.which;
			switch(_g5) {
			case 1:
				var l3 = _g3.currentLayer;
				if(l3 == null) return;
				var o = l3.getSelObjects()[0];
				var w;
				if(o == null) w = _g3.currentLayer.currentWidth; else w = o.w;
				var h;
				if(o == null) h = _g3.currentLayer.currentHeight; else h = o.h;
				if(o == null && _g3.palette.randomMode) w = h = 1;
				_g3.mouseDown = { rx : _g3.curPos == null?0:_g3.curPos.x % w, ry : _g3.curPos == null?0:_g3.curPos.y % h, w : w, h : h};
				_g3.set_mouseCapture(scroll);
				if(_g3.curPos != null) {
					_g3.set(_g3.curPos.x,_g3.curPos.y,e3.ctrlKey);
					_g3.startPos = Reflect.copy(_g3.curPos);
				}
				break;
			case 3:
				if(_g3.selection != null) {
					_g3.clearSelection();
					_g3.draw();
					return;
				}
				var p = _g3.pick();
				if(p != null) {
					p.layer.set_current(p.k);
					{
						var _g15 = p.layer.data;
						switch(_g15[1]) {
						case 3:
							var insts = _g15[3];
							var i4 = insts[p.index];
							var obj;
							var this1 = p.layer.getTileObjects();
							obj = this1.get(i4.o);
							if(obj != null) {
								p.layer.currentWidth = obj.w;
								p.layer.currentHeight = obj.h;
								p.layer.saveState();
							}
							_g3.flipMode = i4.flip;
							_g3.rotation = i4.rot;
							break;
						default:
						}
					}
					_g3.setLayer(p.layer);
				}
				break;
			}
		});
		this.content.mouseup(function(e4) {
			_g3.set_mouseCapture(null);
			onMouseUp(e4);
			if(_g3.curPos == null) {
				_g3.startPos = null;
				return;
			}
			if(e4.which == 1 && _g3.selection == null && _g3.currentLayer.enabled() && _g3.curPos.x >= 0 && _g3.curPos.y >= 0) _g3.setObject();
			_g3.startPos = null;
			if(_g3.selection != null) {
				_g3.moveSelection();
				_g3.save();
				_g3.draw();
			}
		});
	}
	,setObject: function() {
		{
			var _g = this.currentLayer.data;
			switch(_g[1]) {
			case 1:
				var objs = _g[3];
				var idCol = _g[2];
				var l = this.currentLayer;
				var fc = l.floatCoord;
				var px;
				if(fc) px = this.curPos.xf; else px = this.curPos.x;
				var py;
				if(fc) py = this.curPos.yf; else py = this.curPos.y;
				var w = 0.;
				var h = 0.;
				if(l.hasSize) {
					if(this.startPos == null) return;
					var sx;
					if(fc) sx = this.startPos.xf; else sx = this.startPos.x;
					var sy;
					if(fc) sy = this.startPos.yf; else sy = this.startPos.y;
					w = px - sx;
					h = py - sy;
					px = sx;
					py = sy;
					if(w < 0) {
						px += w;
						w = -w;
					}
					if(h < 0) {
						py += h;
						h = -h;
					}
					if(!fc) {
						w += 1;
						h += 1;
					}
					if(w < 0.5) if(fc) w = 0.5; else w = 1;
					if(h < 0.5) if(fc) h = 0.5; else h = 1;
				}
				var _g2 = 0;
				var _g1 = objs.length;
				while(_g2 < _g1) {
					var i = _g2++;
					var o1 = objs[i];
					if(o1.x == px && o1.y == py && w <= 1 && h <= 1) {
						this.editProps(l,i);
						this.setCursor();
						return;
					}
				}
				var o = { x : px, y : py};
				objs.push(o);
				if(idCol != null) o[idCol] = l.indexToId[this.currentLayer.current];
				var _g11 = 0;
				var _g21 = l.baseSheet.columns;
				while(_g11 < _g21.length) {
					var c = _g21[_g11];
					++_g11;
					if(c.opt || c.name == "x" || c.name == "y" || c.name == idCol) continue;
					var v = this.model.getDefault(c);
					if(v != null) o[c.name] = v;
				}
				if(l.hasSize) {
					o.width = w;
					o.height = h;
					this.setCursor();
				}
				objs.sort(function(o11,o2) {
					var r = Reflect.compare(o11.y,o2.y);
					if(r == 0) return Reflect.compare(o11.x,o2.x); else return r;
				});
				if(this.hasProps(l,true)) this.editProps(l,Lambda.indexOf(objs,o));
				this.save();
				this.draw();
				break;
			default:
			}
		}
	}
	,deleteSelection: function() {
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(!l.enabled()) continue;
			l.dirty = true;
			var sx = this.selection.x;
			var sy = this.selection.y;
			var sw = this.selection.w;
			var sh = this.selection.h;
			{
				var _g2 = l.data;
				switch(_g2[1]) {
				case 0:
					var data = _g2[2];
					var sx1 = this.selection.x | 0;
					var sy1 = this.selection.y | 0;
					var sw1 = Math.ceil(this.selection.x + this.selection.w) - sx1;
					var sh1 = Math.ceil(this.selection.y + this.selection.h) - sy1;
					var _g3 = 0;
					while(_g3 < sw1) {
						var dx = _g3++;
						var _g4 = 0;
						while(_g4 < sh1) {
							var dy = _g4++;
							data[sx1 + dx + (sy1 + dy) * this.width] = 0;
						}
					}
					break;
				case 2:
					var data1 = _g2[3];
					var sx2 = this.selection.x | 0;
					var sy2 = this.selection.y | 0;
					var sw2 = Math.ceil(this.selection.x + this.selection.w) - sx2;
					var sh2 = Math.ceil(this.selection.y + this.selection.h) - sy2;
					var _g31 = 0;
					while(_g31 < sw2) {
						var dx1 = _g31++;
						var _g41 = 0;
						while(_g41 < sh2) {
							var dy1 = _g41++;
							data1[sx2 + dx1 + (sy2 + dy1) * this.width] = 0;
						}
					}
					break;
				case 3:
					var insts = _g2[3];
					var objs = l.getTileObjects();
					var _g32 = 0;
					var _g42 = insts.slice();
					while(_g32 < _g42.length) {
						var i = _g42[_g32];
						++_g32;
						var o = objs.h[i.o];
						var ow;
						if(o == null) ow = 1; else ow = o.w;
						var oh;
						if(o == null) oh = 1; else oh = o.h;
						if(sx + sw <= i.x || sy + sh <= i.y || sx >= i.x + ow || sy >= i.y + oh) continue;
						HxOverrides.remove(insts,i);
					}
					break;
				case 1:
					var objs1 = _g2[3];
					var _g33 = 0;
					var _g43 = objs1.slice();
					while(_g33 < _g43.length) {
						var o1 = _g43[_g33];
						++_g33;
						var ow1;
						if(l.hasSize) ow1 = o1.width; else ow1 = 1;
						var oh1;
						if(l.hasSize) oh1 = o1.height; else oh1 = 1;
						if(sx + sw <= o1.x || sy + sh <= o1.y || sx >= o1.x + ow1 || sy >= o1.y + oh1) continue;
						HxOverrides.remove(objs1,o1);
					}
					break;
				}
			}
		}
	}
	,moveSelection: function() {
		var dx = this.selection.x - this.selection.sx;
		var dy = this.selection.y - this.selection.sy;
		if(dx == 0 && dy == 0) return;
		var ix = dx | 0;
		var iy = dy | 0;
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(!l.enabled()) continue;
			var sx = this.selection.x;
			var sy = this.selection.y;
			var sw = this.selection.w;
			var sh = this.selection.h;
			l.dirty = true;
			{
				var _g2 = l.data;
				switch(_g2[1]) {
				case 2:
					var data = _g2[3];
					var sx1 = this.selection.x | 0;
					var sy1 = this.selection.y | 0;
					var sw1 = Math.ceil(this.selection.x + this.selection.w) - sx1;
					var sh1 = Math.ceil(this.selection.y + this.selection.h) - sy1;
					var ndata = [];
					var _g4 = 0;
					var _g3 = this.height;
					while(_g4 < _g3) {
						var y = _g4++;
						var _g6 = 0;
						var _g5 = this.width;
						while(_g6 < _g5) {
							var x = _g6++;
							var k;
							if(x >= sx1 && x < sx1 + sw1 && y >= sy1 && y < sy1 + sh1) {
								var tx = x - ix;
								var ty = y - iy;
								if(tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) k = data[tx + ty * this.width]; else k = 0;
								if(k == 0 && !(x >= sx1 - ix && x < sx1 + sw1 - ix && y >= sy1 - iy && y < sy1 + sh1 - iy)) k = data[x + y * this.width];
							} else if(x >= sx1 - ix && x < sx1 + sw1 - ix && y >= sy1 - iy && y < sy1 + sh1 - iy) k = 0; else k = data[x + y * this.width];
							ndata.push(k);
						}
					}
					var _g41 = 0;
					var _g31 = data.length;
					while(_g41 < _g31) {
						var i = _g41++;
						data[i] = ndata[i];
					}
					break;
				case 0:
					var data1 = _g2[2];
					var sx2 = this.selection.x | 0;
					var sy2 = this.selection.y | 0;
					var sw2 = Math.ceil(this.selection.x + this.selection.w) - sx2;
					var sh2 = Math.ceil(this.selection.y + this.selection.h) - sy2;
					var ndata1 = [];
					var _g42 = 0;
					var _g32 = this.height;
					while(_g42 < _g32) {
						var y1 = _g42++;
						var _g61 = 0;
						var _g51 = this.width;
						while(_g61 < _g51) {
							var x1 = _g61++;
							var k1;
							if(x1 >= sx2 && x1 < sx2 + sw2 && y1 >= sy2 && y1 < sy2 + sh2) {
								var tx1 = x1 - ix;
								var ty1 = y1 - iy;
								if(tx1 >= 0 && tx1 < this.width && ty1 >= 0 && ty1 < this.height) k1 = data1[tx1 + ty1 * this.width]; else k1 = 0;
								if(k1 == 0 && !(x1 >= sx2 - ix && x1 < sx2 + sw2 - ix && y1 >= sy2 - iy && y1 < sy2 + sh2 - iy)) k1 = data1[x1 + y1 * this.width];
							} else if(x1 >= sx2 - ix && x1 < sx2 + sw2 - ix && y1 >= sy2 - iy && y1 < sy2 + sh2 - iy) k1 = 0; else k1 = data1[x1 + y1 * this.width];
							ndata1.push(k1);
						}
					}
					var _g43 = 0;
					var _g33 = data1.length;
					while(_g43 < _g33) {
						var i1 = _g43++;
						data1[i1] = ndata1[i1];
					}
					break;
				case 3:
					var insts = _g2[3];
					sx -= dx;
					sy -= dy;
					var objs = l.getTileObjects();
					var _g34 = 0;
					var _g44 = insts.slice();
					while(_g34 < _g44.length) {
						var i2 = _g44[_g34];
						++_g34;
						var o = objs.h[i2.o];
						var ow;
						if(o == null) ow = 1; else ow = o.w;
						var oh;
						if(o == null) oh = 1; else oh = o.h;
						if(sx + sw <= i2.x || sy + sh <= i2.y || sx >= i2.x + ow || sy >= i2.y + oh) continue;
						if(l.hasFloatCoord) i2.x += dx; else i2.x += ix;
						if(l.hasFloatCoord) i2.y += dy; else i2.y += iy;
						if(i2.x < 0 || i2.y < 0 || i2.x >= this.width || i2.y >= this.height) HxOverrides.remove(insts,i2);
					}
					break;
				case 1:
					var objs1 = _g2[3];
					sx -= dx;
					sy -= dy;
					var _g35 = 0;
					var _g45 = objs1.slice();
					while(_g35 < _g45.length) {
						var o1 = _g45[_g35];
						++_g35;
						var ow1;
						if(l.hasSize) ow1 = o1.width; else ow1 = 1;
						var oh1;
						if(l.hasSize) oh1 = o1.height; else oh1 = 1;
						if(sx + sw <= o1.x || sy + sh <= o1.y || sx >= o1.x + ow1 || sy >= o1.y + oh1) continue;
						if(l.hasFloatCoord) o1.x += dx; else o1.x += ix;
						if(l.hasFloatCoord) o1.y += dy; else o1.y += iy;
						if(o1.x < 0 || o1.y < 0 || o1.x >= this.width || o1.y >= this.height) HxOverrides.remove(objs1,o1);
					}
					break;
				}
			}
		}
		this.save();
		this.draw();
	}
	,updateCursorPos: function() {
		if(this.currentLayer == null) return;
		var off = $(this.view.getCanvas()).parent().offset();
		var cxf = ((this.mousePos.x - off.left) / this.zoomView | 0) / this.tileSize;
		var cyf = ((this.mousePos.y - off.top) / this.zoomView | 0) / this.tileSize;
		var cx = cxf | 0;
		var cy = cyf | 0;
		if(cx < this.width && cy < this.height) {
			this.cursor.show();
			var fc = this.currentLayer.floatCoord;
			var border = 0;
			var ccx;
			if(fc) ccx = cxf; else ccx = cx;
			var ccy;
			if(fc) ccy = cyf; else ccy = cy;
			if(ccx < 0) ccx = 0;
			if(ccy < 0) ccy = 0;
			if(fc) {
				if(ccx > this.width) ccx = this.width;
				if(ccy > this.height) ccy = this.height;
			} else {
				if(ccx >= this.width) ccx = this.width - 1;
				if(ccy >= this.height) ccy = this.height - 1;
			}
			if(this.currentLayer.hasSize && this.mouseDown != null) {
				var px;
				if(fc) px = this.startPos.xf; else px = this.startPos.x;
				var py;
				if(fc) py = this.startPos.yf; else py = this.startPos.y;
				var pw;
				pw = (fc?cxf:cx) - px;
				var ph;
				ph = (fc?cyf:cy) - py;
				if(pw < 0) {
					px += pw;
					pw = -pw;
				}
				if(ph < 0) {
					py += ph;
					ph = -ph;
				}
				if(!fc) {
					pw += 1;
					ph += 1;
				}
				if(pw < 0.5) if(fc) pw = 0.5; else pw = 1;
				if(ph < 0.5) if(fc) ph = 0.5; else ph = 1;
				ccx = px;
				ccy = py;
				this.cursorImage.setSize(pw * this.tileSize * this.zoomView | 0,ph * this.tileSize * this.zoomView | 0);
			}
			if(this.currentLayer.images == null) border = 1;
			this.cursor.css({ marginLeft : (ccx * this.tileSize * this.zoomView - border | 0) + "px", marginTop : (ccy * this.tileSize * this.zoomView - border | 0) + "px"});
			this.curPos = { x : cx, y : cy, xf : cxf, yf : cyf};
			this.content.find(".cursorPosition").text(cx + "," + cy);
			if(this.mouseDown != null) this.set((cx / this.mouseDown.w | 0) * this.mouseDown.w + this.mouseDown.rx,(cy / this.mouseDown.h | 0) * this.mouseDown.h + this.mouseDown.ry,false);
			if(this.deleteMode != null) this.doDelete();
		} else {
			this.cursor.hide();
			this.curPos = null;
			this.content.find(".cursorPosition").text("");
		}
		if(this.selection != null) {
			var fc1 = this.currentLayer.floatCoord;
			var ccx1;
			if(fc1) ccx1 = cxf; else ccx1 = cx;
			var ccy1;
			if(fc1) ccy1 = cyf; else ccy1 = cy;
			if(ccx1 < 0) ccx1 = 0;
			if(ccy1 < 0) ccy1 = 0;
			if(fc1) {
				if(ccx1 > this.width) ccx1 = this.width;
				if(ccy1 > this.height) ccy1 = this.height;
			} else {
				if(ccx1 >= this.width) ccx1 = this.width - 1;
				if(ccy1 >= this.height) ccy1 = this.height - 1;
			}
			if(!this.selection.down) {
				if(this.startPos != null) {
					this.selection.x = this.selection.sx + (ccx1 - this.startPos.x);
					this.selection.y = this.selection.sy + (ccy1 - this.startPos.y);
				} else {
					this.selection.sx = this.selection.x;
					this.selection.sy = this.selection.y;
				}
				this.setCursor();
				return;
			}
			var x0;
			if(ccx1 < this.selection.sx) x0 = ccx1; else x0 = this.selection.sx;
			var y0;
			if(ccy1 < this.selection.sy) y0 = ccy1; else y0 = this.selection.sy;
			var x1;
			if(ccx1 < this.selection.sx) x1 = this.selection.sx; else x1 = ccx1;
			var y1;
			if(ccy1 < this.selection.sy) y1 = this.selection.sy; else y1 = ccy1;
			this.selection.x = x0;
			this.selection.y = y0;
			this.selection.w = x1 - x0;
			this.selection.h = y1 - y0;
			if(!fc1) {
				this.selection.w += 1;
				this.selection.h += 1;
			}
			this.setCursor();
		}
	}
	,hasProps: function(l,required) {
		if(required == null) required = false;
		var idCol;
		{
			var _g = l.data;
			switch(_g[1]) {
			case 1:
				var idCol1 = _g[2];
				idCol = idCol1;
				break;
			default:
				idCol = null;
			}
		}
		var _g1 = 0;
		var _g11 = l.baseSheet.columns;
		while(_g1 < _g11.length) {
			var c = _g11[_g1];
			++_g1;
			if(c.name != "x" && c.name != "y" && c.name != idCol && (!required || !c.opt && this.model.getDefault(c) == null)) return true;
		}
		return false;
	}
	,editProps: function(l,index) {
		var _g = this;
		if(!this.hasProps(l)) return;
		var o = Reflect.field(this.obj,l.name)[index];
		var scroll = this.content.find(".scrollContent");
		var popup = $("<div>").addClass("popup").prependTo(scroll);
		$(window).bind("mousedown",function(_) {
			popup.remove();
			$(window).unbind("mousedown");
			if(_g.view != null) _g.draw();
		});
		popup.mousedown(function(e) {
			e.stopPropagation();
		});
		popup.mouseup(function(e1) {
			e1.stopPropagation();
		});
		popup.click(function(e2) {
			e2.stopPropagation();
		});
		var table = $("<table>").appendTo(popup);
		var main = Std.instance(this.model,Main);
		var _g1 = 0;
		var _g11 = l.baseSheet.columns;
		while(_g1 < _g11.length) {
			var c = [_g11[_g1]];
			++_g1;
			var tr = $("<tr>").appendTo(table);
			var th = $("<th>").text(c[0].name).appendTo(tr);
			var td = [$("<td>").html(main.valueHtml(c[0],Reflect.field(o,c[0].name),l.baseSheet,o)).appendTo(tr)];
			td[0].click((function(td,c) {
				return function(e3) {
					var psheet = { columns : l.baseSheet.columns, props : l.baseSheet.props, name : l.baseSheet.name, path : SheetData.getPath(l.baseSheet) + ":" + index, parent : { sheet : _g.sheet, column : Lambda.indexOf(_g.sheet.columns,Lambda.find(_g.sheet.columns,(function() {
						return function(c1) {
							return c1.name == l.name;
						};
					})())), line : index}, lines : Reflect.field(_g.obj,l.name), separators : []};
					main.editCell(c[0],td[0],psheet,index);
					e3.preventDefault();
					e3.stopPropagation();
				};
			})(td,c));
		}
		var x = (o.x + 1) * this.tileSize * this.zoomView;
		var y = (o.y + 1) * this.tileSize * this.zoomView;
		var cw = this.width * this.tileSize * this.zoomView;
		var ch = this.height * this.tileSize * this.zoomView;
		if(x > cw - popup.width() - 30) x = cw - popup.width() - 30;
		if(y > ch - popup.height() - 30) y = ch - popup.height() - 30;
		var scroll1 = this.content.find(".scroll");
		if(x < scroll1.scrollLeft() + 20) x = scroll1.scrollLeft() + 20;
		if(y < scroll1.scrollTop() + 20) y = scroll1.scrollTop() + 20;
		if(x + popup.width() > scroll1.scrollLeft() + scroll1.width() - 20) x = scroll1.scrollLeft() + scroll1.width() - 20 - popup.width();
		if(y + popup.height() > scroll1.scrollTop() + scroll1.height() - 20) y = scroll1.scrollTop() + scroll1.height() - 20 - popup.height();
		popup.css({ marginLeft : (x | 0) + "px", marginTop : (y | 0) + "px"});
	}
	,updateZoom: function(f) {
		var tx = 0;
		var ty = 0;
		var sc = this.content.find(".scroll");
		if(f != null) {
			$(".popup").remove();
			var width = sc.width();
			var height = sc.height();
			var cx = (sc.scrollLeft() + width * 0.5) / this.zoomView;
			var cy = (sc.scrollTop() + height * 0.5) / this.zoomView;
			if(f) this.zoomView *= 1.2; else this.zoomView /= 1.2;
			tx = Math.round(cx * this.zoomView - width * 0.5);
			ty = Math.round(cy * this.zoomView - height * 0.5);
		}
		this.savePrefs();
		this.view.setSize(this.width * this.tileSize * this.zoomView | 0,this.height * this.tileSize * this.zoomView | 0);
		this.view.set_zoom(this.zoomView);
		this.draw();
		this.updateCursorPos();
		this.setCursor();
		if(f != null) {
			sc.scrollLeft(tx);
			sc.scrollTop(ty);
		}
	}
	,paint: function(x,y) {
		var l = this.currentLayer;
		if(!l.enabled()) return;
		{
			var _g = l.data;
			switch(_g[1]) {
			case 0:
				var data = _g[2];
				var k = data[x + y * this.width];
				if(k == l.current || l.blanks[l.current]) return;
				var todo = [x,y];
				while(todo.length > 0) {
					var y1 = todo.pop();
					var x1 = todo.pop();
					if(data[x1 + y1 * this.width] != k) continue;
					data[x1 + y1 * this.width] = l.current;
					l.dirty = true;
					if(x1 > 0) {
						todo.push(x1 - 1);
						todo.push(y1);
					}
					if(y1 > 0) {
						todo.push(x1);
						todo.push(y1 - 1);
					}
					if(x1 < this.width - 1) {
						todo.push(x1 + 1);
						todo.push(y1);
					}
					if(y1 < this.height - 1) {
						todo.push(x1);
						todo.push(y1 + 1);
					}
				}
				this.save();
				this.draw();
				break;
			case 2:
				var data1 = _g[3];
				var k1 = data1[x + y * this.width];
				if(k1 == l.current + 1 || l.blanks[l.current]) return;
				var px = x;
				var py = y;
				var zero = [];
				var todo1 = [x,y];
				while(todo1.length > 0) {
					var y2 = todo1.pop();
					var x2 = todo1.pop();
					if(data1[x2 + y2 * this.width] != k1) continue;
					var dx = (x2 - px) % l.currentWidth;
					if(dx < 0) dx += l.currentWidth;
					var dy = (y2 - py) % l.currentHeight;
					if(dy < 0) dy += l.currentHeight;
					var t;
					t = l.current + (this.palette.randomMode?Std.random(l.currentWidth) + Std.random(l.currentHeight) * l.stride:dx + dy * l.stride);
					if(l.blanks[t]) zero.push(x2 + y2 * this.width);
					data1[x2 + y2 * this.width] = t + 1;
					l.dirty = true;
					if(x2 > 0) {
						todo1.push(x2 - 1);
						todo1.push(y2);
					}
					if(y2 > 0) {
						todo1.push(x2);
						todo1.push(y2 - 1);
					}
					if(x2 < this.width - 1) {
						todo1.push(x2 + 1);
						todo1.push(y2);
					}
					if(y2 < this.height - 1) {
						todo1.push(x2);
						todo1.push(y2 + 1);
					}
				}
				var _g1 = 0;
				while(_g1 < zero.length) {
					var z = zero[_g1];
					++_g1;
					data1[z] = 0;
				}
				this.save();
				this.draw();
				break;
			default:
			}
		}
	}
	,onKey: function(e) {
		var _g1 = this;
		var l = this.currentLayer;
		if(e.ctrlKey) {
			var _g = e.keyCode;
			switch(_g) {
			case 115:
				this.action("close");
				break;
			case 46:
				var p = this.pick();
				if(p != null) this.deleteAll(p.layer,p.k,p.index);
				break;
			}
			return;
		}
		if($("input[type=text]:focus").length > 0 || this.currentLayer == null) return;
		$(".popup").remove();
		var l1 = this.currentLayer;
		var _g2 = e.keyCode;
		switch(_g2) {
		case 107:
			this.updateZoom(true);
			break;
		case 109:
			this.updateZoom(false);
			break;
		case 111:
			this.zoomView = 1;
			this.updateZoom();
			break;
		case 27:
			this.clearSelection();
			this.draw();
			break;
		case 9:
			var i;
			i = (HxOverrides.indexOf(this.layers,l1,0) + (e.shiftKey?this.layers.length - 1:1)) % this.layers.length;
			this.setLayer(this.layers[i]);
			e.preventDefault();
			e.stopPropagation();
			break;
		case 32:
			e.preventDefault();
			if(this.spaceDown) return;
			this.spaceDown = true;
			var canvas = $(this.view.getCanvas());
			canvas.css({ cursor : "move"});
			this.cursor.hide();
			var s = canvas.closest(".scroll");
			var curX = null;
			var curY = null;
			canvas.on("mousemove",null,function(e1) {
				var tx = e1.pageX;
				var ty = e1.pageY;
				if(curX == null) {
					curX = tx;
					curY = ty;
				}
				var dx = tx - curX;
				var dy = ty - curY;
				s.scrollLeft(s.scrollLeft() - dx);
				s.scrollTop(s.scrollTop() - dy);
				curX += dx;
				curY += dy;
				_g1.mousePos.x = e1.pageX;
				_g1.mousePos.y = e1.pageY;
				e1.stopPropagation();
			});
			break;
		case 86:
			this.action("visible",!l1.visible);
			this.content.find("[name=visible]").prop("checked",l1.visible);
			break;
		case 76:
			this.action("lock",!l1.lock);
			this.content.find("[name=lock]").prop("checked",l1.lock);
			break;
		case 71:
			if(l1.hasFloatCoord) {
				this.action("lockGrid",l1.floatCoord);
				this.content.find("[name=lockGrid]").prop("checked",!l1.floatCoord);
			}
			break;
		case 70:
			if(this.currentLayer.hasRotFlip) {
				this.flipMode = !this.flipMode;
				this.savePrefs();
			}
			this.setCursor();
			break;
		case 73:
			this.paletteOption("small");
			break;
		case 68:
			if(this.currentLayer.hasRotFlip) {
				this.rotation++;
				this.rotation %= 4;
				this.savePrefs();
			}
			this.setCursor();
			break;
		case 79:
			if(this.palette != null && l1.tileProps != null) {
				var mode = "object";
				var found = false;
				var _g11 = 0;
				var _g21 = l1.tileProps.sets;
				while(_g11 < _g21.length) {
					var t = _g21[_g11];
					++_g11;
					if(t.x + t.y * l1.stride == l1.current && t.t == mode) {
						found = true;
						HxOverrides.remove(l1.tileProps.sets,t);
						break;
					}
				}
				if(!found) {
					l1.tileProps.sets.push({ x : l1.current % l1.stride, y : l1.current / l1.stride | 0, w : l1.currentWidth, h : l1.currentHeight, t : mode, opts : { }});
					var _g12 = 0;
					var _g22 = this.layers;
					while(_g12 < _g22.length) {
						var l2 = _g22[_g12];
						++_g12;
						if(l2.tileProps == l1.tileProps) {
							var _g3 = l2.data;
							switch(_g3[1]) {
							case 3:
								var insts = _g3[3];
								var found1 = [];
								var _g4 = 0;
								while(_g4 < insts.length) {
									var i1 = insts[_g4];
									++_g4;
									if(i1.o == l1.current) found1.push({ x : i1.x, y : i1.y, i : []}); else {
										var d = i1.o - l1.current;
										var dx1 = d % l1.stride;
										var dy1 = d / l1.stride | 0;
										var _g5 = 0;
										while(_g5 < found1.length) {
											var f = found1[_g5];
											++_g5;
											if(f.x == i1.x - dx1 && f.y == i1.y - dy1) f.i.push(i1);
										}
									}
								}
								var count = l1.currentWidth * l1.currentHeight - 1;
								var _g41 = 0;
								while(_g41 < found1.length) {
									var f1 = found1[_g41];
									++_g41;
									if(f1.i.length == count) {
										var _g51 = 0;
										var _g6 = f1.i;
										while(_g51 < _g6.length) {
											var i2 = _g6[_g51];
											++_g51;
											l2.dirty = true;
											HxOverrides.remove(insts,i2);
										}
									}
								}
								break;
							default:
							}
						}
					}
				}
				this.setCursor();
				this.save();
				this.draw();
			}
			break;
		case 82:
			this.paletteOption("random");
			break;
		case 37:
			e.preventDefault();
			var w = l1.currentWidth;
			var h = l1.currentHeight;
			if(l1.current % l1.stride > w - 1) {
				var _g13 = l1;
				_g13.set_current(_g13.current - w);
				if(w != 1 || h != 1) {
					l1.currentWidth = w;
					l1.currentHeight = h;
					l1.saveState();
				}
				this.setCursor();
			}
			break;
		case 39:
			e.preventDefault();
			var w1 = l1.currentWidth;
			var h1 = l1.currentHeight;
			if(l1.current % l1.stride < l1.stride - w1 && l1.images != null && l1.current + w1 < l1.images.length) {
				var _g14 = l1;
				_g14.set_current(_g14.current + w1);
				if(w1 != 1 || h1 != 1) {
					l1.currentWidth = w1;
					l1.currentHeight = h1;
					l1.saveState();
				}
				this.setCursor();
			}
			break;
		case 40:
			e.preventDefault();
			var w2 = l1.currentWidth;
			var h2 = l1.currentHeight;
			if(l1.images != null && l1.current + l1.stride * h2 < l1.images.length) {
				var _g15 = l1;
				_g15.set_current(_g15.current + l1.stride * h2);
				if(w2 != 1 || h2 != 1) {
					l1.currentWidth = w2;
					l1.currentHeight = h2;
					l1.saveState();
				}
				this.setCursor();
			}
			break;
		case 38:
			e.preventDefault();
			var w3 = l1.currentWidth;
			var h3 = l1.currentHeight;
			if(l1.current >= l1.stride * h3) {
				var _g16 = l1;
				_g16.set_current(_g16.current - l1.stride * h3);
				if(w3 != 1 || h3 != 1) {
					l1.currentWidth = w3;
					l1.currentHeight = h3;
					l1.saveState();
				}
				this.setCursor();
			}
			break;
		case 46:
			if(this.selection != null) {
				this.deleteSelection();
				this.clearSelection();
				this.save();
				this.draw();
				return;
			} else {
			}
			break;
		default:
		}
		if(this.curPos == null) return;
		var _g7 = e.keyCode;
		switch(_g7) {
		case 80:
			this.paint(this.curPos.x,this.curPos.y);
			break;
		case 46:
			if(this.deleteMode != null) return;
			this.deleteMode = { l : null};
			this.doDelete();
			break;
		case 69:
			var p1 = this.pick(function(l3) {
				return (function($this) {
					var $r;
					var _g17 = l3.data;
					$r = (function($this) {
						var $r;
						switch(_g17[1]) {
						case 1:
							$r = true;
							break;
						default:
							$r = false;
						}
						return $r;
					}($this));
					return $r;
				}(this)) && _g1.hasProps(l3);
			});
			if(p1 == null) return;
			{
				var _g18 = p1.layer.data;
				switch(_g18[1]) {
				case 1:
					var objs = _g18[3];
					$(".popup").remove();
					this.editProps(p1.layer,p1.index);
					break;
				default:
				}
			}
			break;
		case 83:
			if(this.selection != null) {
				if(this.selection.down) return;
				this.clearSelection();
			}
			var x;
			if(l1.floatCoord) x = this.curPos.xf; else x = this.curPos.x;
			var y;
			if(l1.floatCoord) y = this.curPos.yf; else y = this.curPos.y;
			this.selection = { sx : x, sy : y, x : x, y : y, w : 1, h : 1, down : true};
			this.cursor.addClass("select");
			this.setCursor();
			break;
		default:
		}
	}
	,clearSelection: function() {
		this.selection = null;
		this.cursor.removeClass("select");
		this.cursor.css({ width : "auto", height : "auto"});
		this.setCursor();
	}
	,deleteAll: function(l,k,index) {
		{
			var _g = l.data;
			switch(_g[1]) {
			case 0:
				var data = _g[2];
				var _g2 = 0;
				var _g1 = this.width * this.height;
				while(_g2 < _g1) {
					var i = _g2++;
					if(data[i] == k + 1) data[i] = 0;
				}
				break;
			case 2:
				var data1 = _g[3];
				var _g21 = 0;
				var _g11 = this.width * this.height;
				while(_g21 < _g11) {
					var i1 = _g21++;
					if(data1[i1] == k + 1) data1[i1] = 0;
				}
				break;
			case 1:
				var objs = _g[3];
				return;
			case 3:
				var insts = _g[3];
				var _g12 = 0;
				var _g22 = insts.slice();
				while(_g12 < _g22.length) {
					var i2 = _g22[_g12];
					++_g12;
					if(i2.o == k) HxOverrides.remove(insts,i2);
				}
				break;
			}
		}
		l.dirty = true;
		this.save();
		this.draw();
	}
	,doDelete: function() {
		var _g = this;
		var p = this.pick(this.deleteMode.l == null?null:function(l2) {
			return l2 == _g.deleteMode.l;
		});
		if(p == null) return;
		this.deleteMode.l = p.layer;
		{
			var _g1 = p.layer.data;
			switch(_g1[1]) {
			case 0:
				var data = _g1[2];
				if(data[p.index] == 0) return;
				data[p.index] = 0;
				p.layer.dirty = true;
				this.cursor.css({ opacity : 0}).fadeTo(100,1);
				this.save();
				this.draw();
				break;
			case 1:
				var objs = _g1[3];
				if(HxOverrides.remove(objs,objs[p.index])) {
					this.save();
					this.draw();
				}
				break;
			case 2:
				var data1 = _g1[3];
				var changed = false;
				var w = this.currentLayer.currentWidth;
				var h = this.currentLayer.currentHeight;
				if(this.palette.randomMode) w = h = 1;
				var _g11 = 0;
				while(_g11 < h) {
					var dy = _g11++;
					var _g2 = 0;
					while(_g2 < w) {
						var dx = _g2++;
						var i = p.index + dx + dy * this.width;
						if(data1[i] == 0) continue;
						data1[i] = 0;
						changed = true;
					}
				}
				if(changed) {
					p.layer.dirty = true;
					this.cursor.css({ opacity : 0}).fadeTo(100,1);
					this.save();
					this.draw();
				}
				break;
			case 3:
				var insts = _g1[3];
				if(HxOverrides.remove(insts,insts[p.index])) {
					p.layer.dirty = true;
					this.save();
					this.draw();
					return;
				}
				break;
			}
		}
	}
	,onKeyUp: function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 46:
			this.deleteMode = null;
			if(this.needSave) this.save();
			break;
		case 32:
			this.spaceDown = false;
			var canvas = $(this.view.getCanvas());
			canvas.unbind("mousemove");
			canvas.css({ cursor : ""});
			this.updateCursorPos();
			break;
		case 83:
			if(this.selection != null) {
				this.selection.down = false;
				this.selection.sx = this.selection.x;
				this.selection.sy = this.selection.y;
				this.setCursor();
			}
			break;
		default:
		}
	}
	,set: function(x,y,replace) {
		var _g1 = this;
		if(this.selection != null) return;
		if(this.palette.paintMode) {
			this.paint(x,y);
			return;
		}
		var l = this.currentLayer;
		if(!l.enabled()) return;
		{
			var _g = l.data;
			switch(_g[1]) {
			case 0:
				var data = _g[2];
				if(data[x + y * this.width] == l.current || l.blanks[l.current]) return;
				data[x + y * this.width] = l.current;
				l.dirty = true;
				this.save();
				this.draw();
				break;
			case 2:
				var data1 = _g[3];
				var changed = false;
				if(this.palette.randomMode) {
					var putObjs = l.getSelObjects();
					var putObj = putObjs[Std.random(putObjs.length)];
					if(putObj != null) {
						var id = putObj.x + putObj.y * l.stride + 1;
						var _g2 = 0;
						var _g11 = putObj.w;
						while(_g2 < _g11) {
							var dx = _g2++;
							var _g4 = 0;
							var _g3 = putObj.h;
							while(_g4 < _g3) {
								var dy = _g4++;
								var k = id + dx + dy * l.stride;
								var p = x + dx + (y + dy) * this.width;
								var old = data1[p];
								if(old == k || l.blanks[k - 1]) continue;
								if(replace && old > 0) {
									var _g6 = 0;
									var _g5 = this.width * this.height;
									while(_g6 < _g5) {
										var i = _g6++;
										if(data1[i] == old) data1[i] = k;
									}
								} else data1[p] = k;
								changed = true;
							}
						}
						changed = true;
					} else {
						var p1 = x + y * this.width;
						var old1 = data1[p1];
						if(replace && old1 > 0) {
							var _g21 = 0;
							var _g12 = this.width * this.height;
							while(_g21 < _g12) {
								var i1 = _g21++;
								if(data1[i1] == old1) {
									var id1 = l.current + Std.random(l.currentWidth) + Std.random(l.currentHeight) * l.stride + 1;
									if(old1 == id1 || l.blanks[id1 - 1]) continue;
									data1[i1] = id1;
								}
							}
						} else {
							var id2 = l.current + Std.random(l.currentWidth) + Std.random(l.currentHeight) * l.stride + 1;
							if(old1 == id2 || l.blanks[id2 - 1]) return;
							data1[p1] = id2;
						}
						changed = true;
					}
				} else {
					var _g22 = 0;
					var _g13 = l.currentHeight;
					while(_g22 < _g13) {
						var dy1 = _g22++;
						var _g41 = 0;
						var _g31 = l.currentWidth;
						while(_g41 < _g31) {
							var dx1 = _g41++;
							var p2 = x + dx1 + (y + dy1) * this.width;
							var id3 = l.current + dx1 + dy1 * l.stride + 1;
							var old2 = data1[p2];
							if(old2 == id3 || l.blanks[id3 - 1]) continue;
							if(replace && old2 > 0) {
								var _g61 = 0;
								var _g51 = this.width * this.height;
								while(_g61 < _g51) {
									var i2 = _g61++;
									if(data1[i2] == old2) data1[i2] = id3;
								}
							} else data1[p2] = id3;
							changed = true;
						}
					}
				}
				if(!changed) return;
				l.dirty = true;
				this.save();
				this.draw();
				break;
			case 3:
				var insts = _g[3];
				var objs = l.getTileObjects();
				var putObjs1 = l.getSelObjects();
				var putObj1 = putObjs1[Std.random(putObjs1.length)];
				var dx2;
				if(putObj1 == null) dx2 = 0.5; else dx2 = putObj1.w * 0.5;
				var dy2;
				if(putObj1 == null) dy2 = 0.5; else dy2 = putObj1.h - 0.5;
				var x1;
				if(l.floatCoord) x1 = this.curPos.xf; else x1 = this.curPos.x;
				var y1;
				if(l.floatCoord) y1 = this.curPos.yf; else y1 = this.curPos.y;
				if(putObj1 != null) {
					x1 += (putObjs1[0].w - putObj1.w) * 0.5;
					y1 += putObjs1[0].h - putObj1.h;
				}
				var _g14 = 0;
				while(_g14 < insts.length) {
					var i3 = insts[_g14];
					++_g14;
					var o = objs.h[i3.o];
					var ox;
					ox = i3.x + (o == null?0.5:o.w * 0.5);
					var oy;
					oy = i3.y + (o == null?0.5:o.h - 0.5);
					if(x1 + dx2 >= ox - 0.5 && y1 + dy2 >= oy - 0.5 && x1 + dx2 < ox + 0.5 && y1 + dy2 < oy + 0.5) {
						if(i3.o == l.current && i3.x == x1 && i3.y == y1 && i3.flip == this.flipMode && i3.rot == this.rotation) return;
						HxOverrides.remove(insts,i3);
					}
				}
				if(putObj1 != null) insts.push({ x : x1, y : y1, o : putObj1.x + putObj1.y * l.stride, rot : this.rotation, flip : this.flipMode}); else {
					var _g23 = 0;
					var _g15 = l.currentHeight;
					while(_g23 < _g15) {
						var dy3 = _g23++;
						var _g42 = 0;
						var _g32 = l.currentWidth;
						while(_g42 < _g32) {
							var dx3 = _g42++;
							insts.push({ x : x1 + dx3, y : y1 + dy3, o : l.current + dx3 + dy3 * l.stride, rot : this.rotation, flip : this.flipMode});
						}
					}
				}
				insts.sort(function(i11,i21) {
					var dy4;
					dy4 = (function($this) {
						var $r;
						var o1 = objs.h[i11.o];
						$r = (i11.y + (o1 == null?1:o1.h)) * _g1.tileSize | 0;
						return $r;
					}(this)) - (function($this) {
						var $r;
						var o2 = objs.h[i21.o];
						$r = (i21.y + (o2 == null?1:o2.h)) * _g1.tileSize | 0;
						return $r;
					}(this));
					if(dy4 == 0) return (function($this) {
						var $r;
						var o3 = objs.h[i11.o];
						$r = (i11.x + (o3 == null?0.5:o3.w * 0.5)) * _g1.tileSize | 0;
						return $r;
					}(this)) - (function($this) {
						var $r;
						var o4 = objs.h[i21.o];
						$r = (i21.x + (o4 == null?0.5:o4.w * 0.5)) * _g1.tileSize | 0;
						return $r;
					}(this)); else return dy4;
				});
				l.dirty = true;
				this.save();
				this.draw();
				break;
			case 1:
				break;
			}
		}
	}
	,draw: function() {
		this.view.fill(-7303024);
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var index = _g1++;
			var l = this.layers[index];
			if(!l.visible) continue;
			l.draw(this.view);
		}
		this.view.flush();
	}
	,save: function() {
		if(this.mouseDown != null || this.deleteMode != null) {
			this.needSave = true;
			return;
		}
		this.needSave = false;
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.save();
		}
		this.model.save();
	}
	,savePrefs: function() {
		var sc = this.content.find(".scroll");
		var state = { zoomView : this.zoomView, curLayer : this.currentLayer == null?null:this.currentLayer.name, scrollX : sc.scrollLeft(), scrollY : sc.scrollTop(), paintMode : this.palette.paintMode, randomMode : this.palette.randomMode, paletteMode : this.palette.mode, paletteModeCursor : this.palette.modeCursor, smallPalette : this.palette.small, rotation : this.rotation, flipMode : this.flipMode};
		js_Browser.getLocalStorage().setItem(this.sheetPath + "#" + this.index,haxe_Serializer.run(state));
	}
	,scale: function(s) {
		if(s == null || isNaN(s)) return;
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(!l.visible) continue;
			l.dirty = true;
			l.scale(s);
		}
		this.save();
		this.draw();
	}
	,scroll: function(dx,dy) {
		if(dx == null || isNaN(dx)) dx = 0;
		if(dy == null || isNaN(dy)) dy = 0;
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(!l.visible) continue;
			l.dirty = true;
			l.scroll(dx,dy);
		}
		this.save();
		this.draw();
	}
	,setTileSize: function(value) {
		this.props.tileSize = this.tileSize = value;
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(!l.hasFloatCoord) continue;
			{
				var _g2 = l.data;
				switch(_g2[1]) {
				case 1:
					var objs = _g2[3];
					var _g3 = 0;
					while(_g3 < objs.length) {
						var o = objs[_g3];
						++_g3;
						o.x = (o.x * this.tileSize | 0) / this.tileSize;
						o.y = (o.y * this.tileSize | 0) / this.tileSize;
						if(l.hasSize) {
							o.width = (o.width * this.tileSize | 0) / this.tileSize;
							o.height = (o.height * this.tileSize | 0) / this.tileSize;
						}
					}
					break;
				default:
				}
			}
		}
		this.setCursor();
		this.save();
		this.draw();
	}
	,setLayerMode: function(mode) {
		if(this.currentLayer.tileProps == null) {
			js_Browser.alert("Choose file first");
			return;
		}
		this.currentLayer.setMode(mode);
		this.save();
		this.reload();
	}
	,paletteOption: function(name,val) {
		if(this.palette.option(name,val)) {
			this.save();
			this.draw();
		}
	}
	,setLayer: function(l) {
		var old = this.currentLayer;
		if(l == old) {
			this.setCursor();
			return;
		}
		this.currentLayer = l;
		if(!l.hasRotFlip) {
			this.flipMode = false;
			this.rotation = 0;
		}
		this.savePrefs();
		this.content.find("[name=alpha]").val(Std.string(l.props.alpha * 100 | 0));
		this.content.find("[name=visible]").prop("checked",l.visible);
		this.content.find("[name=lock]").prop("checked",l.lock);
		this.content.find("[name=lockGrid]").prop("checked",!l.floatCoord).closest(".item").css({ display : l.hasFloatCoord?"":"none"});
		this.content.find("[name=mode]").val("" + (l.props.mode != null?l.props.mode:"tiles"));
		this.content.find("[name=color]").spectrum("set",this.toColor(l.props.color)).closest(".item").css({ display : l.idToIndex == null && !(function($this) {
			var $r;
			var _g = l.data;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 2:case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))?"":"none"});
		{
			var _g1 = l.data;
			switch(_g1[1]) {
			case 2:
				var t = _g1[2];
				this.content.find("[name=size]").val("" + t.size).closest(".item").show();
				this.content.find("[name=file]").closest(".item").show();
				break;
			case 3:
				var t1 = _g1[2];
				this.content.find("[name=size]").val("" + t1.size).closest(".item").show();
				this.content.find("[name=file]").closest(".item").show();
				break;
			default:
				this.content.find("[name=size]").closest(".item").hide();
				this.content.find("[name=file]").closest(".item").hide();
			}
		}
		if((function($this) {
			var $r;
			var _g2 = l.data;
			$r = (function($this) {
				var $r;
				switch(_g2[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) {
			this.palette.randomMode = false;
			this.palette.paintMode = false;
			this.savePrefs();
		}
		this.palette.reset();
		if(l.images == null) {
			this.setCursor();
			return;
		}
		this.palette.layerChanged(l);
		this.setCursor();
	}
	,setCursor: function() {
		var l = this.currentLayer;
		if(l == null) {
			this.cursor.hide();
			return;
		}
		this.content.find(".menu .item.selected").removeClass("selected");
		l.comp.addClass("selected");
		this.palette.updateSelect();
		var size;
		if(this.zoomView < 1) size = this.tileSize * this.zoomView | 0; else size = Math.ceil(this.tileSize * this.zoomView);
		if(this.selection != null) {
			this.cursorImage.setSize(0,0);
			this.cursor.show();
			this.cursor.css({ border : "", marginLeft : (this.selection.x * this.tileSize * this.zoomView - 1 | 0) + "px", marginTop : (this.selection.y * this.tileSize * this.zoomView | 0) + "px", width : (this.selection.w * this.tileSize * this.zoomView | 0) + "px", height : (this.selection.h * this.tileSize * this.zoomView | 0) + "px"});
			return;
		}
		var cur = l.current;
		var w;
		if(this.palette.randomMode) w = 1; else w = l.currentWidth;
		var h;
		if(this.palette.randomMode) h = 1; else h = l.currentHeight;
		if((function($this) {
			var $r;
			var _g = l.data;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) {
			var o = l.getSelObjects();
			if(o.length > 0) {
				cur = o[0].x + o[0].y * l.stride;
				w = o[0].w;
				h = o[0].h;
			}
		}
		this.cursorImage.setSize(size * w,size * h);
		var px = 0;
		var py = 0;
		if(l.images != null) {
			{
				var _g1 = l.data;
				switch(_g1[1]) {
				case 1:
					var i = l.images[cur];
					var w1 = Math.ceil(i.width * this.zoomView);
					var h1 = Math.ceil(i.height * this.zoomView);
					this.cursorImage.setSize(w1,h1);
					this.cursorImage.clear();
					this.cursorImage.drawScaled(i,0,0,w1,h1);
					px = w1 - size >> 1;
					py = h1 - size;
					break;
				default:
					this.cursorImage.clear();
					var _g11 = 0;
					while(_g11 < h) {
						var y = _g11++;
						var _g2 = 0;
						while(_g2 < w) {
							var x = _g2++;
							var i1 = l.images[cur + x + y * l.stride];
							this.cursorImage.drawSub(i1,0,0,i1.width,i1.height,x * size,y * size,size,size);
						}
					}
					this.cursor.css({ border : "none"});
					if(this.flipMode || this.rotation != 0) {
						var tw = size * w;
						var th = size * h;
						this.tmpImage.setSize(tw,th);
						var m = { a : 0., b : 0., c : 0., d : 0., x : 0., y : 0.};
						l.initMatrix(m,tw,th,this.rotation,this.flipMode);
						this.tmpImage.clear();
						this.tmpImage.draw(this.cursorImage,0,0);
						var cw = tw * m.a + th * m.c | 0;
						var ch = tw * m.b + th * m.d | 0;
						this.cursorImage.setSize(cw < 0?-cw:cw,ch < 0?-ch:ch);
						this.cursorImage.clear();
						this.cursorImage.drawMat(this.tmpImage,m);
					}
				}
			}
			this.cursorImage.fill(1616617979);
		} else {
			var c = l.colors[cur];
			var lum = ((c & 255) + (c >> 8 & 255) + (c >> 16 & 255)) / 765;
			this.cursorImage.fill(c | -16777216);
			this.cursor.css({ border : "1px solid " + (lum < 0.25?"white":"black")});
		}
		var canvas = this.cursorImage.getCanvas();
		canvas.style.marginLeft = -px + "px";
		canvas.style.marginTop = -py + "px";
	}
	,__class__: Level
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var K = function() { };
$hxClasses["K"] = K;
K.__name__ = ["K"];
var Model = function() {
	this.openedList = new haxe_ds_StringMap();
	this.r_ident = new EReg("^[A-Za-z_][A-Za-z0-9_\\*:]*$","");
	this.prefs = { windowPos : { x : 50, y : 50, w : 800, h : 600, max : false}, curFile : null, curSheet : 0, recent : []};
	this.existsCache = new haxe_ds_StringMap();
	this.loadPrefs();
	SheetData.model = this;
};
$hxClasses["Model"] = Model;
Model.__name__ = ["Model"];
Model.prototype = {
	quickExists: function(path) {
		var c = this.existsCache.get(path);
		if(c == null) {
			c = { t : -1e9, r : false};
			this.existsCache.set(path,c);
		}
		var t = haxe_Timer.stamp();
		if(c.t < t - 10) {
			c.r = sys_FileSystem.exists(path);
			c.t = t;
		}
		return c.r;
	}
	,getImageData: function(key) {
		if(key.indexOf(":") >= 0) {
			var len = key.indexOf(":") - 1;
			key = HxOverrides.substr(key,0,len);
		}
		return Reflect.field(this.imageBank,key);
	}
	,getAbsPath: function(file) {
		if(file.charAt(0) == "/" || file.charAt(1) == ":") return file; else return new haxe_io_Path(this.prefs.curFile).dir.split("\\").join("/") + "/" + file;
	}
	,getSheet: function(name) {
		return this.smap.get(name).s;
	}
	,getDefault: function(c) {
		if(c.opt) return null;
		{
			var _g = c.type;
			switch(_g[1]) {
			case 3:case 4:case 5:case 10:case 11:
				return 0;
			case 1:case 0:case 7:case 12:case 13:
				return "";
			case 6:
				var s = _g[2];
				var s1 = this.smap.get(s).s;
				var l = s1.lines[0];
				var id = "";
				if(l != null) {
					var _g1 = 0;
					var _g2 = s1.columns;
					while(_g1 < _g2.length) {
						var c1 = _g2[_g1];
						++_g1;
						if(c1.type == cdb_ColumnType.TId) {
							id = Reflect.field(l,c1.name);
							break;
						}
					}
				}
				return id;
			case 2:
				return false;
			case 8:
				return [];
			case 9:case 14:case 15:case 16:
				return null;
			}
		}
	}
	,parseDynamic: function(s) {
		s = new EReg("([{,]) *([a-zA-Z_][a-zA-Z0-9_]*) *:","g").replace(s,"$1\"$2\":");
		return JSON.parse(s);
	}
	,save: function(history) {
		if(history == null) history = true;
		var _g = this;
		var _g1 = 0;
		var _g11 = this.data.sheets;
		while(_g1 < _g11.length) {
			var s = _g11[_g1];
			++_g1;
			var _g2 = 0;
			var _g3 = Reflect.fields(s.props);
			while(_g2 < _g3.length) {
				var p = _g3[_g2];
				++_g2;
				var v = Reflect.field(s.props,p);
				if(v == null || v == false) Reflect.deleteField(s.props,p);
			}
			if(s.props.hasIndex) {
				var lines = SheetData.getLines(s);
				var _g31 = 0;
				var _g21 = lines.length;
				while(_g31 < _g21) {
					var i = _g31++;
					lines[i].index = i;
				}
			}
			if(s.props.hasGroup) {
				var lines1 = SheetData.getLines(s);
				var gid = 0;
				var sindex = 0;
				var titles = s.props.separatorTitles;
				if(titles != null) {
					if(s.separators[sindex] == 0 && titles[sindex] != null) sindex++;
					var _g32 = 0;
					var _g22 = lines1.length;
					while(_g32 < _g22) {
						var i1 = _g32++;
						if(s.separators[sindex] == i1) {
							if(titles[sindex] != null) gid++;
							sindex++;
						}
						lines1[i1].group = gid;
					}
				}
			}
		}
		var sdata = this.quickSave();
		if(history && (this.curSavedData == null || sdata.d != this.curSavedData.d || sdata.o != this.curSavedData.o)) {
			this.history.push(this.curSavedData);
			this.redo = [];
			if(this.history.length > 100 || sdata.d.length * (this.history.length + this.redo.length) * 2 > 314572800) this.history.shift();
			this.curSavedData = sdata;
		}
		if(this.prefs.curFile == null) return;
		try {
			js_node_Fs.writeFileSync(this.prefs.curFile,sdata.d);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Timer.delay(function() {
				js_node_Fs.writeFileSync(_g.prefs.curFile,sdata.d);
			},500);
		}
	}
	,saveImages: function() {
		if(this.prefs.curFile == null) return;
		var img = this.prefs.curFile.split(".");
		img.pop();
		var path = img.join(".") + ".img";
		if(this.imageBank == null) js_node_Fs.unlinkSync(path); else sys_io_File.saveContent(path,JSON.stringify(this.imageBank,null,"\t"));
	}
	,quickSave: function() {
		return { d : cdb_Parser.save(this.data), o : haxe_Serializer.run(this.openedList)};
	}
	,quickLoad: function(sdata) {
		this.data = cdb_Parser.parse(sdata.d);
		this.openedList = haxe_Unserializer.run(sdata.o);
	}
	,deleteSheet: function(sheet) {
		HxOverrides.remove(this.data.sheets,sheet);
		this.smap.remove(sheet.name);
		var _g = 0;
		var _g1 = sheet.columns;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var _g2 = c.type;
			switch(_g2[1]) {
			case 8:
				this.deleteSheet(SheetData.model.smap.get(sheet.name + "@" + c.name).s);
				break;
			default:
			}
		}
		this.mapType(function(t) {
			switch(t[1]) {
			case 6:
				var r = t[2];
				if(r == sheet.name) return cdb_ColumnType.TString; else return t;
				break;
			case 12:
				var r1 = t[2];
				if(r1 == sheet.name) return cdb_ColumnType.TString; else return t;
				break;
			default:
				return t;
			}
		});
	}
	,getConvFunction: function(old,t) {
		var conv = null;
		if(Type.enumEq(old,t)) return { f : null};
		switch(old[1]) {
		case 3:
			switch(t[1]) {
			case 4:
				break;
			case 1:
				conv = Std.string;
				break;
			case 2:
				conv = function(v) {
					return v != 0;
				};
				break;
			case 5:
				var values = t[2];
				conv = function(i) {
					if(i < 0 || i >= values.length) return null; else return i;
				};
				break;
			case 11:
				conv = function(i1) {
					return i1;
				};
				break;
			default:
				return null;
			}
			break;
		case 0:case 6:case 12:
			switch(t[1]) {
			case 1:
				break;
			default:
				return null;
			}
			break;
		case 1:
			switch(t[1]) {
			case 0:case 6:case 12:
				var r_invalid = new EReg("[^A-Za-z0-9_]","g");
				conv = function(r) {
					return r_invalid.replace(r,"_");
				};
				break;
			case 3:
				conv = Std.parseInt;
				break;
			case 4:
				conv = function(str) {
					var f = parseFloat(str);
					if(isNaN(f)) return null; else return f;
				};
				break;
			case 2:
				conv = function(s) {
					return s != "";
				};
				break;
			case 5:
				var values1 = t[2];
				var map = new haxe_ds_StringMap();
				var _g1 = 0;
				var _g = values1.length;
				while(_g1 < _g) {
					var i2 = _g1++;
					var key = values1[i2].toLowerCase();
					if(__map_reserved[key] != null) map.setReserved(key,i2); else map.h[key] = i2;
				}
				conv = function(s1) {
					var key1 = s1.toLowerCase();
					return __map_reserved[key1] != null?map.getReserved(key1):map.h[key1];
				};
				break;
			default:
				return null;
			}
			break;
		case 2:
			switch(t[1]) {
			case 3:case 4:
				conv = function(b) {
					if(b) return 1; else return 0;
				};
				break;
			case 1:
				conv = Std.string;
				break;
			default:
				return null;
			}
			break;
		case 4:
			switch(t[1]) {
			case 3:
				conv = Std["int"];
				break;
			case 1:
				conv = Std.string;
				break;
			case 2:
				conv = function(v) {
					return v != 0;
				};
				break;
			default:
				return null;
			}
			break;
		case 5:
			switch(t[1]) {
			case 5:
				var values11 = old[2];
				var values2 = t[2];
				var map1 = [];
				var _g2 = 0;
				var _g32 = this.makePairs((function($this) {
					var $r;
					var _g3 = [];
					{
						var _g21 = 0;
						var _g11 = values11.length;
						while(_g21 < _g11) {
							var i3 = _g21++;
							_g3.push({ name : values11[i3], i : i3});
						}
					}
					$r = _g3;
					return $r;
				}(this)),(function($this) {
					var $r;
					var _g12 = [];
					{
						var _g31 = 0;
						var _g22 = values2.length;
						while(_g31 < _g22) {
							var i4 = _g31++;
							_g12.push({ name : values2[i4], i : i4});
						}
					}
					$r = _g12;
					return $r;
				}(this)));
				while(_g2 < _g32.length) {
					var p = _g32[_g2];
					++_g2;
					if(p.b == null) continue;
					map1[p.a.i] = p.b.i;
				}
				conv = function(i5) {
					return map1[i5];
				};
				break;
			case 3:
				var values3 = old[2];
				break;
			case 10:
				var val1 = old[2];
				var val2 = t[2];
				if(Std.string(val1) == Std.string(val2)) conv = function(i6) {
					return 1 << i6;
				}; else return null;
				break;
			default:
				return null;
			}
			break;
		case 10:
			switch(t[1]) {
			case 10:
				var values12 = old[2];
				var values21 = t[2];
				var map2 = [];
				var _g23 = 0;
				var _g34 = this.makePairs((function($this) {
					var $r;
					var _g4 = [];
					{
						var _g24 = 0;
						var _g13 = values12.length;
						while(_g24 < _g13) {
							var i7 = _g24++;
							_g4.push({ name : values12[i7], i : i7});
						}
					}
					$r = _g4;
					return $r;
				}(this)),(function($this) {
					var $r;
					var _g14 = [];
					{
						var _g33 = 0;
						var _g25 = values21.length;
						while(_g33 < _g25) {
							var i8 = _g33++;
							_g14.push({ name : values21[i8], i : i8});
						}
					}
					$r = _g14;
					return $r;
				}(this)));
				while(_g23 < _g34.length) {
					var p1 = _g34[_g23];
					++_g23;
					if(p1.b == null) continue;
					map2[p1.a.i] = p1.b.i;
				}
				conv = function(i9) {
					var out = 0;
					var k = 0;
					while(i9 >= 1 << k) {
						if(map2[k] != null && (i9 & 1 << k) != 0) out |= 1 << map2[k];
						k++;
					}
					return out;
				};
				break;
			case 3:
				var values4 = old[2];
				break;
			default:
				return null;
			}
			break;
		case 11:
			switch(t[1]) {
			case 3:
				conv = function(i1) {
					return i1;
				};
				break;
			default:
				return null;
			}
			break;
		default:
			return null;
		}
		return { f : conv};
	}
	,updateColumn: function(sheet,old,c) {
		var _g = this;
		if(old.name != c.name) {
			var _g1 = 0;
			var _g11 = sheet.columns;
			while(_g1 < _g11.length) {
				var c2 = _g11[_g1];
				++_g1;
				if(c2.name == c.name) return "Column name already used";
			}
			if(c.name == "index" && sheet.props.hasIndex) return "Sheet already has an index";
			if(c.name == "group" && sheet.props.hasGroup) return "Sheet already has a group";
			var _g2 = 0;
			var _g12 = SheetData.getLines(sheet);
			while(_g2 < _g12.length) {
				var o = _g12[_g2];
				++_g2;
				var v = Reflect.field(o,old.name);
				Reflect.deleteField(o,old.name);
				if(v != null) o[c.name] = v;
			}
			var renameRec;
			var renameRec1 = null;
			renameRec1 = function(sheet1,col) {
				var s = SheetData.model.smap.get(sheet1.name + "@" + col.name).s;
				s.name = sheet1.name + "@" + c.name;
				var _g3 = 0;
				var _g13 = s.columns;
				while(_g3 < _g13.length) {
					var c1 = _g13[_g3];
					++_g3;
					if(c1.type == cdb_ColumnType.TList) renameRec1(s,c1);
				}
				_g.makeSheet(s);
			};
			renameRec = renameRec1;
			if(old.type == cdb_ColumnType.TList) renameRec(sheet,old);
			old.name = c.name;
		}
		if(!Type.enumEq(old.type,c.type)) {
			var conv = this.getConvFunction(old.type,c.type);
			if(conv == null) return "Cannot convert " + this.typeStr(old.type) + " to " + this.typeStr(c.type);
			var conv1 = conv.f;
			if(conv1 != null) {
				var _g4 = 0;
				var _g14 = SheetData.getLines(sheet);
				while(_g4 < _g14.length) {
					var o1 = _g14[_g4];
					++_g4;
					var v1 = Reflect.field(o1,c.name);
					if(v1 != null) {
						v1 = conv1(v1);
						if(v1 != null) o1[c.name] = v1; else Reflect.deleteField(o1,c.name);
					}
				}
			}
			old.type = c.type;
			old.typeStr = null;
		}
		if(old.opt != c.opt) {
			if(old.opt) {
				var _g5 = 0;
				var _g15 = SheetData.getLines(sheet);
				while(_g5 < _g15.length) {
					var o2 = _g15[_g5];
					++_g5;
					var v2 = Reflect.field(o2,c.name);
					if(v2 == null) {
						v2 = this.getDefault(c);
						if(v2 != null) o2[c.name] = v2;
					}
				}
			} else {
				var _g6 = old.type;
				switch(_g6[1]) {
				case 5:
					break;
				default:
					var def = this.getDefault(old);
					var _g16 = 0;
					var _g21 = SheetData.getLines(sheet);
					while(_g16 < _g21.length) {
						var o3 = _g21[_g16];
						++_g16;
						var v3 = Reflect.field(o3,c.name);
						var _g31 = c.type;
						switch(_g31[1]) {
						case 8:
							var v4 = v3;
							if(v4.length == 0) Reflect.deleteField(o3,c.name);
							break;
						default:
							if(v3 == def) Reflect.deleteField(o3,c.name);
						}
					}
				}
			}
			old.opt = c.opt;
		}
		if(c.display == null) Reflect.deleteField(old,"display"); else old.display = c.display;
		this.makeSheet(sheet);
		return null;
	}
	,setCompressionMode: function(c) {
		this.data.compress = c;
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = s.columns;
			while(_g2 < _g3.length) {
				var c1 = _g3[_g2];
				++_g2;
				{
					var _g4 = c1.type;
					switch(_g4[1]) {
					case 12:
						var _g5 = 0;
						var _g6 = SheetData.getLines(s);
						while(_g5 < _g6.length) {
							var obj = _g6[_g5];
							++_g5;
							var ldat = Reflect.field(obj,c1.name);
							if(ldat == null || ldat == "") continue;
							var d = cdb__$Types_Layer_$Impl_$.decode(ldat,(function($this) {
								var $r;
								var _g7 = [];
								{
									var _g8 = 0;
									while(_g8 < 256) {
										var i = _g8++;
										_g7.push(i);
									}
								}
								$r = _g7;
								return $r;
							}(this)));
							ldat = cdb__$Types_Layer_$Impl_$.encode(d,this.data.compress);
							obj[c1.name] = ldat;
						}
						break;
					case 15:
						var _g51 = 0;
						var _g61 = SheetData.getLines(s);
						while(_g51 < _g61.length) {
							var obj1 = _g61[_g51];
							++_g51;
							var ldat1 = Reflect.field(obj1,c1.name);
							if(ldat1 == null || ldat1 == "") continue;
							var d1 = cdb__$Types_TileLayerData_$Impl_$.decode(ldat1.data);
							Reflect.setField(ldat1,"data",cdb__$Types_TileLayerData_$Impl_$.encode(d1,this.data.compress));
						}
						break;
					default:
					}
				}
			}
		}
	}
	,compressionEnabled: function() {
		return this.data.compress;
	}
	,error: function(msg) {
		js_Browser.alert(msg);
	}
	,load: function(noError) {
		if(noError == null) noError = false;
		this.history = [];
		this.redo = [];
		try {
			this.data = cdb_Parser.parse(js_node_Fs.readFileSync(this.prefs.curFile,{ encoding : "utf8"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if(!noError) this.error(Std.string(e));
			this.prefs.curFile = null;
			this.prefs.curSheet = 0;
			this.data = { sheets : [], customTypes : [], compress : false};
		}
		try {
			var img = this.prefs.curFile.split(".");
			img.pop();
			this.imageBank = JSON.parse(sys_io_File.getContent(img.join(".") + ".img"));
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			this.imageBank = null;
		}
		this.curSavedData = this.quickSave();
		this.initContent();
	}
	,initContent: function() {
		this.smap = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			this.makeSheet(s);
		}
		this.tmap = new haxe_ds_StringMap();
		var _g2 = 0;
		var _g11 = this.data.customTypes;
		while(_g2 < _g11.length) {
			var t = _g11[_g2];
			++_g2;
			this.tmap.set(t.name,t);
		}
	}
	,sortById: function(a,b) {
		if(a.disp > b.disp) return 1; else return -1;
	}
	,makeSheet: function(s) {
		var sdat = { s : s, index : new haxe_ds_StringMap(), all : []};
		var cid = null;
		var lines = SheetData.getLines(s);
		var _g = 0;
		var _g1 = s.columns;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.type == cdb_ColumnType.TId) {
				var _g2 = 0;
				while(_g2 < lines.length) {
					var l = lines[_g2];
					++_g2;
					var v = Reflect.field(l,c.name);
					if(v != null && v != "") {
						var disp = v;
						var ico = null;
						if(s.props.displayColumn != null) {
							disp = Reflect.field(l,s.props.displayColumn);
							if(disp == null || disp == "") disp = "#" + v;
						}
						if(s.props.displayIcon != null) ico = Reflect.field(l,s.props.displayIcon);
						var o = { id : v, disp : disp, ico : ico, obj : l};
						if(sdat.index.get(v) == null) sdat.index.set(v,o);
						sdat.all.push(o);
					}
				}
				sdat.all.sort($bind(this,this.sortById));
				break;
			}
		}
		this.smap.set(s.name,sdat);
	}
	,cleanImages: function() {
		if(this.imageBank == null) return;
		var used = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = s.columns;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				var _g4 = c.type;
				switch(_g4[1]) {
				case 7:
					var _g5 = 0;
					var _g6 = SheetData.getLines(s);
					while(_g5 < _g6.length) {
						var obj = _g6[_g5];
						++_g5;
						var v = Reflect.field(obj,c.name);
						if(v != null) {
							if(__map_reserved[v] != null) used.setReserved(v,true); else used.h[v] = true;
						}
					}
					break;
				default:
				}
			}
		}
		var _g7 = 0;
		var _g11 = Reflect.fields(this.imageBank);
		while(_g7 < _g11.length) {
			var f = _g11[_g7];
			++_g7;
			if(!(__map_reserved[f] != null?used.getReserved(f):used.h[f])) Reflect.deleteField(this.imageBank,f);
		}
	}
	,loadPrefs: function() {
		try {
			this.prefs = haxe_Unserializer.run(js_Browser.getLocalStorage().getItem("prefs"));
			if(this.prefs.recent == null) this.prefs.recent = [];
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
	}
	,savePrefs: function() {
		js_Browser.getLocalStorage().setItem("prefs",haxe_Serializer.run(this.prefs));
	}
	,valToString: function(t,val,esc) {
		if(esc == null) esc = false;
		if(val == null) return "null";
		switch(t[1]) {
		case 3:case 4:case 2:case 7:
			return Std.string(val);
		case 0:case 6:case 12:case 13:
			if(esc) return "\"" + Std.string(val) + "\""; else return val;
			break;
		case 1:
			var val1 = val;
			if(new EReg("^[A-Za-z0-9_]+$","g").match(val1) && !esc) return val1; else return "\"" + val1.split("\\").join("\\\\").split("\"").join("\\\"") + "\"";
			break;
		case 5:
			var values = t[2];
			return this.valToString(cdb_ColumnType.TString,values[val],esc);
		case 9:
			var t1 = t[2];
			return this.typeValToString(this.tmap.get(t1),val,esc);
		case 10:
			var values1 = t[2];
			var v = val;
			var flags = [];
			var _g1 = 0;
			var _g = values1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if((v & 1 << i) != 0) flags.push(this.valToString(cdb_ColumnType.TString,values1[i],esc));
			}
			return Std.string(flags);
		case 11:
			var s = "#" + StringTools.hex(val,6);
			if(esc) return "\"" + s + "\""; else return s;
			break;
		case 15:case 16:case 14:
			if(esc) return JSON.stringify(val); else return Std.string(val);
			break;
		case 8:
			return "???";
		}
	}
	,typeValToString: function(t,val,esc) {
		if(esc == null) esc = false;
		var c = t.cases[val[0]];
		var str = c.name;
		if(c.args.length > 0) {
			str += "(";
			var out = [];
			var _g1 = 1;
			var _g = val.length;
			while(_g1 < _g) {
				var i = _g1++;
				out.push(this.valToString(c.args[i - 1].type,val[i],esc));
			}
			str += out.join(",");
			str += ")";
		}
		return str;
	}
	,typeStr: function(t) {
		switch(t[1]) {
		case 6:
			var n = t[2];
			return n;
		case 9:
			var n1 = t[2];
			return n1;
		default:
			return HxOverrides.substr(Std.string(t),1,null);
		}
	}
	,parseVal: function(t,val) {
		switch(t[1]) {
		case 3:
			if(new EReg("^-?[0-9]+$","").match(val)) return Std.parseInt(val);
			break;
		case 1:
			if(HxOverrides.cca(val,0) == 34) {
				var esc = false;
				var p = 1;
				var out_b = "";
				try {
					while(true) {
						if(p == val.length) throw new js__$Boot_HaxeError("Unclosed \"");
						var c;
						var index = p++;
						c = HxOverrides.cca(val,index);
						if(esc) {
							out_b += String.fromCharCode(c);
							esc = false;
						} else if(c != null) switch(c) {
						case 34:
							if(p < val.length) throw new js__$Boot_HaxeError("Invalid content after string '" + val);
							throw "__break__";
							break;
						case 92:
							esc = true;
							break;
						default:
							out_b += String.fromCharCode(c);
						} else out_b += String.fromCharCode(c);
					}
				} catch( e ) { if( e != "__break__" ) throw e; }
				return out_b;
			} else if(new EReg("^[A-Za-z0-9_]+$","").match(val)) return val;
			throw new js__$Boot_HaxeError("String requires quotes '" + val + "'");
			break;
		case 2:
			if(val == "true") return true;
			if(val == "false") return false;
			break;
		case 4:
			var f = parseFloat(val);
			if(!isNaN(f)) return f;
			break;
		case 9:
			var t1 = t[2];
			return this.parseTypeVal(this.tmap.get(t1),val);
		case 6:
			var t2 = t[2];
			var r;
			var this1 = this.smap.get(t2).index;
			r = this1.get(val);
			if(r == null) throw new js__$Boot_HaxeError(val + " is not a known " + t2 + " id");
			return r.id;
		case 11:
			if(val.charAt(0) == "#") val = "0x" + HxOverrides.substr(val,1,null);
			if(new EReg("^-?[0-9]+$","").match(val) || new EReg("^0x[0-9A-Fa-f]+$","").match(val)) return Std.parseInt(val);
			break;
		default:
		}
		throw new js__$Boot_HaxeError("'" + val + "' should be " + this.typeStr(t));
	}
	,parseTypeVal: function(t,val) {
		if(t == null || val == null) throw new js__$Boot_HaxeError("Missing val/type");
		val = StringTools.trim(val);
		var missingCloseParent = false;
		var pos = val.indexOf("(");
		var id;
		var args = null;
		if(pos < 0) {
			id = val;
			args = [];
		} else {
			id = HxOverrides.substr(val,0,pos);
			val = HxOverrides.substr(val,pos + 1,null);
			if(StringTools.endsWith(val,")")) val = HxOverrides.substr(val,0,val.length - 1); else missingCloseParent = true;
			args = [];
			var p = 0;
			var start = 0;
			var pc = 0;
			while(p < val.length) {
				var _g;
				var index = p++;
				_g = HxOverrides.cca(val,index);
				if(_g != null) switch(_g) {
				case 40:
					pc++;
					break;
				case 41:
					if(pc == 0) throw new js__$Boot_HaxeError("Extra )");
					pc--;
					break;
				case 34:
					var esc = false;
					try {
						while(true) {
							if(p == val.length) throw new js__$Boot_HaxeError("Unclosed \"");
							var c;
							var index1 = p++;
							c = HxOverrides.cca(val,index1);
							if(esc) esc = false; else if(c != null) switch(c) {
							case 34:
								throw "__break__";
								break;
							case 92:
								esc = true;
								break;
							}
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
					break;
				case 44:
					if(pc == 0) {
						args.push(HxOverrides.substr(val,start,p - start - 1));
						start = p;
					}
					break;
				default:
				} else {
				}
			}
			if(pc > 0) missingCloseParent = true;
			if(p > start || start > 0 && p == start) args.push(HxOverrides.substr(val,start,p - start));
		}
		var _g1 = 0;
		var _g2 = t.cases.length;
		while(_g1 < _g2) {
			var i = _g1++;
			var c1 = t.cases[i];
			if(c1.name == id) {
				var vals = [i];
				var _g21 = 0;
				var _g3 = c1.args;
				while(_g21 < _g3.length) {
					var a = _g3[_g21];
					++_g21;
					var v = args.shift();
					if(v == null) {
						if(a.opt) vals.push(null); else throw new js__$Boot_HaxeError("Missing argument " + a.name + " : " + this.typeStr(a.type));
					} else {
						v = StringTools.trim(v);
						if(a.opt && v == "null") {
							vals.push(null);
							continue;
						}
						var val1;
						try {
							val1 = this.parseVal(a.type,v);
						} catch( e ) {
							if (e instanceof js__$Boot_HaxeError) e = e.val;
							if( js_Boot.__instanceof(e,String) ) {
								throw new js__$Boot_HaxeError(e + " for " + a.name);
							} else throw(e);
						}
						vals.push(val1);
					}
				}
				if(args.length > 0) throw new js__$Boot_HaxeError("Extra argument '" + args.shift() + "'");
				if(missingCloseParent) throw new js__$Boot_HaxeError("Missing )");
				while(vals[vals.length - 1] == null) vals.pop();
				return vals;
			}
		}
		throw new js__$Boot_HaxeError("Unkown value '" + id + "'");
		return null;
	}
	,parseType: function(tstr) {
		switch(tstr) {
		case "Int":
			return cdb_ColumnType.TInt;
		case "Float":
			return cdb_ColumnType.TFloat;
		case "Bool":
			return cdb_ColumnType.TBool;
		case "String":
			return cdb_ColumnType.TString;
		default:
			if(this.tmap.exists(tstr)) return cdb_ColumnType.TCustom(tstr); else if(this.smap.exists(tstr)) return cdb_ColumnType.TRef(tstr); else {
				if(StringTools.endsWith(tstr,">")) {
					var tname = tstr.split("<").shift();
					var tparam;
					var _this = HxOverrides.substr(tstr,tname.length + 1,null);
					tparam = HxOverrides.substr(_this,0,-1);
				}
				throw new js__$Boot_HaxeError("Unknown type " + tstr);
			}
		}
	}
	,typeCasesToString: function(t,prefix) {
		if(prefix == null) prefix = "";
		var arr = [];
		var _g = 0;
		var _g1 = t.cases;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var str = "";
			if(c.returnType != "" && c.returnType != null) str += c.returnType + " ";
			str += c.name;
			if(c.args.length > 0) {
				str += "( ";
				var out = [];
				var _g2 = 0;
				var _g3 = c.args;
				while(_g2 < _g3.length) {
					var a = _g3[_g2];
					++_g2;
					var k = "";
					if(a.opt) k += "?";
					k += a.name + " : " + this.typeStr(a.type);
					out.push(k);
				}
				str += out.join(", ");
				str += " )";
			}
			str += ";";
			arr.push(prefix + str);
		}
		return arr.join("\n");
	}
	,parseTypeCases: function(def) {
		var cases = [];
		var cmap = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = new EReg("[\n;]","g").split(def);
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			var line1 = StringTools.trim(line);
			if(line1 == "") continue;
			if(HxOverrides.cca(line1,line1.length - 1) == 59) line1 = HxOverrides.substr(line1,1,null);
			var pos = line1.indexOf("(");
			var name = null;
			var args = [];
			if(pos < 0) name = line1; else {
				name = HxOverrides.substr(line1,0,pos);
				line1 = HxOverrides.substr(line1,pos + 1,null);
				if(HxOverrides.cca(line1,line1.length - 1) != 41) throw new js__$Boot_HaxeError("Missing closing parent in " + line1);
				line1 = HxOverrides.substr(line1,0,line1.length - 1);
				var _g2 = 0;
				var _g3 = line1.split(",");
				while(_g2 < _g3.length) {
					var arg = _g3[_g2];
					++_g2;
					var tname = arg.split(":");
					if(tname.length != 2) throw new js__$Boot_HaxeError("Required name:type in '" + arg + "'");
					var opt = false;
					var id = StringTools.trim(tname[0]);
					if(id.charAt(0) == "?") {
						opt = true;
						id = StringTools.trim(HxOverrides.substr(id,1,null));
					}
					var t = StringTools.trim(tname[1]);
					if(!this.r_ident.match(id)) throw new js__$Boot_HaxeError("Invalid identifier " + id);
					var c = { name : id, type : this.parseType(t), typeStr : null};
					if(opt) c.opt = true;
					args.push(c);
				}
			}
			var retType = "";
			if(name.indexOf(" ") >= 0) {
				var subNames = name.split(" ");
				subNames[0] = StringTools.trim(subNames[0]);
				subNames[1] = StringTools.trim(subNames[1]);
				retType = subNames[0];
				name = subNames[1];
			}
			if(!this.r_ident.match(name)) throw new js__$Boot_HaxeError("Invalid identifier \"" + name + "\" at " + line1);
			if(retType.length > 0 && !this.r_ident.match(retType)) throw new js__$Boot_HaxeError("Invalid return type \"" + retType + "\" at " + line1);
			if(__map_reserved[name] != null?cmap.existsReserved(name):cmap.h.hasOwnProperty(name)) throw new js__$Boot_HaxeError("Duplicate identifier " + name);
			if(__map_reserved[name] != null) cmap.setReserved(name,true); else cmap.h[name] = true;
			cases.push({ name : name, args : args, returnType : retType});
		}
		return cases;
	}
	,makePairs: function(oldA,newA) {
		var pairs = [];
		var oldL = Lambda.list(oldA);
		var newL = Lambda.list(newA);
		var _g = 0;
		while(_g < oldA.length) {
			var a = oldA[_g];
			++_g;
			var _g1_head = newL.h;
			var _g1_val = null;
			while(_g1_head != null) {
				var b;
				b = (function($this) {
					var $r;
					_g1_val = _g1_head[0];
					_g1_head = _g1_head[1];
					$r = _g1_val;
					return $r;
				}(this));
				if(a.name == b.name) {
					pairs.push({ a : a, b : b});
					oldL.remove(a);
					newL.remove(b);
					break;
				}
			}
		}
		var _g_head = oldL.h;
		var _g_val = null;
		while(_g_head != null) {
			var a1;
			a1 = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var _g_head1 = newL.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var b1;
				b1 = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				if(Lambda.indexOf(oldA,a1) == Lambda.indexOf(newA,b1)) {
					pairs.push({ a : a1, b : b1});
					oldL.remove(a1);
					newL.remove(b1);
					break;
				}
			}
		}
		var _g_head2 = oldL.h;
		var _g_val2 = null;
		while(_g_head2 != null) {
			var a2;
			a2 = (function($this) {
				var $r;
				_g_val2 = _g_head2[0];
				_g_head2 = _g_head2[1];
				$r = _g_val2;
				return $r;
			}(this));
			pairs.push({ a : a2, b : null});
		}
		return pairs;
	}
	,mapType: function(callb) {
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = s.columns;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				var t = callb(c.type);
				if(t != c.type) {
					c.type = t;
					c.typeStr = null;
				}
			}
		}
		var _g4 = 0;
		var _g11 = this.data.customTypes;
		while(_g4 < _g11.length) {
			var t1 = _g11[_g4];
			++_g4;
			var _g21 = 0;
			var _g31 = t1.cases;
			while(_g21 < _g31.length) {
				var c1 = _g31[_g21];
				++_g21;
				var _g41 = 0;
				var _g5 = c1.args;
				while(_g41 < _g5.length) {
					var a = _g5[_g41];
					++_g41;
					var t2 = callb(a.type);
					if(t2 != a.type) {
						a.type = t2;
						a.typeStr = null;
					}
				}
			}
		}
	}
	,updateRefs: function(sheet,refMap) {
		var _g3 = this;
		var convertTypeRec;
		var convertTypeRec1 = null;
		convertTypeRec1 = function(t,o) {
			var c = t.cases[o[0]];
			var _g1 = 0;
			var _g = o.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var v = o[i + 1];
				if(v == null) continue;
				{
					var _g2 = c.args[i].type;
					switch(_g2[1]) {
					case 6:
						var n = _g2[2];
						if(n == sheet.name) {
							var v1;
							var key = v;
							v1 = __map_reserved[key] != null?refMap.getReserved(key):refMap.h[key];
							if(v1 == null) continue;
							o[i + 1] = v1;
						} else {
						}
						break;
					case 9:
						var name = _g2[2];
						convertTypeRec1(_g3.tmap.get(name),v);
						break;
					default:
					}
				}
			}
		};
		convertTypeRec = convertTypeRec1;
		var _g4 = 0;
		var _g11 = this.data.sheets;
		while(_g4 < _g11.length) {
			var s = _g11[_g4];
			++_g4;
			var _g21 = 0;
			var _g31 = s.columns;
			while(_g21 < _g31.length) {
				var c1 = _g31[_g21];
				++_g21;
				{
					var _g41 = c1.type;
					switch(_g41[1]) {
					case 6:
						var n1 = _g41[2];
						if(n1 == sheet.name) {
							var _g5 = 0;
							var _g6 = SheetData.getLines(s);
							while(_g5 < _g6.length) {
								var obj = _g6[_g5];
								++_g5;
								var id = Reflect.field(obj,c1.name);
								if(id == null) continue;
								id = __map_reserved[id] != null?refMap.getReserved(id):refMap.h[id];
								if(id == null) continue;
								obj[c1.name] = id;
							}
						} else {
						}
						break;
					case 9:
						var t1 = _g41[2];
						var _g51 = 0;
						var _g61 = SheetData.getLines(s);
						while(_g51 < _g61.length) {
							var obj1 = _g61[_g51];
							++_g51;
							var o1 = Reflect.field(obj1,c1.name);
							if(o1 == null) continue;
							convertTypeRec(this.tmap.get(t1),o1);
						}
						break;
					default:
					}
				}
			}
		}
	}
	,updateType: function(old,t) {
		var _g2 = this;
		var casesPairs = this.makePairs(old.cases,t.cases);
		var convMap = [];
		var _g = 0;
		while(_g < casesPairs.length) {
			var p = casesPairs[_g];
			++_g;
			if(p.b == null) continue;
			var id = Lambda.indexOf(t.cases,p.b);
			var conv = { def : [id], args : []};
			var args = this.makePairs(p.a.args,p.b.args);
			var _g1 = 0;
			while(_g1 < args.length) {
				var a = args[_g1];
				++_g1;
				if(a.b == null) {
					conv.args[Lambda.indexOf(p.a.args,a.a)] = (function() {
						return function(_) {
							return null;
						};
					})();
					continue;
				}
				var b = [a.b];
				var a1 = a.a;
				var c = this.getConvFunction(a1.type,b[0].type);
				if(c == null) throw new js__$Boot_HaxeError("Cannot convert " + p.a.name + "." + a1.name + ":" + this.typeStr(a1.type) + " to " + p.b.name + "." + b[0].name + ":" + this.typeStr(b[0].type));
				var f = [c.f];
				if(f[0] == null) f[0] = (function() {
					return function(x) {
						return x;
					};
				})();
				if(a1.opt != b[0].opt) {
					var oldf = [f[0]];
					if(a1.opt) f[0] = (function(oldf,b) {
						return function(v) {
							v = oldf[0](v);
							if(v == null) return _g2.getDefault(b[0]); else return v;
						};
					})(oldf,b); else {
						var def = [this.getDefault(a1)];
						f[0] = (function(def,oldf) {
							return function(v1) {
								if(v1 == def[0]) return null; else return oldf[0](v1);
							};
						})(def,oldf);
					}
				}
				var index = [Lambda.indexOf(p.b.args,b[0])];
				conv.args[Lambda.indexOf(p.a.args,a1)] = (function(index,f,b) {
					return function(v2) {
						v2 = f[0](v2);
						if(v2 == null && b[0].opt) return null; else return { index : index[0], v : v2};
					};
				})(index,f,b);
			}
			var _g11 = 0;
			var _g21 = p.b.args;
			while(_g11 < _g21.length) {
				var b1 = _g21[_g11];
				++_g11;
				conv.def.push(this.getDefault(b1));
			}
			while(conv.def[conv.def.length - 1] == null) conv.def.pop();
			convMap[Lambda.indexOf(old.cases,p.a)] = conv;
		}
		var convertTypeRec;
		var convertTypeRec1 = null;
		convertTypeRec1 = function(t1,v3) {
			if(t1 == null) return null;
			if(t1 == old) {
				var conv1 = convMap[v3[0]];
				if(conv1 == null) return null;
				var out = conv1.def.slice();
				var _g12 = 0;
				var _g3 = conv1.args.length;
				while(_g12 < _g3) {
					var i = _g12++;
					var v4 = conv1.args[i](v3[i + 1]);
					if(v4 == null) continue;
					out[v4.index + 1] = v4.v;
				}
				return out;
			}
			var c1 = t1.cases[v3[0]];
			var _g13 = 0;
			var _g4 = c1.args.length;
			while(_g13 < _g4) {
				var i1 = _g13++;
				{
					var _g22 = c1.args[i1].type;
					switch(_g22[1]) {
					case 9:
						var tname = _g22[2];
						var av = v3[i1 + 1];
						if(av != null) v3[i1 + 1] = convertTypeRec1(_g2.tmap.get(tname),av);
						break;
					default:
					}
				}
			}
			return v3;
		};
		convertTypeRec = convertTypeRec1;
		var _g5 = 0;
		var _g14 = this.data.sheets;
		while(_g5 < _g14.length) {
			var s = _g14[_g5];
			++_g5;
			var _g23 = 0;
			var _g31 = s.columns;
			while(_g23 < _g31.length) {
				var c2 = _g31[_g23];
				++_g23;
				{
					var _g41 = c2.type;
					switch(_g41[1]) {
					case 9:
						var tname1 = _g41[2];
						var t2 = this.tmap.get(tname1);
						var _g51 = 0;
						var _g6 = SheetData.getLines(s);
						while(_g51 < _g6.length) {
							var obj = _g6[_g51];
							++_g51;
							var v5 = Reflect.field(obj,c2.name);
							if(v5 != null) {
								v5 = convertTypeRec(t2,v5);
								if(v5 == null) Reflect.deleteField(obj,c2.name); else obj[c2.name] = v5;
							}
						}
						if(tname1 == old.name && t.name != old.name) {
							c2.type = cdb_ColumnType.TCustom(t.name);
							c2.typeStr = null;
						}
						break;
					default:
					}
				}
			}
		}
		if(t.name != old.name) {
			var _g7 = 0;
			var _g15 = this.data.customTypes;
			while(_g7 < _g15.length) {
				var t21 = _g15[_g7];
				++_g7;
				var _g24 = 0;
				var _g32 = t21.cases;
				while(_g24 < _g32.length) {
					var c3 = _g32[_g24];
					++_g24;
					var _g42 = 0;
					var _g52 = c3.args;
					while(_g42 < _g52.length) {
						var a2 = _g52[_g42];
						++_g42;
						{
							var _g61 = a2.type;
							switch(_g61[1]) {
							case 9:
								var n = _g61[2];
								if(n == old.name) {
									a2.type = cdb_ColumnType.TCustom(t.name);
									a2.typeStr = null;
								} else {
								}
								break;
							default:
							}
						}
					}
				}
			}
			this.tmap.remove(old.name);
			old.name = t.name;
			this.tmap.set(old.name,old);
		}
		old.cases = t.cases;
	}
	,__class__: Model
};
var Main = function() {
	Model.call(this);
	this.window = js_node_webkit_Window.get();
	this.window.on("resize",$bind(this,this.onResize));
	this.window.on("focus",function(_) {
		js_node_webkit_App.clearCache();
	});
	this.initMenu();
	this.levels = [];
	this.mousePos = { x : 0, y : 0};
	this.sheetCursors = new haxe_ds_StringMap();
	this.window.window.addEventListener("keydown",$bind(this,this.onKey));
	this.window.window.addEventListener("keypress",$bind(this,this.onKeyPress));
	this.window.window.addEventListener("keyup",$bind(this,this.onKeyUp));
	this.window.window.addEventListener("mousemove",$bind(this,this.onMouseMove));
	$(".modal").keypress(function(e) {
		e.stopPropagation();
	}).keydown(function(e1) {
		e1.stopPropagation();
	});
	this.cursor = { s : null, x : 0, y : 0};
	this.pages = new JqPages(this);
	this.load(true);
	var t = new haxe_Timer(1000);
	t.run = $bind(this,this.checkTime);
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	if(js_node_Fs.accessSync == null) js_node_Fs.accessSync = js_node_Fs.existsSync;
	Main.inst = new Main();
	Reflect.setField(window,"_",Main.inst);
};
Main.__super__ = Model;
Main.prototype = $extend(Model.prototype,{
	onResize: function(_) {
		if(this.level != null) this.level.onResize();
		this.pages.onResize();
	}
	,onMouseMove: function(e) {
		this.mousePos.x = e.clientX;
		this.mousePos.y = e.clientY;
	}
	,setClipBoard: function(schema,data) {
		this.clipboard = { text : Std.string((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				while(_g1 < data.length) {
					var o = data[_g1];
					++_g1;
					_g.push(SheetData.objToString($this.cursor.s,o,true));
				}
			}
			$r = _g;
			return $r;
		}(this))), data : data, schema : schema};
		js_node_webkit_Clipboard.get().set(this.clipboard.text,"text");
	}
	,moveCursor: function(dx,dy,shift,ctrl) {
		if(this.cursor.s == null) return;
		if(this.cursor.x == -1 && ctrl) {
			if(dy != 0) this.moveLine(this.cursor.s,this.cursor.y,dy);
			this.updateCursor();
			return;
		}
		if(dx < 0 && this.cursor.x >= 0) this.cursor.x--;
		if(dy < 0 && this.cursor.y > 0) this.cursor.y--;
		if(dx > 0 && this.cursor.x < this.cursor.s.columns.length - 1) this.cursor.x++;
		if(dy > 0 && this.cursor.y < this.cursor.s.lines.length - 1) this.cursor.y++;
		this.cursor.select = null;
		this.updateCursor();
	}
	,isInput: function() {
		return window.document.activeElement != null && window.document.activeElement.nodeName == "INPUT";
	}
	,onKeyPress: function(e) {
		if(!e.ctrlKey && !this.isInput()) $(".cursor").not(".edit").dblclick();
	}
	,getSelection: function() {
		if(this.cursor.s == null) return null;
		var x1;
		if(this.cursor.x < 0) x1 = 0; else x1 = this.cursor.x;
		var x2;
		if(this.cursor.x < 0) x2 = this.cursor.s.columns.length - 1; else if(this.cursor.select != null) x2 = this.cursor.select.x; else x2 = x1;
		var y1 = this.cursor.y;
		var y2;
		if(this.cursor.select != null) y2 = this.cursor.select.y; else y2 = y1;
		if(x2 < x1) {
			var tmp = x2;
			x2 = x1;
			x1 = tmp;
		}
		if(y2 < y1) {
			var tmp1 = y2;
			y2 = y1;
			y1 = tmp1;
		}
		return { x1 : x1, x2 : x2, y1 : y1, y2 : y2};
	}
	,onKey: function(e) {
		if(this.isInput()) return;
		var inCDB = this.level == null && this.pages.curPage < 0;
		var _g = e.keyCode;
		switch(_g) {
		case 45:
			if(inCDB) {
				if(this.cursor.s != null) this.newLine(this.cursor.s,this.cursor.y);
			} else {
			}
			break;
		case 46:
			if(inCDB) {
				$(".selected.deletable").change();
				if(this.cursor.s != null) {
					if(this.cursor.x < 0) {
						var s = this.getSelection();
						var y = s.y2;
						while(y >= s.y1) {
							SheetData.deleteLine(this.cursor.s,y);
							y--;
						}
						this.cursor.y = s.y1;
						this.cursor.select = null;
					} else {
						var s1 = this.getSelection();
						var _g2 = s1.y1;
						var _g1 = s1.y2 + 1;
						while(_g2 < _g1) {
							var y1 = _g2++;
							var obj = this.cursor.s.lines[y1];
							var _g4 = s1.x1;
							var _g3 = s1.x2 + 1;
							while(_g4 < _g3) {
								var x = _g4++;
								var c = this.cursor.s.columns[x];
								var def = this.getDefault(c);
								if(def == null) Reflect.deleteField(obj,c.name); else obj[c.name] = def;
							}
						}
					}
				}
				this.refresh();
				this.save();
			} else {
			}
			break;
		case 38:
			this.moveCursor(0,-1,e.shiftKey,e.ctrlKey);
			e.preventDefault();
			break;
		case 40:
			this.moveCursor(0,1,e.shiftKey,e.ctrlKey);
			e.preventDefault();
			break;
		case 37:
			this.moveCursor(-1,0,e.shiftKey,e.ctrlKey);
			break;
		case 39:
			this.moveCursor(1,0,e.shiftKey,e.ctrlKey);
			break;
		case 13:
			if(inCDB) {
				if(this.cursor.s != null && $(".cursor.t_list").click().length > 0) e.preventDefault();
			} else {
			}
			break;
		case 32:
			e.preventDefault();
			break;
		case 90:
			if(e.ctrlKey && this.pages.curPage < 0) {
				if(this.history.length > 0) {
					this.redo.push(this.curSavedData);
					this.curSavedData = this.history.pop();
					this.quickLoad(this.curSavedData);
					this.initContent();
					this.save(false);
				}
			} else {
			}
			break;
		case 89:
			if(e.ctrlKey && this.pages.curPage < 0) {
				if(this.redo.length > 0) {
					this.history.push(this.curSavedData);
					this.curSavedData = this.redo.pop();
					this.quickLoad(this.curSavedData);
					this.initContent();
					this.save(false);
				}
			} else {
			}
			break;
		case 67:
			if(e.ctrlKey) {
				if(this.cursor.s != null) {
					var s2 = this.getSelection();
					var data = [];
					var _g21 = s2.y1;
					var _g11 = s2.y2 + 1;
					while(_g21 < _g11) {
						var y2 = _g21++;
						var obj1 = this.cursor.s.lines[y2];
						var out = { };
						var _g41 = s2.x1;
						var _g31 = s2.x2 + 1;
						while(_g41 < _g31) {
							var x1 = _g41++;
							var c1 = this.cursor.s.columns[x1];
							var v = Reflect.field(obj1,c1.name);
							if(v != null) out[c1.name] = v;
						}
						data.push(out);
					}
					this.setClipBoard((function($this) {
						var $r;
						var _g12 = [];
						{
							var _g32 = s2.x1;
							var _g22 = s2.x2 + 1;
							while(_g32 < _g22) {
								var x2 = _g32++;
								_g12.push($this.cursor.s.columns[x2]);
							}
						}
						$r = _g12;
						return $r;
					}(this)),data);
				}
			} else {
			}
			break;
		case 88:
			if(e.ctrlKey) {
				this.onKey({ keyCode : 67, ctrlKey : true});
				this.onKey({ keyCode : 46});
			} else {
			}
			break;
		case 86:
			if(e.ctrlKey) {
				if(this.cursor.s == null || this.clipboard == null || js_node_webkit_Clipboard.get().get("text") != this.clipboard.text) return;
				var sheet = this.cursor.s;
				var posX;
				if(this.cursor.x < 0) posX = 0; else posX = this.cursor.x;
				var posY;
				if(this.cursor.y < 0) posY = 0; else posY = this.cursor.y;
				var _g13 = 0;
				var _g23 = this.clipboard.data;
				while(_g13 < _g23.length) {
					var obj11 = _g23[_g13];
					++_g13;
					if(posY == sheet.lines.length) SheetData.newLine(sheet);
					var obj2 = sheet.lines[posY];
					var _g42 = 0;
					var _g33 = this.clipboard.schema.length;
					while(_g42 < _g33) {
						var cid = _g42++;
						var c11 = this.clipboard.schema[cid];
						var c2 = sheet.columns[cid + posX];
						if(c2 == null) continue;
						var f = this.getConvFunction(c11.type,c2.type);
						var v1 = Reflect.field(obj11,c11.name);
						if(f == null) v1 = this.getDefault(c2); else {
							if(v1 != null) v1 = JSON.parse(JSON.stringify(v1));
							if(f.f != null) v1 = f.f(v1);
						}
						if(v1 == null && !c2.opt) v1 = this.getDefault(c2);
						if(v1 == null) Reflect.deleteField(obj2,c2.name); else obj2[c2.name] = v1;
					}
					posY++;
				}
				this.makeSheet(sheet);
				this.refresh();
				this.save();
			} else {
			}
			break;
		case 9:
			if(e.ctrlKey) {
				var sheets = this.data.sheets.filter(function(s3) {
					return !s3.props.hide;
				});
				var pos;
				pos = (this.level == null?Lambda.indexOf(sheets,this.viewSheet):sheets.length + Lambda.indexOf(this.levels,this.level)) + 1;
				var s4 = sheets[pos % (sheets.length + this.levels.length)];
				if(s4 != null) this.selectSheet(s4); else {
					var level = this.levels[pos - sheets.length];
					if(level != null) this.selectLevel(level);
				}
			} else this.moveCursor(e.shiftKey?-1:1,0,false,false);
			break;
		case 27:
			if(this.cursor.s != null && this.cursor.s.parent != null) {
				var p = this.cursor.s.parent;
				this.setCursor(p.sheet,p.column,p.line);
				$(".cursor").click();
			} else if(this.cursor.select != null) {
				this.cursor.select = null;
				this.updateCursor();
			}
			break;
		case 113:
			if(inCDB) $(".cursor").not(".edit").dblclick(); else {
			}
			break;
		case 114:
			if(this.cursor.s != null) this.showReferences(this.cursor.s,this.cursor.y);
			break;
		case 115:
			if(this.cursor.s != null && this.cursor.x >= 0) {
				var c3 = this.cursor.s.columns[this.cursor.x];
				var id = Reflect.field(this.cursor.s.lines[this.cursor.y],c3.name);
				{
					var _g14 = c3.type;
					switch(_g14[1]) {
					case 6:
						var s5 = _g14[2];
						var sd = this.smap.get(s5);
						if(sd != null) {
							var k = sd.index.get(id);
							if(k != null) {
								var index = Lambda.indexOf(sd.s.lines,k.obj);
								if(index >= 0) {
									this.sheetCursors.set(s5,{ s : sd.s, x : 0, y : index});
									this.selectSheet(sd.s);
								}
							}
						}
						break;
					default:
					}
				}
			}
			break;
		default:
		}
		if(this.level != null) this.level.onKey(e);
		if(this.pages.curPage >= 0) this.pages.onKey(e);
	}
	,onKeyUp: function(e) {
		if(this.level != null && !this.isInput()) this.level.onKeyUp(e);
	}
	,getLine: function(sheet,index) {
		return $("table[sheet='" + SheetData.getPath(sheet) + "'] > tbody > tr").not(".head,.separator,.list").eq(index);
	}
	,showReferences: function(sheet,index) {
		var _g3 = this;
		var results = SheetData.getReferences(sheet,index);
		if(results == null) return;
		if(results.length == 0) {
			this.setErrorMessage("Not found");
			haxe_Timer.delay((function(f) {
				return function() {
					f();
				};
			})($bind(this,this.setErrorMessage)),500);
			return;
		}
		var line = this.getLine(sheet,index);
		line.next("tr.list").change();
		var res = $("<tr>").addClass("list");
		$("<td>").appendTo(res);
		var cell = $("<td>").attr("colspan","" + (sheet.columns.length + (sheet.props.level != null?1:0))).appendTo(res);
		var div = $("<div>").appendTo(cell);
		div.hide();
		var content = $("<table>").appendTo(div);
		var cols = $("<tr>").addClass("head");
		$("<td>").addClass("start").appendTo(cols).click(function(_) {
			res.change();
		});
		var _g = 0;
		var _g1 = ["path","id"];
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			$("<td>").text(name).appendTo(cols);
		}
		content.append(cols);
		var index1 = 0;
		var _g2 = 0;
		while(_g2 < results.length) {
			var rs = [results[_g2]];
			++_g2;
			var l = $("<tr>").appendTo(content).addClass("clickable");
			$("<td>").text("" + index1++).appendTo(l);
			var slast = [rs[0].s[rs[0].s.length - 1]];
			$("<td>").text(slast[0].s.name.split("@").join(".") + "." + slast[0].c).appendTo(l);
			var path = [];
			var _g21 = 0;
			var _g11 = rs[0].s.length;
			while(_g21 < _g11) {
				var i = _g21++;
				var s = rs[0].s[i];
				var oid = Reflect.field(rs[0].o.path[i],s.id);
				if(oid == null || oid == "") path.push(s.s.name.split("@").pop() + "[" + rs[0].o.indexes[i] + "]"); else path.push(oid);
			}
			$("<td>").text(path.join(".")).appendTo(l);
			l.click((function(slast,rs) {
				return function(e) {
					var key = null;
					var _g22 = 0;
					var _g12 = rs[0].s.length - 1;
					while(_g22 < _g12) {
						var i1 = _g22++;
						var p = rs[0].s[i1];
						key = SheetData.getPath(p.s) + "@" + p.c + ":" + rs[0].o.indexes[i1];
						_g3.openedList.set(key,true);
					}
					var starget = rs[0].s[0].s;
					_g3.sheetCursors.set(starget.name,{ s : { name : slast[0].s.name, path : key, separators : [], lines : [], columns : [], props : { }}, x : -1, y : rs[0].o.indexes[rs[0].o.indexes.length - 1]});
					_g3.selectSheet(starget);
					e.stopPropagation();
				};
			})(slast,rs));
		}
		res.change(function(e1) {
			div.slideUp(100,function() {
				res.remove();
			});
			e1.stopPropagation();
		});
		res.insertAfter(line);
		div.slideDown(100);
	}
	,moveLine: function(sheet,index,delta) {
		this.getLine(sheet,index).next("tr.list").change();
		var index1 = SheetData.moveLine(sheet,index,delta);
		if(index1 != null) {
			this.setCursor(sheet,-1,index1,null,false);
			this.refresh();
			this.save();
		}
	}
	,changed: function(sheet,c,index,old) {
		var _g = c.type;
		switch(_g[1]) {
		case 7:
			this.saveImages();
			break;
		case 14:
			var obj = sheet.lines[index];
			var oldV = old;
			var newV = Reflect.field(obj,c.name);
			if(newV != null && oldV != null && oldV.file != newV.file && !sys_FileSystem.exists(this.getAbsPath(oldV.file)) && sys_FileSystem.exists(this.getAbsPath(newV.file))) {
				var change = false;
				var _g2 = 0;
				var _g1 = sheet.lines.length;
				while(_g2 < _g1) {
					var i = _g2++;
					var t = Reflect.field(sheet.lines[i],c.name);
					if(t != null && t.file == oldV.file) {
						t.file = newV.file;
						change = true;
					}
				}
				if(change) this.refresh();
			}
			break;
		default:
			SheetData.updateValue(sheet,c,index,old);
		}
		this.save();
	}
	,setErrorMessage: function(msg) {
		if(msg == null) $(".errorMsg").hide(); else $(".errorMsg").text(msg).show();
	}
	,tileHtml: function(v,isInline) {
		var path = this.getAbsPath(v.file);
		if(!this.quickExists(path)) {
			if(isInline) return "";
			return "<span class=\"error\">" + v.file + "</span>";
		}
		var id = Main.UID++;
		var width;
		width = v.size * (v.width == null?1:v.width);
		var height;
		height = v.size * (v.height == null?1:v.height);
		var max;
		if(width > height) max = width; else max = height;
		var zoom;
		if(max < 64) zoom = 2; else zoom = 128 / max;
		var html;
		html = "<div id=\"_c" + id + "\" style=\"width : " + (width * zoom | 0) + "px; height : " + (height * zoom | 0) + "px; background : url('" + path + "') -" + (v.size * v.x * zoom | 0) + "px -" + (v.size * v.y * zoom | 0) + "px; " + (isInline?"display:inline-block;":"border : 1px solid #888;") + "\"></div>";
		html += "<img src=\"" + path + "\" style=\"display:none\" onload=\"$('#_c" + id + "').css({backgroundSize : ((this.width*" + zoom + ")|0)+'px ' + ((this.height*" + zoom + ")|0)+'px' " + (zoom > 1?", imageRendering : 'pixelated'":"") + "}); if( this.parentNode != null ) this.parentNode.removeChild(this)\"/>";
		return html;
	}
	,valueHtml: function(c,v,sheet,obj) {
		if(v == null) {
			if(c.opt) return "&nbsp;";
			return "<span class=\"error\">#NULL</span>";
		}
		{
			var _g = c.type;
			switch(_g[1]) {
			case 3:case 4:
				var _g1 = c.display;
				if(_g1 != null) switch(_g1) {
				case 1:
					return Math.round(v * 10000) / 100 + "%";
				default:
					return Std.string(v) + "";
				} else return Std.string(v) + "";
				break;
			case 0:
				if(v == "") return "<span class=\"error\">#MISSING</span>"; else if(((function($this) {
					var $r;
					var this1 = $this.smap.get(sheet.name).index;
					var key = v;
					$r = this1.get(key);
					return $r;
				}(this))).obj == obj) return v; else return "<span class=\"error\">#DUP(" + Std.string(v) + ")</span>";
				break;
			case 1:case 12:
				if(v == "") return "&nbsp;"; else return StringTools.htmlEscape(v);
				break;
			case 6:
				var sname = _g[2];
				if(v == "") return "<span class=\"error\">#MISSING</span>"; else {
					var s = this.smap.get(sname);
					var i;
					var key1 = v;
					i = s.index.get(key1);
					if(i == null) return "<span class=\"error\">#REF(" + Std.string(v) + ")</span>"; else return (i.ico == null?"":this.tileHtml(i.ico,true) + " ") + StringTools.htmlEscape(i.disp);
				}
				break;
			case 2:
				if(v) return "Y"; else return "N";
				break;
			case 5:
				var values = _g[2];
				return values[v];
			case 7:
				if(v == "") return "<span class=\"error\">#MISSING</span>"; else {
					var imgStr = v;
					if(imgStr.indexOf(":") >= 0) {
						var len = imgStr.indexOf(":");
						imgStr = HxOverrides.substr(imgStr,0,len);
					}
					var data = Reflect.field(this.imageBank,imgStr);
					if(data == null) {
						this.error(imgStr);
						return "<span class=\"error\">#DEADIMAGE(" + Std.string(v) + ")</span>";
					} else return "<img src=\"" + data + "\"/>";
				}
				break;
			case 8:
				var a = v;
				var ps = SheetData.model.smap.get(sheet.name + "@" + c.name).s;
				var out = [];
				var size = 0;
				var _g11 = 0;
				while(_g11 < a.length) {
					var v1 = a[_g11];
					++_g11;
					var vals = [];
					var _g2 = 0;
					var _g3 = ps.columns;
					while(_g2 < _g3.length) {
						var c1 = _g3[_g2];
						++_g2;
						var _g4 = c1.type;
						switch(_g4[1]) {
						case 8:
							continue;
							break;
						default:
							vals.push(this.valueHtml(c1,Reflect.field(v1,c1.name),ps,v1));
						}
					}
					var v2;
					if(vals.length == 1) v2 = vals[0]; else v2 = "" + Std.string(vals);
					if(size > 100) {
						out.push("...");
						break;
					}
					size += v2.length;
					out.push(v2);
				}
				return Std.string(out);
			case 9:
				var name = _g[2];
				var t = this.tmap.get(name);
				var a1 = v;
				var cas = t.cases[a1[0]];
				var str = cas.name;
				if(cas.args.length > 0) {
					str += "(";
					var out1 = [];
					var pos = 1;
					var _g21 = 1;
					var _g12 = a1.length;
					while(_g21 < _g12) {
						var i1 = _g21++;
						out1.push(this.valueHtml(cas.args[i1 - 1],a1[i1],sheet,this));
					}
					str += out1.join(",");
					str += ")";
				}
				return str;
			case 10:
				var values1 = _g[2];
				var v3 = v;
				var flags = [];
				var _g22 = 0;
				var _g13 = values1.length;
				while(_g22 < _g13) {
					var i2 = _g22++;
					if((v3 & 1 << i2) != 0) flags.push(StringTools.htmlEscape(values1[i2]));
				}
				if(flags.length == 0) return String.fromCharCode(8709); else return flags.join("|");
				break;
			case 11:
				var id = Main.UID++;
				return "<div class=\"color\" style=\"background-color:#" + StringTools.hex(v,6) + "\"></div>";
			case 13:
				var path = this.getAbsPath(v);
				var ext = v.split(".").pop().toLowerCase();
				var html;
				if(v == "") html = "<span class=\"error\">#MISSING</span>"; else html = StringTools.htmlEscape(v);
				if(v != "" && !this.quickExists(path)) html = "<span class=\"error\">" + html + "</span>"; else if(ext == "png" || ext == "jpg" || ext == "jpeg" || ext == "gif") html = "<span class=\"preview\">" + html + "<div class=\"previewContent\"><div class=\"label\"></div><img src=\"" + path + "\" onload=\"$(this).parent().find('.label').text(this.width+'x'+this.height)\"/></div></span>";
				if(v != "") html += " <input type=\"submit\" value=\"open\" onclick=\"_.openFile('" + path + "')\"/>";
				return html;
			case 14:
				return this.tileHtml(v);
			case 15:
				var v4 = v;
				var path1 = this.getAbsPath(v4.file);
				if(!this.quickExists(path1)) return "<span class=\"error\">" + v4.file + "</span>"; else return "#DATA";
				break;
			case 16:
				var str1 = Std.string(v).split("\n").join(" ").split("\t").join("");
				if(str1.length > 50) str1 = HxOverrides.substr(str1,0,47) + "...";
				return str1;
			}
		}
	}
	,popupLine: function(sheet,index) {
		var _g = this;
		var n = new js_node_webkit_Menu();
		var nup = new js_node_webkit_MenuItem({ label : "Move Up"});
		var ndown = new js_node_webkit_MenuItem({ label : "Move Down"});
		var nins = new js_node_webkit_MenuItem({ label : "Insert"});
		var ndel = new js_node_webkit_MenuItem({ label : "Delete"});
		var nsep = new js_node_webkit_MenuItem({ label : "Separator", type : "checkbox"});
		var nref = new js_node_webkit_MenuItem({ label : "Show References"});
		var _g1 = 0;
		var _g11 = [nup,ndown,nins,ndel,nsep,nref];
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			n.append(m);
		}
		var sepIndex = Lambda.indexOf(sheet.separators,index);
		nsep.checked = sepIndex >= 0;
		nins.click = function() {
			_g.newLine(sheet,index);
		};
		nup.click = function() {
			_g.moveLine(sheet,index,-1);
		};
		ndown.click = function() {
			_g.moveLine(sheet,index,1);
		};
		ndel.click = function() {
			SheetData.deleteLine(sheet,index);
			_g.refresh();
			_g.save();
		};
		nsep.click = function() {
			if(sepIndex >= 0) {
				sheet.separators.splice(sepIndex,1);
				if(sheet.props.separatorTitles != null) sheet.props.separatorTitles.splice(sepIndex,1);
			} else {
				sepIndex = sheet.separators.length;
				var _g12 = 0;
				var _g2 = sheet.separators.length;
				while(_g12 < _g2) {
					var i = _g12++;
					if(sheet.separators[i] > index) {
						sepIndex = i;
						break;
					}
				}
				sheet.separators.splice(sepIndex,0,index);
				if(sheet.props.separatorTitles != null && sheet.props.separatorTitles.length > sepIndex) sheet.props.separatorTitles.splice(sepIndex,0,null);
			}
			_g.refresh();
			_g.save();
		};
		nref.click = function() {
			_g.showReferences(sheet,index);
		};
		if(sheet.props.hide) nsep.enabled = false;
		n.popup(this.mousePos.x,this.mousePos.y);
	}
	,popupColumn: function(sheet,c) {
		var _g4 = this;
		var n = new js_node_webkit_Menu();
		var nedit = new js_node_webkit_MenuItem({ label : "Edit"});
		var nins = new js_node_webkit_MenuItem({ label : "Add Column"});
		var nleft = new js_node_webkit_MenuItem({ label : "Move Left"});
		var nright = new js_node_webkit_MenuItem({ label : "Move Right"});
		var ndel = new js_node_webkit_MenuItem({ label : "Delete"});
		var ndisp = new js_node_webkit_MenuItem({ label : "Display Column", type : "checkbox"});
		var nicon = new js_node_webkit_MenuItem({ label : "Display Icon", type : "checkbox"});
		var _g = 0;
		var _g1 = [nedit,nins,nleft,nright,ndel,ndisp,nicon];
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			n.append(m);
		}
		{
			var _g2 = c.type;
			switch(_g2[1]) {
			case 0:case 1:case 5:case 10:
				var conv = new js_node_webkit_MenuItem({ label : "Convert"});
				var cm = new js_node_webkit_Menu();
				var _g11 = 0;
				var _g21 = [{ n : "lowercase", f : function(s) {
					return s.toLowerCase();
				}},{ n : "UPPERCASE", f : function(s1) {
					return s1.toUpperCase();
				}},{ n : "UpperIdent", f : function(s2) {
					return HxOverrides.substr(s2,0,1).toUpperCase() + HxOverrides.substr(s2,1,null);
				}},{ n : "lowerIdent", f : function(s3) {
					return HxOverrides.substr(s3,0,1).toLowerCase() + HxOverrides.substr(s3,1,null);
				}}];
				while(_g11 < _g21.length) {
					var k = [_g21[_g11]];
					++_g11;
					var m1 = new js_node_webkit_MenuItem({ label : k[0].n});
					m1.click = (function(k) {
						return function() {
							{
								var _g3 = c.type;
								switch(_g3[1]) {
								case 5:
									var values = _g3[2];
									var _g5 = 0;
									var _g41 = values.length;
									while(_g5 < _g41) {
										var i = _g5++;
										values[i] = k[0].f(values[i]);
									}
									break;
								case 10:
									var values1 = _g3[2];
									var _g51 = 0;
									var _g42 = values1.length;
									while(_g51 < _g42) {
										var i1 = _g51++;
										values1[i1] = k[0].f(values1[i1]);
									}
									break;
								default:
									var refMap = new haxe_ds_StringMap();
									var _g43 = 0;
									var _g52 = SheetData.getLines(sheet);
									while(_g43 < _g52.length) {
										var obj = _g52[_g43];
										++_g43;
										var t = Reflect.field(obj,c.name);
										if(t != null && t != "") {
											var t2 = k[0].f(t);
											if(t2 == null && !c.opt) t2 = "";
											if(t2 == null) Reflect.deleteField(obj,c.name); else {
												obj[c.name] = t2;
												if(t2 != "") {
													if(__map_reserved[t] != null) refMap.setReserved(t,t2); else refMap.h[t] = t2;
												}
											}
										}
									}
									if(c.type == cdb_ColumnType.TId) _g4.updateRefs(sheet,refMap);
									_g4.makeSheet(sheet);
								}
							}
							_g4.refresh();
							_g4.save();
						};
					})(k);
					cm.append(m1);
				}
				conv.submenu = cm;
				n.append(conv);
				break;
			case 3:case 4:
				var conv1 = new js_node_webkit_MenuItem({ label : "Convert"});
				var cm1 = new js_node_webkit_Menu();
				var _g12 = 0;
				var _g22 = [{ n : "* 10", f : function(s4) {
					return s4 * 10;
				}},{ n : "/ 10", f : function(s5) {
					return s5 / 10;
				}},{ n : "+ 1", f : function(s6) {
					return s6 + 1;
				}},{ n : "- 1", f : function(s7) {
					return s7 - 1;
				}}];
				while(_g12 < _g22.length) {
					var k1 = [_g22[_g12]];
					++_g12;
					var m2 = new js_node_webkit_MenuItem({ label : k1[0].n});
					m2.click = (function(k1) {
						return function() {
							var _g31 = 0;
							var _g44 = SheetData.getLines(sheet);
							while(_g31 < _g44.length) {
								var obj1 = _g44[_g31];
								++_g31;
								var t1 = Reflect.field(obj1,c.name);
								if(t1 != null) {
									var t21 = k1[0].f(t1);
									if(c.type == cdb_ColumnType.TInt) t21 = t21 | 0;
									obj1[c.name] = t21;
								}
							}
							_g4.refresh();
							_g4.save();
						};
					})(k1);
					cm1.append(m2);
				}
				conv1.submenu = cm1;
				n.append(conv1);
				break;
			default:
			}
		}
		ndisp.checked = sheet.props.displayColumn == c.name;
		nicon.checked = sheet.props.displayIcon == c.name;
		ndisp.enabled = false;
		nicon.enabled = false;
		{
			var _g6 = c.type;
			switch(_g6[1]) {
			case 1:case 6:
				ndisp.enabled = true;
				break;
			case 14:
				nicon.enabled = true;
				break;
			default:
			}
		}
		nedit.click = function() {
			_g4.newColumn(sheet.name,c);
		};
		nleft.click = function() {
			var index = Lambda.indexOf(sheet.columns,c);
			if(index > 0) {
				HxOverrides.remove(sheet.columns,c);
				sheet.columns.splice(index - 1,0,c);
				_g4.refresh();
				_g4.save();
			}
		};
		nright.click = function() {
			var index1 = Lambda.indexOf(sheet.columns,c);
			if(index1 < sheet.columns.length - 1) {
				HxOverrides.remove(sheet.columns,c);
				sheet.columns.splice(index1 + 1,0,c);
				_g4.refresh();
				_g4.save();
			}
		};
		ndel.click = function() {
			_g4.deleteColumn(sheet,c.name);
		};
		ndisp.click = function() {
			if(sheet.props.displayColumn == c.name) sheet.props.displayColumn = null; else sheet.props.displayColumn = c.name;
			_g4.makeSheet(sheet);
			_g4.refresh();
			_g4.save();
		};
		nicon.click = function() {
			if(sheet.props.displayIcon == c.name) sheet.props.displayIcon = null; else sheet.props.displayIcon = c.name;
			_g4.makeSheet(sheet);
			_g4.refresh();
			_g4.save();
		};
		nins.click = function() {
			_g4.newColumn(sheet.name,null,Lambda.indexOf(sheet.columns,c) + 1);
		};
		n.popup(this.mousePos.x,this.mousePos.y);
	}
	,popupSheet: function(s,li) {
		var _g = this;
		var n = new js_node_webkit_Menu();
		var nins = new js_node_webkit_MenuItem({ label : "Add Sheet"});
		var nleft = new js_node_webkit_MenuItem({ label : "Move Left"});
		var nright = new js_node_webkit_MenuItem({ label : "Move Right"});
		var nren = new js_node_webkit_MenuItem({ label : "Rename"});
		var ndel = new js_node_webkit_MenuItem({ label : "Delete"});
		var nindex = new js_node_webkit_MenuItem({ label : "Add Index", type : "checkbox"});
		var ngroup = new js_node_webkit_MenuItem({ label : "Add Group", type : "checkbox"});
		var _g1 = 0;
		var _g11 = [nins,nleft,nright,nren,ndel,nindex,ngroup];
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			n.append(m);
		}
		nleft.click = function() {
			var prev = -1;
			var _g2 = 0;
			var _g12 = _g.data.sheets.length;
			while(_g2 < _g12) {
				var i = _g2++;
				var s2 = _g.data.sheets[i];
				if(s == s2) break;
				if(!s2.props.hide) prev = i;
			}
			if(prev < 0) return;
			HxOverrides.remove(_g.data.sheets,s);
			_g.data.sheets.splice(prev,0,s);
			_g.prefs.curSheet = prev;
			_g.initContent();
			_g.save();
		};
		nright.click = function() {
			var found = null;
			var _g21 = 0;
			var _g13 = _g.data.sheets.length;
			while(_g21 < _g13) {
				var i1 = _g21++;
				var s21 = _g.data.sheets[i1];
				if(s == s21) found = -1; else if(!s21.props.hide && found != null) {
					found = i1;
					break;
				}
			}
			if(found == null || found < 0) return;
			HxOverrides.remove(_g.data.sheets,s);
			_g.data.sheets.splice(found,0,s);
			_g.prefs.curSheet = found;
			_g.initContent();
			_g.save();
		};
		ndel.click = function() {
			_g.deleteSheet(s);
			_g.initContent();
			_g.save();
		};
		nins.click = function() {
			_g.newSheet();
		};
		nindex.checked = s.props.hasIndex;
		nindex.click = function() {
			if(s.props.hasIndex) {
				var _g3 = 0;
				var _g14 = SheetData.getLines(s);
				while(_g3 < _g14.length) {
					var o = _g14[_g3];
					++_g3;
					Reflect.deleteField(o,"index");
				}
				s.props.hasIndex = false;
			} else {
				var _g4 = 0;
				var _g15 = s.columns;
				while(_g4 < _g15.length) {
					var c = _g15[_g4];
					++_g4;
					if(c.name == "index") {
						_g.error("Column 'index' already exists");
						return;
					}
				}
				s.props.hasIndex = true;
			}
			_g.save();
		};
		ngroup.checked = s.props.hasGroup;
		ngroup.click = function() {
			if(s.props.hasGroup) {
				var _g5 = 0;
				var _g16 = SheetData.getLines(s);
				while(_g5 < _g16.length) {
					var o1 = _g16[_g5];
					++_g5;
					Reflect.deleteField(o1,"group");
				}
				s.props.hasGroup = false;
			} else {
				var _g6 = 0;
				var _g17 = s.columns;
				while(_g6 < _g17.length) {
					var c1 = _g17[_g6];
					++_g6;
					if(c1.name == "group") {
						_g.error("Column 'group' already exists");
						return;
					}
				}
				s.props.hasGroup = true;
			}
			_g.save();
		};
		nren.click = function() {
			li.dblclick();
		};
		if(s.props.level != null || SheetData.hasColumn(s,"width",[cdb_ColumnType.TInt]) && SheetData.hasColumn(s,"height",[cdb_ColumnType.TInt]) && SheetData.hasColumn(s,"props",[cdb_ColumnType.TDynamic])) {
			var nlevel = new js_node_webkit_MenuItem({ label : "Level", type : "checkbox"});
			nlevel.checked = s.props.level != null;
			n.append(nlevel);
			nlevel.click = function() {
				if(s.props.level != null) Reflect.deleteField(s.props,"level"); else s.props.level = { tileSets : { }};
				_g.save();
				_g.refresh();
			};
		}
		n.popup(this.mousePos.x,this.mousePos.y);
	}
	,editCell: function(c,v,sheet,index) {
		var _g = this;
		var obj = sheet.lines[index];
		var val = Reflect.field(obj,c.name);
		var old = val;
		var html = _g.valueHtml(c,val,sheet,obj);
		if(v.hasClass("edit")) return;
		var editDone = function() {
			v.html(html);
			v.removeClass("edit");
			_g.setErrorMessage();
		};
		{
			var _g1 = c.type;
			switch(_g1[1]) {
			case 3:case 4:case 1:case 0:case 9:case 16:
				v.empty();
				var i = $("<input>");
				v.addClass("edit");
				i.appendTo(v);
				if(val != null) {
					var _g11 = c.type;
					switch(_g11[1]) {
					case 9:
						var t = _g11[2];
						i.val(this.typeValToString(this.tmap.get(t),val));
						break;
					case 16:
						i.val(JSON.stringify(val));
						break;
					default:
						i.val("" + Std.string(val));
					}
				}
				i.change(function(e) {
					e.stopPropagation();
				});
				i.keydown(function(e1) {
					var _g12 = e1.keyCode;
					switch(_g12) {
					case 27:
						editDone();
						break;
					case 13:
						i.blur();
						e1.preventDefault();
						break;
					case 38:case 40:
						i.blur();
						return;
					case 9:
						i.blur();
						_g.moveCursor(e1.shiftKey?-1:1,0,false,false);
						haxe_Timer.delay(function() {
							$(".cursor").dblclick();
						},1);
						e1.preventDefault();
						break;
					default:
					}
					e1.stopPropagation();
				});
				i.blur(function(_) {
					var nv = i.val();
					var old1 = val;
					var prevObj;
					if(c.type == cdb_ColumnType.TId && old1 != null) {
						var this1 = _g.smap.get(sheet.name).index;
						var key = val;
						prevObj = this1.get(key);
					} else prevObj = null;
					var prevTarget = null;
					if(nv == "" && c.opt) {
						if(val != null) {
							val = html = null;
							Reflect.deleteField(obj,c.name);
							_g.changed(sheet,c,index,old);
						}
					} else {
						var val2;
						{
							var _g13 = c.type;
							switch(_g13[1]) {
							case 3:
								val2 = Std.parseInt(nv);
								break;
							case 4:
								var f = parseFloat(nv);
								if(isNaN(f)) val2 = null; else val2 = f;
								break;
							case 0:
								if(_g.r_ident.match(nv)) val2 = nv; else val2 = null;
								break;
							case 9:
								var t1 = _g13[2];
								try {
									val2 = _g.parseTypeVal(_g.tmap.get(t1),nv);
								} catch( e2 ) {
									if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
									val2 = null;
								}
								break;
							case 16:
								try {
									val2 = _g.parseDynamic(nv);
								} catch( e3 ) {
									if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
									val2 = null;
								}
								break;
							default:
								val2 = nv;
							}
						}
						if(val2 != val && val2 != null) {
							var this2 = _g.smap.get(sheet.name).index;
							var key1 = val2;
							prevTarget = this2.get(key1);
							if(c.type == cdb_ColumnType.TId && val != null && (prevObj == null || prevObj.obj == obj)) {
								var m = new haxe_ds_StringMap();
								var key2 = val;
								var value = val2;
								if(__map_reserved[key2] != null) m.setReserved(key2,value); else m.h[key2] = value;
								_g.updateRefs(sheet,m);
							}
							val = val2;
							obj[c.name] = val;
							_g.changed(sheet,c,index,old);
							html = _g.valueHtml(c,val,sheet,obj);
						}
					}
					editDone();
					if(c.type == cdb_ColumnType.TId && prevObj != null && old1 != val && (prevObj.obj == obj && (function($this) {
						var $r;
						var this3 = _g.smap.get(sheet.name).index;
						$r = this3.get(old1);
						return $r;
					}(this)) != null || prevTarget != null && ((function($this) {
						var $r;
						var this4 = _g.smap.get(sheet.name).index;
						var key3 = val;
						$r = this4.get(key3);
						return $r;
					}(this))).obj != prevTarget.obj)) {
						_g.refresh();
						return;
					}
				});
				{
					var _g14 = c.type;
					switch(_g14[1]) {
					case 9:
						var t2 = _g14[2];
						var t3 = this.tmap.get(t2);
						i.keyup(function(_1) {
							var str = i.val();
							try {
								if(str != "") _g.parseTypeVal(t3,str);
								_g.setErrorMessage();
								i.removeClass("error");
							} catch( msg ) {
								if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
								if( js_Boot.__instanceof(msg,String) ) {
									_g.setErrorMessage(msg);
									i.addClass("error");
								} else throw(msg);
							}
						});
						break;
					default:
					}
				}
				i.focus();
				i.select();
				break;
			case 5:
				var values = _g1[2];
				v.empty();
				var s = $("<select>");
				v.addClass("edit");
				var _g2 = 0;
				var _g15 = values.length;
				while(_g2 < _g15) {
					var i1 = _g2++;
					$("<option>").attr("value","" + i1).attr(val == i1?"selected":"_sel","selected").text(values[i1]).appendTo(s);
				}
				if(c.opt) $("<option>").attr("value","-1").text("--- None ---").prependTo(s);
				v.append(s);
				s.change(function(e4) {
					val = Std.parseInt(s.val());
					if(val < 0) {
						val = null;
						Reflect.deleteField(obj,c.name);
					} else obj[c.name] = val;
					html = _g.valueHtml(c,val,sheet,obj);
					_g.changed(sheet,c,index,old);
					editDone();
					e4.stopPropagation();
				});
				s.keydown(function(e5) {
					var _g16 = e5.keyCode;
					switch(_g16) {
					case 37:case 39:
						s.blur();
						return;
					case 9:
						s.blur();
						_g.moveCursor(e5.shiftKey?-1:1,0,false,false);
						haxe_Timer.delay(function() {
							$(".cursor").dblclick();
						},1);
						e5.preventDefault();
						break;
					default:
					}
					e5.stopPropagation();
				});
				s.blur(function(_2) {
					editDone();
				});
				s.focus();
				var event = window.document.createEvent("MouseEvents");
				event.initMouseEvent("mousedown",true,true,window);
				s[0].dispatchEvent(event);
				break;
			case 6:
				var sname = _g1[2];
				var sdat = this.smap.get(sname);
				if(sdat == null) return;
				v.empty();
				v.addClass("edit");
				var s1 = $("<select>");
				var elts;
				var _g17 = [];
				var _g21 = 0;
				var _g3 = sdat.all;
				while(_g21 < _g3.length) {
					var d = _g3[_g21];
					++_g21;
					_g17.push({ id : d.id, ico : d.ico, text : d.disp});
				}
				elts = _g17;
				if(c.opt || val == null || val == "") elts.unshift({ id : "~", ico : null, text : "--- None ---"});
				v.append(s1);
				s1.change(function(e6) {
					e6.stopPropagation();
				});
				var props = { data : elts};
				if(sdat.s.props.displayIcon != null) {
					var buildElement = function(i2) {
						var text = StringTools.htmlEscape(i2.text);
						return $("<div>" + (i2.ico == null?"<div style='display:inline-block;width:16px'/>":_g.tileHtml(i2.ico,true)) + " " + text + "</div>");
					};
					props.templateResult = props.templateSelection = buildElement;
				}
				s1.select2(props);
				s1.select2("val",val == null?"":val);
				s1.select2("open");
				s1.change(function(e7) {
					val = s1.val();
					if(val == "~") {
						val = null;
						Reflect.deleteField(obj,c.name);
					} else obj[c.name] = val;
					html = _g.valueHtml(c,val,sheet,obj);
					_g.changed(sheet,c,index,old);
					editDone();
				});
				s1.on("select2:close",null,function(_3) {
					editDone();
				});
				break;
			case 2:
				if(c.opt && val == false) {
					val = null;
					Reflect.deleteField(obj,c.name);
				} else {
					val = !val;
					obj[c.name] = val;
				}
				v.html(_g.valueHtml(c,val,sheet,obj));
				_g.changed(sheet,c,index,old);
				break;
			case 7:
				var i3 = $("<input>").attr("type","file").css("display","none").change(function(e8) {
					var j = $(this);
					var file = j.val();
					var ext = file.split(".").pop().toLowerCase();
					if(ext == "jpeg") ext = "jpg";
					if(ext != "png" && ext != "gif" && ext != "jpg") {
						_g.error("Unsupported image extension " + ext);
						return;
					}
					_g.error(file);
					if(!sys_FileSystem.exists(file)) {
						_g.error("File does not exist: " + file);
						return;
					}
					try {
						var outerBytes = sys_io_File.getBytes(file);
					} catch( e9 ) {
						if (e9 instanceof js__$Boot_HaxeError) e9 = e9.val;
						_g.error(Std.string(e9));
					}
					var bytes = sys_io_File.getBytes(file);
					_g.error("Got bytes");
					var md5 = haxe_crypto_Md5.make(bytes).toHex();
					if(_g.imageBank == null) {
						_g.error("Creating image bank");
						_g.imageBank = { };
					}
					if(!Object.prototype.hasOwnProperty.call(_g.imageBank,md5)) {
						var data = "data:image/" + ext + ";base64," + new haxe_crypto_BaseCode(haxe_io_Bytes.ofString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")).encodeBytes(bytes).toString();
						_g.error("Setting image");
						_g.imageBank[md5] = data;
					} else _g.error("no field for image");
					val = md5;
					obj[c.name] = Std.string(val) + ":" + file;
					v.html(_g.valueHtml(c,val,sheet,obj));
					_g.changed(sheet,c,index,old);
					j.remove();
				});
				i3.appendTo($("body"));
				i3.click();
				break;
			case 10:
				var values1 = _g1[2];
				var div = $("<div>").addClass("flagValues");
				div.click(function(e10) {
					e10.stopPropagation();
				}).dblclick(function(e11) {
					e11.stopPropagation();
				});
				var _g22 = 0;
				var _g18 = values1.length;
				while(_g22 < _g18) {
					var i4 = [_g22++];
					var f1 = $("<input>").attr("type","checkbox").prop("checked",(val & 1 << i4[0]) != 0).change((function(i4) {
						return function(e12) {
							val &= ~(1 << i4[0]);
							if($(this).prop("checked")) val |= 1 << i4[0];
							e12.stopPropagation();
						};
					})(i4));
					$("<label>").text(values1[i4[0]]).appendTo(div).append(f1);
				}
				v.empty();
				v.append(div);
				this.cursor.onchange = function() {
					if(c.opt && val == 0) {
						val = null;
						Reflect.deleteField(obj,c.name);
					} else obj[c.name] = val;
					html = _g.valueHtml(c,val,sheet,obj);
					editDone();
					_g.save();
				};
				break;
			case 15:
				break;
			case 11:
				var id = Std.random(1);
				v.html("<div class=\"modal\" onclick=\"$('#_c" + id + "').spectrum('toggle')\"></div><input type=\"text\" id=\"_c" + id + "\"/>");
				var spect = $("#_c" + id);
				spect.spectrum({ color : "#" + StringTools.hex(val,6), showInput : true, showButtons : false, change : function() {
					spect.spectrum("hide");
				}, hide : function(vcol) {
					var color = Std.parseInt("0x" + Std.string(vcol.toHex()));
					val = color;
					obj[c.name] = color;
					v.html(_g.valueHtml(c,val,sheet,obj));
					_g.save();
				}}).spectrum("show");
				break;
			case 8:case 12:case 13:case 14:
				throw new js__$Boot_HaxeError("assert2");
				break;
			}
		}
	}
	,updateCursor: function() {
		$(".selected").removeClass("selected");
		$(".cursor").removeClass("cursor");
		if(this.cursor.s == null) return;
		if(this.cursor.y < 0) {
			this.cursor.y = 0;
			this.cursor.select = null;
		}
		if(this.cursor.y >= this.cursor.s.lines.length) {
			this.cursor.y = this.cursor.s.lines.length - 1;
			this.cursor.select = null;
		}
		if(this.cursor.x >= this.cursor.s.columns.length) {
			this.cursor.x = this.cursor.s.columns.length - 1;
			this.cursor.select = null;
		}
		var l = this.getLine(this.cursor.s,this.cursor.y);
		if(this.cursor.x < 0) {
			l.addClass("selected");
			if(this.cursor.select != null) {
				var y = this.cursor.y;
				while(this.cursor.select.y != y) {
					if(this.cursor.select.y > y) y++; else y--;
					this.getLine(this.cursor.s,y).addClass("selected");
				}
			}
		} else {
			l.find("td.c").eq(this.cursor.x).addClass("cursor");
			if(this.cursor.select != null) {
				var s = this.getSelection();
				var _g1 = s.y1;
				var _g = s.y2 + 1;
				while(_g1 < _g) {
					var y1 = _g1++;
					this.getLine(this.cursor.s,y1).find("td.c").slice(s.x1,s.x2 + 1).addClass("selected");
				}
			}
		}
		var e = l[0];
		if(e != null) e.scrollIntoViewIfNeeded();
	}
	,refresh: function() {
		var t = $("<table>");
		this.checkCursor = true;
		this.fillTable(t,this.viewSheet);
		if(this.cursor.s != this.viewSheet && this.checkCursor) this.setCursor(this.viewSheet,null,null,null,false);
		var content = $("#content");
		content.empty();
		t.appendTo(content);
		$("<div>").appendTo(content).addClass("tableBottom");
		this.updateCursor();
	}
	,chooseFile: function(callb,cancel) {
		var _g = this;
		if(this.prefs.curFile == null) {
			this.error("Please save CDB file first");
			if(cancel != null) cancel();
			return;
		}
		var fs = $("#fileSelect");
		if(fs.attr("nwworkingdir") == null) fs.attr("nwworkingdir",new haxe_io_Path(this.prefs.curFile).dir);
		fs.change(function(_) {
			fs.unbind("change");
			var path = fs.val().split("\\").join("/");
			fs.val("");
			if(path == "") {
				if(cancel != null) cancel();
				return;
			}
			fs.attr("nwworkingdir","");
			var parts = path.split("/");
			var base = _g.prefs.curFile.split("\\").join("/").split("/");
			base.pop();
			while(parts.length > 1 && base.length > 0 && parts[0] == base[0]) {
				parts.shift();
				base.shift();
			}
			if(parts.length == 0 || parts[0] != "" && parts[0].charAt(1) != ":") while(base.length > 0) {
				parts.unshift("..");
				base.pop();
			}
			var relPath = parts.join("/");
			callb(relPath);
		}).click();
	}
	,fillTable: function(content,sheet) {
		var _g4 = this;
		if(sheet.columns.length == 0) {
			content.html("<a href=\"javascript:_.newColumn('" + sheet.name + "')\">Add a column</a>");
			return;
		}
		var todo = [];
		var inTodo = false;
		var cols = $("<tr>").addClass("head");
		var types;
		var _g = [];
		var _g1 = 0;
		var _g2 = Type.getEnumConstructs(cdb_ColumnType);
		while(_g1 < _g2.length) {
			var t = _g2[_g1];
			++_g1;
			_g.push(HxOverrides.substr(t,1,null).toLowerCase());
		}
		types = _g;
		$("<td>").addClass("start").appendTo(cols).click(function(_) {
			if(sheet.props.hide) content.change(); else $("tr.list table").change();
		});
		content.addClass("sheet");
		content.attr("sheet",SheetData.getPath(sheet));
		content.click(function(e) {
			e.stopPropagation();
		});
		var lines;
		var _g11 = [];
		var _g3 = 0;
		var _g21 = sheet.lines.length;
		while(_g3 < _g21) {
			var i = [_g3++];
			_g11.push((function($this) {
				var $r;
				var l = $("<tr>");
				l.data("index",i[0]);
				var head = [$("<td>").addClass("start").text("" + i[0])];
				l.mousedown((function(head,i) {
					return function(e1) {
						if(e1.which == 3) {
							head[0].click();
							haxe_Timer.delay(((function() {
								return function(f,a1,a2) {
									return (function() {
										return function() {
											f(a1,a2);
										};
									})();
								};
							})())($bind(_g4,_g4.popupLine),sheet,i[0]),1);
							e1.preventDefault();
							return;
						}
					};
				})(head,i)).click((function(i) {
					return function(e2) {
						if(e2.shiftKey && _g4.cursor.s == sheet && _g4.cursor.x < 0) {
							_g4.cursor.select = { x : -1, y : i[0]};
							_g4.updateCursor();
						} else _g4.setCursor(sheet,-1,i[0]);
					};
				})(i));
				head[0].appendTo(l);
				$r = l;
				return $r;
			}(this)));
		}
		lines = _g11;
		var colCount = sheet.columns.length;
		if(sheet.props.level != null) colCount++;
		var _g31 = 0;
		var _g22 = sheet.columns.length;
		while(_g31 < _g22) {
			var cindex = [_g31++];
			var c = [sheet.columns[cindex[0]]];
			var col = $("<td>");
			col.text(c[0].name);
			col.css("width",(100 / colCount | 0) + "%");
			if(sheet.props.displayColumn == c[0].name) col.addClass("display");
			col.mousedown((function(c) {
				return function(e3) {
					if(e3.which == 3) {
						haxe_Timer.delay(((function() {
							return function(f1,a11,c1) {
								return (function() {
									return function() {
										f1(a11,c1);
									};
								})();
							};
						})())($bind(_g4,_g4.popupColumn),sheet,c[0]),1);
						e3.preventDefault();
						return;
					}
				};
			})(c));
			col.dblclick((function(c) {
				return function(_1) {
					_g4.newColumn(sheet.name,c[0]);
				};
			})(c));
			cols.append(col);
			var ctype = "t_" + types[c[0].type[1]];
			var _g5 = 0;
			var _g41 = sheet.lines.length;
			while(_g5 < _g41) {
				var index = [_g5++];
				var obj = [sheet.lines[index[0]]];
				var val = [Reflect.field(obj[0],c[0].name)];
				var v = [$("<td>").addClass(ctype).addClass("c")];
				var l1 = [lines[index[0]]];
				v[0].appendTo(l1[0]);
				var html = [this.valueHtml(c[0],val[0],sheet,obj[0])];
				if(html[0] == "&nbsp;") v[0].text(" "); else if(html[0].indexOf("<") < 0 && html[0].indexOf("&") < 0) v[0].text(html[0]); else v[0].html(html[0]);
				v[0].data("index",cindex[0]);
				v[0].click((function(index,cindex) {
					return function(e4) {
						if(inTodo) {
						} else if(e4.shiftKey && _g4.cursor.s == sheet) {
							_g4.cursor.select = { x : cindex[0], y : index[0]};
							_g4.updateCursor();
							e4.stopImmediatePropagation();
						} else _g4.setCursor(sheet,cindex[0],index[0]);
						e4.stopPropagation();
					};
				})(index,cindex));
				var set = [(function(html,v,val,obj,index,c) {
					return function(val2) {
						var old = val[0];
						val[0] = val2;
						if(val[0] == null) Reflect.deleteField(obj[0],c[0].name); else obj[0][c[0].name] = val[0];
						html[0] = _g4.valueHtml(c[0],val[0],sheet,obj[0]);
						v[0].html(html[0]);
						_g4.changed(sheet,c[0],index[0],old);
					};
				})(html,v,val,obj,index,c)];
				{
					var _g6 = c[0].type;
					switch(_g6[1]) {
					case 7:
						v[0].find("img").addClass("deletable").change((function(obj,c) {
							return function(e5) {
								if(Reflect.field(obj[0],c[0].name) != null) {
									Reflect.deleteField(obj[0],c[0].name);
									_g4.refresh();
									_g4.save();
								}
							};
						})(obj,c)).click((function() {
							return function(e6) {
								$(this).addClass("selected");
								e6.stopPropagation();
							};
						})());
						v[0].dblclick((function(v,index,c) {
							return function(_2) {
								_g4.editCell(c[0],v[0],sheet,index[0]);
							};
						})(v,index,c));
						break;
					case 8:
						var key = [SheetData.getPath(sheet) + "@" + c[0].name + ":" + index[0]];
						v[0].click((function(key,html,l1,v,val,obj,index,c,cindex) {
							return function(e7) {
								var next = l1[0].next("tr.list");
								if(next.length > 0) {
									if(next.data("name") == c[0].name) {
										next.change();
										return;
									}
									next.change();
								}
								next = $("<tr>").addClass("list").data("name",c[0].name);
								$("<td>").appendTo(next);
								var cell = $("<td>").attr("colspan","" + colCount).appendTo(next);
								var div = $("<div>").appendTo(cell);
								if(!inTodo) div.hide();
								var content1 = $("<table>").appendTo(div);
								var psheet = SheetData.model.smap.get(sheet.name + "@" + c[0].name).s;
								if(val[0] == null) {
									val[0] = [];
									obj[0][c[0].name] = val[0];
								}
								psheet = { columns : psheet.columns, props : psheet.props, name : psheet.name, path : key[0], parent : { sheet : sheet, column : cindex[0], line : index[0]}, lines : val[0], separators : []};
								_g4.fillTable(content1,psheet);
								next.insertAfter(l1[0]);
								v[0].text("...");
								_g4.openedList.set(key[0],true);
								next.change((function(key,html,v,val,obj,c) {
									return function(e8) {
										if(c[0].opt && val[0].length == 0) {
											val[0] = null;
											Reflect.deleteField(obj[0],c[0].name);
										}
										html[0] = _g4.valueHtml(c[0],val[0],sheet,obj[0]);
										v[0].html(html[0]);
										div.slideUp(100,(function() {
											return function() {
												next.remove();
											};
										})());
										_g4.openedList.remove(key[0]);
										e8.stopPropagation();
									};
								})(key,html,v,val,obj,c));
								if(inTodo) {
									if(_g4.cursor.s != null && SheetData.getPath(_g4.cursor.s) == SheetData.getPath(psheet)) {
										_g4.cursor.s = psheet;
										_g4.checkCursor = false;
									}
								} else {
									div.slideDown(100);
									_g4.setCursor(psheet);
								}
								e7.stopPropagation();
							};
						})(key,html,l1,v,val,obj,index,c,cindex));
						if(this.openedList.get(key[0])) todo.push((function(v) {
							return function() {
								v[0].click();
							};
						})(v));
						break;
					case 12:
						break;
					case 13:
						v[0].find("input").addClass("deletable").change((function(obj,c) {
							return function(e9) {
								if(Reflect.field(obj[0],c[0].name) != null) {
									Reflect.deleteField(obj[0],c[0].name);
									_g4.refresh();
									_g4.save();
								}
							};
						})(obj,c));
						v[0].dblclick((function(set) {
							return function(_3) {
								_g4.chooseFile((function(set) {
									return function(path) {
										set[0](path);
										_g4.save();
									};
								})(set));
							};
						})(set));
						break;
					case 14:
						v[0].find("div").addClass("deletable").change((function(obj,c) {
							return function(e10) {
								if(Reflect.field(obj[0],c[0].name) != null) {
									Reflect.deleteField(obj[0],c[0].name);
									_g4.refresh();
									_g4.save();
								}
							};
						})(obj,c));
						v[0].dblclick((function(set,v,val,index,c) {
							return function(_4) {
								var rv = val[0];
								var file;
								if(rv == null) file = null; else file = rv.file;
								var size;
								if(rv == null) size = 16; else size = rv.size;
								var posX;
								if(rv == null) posX = 0; else posX = rv.x;
								var posY;
								if(rv == null) posY = 0; else posY = rv.y;
								var width;
								if(rv == null) width = null; else width = rv.width;
								var height;
								if(rv == null) height = null; else height = rv.height;
								if(width == null) width = 1;
								if(height == null) height = 1;
								if(file == null) {
									var i2 = index[0] - 1;
									while(i2 >= 0) {
										var o = sheet.lines[i2--];
										var v2 = Reflect.field(o,c[0].name);
										if(v2 != null) {
											file = v2.file;
											size = v2.size;
											break;
										}
									}
								}
								var setVal = (function(set) {
									return function() {
										var v1 = { file : file, size : size, x : posX, y : posY};
										if(width != 1) v1.width = width;
										if(height != 1) v1.height = height;
										set[0](v1);
									};
								})(set);
								if(file == null) {
									_g4.chooseFile((function(v) {
										return function(path1) {
											file = path1;
											setVal();
											v[0].dblclick();
										};
									})(v));
									return;
								}
								var dialog = $($(".tileSelect").parent().html()).prependTo($("body"));
								var maxWidth = 1000000;
								var maxHeight = 1000000;
								dialog.find(".tileView").css({ backgroundImage : "url(\"" + _g4.getAbsPath(file) + "\")"}).mousemove((function() {
									return function(e11) {
										var off = $(this).offset();
										posX = (e11.pageX - off.left) / size | 0;
										posY = (e11.pageY - off.top) / size | 0;
										if((posX + width) * size > maxWidth) posX = (maxWidth / size | 0) - width;
										if((posY + height) * size > maxHeight) posY = (maxHeight / size | 0) - height;
										if(posX < 0) posX = 0;
										if(posY < 0) posY = 0;
										$(".tileCursor").not(".current").css({ marginLeft : size * posX - 1 + "px", marginTop : size * posY - 1 + "px"});
									};
								})()).click((function() {
									return function(_5) {
										setVal();
										dialog.remove();
										_g4.save();
									};
								})());
								dialog.find("[name=size]").val("" + size).change((function() {
									return function(_6) {
										size = Std.parseInt($(this).val());
										$(".tileCursor").css({ width : size * width + "px", height : size * height + "px"});
										$(".tileCursor.current").css({ marginLeft : size * posX - 2 + "px", marginTop : size * posY - 2 + "px"});
									};
								})()).change();
								dialog.find("[name=width]").val("" + width).change((function() {
									return function(_7) {
										width = Std.parseInt($(this).val());
										$(".tileCursor").css({ width : size * width + "px", height : size * height + "px"});
									};
								})()).change();
								dialog.find("[name=height]").val("" + height).change((function() {
									return function(_8) {
										height = Std.parseInt($(this).val());
										$(".tileCursor").css({ width : size * width + "px", height : size * height + "px"});
									};
								})()).change();
								dialog.find("[name=cancel]").click((function() {
									return function(_9) {
										dialog.remove();
									};
								})());
								dialog.find("[name=file]").click((function(v) {
									return function(_10) {
										_g4.chooseFile((function(v) {
											return function(f2) {
												file = f2;
												dialog.remove();
												setVal();
												_g4.save();
												v[0].dblclick();
											};
										})(v));
									};
								})(v));
								dialog.keydown((function() {
									return function(e12) {
										e12.stopPropagation();
									};
								})()).keypress((function() {
									return function(e13) {
										e13.stopPropagation();
									};
								})());
								dialog.show();
								var i1;
								var _this = window.document;
								i1 = _this.createElement("img");
								i1.onload = (function() {
									return function(_11) {
										maxWidth = i1.width;
										maxHeight = i1.height;
										dialog.find(".tileView").height(i1.height).width(i1.width);
										dialog.find(".tilePath").text(file + " (" + i1.width + "x" + i1.height + ")");
									};
								})();
								i1.src = _g4.getAbsPath(file);
							};
						})(set,v,val,index,c));
						break;
					default:
						v[0].dblclick((function(v,index,c) {
							return function(e14) {
								_g4.editCell(c[0],v[0],sheet,index[0]);
							};
						})(v,index,c));
					}
				}
			}
		}
		if(sheet.lines.length == 0) {
			var l2 = $("<tr><td colspan=\"" + (sheet.columns.length + 1) + "\"><a href=\"javascript:_.insertLine()\">Insert Line</a></td></tr>");
			l2.find("a").click(function(_12) {
				_g4.setCursor(sheet);
			});
			lines.push(l2);
		}
		if(sheet.props.level != null) {
			var col1 = $("<td style='width:35px'>");
			cols.prepend(col1);
			var _g32 = 0;
			var _g23 = sheet.lines.length;
			while(_g32 < _g23) {
				var index1 = [_g32++];
				var l3 = [lines[index1[0]]];
				var c2 = $("<input type='submit' value='Edit'>");
				$("<td>").append(c2).prependTo(l3[0]);
				c2.click((function(l3,index1) {
					return function(_13) {
						l3[0].click();
						var found = null;
						var _g51 = 0;
						var _g61 = _g4.levels;
						while(_g51 < _g61.length) {
							var l4 = _g61[_g51];
							++_g51;
							if(l4.sheet == sheet && l4.index == index1[0]) found = l4;
						}
						if(found == null) {
							found = new Level(_g4,sheet,index1[0]);
							_g4.levels.push(found);
							_g4.selectLevel(found);
							_g4.initContent();
						} else _g4.selectLevel(found);
					};
				})(l3,index1));
			}
		}
		content.empty();
		content.append(cols);
		var snext = 0;
		var _g33 = 0;
		var _g24 = lines.length;
		while(_g33 < _g24) {
			var i3 = _g33++;
			while(sheet.separators[snext] == i3) {
				var sep = $("<tr>").addClass("separator").append("<td colspan=\"" + (colCount + 1) + "\">").appendTo(content);
				var content2 = [sep.find("td")];
				var title = [sheet.props.separatorTitles != null?sheet.props.separatorTitles[snext]:null];
				if(title[0] != null) content2[0].text(title[0]);
				var pos = [snext];
				sep.dblclick((function(pos,title,content2) {
					return function(e15) {
						content2[0].empty();
						$("<input>").appendTo(content2[0]).focus().val(title[0] == null?"":title[0]).blur((function(pos,title,content2) {
							return function(_14) {
								title[0] = $(this).val();
								$(this).remove();
								content2[0].text(title[0]);
								var titles = sheet.props.separatorTitles;
								if(titles == null) titles = [];
								while(titles.length < pos[0]) titles.push(null);
								if(title[0] == "") titles[pos[0]] = null; else titles[pos[0]] = title[0];
								while(titles[titles.length - 1] == null && titles.length > 0) titles.pop();
								if(titles.length == 0) titles = null;
								sheet.props.separatorTitles = titles;
								_g4.save();
							};
						})(pos,title,content2)).keypress((function() {
							return function(e16) {
								e16.stopPropagation();
							};
						})()).keydown((function(title,content2) {
							return function(e17) {
								if(e17.keyCode == 13) {
									$(this).blur();
									e17.preventDefault();
								} else if(e17.keyCode == 27) content2[0].text(title[0]);
								e17.stopPropagation();
							};
						})(title,content2));
					};
				})(pos,title,content2));
				snext++;
			}
			content.append(lines[i3]);
		}
		inTodo = true;
		var _g25 = 0;
		while(_g25 < todo.length) {
			var t1 = todo[_g25];
			++_g25;
			t1();
		}
		inTodo = false;
	}
	,openFile: function(file) {
		js_node_webkit_Shell.openItem(file);
	}
	,setCursor: function(s,x,y,sel,update) {
		if(update == null) update = true;
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.cursor.s = s;
		this.cursor.x = x;
		this.cursor.y = y;
		this.cursor.select = sel;
		var ch = this.cursor.onchange;
		if(ch != null) {
			this.cursor.onchange = null;
			ch();
		}
		if(update) this.updateCursor();
	}
	,selectSheet: function(s,manual) {
		if(manual == null) manual = true;
		this.viewSheet = s;
		this.pages.curPage = -1;
		this.cursor = this.sheetCursors.get(s.name);
		if(this.cursor == null) {
			this.cursor = { x : 0, y : 0, s : s};
			this.sheetCursors.set(s.name,this.cursor);
		}
		if(manual) {
			if(this.level != null) this.level.dispose();
			this.level = null;
		}
		this.prefs.curSheet = Lambda.indexOf(this.data.sheets,s);
		$("#sheets li").removeClass("active").filter("#sheet_" + this.prefs.curSheet).addClass("active");
		if(manual) this.refresh();
	}
	,selectLevel: function(l) {
		if(this.level != null) this.level.dispose();
		this.pages.curPage = -1;
		this.level = l;
		this.level.init();
		$("#sheets li").removeClass("active").filter("#level_" + l.sheetPath.split(".").join("_") + "_" + l.index).addClass("active");
	}
	,closeLevel: function(l) {
		l.dispose();
		var i = Lambda.indexOf(this.levels,l);
		HxOverrides.remove(this.levels,l);
		if(this.level == l) this.level = null;
		this.initContent();
	}
	,newSheet: function() {
		var s = $("#newsheet").show();
		s.find("#sheet_name").val("");
		s.find("#sheet_level").removeAttr("checked");
	}
	,deleteColumn: function(sheet,cname) {
		if(cname == null) {
			sheet = this.smap.get(this.colProps.sheet).s;
			cname = this.colProps.ref.name;
		}
		if(!SheetData.deleteColumn(sheet,cname)) return;
		$("#newcol").hide();
		this.refresh();
		this.save();
	}
	,editTypes: function() {
		var _g = this;
		if(this.typesStr == null) {
			var tl = [];
			var _g1 = 0;
			var _g11 = this.data.customTypes;
			while(_g1 < _g11.length) {
				var t = _g11[_g1];
				++_g1;
				tl.push("class " + t.name + " {\n" + this.typeCasesToString(t,"\t") + "\n}");
			}
			this.typesStr = tl.join("\n\n");
		}
		var content = $("#content");
		content.html($("#editTypes").html());
		var text = content.find("textarea");
		var apply = content.find("input.button").first();
		var cancel = content.find("input.button").eq(1);
		var types;
		text.change(function(_) {
			var nstr = text.val();
			if(nstr == _g.typesStr) return;
			_g.typesStr = nstr;
			var errors = [];
			var t1 = StringTools.trim(_g.typesStr);
			var r = new EReg("^enum[ \r\n\t]+([A-Za-z0-9_\\*:]+)[ \r\n\t]*\\{([^}]*)\\}","");
			var oldTMap = _g.tmap;
			var descs = [];
			_g.tmap = new haxe_ds_StringMap();
			types = [];
			while(r.match(t1)) {
				var name = r.matched(1);
				var desc = r.matched(2);
				if(_g.tmap.get(name) != null) errors.push("Duplicate type " + name);
				var td = { name : name, cases : []};
				_g.tmap.set(name,td);
				descs.push(desc);
				types.push(td);
				t1 = StringTools.trim(r.matchedRight());
			}
			var _g12 = 0;
			while(_g12 < types.length) {
				var t2 = types[_g12];
				++_g12;
				try {
					t2.cases = _g.parseTypeCases(descs.shift());
				} catch( msg ) {
					if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
					errors.push(msg);
				}
			}
			_g.tmap = oldTMap;
			if(t1 != "") errors.push("Invalid " + StringTools.htmlEscape(t1));
			_g.setErrorMessage(errors.length == 0?null:errors.join("<br>"));
			if(errors.length == 0) apply.removeAttr("disabled"); else apply.attr("disabled","");
		});
		text.keydown(function(e) {
			if(e.keyCode == 9) {
				e.preventDefault();
				new js_Selection(text[0]).insert("\t","","");
			}
			e.stopPropagation();
		});
		text.keyup(function(e1) {
			text.change();
			e1.stopPropagation();
		});
		text.val(this.typesStr);
		cancel.click(function(_1) {
			_g.typesStr = null;
			_g.setErrorMessage();
			_g.quickLoad(_g.curSavedData);
			_g.initContent();
		});
		apply.click(function(_2) {
			var tpairs = _g.makePairs(_g.data.customTypes,types);
			var _g13 = 0;
			while(_g13 < tpairs.length) {
				var p = tpairs[_g13];
				++_g13;
				if(p.b == null) {
					var t3 = p.a;
					var _g2 = 0;
					var _g3 = _g.data.sheets;
					while(_g2 < _g3.length) {
						var s = _g3[_g2];
						++_g2;
						var _g4 = 0;
						var _g5 = s.columns;
						while(_g4 < _g5.length) {
							var c = _g5[_g4];
							++_g4;
							{
								var _g6 = c.type;
								switch(_g6[1]) {
								case 9:
									var name1 = _g6[2];
									if(name1 == t3.name) {
										_g.error("Type " + name1 + " used by " + s.name + "@" + c.name + " cannot be removed");
										return;
									} else {
									}
									break;
								default:
								}
							}
						}
					}
				}
			}
			var _g14 = 0;
			while(_g14 < types.length) {
				var t4 = [types[_g14]];
				++_g14;
				if(!Lambda.exists(tpairs,(function(t4) {
					return function(p1) {
						return p1.b == t4[0];
					};
				})(t4))) _g.data.customTypes.push(t4[0]);
			}
			var _g15 = 0;
			while(_g15 < tpairs.length) {
				var p2 = tpairs[_g15];
				++_g15;
				if(p2.b == null) HxOverrides.remove(_g.data.customTypes,p2.a); else try {
					_g.updateType(p2.a,p2.b);
				} catch( msg1 ) {
					if (msg1 instanceof js__$Boot_HaxeError) msg1 = msg1.val;
					if( js_Boot.__instanceof(msg1,String) ) {
						_g.error("Error while updating " + p2.b.name + " : " + msg1);
						return;
					} else throw(msg1);
				}
			}
			_g.initContent();
			_g.typesStr = null;
			_g.save();
		});
		this.typesStr = null;
		text.change();
	}
	,newColumn: function(sheetName,ref,index) {
		var form = $("#newcol form");
		this.colProps = { sheet : sheetName, ref : ref, index : index};
		var sheets = $("[name=sheet]");
		sheets.empty();
		var _g1 = 0;
		var _g = this.data.sheets.length;
		while(_g1 < _g) {
			var i = _g1++;
			var s = this.data.sheets[i];
			if(s.props.hide) continue;
			$("<option>").attr("value","" + i).text(s.name).appendTo(sheets);
		}
		var types = $("[name=ctype]");
		types.empty();
		types.unbind("change");
		types.change(function(_) {
			$("#col_options").toggleClass("t_edit",types.val() != "");
		});
		$("<option>").attr("value","").text("--- Select ---").appendTo(types);
		var _g2 = 0;
		var _g11 = this.data.customTypes;
		while(_g2 < _g11.length) {
			var t = _g11[_g2];
			++_g2;
			$("<option>").attr("value","" + t.name).text(t.name).appendTo(types);
		}
		form.removeClass("edit").removeClass("create");
		if(ref != null) {
			form.addClass("edit");
			form.find("[name=name]").val(ref.name);
			form.find("[name=type]").val(HxOverrides.substr(ref.type[0],1,null).toLowerCase()).change();
			form.find("[name=req]").prop("checked",!ref.opt);
			form.find("[name=display]").val(ref.display == null?"0":Std.string(ref.display));
			{
				var _g3 = ref.type;
				switch(_g3[1]) {
				case 5:
					var values = _g3[2];
					form.find("[name=values]").val(values.join(","));
					break;
				case 10:
					var values1 = _g3[2];
					form.find("[name=values]").val(values1.join(","));
					break;
				case 6:
					var sname = _g3[2];
					form.find("[name=sheet]").val("" + Lambda.indexOf(this.data.sheets,Lambda.find(this.data.sheets,function(s1) {
						return s1.name == sname;
					})));
					break;
				case 12:
					var sname1 = _g3[2];
					form.find("[name=sheet]").val("" + Lambda.indexOf(this.data.sheets,Lambda.find(this.data.sheets,function(s1) {
						return s1.name == sname1;
					})));
					break;
				case 9:
					var name = _g3[2];
					form.find("[name=ctype]").val(name);
					break;
				default:
				}
			}
		} else {
			form.addClass("create");
			form.find("input").not("[type=submit]").val("");
			form.find("[name=req]").prop("checked",true);
		}
		types.change();
		$("#newcol").show();
	}
	,newLine: function(sheet,index) {
		SheetData.newLine(sheet,index);
		this.refresh();
		this.save();
	}
	,insertLine: function() {
		if(this.cursor.s != null) this.newLine(this.cursor.s);
	}
	,createSheet: function(name,level) {
		name = StringTools.trim(name);
		if(!this.r_ident.match(name)) {
			this.error("Invalid sheet name");
			return;
		}
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s1 = _g1[_g];
			++_g;
			if(s1.name == name) {
				this.error("Sheet name already in use");
				return;
			}
		}
		$("#newsheet").hide();
		var s = { name : name, columns : [], lines : [], separators : [], props : { }};
		this.prefs.curSheet = this.data.sheets.length;
		this.data.sheets.push(s);
		this.makeSheet(s);
		if(level) this.initLevel(s);
		this.initContent();
		this.save();
	}
	,initLevel: function(s) {
		var cols = [{ n : "id", t : cdb_ColumnType.TId},{ n : "width", t : cdb_ColumnType.TInt},{ n : "height", t : cdb_ColumnType.TInt},{ n : "props", t : cdb_ColumnType.TDynamic},{ n : "tileProps", t : cdb_ColumnType.TList},{ n : "layers", t : cdb_ColumnType.TList}];
		var _g = 0;
		while(_g < cols.length) {
			var c = cols[_g];
			++_g;
			if(SheetData.hasColumn(s,c.n)) {
				if(!SheetData.hasColumn(s,c.n,[c.t])) {
					this.error("Column " + c.n + " already exists but does not have type " + Std.string(c.t));
					return;
				}
			} else {
				var col = { name : c.n, type : c.t, typeStr : null};
				SheetData.addColumn(s,col);
				if(c.n == "layers") {
					var s1 = SheetData.model.smap.get(s.name + "@" + col.name).s;
					SheetData.addColumn(s1,{ name : "name", type : cdb_ColumnType.TString, typeStr : null});
					SheetData.addColumn(s1,{ name : "data", type : cdb_ColumnType.TTileLayer, typeStr : null});
				}
			}
		}
		if(s.props.level == null) s.props.level = { tileSets : { }};
		if(s.lines.length == 0 && s.parent == null) {
			var o = SheetData.newLine(s);
			o.width = 128;
			o.height = 128;
		}
	}
	,createColumn: function() {
		var v = { };
		var cols = $("#col_form input, #col_form select").not("[type=submit]");
		var _g_i = 0;
		var _g_j = cols;
		while(_g_i < _g_j.length) {
			var i = $(_g_j[_g_i++]);
			Reflect.setField(v,i.attr("name"),i.attr("type") == "checkbox"?i["is"](":checked")?"on":null:i.val());
		}
		var sheet;
		if(this.colProps.sheet == null) sheet = this.viewSheet; else sheet = this.smap.get(this.colProps.sheet).s;
		var refColumn = this.colProps.ref;
		var t;
		var _g = v.type;
		switch(_g) {
		case "id":
			t = cdb_ColumnType.TId;
			break;
		case "int":
			t = cdb_ColumnType.TInt;
			break;
		case "float":
			t = cdb_ColumnType.TFloat;
			break;
		case "string":
			t = cdb_ColumnType.TString;
			break;
		case "bool":
			t = cdb_ColumnType.TBool;
			break;
		case "enum":
			var vals = StringTools.trim(v.values).split(",");
			if(vals.length == 0) {
				this.error("Missing value list");
				return;
			}
			t = cdb_ColumnType.TEnum((function($this) {
				var $r;
				var _g1 = [];
				{
					var _g2 = 0;
					while(_g2 < vals.length) {
						var f = vals[_g2];
						++_g2;
						_g1.push(StringTools.trim(f));
					}
				}
				$r = _g1;
				return $r;
			}(this)));
			break;
		case "flags":
			var vals1 = StringTools.trim(v.values).split(",");
			if(vals1.length == 0) {
				this.error("Missing value list");
				return;
			}
			t = cdb_ColumnType.TFlags((function($this) {
				var $r;
				var _g11 = [];
				{
					var _g21 = 0;
					while(_g21 < vals1.length) {
						var f1 = vals1[_g21];
						++_g21;
						_g11.push(StringTools.trim(f1));
					}
				}
				$r = _g11;
				return $r;
			}(this)));
			break;
		case "ref":
			var s = this.data.sheets[Std.parseInt(v.sheet)];
			if(s == null) {
				this.error("Sheet not found");
				return;
			}
			t = cdb_ColumnType.TRef(s.name);
			break;
		case "image":
			t = cdb_ColumnType.TImage;
			break;
		case "list":
			t = cdb_ColumnType.TList;
			break;
		case "custom":
			var t1 = this.tmap.get(v.ctype);
			if(t1 == null) {
				this.error("Type not found");
				return;
			}
			t = cdb_ColumnType.TCustom(t1.name);
			break;
		case "color":
			t = cdb_ColumnType.TColor;
			break;
		case "layer":
			var s1 = this.data.sheets[Std.parseInt(v.sheet)];
			if(s1 == null) {
				this.error("Sheet not found");
				return;
			}
			t = cdb_ColumnType.TLayer(s1.name);
			break;
		case "file":
			t = cdb_ColumnType.TFile;
			break;
		case "tilepos":
			t = cdb_ColumnType.TTilePos;
			break;
		case "tilelayer":
			t = cdb_ColumnType.TTileLayer;
			break;
		case "dynamic":
			t = cdb_ColumnType.TDynamic;
			break;
		default:
			return;
		}
		var c = { type : t, typeStr : null, name : v.name};
		if(v.req != "on") c.opt = true;
		if(v.display != "0") c.display = Std.parseInt(v.display);
		if(refColumn != null) {
			var err = Model.prototype.updateColumn.call(this,sheet,refColumn,c);
			if(err != null) {
				this.refresh();
				this.save();
				this.error(err);
				return;
			}
		} else {
			var err1 = SheetData.addColumn(sheet,c,this.colProps.index);
			if(err1 != null) {
				this.error(err1);
				return;
			}
		}
		$("#newcol").hide();
		var _g_i1 = 0;
		var _g_j1 = cols;
		while(_g_i1 < _g_j1.length) {
			var c1 = $(_g_j1[_g_i1++]);
			c1.val("");
		}
		this.refresh();
		this.save();
	}
	,initContent: function() {
		var _g2 = this;
		Model.prototype.initContent.call(this);
		$("body").spectrum.clearAll();
		var sheets = $("ul#sheets");
		sheets.children().remove();
		var _g1 = 0;
		var _g = this.data.sheets.length;
		while(_g1 < _g) {
			var i = _g1++;
			var s1 = [this.data.sheets[i]];
			if(s1[0].props.hide) continue;
			var li = [$("<li>")];
			li[0].text(s1[0].name).attr("id","sheet_" + i).appendTo(sheets).click((function(s1) {
				return function(_) {
					_g2.selectSheet(s1[0]);
				};
			})(s1)).dblclick((function(li,s1) {
				return function(_1) {
					li[0].empty();
					$("<input>").val(s1[0].name).appendTo(li[0]).focus().blur((function(li,s1) {
						return function(_2) {
							li[0].text(s1[0].name);
							var name = $(this).val();
							if(!_g2.r_ident.match(name)) {
								_g2.error("Invalid sheet name");
								return;
							}
							var f = _g2.smap.get(name);
							if(f != null) {
								if(f.s != s1[0]) _g2.error("Sheet name already in use");
								return;
							}
							var old1 = s1[0].name;
							s1[0].name = name;
							_g2.mapType((function() {
								return function(t) {
									switch(t[1]) {
									case 6:
										var o = t[2];
										if(o == old1) return cdb_ColumnType.TRef(name); else return t;
										break;
									case 12:
										var o1 = t[2];
										if(o1 == old1) return cdb_ColumnType.TLayer(name); else return t;
										break;
									default:
										return t;
									}
								};
							})());
							var _g3 = 0;
							var _g4 = _g2.data.sheets;
							while(_g3 < _g4.length) {
								var s2 = _g4[_g3];
								++_g3;
								if(StringTools.startsWith(s2.name,old1 + "@")) s2.name = name + "@" + HxOverrides.substr(s2.name,old1.length + 1,null);
							}
							_g2.initContent();
							_g2.save();
						};
					})(li,s1)).keydown((function() {
						return function(e) {
							if(e.keyCode == 13) $(this).blur(); else if(e.keyCode == 27) _g2.initContent();
							e.stopPropagation();
						};
					})()).keypress((function() {
						return function(e1) {
							e1.stopPropagation();
						};
					})());
				};
			})(li,s1)).mousedown((function(li,s1) {
				return function(e2) {
					if(e2.which == 3) {
						haxe_Timer.delay(((function() {
							return function(f1,s3,li1) {
								return (function() {
									return function() {
										f1(s3,li1);
									};
								})();
							};
						})())($bind(_g2,_g2.popupSheet),s1[0],li[0]),1);
						e2.stopPropagation();
					}
				};
			})(li,s1));
		}
		this.pages.updateTabs();
		var s = this.data.sheets[this.prefs.curSheet];
		if(s == null) s = this.data.sheets[0];
		if(s != null) this.selectSheet(s,false);
		var old = this.levels;
		var lcur = null;
		this.levels = [];
		var _g5 = 0;
		while(_g5 < old.length) {
			var level = old[_g5];
			++_g5;
			if(!this.smap.exists(level.sheetPath)) continue;
			var s4 = this.smap.get(level.sheetPath).s;
			if(s4.lines.length < level.index) continue;
			var l = [new Level(this,s4,level.index)];
			if(level == this.level) lcur = l[0];
			this.levels.push(l[0]);
			var li2 = $("<li>");
			var name1 = level.getName();
			if(name1 == "") name1 = "???";
			li2.text(name1).attr("id","level_" + l[0].sheetPath.split(".").join("_") + "_" + l[0].index).appendTo(sheets).click((function(l) {
				return function(_3) {
					_g2.selectLevel(l[0]);
				};
			})(l));
		}
		if(this.pages.curPage >= 0) this.pages.select(); else if(lcur != null) this.selectLevel(lcur); else if(this.data.sheets.length == 0) $("#content").html("<a href='javascript:_.newSheet()'>Create a sheet</a>"); else this.refresh();
	}
	,cleanLayers: function() {
		var count = 0;
		var _g = 0;
		var _g1 = this.data.sheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.props.level == null) continue;
			var ts = s.props.level.tileSets;
			var usedLayers = new haxe_ds_StringMap();
			var _g2 = 0;
			var _g3 = s.columns;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				var _g4 = c.type;
				switch(_g4[1]) {
				case 8:
					var sub = SheetData.model.smap.get(s.name + "@" + c.name).s;
					if(!SheetData.hasColumn(sub,"data",[cdb_ColumnType.TTileLayer])) continue;
					var _g5 = 0;
					var _g6 = SheetData.getLines(sub);
					while(_g5 < _g6.length) {
						var obj = _g6[_g5];
						++_g5;
						var v = obj.data;
						if(v == null || v.file == null) continue;
						usedLayers.set(v.file,true);
					}
					break;
				default:
				}
			}
			var _g21 = 0;
			var _g31 = Reflect.fields(ts);
			while(_g21 < _g31.length) {
				var f = _g31[_g21];
				++_g21;
				if(!(__map_reserved[f] != null?usedLayers.getReserved(f):usedLayers.h[f])) {
					Reflect.deleteField(ts,f);
					count++;
				}
			}
		}
		return count;
	}
	,initMenu: function() {
		var _g = this;
		var menu = new js_node_webkit_Menu({ type : "menubar"});
		var mfile = new js_node_webkit_MenuItem({ label : "File"});
		var mfiles = new js_node_webkit_Menu();
		var mnew = new js_node_webkit_MenuItem({ label : "New"});
		var mopen = new js_node_webkit_MenuItem({ label : "Open..."});
		var mrecent = new js_node_webkit_MenuItem({ label : "Recent Files"});
		var msave = new js_node_webkit_MenuItem({ label : "Save As..."});
		var mclean = new js_node_webkit_MenuItem({ label : "Clean Images"});
		this.mcompress = new js_node_webkit_MenuItem({ label : "Enable Compression", type : "checkbox"});
		this.mcompress.click = function() {
			_g.setCompressionMode(_g.mcompress.checked);
			_g.save();
		};
		var mabout = new js_node_webkit_MenuItem({ label : "About"});
		var mexit = new js_node_webkit_MenuItem({ label : "Exit"});
		var mdebug = new js_node_webkit_MenuItem({ label : "Dev"});
		mnew.click = function() {
			_g.prefs.curFile = null;
			_g.load(true);
		};
		mdebug.click = function() {
			_g.window.showDevTools();
		};
		mopen.click = function() {
			var i = $("<input>").attr("type","file").css("display","none").change(function(e) {
				var j = $(this);
				_g.prefs.curFile = j.val();
				_g.load();
				j.remove();
			});
			i.appendTo($("body"));
			i.click();
		};
		msave.click = function() {
			var i1 = $("<input>").attr("type","file").attr("nwsaveas","new.cdb").css("display","none").change(function(e1) {
				var j1 = $(this);
				_g.prefs.curFile = j1.val();
				_g.save();
				j1.remove();
			});
			i1.appendTo($("body"));
			i1.click();
		};
		mclean.click = function() {
			var lcount = _g.cleanLayers();
			var icount = 0;
			if(_g.imageBank != null) {
				var count = Reflect.fields(_g.imageBank).length;
				_g.cleanImages();
				var count2 = Reflect.fields(_g.imageBank).length;
				icount = count - count2;
				if(count2 == 0) _g.imageBank = null;
			}
			_g.error([lcount + " tileset data removed",icount + " unused images removed"].join("\n"));
			_g.refresh();
			if(lcount > 0) _g.save();
			if(icount > 0) _g.saveImages();
		};
		mexit.click = function() {
			process.exit(0);
		};
		mabout.click = function() {
			$("#about").show();
		};
		var mrecents = new js_node_webkit_Menu();
		var _g1 = 0;
		var _g11 = this.prefs.recent;
		while(_g1 < _g11.length) {
			var file = [_g11[_g1]];
			++_g1;
			var m = new js_node_webkit_MenuItem({ label : file[0]});
			m.click = (function(file) {
				return function() {
					_g.prefs.curFile = file[0];
					_g.load();
				};
			})(file);
			mrecents.append(m);
		}
		mrecent.submenu = mrecents;
		var _g2 = 0;
		var _g12 = [mnew,mopen,mrecent,msave,mclean,this.mcompress,mabout,mexit];
		while(_g2 < _g12.length) {
			var m1 = _g12[_g2];
			++_g2;
			mfiles.append(m1);
		}
		mfile.submenu = mfiles;
		menu.append(mfile);
		menu.append(mdebug);
		this.window.menu = menu;
		if(this.prefs.windowPos.x > 0 && this.prefs.windowPos.y > 0) this.window.moveTo(this.prefs.windowPos.x,this.prefs.windowPos.y);
		if(this.prefs.windowPos.w > 50 && this.prefs.windowPos.h > 50) this.window.resizeTo(this.prefs.windowPos.w,this.prefs.windowPos.h);
		this.window.show();
		if(this.prefs.windowPos.max) this.window.maximize();
		this.window.on("close",function() {
			if(_g.prefs.curFile == null && _g.data.sheets.length > 0) {
				if(!window.confirm("Do you want to exit without saving your changes?")) return;
			}
			if(!_g.prefs.windowPos.max) _g.prefs.windowPos = { x : _g.window.x, y : _g.window.y, w : _g.window.width, h : _g.window.height, max : false};
			_g.savePrefs();
			_g.window.close(true);
		});
		this.window.on("maximize",function() {
			_g.prefs.windowPos.max = true;
		});
		this.window.on("unmaximize",function() {
			_g.prefs.windowPos.max = false;
		});
	}
	,getFileTime: function() {
		try {
			return js_node_Fs.statSync(this.prefs.curFile).mtime.getTime();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return 0.;
		}
	}
	,checkTime: function() {
		if(this.prefs.curFile == null) return;
		var fileTime = this.getFileTime();
		if(fileTime != this.lastSave && fileTime != 0) this.load();
	}
	,load: function(noError) {
		if(noError == null) noError = false;
		if(sys_FileSystem.exists(this.prefs.curFile + ".mine") && !Resolver.resolveConflict(this.prefs.curFile)) {
			this.error("CDB file has unresolved conflict, merge by hand before reloading.");
			return;
		}
		Model.prototype.load.call(this,noError);
		HxOverrides.remove(this.prefs.recent,this.prefs.curFile);
		this.prefs.recent.unshift(this.prefs.curFile);
		if(this.prefs.recent.length > 8) this.prefs.recent.pop();
		this.lastSave = this.getFileTime();
		this.mcompress.checked = this.data.compress;
	}
	,save: function(history) {
		if(history == null) history = true;
		Model.prototype.save.call(this,history);
		this.lastSave = this.getFileTime();
	}
	,__class__: Main
});
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		Reflect.setField(o2,f,Reflect.field(o,f));
	}
	return o2;
};
var Resolver = function() {
	this.hasError = false;
};
$hxClasses["Resolver"] = Resolver;
Resolver.__name__ = ["Resolver"];
Resolver.resolveConflict = function(file) {
	return new Resolver().check(file);
};
Resolver.prototype = {
	check: function(file) {
		var minRev = 0;
		var maxRev = 0;
		var basePath = file.split("\\").join("/").split("/").pop();
		var _g = 0;
		var _g1 = sys_FileSystem.readDirectory(HxOverrides.substr(file,0,-basePath.length));
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(StringTools.startsWith(f,basePath + ".r")) {
				var rev = Std.parseInt(HxOverrides.substr(f,basePath.length + 2,null));
				if(minRev == 0 || minRev > rev) minRev = rev;
				if(maxRev == 0 || maxRev < rev) maxRev = rev;
			}
		}
		var merged = js_node_Fs.readFileSync(file,{ encoding : "utf8"}).split("<<<<<<< .mine");
		if(merged.length == 1) return true;
		var endConflict = new EReg(">>>>>>> \\.r[0-9]+[\r\n]+","");
		var _g11 = 1;
		var _g2 = merged.length;
		while(_g11 < _g2) {
			var i = _g11++;
			endConflict.match(merged[i]);
			merged[i] = endConflict.matchedLeft().split("=======").shift() + endConflict.matchedRight();
		}
		var mine = JSON.parse(merged.join(""));
		var origin = JSON.parse(js_node_Fs.readFileSync(file + ".r" + minRev,{ encoding : "utf8"}));
		var other = JSON.parse(js_node_Fs.readFileSync(file + ".r" + maxRev,{ encoding : "utf8"}));
		this.hasError = false;
		try {
			this.resolveRec(mine,origin,other,[]);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				this.error(e);
				this.hasError = true;
			} else throw(e);
		}
		if(this.hasError) return false;
		try {
			sys_io_File.saveContent(Sys.getEnv("TEMP") + "/" + basePath + ".merged" + minRev + "_" + maxRev,js_node_Fs.readFileSync(file,{ encoding : "utf8"}));
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		}
		sys_io_File.saveContent(file,JSON.stringify(other,null,"\t"));
		js_node_Fs.unlinkSync(file + ".mine");
		js_node_Fs.unlinkSync(file + ".r" + minRev);
		js_node_Fs.unlinkSync(file + ".r" + maxRev);
		return true;
	}
	,resolveError: function(message,path) {
		this.error(message + "\n  in\n" + path.join("."));
		this.hasError = true;
	}
	,resolveRec: function(mine,origin,other,path) {
		if(mine == origin || mine == other) return other;
		if(other == origin) return mine;
		if((mine instanceof Array) && mine.__enum__ == null) {
			var target = other;
			if(origin == null) {
				origin = [];
				if(target == null) target = other = [];
			} else if(target == null) target = []; else if(other.length != mine.length) this.resolveError("Array resize conflict",path);
			var _g1 = 0;
			var _g = mine.length;
			while(_g1 < _g) {
				var i = _g1++;
				var mv = mine[i];
				var name = Reflect.field(mv,"id");
				if(name == null) name = Reflect.field(mv,"name");
				path.push(typeof(name) == "string"?name + "#" + i:"[" + i + "]");
				target[i] = this.resolveRec(mv,origin[i],target[i],path);
				path.pop();
			}
		} else if(Reflect.isObject(mine) && !(typeof(mine) == "string")) {
			var target1 = other;
			if(origin == null) {
				origin = { };
				if(other == null) target1 = other = { };
			} else if(target1 == null) target1 = { };
			var _g2 = 0;
			var _g11 = Reflect.fields(target1);
			while(_g2 < _g11.length) {
				var f = _g11[_g2];
				++_g2;
				if(!Object.prototype.hasOwnProperty.call(mine,f)) mine[f] = null;
			}
			var _g3 = 0;
			var _g12 = Reflect.fields(mine);
			while(_g3 < _g12.length) {
				var f1 = _g12[_g3];
				++_g3;
				path.push(f1);
				Reflect.setField(target1,f1,this.resolveRec(Reflect.field(mine,f1),Reflect.field(origin,f1),Reflect.field(target1,f1),path));
				path.pop();
			}
		} else {
			if(typeof(mine) == "string" && typeof(other) == "string") try {
				var dorigin = cdb_Lz4Reader.decodeString(origin);
				var dmine = cdb_Lz4Reader.decodeString(mine);
				var dother = cdb_Lz4Reader.decodeString(other);
				if(dorigin.length != dmine.length || dorigin.length != dother.length) throw new js__$Boot_HaxeError("resized");
				var _g13 = 0;
				var _g4 = dorigin.length;
				while(_g13 < _g4) {
					var i1 = _g13++;
					var mine1 = dmine.b[i1];
					var origin1 = dorigin.b[i1];
					var other1 = dother.b[i1];
					if(mine1 == origin1 || mine1 == other1) continue;
					if(other1 == origin1) dother.b[i1] = mine1 & 255; else throw new js__$Boot_HaxeError("conflict");
				}
				return cdb_Lz4Reader.encodeBytes(dother,other.substr(0,5) == "BCJNG");
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
			}
			var display = function(v) {
				var str = Std.string(v);
				if(str.length > 50) str = HxOverrides.substr(str,0,50) + "...";
				return str;
			};
			var r = window.confirm("A conflict has been found in " + path.join(".") + "\nOrigin = " + display(origin) + "    Mine = " + display(mine) + "    Other = " + display(other) + "\nDo you want to keep your changes (OK) or discard them (CANCEL) ?\n\n");
			if(!window.confirm("Are you sure ?")) throw new js__$Boot_HaxeError("Resolve aborted");
			if(r) other = mine;
		}
		return other;
	}
	,error: function(msg) {
		js_Browser.alert(msg);
	}
	,__class__: Resolver
};
var SheetData = function() { };
$hxClasses["SheetData"] = SheetData;
SheetData.__name__ = ["SheetData"];
SheetData.getSheet = function(name) {
	return SheetData.model.smap.get(name).s;
};
SheetData.isLevel = function(sheet) {
	return sheet.props.level != null;
};
SheetData.getSub = function(sheet,c) {
	return SheetData.model.smap.get(sheet.name + "@" + c.name).s;
};
SheetData.getParent = function(sheet) {
	if(!sheet.props.hide) return null;
	var parts = sheet.name.split("@");
	var colName = parts.pop();
	return { s : SheetData.getSheet(parts.join("@")), c : colName};
};
SheetData.getLines = function(sheet) {
	var p = SheetData.getParent(sheet);
	if(p == null) return sheet.lines;
	if(p.s.props.level != null && p.c == "tileProps") {
		var all1 = [];
		var sets = p.s.props.level.tileSets;
		var _g = 0;
		var _g1 = Reflect.fields(sets);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var t = Reflect.field(sets,f);
			if(t.props == null) continue;
			var _g2 = 0;
			var _g3 = t.props;
			while(_g2 < _g3.length) {
				var p1 = _g3[_g2];
				++_g2;
				if(p1 != null) all1.push(p1);
			}
		}
		return all1;
	}
	var all = [];
	var _g4 = 0;
	var _g11 = SheetData.getLines(p.s);
	while(_g4 < _g11.length) {
		var obj = _g11[_g4];
		++_g4;
		var v = Reflect.field(obj,p.c);
		if(v != null) {
			var _g21 = 0;
			while(_g21 < v.length) {
				var v1 = v[_g21];
				++_g21;
				all.push(v1);
			}
		}
	}
	return all;
};
SheetData.getObjects = function(sheet) {
	var p = SheetData.getParent(sheet);
	if(p == null) {
		var _g = [];
		var _g2 = 0;
		var _g1 = sheet.lines.length;
		while(_g2 < _g1) {
			var i = _g2++;
			_g.push({ path : [sheet.lines[i]], indexes : [i]});
		}
		return _g;
	}
	var all = [];
	var _g11 = 0;
	var _g21 = SheetData.getObjects(p.s);
	while(_g11 < _g21.length) {
		var obj = _g21[_g11];
		++_g11;
		var v = Reflect.field(obj.path[obj.path.length - 1],p.c);
		if(v != null) {
			var _g4 = 0;
			var _g3 = v.length;
			while(_g4 < _g3) {
				var i1 = _g4++;
				var sobj = v[i1];
				var p1 = obj.path.slice();
				var idx = obj.indexes.slice();
				p1.push(sobj);
				idx.push(i1);
				all.push({ path : p1, indexes : idx});
			}
		}
	}
	return all;
};
SheetData.newLine = function(sheet,index) {
	var o = { };
	var _g = 0;
	var _g1 = sheet.columns;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		var d = SheetData.model.getDefault(c);
		if(d != null) o[c.name] = d;
	}
	if(index == null) sheet.lines.push(o); else {
		var _g11 = 0;
		var _g2 = sheet.separators.length;
		while(_g11 < _g2) {
			var i = _g11++;
			var s = sheet.separators[i];
			if(s > index) sheet.separators[i] = s + 1;
		}
		sheet.lines.splice(index + 1,0,o);
		SheetData.changeLineOrder(sheet,(function($this) {
			var $r;
			var _g3 = [];
			{
				var _g21 = 0;
				var _g12 = sheet.lines.length;
				while(_g21 < _g12) {
					var i1 = _g21++;
					_g3.push(i1 <= index?i1:i1 + 1);
				}
			}
			$r = _g3;
			return $r;
		}(this)));
	}
	return o;
};
SheetData.getPath = function(sheet) {
	if(sheet.path == null) return sheet.name; else return sheet.path;
};
SheetData.hasColumn = function(s,name,types) {
	var _g = 0;
	var _g1 = s.columns;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		if(c.name == name) {
			if(types != null) {
				var _g2 = 0;
				while(_g2 < types.length) {
					var t = types[_g2];
					++_g2;
					if(Type.enumEq(c.type,t)) return true;
				}
				return false;
			}
			return true;
		}
	}
	return false;
};
SheetData.moveLine = function(sheet,index,delta) {
	if(delta < 0 && index > 0) {
		var _g1 = 0;
		var _g = sheet.separators.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(sheet.separators[i] == index) {
				var i1 = i;
				while(i1 < sheet.separators.length - 1 && sheet.separators[i1 + 1] == index) i1++;
				sheet.separators[i1]++;
				return index;
			}
		}
		var l = sheet.lines[index];
		sheet.lines.splice(index,1);
		sheet.lines.splice(index - 1,0,l);
		var arr;
		var _g2 = [];
		var _g21 = 0;
		var _g11 = sheet.lines.length;
		while(_g21 < _g11) {
			var i2 = _g21++;
			_g2.push(i2);
		}
		arr = _g2;
		arr[index] = index - 1;
		arr[index - 1] = index;
		SheetData.changeLineOrder(sheet,arr);
		return index - 1;
	} else if(delta > 0 && sheet != null && index < sheet.lines.length - 1) {
		var _g12 = 0;
		var _g3 = sheet.separators.length;
		while(_g12 < _g3) {
			var i3 = _g12++;
			if(sheet.separators[i3] == index + 1) {
				sheet.separators[i3]--;
				return index;
			}
		}
		var l1 = sheet.lines[index];
		sheet.lines.splice(index,1);
		sheet.lines.splice(index + 1,0,l1);
		var arr1;
		var _g4 = [];
		var _g22 = 0;
		var _g13 = sheet.lines.length;
		while(_g22 < _g13) {
			var i4 = _g22++;
			_g4.push(i4);
		}
		arr1 = _g4;
		arr1[index] = index + 1;
		arr1[index + 1] = index;
		SheetData.changeLineOrder(sheet,arr1);
		return index + 1;
	}
	return null;
};
SheetData.deleteLine = function(sheet,index) {
	var arr;
	var _g = [];
	var _g2 = 0;
	var _g1 = sheet.lines.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(i < index?i:i - 1);
	}
	arr = _g;
	arr[index] = -1;
	SheetData.changeLineOrder(sheet,arr);
	sheet.lines.splice(index,1);
	var prev = -1;
	var toRemove = null;
	var _g21 = 0;
	var _g11 = sheet.separators.length;
	while(_g21 < _g11) {
		var i1 = _g21++;
		var s = sheet.separators[i1];
		if(s > index) {
			if(prev == s) toRemove = i1;
			sheet.separators[i1] = s - 1;
		} else prev = s;
	}
	if(toRemove != null) {
		sheet.separators.splice(toRemove,1);
		if(sheet.props.separatorTitles != null) sheet.props.separatorTitles.splice(toRemove,1);
	}
};
SheetData.deleteColumn = function(sheet,cname) {
	var _g = 0;
	var _g1 = sheet.columns;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		if(c.name == cname) {
			HxOverrides.remove(sheet.columns,c);
			var _g2 = 0;
			var _g3 = SheetData.getLines(sheet);
			while(_g2 < _g3.length) {
				var o = _g3[_g2];
				++_g2;
				Reflect.deleteField(o,c.name);
			}
			if(sheet.props.displayColumn == c.name) {
				sheet.props.displayColumn = null;
				SheetData.model.makeSheet(sheet);
			}
			if(sheet.props.displayIcon == c.name) {
				sheet.props.displayIcon = null;
				SheetData.model.makeSheet(sheet);
			}
			if(c.type == cdb_ColumnType.TList) SheetData.model.deleteSheet(SheetData.model.smap.get(sheet.name + "@" + c.name).s);
			return true;
		}
	}
	return false;
};
SheetData.addColumn = function(sheet,c,index) {
	var _g = 0;
	var _g1 = sheet.columns;
	while(_g < _g1.length) {
		var c2 = _g1[_g];
		++_g;
		if(c2.name == c.name) return "Column already exists"; else if(c2.type == cdb_ColumnType.TId && c.type == cdb_ColumnType.TId) return "Only one ID allowed";
	}
	if(c.name == "index" && sheet.props.hasIndex) return "Sheet already has an index";
	if(c.name == "group" && sheet.props.hasGroup) return "Sheet already has a group";
	if(index == null) sheet.columns.push(c); else sheet.columns.splice(index,0,c);
	var _g2 = 0;
	var _g11 = SheetData.getLines(sheet);
	while(_g2 < _g11.length) {
		var i = _g11[_g2];
		++_g2;
		var def = SheetData.model.getDefault(c);
		if(def != null) i[c.name] = def;
	}
	if(c.type == cdb_ColumnType.TList) {
		var s = { name : sheet.name + "@" + c.name, props : { hide : true}, separators : [], lines : [], columns : []};
		SheetData.model.data.sheets.push(s);
		SheetData.model.makeSheet(s);
	}
	return null;
};
SheetData.objToString = function(sheet,obj,esc) {
	if(esc == null) esc = false;
	if(obj == null) return "null";
	var fl = [];
	var _g = 0;
	var _g1 = sheet.columns;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		var v = Reflect.field(obj,c.name);
		if(v == null) continue;
		fl.push(c.name + " : " + SheetData.colToString(sheet,c,v,esc));
	}
	if(fl.length == 0) return "{}";
	return "{ " + fl.join(", ") + " }";
};
SheetData.colToString = function(sheet,c,v,esc) {
	if(esc == null) esc = false;
	if(v == null) return "null";
	var _g = c.type;
	switch(_g[1]) {
	case 8:
		var a = v;
		if(a.length == 0) return "[]";
		var s = SheetData.model.smap.get(sheet.name + "@" + c.name).s;
		return "[ " + ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0;
				while(_g2 < a.length) {
					var v1 = a[_g2];
					++_g2;
					_g1.push(SheetData.objToString(s,v1,esc));
				}
			}
			$r = _g1;
			return $r;
		}(this))).join(", ") + " ]";
	default:
		return SheetData.model.valToString(c.type,v,esc);
	}
};
SheetData.changeLineOrder = function(sheet,remap) {
	var _g = 0;
	var _g1 = SheetData.model.data.sheets;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = s.columns;
		while(_g2 < _g3.length) {
			var c = _g3[_g2];
			++_g2;
			{
				var _g4 = c.type;
				switch(_g4[1]) {
				case 12:
					var t = _g4[2];
					if(t == sheet.name) {
						var _g5 = 0;
						var _g6 = SheetData.getLines(s);
						while(_g5 < _g6.length) {
							var obj = _g6[_g5];
							++_g5;
							var ldat = Reflect.field(obj,c.name);
							if(ldat == null || ldat == "") continue;
							var d = cdb__$Types_Layer_$Impl_$.decode(ldat,(function($this) {
								var $r;
								var _g7 = [];
								{
									var _g8 = 0;
									while(_g8 < 256) {
										var i = _g8++;
										_g7.push(i);
									}
								}
								$r = _g7;
								return $r;
							}(this)));
							var _g9 = 0;
							var _g81 = d.length;
							while(_g9 < _g81) {
								var i1 = _g9++;
								var r = remap[d[i1]];
								if(r < 0) r = 0;
								d[i1] = r;
							}
							ldat = cdb__$Types_Layer_$Impl_$.encode(d,SheetData.model.data.compress);
							obj[c.name] = ldat;
						}
					} else {
					}
					break;
				default:
				}
			}
		}
	}
};
SheetData.getReferences = function(sheet,index) {
	var id = null;
	var _g = 0;
	var _g1 = sheet.columns;
	try {
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var _g2 = c.type;
			switch(_g2[1]) {
			case 0:
				id = Reflect.field(sheet.lines[index],c.name);
				throw "__break__";
				break;
			default:
			}
		}
	} catch( e ) { if( e != "__break__" ) throw e; }
	if(id == "" || id == null) return null;
	var results = [];
	var _g3 = 0;
	var _g11 = SheetData.model.data.sheets;
	while(_g3 < _g11.length) {
		var s = _g11[_g3];
		++_g3;
		var _g21 = 0;
		var _g31 = s.columns;
		while(_g21 < _g31.length) {
			var c1 = _g31[_g21];
			++_g21;
			{
				var _g4 = c1.type;
				switch(_g4[1]) {
				case 6:
					var sname = _g4[2];
					if(sname == sheet.name) {
						var sheets = [];
						var p = { s : s, c : c1.name, id : null};
						while(true) {
							var _g5 = 0;
							var _g6 = p.s.columns;
							try {
								while(_g5 < _g6.length) {
									var c2 = _g6[_g5];
									++_g5;
									var _g7 = c2.type;
									switch(_g7[1]) {
									case 0:
										p.id = c2.name;
										throw "__break__";
										break;
									default:
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							sheets.unshift(p);
							var p2 = SheetData.getParent(p.s);
							if(p2 == null) break;
							p = { s : p2.s, c : p2.c, id : null};
						}
						var _g51 = 0;
						var _g61 = SheetData.getObjects(s);
						while(_g51 < _g61.length) {
							var o = _g61[_g51];
							++_g51;
							var obj = o.path[o.path.length - 1];
							if(Reflect.field(obj,c1.name) == id) results.push({ s : sheets, o : o});
						}
					} else {
					}
					break;
				case 9:
					var tname = _g4[2];
					break;
				default:
				}
			}
		}
	}
	return results;
};
SheetData.updateValue = function(sheet,c,index,old) {
	var _g = c.type;
	switch(_g[1]) {
	case 0:
		SheetData.model.makeSheet(sheet);
		break;
	case 3:
		if(sheet.props.level != null && (c.name == "width" || c.name == "height")) {
			var obj = sheet.lines[index];
			var newW = Reflect.field(obj,"width");
			var newH = Reflect.field(obj,"height");
			var oldW = newW;
			var oldH = newH;
			if(c.name == "width") oldW = old; else oldH = old;
			var remapTileLayer = function(v) {
				if(v == null) return null;
				var odat = cdb__$Types_TileLayerData_$Impl_$.decode(v.data);
				var ndat = [];
				if(odat[0] == 65535) ndat = odat; else {
					var pos = 0;
					var _g1 = 0;
					while(_g1 < newH) {
						var y = _g1++;
						if(y >= oldH) {
							var _g2 = 0;
							while(_g2 < newW) {
								var x = _g2++;
								ndat.push(0);
							}
						} else if(newW <= oldW) {
							var _g21 = 0;
							while(_g21 < newW) {
								var x1 = _g21++;
								ndat.push(odat[pos++]);
							}
							pos += oldW - newW;
						} else {
							var _g22 = 0;
							while(_g22 < oldW) {
								var x2 = _g22++;
								ndat.push(odat[pos++]);
							}
							var _g23 = oldW;
							while(_g23 < newW) {
								var x3 = _g23++;
								ndat.push(0);
							}
						}
					}
				}
				return { file : v.file, size : v.size, stride : v.stride, data : cdb__$Types_TileLayerData_$Impl_$.encode(ndat,SheetData.model.data.compress)};
			};
			var _g11 = 0;
			var _g24 = sheet.columns;
			while(_g11 < _g24.length) {
				var c1 = _g24[_g11];
				++_g11;
				var v1 = Reflect.field(obj,c1.name);
				if(v1 == null) continue;
				{
					var _g3 = c1.type;
					switch(_g3[1]) {
					case 12:
						var v2 = v1;
						var odat1 = cdb__$Types_Layer_$Impl_$.decode(v2,(function($this) {
							var $r;
							var _g4 = [];
							{
								var _g5 = 0;
								while(_g5 < 256) {
									var i = _g5++;
									_g4.push(i);
								}
							}
							$r = _g4;
							return $r;
						}(this)));
						var ndat1 = [];
						var _g51 = 0;
						while(_g51 < newH) {
							var y1 = _g51++;
							var _g6 = 0;
							while(_g6 < newW) {
								var x4 = _g6++;
								var k;
								if(y1 < oldH && x4 < oldW) k = odat1[x4 + y1 * oldW]; else k = 0;
								ndat1.push(k);
							}
						}
						v2 = cdb__$Types_Layer_$Impl_$.encode(ndat1,SheetData.model.data.compress);
						obj[c1.name] = v2;
						break;
					case 8:
						var s = SheetData.model.smap.get(sheet.name + "@" + c1.name).s;
						if(SheetData.hasColumn(s,"x",[cdb_ColumnType.TInt,cdb_ColumnType.TFloat]) && SheetData.hasColumn(s,"y",[cdb_ColumnType.TInt,cdb_ColumnType.TFloat])) {
							var elts = Reflect.field(obj,c1.name);
							var _g41 = 0;
							var _g52 = elts.slice();
							while(_g41 < _g52.length) {
								var e = _g52[_g41];
								++_g41;
								if(e.x >= newW || e.y >= newH) HxOverrides.remove(elts,e);
							}
						} else if(SheetData.hasColumn(s,"data",[cdb_ColumnType.TTileLayer])) {
							var a = v1;
							var _g42 = 0;
							while(_g42 < a.length) {
								var o = a[_g42];
								++_g42;
								o.data = remapTileLayer(o.data);
							}
						}
						break;
					case 15:
						Reflect.setField(obj,c1.name,remapTileLayer(v1));
						break;
					default:
					}
				}
			}
		} else {
			if(sheet.props.displayColumn == c.name) {
				var obj1 = sheet.lines[index];
				var s1 = SheetData.model.smap.get(sheet.name);
				var _g12 = 0;
				var _g25 = sheet.columns;
				while(_g12 < _g25.length) {
					var cid = _g25[_g12];
					++_g12;
					if(cid.type == cdb_ColumnType.TId) {
						var id = Reflect.field(obj1,cid.name);
						if(id != null) {
							var disp = Reflect.field(obj1,c.name);
							if(disp == null) disp = "#" + id;
							s1.index.get(id).disp = disp;
						}
					}
				}
			}
			if(sheet.props.displayIcon == c.name) {
				var obj2 = sheet.lines[index];
				var s2 = SheetData.model.smap.get(sheet.name);
				var _g13 = 0;
				var _g26 = sheet.columns;
				while(_g13 < _g26.length) {
					var cid1 = _g26[_g13];
					++_g13;
					if(cid1.type == cdb_ColumnType.TId) {
						var id1 = Reflect.field(obj2,cid1.name);
						if(id1 != null) s2.index.get(id1).ico = Reflect.field(obj2,c.name);
					}
				}
			}
		}
		break;
	default:
		if(sheet.props.displayColumn == c.name) {
			var obj3 = sheet.lines[index];
			var s3 = SheetData.model.smap.get(sheet.name);
			var _g14 = 0;
			var _g27 = sheet.columns;
			while(_g14 < _g27.length) {
				var cid2 = _g27[_g14];
				++_g14;
				if(cid2.type == cdb_ColumnType.TId) {
					var id2 = Reflect.field(obj3,cid2.name);
					if(id2 != null) {
						var disp1 = Reflect.field(obj3,c.name);
						if(disp1 == null) disp1 = "#" + id2;
						s3.index.get(id2).disp = disp1;
					}
				}
			}
		}
		if(sheet.props.displayIcon == c.name) {
			var obj4 = sheet.lines[index];
			var s4 = SheetData.model.smap.get(sheet.name);
			var _g15 = 0;
			var _g28 = sheet.columns;
			while(_g15 < _g28.length) {
				var cid3 = _g28[_g15];
				++_g15;
				if(cid3.type == cdb_ColumnType.TId) {
					var id3 = Reflect.field(obj4,cid3.name);
					if(id3 != null) s4.index.get(id3).ico = Reflect.field(obj4,c.name);
				}
			}
		}
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Sys = function() { };
$hxClasses["Sys"] = Sys;
Sys.__name__ = ["Sys"];
Sys.getEnv = function(s) {
	var this1 = process.env;
	return this1[s];
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw new js__$Boot_HaxeError(index + " is not a valid enum constructor index");
	return Type.createEnum(e,c,params);
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
var cdb__$BinSerializer_SchemaKind = $hxClasses["cdb._BinSerializer.SchemaKind"] = { __ename__ : ["cdb","_BinSerializer","SchemaKind"], __constructs__ : ["SEnum","SAnon","SMulti"] };
cdb__$BinSerializer_SchemaKind.SEnum = function(e) { var $x = ["SEnum",0,e]; $x.__enum__ = cdb__$BinSerializer_SchemaKind; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SchemaKind.SAnon = function(e) { var $x = ["SAnon",1,e]; $x.__enum__ = cdb__$BinSerializer_SchemaKind; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SchemaKind.SMulti = function(a) { var $x = ["SMulti",2,a]; $x.__enum__ = cdb__$BinSerializer_SchemaKind; $x.toString = $estr; return $x; };
var cdb__$BinSerializer_SData = $hxClasses["cdb._BinSerializer.SData"] = { __ename__ : ["cdb","_BinSerializer","SData"], __constructs__ : ["DInt","DBool","DString","DFloat","DBytes","DDynamic","DNull","DArray","DSchema","DAnon","DIntMap","DStringMap","DEnumMap"] };
cdb__$BinSerializer_SData.DInt = ["DInt",0];
cdb__$BinSerializer_SData.DInt.toString = $estr;
cdb__$BinSerializer_SData.DInt.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DBool = ["DBool",1];
cdb__$BinSerializer_SData.DBool.toString = $estr;
cdb__$BinSerializer_SData.DBool.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DString = ["DString",2];
cdb__$BinSerializer_SData.DString.toString = $estr;
cdb__$BinSerializer_SData.DString.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DFloat = ["DFloat",3];
cdb__$BinSerializer_SData.DFloat.toString = $estr;
cdb__$BinSerializer_SData.DFloat.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DBytes = ["DBytes",4];
cdb__$BinSerializer_SData.DBytes.toString = $estr;
cdb__$BinSerializer_SData.DBytes.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DDynamic = ["DDynamic",5];
cdb__$BinSerializer_SData.DDynamic.toString = $estr;
cdb__$BinSerializer_SData.DDynamic.__enum__ = cdb__$BinSerializer_SData;
cdb__$BinSerializer_SData.DNull = function(d) { var $x = ["DNull",6,d]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DArray = function(d) { var $x = ["DArray",7,d]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DSchema = function(id) { var $x = ["DSchema",8,id]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DAnon = function(a) { var $x = ["DAnon",9,a]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DIntMap = function(d) { var $x = ["DIntMap",10,d]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DStringMap = function(d) { var $x = ["DStringMap",11,d]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
cdb__$BinSerializer_SData.DEnumMap = function(e,d) { var $x = ["DEnumMap",12,e,d]; $x.__enum__ = cdb__$BinSerializer_SData; $x.toString = $estr; return $x; };
var cdb_NullError = function(msg) {
	this.msg = msg;
};
$hxClasses["cdb.NullError"] = cdb_NullError;
cdb_NullError.__name__ = ["cdb","NullError"];
cdb_NullError.prototype = {
	toString: function() {
		return this.msg;
	}
	,__class__: cdb_NullError
};
var cdb_SchemaError = function(s) {
	this.s = s;
};
$hxClasses["cdb.SchemaError"] = cdb_SchemaError;
cdb_SchemaError.__name__ = ["cdb","SchemaError"];
cdb_SchemaError.prototype = {
	toString: function() {
		return "Schema " + this.s.name + " version differs";
	}
	,__class__: cdb_SchemaError
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var cdb_SchemaSerializer = function() {
	haxe_Serializer.call(this);
};
$hxClasses["cdb.SchemaSerializer"] = cdb_SchemaSerializer;
cdb_SchemaSerializer.__name__ = ["cdb","SchemaSerializer"];
cdb_SchemaSerializer.__super__ = haxe_Serializer;
cdb_SchemaSerializer.prototype = $extend(haxe_Serializer.prototype,{
	serializeRef: function(v) {
		if(js_Boot.__instanceof(v,cdb__$BinSerializer_Schema)) {
			var s = v;
			this.serializeString(s.name);
			return true;
		}
		return haxe_Serializer.prototype.serializeRef.call(this,v);
	}
	,__class__: cdb_SchemaSerializer
});
var cdb__$BinSerializer_Schema = function(name) {
	this.name = name;
	this.id = cdb__$BinSerializer_Schema.DO_HASH(name);
};
$hxClasses["cdb._BinSerializer.Schema"] = cdb__$BinSerializer_Schema;
cdb__$BinSerializer_Schema.__name__ = ["cdb","_BinSerializer","Schema"];
cdb__$BinSerializer_Schema.DO_HASH = function(data) {
	var b = haxe_crypto_Md5.make(haxe_io_Bytes.ofString(data));
	return b.b[0] | b.b[1] << 8 | b.b[2] << 16 | b.b[3] << 24;
};
cdb__$BinSerializer_Schema.prototype = {
	finalize: function() {
		this.hash = 0;
		var s = new cdb_SchemaSerializer();
		s.useCache = true;
		s.useEnumIndex = true;
		s.serialize(this.kind);
		this.hash = cdb__$BinSerializer_Schema.DO_HASH(this.name + s.toString());
	}
	,__class__: cdb__$BinSerializer_Schema
};
var cdb_BinSerializer = function() {
};
$hxClasses["cdb.BinSerializer"] = cdb_BinSerializer;
cdb_BinSerializer.__name__ = ["cdb","BinSerializer"];
cdb_BinSerializer.init = function() {
	if(cdb_BinSerializer.schemas == null) {
		var metas = haxe_rtti_Meta.getType(cdb_BinSerializer);
		cdb_BinSerializer.schemas = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = Reflect.fields(metas);
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			var s = haxe_Unserializer.run(Reflect.field(metas,m)[0]);
			s.tag = 0;
			cdb_BinSerializer.schemas.h[s.id] = s;
			{
				var _g2 = s.kind;
				switch(_g2[1]) {
				case 0:
					s.enumValue = Type.resolveEnum(s.name);
					if(s.enumValue == null) throw new js__$Boot_HaxeError("Missing enum " + s.name);
					break;
				default:
				}
			}
		}
		cdb_BinSerializer.inst = new cdb_BinSerializer();
	}
};
cdb_BinSerializer.doSerialize = function(v,sid) {
	cdb_BinSerializer.init();
	cdb_BinSerializer.inst.tag = ++cdb_BinSerializer.TAG;
	cdb_BinSerializer.inst.out = new haxe_io_BytesBuffer();
	cdb_BinSerializer.inst.serializeSchema(cdb_BinSerializer.schemas.h[sid],v);
	var b = cdb_BinSerializer.inst.out.getBytes();
	cdb_BinSerializer.inst.out = null;
	return b;
};
cdb_BinSerializer.doUnserialize = function(v,sid) {
	cdb_BinSerializer.init();
	cdb_BinSerializer.inst.tag = ++cdb_BinSerializer.TAG;
	cdb_BinSerializer.inst.bytes = v;
	cdb_BinSerializer.inst.position = 0;
	var v1 = cdb_BinSerializer.inst.unserializeSchema(cdb_BinSerializer.schemas.h[sid]);
	cdb_BinSerializer.inst.bytes = null;
	return v1;
};
cdb_BinSerializer.setGADTTip = function(e) {
	cdb_BinSerializer.gadtTip = e[1];
};
cdb_BinSerializer.checkSchemasData = function(b) {
	cdb_BinSerializer.init();
	var pos = 0;
	var out = [];
	while(pos < b.length) {
		var len = b.get(pos++);
		var name = b.getString(pos,len);
		pos += len;
		var hash = b.get(pos++);
		hash |= b.get(pos++) << 8;
		hash |= b.get(pos++) << 16;
		hash |= b.get(pos++) << 24;
		var $it0 = cdb_BinSerializer.schemas.iterator();
		while( $it0.hasNext() ) {
			var s = $it0.next();
			if(s.name == name) {
				if(s.hash != hash) out.push(s);
				break;
			}
		}
	}
	return out;
};
cdb_BinSerializer.getSchemasData = function() {
	cdb_BinSerializer.init();
	var b = new haxe_io_BytesBuffer();
	var $it0 = cdb_BinSerializer.schemas.iterator();
	while( $it0.hasNext() ) {
		var s = $it0.next();
		b.b.push(s.name.length);
		b.add(haxe_io_Bytes.ofString(s.name));
		b.b.push(s.hash & 255);
		b.b.push(s.hash >> 8 & 255);
		b.b.push(s.hash >> 16 & 255);
		b.b.push(s.hash >>> 24);
	}
	return b.getBytes();
};
cdb_BinSerializer.prototype = {
	fastField: function(v,n) {
		return v[n];
	}
	,fastSetField: function(o,n,v) {
		o[n] = v;
	}
	,serializeInt: function(v) {
		if(v >= 0 && v < 64) this.out.b.push(v); else if(v >= 0 && v < 16384) {
			this.out.b.push(v & 63 | 64);
			this.out.b.push(v >> 6);
		} else if(v >= 0 && v < 4194304) {
			this.out.b.push(v & 63 | 128);
			this.out.b.push(v >> 6);
			this.out.b.push(v >> 14);
		} else {
			this.out.b.push(192);
			this.out.b.push(v & 255);
			this.out.b.push(v >> 8 & 255);
			this.out.b.push(v >> 16 & 255);
			this.out.b.push(v >>> 24);
		}
	}
	,serializeData: function(d,v) {
		switch(d[1]) {
		case 6:
			var d1 = d[2];
			if(v == null) this.out.b.push(0); else {
				this.out.b.push(1);
				this.serializeData(d1,v);
			}
			break;
		case 0:
			this.serializeInt(v);
			break;
		case 3:
			this.out.addDouble(v);
			break;
		case 1:
			this.out.b.push(v?1:0);
			break;
		case 2:
			var s = v;
			this.serializeInt(s.length);
			this.out.add(haxe_io_Bytes.ofString(s));
			break;
		case 7:
			var d2 = d[2];
			var a = v;
			this.serializeInt(a.length);
			var _g = 0;
			while(_g < a.length) {
				var v1 = a[_g];
				++_g;
				this.serializeData(d2,v1);
			}
			break;
		case 8:
			var sid = d[2];
			this.serializeSchema(cdb_BinSerializer.schemas.h[sid],v);
			break;
		case 11:
			var d3 = d[2];
			var m = v;
			var $it0 = m.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				this.serializeInt(k.length);
				this.out.add(haxe_io_Bytes.ofString(k));
				this.serializeData(d3,__map_reserved[k] != null?m.getReserved(k):m.h[k]);
			}
			this.out.b.push(255);
			break;
		case 10:
			var d4 = d[2];
			var m1 = v;
			var $it1 = m1.keys();
			while( $it1.hasNext() ) {
				var k1 = $it1.next();
				this.serializeInt(k1);
				this.serializeData(d4,m1.h[k1]);
			}
			this.out.b.push(255);
			break;
		case 12:
			var d5 = d[3];
			var s1 = d[2];
			var m2 = v;
			var $it2 = m2.keys();
			while( $it2.hasNext() ) {
				var k2 = $it2.next();
				this.serializeSchema(s1,k2);
				this.serializeData(d5,m2.get(k2));
			}
			this.out.b.push(255);
			break;
		case 9:
			var fields = d[2];
			var _g1 = 0;
			while(_g1 < fields.length) {
				var f = fields[_g1];
				++_g1;
				this.serializeData(f.d,v[f.n]);
			}
			break;
		case 5:
			var str = haxe_Serializer.run(v);
			this.serializeInt(str.length);
			this.out.add(haxe_io_Bytes.ofString(str));
			break;
		case 4:
			var b = v;
			this.serializeInt(b.length);
			this.out.add(b);
			break;
		}
	}
	,serializeSchema: function(s,v) {
		if(cdb_BinSerializer.VERSION_CHECK && s.tag != this.tag) {
			this.out.b.push(s.hash & 255);
			this.out.b.push(s.hash >> 8 & 255);
			this.out.b.push(s.hash >> 16 & 255);
			this.out.b.push(s.hash >>> 24);
			s.tag = this.tag;
		}
		{
			var _g = s.kind;
			switch(_g[1]) {
			case 0:
				var constructs = _g[2];
				var id = Type.enumIndex(v);
				this.out.b.push(id);
				var c = constructs[id];
				if(c == null) return;
				var p = Type.enumParameters(v);
				var _g2 = 0;
				var _g1 = c.length;
				while(_g2 < _g1) {
					var i = _g2++;
					this.serializeData(c[i],p[i]);
				}
				break;
			case 1:
				var fields = _g[2];
				var _g11 = 0;
				while(_g11 < fields.length) {
					var f = fields[_g11];
					++_g11;
					this.serializeData(f.d,v[f.n]);
				}
				break;
			case 2:
				var choices = _g[2];
				if(v == null) {
					this.out.b.push(255);
					cdb_BinSerializer.gadtTip = -1;
					return;
				}
				var t = cdb_BinSerializer.gadtTip;
				if(t == -1) throw new js__$Boot_HaxeError("Missing GADT Tip");
				cdb_BinSerializer.gadtTip = -1;
				this.out.b.push(t);
				this.serializeData(choices[t],v);
				break;
			}
		}
	}
	,readByte: function() {
		return this.bytes.get(this.position++);
	}
	,readInt: function() {
		var b = this.bytes.get(this.position++);
		if(b < 64) return b;
		if(b < 128) return b & 63 | this.bytes.get(this.position++) << 6;
		if(b < 192) {
			var b21 = this.bytes.get(this.position++);
			var b31 = this.bytes.get(this.position++);
			return b & 63 | b21 << 6 | b31 << 14;
		}
		var b1 = this.bytes.get(this.position++);
		var b2 = this.bytes.get(this.position++);
		var b3 = this.bytes.get(this.position++);
		var b4 = this.bytes.get(this.position++);
		return b1 | b2 << 8 | b3 << 16 | b4 << 24;
	}
	,unserializeData: function(d) {
		switch(d[1]) {
		case 0:
			return this.readInt();
		case 1:
			if(this.bytes.get(this.position++) != 0) return true; else return false;
			break;
		case 6:
			var d1 = d[2];
			if(this.bytes.get(this.position++) == 0) return null;
			return this.unserializeData(d1);
		case 2:
			var len = this.readInt();
			var str = this.bytes.getString(this.position,len);
			this.position += len;
			return str;
		case 3:
			var f = this.bytes.getDouble(this.position);
			this.position += 8;
			return f;
		case 5:
			var len1 = this.readInt();
			var str1 = this.bytes.getString(this.position,len1);
			this.position += len1;
			return haxe_Unserializer.run(str1);
		case 4:
			var len2 = this.readInt();
			var b = this.bytes.sub(this.position,len2);
			this.position += len2;
			return b;
		case 7:
			var d2 = d[2];
			var len3 = this.readInt();
			var _g = [];
			var _g1 = 0;
			while(_g1 < len3) {
				var i = _g1++;
				_g.push(this.unserializeData(d2));
			}
			return _g;
		case 9:
			var fields = d[2];
			var o = { };
			var _g2 = 0;
			while(_g2 < fields.length) {
				var f1 = fields[_g2];
				++_g2;
				this.fastSetField(o,f1.n,this.unserializeData(f1.d));
			}
			return o;
		case 8:
			var sid = d[2];
			return this.unserializeSchema(cdb_BinSerializer.schemas.h[sid]);
		case 10:
			var d3 = d[2];
			var m = new haxe_ds_IntMap();
			while(true) {
				var i1 = this.bytes.get(this.position++);
				if(i1 == 255) break;
				this.position--;
				var key = this.readInt();
				m.set(key,this.unserializeData(d3));
			}
			return m;
		case 11:
			var d4 = d[2];
			var m1 = new haxe_ds_StringMap();
			while(true) {
				var i2 = this.bytes.get(this.position++);
				if(i2 == 255) break;
				this.position--;
				var len4 = this.readInt();
				var key1 = this.bytes.getString(this.position,len4);
				this.position += len4;
				m1.set(key1,this.unserializeData(d4));
			}
			return m1;
		case 12:
			var d5 = d[3];
			var s = d[2];
			var m2 = new haxe_ds_EnumValueMap();
			while(true) {
				var i3 = this.bytes.get(this.position++);
				if(i3 == 255) break;
				this.position--;
				var key2 = this.unserializeSchema(s);
				m2.set(key2,this.unserializeData(d5));
			}
			return m2;
		}
	}
	,unserializeSchema: function(s) {
		if(cdb_BinSerializer.VERSION_CHECK && s.tag != this.tag) {
			var h = this.bytes.get(this.position++);
			h |= this.bytes.get(this.position++) << 8;
			h |= this.bytes.get(this.position++) << 16;
			h |= this.bytes.get(this.position++) << 24;
			if(h != s.hash) throw new js__$Boot_HaxeError(new cdb_SchemaError(s));
			s.tag = this.tag;
		}
		{
			var _g = s.kind;
			switch(_g[1]) {
			case 0:
				var constructs = _g[2];
				var id = this.bytes.get(this.position++);
				var c = constructs[id];
				if(c == null) return Type.createEnumIndex(s.enumValue,id);
				var args;
				var _g1 = [];
				var _g2 = 0;
				while(_g2 < c.length) {
					var d = c[_g2];
					++_g2;
					_g1.push(this.unserializeData(d));
				}
				args = _g1;
				return Type.createEnumIndex(s.enumValue,id,args);
			case 2:
				var choices = _g[2];
				var c1 = choices[this.bytes.get(this.position++)];
				if(c1 == null) return null;
				return this.unserializeData(c1);
			case 1:
				var fields = _g[2];
				var o = { };
				var _g11 = 0;
				while(_g11 < fields.length) {
					var f = fields[_g11];
					++_g11;
					this.fastSetField(o,f.n,this.unserializeData(f.d));
				}
				return o;
			}
		}
	}
	,__class__: cdb_BinSerializer
};
var cdb_ColumnType = $hxClasses["cdb.ColumnType"] = { __ename__ : ["cdb","ColumnType"], __constructs__ : ["TId","TString","TBool","TInt","TFloat","TEnum","TRef","TImage","TList","TCustom","TFlags","TColor","TLayer","TFile","TTilePos","TTileLayer","TDynamic"] };
cdb_ColumnType.TId = ["TId",0];
cdb_ColumnType.TId.toString = $estr;
cdb_ColumnType.TId.__enum__ = cdb_ColumnType;
cdb_ColumnType.TString = ["TString",1];
cdb_ColumnType.TString.toString = $estr;
cdb_ColumnType.TString.__enum__ = cdb_ColumnType;
cdb_ColumnType.TBool = ["TBool",2];
cdb_ColumnType.TBool.toString = $estr;
cdb_ColumnType.TBool.__enum__ = cdb_ColumnType;
cdb_ColumnType.TInt = ["TInt",3];
cdb_ColumnType.TInt.toString = $estr;
cdb_ColumnType.TInt.__enum__ = cdb_ColumnType;
cdb_ColumnType.TFloat = ["TFloat",4];
cdb_ColumnType.TFloat.toString = $estr;
cdb_ColumnType.TFloat.__enum__ = cdb_ColumnType;
cdb_ColumnType.TEnum = function(values) { var $x = ["TEnum",5,values]; $x.__enum__ = cdb_ColumnType; $x.toString = $estr; return $x; };
cdb_ColumnType.TRef = function(sheet) { var $x = ["TRef",6,sheet]; $x.__enum__ = cdb_ColumnType; $x.toString = $estr; return $x; };
cdb_ColumnType.TImage = ["TImage",7];
cdb_ColumnType.TImage.toString = $estr;
cdb_ColumnType.TImage.__enum__ = cdb_ColumnType;
cdb_ColumnType.TList = ["TList",8];
cdb_ColumnType.TList.toString = $estr;
cdb_ColumnType.TList.__enum__ = cdb_ColumnType;
cdb_ColumnType.TCustom = function(name) { var $x = ["TCustom",9,name]; $x.__enum__ = cdb_ColumnType; $x.toString = $estr; return $x; };
cdb_ColumnType.TFlags = function(values) { var $x = ["TFlags",10,values]; $x.__enum__ = cdb_ColumnType; $x.toString = $estr; return $x; };
cdb_ColumnType.TColor = ["TColor",11];
cdb_ColumnType.TColor.toString = $estr;
cdb_ColumnType.TColor.__enum__ = cdb_ColumnType;
cdb_ColumnType.TLayer = function(type) { var $x = ["TLayer",12,type]; $x.__enum__ = cdb_ColumnType; $x.toString = $estr; return $x; };
cdb_ColumnType.TFile = ["TFile",13];
cdb_ColumnType.TFile.toString = $estr;
cdb_ColumnType.TFile.__enum__ = cdb_ColumnType;
cdb_ColumnType.TTilePos = ["TTilePos",14];
cdb_ColumnType.TTilePos.toString = $estr;
cdb_ColumnType.TTilePos.__enum__ = cdb_ColumnType;
cdb_ColumnType.TTileLayer = ["TTileLayer",15];
cdb_ColumnType.TTileLayer.toString = $estr;
cdb_ColumnType.TTileLayer.__enum__ = cdb_ColumnType;
cdb_ColumnType.TDynamic = ["TDynamic",16];
cdb_ColumnType.TDynamic.toString = $estr;
cdb_ColumnType.TDynamic.__enum__ = cdb_ColumnType;
var cdb__$Data_TileMode_$Impl_$ = {};
$hxClasses["cdb._Data.TileMode_Impl_"] = cdb__$Data_TileMode_$Impl_$;
cdb__$Data_TileMode_$Impl_$.__name__ = ["cdb","_Data","TileMode_Impl_"];
cdb__$Data_TileMode_$Impl_$._new = function(s) {
	return s;
};
cdb__$Data_TileMode_$Impl_$.ofString = function(s) {
	return cdb__$Data_TileMode_$Impl_$._new(s);
};
cdb__$Data_TileMode_$Impl_$.toString = function(this1) {
	return this1;
};
var cdb_Lz4Reader = function() {
};
$hxClasses["cdb.Lz4Reader"] = cdb_Lz4Reader;
cdb_Lz4Reader.__name__ = ["cdb","Lz4Reader"];
cdb_Lz4Reader.uncompress = function(src,srcPos,srcLen,out,outPos) {
	var outSave = outPos;
	var srcEnd = srcPos + srcLen;
	if(srcLen == 0) return [srcPos,outPos,0];
	var outLen = out.length;
	while(true) {
		var start = srcPos;
		var tk = src.get(srcPos++);
		var litLen = tk >> 4;
		var matchLen = tk & 15;
		if(litLen == 15) {
			var b;
			do {
				b = src.get(srcPos++);
				litLen += b;
			} while(b == 255);
		}
		if(outPos + litLen > outLen) return [start,outPos,litLen + matchLen];
		switch(litLen) {
		case 0:
			break;
		case 1:
			var v = src.get(srcPos++);
			out.b[outPos] = v & 255;
			outPos++;
			break;
		case 2:
			var v1 = src.get(srcPos++);
			out.b[outPos] = v1 & 255;
			outPos++;
			var v2 = src.get(srcPos++);
			out.b[outPos] = v2 & 255;
			outPos++;
			break;
		case 3:
			var v3 = src.get(srcPos++);
			out.b[outPos] = v3 & 255;
			outPos++;
			var v4 = src.get(srcPos++);
			out.b[outPos] = v4 & 255;
			outPos++;
			var v5 = src.get(srcPos++);
			out.b[outPos] = v5 & 255;
			outPos++;
			break;
		default:
			out.blit(outPos,src,srcPos,litLen);
			outPos += litLen;
			srcPos += litLen;
		}
		if(srcPos >= srcEnd) break;
		var offset = src.get(srcPos++);
		offset |= src.get(srcPos++) << 8;
		if(matchLen == 15) {
			var b1;
			do {
				b1 = src.get(srcPos++);
				matchLen += b1;
			} while(b1 == 255);
		}
		matchLen += 4;
		if(outPos + matchLen > outLen) return [start,outPos - litLen,litLen + matchLen];
		if(matchLen >= 64 && matchLen <= offset) {
			out.blit(outPos,out,outPos - offset,matchLen);
			outPos += matchLen;
		} else {
			var copyEnd = outPos + matchLen;
			while(outPos < copyEnd) {
				out.b[outPos] = out.b[outPos - offset] & 255;
				outPos++;
			}
		}
	}
	if(srcPos != srcEnd) throw new js__$Boot_HaxeError("Read too much data " + (srcPos - srcLen));
	return [srcPos,outPos,0];
};
cdb_Lz4Reader.decodeString = function(s) {
	if(s == "") return new haxe_io_Bytes(new ArrayBuffer(0));
	var k = haxe_crypto_Base64.decode(s);
	if(k.b[0] != 4 || k.b[1] != 34 || k.b[2] != 77 || k.b[3] != 24) return k;
	var tmp = new Uint8Array(k.length);
	var _g1 = 0;
	var _g = k.length;
	while(_g1 < _g) {
		var i = _g1++;
		tmp[i] = k.b[i];
	}
	var k1 = lz4.decompress(tmp);
	var b = new haxe_io_Bytes(new ArrayBuffer(k1.length));
	var _g11 = 0;
	var _g2 = k1.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		b.b[i1] = k1[i1] & 255;
	}
	return b;
};
cdb_Lz4Reader.encodeBytes = function(b,compress) {
	if(compress && b.length > 0) {
		var tmp = new Uint8Array(b.length);
		var _g1 = 0;
		var _g = b.length;
		while(_g1 < _g) {
			var i = _g1++;
			tmp[i] = b.b[i];
		}
		tmp = lz4.compress(tmp,65536);
		b = new haxe_io_Bytes(new ArrayBuffer(tmp.length));
		var _g11 = 0;
		var _g2 = tmp.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			b.b[i1] = tmp[i1] & 255;
		}
	}
	return haxe_crypto_Base64.encode(b);
};
cdb_Lz4Reader.prototype = {
	b: function() {
		return this.bytes.get(this.pos++);
	}
	,grow: function(out,pos,len) {
		var size = out.length;
		do size = size * 3 >> 1; while(size < pos + len);
		var out2 = new haxe_io_Bytes(new ArrayBuffer(size));
		out2.blit(0,out,0,pos);
		return out2;
	}
	,read: function(bytes) {
		this.bytes = bytes;
		this.pos = 0;
		if(this.bytes.get(this.pos++) != 4 || this.bytes.get(this.pos++) != 34 || this.bytes.get(this.pos++) != 77 || this.bytes.get(this.pos++) != 24) throw new js__$Boot_HaxeError("Invalid header");
		var flags = this.bytes.get(this.pos++);
		if(flags >> 6 != 1) throw new js__$Boot_HaxeError("Invalid version " + (flags >> 6));
		var blockChecksum = (flags & 16) != 0;
		var streamSize = (flags & 8) != 0;
		var streamChecksum = (flags & 4) != 0;
		if((flags & 2) != 0) throw new js__$Boot_HaxeError("assert");
		var presetDict = (flags & 1) != 0;
		var bd = this.bytes.get(this.pos++);
		if((bd & 128) != 0) throw new js__$Boot_HaxeError("assert");
		var maxBlockSize = [0,0,0,0,65536,262144,1048576,4194304][bd >> 4 & 7];
		if(maxBlockSize == 0) throw new js__$Boot_HaxeError("assert");
		if((bd & 15) != 0) throw new js__$Boot_HaxeError("assert");
		if(streamSize) this.pos += 8;
		if(presetDict) throw new js__$Boot_HaxeError("Preset dictionary not supported");
		var headerChk = this.bytes.get(this.pos++);
		var out = new haxe_io_Bytes(new ArrayBuffer(128));
		var outPos = 0;
		while(true) {
			var size = this.bytes.get(this.pos++) | this.bytes.get(this.pos++) << 8 | this.bytes.get(this.pos++) << 16 | this.bytes.get(this.pos++) << 24;
			if(size == 0) break;
			if((size & -16) == 407710288) {
				var dataSize = this.bytes.get(this.pos++) | this.bytes.get(this.pos++) << 8 | this.bytes.get(this.pos++) << 16 | this.bytes.get(this.pos++) << 24;
				this.pos += dataSize;
				continue;
			}
			if((size & -2147483648) != 0) {
				size &= 2147483647;
				if(outPos + out.length < size) out = this.grow(out,outPos,size);
				out.blit(outPos,bytes,this.pos,size);
				outPos += size;
				this.pos += size;
			} else {
				var srcEnd = this.pos + size;
				while(this.pos < srcEnd) {
					var r = cdb_Lz4Reader.uncompress(bytes,this.pos,srcEnd - this.pos,out,outPos);
					this.pos = r[0];
					outPos = r[1];
					var req = r[2];
					if(req > 0) out = this.grow(out,outPos,req);
				}
			}
			if(blockChecksum) this.pos += 4;
		}
		return out.sub(0,outPos);
	}
	,__class__: cdb_Lz4Reader
};
var cdb_Parser = function() { };
$hxClasses["cdb.Parser"] = cdb_Parser;
cdb_Parser.__name__ = ["cdb","Parser"];
cdb_Parser.saveType = function(t) {
	switch(t[1]) {
	case 6:case 9:case 12:
		return t[1] + ":" + Std.string(t.slice(2)[0]);
	case 5:
		var values = t[2];
		return t[1] + ":" + values.join(",");
	case 10:
		var values1 = t[2];
		return t[1] + ":" + values1.join(",");
	case 0:case 1:case 8:case 3:case 7:case 4:case 2:case 11:case 13:case 14:case 15:case 16:
		return Std.string(t[1]);
	}
};
cdb_Parser.getType = function(str) {
	var _g = Std.parseInt(str);
	if(_g != null) switch(_g) {
	case 0:
		return cdb_ColumnType.TId;
	case 1:
		return cdb_ColumnType.TString;
	case 2:
		return cdb_ColumnType.TBool;
	case 3:
		return cdb_ColumnType.TInt;
	case 4:
		return cdb_ColumnType.TFloat;
	case 5:
		return cdb_ColumnType.TEnum(((function($this) {
			var $r;
			var pos = str.indexOf(":") + 1;
			$r = HxOverrides.substr(str,pos,null);
			return $r;
		}(this))).split(","));
	case 6:
		return cdb_ColumnType.TRef((function($this) {
			var $r;
			var pos1 = str.indexOf(":") + 1;
			$r = HxOverrides.substr(str,pos1,null);
			return $r;
		}(this)));
	case 7:
		return cdb_ColumnType.TImage;
	case 8:
		return cdb_ColumnType.TList;
	case 9:
		return cdb_ColumnType.TCustom((function($this) {
			var $r;
			var pos2 = str.indexOf(":") + 1;
			$r = HxOverrides.substr(str,pos2,null);
			return $r;
		}(this)));
	case 10:
		return cdb_ColumnType.TFlags(((function($this) {
			var $r;
			var pos3 = str.indexOf(":") + 1;
			$r = HxOverrides.substr(str,pos3,null);
			return $r;
		}(this))).split(","));
	case 11:
		return cdb_ColumnType.TColor;
	case 12:
		return cdb_ColumnType.TLayer((function($this) {
			var $r;
			var pos4 = str.indexOf(":") + 1;
			$r = HxOverrides.substr(str,pos4,null);
			return $r;
		}(this)));
	case 13:
		return cdb_ColumnType.TFile;
	case 14:
		return cdb_ColumnType.TTilePos;
	case 15:
		return cdb_ColumnType.TTileLayer;
	case 16:
		return cdb_ColumnType.TDynamic;
	default:
		throw new js__$Boot_HaxeError("Unknown type " + str);
	} else throw new js__$Boot_HaxeError("Unknown type " + str);
};
cdb_Parser.parse = function(content) {
	if(content == null) throw new js__$Boot_HaxeError("CDB content is null");
	var data = JSON.parse(content);
	var _g = 0;
	var _g1 = data.sheets;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = s.columns;
		while(_g2 < _g3.length) {
			var c = _g3[_g2];
			++_g2;
			c.type = cdb_Parser.getType(c.typeStr);
			c.typeStr = null;
		}
	}
	var _g4 = 0;
	var _g11 = data.customTypes;
	while(_g4 < _g11.length) {
		var t = _g11[_g4];
		++_g4;
		var _g21 = 0;
		var _g31 = t.cases;
		while(_g21 < _g31.length) {
			var c1 = _g31[_g21];
			++_g21;
			var _g41 = 0;
			var _g5 = c1.args;
			while(_g41 < _g5.length) {
				var a = _g5[_g41];
				++_g41;
				a.type = cdb_Parser.getType(a.typeStr);
				a.typeStr = null;
			}
		}
	}
	return data;
};
cdb_Parser.save = function(data) {
	var save = [];
	var _g = 0;
	var _g1 = data.sheets;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = s.columns;
		while(_g2 < _g3.length) {
			var c = _g3[_g2];
			++_g2;
			save.push(c.type);
			if(c.typeStr == null) c.typeStr = cdb_Parser.saveType(c.type);
			Reflect.deleteField(c,"type");
		}
	}
	var _g4 = 0;
	var _g11 = data.customTypes;
	while(_g4 < _g11.length) {
		var t = _g11[_g4];
		++_g4;
		var _g21 = 0;
		var _g31 = t.cases;
		while(_g21 < _g31.length) {
			var c1 = _g31[_g21];
			++_g21;
			var _g41 = 0;
			var _g5 = c1.args;
			while(_g41 < _g5.length) {
				var a = _g5[_g41];
				++_g41;
				save.push(a.type);
				if(a.typeStr == null) a.typeStr = cdb_Parser.saveType(a.type);
				Reflect.deleteField(a,"type");
			}
		}
	}
	var str = JSON.stringify(data,null,"\t");
	var _g6 = 0;
	var _g12 = data.sheets;
	while(_g6 < _g12.length) {
		var s1 = _g12[_g6];
		++_g6;
		var _g22 = 0;
		var _g32 = s1.columns;
		while(_g22 < _g32.length) {
			var c2 = _g32[_g22];
			++_g22;
			c2.type = save.shift();
		}
	}
	var _g7 = 0;
	var _g13 = data.customTypes;
	while(_g7 < _g13.length) {
		var t1 = _g13[_g7];
		++_g7;
		var _g23 = 0;
		var _g33 = t1.cases;
		while(_g23 < _g33.length) {
			var c3 = _g33[_g23];
			++_g23;
			var _g42 = 0;
			var _g51 = c3.args;
			while(_g42 < _g51.length) {
				var a1 = _g51[_g42];
				++_g42;
				a1.type = save.shift();
			}
		}
	}
	return str;
};
var cdb_TileBuilder = function(t,stride,total) {
	this.borders = [];
	this.groundIds = new haxe_ds_StringMap();
	this.groundMap = [];
	var _g1 = 0;
	var _g = total + 1;
	while(_g1 < _g) {
		var i = _g1++;
		this.groundMap[i] = 0;
	}
	this.groundMap[0] = 0;
	this.borders = [];
	var tmp = new haxe_ds_StringMap();
	var _g2 = 0;
	var _g11 = t.sets;
	while(_g2 < _g11.length) {
		var s = _g11[_g2];
		++_g2;
		var _g21 = s.t;
		switch(_g21) {
		case "ground":
			if(s.opts.name != "" && s.opts.name != null) {
				var g = tmp.get(s.opts.name);
				if(g == null) {
					g = [];
					tmp.set(s.opts.name,g);
				}
				g.push(s);
			} else {
			}
			break;
		default:
		}
	}
	var allGrounds = Lambda.array(tmp);
	allGrounds.sort(function(g1,g2) {
		var dp;
		dp = (function($this) {
			var $r;
			var v = g1[0].opts.priority;
			$r = v == null?0:v;
			return $r;
		}(this)) - (function($this) {
			var $r;
			var v1 = g2[0].opts.priority;
			$r = v1 == null?0:v1;
			return $r;
		}(this));
		if(dp != 0) return dp; else return Reflect.compare(g1[0].opts.name,g2[0].opts.name);
	});
	var gid = 0;
	var _g3 = 0;
	while(_g3 < allGrounds.length) {
		var g3 = allGrounds[_g3];
		++_g3;
		var p;
		var v2 = g3[0].opts.priority;
		if(v2 == null) p = 0; else p = v2;
		if(p > 0) gid++;
		var fill = [];
		var _g12 = 0;
		while(_g12 < g3.length) {
			var s1 = g3[_g12];
			++_g12;
			var _g31 = 0;
			var _g22 = s1.w;
			while(_g31 < _g22) {
				var dx = _g31++;
				var _g5 = 0;
				var _g4 = s1.h;
				while(_g5 < _g4) {
					var dy = _g5++;
					var tid = s1.x + dx + (s1.y + dy) * stride;
					fill.push(tid);
					this.groundMap[tid + 1] = gid;
				}
			}
		}
		this.groundIds.set(g3[0].opts.name,{ id : gid, fill : fill});
	}
	var maxGid = gid + 1;
	var allBorders = [];
	var _g6 = 0;
	var _g13 = t.sets;
	while(_g6 < _g13.length) {
		var s2 = _g13[_g6];
		++_g6;
		if(s2.t == "border") allBorders.push(s2);
	}
	allBorders.sort(function(b1,b2) {
		return (function($this) {
			var $r;
			var k = 0;
			if(b1.opts.borderIn != null) k += 1;
			if(b1.opts.borderOut != null) k += 2;
			if(b1.opts.borderMode != null) k += 4;
			if(b1.opts.borderIn != null && b1.opts.borderOut != null && b1.opts.borderIn != "lower" && b1.opts.borderOut != "upper") k += 8;
			$r = k;
			return $r;
		}(this)) - (function($this) {
			var $r;
			var k1 = 0;
			if(b2.opts.borderIn != null) k1 += 1;
			if(b2.opts.borderOut != null) k1 += 2;
			if(b2.opts.borderMode != null) k1 += 4;
			if(b2.opts.borderIn != null && b2.opts.borderOut != null && b2.opts.borderIn != "lower" && b2.opts.borderOut != "upper") k1 += 8;
			$r = k1;
			return $r;
		}(this));
	});
	var _g7 = 0;
	while(_g7 < allBorders.length) {
		var b = allBorders[_g7];
		++_g7;
		var gid1 = this.groundIds.get(b.opts.borderIn);
		var tid1 = this.groundIds.get(b.opts.borderOut);
		if(gid1 == null && tid1 == null) continue;
		var gids;
		var tids;
		if(gid1 != null) gids = [gid1.id]; else {
			var _g14 = b.opts.borderIn;
			if(_g14 == null) {
				var _g23 = [];
				var _g32 = tid1.id + 1;
				while(_g32 < maxGid) {
					var g4 = _g32++;
					_g23.push(g4);
				}
				gids = _g23;
			} else switch(_g14) {
			case "lower":
				var _g24 = [];
				var _g41 = 0;
				var _g33 = tid1.id;
				while(_g41 < _g33) {
					var g5 = _g41++;
					_g24.push(g5);
				}
				gids = _g24;
				break;
			default:
				continue;
			}
		}
		if(tid1 != null) tids = [tid1.id]; else {
			var _g15 = b.opts.borderOut;
			if(_g15 == null) {
				var _g25 = [];
				var _g42 = 0;
				var _g34 = gid1.id;
				while(_g42 < _g34) {
					var g6 = _g42++;
					_g25.push(g6);
				}
				tids = _g25;
			} else switch(_g15) {
			case "upper":
				var _g26 = [];
				var _g35 = gid1.id + 1;
				while(_g35 < maxGid) {
					var g7 = _g35++;
					_g26.push(g7);
				}
				tids = _g26;
				break;
			default:
				continue;
			}
		}
		var clear = gid1 != null && tid1 != null && b.opts.borderMode == null;
		var _g16 = b.opts.borderMode;
		if(_g16 != null) switch(_g16) {
		case "corner":
			var tmp1 = gids;
			gids = tids;
			tids = tmp1;
			break;
		default:
		} else {
		}
		var _g17 = 0;
		while(_g17 < gids.length) {
			var g8 = gids[_g17];
			++_g17;
			var _g27 = 0;
			while(_g27 < tids.length) {
				var t1 = tids[_g27];
				++_g27;
				var bt = this.borders[g8 + t1 * 256];
				if(bt == null || clear) {
					var _g36 = [];
					var _g43 = 0;
					while(_g43 < 20) {
						var i1 = _g43++;
						_g36.push([]);
					}
					bt = _g36;
					if(gid1 != null) bt[8] = gid1.fill;
					this.borders[g8 + t1 * 256] = bt;
				}
				var _g44 = 0;
				var _g37 = b.w;
				while(_g44 < _g37) {
					var dx1 = _g44++;
					var _g61 = 0;
					var _g51 = b.h;
					while(_g61 < _g51) {
						var dy1 = _g61++;
						var k2;
						var _g71 = b.opts.borderMode;
						if(_g71 == null) {
							if(dy1 == 0) if(dx1 == 0) k2 = 0; else if(dx1 == b.w - 1) k2 = 2; else k2 = 1; else if(dy1 == b.h - 1) if(dx1 == 0) k2 = 5; else if(dx1 == b.w - 1) k2 = 7; else k2 = 6; else if(dx1 == 0) k2 = 3; else if(dx1 == b.w - 1) k2 = 4; else continue;
						} else switch(_g71) {
						case "corner":
							if(dx1 == 0 && dy1 == 0) k2 = 9; else if(dx1 == b.w - 1 && dy1 == 0) k2 = 10; else if(dx1 == 0 && dy1 == b.h - 1) k2 = 11; else if(dx1 == b.w - 1 && dy1 == b.h - 1) k2 = 12; else continue;
							break;
						case "u":
							if(dx1 == 1 && dy1 == 0) k2 = 13; else if(dx1 == 0 && dy1 == 1) k2 = 14; else if(dx1 == 2 && dy1 == 1) k2 = 15; else if(dx1 == 1 && dy1 == 2) k2 = 16; else continue;
							break;
						case "bottom":
							if(dx1 == 0) k2 = 17; else if(dx1 == b.w - 1) k2 = 19; else k2 = 18;
							break;
						default:
							continue;
						}
						bt[k2].push(b.x + dx1 + (b.y + dy1) * stride);
					}
				}
			}
		}
	}
};
$hxClasses["cdb.TileBuilder"] = cdb_TileBuilder;
cdb_TileBuilder.__name__ = ["cdb","TileBuilder"];
cdb_TileBuilder.prototype = {
	random: function(n) {
		n *= -862048943;
		n = n << 15 | n >>> 17;
		n *= 461845907;
		var h = 5381;
		h ^= n;
		h = h << 13 | h >>> 19;
		h = h * 5 + -430675100;
		h ^= h >> 16;
		h *= -2048144789;
		h ^= h >> 13;
		h *= -1028477387;
		h ^= h >> 16;
		return h;
	}
	,buildGrounds: function(input,width) {
		var _g4 = this;
		var height = input.length / width | 0;
		var p = -1;
		var out = [];
		var _g = 0;
		while(_g < height) {
			var y = _g++;
			var _g1 = 0;
			while(_g1 < width) {
				var x = _g1++;
				var v = input[++p];
				var g = this.groundMap[v];
				var gl;
				if(x == 0) gl = g; else gl = this.groundMap[input[p - 1]];
				var gr;
				if(x == width - 1) gr = g; else gr = this.groundMap[input[p + 1]];
				var gt;
				if(y == 0) gt = g; else gt = this.groundMap[input[p - width]];
				var gb;
				if(y == height - 1) gb = g; else gb = this.groundMap[input[p + width]];
				var gtl;
				if(x == 0 || y == 0) gtl = g; else gtl = this.groundMap[input[p - 1 - width]];
				var gtr;
				if(x == width - 1 || y == 0) gtr = g; else gtr = this.groundMap[input[p + 1 - width]];
				var gbl;
				if(x == 0 || y == height - 1) gbl = g; else gbl = this.groundMap[input[p - 1 + width]];
				var gbr;
				if(x == width - 1 || y == height - 1) gbr = g; else gbr = this.groundMap[input[p + 1 + width]];
				var max;
				var a;
				var a1;
				if(gr > gl) a1 = gr; else a1 = gl;
				var b1;
				if(gt > gb) b1 = gt; else b1 = gb;
				if(a1 > b1) a = a1; else a = b1;
				var b;
				var a2;
				if(gtr > gtl) a2 = gtr; else a2 = gtl;
				var b2;
				if(gbr > gbl) b2 = gbr; else b2 = gbl;
				if(a2 > b2) b = a2; else b = b2;
				if(a > b) max = a; else max = b;
				var min;
				var a3;
				var a4;
				if(gr > gl) a4 = gl; else a4 = gr;
				var b4;
				if(gt > gb) b4 = gb; else b4 = gt;
				if(a4 > b4) a3 = b4; else a3 = a4;
				var b3;
				var a5;
				if(gtr > gtl) a5 = gtl; else a5 = gtr;
				var b5;
				if(gbr > gbl) b5 = gbl; else b5 = gbr;
				if(a5 > b5) b3 = b5; else b3 = a5;
				if(a3 > b3) min = b3; else min = a3;
				var _g3 = min;
				var _g2 = max + 1;
				while(_g3 < _g2) {
					var t = _g3++;
					var bb = this.borders[t + g * 256];
					if(bb == null) continue;
					var bits = 0;
					if(t == gtl) bits |= 1;
					if(t == gt) bits |= 2;
					if(t == gtr) bits |= 4;
					if(t == gl) bits |= 8;
					if(t == gr) bits |= 16;
					if(t == gbl) bits |= 32;
					if(t == gb) bits |= 64;
					if(t == gbr) bits |= 128;
					var f = false;
					if((bits & 26) == 26) {
						var a6 = bb[13];
						if(a6.length != 0) {
							bits &= -32;
							out.push(x);
							out.push(y);
							out.push(a6.length == 1?a6[0]:a6[_g4.random(x + y * width) % a6.length]);
							f = true;
						}
					}
					f;
					var f1 = false;
					if((bits & 74) == 74) {
						var a7 = bb[14];
						if(a7.length != 0) {
							bits &= -108;
							out.push(x);
							out.push(y);
							out.push(a7.length == 1?a7[0]:a7[_g4.random(x + y * width) % a7.length]);
							f1 = true;
						}
					}
					f1;
					var f2 = false;
					if((bits & 82) == 82) {
						var a8 = bb[15];
						if(a8.length != 0) {
							bits &= -215;
							out.push(x);
							out.push(y);
							out.push(a8.length == 1?a8[0]:a8[_g4.random(x + y * width) % a8.length]);
							f2 = true;
						}
					}
					f2;
					var f3 = false;
					if((bits & 88) == 88) {
						var a9 = bb[16];
						if(a9.length != 0) {
							bits &= -249;
							out.push(x);
							out.push(y);
							out.push(a9.length == 1?a9[0]:a9[_g4.random(x + y * width) % a9.length]);
							f3 = true;
						}
					}
					f3;
					var f4 = false;
					if((bits & 10) == 10) {
						var a10 = bb[9];
						if(a10.length != 0) {
							bits &= -48;
							out.push(x);
							out.push(y);
							out.push(a10.length == 1?a10[0]:a10[_g4.random(x + y * width) % a10.length]);
							f4 = true;
						}
					}
					f4;
					var f5 = false;
					if((bits & 18) == 18) {
						var a11 = bb[10];
						if(a11.length != 0) {
							bits &= -152;
							out.push(x);
							out.push(y);
							out.push(a11.length == 1?a11[0]:a11[_g4.random(x + y * width) % a11.length]);
							f5 = true;
						}
					}
					f5;
					var f6 = false;
					if((bits & 72) == 72) {
						var a12 = bb[11];
						if(a12.length != 0) {
							bits &= -234;
							out.push(x);
							out.push(y);
							out.push(a12.length == 1?a12[0]:a12[_g4.random(x + y * width) % a12.length]);
							f6 = true;
						}
					}
					f6;
					var f7 = false;
					if((bits & 80) == 80) {
						var a13 = bb[12];
						if(a13.length != 0) {
							bits &= -245;
							out.push(x);
							out.push(y);
							out.push(a13.length == 1?a13[0]:a13[_g4.random(x + y * width) % a13.length]);
							f7 = true;
						}
					}
					f7;
					if((function($this) {
						var $r;
						var f8 = false;
						if((bits & 2) == 2) {
							var a14 = bb[6];
							if(a14.length != 0) {
								bits &= -8;
								out.push(x);
								out.push(y);
								out.push(a14.length == 1?a14[0]:a14[_g4.random(x + y * width) % a14.length]);
								f8 = true;
							}
						}
						$r = f8;
						return $r;
					}(this))) {
						var a15 = bb[18];
						if(a15.length != 0) {
							out.push(x);
							out.push(y + 1);
							if(x > 0 && y > 0 && this.groundMap[input[p - 1 - width]] != t) out.push(a15[0]); else if(x < width - 1 && y > 0 && this.groundMap[input[p + 1 - width]] != t) out.push(a15[a15.length - 1]); else if(a15.length == 1) out.push(a15[0]); else out.push(a15[1 + this.random(x + y * width) % (a15.length - 2)]);
						}
					}
					var f9 = false;
					if((bits & 8) == 8) {
						var a16 = bb[4];
						if(a16.length != 0) {
							bits &= -42;
							out.push(x);
							out.push(y);
							out.push(a16.length == 1?a16[0]:a16[_g4.random(x + y * width) % a16.length]);
							f9 = true;
						}
					}
					f9;
					var f10 = false;
					if((bits & 16) == 16) {
						var a17 = bb[3];
						if(a17.length != 0) {
							bits &= -149;
							out.push(x);
							out.push(y);
							out.push(a17.length == 1?a17[0]:a17[_g4.random(x + y * width) % a17.length]);
							f10 = true;
						}
					}
					f10;
					var f11 = false;
					if((bits & 64) == 64) {
						var a18 = bb[1];
						if(a18.length != 0) {
							bits &= -225;
							out.push(x);
							out.push(y);
							out.push(a18.length == 1?a18[0]:a18[_g4.random(x + y * width) % a18.length]);
							f11 = true;
						}
					}
					f11;
					if((function($this) {
						var $r;
						var f12 = false;
						if((bits & 1) == 1) {
							var a19 = bb[7];
							if(a19.length != 0) {
								bits &= -2;
								out.push(x);
								out.push(y);
								out.push(a19.length == 1?a19[0]:a19[_g4.random(x + y * width) % a19.length]);
								f12 = true;
							}
						}
						$r = f12;
						return $r;
					}(this))) {
						var a20 = bb[19];
						if(a20.length != 0) {
							var y1 = y + 1;
							out.push(x);
							out.push(y1);
							out.push(a20.length == 1?a20[0]:a20[_g4.random(x + y1 * width) % a20.length]);
						}
					}
					if((function($this) {
						var $r;
						var f13 = false;
						if((bits & 4) == 4) {
							var a21 = bb[5];
							if(a21.length != 0) {
								bits &= -5;
								out.push(x);
								out.push(y);
								out.push(a21.length == 1?a21[0]:a21[_g4.random(x + y * width) % a21.length]);
								f13 = true;
							}
						}
						$r = f13;
						return $r;
					}(this))) {
						var a22 = bb[17];
						if(a22.length != 0) {
							var y2 = y + 1;
							out.push(x);
							out.push(y2);
							out.push(a22.length == 1?a22[0]:a22[_g4.random(x + y2 * width) % a22.length]);
						}
					}
					var f14 = false;
					if((bits & 32) == 32) {
						var a23 = bb[2];
						if(a23.length != 0) {
							bits &= -33;
							out.push(x);
							out.push(y);
							out.push(a23.length == 1?a23[0]:a23[_g4.random(x + y * width) % a23.length]);
							f14 = true;
						}
					}
					f14;
					var f15 = false;
					if((bits & 128) == 128) {
						var a24 = bb[0];
						if(a24.length != 0) {
							bits &= -129;
							out.push(x);
							out.push(y);
							out.push(a24.length == 1?a24[0]:a24[_g4.random(x + y * width) % a24.length]);
							f15 = true;
						}
					}
					f15;
				}
			}
		}
		return out;
	}
	,__class__: cdb_TileBuilder
};
var cdb__$Types_ArrayIterator = function(a) {
	this.a = a;
	this.pos = 0;
};
$hxClasses["cdb._Types.ArrayIterator"] = cdb__$Types_ArrayIterator;
cdb__$Types_ArrayIterator.__name__ = ["cdb","_Types","ArrayIterator"];
cdb__$Types_ArrayIterator.prototype = {
	hasNext: function() {
		return this.pos < this.a.length;
	}
	,next: function() {
		return this.a[this.pos++];
	}
	,__class__: cdb__$Types_ArrayIterator
};
var cdb__$Types_FlagsIterator = function(flags) {
	this.flags = flags;
	this.k = 0;
};
$hxClasses["cdb._Types.FlagsIterator"] = cdb__$Types_FlagsIterator;
cdb__$Types_FlagsIterator.__name__ = ["cdb","_Types","FlagsIterator"];
cdb__$Types_FlagsIterator.prototype = {
	hasNext: function() {
		return this.flags >= 1 << this.k;
	}
	,next: function() {
		while((this.flags & 1 << this.k) == 0) this.k++;
		return this.k++;
	}
	,__class__: cdb__$Types_FlagsIterator
};
var cdb__$Types_ArrayRead_$Impl_$ = {};
$hxClasses["cdb._Types.ArrayRead_Impl_"] = cdb__$Types_ArrayRead_$Impl_$;
cdb__$Types_ArrayRead_$Impl_$.__name__ = ["cdb","_Types","ArrayRead_Impl_"];
cdb__$Types_ArrayRead_$Impl_$._new = function(a) {
	return a;
};
cdb__$Types_ArrayRead_$Impl_$.get_length = function(this1) {
	return this1.length;
};
cdb__$Types_ArrayRead_$Impl_$.iterator = function(this1) {
	return new cdb__$Types_ArrayIterator(this1);
};
cdb__$Types_ArrayRead_$Impl_$.castArray = function(this1) {
	return this1;
};
cdb__$Types_ArrayRead_$Impl_$.toArrayCopy = function(this1) {
	return this1.slice();
};
cdb__$Types_ArrayRead_$Impl_$.getIndex = function(this1,v) {
	return this1[v];
};
var cdb__$Types_Flags_$Impl_$ = {};
$hxClasses["cdb._Types.Flags_Impl_"] = cdb__$Types_Flags_$Impl_$;
cdb__$Types_Flags_$Impl_$.__name__ = ["cdb","_Types","Flags_Impl_"];
cdb__$Types_Flags_$Impl_$._new = function(x) {
	return x;
};
cdb__$Types_Flags_$Impl_$.has = function(this1,t) {
	return (this1 & 1 << t) != 0;
};
cdb__$Types_Flags_$Impl_$.set = function(this1,t) {
	this1 |= 1 << t;
};
cdb__$Types_Flags_$Impl_$.unset = function(this1,t) {
	this1 &= ~(1 << t);
};
cdb__$Types_Flags_$Impl_$.iterator = function(this1) {
	return new cdb__$Types_FlagsIterator(this1);
};
cdb__$Types_Flags_$Impl_$.toInt = function(this1) {
	return this1;
};
var cdb__$Types_Layer_$Impl_$ = {};
$hxClasses["cdb._Types.Layer_Impl_"] = cdb__$Types_Layer_$Impl_$;
cdb__$Types_Layer_$Impl_$.__name__ = ["cdb","_Types","Layer_Impl_"];
cdb__$Types_Layer_$Impl_$._new = function(x) {
	return x;
};
cdb__$Types_Layer_$Impl_$.decode = function(this1,all) {
	var k = cdb_Lz4Reader.decodeString(this1);
	var _g = [];
	var _g2 = 0;
	var _g1 = k.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(all[k.b[i]]);
	}
	return _g;
};
cdb__$Types_Layer_$Impl_$.encode = function(a,compress) {
	var b = new haxe_io_Bytes(new ArrayBuffer(a.length));
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		b.b[i] = a[i] & 255;
	}
	var x = cdb_Lz4Reader.encodeBytes(b,compress);
	return x;
};
var cdb__$Types_TileLayerData_$Impl_$ = {};
$hxClasses["cdb._Types.TileLayerData_Impl_"] = cdb__$Types_TileLayerData_$Impl_$;
cdb__$Types_TileLayerData_$Impl_$.__name__ = ["cdb","_Types","TileLayerData_Impl_"];
cdb__$Types_TileLayerData_$Impl_$._new = function(v) {
	return v;
};
cdb__$Types_TileLayerData_$Impl_$.decode = function(this1) {
	var k = cdb_Lz4Reader.decodeString(this1);
	var _g = [];
	var _g2 = 0;
	var _g1 = k.length >> 1;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(k.b[i << 1] | k.b[(i << 1) + 1] << 8);
	}
	return _g;
};
cdb__$Types_TileLayerData_$Impl_$.encode = function(a,compress) {
	var b = new haxe_io_Bytes(new ArrayBuffer(a.length * 2));
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		var v = a[i];
		b.b[i << 1] = v & 255 & 255;
		b.b[(i << 1) + 1] = v >> 8 & 255 & 255;
	}
	return cdb__$Types_TileLayerData_$Impl_$._new(cdb_Lz4Reader.encodeBytes(b,compress));
};
var cdb__$Types_LevelPropsAccess_$Impl_$ = {};
$hxClasses["cdb._Types.LevelPropsAccess_Impl_"] = cdb__$Types_LevelPropsAccess_$Impl_$;
cdb__$Types_LevelPropsAccess_$Impl_$.__name__ = ["cdb","_Types","LevelPropsAccess_Impl_"];
cdb__$Types_LevelPropsAccess_$Impl_$.get_tileSize = function(this1) {
	return this1.tileSize;
};
cdb__$Types_LevelPropsAccess_$Impl_$.getTileset = function(this1,i,name) {
	return Reflect.field(i.sheet.props.level.tileSets,name);
};
cdb__$Types_LevelPropsAccess_$Impl_$.getLayer = function(this1,name) {
	if(this1 == null || this1.layers == null) return null;
	var _g = 0;
	var _g1 = this1.layers;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		if(l.l == name) return l.p;
	}
	return null;
};
var cdb_Index = function(data,name) {
	this.name = name;
	var _g = 0;
	var _g1 = data.sheets;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		if(s.name == name) {
			this.all = s.lines;
			this.sheet = s;
			break;
		}
	}
	if(this.sheet == null) throw new js__$Boot_HaxeError("'" + name + "' not found in CDB data");
};
$hxClasses["cdb.Index"] = cdb_Index;
cdb_Index.__name__ = ["cdb","Index"];
cdb_Index.prototype = {
	__class__: cdb_Index
};
var cdb_IndexId = function(data,name) {
	cdb_Index.call(this,data,name);
	this.byId = new haxe_ds_StringMap();
	this.byIndex = [];
	var _g = 0;
	var _g1 = this.sheet.columns;
	try {
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var _g2 = c.type;
			switch(_g2[1]) {
			case 0:
				var cname = c.name;
				var _g3 = 0;
				var _g4 = this.sheet.lines;
				while(_g3 < _g4.length) {
					var a = _g4[_g3];
					++_g3;
					var id = Reflect.field(a,cname);
					if(id != null && id != "") {
						var value = a;
						this.byId.set(id,value);
						this.byIndex.push(a);
					}
				}
				throw "__break__";
				break;
			default:
			}
		}
	} catch( e ) { if( e != "__break__" ) throw e; }
};
$hxClasses["cdb.IndexId"] = cdb_IndexId;
cdb_IndexId.__name__ = ["cdb","IndexId"];
cdb_IndexId.__super__ = cdb_Index;
cdb_IndexId.prototype = $extend(cdb_Index.prototype,{
	get: function(k) {
		return this.byId.get(k);
	}
	,resolve: function(id,opt) {
		if(id == null) return null;
		var v = this.byId.get(id);
		if(v == null && !opt) throw new js__$Boot_HaxeError("Missing " + this.name + "." + id); else return v;
	}
	,__class__: cdb_IndexId
});
var cdb_jq_Message = $hxClasses["cdb.jq.Message"] = { __ename__ : ["cdb","jq","Message"], __constructs__ : ["Create","AddClass","RemoveClass","Append","CreateText","Reset","Dock","Remove","Event","SetAttr","SetStyle","Trigger","Special","Anim","Dispose","Unbind"] };
cdb_jq_Message.Create = function(id,name,attr) { var $x = ["Create",0,id,name,attr]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.AddClass = function(id,name) { var $x = ["AddClass",1,id,name]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.RemoveClass = function(id,name) { var $x = ["RemoveClass",2,id,name]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Append = function(id,to) { var $x = ["Append",3,id,to]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.CreateText = function(id,text,pid) { var $x = ["CreateText",4,id,text,pid]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Reset = function(id) { var $x = ["Reset",5,id]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Dock = function(pid,id,dir,size) { var $x = ["Dock",6,pid,id,dir,size]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Remove = function(id) { var $x = ["Remove",7,id]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Event = function(id,name,eid) { var $x = ["Event",8,id,name,eid]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.SetAttr = function(id,att,val) { var $x = ["SetAttr",9,id,att,val]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.SetStyle = function(id,st,val) { var $x = ["SetStyle",10,id,st,val]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Trigger = function(id,name) { var $x = ["Trigger",11,id,name]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Special = function(id,name,args,eid) { var $x = ["Special",12,id,name,args,eid]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Anim = function(id,name,dur) { var $x = ["Anim",13,id,name,dur]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Dispose = function(id,events) { var $x = ["Dispose",14,id,events]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
cdb_jq_Message.Unbind = function(events) { var $x = ["Unbind",15,events]; $x.__enum__ = cdb_jq_Message; $x.toString = $estr; return $x; };
var cdb_jq_Answer = $hxClasses["cdb.jq.Answer"] = { __ename__ : ["cdb","jq","Answer"], __constructs__ : ["Event","SetValue","Done"] };
cdb_jq_Answer.Event = function(eid,props) { var $x = ["Event",0,eid,props]; $x.__enum__ = cdb_jq_Answer; $x.toString = $estr; return $x; };
cdb_jq_Answer.SetValue = function(id,value) { var $x = ["SetValue",1,id,value]; $x.__enum__ = cdb_jq_Answer; $x.toString = $estr; return $x; };
cdb_jq_Answer.Done = function(eid) { var $x = ["Done",2,eid]; $x.__enum__ = cdb_jq_Answer; $x.toString = $estr; return $x; };
var cdb_jq_DockDirection = $hxClasses["cdb.jq.DockDirection"] = { __ename__ : ["cdb","jq","DockDirection"], __constructs__ : ["Left","Right","Up","Down","Fill"] };
cdb_jq_DockDirection.Left = ["Left",0];
cdb_jq_DockDirection.Left.toString = $estr;
cdb_jq_DockDirection.Left.__enum__ = cdb_jq_DockDirection;
cdb_jq_DockDirection.Right = ["Right",1];
cdb_jq_DockDirection.Right.toString = $estr;
cdb_jq_DockDirection.Right.__enum__ = cdb_jq_DockDirection;
cdb_jq_DockDirection.Up = ["Up",2];
cdb_jq_DockDirection.Up.toString = $estr;
cdb_jq_DockDirection.Up.__enum__ = cdb_jq_DockDirection;
cdb_jq_DockDirection.Down = ["Down",3];
cdb_jq_DockDirection.Down.toString = $estr;
cdb_jq_DockDirection.Down.__enum__ = cdb_jq_DockDirection;
cdb_jq_DockDirection.Fill = ["Fill",4];
cdb_jq_DockDirection.Fill.toString = $estr;
cdb_jq_DockDirection.Fill.__enum__ = cdb_jq_DockDirection;
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getDouble: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getFloat64(pos,true);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s_b += String.fromCharCode(chars[c >> 4]);
			s_b += String.fromCharCode(chars[c & 15]);
		}
		return s_b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) complement = true;
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0?0:1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_crypto_Md5 = function() {
};
$hxClasses["haxe.crypto.Md5"] = haxe_crypto_Md5;
haxe_crypto_Md5.__name__ = ["haxe","crypto","Md5"];
haxe_crypto_Md5.make = function(b) {
	var h = new haxe_crypto_Md5().doEncode(haxe_crypto_Md5.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(16));
	var p = 0;
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		out.set(p++,h[i] & 255);
		out.set(p++,h[i] >> 8 & 255);
		out.set(p++,h[i] >> 16 & 255);
		out.set(p++,h[i] >>> 24);
	}
	return out;
};
haxe_crypto_Md5.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var blksSize = nblk * 16;
	var _g = 0;
	while(_g < blksSize) {
		var i1 = _g++;
		blks[i1] = 0;
	}
	var i = 0;
	while(i < b.length) {
		blks[i >> 2] |= b.b[i] << (((b.length << 3) + i & 3) << 3);
		i++;
	}
	blks[i >> 2] |= 128 << (b.length * 8 + i) % 4 * 8;
	var l = b.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe_crypto_Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe_crypto_Md5
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addInt32: function(v) {
		this.b.push(v & 255);
		this.b.push(v >> 8 & 255);
		this.b.push(v >> 16 & 255);
		this.b.push(v >>> 24);
	}
	,addInt64: function(v) {
		this.addInt32(v.low);
		this.addInt32(v.high);
	}
	,addDouble: function(v) {
		this.addInt64(haxe_io_FPHelper.doubleToI64(v));
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = ["haxe","io","Output"];
haxe_io_Output.prototype = {
	writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) throw new js__$Boot_HaxeError(haxe_io_Error.Overflow);
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.b.b.push(c);
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.prototype = {
	__class__: haxe_io_Path
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = ["js","Lib"];
var js_Selection = function(doc) {
	this.doc = doc;
};
$hxClasses["js.Selection"] = js_Selection;
js_Selection.__name__ = ["js","Selection"];
js_Selection.prototype = {
	insert: function(left,text,right) {
		this.doc.focus();
		if(this.doc.selectionStart != null) {
			var top = this.doc.scrollTop;
			var start = this.doc.selectionStart;
			var end = this.doc.selectionEnd;
			this.doc.value = Std.string(this.doc.value.substr(0,start)) + left + text + right + Std.string(this.doc.value.substr(end));
			this.doc.selectionStart = start + left.length;
			this.doc.selectionEnd = start + left.length + text.length;
			this.doc.scrollTop = top;
			return;
		}
		var range = js_Lib.document.selection.createRange();
		range.text = left + text + right;
		range.moveStart("character",-text.length - right.length);
		range.moveEnd("character",-right.length);
		range.select();
	}
	,__class__: js_Selection
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_node_Fs = require("fs");
var js_node_Net = require("net");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_webkit_App = require("nw.gui").App;
var js_node_webkit_Clipboard = require("nw.gui").Clipboard;
var js_node_webkit_Menu = require("nw.gui").Menu;
var js_node_webkit_MenuItem = require("nw.gui").MenuItem;
var js_node_webkit_Shell = require("nw.gui").Shell;
var js_node_webkit_Window = require("nw.gui").Window;
var lvl_Image = function(w,h) {
	this.originY = 0;
	this.originX = 0;
	this.width = w;
	this.height = h;
	var _this = window.document;
	this.canvas = _this.createElement("canvas");
	this.origin = this.canvas;
	this.canvas.width = w;
	this.canvas.height = h;
	this.init();
};
$hxClasses["lvl.Image"] = lvl_Image;
lvl_Image.__name__ = ["lvl","Image"];
lvl_Image.clearCache = function(url) {
	lvl_Image.cache.remove(url);
};
lvl_Image.load = function(url,callb,onError,forceReload) {
	var i = lvl_Image.cache.get(url);
	if(i != null && !forceReload) {
		var im = new lvl_Image(i.width,i.height);
		im.ctx.drawImage(i,0,0);
		im.origin = i;
		callb(im);
		return;
	}
	var _this = window.document;
	i = _this.createElement("img");
	i.onload = function(_) {
		var i2 = lvl_Image.cache.get(url);
		if(i2 == null || forceReload) lvl_Image.cache.set(url,i); else i = i2;
		var im1 = new lvl_Image(i.width,i.height);
		im1.ctx.drawImage(i,0,0);
		im1.origin = i;
		callb(im1);
	};
	i.onerror = function(_1) {
		if(onError != null) {
			onError();
			return;
		}
		var i1 = new lvl_Image(16,16);
		i1.fill(-65281);
		callb(i1);
	};
	i.src = url;
};
lvl_Image.fromCanvas = function(c) {
	var i = new lvl_Image(0,0);
	i.width = c.width;
	i.height = c.height;
	i.canvas = i.origin = c;
	i.init();
	return i;
};
lvl_Image.prototype = {
	get_smooth: function() {
		return this.ctx.imageSmoothingEnabled;
	}
	,set_smooth: function(v) {
		return this.ctx.imageSmoothingEnabled = v;
	}
	,get_alpha: function() {
		return this.ctx.globalAlpha;
	}
	,set_alpha: function(v) {
		return this.ctx.globalAlpha = v;
	}
	,init: function() {
		this.ctx = this.canvas.getContext("2d",null);
		this.ctx.imageSmoothingEnabled = false;
	}
	,getColor: function(color) {
		if(color >>> 24 == 255) return "#" + StringTools.hex(color & 16777215,6); else return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + (color >>> 24) / 255 + ")";
	}
	,getCanvas: function() {
		return this.canvas;
	}
	,clear: function() {
		this.ctx.clearRect(0,0,this.width,this.height);
		this.invalidate();
	}
	,invalidate: function() {
		if(this.origin == this.canvas) return;
		this.origin = this.canvas;
		this.originX = this.originY = 0;
		this.origin.texture = null;
	}
	,fill: function(color) {
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.fillRect(0,0,this.width,this.height);
		this.invalidate();
	}
	,fillRect: function(x,y,w,h,color) {
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.fillRect(x,y,w,h);
		this.invalidate();
	}
	,sub: function(x,y,w,h) {
		var i = new lvl_Image(w,h);
		i.ctx.drawImage(this.origin,x,y,w,h,0,0,w,h);
		i.origin = this.origin;
		i.originX = this.originX + x;
		i.originY = this.originY + y;
		return i;
	}
	,text: function(text,x,y,color) {
		if(color == null) color = -1;
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.fillText(text,x,y);
		this.invalidate();
	}
	,draw: function(i,x,y) {
		this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,x,y,i.width,i.height);
		this.invalidate();
	}
	,drawMat: function(i,m) {
		this.ctx.setTransform(m.a,m.b,m.c,m.d,m.x,m.y);
		this.draw(i,0,0);
		this.ctx.setTransform(1,0,0,1,0,0);
	}
	,drawScaled: function(i,x,y,width,height) {
		this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,x,y,width,height);
		this.invalidate();
	}
	,drawSub: function(i,srcX,srcY,srcW,srcH,x,y,dstW,dstH) {
		if(dstH == null) dstH = -1;
		if(dstW == null) dstW = -1;
		if(dstW < 0) dstW = srcW;
		if(dstH < 0) dstH = srcH;
		this.ctx.drawImage(i.origin,srcX + i.originX,srcY + i.originY,srcW,srcH,x,y,dstW,dstH);
		this.invalidate();
	}
	,copyFrom: function(i) {
		this.ctx.fillStyle = "rgba(0,0,0,0)";
		this.ctx.fillRect(0,0,this.width,this.height);
		this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,0,0,this.width,this.height);
		this.invalidate();
	}
	,isBlank: function() {
		var i = this.ctx.getImageData(0,0,this.width,this.height);
		var _g1 = 0;
		var _g = this.width * this.height * 4;
		while(_g1 < _g) {
			var k = _g1++;
			if(i.data[k] != 0) return false;
		}
		return true;
	}
	,getPixel: function(x,y) {
		var i = this.ctx.getImageData(x,y,1,1);
		return i.data[3] << 24 | i.data[0] << 16 | i.data[1] << 8 | i.data[2];
	}
	,setSize: function(width,height) {
		if(width == this.width && height == this.height) return;
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.setAttribute("width",width + "px");
		this.canvas.setAttribute("height",height + "px");
		this.width = width;
		this.height = height;
		this.init();
		this.invalidate();
	}
	,resize: function(width,height) {
		if(width == this.width && height == this.height) return;
		var c;
		var _this = window.document;
		c = _this.createElement("canvas");
		c.width = width;
		c.height = height;
		var ctx2 = c.getContext("2d",null);
		ctx2.imageSmoothingEnabled = this.ctx.imageSmoothingEnabled;
		ctx2.drawImage(this.canvas,0,0,this.width,this.height,0,0,width,height);
		this.ctx = ctx2;
		this.canvas = c;
		this.width = width;
		this.height = height;
		this.invalidate();
	}
	,__class__: lvl_Image
};
var lvl_Image3D = function(w,h) {
	this.scrollY = 0;
	this.scrollX = 0;
	this.alphaValue = 1.;
	this.zoom = 1;
	lvl_Image.call(this,w,h);
	var _this = window.document;
	this.viewport = _this.createElement("div");
	this.viewport.style.backgroundColor = "black";
	this.viewport.style.overflow = "hidden";
	this.viewport.appendChild(this.canvas);
	this.canvas.width = 2048;
	this.canvas.height = 2048;
	this.canvas.setAttribute("width",2048 + "px");
	this.canvas.setAttribute("height",2048 + "px");
	this.colorCache = new haxe_ds_IntMap();
	this.curDraw = new Float32Array(16 * Math.ceil(10922.666666666666));
	this.curIndex = new Uint16Array(65536);
};
$hxClasses["lvl.Image3D"] = lvl_Image3D;
lvl_Image3D.__name__ = ["lvl","Image3D"];
lvl_Image3D.getInstance = function() {
	if(lvl_Image3D.inst == null) lvl_Image3D.inst = new lvl_Image3D(0,0);
	return lvl_Image3D.inst;
};
lvl_Image3D.fromCanvas = function(c) {
	var i = new lvl_Image3D(0,0);
	i.width = c.width;
	i.height = c.height;
	i.canvas = i.origin = c;
	i.init();
	return i;
};
lvl_Image3D.__super__ = lvl_Image;
lvl_Image3D.prototype = $extend(lvl_Image.prototype,{
	init: function() {
		this.dispose();
		this.gl = this.canvas.gl;
		if(this.gl != null) {
			this.initScale();
			return;
		}
		this.gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(this.canvas,{ alpha : false, antialias : false});
		if(this.gl == null) js_Browser.alert("Cannot initialize WebGL context ! (windows user : install DirectX redist)");
		this.canvas.gl = this.gl;
		this.gl.disable(2884);
		this.gl.disable(2929);
		var vertex = this.gl.createShader(35633);
		this.gl.shaderSource(vertex,"\r\n\t\t\tvarying vec2 tuv;\r\n\t\t\tattribute vec2 pos;\r\n\t\t\tattribute vec2 uv;\r\n\t\t\tuniform vec2 scroll;\r\n\t\t\tvoid main() {\r\n\t\t\t\ttuv = uv;\r\n\t\t\t\tgl_Position = vec4(pos + vec2(-1.,1.) + scroll, 0, 1);\r\n\t\t\t}\r\n\t\t");
		this.gl.compileShader(vertex);
		if(this.gl.getShaderParameter(vertex,35713) != 1) throw new js__$Boot_HaxeError(this.gl.getShaderInfoLog(vertex));
		var frag = this.gl.createShader(35632);
		this.gl.shaderSource(frag,"\r\n\t\t\tvarying mediump vec2 tuv;\r\n\t\t\tuniform sampler2D texture;\r\n\t\t\tuniform lowp float alpha;\r\n\t\t\tvoid main() {\r\n\t\t\t\tlowp vec4 color = texture2D(texture, tuv);\r\n\t\t\t\tcolor.a *= alpha;\r\n\t\t\t\tgl_FragColor = color;\r\n\t\t\t}\r\n\t\t");
		this.gl.compileShader(frag);
		if(this.gl.getShaderParameter(frag,35713) != 1) throw new js__$Boot_HaxeError(this.gl.getShaderInfoLog(frag));
		var p = this.gl.createProgram();
		this.gl.attachShader(p,vertex);
		this.gl.attachShader(p,frag);
		this.gl.linkProgram(p);
		if(this.gl.getProgramParameter(p,35714) != 1) throw new js__$Boot_HaxeError(this.gl.getProgramInfoLog(p));
		this.gl.useProgram(p);
		this.gl.enableVertexAttribArray(0);
		this.gl.enableVertexAttribArray(1);
		this.gl.enable(3042);
		this.gl.blendFunc(770,771);
		this.uniScroll = this.gl.getUniformLocation(p,"scroll");
		this.uniTex = this.gl.getUniformLocation(p,"texture");
		this.uniAlpha = this.gl.getUniformLocation(p,"alpha");
		this.attribPos = this.gl.getAttribLocation(p,"pos");
		this.attribUV = this.gl.getAttribLocation(p,"uv");
		this.initScale();
	}
	,dispose: function() {
		if(this.texturesObjects != null) {
			var _g = 0;
			var _g1 = this.texturesObjects;
			while(_g < _g1.length) {
				var o = _g1[_g];
				++_g;
				this.gl.deleteTexture(o.texture);
				o.texture = null;
			}
		}
		this.texturesObjects = [];
		if(this.allocatedBuffers != null) {
			var _g2 = 0;
			var _g11 = this.allocatedBuffers;
			while(_g2 < _g11.length) {
				var b = _g11[_g2];
				++_g2;
				this.gl.deleteBuffer(b);
			}
			this.allocatedBuffers = [];
		}
	}
	,get_alpha: function() {
		return this.alphaValue;
	}
	,set_alpha: function(v) {
		if(this.alphaValue == v) return v;
		this.endDraw();
		return this.alphaValue = v;
	}
	,beginDraw: function(t) {
		if(t != this.curTexture) {
			this.endDraw();
			this.curTexture = t;
			this.drawPos = 0;
			this.indexPos = 0;
		}
	}
	,getColorImage: function(color) {
		var i = this.colorCache.h[color];
		if(i != null) return i;
		i = new lvl_Image(1,1);
		i.fill(color);
		this.colorCache.h[color] = i;
		return i;
	}
	,getTexture: function(i) {
		var t = i.origin.texture;
		if(t != null) return t;
		t = this.gl.createTexture();
		i.origin.texture = t;
		t.origin = i.origin;
		this.gl.bindTexture(3553,t);
		this.gl.texParameteri(3553,10240,9728);
		this.gl.texParameteri(3553,10241,9728);
		this.gl.texParameteri(3553,10242,33071);
		this.gl.texParameteri(3553,10243,33071);
		this.gl.texImage2D(3553,0,6408,6408,5121,i.origin);
		this.gl.bindTexture(3553,null);
		this.texturesObjects.push(i.origin);
		t.width = i.origin.width;
		t.height = i.origin.height;
		return t;
	}
	,drawMat: function(i,m) {
		var _g = this;
		this.beginDraw(this.getTexture(i));
		var w = i.width;
		var h = i.height;
		var pos = this.drawPos >> 2;
		this.curDraw[this.drawPos++] = (0 * m.a + 0 * m.c + m.x) * _g.scaleX;
		this.curDraw[this.drawPos++] = (0 * m.b + 0 * m.d + m.y) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + 0.001) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = i.originY / _g.curTexture.height;
		this.curDraw[this.drawPos++] = (w * m.a + 0 * m.c + m.x) * _g.scaleX;
		this.curDraw[this.drawPos++] = (w * m.b + 0 * m.d + m.y) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + i.width) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = i.originY / _g.curTexture.height;
		this.curDraw[this.drawPos++] = (0 * m.a + h * m.c + m.x) * _g.scaleX;
		this.curDraw[this.drawPos++] = (0 * m.b + h * m.d + m.y) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + 0.001) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = (i.originY + i.height + -0.01) / _g.curTexture.height;
		this.curDraw[this.drawPos++] = (w * m.a + h * m.c + m.x) * _g.scaleX;
		this.curDraw[this.drawPos++] = (w * m.b + h * m.d + m.y) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + i.width) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = (i.originY + i.height + -0.01) / _g.curTexture.height;
		this.curIndex[this.indexPos++] = pos;
		this.curIndex[this.indexPos++] = pos + 1;
		this.curIndex[this.indexPos++] = pos + 2;
		this.curIndex[this.indexPos++] = pos + 1;
		this.curIndex[this.indexPos++] = pos + 3;
		this.curIndex[this.indexPos++] = pos + 2;
		if(this.indexPos > 65500) this.endDraw();
	}
	,draw: function(i,x,y) {
		var _g = this;
		this.beginDraw(this.getTexture(i));
		var x1 = x;
		var y1 = y;
		var w = i.width;
		var h = i.height;
		var pos = this.drawPos >> 2;
		this.curDraw[this.drawPos++] = x1 * _g.scaleX;
		this.curDraw[this.drawPos++] = y1 * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + 0.001) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = i.originY / _g.curTexture.height;
		this.curDraw[this.drawPos++] = (x1 + w) * _g.scaleX;
		this.curDraw[this.drawPos++] = y1 * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + i.width) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = i.originY / _g.curTexture.height;
		this.curDraw[this.drawPos++] = x1 * _g.scaleX;
		this.curDraw[this.drawPos++] = (y1 + h) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + 0.001) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = (i.originY + i.height + -0.01) / _g.curTexture.height;
		this.curDraw[this.drawPos++] = (x1 + w) * _g.scaleX;
		this.curDraw[this.drawPos++] = (y1 + h) * _g.scaleY;
		this.curDraw[this.drawPos++] = (i.originX + i.width) / _g.curTexture.width;
		this.curDraw[this.drawPos++] = (i.originY + i.height + -0.01) / _g.curTexture.height;
		this.curIndex[this.indexPos++] = pos;
		this.curIndex[this.indexPos++] = pos + 1;
		this.curIndex[this.indexPos++] = pos + 2;
		this.curIndex[this.indexPos++] = pos + 1;
		this.curIndex[this.indexPos++] = pos + 3;
		this.curIndex[this.indexPos++] = pos + 2;
		if(this.indexPos > 65500) this.endDraw();
	}
	,endDraw: function() {
		var _g = this;
		if(this.curTexture == null || this.indexPos == 0) return;
		var index = this.gl.createBuffer();
		var vertex = this.gl.createBuffer();
		this.gl.bindBuffer(34962,vertex);
		this.gl.bufferData(34962,this.curDraw.subarray(0,this.drawPos),35044);
		this.gl.bindBuffer(34963,index);
		this.gl.bufferData(34963,this.curIndex.subarray(0,this.indexPos),35044);
		var alpha = this.get_alpha();
		var curTexture = this.curTexture;
		var indexPos = this.indexPos;
		this.drawCommands.push(function() {
			_g.gl.bindBuffer(34962,vertex);
			_g.gl.bindBuffer(34963,index);
			_g.gl.vertexAttribPointer(_g.attribPos,2,5126,false,16,0);
			_g.gl.vertexAttribPointer(_g.attribUV,2,5126,false,16,8);
			_g.gl.activeTexture(33984);
			_g.gl.uniform1i(_g.uniTex,0);
			_g.gl.uniform1f(_g.uniAlpha,alpha);
			_g.gl.bindTexture(3553,curTexture);
			_g.gl.drawElements(4,indexPos,5123,0);
		});
		this.allocatedBuffers.push(index);
		this.allocatedBuffers.push(vertex);
		this.indexPos = 0;
		this.drawPos = 0;
	}
	,setSize: function(w,h) {
		this.viewport.style.width = w + "px";
		this.viewport.style.height = h + "px";
		this.width = w;
		this.height = h;
	}
	,initScale: function() {
		this.scaleX = this.zoom / 2048 * 2;
		this.scaleY = this.zoom / 2048 * -2;
	}
	,fill: function(color) {
		var _g = this;
		this.gl.clearColor((color >> 16 & 255) / 255,(color >> 8 & 255) / 255,(color & 255) / 255,(color >>> 24) / 255);
		if(this.allocatedBuffers != null) {
			var _g1 = 0;
			var _g11 = this.allocatedBuffers;
			while(_g1 < _g11.length) {
				var b = _g11[_g1];
				++_g1;
				this.gl.deleteBuffer(b);
			}
		}
		this.allocatedBuffers = [];
		this.drawCommands = [function() {
			_g.gl.clear(16384);
		}];
	}
	,fillRect: function(x,y,w,h,color) {
		var i = this.getColorImage(color);
		i.width = w;
		i.height = h;
		this.draw(i,x,y);
	}
	,flush: function() {
		var _g = this;
		this.endDraw();
		this.drawCommands.push(function() {
			_g.gl.bindBuffer(34962,null);
			_g.gl.bindBuffer(34963,null);
			_g.gl.bindTexture(3553,null);
			_g.gl.finish();
		});
		this.redraw();
	}
	,setScrollPos: function(x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.scrollX = x;
		this.scrollY = y;
		this.redraw();
	}
	,redraw: function() {
		this.gl.viewport(0,0,2048,2048);
		this.canvas.style.marginLeft = (this.scrollX | 0) + "px";
		this.canvas.style.marginTop = (this.scrollY | 0) + "px";
		this.gl.uniform2f(this.uniScroll,-this.scrollX * 2 / 2048,this.scrollY * 2 / 2048);
		if(this.drawCommands != null) {
			var _g = 0;
			var _g1 = this.drawCommands;
			while(_g < _g1.length) {
				var d = _g1[_g];
				++_g;
				d();
			}
		}
	}
	,set_zoom: function(z) {
		this.zoom = z;
		this.initScale();
		return z;
	}
	,__class__: lvl_Image3D
});
var lvl_LayerInnerData = $hxClasses["lvl.LayerInnerData"] = { __ename__ : ["lvl","LayerInnerData"], __constructs__ : ["Layer","Objects","Tiles","TileInstances"] };
lvl_LayerInnerData.Layer = function(a) { var $x = ["Layer",0,a]; $x.__enum__ = lvl_LayerInnerData; $x.toString = $estr; return $x; };
lvl_LayerInnerData.Objects = function(idCol,objs) { var $x = ["Objects",1,idCol,objs]; $x.__enum__ = lvl_LayerInnerData; $x.toString = $estr; return $x; };
lvl_LayerInnerData.Tiles = function(t,data) { var $x = ["Tiles",2,t,data]; $x.__enum__ = lvl_LayerInnerData; $x.toString = $estr; return $x; };
lvl_LayerInnerData.TileInstances = function(t,insts) { var $x = ["TileInstances",3,t,insts]; $x.__enum__ = lvl_LayerInnerData; $x.toString = $estr; return $x; };
var lvl_LayerGfx = function(level) {
	this.height = 0;
	this.stride = 0;
	this.level = level;
};
$hxClasses["lvl.LayerGfx"] = lvl_LayerGfx;
lvl_LayerGfx.__name__ = ["lvl","LayerGfx"];
lvl_LayerGfx.prototype = {
	fromSheet: function(sheet,defColor) {
		var _g5 = this;
		this.blanks = [];
		if(sheet == null) {
			this.colors = [defColor];
			this.names = [""];
			return;
		}
		var idCol = null;
		var imageTags = [];
		var _g = 0;
		var _g1 = sheet.columns;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var _g2 = c.type;
			switch(_g2[1]) {
			case 11:
				var _g3 = [];
				var _g4 = 0;
				var _g51 = sheet.lines;
				while(_g4 < _g51.length) {
					var o = _g51[_g4];
					++_g4;
					_g3.push((function($this) {
						var $r;
						var c1 = Reflect.field(o,c.name);
						$r = c1 == null?0:c1;
						return $r;
					}(this)));
				}
				this.colors = _g3;
				break;
			case 7:
				if(this.images == null) this.images = [];
				var size = [this.level.tileSize];
				var _g41 = 0;
				var _g31 = sheet.lines.length;
				while(_g41 < _g31) {
					var idx = [_g41++];
					if(imageTags[idx[0]]) continue;
					var key = Reflect.field(sheet.lines[idx[0]],c.name);
					var idat = this.level.model.getImageData(key);
					if(idat == null) {
						var i = new lvl_Image(size[0],size[0]);
						i.text("#" + idx[0],0,12);
						this.images[idx[0]] = i;
						continue;
					}
					this.level.wait();
					imageTags[idx[0]] = true;
					lvl_Image.load(idat,(function(idx,size) {
						return function(i1) {
							i1.resize(size[0],size[0]);
							_g5.images[idx[0]] = i1;
							_g5.level.waitDone();
						};
					})(idx,size));
				}
				break;
			case 14:
				if(this.images == null) this.images = [];
				var size1 = this.level.tileSize;
				var _g42 = 0;
				var _g32 = sheet.lines.length;
				while(_g42 < _g32) {
					var idx1 = [_g42++];
					if(imageTags[idx1[0]]) continue;
					var data = [Reflect.field(sheet.lines[idx1[0]],c.name)];
					if(data[0] == null && this.images[idx1[0]] != null) continue;
					if(data[0] == null) {
						var i2 = new lvl_Image(size1,size1);
						i2.text("#" + idx1[0],0,12);
						this.images[idx1[0]] = i2;
						continue;
					}
					this.level.wait();
					imageTags[idx1[0]] = true;
					lvl_Image.load(this.level.model.getAbsPath(data[0].file),(function(data,idx1) {
						return function(i3) {
							var i21 = i3.sub(data[0].x * data[0].size,data[0].y * data[0].size,data[0].size * (data[0].width == null?1:data[0].width),data[0].size * (data[0].height == null?1:data[0].height));
							_g5.images[idx1[0]] = i21;
							_g5.blanks[idx1[0]] = i21.isBlank();
							_g5.level.waitDone();
						};
					})(data,idx1));
					this.level.watch(data[0].file,(function(data) {
						return function() {
							lvl_Image.clearCache(_g5.level.model.getAbsPath(data[0].file));
							_g5.level.reload();
						};
					})(data));
				}
				break;
			case 0:
				idCol = c;
				break;
			default:
			}
		}
		this.names = [];
		this.stride = Math.ceil(Math.sqrt(sheet.lines.length));
		this.height = Math.ceil(sheet.lines.length / this.stride);
		this.idToIndex = new haxe_ds_StringMap();
		this.indexToId = [];
		var _g11 = 0;
		var _g6 = sheet.lines.length;
		while(_g11 < _g6) {
			var index = _g11++;
			var o1 = sheet.lines[index];
			var n;
			if(sheet.props.displayColumn != null) n = Reflect.field(o1,sheet.props.displayColumn); else n = null;
			if((n == null || n == "") && idCol != null) n = Reflect.field(o1,idCol.name);
			if(n == null || n == "") n = "#" + index;
			if(idCol != null) {
				var id = Reflect.field(o1,idCol.name);
				if(id != null && id != "") this.idToIndex.set(id,index);
				this.indexToId[index] = id;
			}
			this.names.push(n);
		}
	}
	,__class__: lvl_LayerGfx
};
var lvl_LayerData = function(level,name,p,target) {
	this.currentHeight = 1;
	this.currentWidth = 1;
	this.current = 0;
	this.lock = false;
	this.visible = true;
	lvl_LayerGfx.call(this,level);
	this.name = name;
	this.props = p;
	this.targetObj = target;
};
$hxClasses["lvl.LayerData"] = lvl_LayerData;
lvl_LayerData.__name__ = ["lvl","LayerData"];
lvl_LayerData.__super__ = lvl_LayerGfx;
lvl_LayerData.prototype = $extend(lvl_LayerGfx.prototype,{
	loadSheetData: function(sheet) {
		if(sheet == null && this.props.color == null) {
			this.props.color = 16711680;
			var _g = 0;
			var _g1 = this.level.sheet.lines;
			while(_g < _g1.length) {
				var o = _g1[_g];
				++_g;
				var props = o.props;
				if(props == null) continue;
				var _g2 = 0;
				var _g3 = props.layers;
				while(_g2 < _g3.length) {
					var l = _g3[_g2];
					++_g2;
					if(l.l == this.name && l.p.color != null) {
						this.props.color = l.p.color;
						props = null;
						break;
					}
				}
				if(props == null) break;
			}
		}
		this.sheet = sheet;
		this.fromSheet(sheet,this.props.color);
		this.loadState();
	}
	,enabled: function() {
		return this.visible && !this.lock;
	}
	,loadState: function() {
		var state;
		try {
			state = haxe_Unserializer.run(js_Browser.getLocalStorage().getItem(this.level.sheetPath + ":" + this.name));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			state = null;
		}
		if(state != null) {
			this.set_visible(state.visible);
			this.lock = !(!state.lock);
			this.floatCoord = this.hasFloatCoord && !state.lockGrid;
			if(state.current < (this.images != null?this.images.length:this.names.length)) {
				this.set_current(state.current);
				if(this.current % this.stride + state.cw <= this.stride && (this.current / this.stride | 0) + state.ch <= this.height) {
					this.currentWidth = state.cw;
					this.currentHeight = state.ch;
				}
			}
		}
		this.stateLoaded = true;
	}
	,setLayerData: function(val) {
		if(val == null || val == "") this.data = lvl_LayerInnerData.Layer((function($this) {
			var $r;
			var _g = [];
			{
				var _g2 = 0;
				var _g1 = $this.level.width * $this.level.height;
				while(_g2 < _g1) {
					var x = _g2++;
					_g.push(0);
				}
			}
			$r = _g;
			return $r;
		}(this))); else {
			var a = cdb_Lz4Reader.decodeString(val);
			if(a.length != this.level.width * this.level.height) throw new js__$Boot_HaxeError("Invalid layer data");
			this.data = lvl_LayerInnerData.Layer((function($this) {
				var $r;
				var _g11 = [];
				{
					var _g3 = 0;
					var _g21 = $this.level.width * $this.level.height;
					while(_g3 < _g21) {
						var i = _g3++;
						_g11.push(a.b[i]);
					}
				}
				$r = _g11;
				return $r;
			}(this)));
		}
		if(this.sheet.lines.length > 256) throw new js__$Boot_HaxeError("Too many lines");
	}
	,getTileProp: function(mode) {
		if(this.tileProps == null) return null;
		var _g = 0;
		var _g1 = this.tileProps.sets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.x + s.y * this.stride == this.current && s.t == mode) return s;
		}
		return null;
	}
	,getTileObjects: function() {
		var objs = new haxe_ds_IntMap();
		if(this.tileProps == null) return objs;
		var _g = 0;
		var _g1 = this.tileProps.sets;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o.t == "object") objs.h[o.x + o.y * this.stride] = o;
		}
		return objs;
	}
	,getSelObjects: function() {
		if(this.tileProps == null) return [];
		var x = this.current % this.stride;
		var y = this.current / this.stride | 0;
		var out = [];
		var _g = 0;
		var _g1 = this.tileProps.sets;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o.t == "object" && !(o.x >= x + this.currentWidth || o.y >= y + this.currentHeight || o.x + o.w <= x || o.y + o.h <= y)) out.push(o);
		}
		return out;
	}
	,setObjectsData: function(id,val) {
		this.data = lvl_LayerInnerData.Objects(id,val);
	}
	,setTilesData: function(val) {
		var _g1 = this;
		var file;
		if(val == null) file = null; else file = val.file;
		var size;
		if(val == null) size = 16; else size = val.size;
		var data;
		if(val == null) {
			var _g = [];
			var _g2 = 0;
			var _g11 = this.level.width * this.level.height;
			while(_g2 < _g11) {
				var i = _g2++;
				_g.push(0);
			}
			data = _g;
		} else data = cdb__$Types_TileLayerData_$Impl_$.decode(val.data);
		var stride;
		if(val == null) stride = 0; else stride = val.stride;
		var d = { file : file, size : size, stride : stride};
		this.images = [];
		this.data = lvl_LayerInnerData.Tiles(d,data);
		if(file == null) {
			if(this.props.mode != "tiles" && this.props.mode != null) Reflect.deleteField(this.props,"mode");
			var i1 = new lvl_Image(16,16);
			i1.fill(-65281);
			this.images.push(i1);
			this.loadState();
			return;
		}
		this.level.wait();
		this.level.loadAndSplit(file,size,function(w,h,images,blanks) {
			_g1.images = images;
			_g1.blanks = blanks;
			if(data[0] == 65535) _g1.props.mode = "objects";
			var _g21 = _g1.props.mode;
			if(_g21 == null) {
				var max = w * h;
				var _g4 = 0;
				var _g3 = data.length;
				while(_g4 < _g3) {
					var i2 = _g4++;
					var v = data[i2] - 1;
					if(v < 0) continue;
					var vx = v % stride;
					var vy = v / stride | 0;
					var v2 = vx + vy * w;
					if(vx >= w || vy >= h || blanks[v2]) v2 = -1;
					if(v != v2) {
						data[i2] = v2 + 1;
						_g1.dirty = true;
					}
				}
			} else switch(_g21) {
			case "tiles":case "ground":
				var max1 = w * h;
				var _g41 = 0;
				var _g31 = data.length;
				while(_g41 < _g31) {
					var i3 = _g41++;
					var v1 = data[i3] - 1;
					if(v1 < 0) continue;
					var vx1 = v1 % stride;
					var vy1 = v1 / stride | 0;
					var v21 = vx1 + vy1 * w;
					if(vx1 >= w || vy1 >= h || blanks[v21]) v21 = -1;
					if(v1 != v21) {
						data[i3] = v21 + 1;
						_g1.dirty = true;
					}
				}
				break;
			case "objects":
				var insts = [];
				var p = 1;
				if(data[0] != 65535) throw new js__$Boot_HaxeError("assert");
				while(p < data.length) {
					var x = data[p++];
					var y = data[p++];
					var v3 = data[p++];
					var flip = (v3 & 32768) != 0;
					var rot = x >> 15 | y >> 15 << 1;
					v3 &= 32767;
					var x1 = (x & 32767) / _g1.level.tileSize;
					var y1 = (y & 32767) / _g1.level.tileSize;
					var vx2 = v3 % stride;
					var vy2 = v3 / stride | 0;
					var v22 = vx2 + vy2 * w;
					if(vx2 >= w || vy2 >= h || x1 >= _g1.level.width || y1 >= _g1.level.height) {
						_g1.dirty = true;
						continue;
					}
					if(v3 != v22) _g1.dirty = true;
					insts.push({ x : x1, y : y1, o : v22, flip : flip, rot : rot});
				}
				_g1.data = lvl_LayerInnerData.TileInstances(d,insts);
				_g1.hasRotFlip = true;
				_g1.hasFloatCoord = _g1.floatCoord = true;
				break;
			}
			_g1.stride = d.stride = w;
			_g1.height = h;
			_g1.tileProps = _g1.level.palette.getTileProps(file,w,w * h);
			_g1.loadState();
			_g1.level.waitDone();
		});
	}
	,set_visible: function(v) {
		this.visible = v;
		if(this.comp != null) this.comp.toggleClass("hidden",!this.visible);
		return v;
	}
	,set_current: function(v) {
		this.current = v;
		this.currentWidth = 1;
		this.currentHeight = 1;
		this.saveState();
		return v;
	}
	,setCurrent: function(id,w,h) {
		if(this.current == id && this.currentWidth == w && this.currentHeight == h) return;
		this.current = id;
		this.currentWidth = w;
		this.currentHeight = h;
		this.saveState(false);
	}
	,saveState: function(sync) {
		if(sync == null) sync = true;
		if(!this.stateLoaded) return;
		if(sync && this.data != null) {
			var _g = this.data;
			switch(_g[1]) {
			case 2:
				var t = _g[2];
				var _g1 = 0;
				var _g2 = this.level.layers;
				while(_g1 < _g2.length) {
					var l = _g2[_g1];
					++_g1;
					if(l != this) {
						var _g3 = l.data;
						switch(_g3[1]) {
						case 2:
							var t2 = _g3[2];
							if(t2.file == t.file) l.setCurrent(this.current,this.currentWidth,this.currentHeight); else {
							}
							break;
						case 3:
							var t21 = _g3[2];
							if(t21.file == t.file) l.setCurrent(this.current,this.currentWidth,this.currentHeight); else {
							}
							break;
						default:
						}
					}
				}
				break;
			case 3:
				var t1 = _g[2];
				var _g11 = 0;
				var _g21 = this.level.layers;
				while(_g11 < _g21.length) {
					var l1 = _g21[_g11];
					++_g11;
					if(l1 != this) {
						var _g31 = l1.data;
						switch(_g31[1]) {
						case 2:
							var t22 = _g31[2];
							if(t22.file == t1.file) l1.setCurrent(this.current,this.currentWidth,this.currentHeight); else {
							}
							break;
						case 3:
							var t23 = _g31[2];
							if(t23.file == t1.file) l1.setCurrent(this.current,this.currentWidth,this.currentHeight); else {
							}
							break;
						default:
						}
					}
				}
				break;
			default:
			}
		}
		var s = { current : this.current, visible : this.visible, lock : this.lock, lockGrid : this.hasFloatCoord && !this.floatCoord, cw : this.currentWidth, ch : this.currentHeight};
		js_Browser.getLocalStorage().setItem(this.level.sheetPath + ":" + this.name,haxe_Serializer.run(s));
	}
	,save: function() {
		if(!this.dirty) return;
		this.dirty = false;
		Reflect.setField(this.targetObj.o,this.targetObj.f,this.getData());
	}
	,getData: function() {
		{
			var _g = this.data;
			switch(_g[1]) {
			case 0:
				var data = _g[2];
				var b = new haxe_io_Bytes(new ArrayBuffer(this.level.width * this.level.height));
				var p = 0;
				var _g2 = 0;
				var _g1 = this.level.height;
				while(_g2 < _g1) {
					var y = _g2++;
					var _g4 = 0;
					var _g3 = this.level.width;
					while(_g4 < _g3) {
						var x = _g4++;
						b.b[p] = data[p] & 255;
						p++;
					}
				}
				return cdb_Lz4Reader.encodeBytes(b,this.level.model.compressionEnabled());
			case 1:
				var objs = _g[3];
				return objs;
			case 2:
				var data1 = _g[3];
				var t = _g[2];
				var b1 = new haxe_io_BytesOutput();
				var _g21 = 0;
				var _g11 = data1.length;
				while(_g21 < _g11) {
					var r = _g21++;
					b1.writeUInt16(data1[r]);
				}
				if(t.file == null) return null; else return { file : t.file, size : t.size, stride : t.stride, data : cdb_Lz4Reader.encodeBytes(b1.getBytes(),this.level.model.compressionEnabled())};
				break;
			case 3:
				var insts = _g[3];
				var t1 = _g[2];
				var b2 = new haxe_io_BytesOutput();
				b2.writeUInt16(65535);
				var _g12 = 0;
				while(_g12 < insts.length) {
					var i = insts[_g12];
					++_g12;
					b2.writeUInt16(i.x * this.level.tileSize | 0 | (i.rot & 1) << 15);
					b2.writeUInt16(i.y * this.level.tileSize | 0 | i.rot >> 1 << 15);
					b2.writeUInt16(i.o | (i.flip?1:0) << 15);
				}
				if(t1.file == null) return null; else return { file : t1.file, size : t1.size, stride : t1.stride, data : cdb_Lz4Reader.encodeBytes(b2.getBytes(),this.level.model.compressionEnabled())};
				break;
			}
		}
	}
	,scale: function(s) {
		var width = this.level.width;
		var height = this.level.height;
		{
			var _g = this.data;
			switch(_g[1]) {
			case 2:
				var data = _g[3];
				var ndata = [];
				var _g1 = 0;
				while(_g1 < height) {
					var y = _g1++;
					var _g2 = 0;
					while(_g2 < width) {
						var x = _g2++;
						var tx = x / s | 0;
						var ty = y / s | 0;
						var k;
						if(tx >= width || ty >= height) k = 0; else k = data[tx + ty * width];
						ndata.push(k);
					}
				}
				var _g21 = 0;
				var _g11 = width * height;
				while(_g21 < _g11) {
					var i = _g21++;
					data[i] = ndata[i];
				}
				break;
			case 0:
				var data1 = _g[2];
				var ndata1 = [];
				var _g12 = 0;
				while(_g12 < height) {
					var y1 = _g12++;
					var _g22 = 0;
					while(_g22 < width) {
						var x1 = _g22++;
						var tx1 = x1 / s | 0;
						var ty1 = y1 / s | 0;
						var k1;
						if(tx1 >= width || ty1 >= height) k1 = 0; else k1 = data1[tx1 + ty1 * width];
						ndata1.push(k1);
					}
				}
				var _g23 = 0;
				var _g13 = width * height;
				while(_g23 < _g13) {
					var i1 = _g23++;
					data1[i1] = ndata1[i1];
				}
				break;
			case 1:
				var objs = _g[3];
				var m;
				if(this.floatCoord) m = this.level.tileSize; else m = 1;
				var _g14 = 0;
				var _g24 = objs.slice();
				while(_g14 < _g24.length) {
					var o = _g24[_g14];
					++_g14;
					o.x = (o.x * s * m | 0) / m;
					o.y = (o.y * s * m | 0) / m;
					if(o.x < 0 || o.y < 0 || o.x >= width || o.y >= height) HxOverrides.remove(objs,o);
				}
				break;
			case 3:
				var insts = _g[3];
				var m1;
				if(this.floatCoord) m1 = this.level.tileSize; else m1 = 1;
				var _g15 = 0;
				var _g25 = insts.slice();
				while(_g15 < _g25.length) {
					var i2 = _g25[_g15];
					++_g15;
					i2.x = (i2.x * s * m1 | 0) / m1;
					i2.y = (i2.y * s * m1 | 0) / m1;
					if(i2.x < 0 || i2.y < 0 || i2.x >= width || i2.y >= height) HxOverrides.remove(insts,i2);
				}
				break;
			}
		}
	}
	,scroll: function(dx,dy) {
		var width = this.level.width;
		var height = this.level.height;
		{
			var _g = this.data;
			switch(_g[1]) {
			case 2:
				var data = _g[3];
				var ndata = [];
				var _g1 = 0;
				while(_g1 < height) {
					var y = _g1++;
					var _g2 = 0;
					while(_g2 < width) {
						var x = _g2++;
						var tx = x - dx;
						var ty = y - dy;
						var k;
						if(tx < 0 || ty < 0 || tx >= width || ty >= height) k = 0; else k = data[tx + ty * width];
						ndata.push(k);
					}
				}
				var _g21 = 0;
				var _g11 = width * height;
				while(_g21 < _g11) {
					var i = _g21++;
					data[i] = ndata[i];
				}
				break;
			case 0:
				var data1 = _g[2];
				var ndata1 = [];
				var _g12 = 0;
				while(_g12 < height) {
					var y1 = _g12++;
					var _g22 = 0;
					while(_g22 < width) {
						var x1 = _g22++;
						var tx1 = x1 - dx;
						var ty1 = y1 - dy;
						var k1;
						if(tx1 < 0 || ty1 < 0 || tx1 >= width || ty1 >= height) k1 = 0; else k1 = data1[tx1 + ty1 * width];
						ndata1.push(k1);
					}
				}
				var _g23 = 0;
				var _g13 = width * height;
				while(_g23 < _g13) {
					var i1 = _g23++;
					data1[i1] = ndata1[i1];
				}
				break;
			case 1:
				var objs = _g[3];
				var _g14 = 0;
				var _g24 = objs.slice();
				while(_g14 < _g24.length) {
					var o = _g24[_g14];
					++_g14;
					o.x += dx;
					o.y += dy;
					if(o.x < 0 || o.y < 0 || o.x >= width || o.y >= height) HxOverrides.remove(objs,o);
				}
				break;
			case 3:
				var insts = _g[3];
				var _g15 = 0;
				var _g25 = insts.slice();
				while(_g15 < _g25.length) {
					var i2 = _g25[_g15];
					++_g15;
					i2.x += dx;
					i2.y += dy;
					if(i2.x < 0 || i2.y < 0 || i2.x >= width || i2.y >= height) HxOverrides.remove(insts,i2);
				}
				break;
			}
		}
	}
	,setMode: function(mode) {
		var old = this.props.mode;
		if(old == null) old = "tiles";
		var width = this.level.width;
		var height = this.level.height;
		switch(old) {
		case "ground":case "tiles":
			switch(mode) {
			case "tiles":case "ground":
				break;
			case "objects":
				{
					var _g = this.data;
					switch(_g[1]) {
					case 2:
						var data = _g[3];
						var td = _g[2];
						var oids = new haxe_ds_IntMap();
						var _g1 = 0;
						var _g2 = this.tileProps.sets;
						while(_g1 < _g2.length) {
							var p1 = _g2[_g1];
							++_g1;
							if(p1.t == "object") oids.h[p1.x + p1.y * this.stride] = p1;
						}
						var objs = [];
						var p = -1;
						var _g11 = 0;
						while(_g11 < height) {
							var y = _g11++;
							var _g21 = 0;
							while(_g21 < width) {
								var x = _g21++;
								var d = data[++p] - 1;
								if(d < 0) continue;
								var o = oids.h[d];
								if(o != null) {
									var _g4 = 0;
									var _g3 = o.h;
									while(_g4 < _g3) {
										var dy = _g4++;
										var _g6 = 0;
										var _g5 = o.w;
										while(_g6 < _g5) {
											var dx = _g6++;
											var tp = p + dx + dy * width;
											if(x + dx >= width || y + dy >= height) continue;
											var id = d + dx + dy * this.stride;
											if(data[tp] != id + 1) {
												if(data[tp] == 0 && this.blanks[id]) continue;
												o = null;
												break;
											}
										}
										if(o == null) break;
									}
								}
								if(o == null) objs.push({ x : x, y : y, b : y, id : d}); else {
									var _g41 = 0;
									var _g31 = o.h;
									while(_g41 < _g31) {
										var dy1 = _g41++;
										var _g61 = 0;
										var _g51 = o.w;
										while(_g61 < _g51) {
											var dx1 = _g61++;
											if(x + dx1 >= width || y + dy1 >= height) continue;
											data[p + dx1 + dy1 * width] = 0;
										}
									}
									objs.push({ x : x, y : y, b : y + o.w - 1, id : d});
								}
							}
						}
						objs.sort(function(o1,o2) {
							return o1.b - o2.b;
						});
						this.data = lvl_LayerInnerData.TileInstances(td,(function($this) {
							var $r;
							var _g12 = [];
							{
								var _g22 = 0;
								while(_g22 < objs.length) {
									var o3 = objs[_g22];
									++_g22;
									_g12.push({ x : o3.x, y : o3.y, o : o3.id, flip : false, rot : 0});
								}
							}
							$r = _g12;
							return $r;
						}(this)));
						this.dirty = true;
						break;
					default:
						throw new js__$Boot_HaxeError("assert0");
					}
				}
				break;
			}
			break;
		case "objects":
			switch(mode) {
			case "objects":
				break;
			case "ground":case "tiles":
				{
					var _g7 = this.data;
					switch(_g7[1]) {
					case 3:
						var insts = _g7[3];
						var td1 = _g7[2];
						var objs1 = this.getTileObjects();
						var data1;
						var _g13 = [];
						var _g32 = 0;
						var _g23 = width * height;
						while(_g32 < _g23) {
							var i = _g32++;
							_g13.push(0);
						}
						data1 = _g13;
						var _g24 = 0;
						while(_g24 < insts.length) {
							var i1 = insts[_g24];
							++_g24;
							var x1 = i1.x | 0;
							var y1 = i1.y | 0;
							var obj = objs1.h[i1.o];
							if(obj == null) data1[x1 + y1 * width] = i1.o + 1; else {
								var _g42 = 0;
								var _g33 = obj.h;
								while(_g42 < _g33) {
									var dy2 = _g42++;
									var _g62 = 0;
									var _g52 = obj.w;
									while(_g62 < _g52) {
										var dx2 = _g62++;
										var x2 = x1 + dx2;
										var y2 = y1 + dy2;
										if(x2 < width && y2 < height) data1[x2 + y2 * width] = i1.o + dx2 + dy2 * this.stride + 1;
									}
								}
							}
						}
						this.data = lvl_LayerInnerData.Tiles(td1,data1);
						this.dirty = true;
						break;
					default:
						throw new js__$Boot_HaxeError("assert1");
					}
				}
				break;
			}
			break;
		}
		this.props.mode = mode;
		if(mode == "tiles") Reflect.deleteField(this.props,"mode");
	}
	,initMatrix: function(m,w,h,rot,flip) {
		m.a = 1;
		m.b = 0;
		m.c = 0;
		m.d = 1;
		m.x = -w * 0.5;
		m.y = -h * 0.5;
		if(rot != 0) {
			var a = Math.PI * rot / 2;
			var c = Math.cos(a);
			var s = Math.sin(a);
			var x = m.x;
			var y = m.y;
			m.a = c;
			m.b = s;
			m.c = -s;
			m.d = c;
			m.x = x * c - y * s;
			m.y = x * s + y * c;
		}
		if(flip) {
			m.a = -m.a;
			m.c = -m.c;
			m.x = -m.x;
		}
		m.x += Math.abs(m.a * w * 0.5 + m.c * h * 0.5);
		m.y += Math.abs(m.b * w * 0.5 + m.d * h * 0.5);
	}
	,draw: function(view) {
		view.set_alpha(this.props.alpha);
		var width = this.level.width;
		var height = this.level.height;
		var size = this.level.tileSize;
		{
			var _g = this.data;
			switch(_g[1]) {
			case 0:
				var data = _g[2];
				var first = this.level.layers[0] == this;
				var _g1 = 0;
				while(_g1 < height) {
					var y = _g1++;
					var _g2 = 0;
					while(_g2 < width) {
						var x = _g2++;
						var k = data[x + y * width];
						if(k == 0 && !first) continue;
						if(this.images != null) {
							var i = this.images[k];
							view.draw(i,x * size - (i.width - size >> 1),y * size - (i.height - size));
							continue;
						}
						view.fillRect(x * size,y * size,size,size,this.colors[k] | -16777216);
					}
				}
				break;
			case 2:
				var data1 = _g[3];
				var t = _g[2];
				var _g11 = 0;
				while(_g11 < height) {
					var y1 = _g11++;
					var _g21 = 0;
					while(_g21 < width) {
						var x1 = _g21++;
						var k1 = data1[x1 + y1 * width] - 1;
						if(k1 < 0) continue;
						view.draw(this.images[k1],x1 * size,y1 * size);
					}
				}
				if(this.props.mode == "ground") {
					var b = new cdb_TileBuilder(this.tileProps,this.stride,this.images.length);
					var a = b.buildGrounds(data1,width);
					var p = 0;
					var max = a.length;
					while(p < max) {
						var x2 = a[p++];
						var y2 = a[p++];
						var id = a[p++];
						view.draw(this.images[id],x2 * size,y2 * size);
					}
				}
				break;
			case 3:
				var insts = _g[3];
				var objs = this.getTileObjects();
				var mat = { a : 1., b : 0., c : 0., d : 1., x : 0., y : 0.};
				var _g12 = 0;
				while(_g12 < insts.length) {
					var i1 = insts[_g12];
					++_g12;
					var x3 = i1.x * size | 0;
					var y3 = i1.y * size | 0;
					var obj = objs.h[i1.o];
					var w;
					if(obj == null) w = 1; else w = obj.w;
					var h;
					if(obj == null) h = 1; else h = obj.h;
					this.initMatrix(mat,w * size,h * size,i1.rot,i1.flip);
					mat.x += x3;
					mat.y += y3;
					if(obj == null) {
						view.drawMat(this.images[i1.o],mat);
						view.fillRect(x3,y3,size,size,-2130771968);
					} else {
						var px = mat.x;
						var py = mat.y;
						var _g3 = 0;
						var _g22 = obj.h;
						while(_g3 < _g22) {
							var dy = _g3++;
							var _g5 = 0;
							var _g4 = obj.w;
							while(_g5 < _g4) {
								var dx = _g5++;
								mat.x = px + dx * size * mat.a + dy * size * mat.c;
								mat.y = py + dx * size * mat.b + dy * size * mat.d;
								view.drawMat(this.images[i1.o + dx + dy * this.stride],mat);
							}
						}
					}
				}
				break;
			case 1:
				var objs1 = _g[3];
				var idCol = _g[2];
				if(idCol == null) {
					var col = this.props.color | -1610612736;
					var _g13 = 0;
					while(_g13 < objs1.length) {
						var o = objs1[_g13];
						++_g13;
						var w1;
						if(this.hasSize) w1 = o.width * size; else w1 = size;
						var h1;
						if(this.hasSize) h1 = o.height * size; else h1 = size;
						view.fillRect(o.x * size | 0,o.y * size | 0,w1 | 0,h1 | 0,col);
					}
					var col1 = this.props.color | -16777216;
					var _g14 = 0;
					while(_g14 < objs1.length) {
						var o1 = objs1[_g14];
						++_g14;
						var w2;
						if(this.hasSize) w2 = o1.width * size | 0; else w2 = size;
						var h2;
						if(this.hasSize) h2 = o1.height * size | 0; else h2 = size;
						var px1 = o1.x * size | 0;
						var py1 = o1.y * size | 0;
						view.fillRect(px1,py1,w2,1,col1);
						view.fillRect(px1,py1 + h2 - 1,w2,1,col1);
						view.fillRect(px1,py1 + 1,1,h2 - 2,col1);
						view.fillRect(px1 + w2 - 1,py1 + 1,1,h2 - 2,col1);
					}
				} else {
					var _g15 = 0;
					while(_g15 < objs1.length) {
						var o2 = objs1[_g15];
						++_g15;
						var id1 = Reflect.field(o2,idCol);
						var k2 = this.idToIndex.get(id1);
						if(k2 == null) {
							var w4;
							if(this.hasSize) w4 = o2.width * size; else w4 = size;
							var h4;
							if(this.hasSize) h4 = o2.height * size; else h4 = size;
							view.fillRect(o2.x * size | 0,o2.y * size | 0,w4 | 0,h4 | 0,-65281);
							continue;
						}
						if(this.images != null) {
							var i2 = this.images[k2];
							view.draw(i2,(o2.x * size | 0) - (i2.width - size >> 1),(o2.y * size | 0) - (i2.height - size));
							continue;
						}
						var w3;
						if(this.hasSize) w3 = o2.width * size; else w3 = size;
						var h3;
						if(this.hasSize) h3 = o2.height * size; else h3 = size;
						view.fillRect(o2.x * size | 0,o2.y * size | 0,w3 | 0,h3 | 0,this.colors[k2] | -16777216);
					}
				}
				break;
			}
		}
	}
	,__class__: lvl_LayerData
});
var lvl_Palette = function(level) {
	this.modeCursor = 0;
	this.mode = null;
	this.randomMode = false;
	this.paintMode = false;
	this.small = false;
	this.level = level;
};
$hxClasses["lvl.Palette"] = lvl_Palette;
lvl_Palette.__name__ = ["lvl","Palette"];
lvl_Palette.prototype = {
	init: function() {
		this.perTileProps = [];
		var _g = 0;
		var _g1 = this.level.sheet.columns;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.name == "tileProps" && c.type == cdb_ColumnType.TList) this.perTileProps = SheetData.model.smap.get(this.level.sheet.name + "@" + c.name).s.columns;
		}
		this.perTileGfx = new haxe_ds_StringMap();
		var _g2 = 0;
		var _g11 = this.perTileProps;
		while(_g2 < _g11.length) {
			var c1 = _g11[_g2];
			++_g2;
			{
				var _g21 = c1.type;
				switch(_g21[1]) {
				case 6:
					var s = _g21[2];
					var g = new lvl_LayerGfx(this.level);
					g.fromSheet(this.level.model.smap.get(s).s,16711680);
					this.perTileGfx.set(c1.name,g);
					break;
				default:
				}
			}
		}
	}
	,getDefault: function(c) {
		return this.level.model.getDefault(c);
	}
	,getTileProp: function(x,y,create) {
		if(create == null) create = true;
		var l = this.currentLayer;
		var a = x + y * l.stride;
		var p = this.currentLayer.tileProps.props[a];
		if(p == null) {
			if(!create) return null;
			p = { };
			var _g = 0;
			var _g1 = this.perTileProps;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				var v = this.getDefault(c);
				if(v != null) p[c.name] = v;
			}
			this.currentLayer.tileProps.props[a] = p;
		}
		return p;
	}
	,getTileProps: function(file,stride,max) {
		var p = Reflect.field(this.level.sheet.props.level.tileSets,file);
		if(p == null) {
			p = { stride : stride, sets : [], props : []};
			this.level.sheet.props.level.tileSets[file] = p;
		} else {
			if(p.sets == null) p.sets = [];
			if(p.props == null) p.props = [];
			Reflect.deleteField(p,"tags");
			if(p.stride == null) p.stride = stride; else if(p.stride != stride) {
				var out = [];
				var _g1 = 0;
				var _g = Math.ceil(p.props.length / p.stride);
				while(_g1 < _g) {
					var y = _g1++;
					var _g3 = 0;
					var _g2 = p.stride;
					while(_g3 < _g2) {
						var x = _g3++;
						out[x + y * stride] = p.props[x + y * p.stride];
					}
				}
				while(out.length > 0 && (out[out.length - 1] == null || out.length > max)) out.pop();
				p.props = out;
				p.stride = stride;
			}
			if(p.props.length > max) p.props.splice(max,p.props.length - max);
			var _g4 = 0;
			var _g11 = p.sets.slice();
			while(_g4 < _g11.length) {
				var s = _g11[_g4];
				++_g4;
				if(s.x + s.w > stride || (s.y + s.h) * stride > max) HxOverrides.remove(p.sets,s);
			}
		}
		return p;
	}
	,saveTileProps: function() {
		var pr = this.currentLayer.tileProps.props;
		var _g1 = 0;
		var _g = pr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var p = pr[i];
			if(p == null) continue;
			var def = true;
			var _g2 = 0;
			var _g3 = this.perTileProps;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				var v = Reflect.field(p,c.name);
				if(v != null && v != this.getDefault(c)) {
					def = false;
					break;
				}
			}
			if(def) pr[i] = null;
		}
		while(pr.length > 0 && pr[pr.length - 1] == null) pr.pop();
		this.level.save();
		this.level.setCursor();
	}
	,reset: function() {
		if(this.p != null) {
			this.p.remove();
			this.select = null;
		}
	}
	,layerChanged: function(l) {
		var _g = this;
		this.currentLayer = l;
		this.p = $($("#paletteContent").html()).appendTo(this.level.content);
		this.p.toggleClass("small",this.small);
		var i = lvl_Image.fromCanvas(this.p.find("canvas.view")[0]);
		this.zoom = 1;
		while(this.zoom < 4 && l.stride * this.zoom * this.level.tileSize < 256 && l.height * this.zoom * this.level.tileSize < 256) this.zoom++;
		var tsize = this.level.tileSize * this.zoom;
		var scaleUp = 0;
		var scaleDown = 0;
		i.setSize(l.stride * (tsize + 1),l.height * (tsize + 1));
		var _g1 = 0;
		var _g2 = l.images.length;
		while(_g1 < _g2) {
			var n = _g1++;
			var x = n % l.stride * (tsize + 1);
			var y = (n / l.stride | 0) * (tsize + 1);
			var li = l.images[n];
			if(li.width == tsize && li.height == tsize) i.draw(li,x,y); else {
				var sw = tsize / li.width;
				var sh = tsize / li.height;
				if(sw > 1) scaleUp++; else if(sw < 1) scaleDown++;
				if(sh > 1) scaleUp++; else if(sh < 1) scaleDown++;
				i.drawScaled(li,x,y,tsize,tsize);
			}
		}
		if(scaleUp > scaleDown && scaleUp != 0) $(i.getCanvas()).css("image-rendering","pixelated");
		var jsel = this.p.find("canvas.select");
		var jpreview = this.p.find(".preview").hide();
		var ipreview = lvl_Image.fromCanvas(jpreview.find("canvas")[0]);
		this.select = lvl_Image.fromCanvas(jsel[0]);
		this.select.setSize(i.width,i.height);
		this.p.find(".icon.random").toggleClass("active",this.randomMode);
		this.p.find(".icon.paint").toggleClass("active",this.paintMode);
		this.p.find(".icon.small").toggleClass("active",this.small);
		this.p.mousedown(function(e) {
			e.stopPropagation();
		});
		this.p.mouseup(function(e1) {
			e1.stopPropagation();
		});
		var curPreview = -1;
		var start_x = l.current % l.stride;
		var start_y = l.current / l.stride | 0;
		var start_down = false;
		jsel.mousedown(function(e2) {
			_g.p.find("input[type=text]:focus").blur();
			var o = jsel.offset();
			var x1 = (e2.pageX - o.left) / (_g.level.tileSize * _g.zoom + 1) | 0;
			var y1 = (e2.pageY - o.top) / (_g.level.tileSize * _g.zoom + 1) | 0;
			if(x1 + y1 * l.stride >= l.images.length) return;
			if(e2.shiftKey) {
				var x0;
				if(x1 < start_x) x0 = x1; else x0 = start_x;
				var y0;
				if(y1 < start_y) y0 = y1; else y0 = start_y;
				var x11;
				if(x1 < start_x) x11 = start_x; else x11 = x1;
				var y11;
				if(y1 < start_y) y11 = start_y; else y11 = y1;
				l.set_current(x0 + y0 * l.stride);
				l.currentWidth = x11 - x0 + 1;
				l.currentHeight = y11 - y0 + 1;
				l.saveState();
				_g.level.setCursor();
			} else {
				start_x = x1;
				start_y = y1;
				if(l.tileProps != null && (_g.mode == null || _g.mode == "t_objects")) {
					var _g11 = 0;
					var _g21 = l.tileProps.sets;
					while(_g11 < _g21.length) {
						var p = _g21[_g11];
						++_g11;
						if(x1 >= p.x && y1 >= p.y && x1 < p.x + p.w && y1 < p.y + p.h && p.t == "object") {
							l.set_current(p.x + p.y * l.stride);
							l.currentWidth = p.w;
							l.currentHeight = p.h;
							l.saveState();
							_g.level.setCursor();
							return;
						}
					}
				}
				start_down = true;
				_g.level.mouseCapture = jsel;
				l.set_current(x1 + y1 * l.stride);
				_g.level.setCursor();
			}
			var prop = _g.getProp();
			if(prop != null) {
				var pick = e2.which == 3;
				{
					var _g12 = prop.type;
					switch(_g12[1]) {
					case 2:
						if(!pick) {
							var v = _g.getTileProp(x1,y1);
							Reflect.setField(v,prop.name,!Reflect.field(v,prop.name));
							_g.saveTileProps();
						}
						break;
					case 6:
						var c = _g.perTileGfx.get(prop.name);
						if(pick) {
							var idx;
							var key = Reflect.field(_g.getTileProp(x1,y1),prop.name);
							idx = c.idToIndex.get(key);
							if(idx == null) _g.modeCursor = -1; else _g.modeCursor = idx;
							_g.level.setCursor();
							return;
						}
						var v1;
						if(_g.modeCursor < 0) v1 = _g.getDefault(prop); else v1 = c.indexToId[_g.modeCursor];
						if(v1 == null) Reflect.deleteField(_g.getTileProp(x1,y1),prop.name); else Reflect.setField(_g.getTileProp(x1,y1),prop.name,v1);
						_g.saveTileProps();
						break;
					case 5:
						if(pick) {
							var idx1 = Reflect.field(_g.getTileProp(x1,y1),prop.name);
							if(idx1 == null) _g.modeCursor = -1; else _g.modeCursor = idx1;
							_g.level.setCursor();
							return;
						}
						var v2;
						if(_g.modeCursor < 0) v2 = _g.getDefault(prop); else v2 = _g.modeCursor;
						if(v2 == null) Reflect.deleteField(_g.getTileProp(x1,y1),prop.name); else Reflect.setField(_g.getTileProp(x1,y1),prop.name,v2);
						_g.saveTileProps();
						break;
					default:
					}
				}
			}
		});
		jsel.mousemove(function(e3) {
			var o1 = jsel.offset();
			var x2 = (e3.pageX - o1.left) / (_g.level.tileSize * _g.zoom + 1) | 0;
			var y2 = (e3.pageY - o1.top) / (_g.level.tileSize * _g.zoom + 1) | 0;
			var infos = x2 + "," + y2;
			var id = x2 + y2 * l.stride;
			if(id >= l.images.length || l.blanks[id]) {
				curPreview = -1;
				jpreview.hide();
			} else {
				if(curPreview != id) {
					curPreview = id;
					jpreview.show();
					ipreview.fill(-12582848);
					ipreview.copyFrom(l.images[id]);
				}
				if(l.names != null) infos += " " + l.names[id];
			}
			if(l.tileProps != null) _g.level.content.find(".cursorPosition").text(infos); else _g.p.find(".infos").text(infos);
			if(!start_down) return;
			var x01;
			if(x2 < start_x) x01 = x2; else x01 = start_x;
			var y01;
			if(y2 < start_y) y01 = y2; else y01 = start_y;
			var x12;
			if(x2 < start_x) x12 = start_x; else x12 = x2;
			var y12;
			if(y2 < start_y) y12 = start_y; else y12 = y2;
			l.set_current(x01 + y01 * l.stride);
			l.currentWidth = x12 - x01 + 1;
			l.currentHeight = y12 - y01 + 1;
			l.saveState();
			_g.level.setCursor();
		});
		jsel.mouseleave(function(e4) {
			if(l.tileProps != null) _g.level.content.find(".cursorPosition").text(""); else _g.p.find(".infos").text("");
			curPreview = -1;
			jpreview.hide();
		});
		this.p.mouseleave(function(_) {
			start_down = false;
		});
		this.p.mousemove(function(e5) {
			_g.level.mousePos.x = e5.pageX | 0;
			_g.level.mousePos.y = e5.pageY | 0;
			_g.level.updateCursorPos();
			if(_g.level.selection == null) _g.level.cursor.hide();
		});
		this.p.mouseup(function(_1) {
			start_down = false;
			_g.level.content.mouseup();
		});
	}
	,updateSelect: function() {
		var _g3 = this;
		if(this.select == null) return;
		var l = this.currentLayer;
		this.select.clear();
		var used = [];
		{
			var _g = l.data;
			switch(_g[1]) {
			case 2:
				var data = _g[3];
				var _g1 = 0;
				while(_g1 < data.length) {
					var k = data[_g1];
					++_g1;
					if(k == 0) continue;
					used[k - 1] = true;
				}
				break;
			case 0:
				var data1 = _g[2];
				var _g11 = 0;
				while(_g11 < data1.length) {
					var k1 = data1[_g11];
					++_g11;
					used[k1] = true;
				}
				break;
			case 1:
				var objs = _g[3];
				var id = _g[2];
				var _g12 = 0;
				while(_g12 < objs.length) {
					var o = objs[_g12];
					++_g12;
					var id1;
					var key = Reflect.field(o,id);
					id1 = l.idToIndex.get(key);
					if(id1 != null) used[id1] = true;
				}
				break;
			case 3:
				var insts = _g[3];
				var objs1 = l.getTileObjects();
				var _g13 = 0;
				while(_g13 < insts.length) {
					var i = insts[_g13];
					++_g13;
					var t = objs1.h[i.o];
					if(t == null) {
						used[i.o] = true;
						continue;
					}
					var _g31 = 0;
					var _g2 = t.h;
					while(_g31 < _g2) {
						var dy = _g31++;
						var _g5 = 0;
						var _g4 = t.w;
						while(_g5 < _g4) {
							var dx = _g5++;
							used[i.o + dx + dy * l.stride] = true;
						}
					}
				}
				break;
			}
		}
		var tsize = this.level.tileSize * this.zoom;
		var _g14 = 0;
		var _g6 = l.images.length;
		while(_g14 < _g6) {
			var i1 = _g14++;
			if(used[i1]) continue;
			this.select.fillRect(i1 % l.stride * (tsize + 1),(i1 / l.stride | 0) * (tsize + 1),tsize,tsize,805306368);
		}
		var prop = this.getProp();
		if(prop == null || !(function($this) {
			var $r;
			var _g7 = prop.type;
			$r = (function($this) {
				var $r;
				switch(_g7[1]) {
				case 2:case 6:case 5:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) {
			var objs2;
			if(this.mode == null) objs2 = l.getSelObjects(); else objs2 = [];
			if(objs2.length > 1) {
				var _g8 = 0;
				while(_g8 < objs2.length) {
					var o1 = objs2[_g8];
					++_g8;
					this.select.fillRect(o1.x * (tsize + 1),o1.y * (tsize + 1),(tsize + 1) * o1.w - 1,(tsize + 1) * o1.h - 1,-2141478405);
				}
			} else this.select.fillRect(l.current % l.stride * (tsize + 1),(l.current / l.stride | 0) * (tsize + 1),(tsize + 1) * l.currentWidth - 1,(tsize + 1) * l.currentHeight - 1,-2141478405);
		}
		if(prop != null) {
			var def = this.getDefault(prop);
			{
				var _g9 = prop.type;
				switch(_g9[1]) {
				case 2:
					var k2 = 0;
					var _g21 = 0;
					var _g15 = l.height;
					while(_g21 < _g15) {
						var y = _g21++;
						var _g41 = 0;
						var _g32 = l.stride;
						while(_g41 < _g32) {
							var x = _g41++;
							var p = l.tileProps.props[k2++];
							if(p == null) continue;
							var v = Reflect.field(p,prop.name);
							if(v == def) continue;
							this.select.fillRect(x * (tsize + 1),y * (tsize + 1),tsize,tsize,v?-2131010655:-2141455455);
						}
					}
					break;
				case 6:
					var gfx = this.perTileGfx.get(prop.name);
					var k3 = 0;
					this.select.set_alpha(0.5);
					var _g22 = 0;
					var _g16 = l.height;
					while(_g22 < _g16) {
						var y1 = _g22++;
						var _g42 = 0;
						var _g33 = l.stride;
						while(_g42 < _g33) {
							var x1 = _g42++;
							var p1 = l.tileProps.props[k3++];
							if(p1 == null) continue;
							var r = Reflect.field(p1,prop.name);
							var v1 = gfx.idToIndex.get(r);
							if(v1 == null || r == def) continue;
							this.select.drawScaled(gfx.images[v1],x1 * (tsize + 1),y1 * (tsize + 1),tsize,tsize);
						}
					}
					this.select.set_alpha(1);
					break;
				case 5:
					var k4 = 0;
					var _g23 = 0;
					var _g17 = l.height;
					while(_g23 < _g17) {
						var y2 = _g23++;
						var _g43 = 0;
						var _g34 = l.stride;
						while(_g43 < _g34) {
							var x2 = _g43++;
							var p2 = l.tileProps.props[k4++];
							if(p2 == null) continue;
							var v2 = Reflect.field(p2,prop.name);
							if(v2 == null || v2 == def) continue;
							this.select.fillRect(x2 * (tsize + 1),y2 * (tsize + 1),tsize,tsize,lvl_Palette.colorPalette[v2] | -2147483648);
						}
					}
					break;
				case 3:case 4:case 1:case 11:case 13:case 16:
					var k5 = 0;
					var _g24 = 0;
					var _g18 = l.height;
					while(_g24 < _g18) {
						var y3 = _g24++;
						var _g44 = 0;
						var _g35 = l.stride;
						while(_g44 < _g35) {
							var x3 = _g44++;
							var p3 = l.tileProps.props[k5++];
							if(p3 == null) continue;
							var v3 = Reflect.field(p3,prop.name);
							if(v3 == null || v3 == def) continue;
							this.select.fillRect(x3 * (tsize + 1),y3 * (tsize + 1),tsize,1,-1);
							this.select.fillRect(x3 * (tsize + 1),y3 * (tsize + 1),1,tsize,-1);
							this.select.fillRect(x3 * (tsize + 1),(y3 + 1) * (tsize + 1) - 1,tsize,1,-1);
							this.select.fillRect((x3 + 1) * (tsize + 1) - 1,y3 * (tsize + 1),1,tsize,-1);
						}
					}
					break;
				default:
				}
			}
		}
		var m = this.p.find(".mode");
		var sel = this.p.find(".sel");
		if(l.tileProps == null) {
			m.hide();
			sel.show();
		} else {
			sel.hide();
			var grounds = [];
			var _g20 = 0;
			var _g111 = l.tileProps.sets;
			while(_g20 < _g111.length) {
				var s = _g111[_g20];
				++_g20;
				var color;
				var _g27 = s.t;
				switch(_g27) {
				case "tile":
					continue;
					break;
				case "ground":
					if(s.opts.name != null && s.opts.name != "") {
						HxOverrides.remove(grounds,s.opts.name);
						grounds.push(s.opts.name);
					}
					if(this.mode != null && this.mode != "t_ground") continue;
					if(this.mode == null) color = 40960; else color = 65280;
					break;
				case "border":
					if(this.mode != "t_border") continue;
					color = 65535;
					break;
				case "object":
					if(this.mode != null && this.mode != "t_object") continue;
					if(this.mode == null) color = 8388608; else color = 16711680;
					break;
				case "group":
					if(this.mode != "t_group") continue;
					color = 16777215;
					break;
				}
				color |= -16777216;
				var tsize1 = this.level.tileSize * this.zoom;
				var px = s.x * (tsize1 + 1);
				var py = s.y * (tsize1 + 1);
				var w = s.w * (tsize1 + 1) - 1;
				var h = s.h * (tsize1 + 1) - 1;
				this.select.fillRect(px,py,w,1,color);
				this.select.fillRect(px,py + h - 1,w,1,color);
				this.select.fillRect(px,py,1,h,color);
				this.select.fillRect(px + w - 1,py,1,h,color);
			}
			var tmode = cdb__$Data_TileMode_$Impl_$.ofString(this.mode == null?"":HxOverrides.substr(this.mode,2,null));
			var tobj = l.getTileProp(tmode);
			if(tobj == null) tobj = { x : 0, y : 0, w : 0, h : 0, t : "tile", opts : { }};
			var baseModes = ((function($this) {
				var $r;
				var _g10 = [];
				{
					var _g19 = 0;
					var _g25 = ["tile","object","ground","border","group"];
					while(_g19 < _g25.length) {
						var m1 = _g25[_g19];
						++_g19;
						_g10.push("<option value=\"t_" + m1 + "\">" + (HxOverrides.substr(m1,0,1).toUpperCase() + HxOverrides.substr(m1,1,null)) + "</option>");
					}
				}
				$r = _g10;
				return $r;
			}(this))).join("\n");
			var props = ((function($this) {
				var $r;
				var _g110 = [];
				{
					var _g26 = 0;
					var _g36 = $this.perTileProps;
					while(_g26 < _g36.length) {
						var t1 = _g36[_g26];
						++_g26;
						_g110.push("<option value=\"" + t1.name + "\">" + t1.name + "</option>");
					}
				}
				$r = _g110;
				return $r;
			}(this))).join("\n");
			m.find("[name=mode]").html(baseModes + props).val(this.mode == null?"t_tile":this.mode);
			m.attr("class","").addClass("mode");
			if(prop != null) {
				var _g28 = prop.type;
				switch(_g28[1]) {
				case 6:
					var gfx1 = this.perTileGfx.get(prop.name);
					m.addClass("m_ref");
					var refList = m.find(".opt.refList");
					refList.html("");
					if(prop.opt) $("<div>").addClass("icon").addClass("delete").appendTo(refList).toggleClass("active",this.modeCursor < 0).click(function(_) {
						_g3.modeCursor = -1;
						_g3.level.setCursor();
					});
					var _g45 = 0;
					var _g37 = gfx1.images.length;
					while(_g45 < _g37) {
						var i2 = [_g45++];
						var d = $("<div>").addClass("icon").css({ background : "url('" + gfx1.images[i2[0]].getCanvas().toDataURL() + "')"});
						d.appendTo(refList);
						d.toggleClass("active",this.modeCursor == i2[0]);
						d.attr("title",gfx1.names[i2[0]]);
						d.click((function(i2) {
							return function(_1) {
								_g3.modeCursor = i2[0];
								_g3.level.setCursor();
							};
						})(i2));
					}
					break;
				case 5:
					var values = _g28[2];
					m.addClass("m_ref");
					var refList1 = m.find(".opt.refList");
					refList1.html("");
					if(prop.opt) $("<div>").addClass("icon").addClass("delete").appendTo(refList1).toggleClass("active",this.modeCursor < 0).click(function(_2) {
						_g3.modeCursor = -1;
						_g3.level.setCursor();
					});
					var _g46 = 0;
					var _g38 = values.length;
					while(_g46 < _g38) {
						var i3 = [_g46++];
						var d1 = $("<div>").addClass("icon").css({ background : this.level.toColor(lvl_Palette.colorPalette[i3[0]]), width : "auto"}).text(values[i3[0]]);
						d1.appendTo(refList1);
						d1.toggleClass("active",this.modeCursor == i3[0]);
						d1.click((function(i3) {
							return function(_3) {
								_g3.modeCursor = i3[0];
								_g3.level.setCursor();
							};
						})(i3));
					}
					break;
				case 3:case 4:case 1:case 16:
					m.addClass("m_value");
					var p4 = this.getTileProp(l.current % l.stride,l.current / l.stride | 0,false);
					var v4;
					if(p4 == null) v4 = null; else v4 = Reflect.field(p4,prop.name);
					m.find("[name=value]").val(prop.type == cdb_ColumnType.TDynamic?JSON.stringify(v4):v4 == null?"":"" + v4);
					break;
				default:
				}
			} else if("t_" + cdb__$Data_TileMode_$Impl_$.toString(tobj.t) != this.mode) {
				if(this.mode == null) m.addClass("m_tile"); else m.addClass("m_create").addClass("c_" + HxOverrides.substr(this.mode,2,null));
			} else {
				m.addClass("m_" + HxOverrides.substr(this.mode,2,null)).addClass("m_exists");
				var _g29 = tobj.t;
				switch(_g29) {
				case "tile":case "object":
					break;
				case "ground":
					m.find("[name=name]").val(tobj.opts.name == null?"":tobj.opts.name);
					m.find("[name=priority]").val("" + (tobj.opts.priority == null?0:tobj.opts.priority));
					break;
				case "group":
					m.find("[name=name]").val(tobj.opts.name == null?"":tobj.opts.name);
					m.find("[name=value]").val(tobj.opts.value == null?"":JSON.stringify(tobj.opts.value)).width(80).width(m.parent().width() - 300);
					break;
				case "border":
					var opts = ((function($this) {
						var $r;
						var _g39 = [];
						{
							var _g47 = 0;
							while(_g47 < grounds.length) {
								var g = grounds[_g47];
								++_g47;
								_g39.push("<option value=\"" + g + "\">" + g + "</option>");
							}
						}
						$r = _g39;
						return $r;
					}(this))).join("");
					m.find("[name=border_in]").html("<option value='null'>upper</option><option value='lower'>lower</option>" + opts).val(Std.string(tobj.opts.borderIn));
					m.find("[name=border_out]").html("<option value='null'>lower</option><option value='upper'>upper</option>" + opts).val(Std.string(tobj.opts.borderOut));
					m.find("[name=border_mode]").val(Std.string(tobj.opts.borderMode));
					break;
				}
			}
			m.show();
		}
	}
	,getProp: function() {
		if(this.mode == null || HxOverrides.substr(this.mode,0,2) == "t_" || this.currentLayer.tileProps == null) return null;
		var _g = 0;
		var _g1 = this.perTileProps;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.name == this.mode) return c;
		}
		return null;
	}
	,option: function(name,val) {
		if(this.p == null) return false;
		var m = cdb__$Data_TileMode_$Impl_$.ofString(this.mode == null?"":HxOverrides.substr(this.mode,2,null));
		var l = this.currentLayer;
		if(val != null) val = StringTools.trim(val);
		switch(name) {
		case "random":
			this.randomMode = !this.randomMode;
			if((function($this) {
				var $r;
				var _g = l.data;
				$r = (function($this) {
					var $r;
					switch(_g[1]) {
					case 3:
						$r = true;
						break;
					default:
						$r = false;
					}
					return $r;
				}($this));
				return $r;
			}(this))) this.randomMode = false;
			this.p.find(".icon.random").toggleClass("active",this.randomMode);
			this.level.savePrefs();
			this.level.setCursor();
			return false;
		case "paint":
			this.paintMode = !this.paintMode;
			if((function($this) {
				var $r;
				var _g1 = l.data;
				$r = (function($this) {
					var $r;
					switch(_g1[1]) {
					case 3:
						$r = true;
						break;
					default:
						$r = false;
					}
					return $r;
				}($this));
				return $r;
			}(this))) this.paintMode = false;
			this.level.savePrefs();
			this.p.find(".icon.paint").toggleClass("active",this.paintMode);
			return false;
		case "mode":
			if(val == "t_tile") this.mode = null; else this.mode = val;
			this.modeCursor = 0;
			this.level.savePrefs();
			this.level.setCursor();
			break;
		case "toggleMode":
			var s = l.getTileProp(m);
			if(s == null) {
				s = { x : l.current % l.stride, y : l.current / l.stride | 0, w : l.currentWidth, h : l.currentHeight, t : m, opts : { }};
				l.tileProps.sets.push(s);
			} else HxOverrides.remove(l.tileProps.sets,s);
			this.level.setCursor();
			break;
		case "name":
			var s1 = l.getTileProp(m);
			if(s1 != null) s1.opts.name = val;
			break;
		case "value":
			var p = this.getProp();
			if(p != null) {
				var t = this.getTileProp(l.current % l.stride,l.current / l.stride | 0);
				var v;
				var _g2 = p.type;
				switch(_g2[1]) {
				case 3:
					v = Std.parseInt(val);
					break;
				case 4:
					v = parseFloat(val);
					break;
				case 1:
					v = val;
					break;
				case 16:
					try {
						v = this.level.model.parseDynamic(val);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						v = null;
					}
					break;
				default:
					throw new js__$Boot_HaxeError("assert");
				}
				if(v == null) Reflect.deleteField(t,p.name); else t[p.name] = v;
				this.saveTileProps();
				return false;
			}
			var s2 = l.getTileProp(m);
			if(s2 != null) {
				var v1;
				if(val == null) v1 = s2.opts.value; else try {
					v1 = this.level.model.parseDynamic(val);
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					v1 = null;
				}
				if(v1 == null) Reflect.deleteField(s2.opts,"value"); else s2.opts.value = v1;
				this.p.find("[name=value]").val(v1 == null?"":JSON.stringify(v1));
			}
			break;
		case "priority":
			var s3 = l.getTileProp(m);
			if(s3 != null) s3.opts.priority = Std.parseInt(val);
			break;
		case "border_in":
			var s4 = l.getTileProp(m);
			if(s4 != null) {
				if(val == "null") Reflect.deleteField(s4.opts,"borderIn"); else s4.opts.borderIn = val;
			}
			break;
		case "border_out":
			var s5 = l.getTileProp(m);
			if(s5 != null) {
				if(val == "null") Reflect.deleteField(s5.opts,"borderOut"); else s5.opts.borderOut = val;
			}
			break;
		case "border_mode":
			var s6 = l.getTileProp(m);
			if(s6 != null) {
				if(val == "null") Reflect.deleteField(s6.opts,"borderMode"); else s6.opts.borderMode = val;
			}
			break;
		case "small":
			this.small = !this.small;
			this.level.savePrefs();
			this.p.toggleClass("small",this.small);
			this.p.find(".icon.small").toggleClass("active",this.small);
			return false;
		}
		return true;
	}
	,__class__: lvl_Palette
};
var sys_FileSystem = function() { };
$hxClasses["sys.FileSystem"] = sys_FileSystem;
sys_FileSystem.__name__ = ["sys","FileSystem"];
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _ ) {
		if (_ instanceof js__$Boot_HaxeError) _ = _.val;
		return false;
	}
};
sys_FileSystem.readDirectory = function(path) {
	return js_node_Fs.readdirSync(path);
};
var sys_io_File = function() { };
$hxClasses["sys.io.File"] = sys_io_File;
sys_io_File.__name__ = ["sys","io","File"];
sys_io_File.getContent = function(path) {
	return js_node_Fs.readFileSync(path,{ encoding : "utf8"});
};
sys_io_File.saveContent = function(path,content) {
	js_node_Fs.writeFileSync(path,content);
};
sys_io_File.getBytes = function(path) {
	var o = js_node_Fs.openSync(path,"r");
	var s = js_node_Fs.fstatSync(o);
	var len = s.size;
	var pos = 0;
	var bytes = new haxe_io_Bytes(new ArrayBuffer(s.size));
	var tmpBuf = new js_node_buffer_Buffer(s.size);
	while(len > 0) {
		var r = js_node_Fs.readSync(o,tmpBuf,pos,len,null);
		pos += r;
		len -= r;
	}
	js_node_Fs.closeSync(o);
	var _g1 = 0;
	var _g = s.size;
	while(_g1 < _g) {
		var i = _g1++;
		bytes.b[i] = tmpBuf[i] & 255;
	}
	return bytes;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
Level.UID = 0;
Level.loadedTilesCache = new haxe_ds_StringMap();
K.INSERT = 45;
K.DELETE = 46;
K.LEFT = 37;
K.UP = 38;
K.RIGHT = 39;
K.DOWN = 40;
K.ESC = 27;
K.TAB = 9;
K.SPACE = 32;
K.ENTER = 13;
K.F2 = 113;
K.F3 = 114;
K.F4 = 115;
K.NUMPAD_ADD = 107;
K.NUMPAD_SUB = 109;
K.NUMPAD_DIV = 111;
Main.UID = 0;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
cdb_BinSerializer.__meta__ = { obj : { s_1522840838 : ["cy25:cdb._BinSerializer.Schemay4:hashi767004939y4:kindwy29:cdb._BinSerializer.SchemaKindy5:SEnum:1aawy24:cdb._BinSerializer.SDatay4:DInt:0wR5y7:DString:0wR5y5:DNull:1wR5y6:DArray:1wR5y5:DAnon:1aoy1:dwR5R7:0y1:ny4:namegoR11wR5R7:0R12y5:valueghhawR5R6:0wR5R7:0hawR5R6:0wR5R7:0hawR5R6:0wR5R6:0hawR5R6:0wR5R7:0wR5R8:1wR5R6:0hawR5R6:0hawR5R6:0wR5R6:0wR5y7:DSchema:1i223952291wR5R8:1wR5y6:DFloat:0hawR5R6:0hawR5R6:0wR5R7:0wR5R6:0hawR5R6:0wR5R7:0wR5R8:1wR5R7:0hawR5R6:0wR5R7:0wR5R8:1wR5R7:0hawR5R6:0wR5R7:0hawR5R6:0wR5R7:0wR5R9:1wR5y8:DDynamic:0wR5R8:1wR5R6:0hawR5R6:0wR5R7:0wR5R8:1wR5R16:0hawR5R6:0wR5R8:1wR5R9:1wR5R6:0hawR5R9:1wR5R6:0hhR13y14:cdb.jq.Messagey2:idi1522840838g"], s_223952291 : ["cy25:cdb._BinSerializer.Schemay4:hashi471112403y4:kindwy29:cdb._BinSerializer.SchemaKindy5:SEnum:1au5hy4:namey20:cdb.jq.DockDirectiony2:idi223952291g"], s_560507292 : ["cy25:cdb._BinSerializer.Schemay4:hashi842410256y4:kindwy29:cdb._BinSerializer.SchemaKindy5:SEnum:1aawy24:cdb._BinSerializer.SDatay4:DInt:0wR5y5:DNull:1wR5y7:DSchema:1i1835035702hawR5R6:0wR5y7:DString:0hawR5R6:0hhy4:namey13:cdb.jq.Answery2:idi560507292g"], s_1835035702 : ["cy25:cdb._BinSerializer.Schemay4:hashi1439494620y4:kindwy29:cdb._BinSerializer.SchemaKindy5:SAnon:1aoy1:dwy24:cdb._BinSerializer.SDatay5:DNull:1wR6y5:DBool:0y1:ny7:ctrlKeygoR5wR6R7:1wR6y4:DInt:0R9y7:keyCodegoR5wR6R7:1wR6R8:0R9y8:shiftKeygoR5wR6R7:1wR6y8:DDynamic:0R9y5:valuegoR5wR6R7:1wR6R11:0R9y5:whichghy4:namey17:cdb.jq.EventPropsy2:idi1835035702g"]}};
cdb_BinSerializer.VERSION_CHECK = false;
cdb_BinSerializer.TAG = 0;
cdb_BinSerializer.gadtTip = -1;
cdb__$Data_TileMode_$Impl_$.Tile = "tile";
cdb__$Data_TileMode_$Impl_$.Ground = "ground";
cdb__$Data_TileMode_$Impl_$.Border = "border";
cdb__$Data_TileMode_$Impl_$.Object = "object";
cdb__$Data_TileMode_$Impl_$.Group = "group";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
lvl_Image.cache = new haxe_ds_StringMap();
lvl_Image3D.CANVAS_SIZE = 2048;
lvl_Palette.colorPalette = [16711680,65280,16711935,65535,16776960,16777215,33023,65408,8388863,8453888,16711808,16744448];
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=castle.js.map