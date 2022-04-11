class Test {
  type: string;
  tests: Test[] = [];
  // compare will have three properties , because the  'value' property will be a dynamically resolved calculable attribute value.
  // basically it should be enough to build expression as  path+comparison+value.
  // eg : compare: { path: 'obj.someproperty, comparison: '==', value: '12345'} can eb concatenated to "obj.someproperty==12345"
  compare: { path: string; comparison: string; value: any };
  conditionExpr: string[] = [];
}
class Conditions {
  tests: Test[] = [];
}

export class ConditionalTestBuilder {
  funcStr = '';

  parseTest(test: Test) {
    if (test.conditionExpr.length > 0) {
      this.funcStr += ' ' + test.conditionExpr[0];
      for (let i = 1; i < test.conditionExpr.length; i++) {
        this.funcStr += ' ' + test.type;
        this.funcStr += ' ' + test.conditionExpr[i];
      }
    } else if (test.tests.length > 0) {
      this.funcStr += '(';
      this.parseTest(test.tests[0]);
      this.funcStr += ')';
      for (let i = 1; i < test.tests.length; i++) {
        this.funcStr += ' ' + test.type;
        this.funcStr += '(';
        this.parseTest(test.tests[i]);
        this.funcStr += ')';
      }
    } else if (test.compare) {
      this.funcStr += test.compare.path + test.compare.comparison + test.compare.value;
    }
  }

  buildTest(currentTest: Test, obj: any) {
    for (let prop in obj) {
      const item = obj[prop];
      if (prop == 'and') {
        const t = new Test();
        t.type = '&&';
        currentTest.tests.push(t);
        this.buildTest(t, item);
      } else if (prop == 'or') {
        const t = new Test();
        t.type = '||';
        currentTest.tests.push(t);
        this.buildTest(t, item);
      } else if (prop == 'condition') {
        currentTest.conditionExpr.push(obj[prop]);
      } else if (prop == 'compare') {
        const t = new Test();
        t.compare = item;
        currentTest.tests.push(t);
        // Dont recurse from here
      } else {
        if (Array.isArray(item)) {
          for (let i of item) {
            if (typeof i == 'string') {
              currentTest.conditionExpr.push(i);
            } else {
              this.buildTest(currentTest, i);
            }
          }
        } else {
          if (typeof item == 'string') {
            currentTest.conditionExpr.push(item);
          } else {
            this.buildTest(currentTest, item);
          }
        }
      }
    }
  }
}

// const tests4 = {
//     "conditions": {
//         "and": [
//             {
//                 "or": [
//                     {
//                         "and": [
//                             "obj._addresses.shipFrom.country",
//                             "obj._addresses.shipFrom.country == 'US'"
//                         ]
//                     },
//                     {
//                         "and": [
//                             "obj._addresses.billFrom.country",
//                             "obj._addresses.billFrom.country == 'US'"
//                         ]
//                     }
//                 ]
//             },
//             {
//                 or: [
//                     {
//                         "and": [
//                             "obj._addresses.shipTo.country == 'US'"
//                         ]
//                     }, {
//                         "or": {
//                             compare: {
//                                 path: "x",
//                                 comparison: "==",
//                                 value: "Y"
//                             }
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// };
// const rootTest: Test = new Test();
// const builder = new ConditionalTestBuilder();
// builder.buildTest(rootTest, tests4);
// console.log(JSON.stringify(rootTest, null, 2));
// builder.parseTest(rootTest);
// console.log(builder.funcStr);
