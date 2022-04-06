export class ProRateTaxCalculator {
  calculateProRateTax(apSelfAssesTaxFlag: string, vendorBilledTax, avalaraTaxLines, tolerancePct, toleranceAmt) {
    let proRateTaxDet = {};

    let overRides = new Map();
    let taxOverrideDetails = [];
    let vbtTaxAmtDetails = new Map();

    proRateTaxDet['ReturnOnlyVbtLines'] = false;
    proRateTaxDet['overRides'] = overRides;
    proRateTaxDet['vbtTaxAmtDetails'] = vbtTaxAmtDetails;
    proRateTaxDet['taxOverrideDetails'] = taxOverrideDetails;

    if (apSelfAssesTaxFlag != 'Y') {
      proRateTaxDet['ReturnOnlyVbtLines'] = true;
      for (const aoTl of avalaraTaxLines) {
        let taxDet = {};
        taxDet['lineNumber'] = aoTl.lineNumber;
        taxDet['override'] = aoTl.taxCalculated;
        taxDet['taxRate'] = aoTl.rate * 100;
        taxDet['taxDetails'] = aoTl.taxDetails;
        taxDet['taxAmtTaxCurr'] = aoTl.tax;
        taxDet['unroundedTaxAmt'] = aoTl.tax;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        taxOverrideDetails.push(taxDet);
      }
      return proRateTaxDet;
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
    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      // console.log('Line : ' + tl.lineNumber + ', Rate : ' + tl.rate)
      let taxDet = {};
      // Most scenarios will need taxCalculated to be set as override, so set it here and reset it when differ
      taxDet['override'] = tl.taxCalculated;
      taxDet['lineNumber'] = tl.lineNumber;
      taxOverrideDetails.push(taxDet);
      // if (tl.rate > 0) {

      if (exactVBT) {
        //need not do the prorate calculation
        // balance will be 0 here in this if block
      } else {
        prevRunningProrateVBTTotal = runningProrateVBTTotal;
        prorateVBT = (vendorTax * tl.taxCalculated) / totalTaxCalculated;
        // prorateVBT = prorateVBTNotRounded.setScale(2, BigDecimal.ROUND_HALF_UP);
        runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT;
        if (runningProrateVBTTotal - vendorTax > 0) {
          prorateVBT = prorateVBT - runningProrateVBTTotal - vendorTax;
        }
        balance = tl.taxCalculated - prorateVBT;
      }
      // console.log('Balance : ' + parseFloat(balance))
      if (balance < 0) {
        overRides.set(tl.no, tl.taxCalculated); //set VBT -- correct one
        taxDet['taxRate'] = tl.rate;
        taxDet['taxDetails'] = tl.taxDetails;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        let taxToSet = 0;
        if (withinTolerance) {
          taxToSet = tl.tax;
        } else {
          taxToSet = tl.taxCalculated;
        }
        taxDet['taxAmt'] = taxToSet;
        taxDet['taxAmtTaxCurr'] = taxToSet;
        taxDet['unroundedTaxAmt'] = taxToSet;

        vbtTaxAmtDetails.set(tl.lineNumber, taxDet);
      } else if (balance > 0) {
        proRateTaxDet['ReturnOnlyVbtLines'] = false;
        if (withinTolerance) {
          overRides.set(tl.lineNumber, tl.taxCalculated); // setting
          taxDet['taxRate'] = tl.rate;
          taxDet['taxAmt'] = tl.tax;
          taxDet['taxAmtTaxCurr'] = tl.tax;
          taxDet['unroundedTaxAmt'] = tl.tax;

          taxDet['ReturnVbtLineOnly'] = true;
        } else {
          if (idx == tlSize - 1) {
            finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
            overRides.set(tl.lineNumber, finalProrateAmount);
            taxDet['override'] = finalProrateAmount;
            taxDet['taxRate'] = (finalProrateAmount / totalTaxable) * 100;
            taxDet['taxAmt'] = finalProrateAmount;
            taxDet['taxAmtTaxCurr'] = finalProrateAmount;
            taxDet['unroundedTaxAmt'] = finalProrateAmount;
          } else {
            overRides.set(tl.lineNumber, prorateVBT);
            taxDet['override'] = prorateVBT;
            taxDet['taxRate'] = (prorateVBT / totalTaxable) * 100;
            taxDet['taxAmt'] = prorateVBT;
            taxDet['taxAmtTaxCurr'] = prorateVBT;
            taxDet['unroundedTaxAmt'] = prorateVBT;
          }
          taxDet['ReturnVbtLineOnly'] = false;
        }
        vbtTaxAmtDetails.set(tl.lineNumber, taxDet);
      } else {
        proRateTaxDet['ReturnOnlyVbtLines'] = true;

        overRides.set(tl.lineNumber, tl.taxCalculated); // setting correct VBT
        taxDet['taxRate'] = tl.rate;
        taxDet['taxAmt'] = tl.taxCalculated;
        taxDet['taxAmtTaxCurr'] = tl.taxCalculated;
        taxDet['unroundedTaxAmt'] = tl.taxCalculated;
        // taxDet['taxDetails']=tl.getTaxDetails();
        taxDet['ReturnVbtLineOnly'] = true;

        vbtTaxAmtDetails.set(tl.lineNumber, taxDet);
      }
      // } else {

      // }
    }
    // super.getAvtxLog().addDebugMessage("D", this.className, "Prorare Running VBT Total = " + runningProrateVBTTotal.doubleValue());
    //			for (int idx = 0; idx < tlSize; idx++) {
    //				TaxLine tl = avaTaxLines.get(idx);
    //				BigDecimal balance = tl.getTaxCalculated().minus(tl.getTax());
    //				overRides.set(tl.getNo(), balance);
    //			}

    return proRateTaxDet;
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
