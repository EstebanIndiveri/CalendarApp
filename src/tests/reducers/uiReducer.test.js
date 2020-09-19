const { uiOpenModal, uiCloseModal } = require("../../actions/ui");
const { default: uiReducer } = require("../../reducers/uiReducer");

const initState={
    modalOpen:false,
};

describe('pruebas en uiReducer', () => {
    test('retora el estado por defecto', () => {
        const state=uiReducer(initState,{});
        expect(state).toEqual(initState);
    });

    test('Abrir y cerrar el modal', () => {
        const modalOpen=uiOpenModal();
        const state=uiReducer(initState,modalOpen);
        expect(state).toEqual({modalOpen:true});
        const modalClose=uiCloseModal();
        const stateClose=uiReducer(state,modalClose)
        expect(stateClose).toEqual({modalOpen:false});
    })
    
    
});
