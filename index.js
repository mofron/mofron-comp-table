/**
 * @file mofron-comp-table/index.js
 * @author simpart
 */
let mf = require('mofron');

/**
 * @class Table
 * @brief table component for mofron
 */
mf.comp.Table = class extends mf.Component {
    
    constructor (prm_opt) {
        try {
            super();
            this.name('Table');
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            if (null === this.theader()) {
                this.theader(prm);
            }
            let thdr  = this.theader();
            let thlst = new Array();
            
            for (let hidx in thdr) {
                thlst.push(
                    new mf.Dom({
                        tag       : 'th',
                        component : this,
                        text      : thdr[hidx]
                    })
                );
            }
            
            let body = new mf.Dom({
                tag       : 'tbody',
                component : this
            });
            
            this.vdom().addChild(
                new mf.Dom({
                    tag      : 'table',
                    coponent : this,
                    child    : [
                        new mf.Dom({
                            tag       : 'thead',
                            component : this,
                            addChild  : new mf.Dom({
                                tag       : 'tr',
                                component : this,
                                child     : thlst
                            })
                        }),
                        body
                    ]
                })
            );
            this.target(body);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    theader (hdr) {
        try {
            if (undefined === hdr) {
                /* getter */
                return (undefined === this.m_theader) ? null : this.m_theader;
            }
            /* setter */
            if ( (null === hdr) ||
                 ('object' !== typeof hdr) ) {
                throw new Error('invalid parameter');
            }
            this.m_theader = hdr;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp, idx) {
        try {
            if ( (false === mf.func.isInclude(chd, 'Component')) &&
                 ('object' !== typeof chd) ) {
                throw new Error('invalid parameter');
            }
            if ( chd.length !== this.theader().length ) {
                throw new Error('invalid parameter');
            }
            
            let tr = new mf.Component('tr');
            for (let cidx in chd) {
                tr.addChild(
                    new mf.Component({
                        param    : 'td',
                        addChild : chd[cidx]
                    })
                );
            }
            super.addChild(tr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mf.comp.Table;
