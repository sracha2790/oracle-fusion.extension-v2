import _ = require("lodash");

export class ProRateTaxCalculator {
  calculateProRateTax(apSelfAssesTaxFlag: string, vendorBilledTax, avalaraTaxLines, tolerancePct, toleranceAmt) {
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
      for (const avalaraTaxLine of avalaraTaxLines) {
        taxOverrides[avalaraTaxLine.lineNumber] = avalaraTaxLine.taxCalculated;
        let taxDet = {};
        taxDet['lineNumber'] = avalaraTaxLine.lineNumber;
        taxDet['override'] = avalaraTaxLine.taxCalculated;
        taxDet['taxRate'] = _.sumBy(avalaraTaxLine.details, function(detail:Record<string, any>) { return detail.rate; }) * 100;
        taxDet['taxDetails'] = avalaraTaxLine.taxDetails;
        taxDet['taxAmtTaxCurr'] = avalaraTaxLine.tax;
        taxDet['unroundedTaxAmt'] = avalaraTaxLine.tax;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        vbtTaxAmtDetails[avalaraTaxLine.lineNumber] = taxDet;
      }
      return result;
    }

    let tlSize = avalaraTaxLines.length;

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
      let tl = avalaraTaxLines[idx];
      // totalTaxPercent = totalTaxPercent.add(tl.rate());
      totalTaxCalculated = totalTaxCalculated + tl.taxCalculated;
      totalTaxable = totalTaxable + tl.taxableAmount;
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
      let avalaraTaxLine = avalaraTaxLines[i];
      // console.log('Line : ' + tl.lineNumber + ', Rate : ' + tl.rate)
      let taxDet = {};
      // Most scenarios will need taxCalculated to be set as override, so set it here and reset it when differ
      taxDet['override'] = avalaraTaxLine.taxCalculated;
      taxDet['lineNumber'] = avalaraTaxLine.lineNumber;
      // taxOverrideDetails.push(taxDet);
      // if (tl.rate > 0) {

      if (exactVBT) {
        //need not do the prorate calculation
        // balance will be 0 here in this if block
      } else {
        prevRunningProrateVBTTotal = runningProrateVBTTotal;
        prorateVBT = (vendorTax * avalaraTaxLine.taxCalculated) / totalTaxCalculated;
        // prorateVBT = prorateVBTNotRounded.setScale(2, BigDecimal.ROUND_HALF_UP);
        runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT;
        if (runningProrateVBTTotal - vendorTax > 0) {
          prorateVBT = prorateVBT - runningProrateVBTTotal - vendorTax;
        }
        balance = avalaraTaxLine.taxCalculated - prorateVBT;
      }
      // console.log('Balance : ' + parseFloat(balance))
      if (balance < 0) {
        taxOverrides[avalaraTaxLine.lineNumber] = avalaraTaxLine.taxCalculated; //set VBT -- correct one
        taxDet['taxRate'] = avalaraTaxLine.rate;
        taxDet['taxDetails'] = avalaraTaxLine.taxDetails;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        let taxToSet = 0;
        if (withinTolerance) {
          taxToSet = avalaraTaxLine.tax;
        } else {
          taxToSet = avalaraTaxLine.taxCalculated;
        }
        taxDet['taxAmt'] = taxToSet;
        taxDet['taxAmtTaxCurr'] = taxToSet;
        taxDet['unroundedTaxAmt'] = taxToSet;

        // vbtTaxAmtDetails[avalaraTaxLine.lineNumber] = taxDet;
      } else if (balance > 0) {
        result['ReturnOnlyVbtLines'] = false;
        if (withinTolerance) {
          taxOverrides.set(avalaraTaxLine.lineNumber, avalaraTaxLine.taxCalculated); // setting
          taxDet['taxRate'] = avalaraTaxLine.rate;
          taxDet['taxAmt'] = avalaraTaxLine.tax;
          taxDet['taxAmtTaxCurr'] = avalaraTaxLine.tax;
          taxDet['unroundedTaxAmt'] = avalaraTaxLine.tax;
          taxDet['ReturnVbtLineOnly'] = true;
        } else {
          if (i == tlSize - 1) {
            finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
            taxOverrides.set(avalaraTaxLine.lineNumber, finalProrateAmount);
            taxDet['override'] = finalProrateAmount;
            taxDet['taxRate'] = (finalProrateAmount / totalTaxable) * 100;
            taxDet['taxAmt'] = finalProrateAmount;
            taxDet['taxAmtTaxCurr'] = finalProrateAmount;
            taxDet['unroundedTaxAmt'] = finalProrateAmount;
          } else {
            taxOverrides.set(avalaraTaxLine.lineNumber, prorateVBT);
            taxDet['override'] = prorateVBT;
            taxDet['taxRate'] = (prorateVBT / totalTaxable) * 100;
            taxDet['taxAmt'] = prorateVBT;
            taxDet['taxAmtTaxCurr'] = prorateVBT;
            taxDet['unroundedTaxAmt'] = prorateVBT;
          }
          taxDet['ReturnVbtLineOnly'] = false;
        }
        // vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
      } else {
        result['ReturnOnlyVbtLines'] = true;
        taxOverrides.set(avalaraTaxLine.lineNumber, avalaraTaxLine.taxCalculated); // setting correct VBT
        taxDet['taxRate'] = avalaraTaxLine.rate;
        taxDet['taxAmt'] = avalaraTaxLine.taxCalculated;
        taxDet['taxAmtTaxCurr'] = avalaraTaxLine.taxCalculated;
        taxDet['unroundedTaxAmt'] = avalaraTaxLine.taxCalculated;
        // taxDet['taxDetails']=tl.getTaxDetails();
        taxDet['ReturnVbtLineOnly'] = true;
        // vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
      }
      vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
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

  proRateTest() {
    let ZERO = 0;
    let HUNDRED = 100;
    // const fs = require("fs");
    console.log('Test - proRateTest');
    // const file = '../docs/PRLMBDATST224005-res.json';
    // const file = '../docs/PRLMBDATST227044-res.json'
    const file = '/media/prajeesh/WORKSPACE/CLIENT/SMARTERP/AWS/TESTFILES/avaresp222_INVOICE_275004-2.json';

    let vbt = 5000;
    // let avaTaxResponse = JSON.parse(fs.readFileSync(file, "utf-8"));
    let avaTaxResponse;
    let proRateDetails = this.calculateProRateTax('Y', vbt, avaTaxResponse.lines, 0.5, 0.5);

    console.log(JSON.stringify(proRateDetails, null, 2));
    console.log('--- Details ---');
    for (let [key, val] of proRateDetails['overRides']) {
      console.log('Key : ' + key);
      console.log(JSON.stringify(val, null, 2));
    }
    console.log('--- OverRidesTaxDetails ---');
    for (let [key, val] of proRateDetails['vbtTaxAmtDetails']) {
      console.log('Key : ' + key);
      console.log(JSON.stringify(val, null, 2));
    }
  }
}

// new ProRateTaxCalculator().proRateTest();
