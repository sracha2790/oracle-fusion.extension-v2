import _ = require("lodash");

export class TaxProrationService {
  public prorateTaxes(apSelfAssesTaxFlag: string, vendorBilledTax, avalaraResponseLines, tolerancePct, toleranceAmt) {
    let result = {};

    let taxOverrides: Record<string, any> = {};
    // let taxOverrideDetails = [];
    let vbtTaxAmtDetails: Record<string, any> = {};

    result['ReturnOnlyVbtLines'] = false;
    result['taxOverrides'] = taxOverrides;
    result['vbtTaxAmtDetails'] = vbtTaxAmtDetails;
    // result['taxOverrideDetails'] = taxOverrideDetails;

    if (apSelfAssesTaxFlag != 'Y') {
      result['ReturnOnlyVbtLines'] = true;
      for (const avalaraResponseLine of avalaraResponseLines) {
        taxOverrides[avalaraResponseLine.lineNumber] = avalaraResponseLine.taxCalculated;
        let taxDet = {};
        taxDet['lineNumber'] = avalaraResponseLine.lineNumber;
        taxDet['override'] = avalaraResponseLine.taxCalculated;
        taxDet['taxRate'] = _.sumBy(avalaraResponseLine.details, function(detail:Record<string, any>) { return detail.rate; }) * 100;
        taxDet['taxDetails'] = avalaraResponseLine.taxDetails;
        taxDet['taxAmtTaxCurr'] = avalaraResponseLine.tax;
        taxDet['unroundedTaxAmt'] = avalaraResponseLine.tax;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        vbtTaxAmtDetails[avalaraResponseLine.lineNumber] = taxDet;
      }
      return result;
    }

    let tlSize = avalaraResponseLines.length;

    // console.log('TaxLines size : ' + tlSize)

    let totalTaxCalculated = 0;
    let runningProrateVBTTotal = 0;
    let prevRunningProrateVBTTotal = 0;
    let totalTaxable = 0;
    let prorateVBTNotRounded = 0;
    let balance = 0;
    let prorateVBT = 0;
    let finalProrateAmount = 0;
    let exactVBT = false;
    //boolean
    let withinTolerance = false;

    let vendorTax = vendorBilledTax;
    // Can remove this and pass total taxable and totalTaxCalculated from doc level
    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraResponseLines[idx];
      // totalTaxPercent = totalTaxPercent.add(tl.rate());
      totalTaxCalculated = totalTaxCalculated + tl.taxCalculated;
      totalTaxable = totalTaxable + tl.taxableAmount;
    }
    if (totalTaxable == 0) {
      totalTaxable = 1;
    }

    exactVBT = vendorTax == totalTaxCalculated;

    if (totalTaxCalculated == 0) {
      totalTaxCalculated = 1;
    }

    withinTolerance = this.isVBTDiffWithinTolerance(vendorTax, totalTaxCalculated, tolerancePct, toleranceAmt);
    // console.log('vbtWithinTolerance : ' + withinTolerance)

    // check whether the vendortax was exact
    // super.getAvtxLog().addDebugMessage("D", this.className, "Total tax percent " + totalTaxPercent.toString());
    for (let i = 0; i < tlSize; i++) {
      let avalaraResponseLine = avalaraResponseLines[i];
      // console.log('Line : ' + tl.lineNumber + ', Rate : ' + tl.rate)
      let taxDet = {};
      // Most scenarios will need taxCalculated to be set as override, so set it here and reset it when differ
      taxDet['override'] = avalaraResponseLine.taxCalculated;
      taxDet['lineNumber'] = avalaraResponseLine.lineNumber;
      // taxOverrideDetails.push(taxDet);
      // if (tl.rate > 0) {
      // let taxRate = 0;
      const taxRate = _.sumBy(avalaraResponseLine.details, function(detail:Record<string, any>) { return detail.rate; })

      if (exactVBT) {
        //need not do the prorate calculation
        // balance will be 0 here in this if block
      } else {
        prevRunningProrateVBTTotal = runningProrateVBTTotal;
        prorateVBT = (vendorTax * avalaraResponseLine.taxCalculated) / totalTaxCalculated;
        // prorateVBT = prorateVBTNotRounded.setScale(2, BigDecimal.ROUND_HALF_UP);
        runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT;
        if (runningProrateVBTTotal - vendorTax > 0) {
          prorateVBT = prorateVBT - runningProrateVBTTotal - vendorTax;
        }
        balance = avalaraResponseLine.taxCalculated - prorateVBT;
      }
      // console.log('Balance : ' + parseFloat(balance))
      if (balance < 0) {
        taxOverrides[avalaraResponseLine.lineNumber] = avalaraResponseLine.taxCalculated; //set VBT -- correct one
        taxDet['taxRate'] = taxRate * 100;
        taxDet['taxDetails'] = avalaraResponseLine.taxDetails;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        let taxToSet = 0;
        if (withinTolerance) {
          taxToSet = avalaraResponseLine.tax;
        } else {
          taxToSet = avalaraResponseLine.taxCalculated;
        }
        taxDet['taxAmt'] = taxToSet;
        taxDet['taxAmtTaxCurr'] = taxToSet;
        taxDet['unroundedTaxAmt'] = taxToSet;

        // vbtTaxAmtDetails[avalaraTaxLine.lineNumber] = taxDet;
      } else if (balance > 0) {
        result['ReturnOnlyVbtLines'] = false;
        if (withinTolerance) {
          taxOverrides[avalaraResponseLine.lineNumber] = avalaraResponseLine.taxCalculated; // setting
          taxDet['taxRate'] =  taxRate * 100;
          taxDet['taxAmt'] = avalaraResponseLine.tax;
          taxDet['taxAmtTaxCurr'] = avalaraResponseLine.tax;
          taxDet['unroundedTaxAmt'] = avalaraResponseLine.tax;
          taxDet['ReturnVbtLineOnly'] = true;
        } else {
          if (i == tlSize - 1) {
            finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
            taxOverrides[avalaraResponseLine.lineNumber] = finalProrateAmount;
            taxDet['override'] = finalProrateAmount;
            taxDet['taxRate'] =  taxRate * 100;
            taxDet['taxAmt'] = finalProrateAmount;
            taxDet['taxAmtTaxCurr'] = finalProrateAmount;
            taxDet['unroundedTaxAmt'] = finalProrateAmount;
          } else {
            taxOverrides[avalaraResponseLine.lineNumber] = prorateVBT;
            taxDet['override'] = prorateVBT;
            taxDet['taxRate'] =  taxRate * 100;
            taxDet['taxAmt'] = prorateVBT;
            taxDet['taxAmtTaxCurr'] = prorateVBT;
            taxDet['unroundedTaxAmt'] = prorateVBT;
          }
          taxDet['ReturnVbtLineOnly'] = false;
        }
        // vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
      } else {
        result['ReturnOnlyVbtLines'] = true;
        taxOverrides[avalaraResponseLine.lineNumber] = avalaraResponseLine.taxCalculated;
        taxDet['taxRate'] =  taxRate * 100;
        taxDet['taxAmt'] = avalaraResponseLine.taxCalculated;
        taxDet['taxAmtTaxCurr'] = avalaraResponseLine.taxCalculated;
        taxDet['unroundedTaxAmt'] = avalaraResponseLine.taxCalculated;
        // taxDet['taxDetails']=tl.getTaxDetails();
        taxDet['ReturnVbtLineOnly'] = true;
        // vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
      }
      vbtTaxAmtDetails[avalaraResponseLine.lineNumber] = taxDet;
      // } else {

      // }
    }
    // super.getAvtxLog().addDebugMessage("D", this.className, "Prorare Running VBT Total = " + runningProrateVBTTotal.doubleValue());
    //			for (int idx = 0; idx < tlSize; idx++) {
    //				TaxLine tl = avaTaxLines.get(idx);
    //				BigDecimal balance = tl.getTaxCalculated().minus(tl.getTax());
    //				overRides.set(tl.getNo(), balance);
    //			}

    return result;
  }

  isVBTDiffWithinTolerance(vendorBilledTax, calculatedTax, tolerancePct, toleranceAmt) {
    if (vendorBilledTax == 0) {
      return false;
    }
    if (toleranceAmt == 0 && tolerancePct == 0) {
      return false;
    }
    if (vendorBilledTax == calculatedTax) {
      return true;
    }
    let taxDiff = calculatedTax - vendorBilledTax;
    let baseVal = calculatedTax == 0 ? 1 : calculatedTax;
    let pctDiff = taxDiff / baseVal;
    let within = true;
    if (pctDiff > tolerancePct || taxDiff > toleranceAmt) {
      within = false;
    }

    return within;
  }
};
