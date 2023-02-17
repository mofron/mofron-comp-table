/**
 * @file mofron-comp-table/index.js
 * @brief table component for mofron
 * @license MIT
 */
const Text = require("mofron-comp-text");
const comutl = mofron.util.common;
const cmputl = mofron.util.component;

module.exports = class extends mofron.class.Component {
    /**
     * initialize table component
     * 
     * @param (mixed) 'column' parameter
     *                key-value: component config
     * @short head
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("Table");
            this.shortForm("head");
            /* init config */
            this.confmng().add("head", { type: "Component", list: true });
	    let thead_ini = new mofron.class.Dom({ tag: "thead", component: this, child: new mofron.class.Dom("tr", this) });
	    this.confmng().add("thead",       { type: "Dom", init: thead_ini });
	    this.confmng().add("contents",    { type: "array", list: true });
	    this.confmng().add("contsopt",    { type: "object", list: true });
            this.confmng().add("insertType",  { type: "string", init: "row", select: ["column","row"] });
	    this.confmng().add("width",       { type: "object", init: { width: undefined, option: undefined } });
	    this.confmng().add("columnWidth", { type: "size", list: true });
	    this.confmng().add("height",      { type: "object", init: { height: undefined, option: undefined } });
            this.confmng().add("rowHeight",   { type: "size" });
            this.confmng().add('align',       { type: 'array', init: [] });
            this.confmng().add("baseColor",   { type: "color", init: [255,255,255]});

	    /* set config */
	    if (undefined !== prm) {
                this.config(prm);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     *
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts("table");
            this.styleDom(this.childDom());
            this.eventDom(this.childDom());
            
            let tbody = new mofron.class.Dom("tbody", this); 
            this.childDom().child([this.confmng("thead"), tbody]);
            this.childDom(tbody);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set column width,row height
     *
     * @private
     */
    beforeRender () {
        try {
	    super.beforeRender();
            this.build();
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * head contents setter/getter
     * 
     * @param (array) head contents list [mofron.class.Component,..]
     *                undefined: call as getter
     * @return (array) head contents
     * @type parameter
     */
    head (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.confmng("head");
            }
	    if (false === Array.isArray(prm)) {
                throw new Error("invalid parameter");
	    }
            /* setter */
            let dom_buf = this.childDom();
            let tr      = this.confmng("thead").child()[0];
            for (let pidx in prm) {
                let th    = new mofron.class.Dom("th",this);
                let align = this.confmng("align");
		if (undefined !== align[pidx]) {
                    th.attrs({ 'align': align[pidx] });
		}
                tr.child(th);
                this.childDom(th);
                this.child([prm[pidx]]);
            }
            this.childDom(dom_buf);
            this.confmng("head", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column contents setter/getter
     *
     * @param (mixed) mofron.class.Component: column contents 
     *                array: column contents list [mofron.class.Component,..]
     *                undefined: call as getter
     * @return (array) column contents list
     * @type parameter
     */
    column (prm, opt) {
        try {
	    this.insertType("column");
	    if (undefined === prm) {
                /* getter */
		return this.confmng("contents");
	    }
	    this.confmng("contents", (true === Array.isArray(prm)) ? prm : [prm]);
	    this.confmng("contsopt", (undefined === opt) ? {} : opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * row contents
     *
     * @param (mixed) mofron.class.Component: column contents 
     *                array: column contents list [mofron.class.Component,..]
     *                undefined: call as getter
     * @return (array) row contents list
     * @type parameter
     */
    row (prm, opt) {
        try {
            this.insertType("row");
            if (undefined === prm) {
                /* getter */
                return this.confmng("contents");
            }
            this.confmng("contents", (true === Array.isArray(prm)) ? prm : [prm]);
	    this.confmng("contsopt", (undefined === opt) ? {} : opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * insert type setter/getter
     * 
     * @param (string) insert type ("column","row")
     *                 undefined: call as getter
     * @return (string) insert type
     * @type parameter
     */
    insertType (prm) {
        try {
            return this.confmng("insertType",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * insert a column/row
     * 
     * @param (array) table contents list [mofron.class.Component,..]
     * @param (number) insert index
     *                 undefined: insert at the end
     * @type function
     */
    insert (prm, idx) {
        try {
	    /* check parameter */
	    if (false === Array.isArray(prm)) {
                throw new Error("invalid parameter");
	    }
            for (let pidx in prm) {
                if (false === comutl.iscmp(prm[pidx])) {
                    throw new Error("invalid parameter element");
		}
	    }
            if (undefined === idx) {
	        /* insert at the end */
                this.confmng("contents", prm);
	    } else {
                let conts = this.confmng("contents");
		conts.splice(idx, 0 , prm);
            }
	    if (true === this.isExists()) {
                this.insertDom(prm,idx);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * insert contents to dom
     * 
     * @param (array) table contents [mofron.class.Component,..]
     * @param (number) insert index
     *                 undefined: insert at the end
     * @type private
     */
    insertDom (prm, idx) {
        try {
	    let bf_render = (prm) => {
                try {
                    for (let idx in prm) {
                        cmputl.theme(prm[idx], this.theme());
                        cmputl.initmconf(prm[idx], "layout");
                        prm[idx].beforeRender();
                        cmputl.initmconf(prm[idx], "zsp_effect");
                    }
		} catch (e) {
		    console.error(e.stack);
                    throw e;
		}
	    }
            let af_render = (prm) => {
                try {
                    for (let pidx in prm) {
                        prm[pidx].afterRender();
                        cmputl.initmconf(prm[pidx], "effect");
                        cmputl.initmconf(prm[pidx], "event");
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
	    let dom_buf = this.childDom();
            if ("row" === this.insertType()) {
	        /* insert row contents */
                let r_tr = new mofron.class.Dom({
                    tag: "tr", component: this,
                    style: {
		        'height':     this.rowHeight(),
			'background': this.baseColor().toString()
                    }
                });
                
                let col_wid = this.columnWidth();
                let align   = this.confmng("align");
                for (let pidx in prm) {
                    let r_td = new mofron.class.Dom("td", this);
                    if ((null !== col_wid) && (undefined !== col_wid[pidx])) {
                        if (undefined !== align[pidx]) {
                            r_td.attrs({ 'align': align[pidx] });
                        }
                        r_td.style({ width: col_wid[pidx] });
                    }
                    r_tr.child(r_td);
                    this.childDom(r_td);
                    if (undefined !== prm[pidx]) {
                        this.child(prm[pidx]);
                    }
                }
                
                /* process for before render */
                bf_render(prm);
                 
                /* render */
                dom_buf.child(r_tr, idx);
	        if (undefined === idx) {
                    r_tr.push({ target: dom_buf.getRawDom() });
	        } else {
                    r_tr.push({ target: dom_buf.child()[idx+1].getRawDom(), position: "beforebegin" });
                }
                
                /* process for after render */
                //af_render(prm);
                
                for (let pidx_3 in prm) {
                    prm[pidx_3].afterRender();
                    cmputl.initmconf(prm[pidx_3], "effect");
                    cmputl.initmconf(prm[pidx_3], "event");
                }
	    } else {
	        /* insert column contents */
                let tr_lst = dom_buf.child();
		for (let pidx in prm) {
		    let c_td = new mofron.class.Dom("td", this);
		    c_td.style({ height: this.rowHeight() });
		    this.childDom(c_td);
		    if (undefined !== prm[pidx]) {
                        this.child(prm[pidx]);
		    }
                    tr_lst[pidx].child(c_td, idx);

                    /* process for before render */
                    bf_render(prm);
		    if (undefined === idx) {
                        c_td.push({ target: tr_lst[pidx].getRawDom() });
                    } else {
                        c_td.push({ target: tr_lst[pidx].child()[idx+1].getRawDom(), position: "beforebegin" });
                    }
                    /* process for after render */
                    af_render(prm);
		}
	    }
	    this.childDom(dom_buf);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * delete a column/row
     *
     * @param (number) delete index
     * @type function
     */
    delete (idx) {
        try {
	    /* check parameter */
	    let conts = this.confmng("contents");
	    if (undefined === conts[idx]) {
                throw new Error("invalid parameter");
	    }
	    /* destroy component */
            for (let cidx in conts[idx]) {
	        conts[idx][cidx].destroy();
            }
	    /* destroy 'tr' dom */
	    if ("row" === this.insertType()) {
                this.childDom().child()[idx].destroy();
            } else {
                let chd = this.childDom().child();
		for (let cidx in chd) {
                    chd[cidx].child()[idx].destroy();
		}
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column/row count getter
     * 
     * @return (number) column/row count
     * @type function
     */
    count () {
        try {
            return this.confmng("contents").length;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * add column contents
     * 
     * @type private
     */
    build () {
        try {
	    let conts   = this.confmng("contents");
	    let opt     = this.confmng("contsopt");
	    let dom_buf = this.childDom();
            
            /* adjustments length of contents */
	    let m_len = 0;
            for (let len_idx in conts) {
                if (m_len < conts[len_idx].length) {
                    m_len = conts[len_idx].length;
		}
	    }
	    for (let len_idx2 in conts) {
                while (m_len > conts[len_idx2].length) {
                    conts[len_idx2].push(null);
		}
	    }
            
	    if ("row" === this.insertType()) {
	        /* set row contents */
	        for (let cidx in conts) {
                    let tr = new mofron.class.Dom("tr", this);
                    tr.style({ 'background': this.baseColor().toString() });
		    /* set height */
		    let set_hei = this.rowHeight();
		    if (undefined !== opt[cidx]) {
                        set_hei = (undefined !== opt[cidx].height) ? opt[cidx].height : this.rowHeight();
		    }
                    tr.style({ height: set_hei });
                    dom_buf.child(tr);
                    for (let cidx2 in conts[cidx]) {
                        let td = new mofron.class.Dom("td", this);
			if (undefined !== this.columnWidth()[cidx2]) {
			    td.style({ width: this.columnWidth()[cidx2] });
			}
			/* align */
                        let align = this.confmng('align');
			if (undefined !== align[cidx2]) {
                            td.attrs({ 'align': align[cidx2] });
			}

                        tr.child(td);
                        this.childDom(td);
			if (null !== conts[cidx][cidx2]) {
                            this.child(conts[cidx][cidx2]);
			    //cmputl.render(conts[cidx][cidx2]);
			}
                    }
		}
	    } else {
	        /* set column contents */
                let dom_buf = this.childDom();
                for (let cidx=0; cidx < conts[0].length; cidx++) {
	            let tr = new mofron.class.Dom("tr", this);
		    tr.style({ height: this.rowHeight() });
	            dom_buf.child(tr);
                    for (let cidx2 in conts) {
		        let td = new mofron.class.Dom("td", this);
			if (0 === cidx) {
                            td.style({ width: (undefined !== opt[cidx2].width) ? opt[cidx2].width : this.columnWidth() });
			}
                        tr.child(td);
		        this.childDom(td);
			if (null !== conts[cidx2][cidx]) {
                            this.child(conts[cidx2][cidx]);
			}
		    }
                }
	    }
	    this.childDom(dom_buf);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    align (prm) {
        try {
            return this.confmng('align', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * border width setter/getter
     *
     * @param (string(size)) border width
     *                       undefined: call as getter
     * @return (string (size)) border width
     * @type parameter
     */
    border (prm) {
        try {
            return this.childDom().parent().attrs(
                (undefined === prm) ? "border" : { border : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table frame type setter/getter
     *
     * @param (string) frame type ["void", "above", "below", "hsides", "vsides", "lhs", "rhs", "box", "border"]
     * @return (string) frame type
     * @type parameter
     */
    frame (prm) {
        try {
            return this.childDom().parent().attrs(
                (undefined === prm) ? "frame" : { frame : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table inner border type setter/getter
     *
     * @param (string) rule value ["none", "groups", "rows", "cols", "all"]
     *                 undefined: call as getter
     * @return (string) rule value
     * @type parameter
     */
    rules (prm) {
        try {
            return this.childDom().parent().attrs(
                (undefined === prm) ? "rules" : { rules : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table width
     *
     * @param (string (size)) table size/column size
     * @return (string (size)) table size/column size
     * @type parameter
     */
    width (prm, opt) {
        try {
	    return this.rootDom()[0].style({ width: prm }, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column width
     * 
     * @param (string(size)) column width
     * @return (string(size)) column width
     * @type parameter
     */
    columnWidth (prm) {
        try {
            return this.confmng("columnWidth",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * table height
     *
     * @param (string(size)) height size
     * @return (string(size)) height size
     * @type parameter
     */
    height (prm, opt) {
        try {
            return this.rootDom()[0].style({ height: prm }, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * row height
     *
     * @param (string(size)) row height
     * @return (string(size)) row height
     * @type parameter
     */
    rowHeight (prm) {
        try {
            return this.confmng("rowHeight", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    accentColor (prm) {
        try {
            this.rootDom()[0].style({ 'border-color': comutl.getcolor(prm).toString() });
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    }

    baseColor (prm) {
        try {
            return this.confmng('baseColor', prm);
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
