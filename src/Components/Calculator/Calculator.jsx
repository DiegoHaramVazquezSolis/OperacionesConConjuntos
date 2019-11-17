import React from 'react';

import {
    UNION,
    INTERSECTION,
    DIFFERENCE_A_B,
    DIFFERENCE_B_A,
    GEOMETRIC_DIFFERENCE,
    CARTESIAN_PRODUCT_A_B,
    CARTESIAN_PRODUCT_B_A,
    CARTESIAN_PRODUCT_A_A,
    CARTESIAN_PRODUCT_B_B,
    POT_A,
    POT_B,
    CARDINALITY_A,
    CARDINALITY_B,
    COMPLEMENT_A,
    COMPLEMENT_B
} from '../../Utils/Constants';
import { setsUnion, setsIntersection, setsDifference, setsGeometricDifference, setsCartesianProduct, setsPotSet, getSetCardinality, convertStringToSet } from '../../Utils/Utils';

export const Cardinality = ({ setA = [], cardinality = -1, removeDuplicated = true }) => (
    <p>
        Cardinalidad del conjunto: {cardinality !== -1 ? cardinality : getSetCardinality(setA, removeDuplicated)}
    </p>
);

const TwoSetsOperationsResult = ({ operationResult = [], universe = [], removeDuplicated = true }) => (
    <div>
        <h2>Conjunto resultado:
            {operationResult.length > 0 ? operationResult.map((element, index) => {
                if (operationResult.length === 1) {
                    return (
                        ` { ${element} }`
                    );
                } else if (index > 0 && index !== operationResult.length - 1) {
                    return (
                        `, ${element}`
                    );
                } else if (index === operationResult.length - 1) {
                    return (
                        `, ${element} }`
                    );
                } else {
                    return (
                        ` { ${element}`
                    );
                }
            })
            :
            'Ø'
        }
        </h2>
        {universe.length > 0 &&
            <p>
                Con universo: {universe.map((element, index) => {
                    if (universe.length === 1) {
                        return (
                            ` { ${element} }`
                        );
                    } else if (index > 0 && index !== universe.length - 1) {
                        return (
                            `, ${element}`
                        );
                    } else if (index === universe.length - 1) {
                        return (
                            `, ${element} }`
                        );
                    } else {
                        return (
                            ` { ${element}`
                        );
                    }
                })}
            </p>
        }
        <Cardinality setA={operationResult} cardinality={-1} removeDuplicated={removeDuplicated} />
    </div>
);

const OneSetOperation = ({ operationResult = [] }) => (
    <div>
        <h2>
            {'{'}
            {operationResult.length > 0 ? operationResult.map((arrayResult, index) => {
                if (operationResult.length === 1) {
                    return `{ ${arrayResult.map((element) => (
                        element
                    ))} }`
                } else if (index > 0 && index !== operationResult.length - 1) {
                    return `, { ${arrayResult.map((element) => (
                        element
                    ))} }`
                } else if (index === operationResult.length - 1) {
                    return `, { ${arrayResult.map((element) => (
                        element
                    ))} }`
                } else {
                    return `{ ${arrayResult.map((element) => (
                        element
                    ))} }`
                }
            })
            :
            'Ø'
            }
            {'}'}
        </h2>
        <Cardinality setA={operationResult} cardinality={-1} />
    </div>
);

const Calculator = ({ setA = [], setB = [], operation = '' }) => {

    let operationResult = [];
    let universe = [];
    switch (operation) {
        case UNION:
            operationResult = setsUnion(setA, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} />
        case INTERSECTION:
            operationResult = setsIntersection(setA, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} />
        case DIFFERENCE_A_B:
            operationResult = setsDifference(setA, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} />
        case DIFFERENCE_B_A:
            operationResult = setsDifference(setB, setA);
            return <TwoSetsOperationsResult operationResult={operationResult} />
        case GEOMETRIC_DIFFERENCE:
            operationResult = setsGeometricDifference(setA, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} />
        case CARTESIAN_PRODUCT_A_B:
            operationResult = setsCartesianProduct(setA, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} removeDuplicated={false} />
        case CARTESIAN_PRODUCT_B_A:
            operationResult = setsCartesianProduct(setB, setA);
            return <TwoSetsOperationsResult operationResult={operationResult} removeDuplicated={false} />
        case CARTESIAN_PRODUCT_A_A:
            operationResult = setsCartesianProduct(setA, setA);
            return <TwoSetsOperationsResult operationResult={operationResult} removeDuplicated={false} />
        case CARTESIAN_PRODUCT_B_B:
            operationResult = setsCartesianProduct(setB, setB);
            return <TwoSetsOperationsResult operationResult={operationResult} removeDuplicated={false} />
        case POT_A:
            operationResult = setsPotSet(setA);
            return <OneSetOperation operationResult={operationResult} />
        case POT_B:
            operationResult = setsPotSet(setB);
            return <OneSetOperation operationResult={operationResult} />
        case CARDINALITY_A:
            return <Cardinality cardinality={getSetCardinality(setA)} />
        case CARDINALITY_B:
            return <Cardinality cardinality={getSetCardinality(setB)} />
        case COMPLEMENT_A:
            universe = convertStringToSet(prompt('Define el conjunto universo: '));

            if (universe[0] !== '') {
                return <TwoSetsOperationsResult operationResult={setsDifference(universe, setA)} universe={universe} />
            }
            return <p>Es necesario definir un universo valido para realizar esta operación</p>
        case COMPLEMENT_B:
            universe = convertStringToSet(prompt('Define el conjunto universo: '));            console.log(universe);

            if (universe[0] !== '') {
                return <TwoSetsOperationsResult operationResult={setsDifference(universe, setA)} universe={universe} />
            }
            return <p>Es necesario definir un universo valido para realizar esta operación</p>
        default:
            break;
    }
}

export default Calculator;
