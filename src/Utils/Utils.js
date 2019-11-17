export const convertStringToSet = (stringSet = '') => {
    return stringSet.split(',');
}

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

export const setsDifference = (setA = [], setB = []) => {
    const finalSet = [];
    setA.forEach((element) => {
        if (setB.indexOf(element) === -1) {
            finalSet.push(element);
        }
    });

    return sortSet(finalSet);
}

export const setsGeometricDifference = (setA = [], setB = []) => {
    const differenceAB = setsDifference(setA, setB);
    const differenceBA = setsDifference(setB, setA);


    return setsUnion(differenceAB, differenceBA);
}

export const setsCartesianProduct = (setA = [], setB = []) => {
    const finalSet = [];
    sortSet(setA).forEach((elementA) => {
        sortSet(setB).forEach((elementB) => {
            if (elementA !== '' && elementB !== '') {
                finalSet.push(`(${elementA}, ${elementB})`);
            }
        });
    });

    console.log(finalSet);
    return finalSet;
}

export const combinations = (set = [], k = set.length) => {
    let combs = [];
    let head = [];
    let tailCombs = [];

	// Si el valor de k es igual al tamaño del conjunto, la unica combinación mostrada es el conjunto
	if (k === set.length) {
		return [set];
	}

	/**
     * Si k es igual a 1, la posible combinación es cada elemento del el set recibido como parametro
     * agregada como un arreglo (o conjunto) independiente
     */
	if (k === 1) {
        combs = [];
		for (let i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	/**
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

export const sortSet = (setToSort = []) => {
    return setToSort.sort((a, b) => parseInt(a) > parseInt(b));
}

export const getGreatestCardinalitySet = (setA = [], setB = []) => {
    return getSetCardinality(setA) > getSetCardinality(setB) ? setA : setB;
}

export const getSmallerCardinalitySet = (setA = [], setB = []) => {
    return getSetCardinality(setA) < getSetCardinality(setB) ? setA : setB;
}

export const setsHaveSameCardinality = (setA, setB) => {
    return getSetCardinality(setA) === getSetCardinality(setB);
}

export const getSetCardinality = (set = [], removeDuplicated = true) => {
    let filteredSet = set;
    if (removeDuplicated) {
        filteredSet = set.filter((elem, pos) => (set.indexOf(elem) === pos) )
    }
    return set[0] !== '' ? filteredSet.length : 0;
}

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