export const convertStringToSet = (stringSet = '') => {
    return stringSet.split(',');
}

/**
 * Return the union of setA and setB
 * @param {array} setA Set
 * @param {array} setB Set
 */
export const setsUnion = (setA = [], setB = []) => {
    let finalSet = [];
    if (setA[0] !== '') {
        finalSet = [...setA];
    }

    setB.forEach((element) => {
        if (element !== '') {
            if (finalSet.indexOf(element) === -1) {
                finalSet.push(element);
            }
        }
    });

    return sortSet(finalSet);
}

/**
 * Return the intersection between the setA and setB
 * @param {array} setA set
 * @param {array} setB set
 */
export const setsIntersection = (setA = [], setB = []) => {
    const finalSet = [];
    let greatestSet = [];
    let smallerSet = [];

    if (setsHaveSameCardinality(setA, setB)) {
        greatestSet = setA;
        smallerSet = setB;
    } else {
        greatestSet = getGreatestCardinalitySet(setA, setB);
        smallerSet = getSmallerCardinalitySet(setA, setB);
    }

    greatestSet.forEach((element) => {
        if (element !== '') {
            if (smallerSet.indexOf(element) !== -1 && finalSet.indexOf(element) === -1) {
                finalSet.push(element);
            }
        }
    });

    return sortSet(finalSet);
}

/**
 * Return the difference between setA and setB (setA - setB)
 * @param {array} setA set
 * @param {array} setB set
 */
export const setsDifference = (setA = [], setB = []) => {
    const finalSet = [];
    setA.forEach((element) => {
        if (setB.indexOf(element) === -1) {
            finalSet.push(element);
        }
    });

    return sortSet(finalSet);
}

/**
 * Return the geometric differnce of the setA and setB
 * ((setA - setB) U (setB - setA))
 * @param {array} setA set
 * @param {array} setB set
 */
export const setsGeometricDifference = (setA = [], setB = []) => {
    const differenceAB = setsDifference(setA, setB);
    const differenceBA = setsDifference(setB, setA);


    return setsUnion(differenceAB, differenceBA);
}

/**
 * Return an array with strings that describe the cartesian product of setA and setB
 * (setA x setB)
 * @param {array} setA set
 * @param {array} setB set
 */
export const setsCartesianProduct = (setA = [], setB = []) => {
    const finalSet = [];
    sortSet(setA).forEach((elementA) => {
        sortSet(setB).forEach((elementB) => {
            if (elementA !== '' && elementB !== '') {
                finalSet.push(`(${elementA}, ${elementB})`);
            }
        });
    });

    return finalSet;
}

/**
 * Get all the posible combinations in the given level
 * @param {array} set set
 * @param {number} k Level of the combination to do
 */
export const combinations = (set = [], k = set.length) => {
    let combs = [];
    let head = [];
    let tailCombs = [];

	// If k es equal to the length of the set, the only combination is the set by itself
	if (k === set.length) {
		return [set];
	}

	/**
     * If k is equal to 1, the possible combination is each element of the set
     * added as an independent array (or set)
     */
	if (k === 1) {
        combs = [];
		for (let i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	/**
     * Aqui me falla el ingles, una disculpa jaja:
     * Para obtener las posibles combinaciones de un conjunto debemos tomar ese conjunto
     * y remover un índice del arreglo (que representa al conjunto), una especie de pivote, que intercalamos
     * para generar las posibles combinaciones, si ejecutamos este proceso de forma recursiva se conseguirán
     * todas las combinaciones
     */
	for (let i = 0; i < set.length - k + 1; i++) {
		// head es un arreglo que contiene solo el elemento actual (respecto a la iteración)
		head = set.slice(i, i + 1);
		/**
         * Calculamos las combinaciones mas pequeñas que se encuentran entre el arreglo actual (que comprende)
         * desde el indice i + 1 hasta el k - 1 (proceso recursivo, take care)
         */
        tailCombs = combinations(set.slice(i + 1), k - 1);
        /**
         * Todas las combinaciones las agregamos a la variable combs, que es el conjunto final de todas las
         * combinaciones
         */
		for (let j = 0; j < tailCombs.length; j++) {
            combs.push(head.concat(tailCombs[j]));
		}
	}
	return combs;
}

/**
 * Return the pot set of the given set
 * @param {array} set set
 */
export function setsPotSet(set = []) {
    let potSet = [];
    if (set[0] !== '') {
        let combinationsArray = [];
        potSet = [[]];
        for (let k = set.length; k > 0 ; k--) {
            combinationsArray = combinations(set, k);
            for (let i = 0; i < combinationsArray.length; i++) {
                potSet.push(combinationsArray[i]);
            }
        }
    }
	return potSet;
}

/**
 * Order a set: ascendent
 * @param {array} setToSort set
 */
export const sortSet = (setToSort = []) => {
    return setToSort.sort((a, b) => parseInt(a) > parseInt(b));
}

/**
 * Returns the set with greatest cardinality
 * @param {array} setA set
 * @param {array} setB set
 */
export const getGreatestCardinalitySet = (setA = [], setB = []) => {
    return getSetCardinality(setA) > getSetCardinality(setB) ? setA : setB;
}

/**
 * Returns the set with smaller cardinality
 * @param {array} setA set
 * @param {array} setB set
 */
export const getSmallerCardinalitySet = (setA = [], setB = []) => {
    return getSetCardinality(setA) < getSetCardinality(setB) ? setA : setB;
}

/**
 * Returns true if the sets have same cardinality
 * @param {array} setA set
 * @param {array} setB set
 */
export const setsHaveSameCardinality = (setA = [], setB = []) => {
    return getSetCardinality(setA) === getSetCardinality(setB);
}

/**
 * Return the cardinality of a set
 * @param {array} set set
 * @param {bool} removeDuplicated Indicates if the duplicated elements must be ignored
 */
export const getSetCardinality = (set = [], removeDuplicated = true) => {
    let filteredSet = set;
    if (removeDuplicated) {
        filteredSet = set.filter((elem, pos) => (set.indexOf(elem) === pos) )
    }
    return set[0] !== '' ? filteredSet.length : 0;
}

/**
 * Generate a random string that describe a set (with no duplicated elements)
 * @param {number} cardinality Elements in the set to generate
 */
export const generateRandomSetString = (cardinality) => {
    let finalSetString = '';
    let numbersAdded = [];
    for (let i = 0; i < cardinality; i++) {
        const numberToAdd = parseInt(Math.random() * 100 + 1);
        if (numbersAdded.indexOf(numberToAdd) === -1) {
            if (i === 0) {
                finalSetString += `${numberToAdd}`;
            } else {
                finalSetString += `,${numberToAdd}`;
            }
            numbersAdded.push(numberToAdd);
        } else {
            i--;
        }
    }

    return finalSetString;
}