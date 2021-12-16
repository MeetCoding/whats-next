export default function Execute(feed) {
    const template = new FuncTemplate(feed.length - 1);
    feed.forEach(val => template.instance(...val))
    template.solveAll();
    return [template.executable(), format(template.base)];
}

export function format(func) {
    const constants = func.getConstants();
    const terms = constants.map((val, i, arr) => {
        const power = arr.length - i - 1;
        switch (power) {
            case 0: return [val, ''];
            case 1: return [val, 'x'];
            default: return [val, `x^{${power}}`];
        }
    })
    let termsStr = terms
        .filter(val => val[0] !== 0)
        .reduce((total, curr) => (
            curr[0] === 0 ? '' : total + `${curr[0]}${curr[1]} + `
        ), "")
    return "f(x) => " + termsStr.slice(0, termsStr.length - 3);
}

export class FuncTemplate {

    constructor(degree) {
        this.degree = degree;
        this.equations = [];
        this.base = null;
    }

    instance(x, result) {
        let constants =
            new Array(this.degree + 1)
                .fill(null)
                .map((val, i, arr) => x ** (arr.length - i - 1))
        const f = new MathFunc(constants, result);
        if (this.equations.length < 1)
            this.base = f;
        this.equations.push(f);
        return f;
    }

    solveAll() {
        if (this.base === null)
            throw new Error("Instance needed to solve");
        if (this.equations.length !== this.base.terms.length)
            throw new Error("Instances count doesn't match degree");
        let arr = this.equations;
        while (arr.length !== 1) {
            const newArr = [];
            for (let i = 0; i < arr.length - 1; i++)
                newArr.push(arr[i].diff(arr[i + 1]));
            arr = newArr;
        }
        arr[0].solve();
        return this.base;
    }

    executable() {
        return x => {
            let sum = 0;
            const constants = this.base.getConstants();
            constants.forEach((val, i, arr) => {
                sum += val * (x ** (arr.length - i - 1))
            })
            return sum;
        }
    }
}

export class MathFunc {

    constructor(constants, result) {
        this.terms = constants.map(val => [val, null]);
        this.result = result;
        this.parent = null;
    }

    setParent(parent) {
        this.parent = parent;
    }

    push(constant) {
        const newTerms = [...this.terms];
        let pushed = false;
        this.terms.forEach((val, i) => {
            if (val[1] !== null || pushed) return;
            newTerms[i] = [val[0], constant];
            pushed = true;
        })
        if (!pushed)
            throw new Error("Push failed: Constants filled");
        this.terms = newTerms;
        if (this.parent !== null)
            this.parent.push(constant);
    }

    isSolvable() {
        let nullCount = 0;
        this.terms.forEach(val => {
            if (val[1] === null)
                ++nullCount;
        })
        return nullCount === 1;
    }

    solve() {

        if (!this.isSolvable())
            throw new Error("Function not solvable");

        let divisor = null;
        let sum = this.terms.reduce((total, curr) => {
            if (curr[1] !== null)
                return total + curr[0] * curr[1];
            divisor = curr[0];
            return total;
        }, 0);

        const ans = (this.result - sum) / divisor;

        this.push(ans);

        if (this.parent !== null)
            this.parent.solve();

        return ans;
    }

    diff(func) {

        let wasSolved = false;
        this.terms.forEach(val => wasSolved = !!val[1] && !wasSolved);

        if (wasSolved)
            throw new Error("Diff should be called before solving");

        const funcLast = func.terms[func.terms.length - 1][0];
        const thisLast = this.terms[this.terms.length - 1][0];
        const funcTerms = func.terms.map(term => term[0] * thisLast);
        const thisTerms = this.terms.map(term => term[0] * funcLast);

        let diffTerms = thisTerms.map((val, i) => val - funcTerms[i]);
        diffTerms = diffTerms.slice(0, diffTerms.length - 1);
        const diffResult = this.result * funcLast - func.result * thisLast;

        const diff = new MathFunc(diffTerms, diffResult);
        diff.setParent(this);

        return diff;
    }

    getConstants() {
        return this.terms.map(val => {
            if (val[1] === null)
                throw new Error("Function must be solved to get constants");
            return val[1];
        })
    }
}