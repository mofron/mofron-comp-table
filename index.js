/**
 * @file mofron-comp-table/index.js
 * @brief table component for mofron
 * @author simpart
 */
const mf   = require("mofron");
const Text = require("mofron-comp-text");

mf.comp.Table = class extends mf.Component {
    /**
     * initialize table component
     *
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name("Table");
            this.prmMap("column");
            this.prmOpt(po);
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
            this.styleTgt(this.target());
            this.eventTgt(this.target());
            
            let tbody  = new mf.Dom("tbody", this); 
            this.target().child([this.thead(), tbody]);
            this.target(tbody);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * init size
     *
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            if (null !== this.width()) {
                this.width(this.width());
            }
            if (null !== this.rowHeight()) {
                this.rowHeight(this.rowHeight());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get thead dom
     * 
     * @return (object) thead dom 
     * @type private
     */
    thead (prm) {
        try {
            if (undefined === prm) {
                if (undefined === this.m_thead) {
                    let thd = new mf.Dom("thead", this);
                    thd.addChild(new mf.Dom("tr", this));
                    this.thead(thd);
                }
                return this.m_thead;
            }
            this.m_thead = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * head contents
     * 
     * @param (array/component) head contents
     * @return (array) head contents
     * @type tag parameter
     */
    head (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.arrayMember("head");
            }
            /* setter */
            let tgt_buf = this.target();
            let tr = this.thead().child()[0];
            
            for (let pidx in prm) {
                let th = new mf.Dom("th",this);
                tr.addChild(th);
                this.target(th);
                this.child([prm[pidx]]);
            }
            this.target(tgt_buf);
            this.arrayMember("head", "Component", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column contents
     *
     * @param (array) column contents
     * @return (array) column contents
     * @type tag parameter
     */
    column (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_columns;
            }
            /* setter */
            prm = this.chkConts(prm);
            let max_len = 0;
            for (let pidx in prm) {
                if (max_len < prm[pidx].length) {
                    max_len = prm[pidx].length
                }
            }
            
            let tgt_buf = this.target();
            for (let pidx=0; pidx < max_len ;pidx++) {
                let tr = new mf.Dom("tr", this);
                tgt_buf.addChild(tr);
                for (let pidx2=0; pidx2 < prm.length ;pidx2++) {
                    let td = new mf.Dom("td", this);
                    tr.addChild(td);
                    this.target(td);
                    if (undefined !== prm[pidx2][pidx]) {
                        this.addChild(prm[pidx2][pidx]);
                    }
                }
            }
            this.target(tgt_buf);
            this.m_columns = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * insert column
     * 
     * @param (array) column contents
     * @param (number) insert index
     * @type function
     */
    insertColumn (prm, idx) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * delete column
     *
     * @param (number) delete index
     * @type function
     */
    deleteColumn (idx) {
        try {
        
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * row contents
     *
     * @param (array) row contents
     * @return (array) row contents
     * @type tag contents
     */
    row (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_rows;
            }
            /* setter */
            let len = 0;
            for (let len_idx in prm) {
                if (len < prm[len_idx].length) {
                    len = prm[len_idx].length;
                }
            }
            
            prm = this.chkConts(prm);
            let tgt_buf = this.target();
            for (let pidx in prm) {
                let tr = new mf.Dom("tr", this);
                tgt_buf.addChild(tr);
                
                for (let pidx2=0; pidx2 < len ;pidx2++) {
                    let td = new mf.Dom("td", this);
                    tr.addChild(td);
                    this.target(td);
                    if (undefined !== prm[pidx][pidx2]) {
                        this.addChild(prm[pidx][pidx2]);
                    }
                }
            }
            this.target(tgt_buf);
            this.m_rows = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * insert row
     * 
     * @param (array) row contents
     * @param (number) insert index
     * @type function
     */
    insertRow (prm, idx) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * delete row
     *
     * @param (number) delete index
     * @type function
     */
    deleteRow (idx) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * check contents
     * 
     * @param (array) table contents
     * @return (array) table contents
     * @type private
     */
    chkConts (prm) {
        try {
            if (false === Array.isArray(prm)) {
                throw new Error("invalid parameter");
            }
            for (let pidx in prm) {
                if (false === Array.isArray(prm[pidx])) {
                    prm[pidx] = [prm[pidx]];
                }
                for (let pidx2 in prm[pidx]) {
                    if (false === mf.func.isComp(prm[pidx][pidx2])) {
                        throw new Error("invalid parameter");
                    }
                }
            }
            return prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * border width
     *
     * @param (string) border width
     * @return (string) border width
     * @type tag parameter
     */
    border (prm) {
        try {
            return this.target().parent().attr(
                (undefined === prm) ? "border" : { border : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table frame type
     *
     * @param (string) frame type
     * @return (string) frame type
     * @type tag parameter
     */
    frame (prm) {
        try {
            return this.target().parent().attr(
                (undefined === prm) ? "frame" : { frame : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table inner border type
     *
     * @param (string) rule value
     * @return (string) rule value
     * @type tag parameter
     */
    rules (prm) {
        try {
            return this.target().parent().attr(
                (undefined === prm) ? "rules" : { rules : prm }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column width
     *
     * @param (array) column width
     * @type tag parameter
     */
    column_width (prm) {
        try { this.width(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * table width
     *
     * @param (strung (size)/array) table size/column size
     * @return (string (size)/array) table size/column size
     * @type tag parameter
     */
    width (prm) {
        try {
            if (undefined === prm) {
                return (undefined === this.m_width) ? null : this.m_width;
            }
            this.m_width = prm;
            if ( (undefined !== this.m_columns) || (undefined !== this.m_rows) ) {
                let cols = this.target().child()[0].child();
                if (true === Array.isArray(prm)) {
                    for (let pidx in prm) {
                        cols[pidx].style({ width: prm[pidx] });
                    }
                } else {
                    let siz     = mf.func.getSize(prm);
                    let set_siz = siz.value() / this.colCount();
                    let col_lst = this.target().child();
                    for (let cidx in col_lst) {
                        let tds = col_lst[cidx].child();
                        for (let cidx2 in tds) {
                            tds[cidx2].style({ width: set_siz + siz.type() });
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * column count
     *
     * @return (number) column count
     * @type function
     */
    colCount () {
        try {
            let ret = 0;
            let trs = this.target().child();
            for (let tr_idx in trs) {
                if (ret < trs[tr_idx].child().length) {
                   ret = trs[tr_idx].child().length;
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * row height
     *
     * @param (string (size)) row height
     * @return (string (size)) row height
     * @type tag parameter
     */
    rowHeight (prm) {
        try {
            let trs = this.target().child();
            if (undefined === prm) {
                 /* getter */
                 return (undefined === this.m_rowhei) ? null : this.m_rowhei;
            }
            /* setter */
            this.m_rowhei = prm;
            if ( (undefined !== this.m_columns) || (undefined !== this.m_rows) ) {
                for (let tidx in trs) {
                    trs[tidx].style({ "height" : prm });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Table;
/* end of file */
