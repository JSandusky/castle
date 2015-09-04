package cdb.jq;

class Server {

	var root : js.html.Element;
	var nodes : Array<js.html.Element>;

	public function new(root) {
		this.root = root;
		nodes = [root];
	}

	function dock( parent : js.html.Element, e : js.html.Element, dir : Message.DockDirection, size : Null<Float> ) {
		throw "Not implemented";
	}

	public function onMessage( msg : Message ) {
		switch( msg ) {
		case Create(id, name, attr):
			var n = js.Browser.document.createElement(name);
			if( attr != null )
				for( a in attr )
					n.setAttribute(a.name, a.value);
			nodes[id] = n;
		case AddClass(id, name):
			nodes[id].classList.add(name);
		case Append(id, to):
			nodes[to].appendChild(nodes[id]);
		case CreateText(id, text, pid):
			var t = js.Browser.document.createTextNode(text);
			nodes[id] = cast t; // not an element
			if( pid != null ) nodes[pid].appendChild(t);
		case SetCSS(text):
			var curCss = js.Browser.document.getElementById("jqcss");
			if( curCss == null ) {
				curCss = js.Browser.document.createElement("style");
				root.insertBefore(curCss,root.firstChild);
			}
			curCss.innerText = text;
		case Reset(id):
			var n = nodes[id];
			while( n.firstChild != null )
				n.removeChild(n.firstChild);
		case Dock(p, e, dir, size):
			dock(nodes[p], nodes[e], dir, size);
		}
	}

}