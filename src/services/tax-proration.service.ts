import _ = require('lodash');
import { ConfigurationCodesService } from './configuration.service';
export class TaxProrationService {
  prorateTaxes(
    apSelfAssesTaxFlag: string,
    vendorBilledTax: number,
    avalaraTaxLines: Array<Record<string, any>>,
    tolerancePct,
    toleranceAmt,
    customerProfile: Record<string, any>,
    isCreditMemoTransaction: boolean,
    isUS2US: boolean,
    isInternational: boolean,
  ) {
    let proRateTaxDet = {};
    let overRides = {};
    let vbtTaxAmtDetails = {};
    proRateTaxDet['ReturnOnlyVbtLines'] = false;
    proRateTaxDet['overRides'] = overRides;
    proRateTaxDet['vbtTaxAmtDetails'] = vbtTaxAmtDetails;
    proRateTaxDet['isOverChargeScenario'] = false;
    // console.log('intl:' + isInternational);
    if (isInternational) {
      return this.proRateTaxIntl(avalaraTaxLines, vendorBilledTax, tolerancePct, toleranceAmt, isInternational);
    }

    if (isCreditMemoTransaction) {
      return this.proRateTaxCreditMemo(apSelfAssesTaxFlag, avalaraTaxLines, vendorBilledTax, tolerancePct, toleranceAmt,customerProfile, isCreditMemoTransaction, isUS2US);
    }
    let taxAmount = 0;
    for (const aoTl of avalaraTaxLines) {
      taxAmount=aoTl.tax + taxAmount;
    }

    if (isUS2US) {
      if (apSelfAssesTaxFlag != 'Y') {
        let overRidesNoSelfAssess = new Map();
        proRateTaxDet['ReturnOnlyVbtLines'] = true;
        for (const aoTl of avalaraTaxLines) {
          let taxDet = {};
          // overRidesNoSelfAssess.set(aoTl.lineNumber, aoTl.taxCalculated);
          overRides[aoTl.lineNumber] = aoTl.taxCalculated;
          // taxDet['lineNumber'] = aoTl.lineNumber;
          // taxDet['override'] = aoTl.taxCalculated;
          taxDet['taxRate'] = _.round(
            _.sumBy(aoTl.details, function (detail: Record<string, any>) {
              return detail.rate;
            }) * 100,
            2,
          );
          taxDet['taxAmt'] = _.round(aoTl.tax, 2);
          taxDet['taxAmtTaxCurr'] = _.round(aoTl.tax, 2);
          taxDet['unroundedTaxAmt'] = _.round(aoTl.tax, 2);
          taxDet['taxDetails'] = aoTl.details;
          taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
          vbtTaxAmtDetails[aoTl.lineNumber] = taxDet;
        }
        return proRateTaxDet;
      }
    }
    let configurationCodesService = new ConfigurationCodesService(customerProfile.ATX_CONFIG_CODES);
    let tlSize = avalaraTaxLines.length;
    let linesWithTaxAmount = 0;
    let totalTaxPercent = 0;
    let totalTaxCalculated = 0;
    let totalTaxCalculatedActual =0;
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
    let correctVBTForOC = (configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y');
    let vendorTax = vendorBilledTax;
    // Can remove this and pass total taxable and totalTaxCalculated from doc level
    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      totalTaxPercent =
        totalTaxPercent +
        _.sumBy(tl.details, function (detail: Record<string, any>) {
          return detail.rate;
        });
      totalTaxCalculated = totalTaxCalculated + tl.taxCalculated;
      totalTaxCalculatedActual = totalTaxCalculatedActual + tl.taxCalculated;
      totalTaxable = totalTaxable + tl.taxableAmount;
      if (tl.Tax != 0 || taxAmount == 0) {
        linesWithTaxAmount = linesWithTaxAmount + 1;
      }
      // avalaraTaxLines.push(tl);
    }
    if (totalTaxCalculated == 0) {
      totalTaxCalculated = 1;
    }
    if (totalTaxPercent == 0) {
      totalTaxPercent = 1;
    }
    withinTolerance = this.isVBTDiffWithinTolerance(vendorTax, totalTaxCalculatedActual, tolerancePct, toleranceAmt);
    // check whether the vendortax was exact
    exactVBT = (vendorTax == totalTaxCalculatedActual);
    // super.getAvtxLog().addDebugMessage("D", this.className, "Total tax percent " + totalTaxPercent.toString());
    tlSize = avalaraTaxLines.length;
    let lineWithTaxAmountRunning = 0;

    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      let taxDet = {};
      const taxRate = _.sumBy(tl.details, function (detail: Record<string, any>) {
        return detail.rate;
      });
      if (tl.tax != 0 || taxAmount == 0) {
        //lineswithNonZeroTaxCalculated in its own for loop
        lineWithTaxAmountRunning = lineWithTaxAmountRunning + 1;
      }
      if (taxRate > 0 || taxAmount == 0) {
        if (exactVBT) {
          //need not do the prorate calculation
          // balance will be 0 here in this if block
        } else {
          prevRunningProrateVBTTotal = runningProrateVBTTotal; 
          // if (totalTaxCalculated == 0) {
          //   prorateVBTNotRounded = _.round((vendorTax / tlSize), 3); 
          // } else {
          //   prorateVBTNotRounded = _.round((vendorTax * tl.taxCalculated) / totalTaxCalculated, 3); 
          // }
          if(taxAmount == 0){
            prorateVBTNotRounded = _.round((vendorTax / tlSize), 3);
            if(linesWithTaxAmount == 1){
              prorateVBTNotRounded = vendorTax;
            }
          }else{
            prorateVBTNotRounded = _.round((vendorTax * tl.taxCalculated) / totalTaxCalculated, 3); 
          }

          prorateVBT = _.round(prorateVBTNotRounded, 2); 
          if (lineWithTaxAmountRunning == linesWithTaxAmount) {
            prorateVBT = vendorTax - prevRunningProrateVBTTotal; 
          }
          runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT; 
          // if (runningProrateVBTTotal > vendorTax) {
          //   runningProrateVBTTotal = vendorTax;
          // } //anagha -debugging 
          if (runningProrateVBTTotal > vendorTax) {
            prorateVBT = prorateVBT - (runningProrateVBTTotal - vendorTax);
          }
          balance = tl.taxCalculated - prorateVBT; 
        }
        if (Math.sign(balance) < 0) {
          proRateTaxDet['isOverChargeScenario'] = true;
          if (withinTolerance) {
            proRateTaxDet['isOverChargeScenario'] = false;
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (correctVBTForOC) {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
              taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true;
            } else {
              if (lineWithTaxAmountRunning == linesWithTaxAmount) {
                finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
                overRides[tl.lineNumber] = _.round(finalProrateAmount, 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
                taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              } else {
                overRides[tl.lineNumber] = _.round(prorateVBT, 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round(prorateVBT, 2);
                taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
                taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              }
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else if (Math.sign(balance) > 0) {
          proRateTaxDet['ReturnOnlyVbtLines'] = false;
          if (withinTolerance) {
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal; 
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2); 
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
              overRides[tl.lineNumber] = _.round(finalProrateAmount, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(prorateVBT, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else {
          proRateTaxDet['ReturnOnlyVbtLines'] = true;
          overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); // setting correct VBT
          taxDet['taxRate'] = _.round(taxRate * 100, 2);
          taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
          taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxDetails'] = tl.details;
          taxDet['ReturnVbtLineOnly'] = true;
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        }
      } else {
      }
    } // for (let idx = 0; idx < tlSize; idx++)


    if (isUS2US) {
      if (
        configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y' &&
        configurationCodesService.getCodeValue('BLOCK_AP_SELF_ASSESS_RESP') == 'Y'
      ) {
        let vbtTaxDetailsSize = Object.keys(vbtTaxAmtDetails).length;
        for (let idx = 0; idx < vbtTaxDetailsSize; idx++) {
          for (let vbtDetails of Object.values(vbtTaxAmtDetails)) {
            vbtDetails['ReturnVbtLineOnly'] = true;
          }
        }
      }
    }
    return proRateTaxDet;
  }

  proRateTaxIntl(avalaraTaxLines, vendorBilledTax, tolerancePct, toleranceAmt, isInternational) {
    let proRateTaxDet = {};
    let overRides = {};
    let vbtTaxAmtDetails = {};
    proRateTaxDet['ReturnOnlyVbtLines'] = false;
    proRateTaxDet['overRides'] = overRides;
    proRateTaxDet['vbtTaxAmtDetails'] = vbtTaxAmtDetails;
    let tlSize = avalaraTaxLines.length;
    let totalTaxPercent = 0;
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
    let correctVBTForOC = false;
    let vendorTax = vendorBilledTax;
    // Can remove this and pass total taxable and totalTaxCalculated from doc level
    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      totalTaxPercent =
        totalTaxPercent +
        _.sumBy(tl.details, function (detail: Record<string, any>) {
          return detail.rate;
        });
      totalTaxCalculated = totalTaxCalculated + tl.taxCalculated;
      totalTaxable = totalTaxable + tl.taxableAmount;
      //avalaraTaxLines.push(tl);
    }
    if (totalTaxCalculated == 0) {
      totalTaxCalculated = 1;
    }
    if (totalTaxPercent == 0) {
      totalTaxPercent = 1;
    }
    withinTolerance = this.isVBTDiffWithinTolerance(vendorTax, totalTaxCalculated, tolerancePct, toleranceAmt);
    // check whether the vendortax was exact
    exactVBT = (vendorTax == totalTaxCalculated);
    for (let idx = 0; idx < tlSize; idx++) {
      let taxDet = {};
      let tl = avalaraTaxLines[idx];
      const taxRate = _.sumBy(tl.details, function (detail: Record<string, any>) {
        return detail.rate;
      });
      if (taxRate > 0) {
        if (exactVBT) {
          //need not do the prorate calculation
          // balance will be 0 here in this if block
        } else {
          prevRunningProrateVBTTotal = runningProrateVBTTotal;
          prorateVBTNotRounded = _.round(((vendorTax * tl.taxCalculated) / totalTaxCalculated), 3);
          prorateVBT = _.round(prorateVBTNotRounded, 2);
          runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT;
          if (Math.sign(runningProrateVBTTotal - vendorTax) > 0) {
            prorateVBT = prorateVBT - (runningProrateVBTTotal - vendorTax);
          }
          balance = tl.taxCalculated - prorateVBT;
        }
        if (Math.sign(balance) < 0) {
          if (withinTolerance) {
            if (tlSize == idx + 1) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (correctVBTForOC) {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
              taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true;
            } else {
              if (tlSize == idx + 1) {
                finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
                overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
                taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              } else {
                overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round(prorateVBT, 2);
                taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
                taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              }
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else if (Math.sign(balance) > 0) {
          proRateTaxDet['ReturnOnlyVbtLines'] = false;
          if (withinTolerance) {
            if (tlSize == idx + 1) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (tlSize == idx + 1) {
              finalProrateAmount = vendorTax - prevRunningProrateVBTTotal;
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(prorateVBT ,2);
              taxDet['taxAmtTaxCurr'] = _.round(prorateVBT, 2);
              taxDet['unroundedTaxAmt'] = _.round(prorateVBT, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else {
          proRateTaxDet['ReturnOnlyVbtLines'] = true;
          overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); // setting correct VBT
          taxDet['taxRate'] = _.round(taxRate * 100, 2);
          taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
          taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxDetails'] = tl.details;
          taxDet['ReturnVbtLineOnly'] = true;
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        }
      }
    }
    if (isInternational) {
      let vbtTaxDetailsSize = Object.keys(vbtTaxAmtDetails).length;
      for (let idx = 0; idx < vbtTaxDetailsSize; idx++) {
        for (let vbtDetails of Object.values(vbtTaxAmtDetails)) {
          vbtDetails['ReturnVbtLineOnly'] = true;
        }
      }
    }
    return proRateTaxDet;
  }
  isVBTDiffWithinTolerance(vendorBilledTax, calculatedTax, tolerancePct, toleranceAmt) {
    let parResult = 'ZERO';
    let calculatedAmt = 0;
    let calculatedPct = 0;
    if (vendorBilledTax == 0) {
      parResult = 'ZERO';
      return false;
    }
    if (toleranceAmt == 0 && tolerancePct == 0) {
      return false;
    }
    let localTaxDifference = _.round(Math.abs(calculatedTax - vendorBilledTax), 2);
    let localActualTax = calculatedTax == 0 ? 1 : _.round(calculatedTax, 2);
    if (Math.sign(vendorBilledTax - calculatedTax) == 1) {
      calculatedPct = _.round(_.divide(localTaxDifference, localActualTax), 3) * 100;
      if (tolerancePct != 0) {
        if (calculatedPct != tolerancePct) {
          parResult = 'OVERCHARGE';
        } else {
          parResult = 'CORRECT';
        }
      }
      if ((tolerancePct == 0 || parResult == 'OVERCHARGE') && (toleranceAmt != 0)) {
        if (Math.sign(localTaxDifference - toleranceAmt) == 1) {
          parResult = 'OVERCHARGE';
        } else {
          parResult = 'CORRECT';
        }
      }
    }
    if (Math.sign(vendorBilledTax - calculatedTax) < 0) {
      calculatedPct = _.round(_.divide(localTaxDifference, localActualTax), 3) * 100;
      if (tolerancePct != 0) {
        if (Math.sign(calculatedPct - tolerancePct) > 0) {
          parResult = 'UNDERCHARGE';
        } else {
          parResult = 'CORRECT';
        }
      }
      if ((tolerancePct == 0 || parResult == 'UNDERCHARGE') && (toleranceAmt != 0)) {
        if (Math.sign(localTaxDifference - toleranceAmt) > 0) {
          parResult = 'UNDERCHARGE';
        } else {
          parResult = 'CORRECT';
        }
      }
    }
    if ((vendorBilledTax - calculatedTax) == 0) {
      parResult = 'CORRECT';
    }
    if (parResult == 'CORRECT') {
      return true;
    }
  }

  proRateTaxCreditMemo(apSelfAssesTaxFlag, avalaraTaxLines, vendorBilledTax, tolerancePct, toleranceAmt, customerProfile, isCreditMemoTransaction, isUS2US){
    let proRateTaxDet = {};
    let overRides = {};
    let vbtTaxAmtDetails = {};
    proRateTaxDet['ReturnOnlyVbtLines'] = false;
    proRateTaxDet['overRides'] = overRides;
    proRateTaxDet['vbtTaxAmtDetails'] = vbtTaxAmtDetails;
    proRateTaxDet['isOverChargeScenario'] = false;
    // console.log('intl:' + isInternational);

    let taxAmount = 0;
    for (const aoTl of avalaraTaxLines) {
      taxAmount=aoTl.tax + taxAmount;
    }

    if (isUS2US) {
      if (apSelfAssesTaxFlag != 'Y') {
        let overRidesNoSelfAssess = new Map();
        proRateTaxDet['ReturnOnlyVbtLines'] = true;
        for (const aoTl of avalaraTaxLines) {
          let taxDet = {};
          // overRidesNoSelfAssess.set(aoTl.lineNumber, aoTl.taxCalculated);
          overRides[aoTl.lineNumber] = aoTl.taxCalculated;
          // taxDet['lineNumber'] = aoTl.lineNumber;
          // taxDet['override'] = aoTl.taxCalculated;
          taxDet['taxRate'] = _.round(
            _.sumBy(aoTl.details, function (detail: Record<string, any>) {
              return detail.rate;
            }) * 100,
            2,
          );
          taxDet['taxAmt'] = _.round(aoTl.tax, 2);
          taxDet['taxAmtTaxCurr'] = _.round(aoTl.tax, 2);
          taxDet['unroundedTaxAmt'] = _.round(aoTl.tax, 2);
          taxDet['taxDetails'] = aoTl.details;
          taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
          vbtTaxAmtDetails[aoTl.lineNumber] = taxDet;
        }
        return proRateTaxDet;
      }
    }
    let configurationCodesService = new ConfigurationCodesService(customerProfile.ATX_CONFIG_CODES);
    let tlSize = avalaraTaxLines.length;
    let linesWithTaxAmount = 0;
    let totalTaxPercent = 0;
    let totalTaxCalculated = 0;
    let totalTaxCalculatedActual =0;
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
    let correctVBTForOC = (configurationCodesService.getCodeValue('CORRECT_VBT_FOR_OC') == 'Y');
    let vendorTax = vendorBilledTax;
    // Can remove this and pass total taxable and totalTaxCalculated from doc level
    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      totalTaxPercent =
        totalTaxPercent +
        _.sumBy(tl.details, function (detail: Record<string, any>) {
          return detail.rate;
        });
      totalTaxCalculated = totalTaxCalculated + tl.taxCalculated;
      // totalTaxCalculatedActual = totalTaxCalculatedActual + tl.taxCalculated;
      totalTaxable = totalTaxable + tl.taxableAmount;
      if (tl.Tax != 0 || taxAmount == 0) {
        linesWithTaxAmount = linesWithTaxAmount + 1;
      }
      // avalaraTaxLines.push(tl);
    }
    if (totalTaxCalculated == 0) {
      totalTaxCalculated = 1;
    }
    if (totalTaxPercent == 0) {
      totalTaxPercent = 1;
    }
    if(isCreditMemoTransaction){
      vendorTax = vendorTax * -1;
      totalTaxCalculated = totalTaxCalculated * -1;
      totalTaxCalculatedActual = totalTaxCalculatedActual * -1;
      taxAmount = taxAmount * -1;
    }
    withinTolerance = this.isVBTDiffWithinTolerance(vendorTax, totalTaxCalculatedActual, tolerancePct, toleranceAmt);
    // check whether the vendortax was exact
    exactVBT = (vendorTax == totalTaxCalculatedActual);
    // super.getAvtxLog().addDebugMessage("D", this.className, "Total tax percent " + totalTaxPercent.toString());
    tlSize = avalaraTaxLines.length;
    let lineWithTaxAmountRunning = 0;

    for (let idx = 0; idx < tlSize; idx++) {
      let tl = avalaraTaxLines[idx];
      let taxDet = {};
      const taxRate = _.sumBy(tl.details, function (detail: Record<string, any>) {
        return detail.rate;
      });
      if (tl.tax != 0 || taxAmount == 0) {
        //lineswithNonZeroTaxCalculated in its own for loop
        lineWithTaxAmountRunning = lineWithTaxAmountRunning + 1;
      }
      if (taxRate > 0 || taxAmount == 0) {
        if (exactVBT) {
          //need not do the prorate calculation
          // balance will be 0 here in this if block
        } else {
          prevRunningProrateVBTTotal = runningProrateVBTTotal; 
          // if (totalTaxCalculated == 0) {
          //   prorateVBTNotRounded = _.round((vendorTax / tlSize), 3); 
          // } else {
          //   prorateVBTNotRounded = _.round((vendorTax * tl.taxCalculated) / totalTaxCalculated, 3); 
          // }
          if(taxAmount == 0){
            prorateVBTNotRounded = _.round((vendorTax / tlSize), 3);
            if(linesWithTaxAmount == 1){
              prorateVBTNotRounded = vendorTax;
            }
          }else{
            if (isCreditMemoTransaction){
              prorateVBTNotRounded = _.round((vendorTax * (tl.taxCalculated * -1))/ totalTaxCalculated, 3);
            }
            prorateVBTNotRounded = _.round((vendorTax * tl.taxCalculated) / totalTaxCalculated, 3); 
          }

          prorateVBT = _.round(prorateVBTNotRounded, 2); 
          if (lineWithTaxAmountRunning == linesWithTaxAmount) {
            prorateVBT = vendorTax - prevRunningProrateVBTTotal; 
          }
          runningProrateVBTTotal = runningProrateVBTTotal + prorateVBT; 
          // if (runningProrateVBTTotal > vendorTax) {
          //   runningProrateVBTTotal = vendorTax;
          // } //anagha -debugging 
          if (runningProrateVBTTotal > vendorTax) {
            prorateVBT = prorateVBT - (runningProrateVBTTotal - vendorTax);
          }
            balance = (tl.taxCalculated * -1) - prorateVBT;
        }
        if (Math.sign(balance) < 0) {
          if (withinTolerance) {
            // overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
            // taxDet['taxRate'] = _.round(taxRate * 100, 2);
            // taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
            // taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
            // taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
            // taxDet['taxDetails'] = tl.details;
            // taxDet['ReturnVbtLineOnly'] = true;
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = (vendorTax - prevRunningProrateVBTTotal) * -1;
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxAmtTaxCurr'] = _.round((prorateVBT * -1), 2);
              taxDet['unroundedTaxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (correctVBTForOC) {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
              taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true;
            } else {
              if (lineWithTaxAmountRunning == linesWithTaxAmount) {
                finalProrateAmount = (vendorTax - prevRunningProrateVBTTotal) * -1;
                overRides[tl.lineNumber] = _.round(finalProrateAmount, 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
                taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              } else {
                overRides[tl.lineNumber] = _.round((prorateVBT * -1), 2); //set VBT -- correct one
                taxDet['taxRate'] = _.round(taxRate * 100, 2);
                taxDet['taxAmt'] = _.round((prorateVBT * -1), 2);
                taxDet['taxAmtTaxCurr'] = _.round((prorateVBT * -1), 2);
                taxDet['unroundedTaxAmt'] = _.round((prorateVBT * -1), 2);
                taxDet['taxDetails'] = tl.details;
                taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
              }
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else if (Math.sign(balance) > 0) {
          proRateTaxDet['ReturnOnlyVbtLines'] = false;
          if (withinTolerance) {
            // overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
            // taxDet['taxRate'] = _.round(taxRate * 100, 2);
            // taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
            // taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
            // taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
            // taxDet['taxDetails'] = tl.details;
            // taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = (vendorTax - prevRunningProrateVBTTotal * -1); 
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2); 
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxAmtTaxCurr'] = _.round((prorateVBT * -1), 2);
              taxDet['unroundedTaxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = true; // will return vbt lines only
            }
          } else {
            if (lineWithTaxAmountRunning == linesWithTaxAmount) {
              finalProrateAmount = (vendorTax - prevRunningProrateVBTTotal) * -1;
              overRides[tl.lineNumber] = _.round(finalProrateAmount, 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxAmtTaxCurr'] = _.round(finalProrateAmount, 2);
              taxDet['unroundedTaxAmt'] = _.round(finalProrateAmount, 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            } else {
              overRides[tl.lineNumber] = _.round((prorateVBT * -1), 2); //set VBT -- correct one
              taxDet['taxRate'] = _.round(taxRate * 100, 2);
              taxDet['taxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxAmtTaxCurr'] = _.round((prorateVBT * -1), 2);
              taxDet['unroundedTaxAmt'] = _.round((prorateVBT * -1), 2);
              taxDet['taxDetails'] = tl.details;
              taxDet['ReturnVbtLineOnly'] = false; // will return vbt lines only
            }
          }
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        } else {
          proRateTaxDet['ReturnOnlyVbtLines'] = true;
          overRides[tl.lineNumber] = _.round(tl.taxCalculated, 2); // setting correct VBT
          taxDet['taxRate'] = _.round(taxRate * 100, 2);
          taxDet['taxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxAmtTaxCurr'] = _.round(tl.taxCalculated, 2);
          taxDet['unroundedTaxAmt'] = _.round(tl.taxCalculated, 2);
          taxDet['taxDetails'] = tl.details;
          taxDet['ReturnVbtLineOnly'] = true;
          vbtTaxAmtDetails[tl.lineNumber] = taxDet;
        }
      } else {
      }
    } // for (let idx = 0; idx < tlSize; idx++)


    if (isUS2US) {
      if (
        configurationCodesService.getCodeValue('AP_SELF_ASSESS_TAX') == 'Y' &&
        configurationCodesService.getCodeValue('BLOCK_AP_SELF_ASSESS_RESP') == 'Y'
      ) {
        let vbtTaxDetailsSize = Object.keys(vbtTaxAmtDetails).length;
        for (let idx = 0; idx < vbtTaxDetailsSize; idx++) {
          for (let vbtDetails of Object.values(vbtTaxAmtDetails)) {
            vbtDetails['ReturnVbtLineOnly'] = true;
          }
        }
      }
    }
    return proRateTaxDet;
  }
}