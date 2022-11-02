


export class AFCCfg {
    incrf: boolean;
    retext: boolean;
    retnb: boolean;
}
export class AFCExclusion {
    ctry: string; 
    excl: boolean; 
    st: string;
}
export class AFCCmpn {
    bscl: number;
    excl: Array<AFCExclusion>; 
    fclt: boolean;
    frch: boolean; 
    idnt: string; 
    reg: boolean;
    svcl: number;
}

export class AFCLocation {
    addr: string;
    city: string;
    cnty: string;
    ctry: string;
    fips: string;
    geo: boolean;
    int: boolean;
    npa: number; 
    pcd: number; 
    st: string;
    zip: string;
}

export class AFCTaxExemption {
    cat: number;
    dom: number;
    exnb: boolean;
    frc: boolean; 
    loc: AFCLocation;
    lvl: number;
    scp: number; 
    tpe: number; 
}

export class AFCInv {
    acct: string;
    bcyc: string; 
    bill: AFCLocation;
    bpd: {
        month: number; 
        year: number; 
    };
    ccycd: string;
    cmmt: boolean;
    cust: number; 
    custref: string; 
    date: string; 
    doc: string;
    dtl: boolean; 
    exms: Array<AFCTaxExemption>;
    invm: boolean; 
    invn: string; 
    itms: Array<AFCLineItem>;
    lfln: boolean; 
    summ: boolean; 
    //opt

}


export class AFCLineItem {
    adj: boolean;
    adjm: number;
    bill: AFCLocation; 
    chg: number;
    cust: number;
    date: string; 
    dbt?: boolean; 
    disc: number; 
    from: AFCLocation; 
    glref: string; 
    incl: boolean; 
    lfln: boolean; 
    line: number;
    loc: number;
    min: number; 
    //opt 
    plsp: number; 
    proadj: number; 
    prop: number; 
    pror: number; 
    qty: number; 
    ref: string; 
    sale: number; 
    serv: number; 
    to: AFCLocation;
    tran: number; 
}

export class AFCCalculateTaxesRequest {
    cfg: AFCCfg;
    cmpn: AFCCmpn;
    inv: AFCInv; 
    //ovr and sovr not coded yet
}