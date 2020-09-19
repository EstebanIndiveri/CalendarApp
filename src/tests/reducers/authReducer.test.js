const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

const iniState={
    checking:true
};

describe('authreducer.js', () => {
    test('retorna estado por defecto', () => {
        const action={};
        const state=authReducer(iniState,action);
        expect(state).toEqual(iniState);
    });

    test('autentica el user', () => {
        const action={
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'test'
            }
        };
        const state=authReducer(iniState,action);
        expect(state).toEqual({ checking: false, uid: '123', name: 'test' });
    })
    
    
})
