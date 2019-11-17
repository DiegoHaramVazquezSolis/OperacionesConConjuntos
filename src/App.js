import React, { useReducer } from 'react';

import './App.css';

import { convertStringToSet, generateRandomSetString } from './Utils/Utils';
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
} from './Utils/Constants';

import CustomTetxInput from './Components/CustomTetxInput/CustomTetxInput';
import CustomButtonInput from './Components/CustomButtonInput/CustomButtonInput';
import Calculator from './Components/Calculator/Calculator';

function App() {
    const initialState = {
        setA: [],
        setB: [],
        operation: '',
        setAString: '',
        setBString: '',
        autoGenerateA: false,
        autoGenerateB: false
    };

    function reducer(prevState, nextState) {
        return { ...prevState, ...nextState };
    }

    const [state, setState ] = useReducer(reducer, initialState);

    function triggerTwoSetsCalculation(operation = '', onlyA = true, onlyB = true) {
        let setAString = state.setAString;
        let setBString = state.setBString;
        if (state.autoGenerateA && onlyA) {
            setAString = generateRandomSetString(parseInt(prompt('De que tamaño deseas el conjunto A: ')));
        }

        const setA = convertStringToSet(setAString).length > 0 ? convertStringToSet(setAString) : [];

        if (state.autoGenerateB && onlyB) {
            setBString = generateRandomSetString(parseInt(prompt('De que tamaño deseas el conjunto B: ')));
        }

        const setB = convertStringToSet(setBString).length > 0 ? convertStringToSet(setBString) : [];

        setState({
            setA,
            setB,
            setAString,
            setBString,
            operation
        });
    }

    return (
        <div className="App">
            <div className='calc'>
                <div className='Wrapper'>
                    <p>
                        Ingresa los conjuntos (A y B) para ver las operaciones disponibles,
                        separa cada elemento con una coma, por ejemplo: 1,2,3 o a,b,c
                    </p>
                    <CustomTetxInput
                        placeholder="Conjunto A, ej: 1,2,3,4"
                        label="Conjunto A"
                        disabled={state.autoGenerateA}
                        value={state.setAString}
                        onChangeText={(setAString) => setState({ setAString })} />
                    <label>
                        <input
                            type="checkbox"
                            checked={state.autoGenerateA}
                            onChange={(e) => setState({ autoGenerateA: e.target.checked })} />Auto generar conjunto A
                    </label>
                    <br />

                    <br/>
                    <br/>
                    <CustomTetxInput
                        placeholder="Conjunto B, ej: 1,2,3,4"
                        label="Conjunto B"
                        disabled={state.autoGenerateB}
                        value={state.setBString}
                        onChangeText={(setBString) => setState({ setBString })} />
                    <label>
                        <input
                            type="checkbox"
                            checked={state.autoGenerateB}
                            onChange={(e) => setState({ autoGenerateB: e.target.checked })} />Auto generar conjunto B
                    </label>

                    <br/>
                    {state.operation !== '' &&
                        <Calculator
                            setA={state.setA}
                            setB={state.setB}
                            operation={state.operation} />
                    }
                    <p>
                        Operaciones entre dos conjuntos
                    </p>
                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(UNION)}>
                        A U B
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(INTERSECTION)}>
                        A ∩ B
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(DIFFERENCE_A_B)}>
                        A - B
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(DIFFERENCE_B_A)}>
                        B - A
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(GEOMETRIC_DIFFERENCE)}>
                        A Δ B
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARTESIAN_PRODUCT_A_B)}>
                        A × B
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARTESIAN_PRODUCT_B_A)}>
                        B × A
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARTESIAN_PRODUCT_A_A)}>
                        A × A
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARTESIAN_PRODUCT_B_B)}>
                        B × B
                    </CustomButtonInput>
                    <br/>
                    <p>
                        Operaciones individuales
                    </p>
                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(POT_A, true, false)}>
                        P(A)
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(POT_B, false, true)}>
                        P(B)
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARDINALITY_A, true, false)}>
                        |A|
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(CARDINALITY_B, false, true)}>
                        |B|
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(COMPLEMENT_A, true, false)}>
                        A<sup>c</sup>
                    </CustomButtonInput>

                    <CustomButtonInput onClick={() => triggerTwoSetsCalculation(COMPLEMENT_B, false, true)}>
                        B<sup>c</sup>
                    </CustomButtonInput>
                </div>
            </div>
        </div>
  );
}

export default App;
