

export class AFCError {
    code: number; 
    msg: string;
}

export class AFCTaxesGenerated {
    bill: boolean; 
    calc: number; 
    cat: string; 
    chg: number; 
    cid: number; 
    cmpl: boolean; 
    exm: number; 
    lns: number; 
    lvl: number; 
    min: number; 
    name: string; 
    notax: boolean; 
    pcd: number; 
    rate: number; 
    sur: boolean; 
    svc: number; 
    tax: number; 
    taxpcd: number; 
    tid: number; 
    tm: number; 
    trans: number; 
    usexm: boolean; 
}
export class AFCLineItemResult {
    base: number; 
    err: Array<AFCError>;
    ref: string; 
    txs: Array<AFCTaxesGenerated>; 

}
export class AFCInvResult {
    doc: string; 
    err: Array<AFCError>;
    incrf: {
        acct: string;
        bcyc: string;
        ccycd: string;
        ccydesc: string; 
        custref: string; 
        invn: string; 
    };
    itms: Array<AFCLineItemResult> 
}

export class AFCCalculateTaxesResponse extends AFCInvResult{
    err: Array<AFCError>;
    inv: Array<AFCInvResult>; 
}