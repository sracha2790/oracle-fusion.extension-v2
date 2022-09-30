import _ = require("lodash");
import { TransactionLinesWithTransactionLineDetails } from "src/models/avalara/avalara-response/TransactionLine";

export class TaxProrationService {
  public prorateTaxes(apSelfAssesTaxFlag: string, vendorBilledTax, avalaraTransactionLines: Array<TransactionLinesWithTransactionLineDetails>, tolerancePct, toleranceAmt) {
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
      for (const avalaraTransactionLine of avalaraTransactionLines) {
        taxOverrides[avalaraTransactionLine.lineNumber] = avalaraTransactionLine.taxCalculated;
        let taxDet = {};
        taxDet['lineNumber'] = avalaraTransactionLine.lineNumber;
        taxDet['override'] = avalaraTransactionLine.taxCalculated;
        taxDet['taxRate'] = _.round(_.sumBy(avalaraTransactionLine.details, function(detail:Record<string, any>) { return detail.rate; }) * 100, 2);
        // taxDet['taxDetails'] = avalaraTransactionLine.taxDetails;
        taxDet['taxAmtTaxCurr'] = avalaraTransactionLine.tax;
        taxDet['unroundedTaxAmt'] = avalaraTransactionLine.tax;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        vbtTaxAmtDetails[avalaraTransactionLine.lineNumber] = taxDet;
      }
      return result;
    }

    let tlSize = avalaraTransactionLines.length;

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
      let tl = avalaraTransactionLines[idx];
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
      let avalaraTransactionLine = avalaraTransactionLines[i];
      // console.log('Line : ' + tl.lineNumber + ', Rate : ' + tl.rate)
      let taxDet = {};
      // Most scenarios will need taxCalculated to be set as override, so set it here and reset it when differ
      taxDet['override'] = avalaraTransactionLine.taxCalculated;
      taxDet['lineNumber'] = avalaraTransactionLine.lineNumber;
      // taxOverrideDetails.push(taxDet);
      // if (tl.rate > 0) {
      // let taxRate = 0;
      const taxRate = _.round(_.sumBy(avalaraTransactionLine.details, function(detail:Record<string, any>) { return detail.rate; }), 2)

      if (exactVBT) {
        //need not do the prorate calculation
        // balance will be 0 here in this if block
      } else {
        prevRunningProrateVBTTotal = runningProrateVBTTotal;
        prorateVBT = _.round((vendorTax * avalaraTransactionLine.taxCalculated) / totalTaxCalculated, 2);
        // prorateVBT = prorateVBTNotRounded.setScale(2, BigDecimal.ROUND_HALF_UP);
        runningProrateVBTTotal =  _.round(runningProrateVBTTotal + prorateVBT, 2);
        if (runningProrateVBTTotal - vendorTax > 0) {
          prorateVBT =  _.round(prorateVBT - runningProrateVBTTotal - vendorTax, 2);
        }
        balance =  _.round(avalaraTransactionLine.taxCalculated - prorateVBT, 2);
      }
      // console.log('Balance : ' + parseFloat(balance))
      if (balance < 0) {
        taxOverrides[avalaraTransactionLine.lineNumber] = avalaraTransactionLine.taxCalculated; //set VBT -- correct one
        taxDet['taxRate'] = taxRate * 100;
        //taxDet['taxDetails'] = avalaraTransactionLine.taxDetails;
        taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
        let taxToSet = 0;
        if (withinTolerance) {
          taxToSet = avalaraTransactionLine.tax;
        } else {
          taxToSet = avalaraTransactionLine.taxCalculated;
        }
        taxDet['taxAmt'] = taxToSet;
        taxDet['taxAmtTaxCurr'] = taxToSet;
        taxDet['unroundedTaxAmt'] = taxToSet;

        // vbtTaxAmtDetails[avalaraTaxLine.lineNumber] = taxDet;
      } else if (balance > 0) {
        result['ReturnOnlyVbtLines'] = false;
        if (withinTolerance) {
          taxOverrides[avalaraTransactionLine.lineNumber] = avalaraTransactionLine.taxCalculated; // setting
          taxDet['taxRate'] =  taxRate * 100;
          taxDet['taxAmt'] = avalaraTransactionLine.tax;
          taxDet['taxAmtTaxCurr'] = avalaraTransactionLine.tax;
          taxDet['unroundedTaxAmt'] = avalaraTransactionLine.tax;
          taxDet['ReturnVbtLineOnly'] = true;
        } else {
          if (i == tlSize - 1) {
            finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
            taxOverrides[avalaraTransactionLine.lineNumber] = finalProrateAmount;
            taxDet['override'] = finalProrateAmount;
            taxDet['taxRate'] =  taxRate * 100;
            taxDet['taxAmt'] = finalProrateAmount;
            taxDet['taxAmtTaxCurr'] = finalProrateAmount;
            taxDet['unroundedTaxAmt'] = finalProrateAmount;
          } else {
            taxOverrides[avalaraTransactionLine.lineNumber] = prorateVBT;
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
        taxOverrides[avalaraTransactionLine.lineNumber] = avalaraTransactionLine.taxCalculated;
        taxDet['taxRate'] =  taxRate * 100;
        taxDet['taxAmt'] = avalaraTransactionLine.taxCalculated;
        taxDet['taxAmtTaxCurr'] = avalaraTransactionLine.taxCalculated;
        taxDet['unroundedTaxAmt'] = avalaraTransactionLine.taxCalculated;
        // taxDet['taxDetails']=tl.getTaxDetails();
        taxDet['ReturnVbtLineOnly'] = true;
        // vbtTaxAmtDetails.set(avalaraTaxLine.lineNumber, taxDet);
      }
      vbtTaxAmtDetails[avalaraTransactionLine.lineNumber] = taxDet;
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
