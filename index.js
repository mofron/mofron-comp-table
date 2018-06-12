/**
 * @file mofron-comp-table/index.js
 * @author simpart
 */
let mf = require('mofron');
let Text = require('mofron-comp-text');

/**
 * @class Table
 * @brief table component for mofron
 */
mf.comp.Table = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('Table');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            super.initDomConts('table');
            this.styleTgt(this.target());
            this.eventTgt(this.target());
            
            this.target().addChild(
                new mf.Dom({
                    tag       : 'thead',
                    component : this,
                    addChild  : new mf.Dom('tr', this)
                })
            );
            let tgt_tr = new mf.Dom('tr', this);
            this.target().addChild(
                new mf.Dom({
                    tag       : 'tbody',
                    component : this   ,
                    addChild  : tgt_tr
                })
            );
            this.target(tgt_tr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd, idx, bld) {
        try {
            let tp = (true !== bld) ? new mf.Dom('td', this) : new mf.Dom('th', this);
            tp.style({ 'text-align' : 'center' });
            
            this.target().style({'display' : null});
            this.target().addChild(tp);
            if (true === this.target().isPushed()) {
                tp.pushDom(this.target());
            }
            this.target(tp);
            
            super.addChild(chd, idx);
            this.resetTgt();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    colLength (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_collen) ? null : this.m_collen;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_collen = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    head (prm) {
        try {
            let hdr = this.adom().child()[0].child()[0];
            if (undefined === prm) {
                /* getter */
                let tr_id = hdr.child()[0].getId();
                let chd   = this.child();
                let ret   = new Array();
                for (let cidx in chd) {
                    if (tr_id === chd[cidx].target().parent().parent().parent().getId()) {
                        ret.push(chd[cidx]);
                    }
                }
                return ret;
            }
            /* setter */
            if ( (null === prm) ||
                 ('object' !== typeof prm) ) {
                throw new Error('invalid parameter');
            }
            /* buffering target */
            /* set thead contents */
            let th = null;
            for (let pidx in prm) {
                this.target(hdr.child()[0]);
                
                if ('string' === typeof prm[pidx]) {
                    this.addChild(new Text(prm[pidx]), undefined, true);
                } else if (true === mf.func.isInclude(prm[pidx], 'Text')) {
                    this.addChild(prm[pidx], undefined, true);
                } else {
                    throw new Error('invalid parameter');
                }
            }
            /* update column length */
            this.colLength(this.head().length);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    resetTgt () {
        try {
            let bdom   = this.adom().child()[0].child()[1];
            let cur_tr = bdom.child()[bdom.child().length-1];
            this.target(cur_tr);
            if ( (0 !== cur_tr.child().length) &&
                 (cur_tr.child().length >= this.colLength()) ) {
                let add_tr = new mf.Dom({
                    tag       : 'tr',
                    component :  this,
                    style     : { 'display' : 'none' }
                });
                if (null !== this.rowHeight()) {
                    add_tr.style({ 'height' : this.rowHeight() + 'px' });
                }
                bdom.addChild(add_tr);
                if (true === bdom.isPushed()) {
                    add_tr.pushDom(bdom);
                }
                
                this.target(add_tr);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rowHeight (val) {
        try {
            if (undefined === val) {
                 /* getter */
                 return (undefined === this.m_rowheight) ? null : this.m_rowheight;
            }
            /* setter */
            if ('number' !== typeof val) {
                throw new Error('invalid parameter');
            }
            this.m_rowheight = val;
            let tr_lst = this.target().parent().child();
            
            for (let tr_idx in tr_lst) {
                tr_lst[tr_idx].style({ 'height' : val + 'px' });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            let tr_lst = this.target().parent().child();
            if (undefined === prm) {
                /* getter */
                if ((0 === tr_lst.length) || (null === this.rowHeight())) {
                    return super.height();
                } else {
                    return this.rowHeight() * tr_lst.length;
                }
            }
            /* setter */
            if ((0 !== tr_lst.length) && ('number' === typeof prm)) {
                this.rowHeight(prm/tr_lst.length);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Table;
/* end of file */
